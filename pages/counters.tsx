import Counter from 'lib/counters/Counter';
import { counters } from 'lib/counters/counters';

export default function CountersPage(): JSX.Element | null {
  const flattenedCounters = Object.values(counters)
    .flat()
    .map(c => new Counter({ counter: c }));

  const CounterDetails = (counter: Counter) => (
    <div>
      {Object.getOwnPropertyNames(Counter.prototype)
        .filter(p => p !== 'constructor')
        .map(p => (
          <div key={p}>
            {p} : {counter[p]}
          </div>
        ))}
    </div>
  );

  return (
    <div>
      {flattenedCounters.map(counter => {
        return (
          <div style={{ margin: '1rem' }} key={counter.desc}>
            {CounterDetails(counter)}
          </div>
        );
      })}
    </div>
  );
}
