<script>
 export let errors = {};
 
</script>

<style>
 .errors {
	 color: red;
 }
</style>

<ul class="errors">
  {#each Object.values(errors) as err, i}
	{#if err}
	  <li>{err}</li>
	{/if}
  {/each}
</ul>
