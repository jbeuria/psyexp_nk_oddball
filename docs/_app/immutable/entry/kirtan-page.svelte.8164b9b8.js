import{S as f,i as k,s as b,I as l,P as p}from"../chunks/index.61cd7198.js";import{i as w,P as v,H as m,A as K}from"../chunks/jspsych.44488363.js";import"../chunks/muse.5bbc7ee0.js";import{s as c,g as h,m as n}from"../chunks/store.8b8872e6.js";let S="/audio/jahnavi_harrison.mp3";function T(a,u,r){let t,o,i;l(a,n,e=>r(0,t=e)),l(a,h,e=>r(1,o=e)),l(a,c,e=>r(2,i=e)),p(c,i=1,i),p(h,o="M",o);const _=w({show_progress_bar:!0});let s=[];const d={type:v,auto_preload:!0};s.push(d);let y={type:m,stimulus:`<h1> Welcome to the experiment.<h1> 
        <h1 style='color:blue'> Press any key to play the meditative kirtan. </h1>
        <ul> 
            <li>The duration is around 10 minutes</li> 
            <li>Please close your eyes and try to hear each and every word attentively<li> 
            <li>Thereafter, You will be asked certain questions</li>
        </ul>
        `};s.push(y);const g={type:K,stimulus:S,choices:"NO_KEYS",post_trial_gap:1e3,trial_ends_after_audio:!0,on_start:()=>{let e={timestamp:new Date().getTime()/1e3,marker:201};t.push(e),n.set(t)},on_finish:()=>{let e={timestamp:new Date().getTime()/1e3,marker:202};t.push(e),n.set(t)}};s.push(g);const P={type:m,stimulus:"<a href='/contemplate?group=M' >Click to proceed to assessment stage</a>",choices:"NO_KEYS"};return s.push(P),_.run(s),[]}class A extends f{constructor(u){super(),k(this,u,T,null,b,{})}}export{A as default};
