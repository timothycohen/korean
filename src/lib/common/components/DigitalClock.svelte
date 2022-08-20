<script lang="ts">
  export let size = 700;
  export let hour = 6;
  export let minute = 16;

  const hr = hour === 0 ? '--' : hour < 10 ? `0${hour}` : hour;
  const min = minute === 0 ? '00' : minute < 10 ? `0${minute}` : minute;
</script>

<div class="digital-clock" style="height: {size}px; width: {size}px; font-size: {size / 4.5}px">
  {hr}:{min}
</div>

<style>
  .digital-clock {
    display: grid;
    place-items: center;
    font-family: Digital, 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: var(--primary2);
  }
</style>
