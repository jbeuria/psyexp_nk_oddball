import {session,group,participant,stage} from '$lib/store'
import {goto} from '$app/navigation'

export function load({ params,url }) {

    let stage_int, group_val
    stage.subscribe(value => {
      stage_int = value;
    });

    group.subscribe(value => {
        group_val = value;
    });

    if(parseInt(url.searchParams.get('stage')))  
    stage_int=parseInt(url.searchParams.get('stage'))

    if(url.searchParams.get('group'))  
    group_val=url.searchParams.get('group')

    if(group_val=='N' && stage_int==0) goto('/lecture')
    else if (group_val=='M' && stage_int==0) goto('/kirtan')
    else if(stage_int==1) goto(`/contemplate?group=${group_val}`)
    else if(stage_int==2) goto('/oddball')
    else if(stage_int==3) goto('/end')

    return {}
  }