<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
<script>
    import {session,group,participant,stage,markers} from '$lib/store'
    import {goto} from '$app/navigation'
    import * as fs from 'fs'
    import { onMount } from 'svelte';

    function handleUser(e)
    {
        const data = new FormData(e.target);
        let x=[...data.entries()];
        console.log(x[0][1]);
        console.log($session,$group,$participant)

        $stage=0
        // $datapath=`group_${$group}/${$participant}/session_${$session}`
       
        // if(!fs.statSync(datapath).isFile()) fs.mkdirSync(datapath, { recursive: true })
        
        goto(`/exp?group=${$group}&stage=${$stage}`)

    }
    
    onMount(()=>{
      $markers=[]
    })

    let logged_in=false
    
</script>
<h3>User Details</h3>

<div class="container">
  <form on:submit|preventDefault={handleUser}>
    <label for="group">Group</label>
    <select id='group' name='group' bind:value={$group}>
        <option value='N'>Narration</option>
        <option value='M'>Meditation</option>
    </select>

    <label for="name">Participant</label>
    <input type="text" id="name" name="name"  bind:value={$participant} placeholder="Your name..">

    <label for="session">Session No</label>
    <input type="text" id="session" name="session"  bind:value={$session} placeholder="Session Number..">

    <input type="submit" value="Proceed Next">
  </form>
</div>



