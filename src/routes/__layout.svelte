<script lang="ts">
  import '$assets/global.css';
  import '$assets/tailwind.css';
  import '$assets/fonts/hostedFonts.css';
  // import { session } from '$app/stores';
  import { supabase } from '$db/client';

  supabase.auth.onAuthStateChange(async (event, sesh) => {
    if (event === 'SIGNED_IN') {
      const cookie_data = JSON.stringify({
        avatar_url: sesh?.user?.user_metadata.avatar_url,
        expires_at: sesh?.expires_at,
        id: sesh?.user?.id,
        access_token: sesh?.access_token,
      });

      const res = await fetch('/api/auth/cookie', { method: 'POST', body: cookie_data });
      if (res.status === 200) {
        // if ($session) {
        // $session.user = sesh?.user ?? undefined;
        // }
        window.location.href = '/auth/profile';
      } else {
        console.error('Failed to set cookie', res);
      }
      return;
    }

    if (event === 'SIGNED_OUT') {
      const res = await fetch('/api/auth/cookie', { method: 'DELETE' });

      if (res.status === 204) {
        // if ($session?.user) {
        // $session.user = undefined;
        // }
        window.location.href = '/auth/profile';
      } else {
        console.error('failed to expire cookie', res);
      }
    }
  });
</script>

<slot />
