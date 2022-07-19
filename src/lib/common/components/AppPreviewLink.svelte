<script lang="ts">
  export let name = '';
  export let href = '';
  export let src = '';
</script>

<div class="container">
  <a {href}>
    <span>{name}</span>
    <img {src} alt="" width={500} height={379} />
  </a>
</div>

<style>
  .container {
    display: grid;
    place-content: flex-start;
  }
  a {
    background-color: var(--gray5);
    color: var(--primary2);
    border-radius: 0.3rem;
    display: grid;
    padding: 0 0.5rem 0.5rem 0.5rem;
    text-decoration: none;
    font-size: 2.5rem;
    text-align: center;
  }
  a:hover {
    opacity: 0.75;
  }
  a:hover * {
    transform: scale(1);
  }
  a * {
    transition: transform 300ms ease-in-out;
    transform: scale(0.98);
    border-radius: 0.3rem;
  }
</style>
