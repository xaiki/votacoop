<script>
 export let gun;

 import SEA from 'gun/sea';
 import Errors from './Errors.svelte';

 import {gasync} from './gun.js';

 let errors = {};
 let vote = {};
 const votes = {};
 const voteDetails = {};

 const user = gun.user();

 gun.get('votes').map().on((v,k) => k === '_' ? null : votes[k] = v)
 $: votes;

 console.error('votes', votes);

 async function newVote() {
   if (! vote.name) { errors['name'] = 'name needed'; return }
   if (! vote.value) { errors['value'] = 'vote needed'; return }

   const pair = user._.sea;
   const sig = await SEA.sign(vote.value, pair);

   const v = user.get('votes').get(vote.name).put(vote);
   const V = user.get('votes').get(vote.name).put({pub: user.is.pub, vote})

   gun.get('votes').get(vote.name).set(V)
   console.error('votes', votes);
 }

 const asyncify = (fn, args = []) => new Promise ((accept, reject) => fn.once(accept))

 function showVote(vote) {
   voteDetails[vote] = {};

                       gun.get('votes').get(vote).map().once(
                         async v => {
                           const u = await asyncify(gun.user(v.pub));
                           const {value} = await asyncify(gun.get(`~${v.pub}/votes/${vote}`));
                           if (! voteDetails[vote][value]) {
                             voteDetails[vote][value] = [u.alias]
                           } else {
                             voteDetails[vote][value].push([u.alias])
                           }
                       })

                       console.error(voteDetails)
                       }
</script>

<div>
  <h1>new vote</h1>
  <input placeholder='vote name' bind:value={vote.name}/>
  <input placeholder='vote' bind:value={vote.value}/>
  <button on:click={newVote}>ok</button>
</div>
<div>
  <ul>
    {#each Object.keys(votes) as vote}
      <li on:click={() => showVote(vote)}>
        <h1>{vote} <span>({Object.keys(votes[vote]).length - 1})</span></h1>
        {#each Object.keys(voteDetails[vote] || {}) as vd}
          <span>{vd} <small>({voteDetails[vote][vd].length})</small></span>
        {/each}
      </li>
    {/each}
  </ul>
</div>
<Errors errors={errors}/>
