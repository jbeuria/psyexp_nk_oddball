import {session,group,participant,stage} from '$lib/store'

export function load({ params,url }) {

    let group_val

    group.subscribe(value => {
        group_val = value;
    });

    if(url.searchParams.get('group'))  
    group_val=url.searchParams.get('group')
  
    return {group:group_val,stage:2}
  }