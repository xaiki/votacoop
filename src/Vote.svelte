<script>
 export let gun;

 const votes = gun.get('votes');
</script>
<ul>
  {#each votes as vote}
    <li>{vote}</li>
  {/each}
</ul>
