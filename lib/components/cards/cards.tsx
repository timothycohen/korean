import { useState } from 'react';
import { type SpacedRepetition } from '@prisma/client';
import { Counter } from 'lib/counters';
import { Card, type ReviewingGrade } from 'lib/SR';
import { getNextDueBody } from '@/pages/api/sr/getNextDue';
import Buttons from './Buttons';
import { WavePage, Input } from 'lib/components/styled';

// initial sr is server rendered. afterwards, client sends http requests
export default function Cards({ sr }: { sr?: SpacedRepetition }): JSX.Element | null {
  const [card, setCard] = useState<Card<Counter> | null>((): Card<Counter> | null => {
    if (!sr) return null;
    return new Card({ data: new Counter({ id: sr?.dataId }), restore: sr });
  });

  if (!card || !sr) {
    return <h1>You&apos;ve reviewed everything! Time for a break.</h1>;
  }

  const userId = sr.userId;

  const mark = async (grade: ReviewingGrade): Promise<void> => {
    card.sr.mark(grade);

    const res = await postUpdate();

    if (res.ok) {
      const sr = await fetchNextSR();
      if (!sr) {
        setCard(null);
        return;
      }
      setCard((): Card<Counter> => new Card({ data: new Counter({ id: sr.dataId }), restore: sr }));
    }
  };

  const postUpdate = async (): Promise<Response> => {
    const body: SpacedRepetition = card.sr.toDBModel();
    const res = await fetch('/api/sr/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  const fetchNextSR = async (): Promise<SpacedRepetition | null> => {
    const body: getNextDueBody = {
      userId,
    };
    const res = await fetch('/api/sr/getNextDue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const { sr } = (await res.json()) as { sr: SpacedRepetition | null };
    return sr;
  };

  const { exampleEn, counterKo, countableEn, exampleKo, desc, counterEn, countableKo, numberType } =
    card.data;
  const markOptions = card.sr.markOptions;

  return (
    <WavePage>
      <h1>{exampleEn}</h1>
      <Buttons markOptions={markOptions} onClick={(grade: ReviewingGrade): Promise<void> => mark(grade)} />
      <Input />
    </WavePage>
  );
}
