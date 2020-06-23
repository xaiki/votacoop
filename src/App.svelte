<script>
 import {gun} from './gun';

 import Login from './Login.svelte';
 import Votes from './Votes.svelte';

 let loggedin;

 const user = gun.user()
</script>

<Login user={user} bind:loggedin/>
{#if loggedin}
	<Votes gun={gun}/>
{/if}
