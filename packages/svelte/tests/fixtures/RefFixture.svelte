<script>
  import Home from '@mingcute/svelte/core-regular/home-1';
  let { capture } = $props();
  let ref;
  $effect(() => {
    if (ref) capture(ref);
  });
</script>

<Home bind:ref data-ref-fixture="true" />
