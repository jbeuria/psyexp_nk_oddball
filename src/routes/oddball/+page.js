export const ssr = false;
import {session,group,participant,stage} from '$lib/store'
export function load({ params,url }) {
    let n_blocks=parseInt(url.searchParams.get('nb'))
    let n_per_block=parseInt(url.searchParams.get('npb'))
    if(!n_blocks) n_blocks=3
    if(!n_per_block) n_per_block=100
    console.log(n_blocks,n_per_block)
    return {n_blocks,n_per_block}
}