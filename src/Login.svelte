<script>
 export let user;
 export let loggedin = false;

 import Errors from './Errors.svelte';

 let alias;
 let pass;
 let errors = {
   auth: false
 }

 user.recall({sessionStorage: true}, ({soul}) => {
   if (user.is) {
     loggedin = soul;
   }
 })

 function signup() {
   user.create(alias, pass, ({err}) => {
	 if (err) {
	   errors.auth = err;
	   return console.error(`couldn't sign up: ${err}`);
	 }

	 signin();
   })
 }

 function signin() {
   user.auth(alias, pass, ({err, soul}) => {
	 if (err) {
	   errors.auth = err;
	   return console.error(`couldn't sign in: ${err}`);
	 }

	 errors.auth = false;
	 loggedin = soul;
   })
 }

 function logout() {
   user.leave()

   loggedin = false;
 }

 // TODO: get user from localstorage and login.

 $: loggedin = !! user.is;
 $: errors;
</script>

<style>
 .content {
	 display: flex;
	 flex-direction: column;
 }
</style>

<div class="content">
  {#if ! loggedin}
	<h1>Please Login or create user</h1>

	<input id="user" placeholder="username" bind:value={alias}/>
	<input id="pass" placeholder="password" bind:value={pass} type="password"/>
	<span>
	  <button on:click={signin}>sign in</button>
	  <button on:click={signup}>sign up</button>
	</span>
  {:else}
	<h1>Welcome home {user.is.alias}</h1>
	<span>
	  <button on:click={logout}>log out</button>
	</span>
  {/if}
  <Errors errors={errors}/>
</div>
