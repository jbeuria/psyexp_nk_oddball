import{S as P,i as b,s as k,I as n,P as p}from"../chunks/index.61cd7198.js";import{i as w,P as v,H as m,A as K}from"../chunks/jspsych.44488363.js";import"../chunks/muse.5bbc7ee0.js";import{s as c,g as h,m as l}from"../chunks/store.8b8872e6.js";let N="/audio/reverses_of_life.mp3";function S(o,u,a){let t,r,i;n(o,l,e=>a(0,t=e)),n(o,h,e=>a(1,r=e)),n(o,c,e=>a(2,i=e)),p(c,i=1,i),p(h,r="N",r);const _=w({show_progress_bar:!0});let s=[];const g={type:v,auto_preload:!0};s.push(g);let d={type:m,stimulus:`<h1> Welcome to the experiment.<h1> 
        <h1 style='color:blue'> Press any key to play the narrative. </h1>
        <ul> 
            <li>The duration is around 10 minutes</li> 
            <li>Please close your eyes and after the narrative, 
                you will be assessed based on the content you are going to hear
            </li>
        </ul>
        `};s.push(d);const y={type:K,stimulus:N,choices:"NO_KEYS",post_trial_gap:1e3,trial_ends_after_audio:!0,on_start:()=>{let e={timestamp:new Date().getTime()/1e3,marker:101};t.push(e),l.set(t)},on_finish:()=>{let e={timestamp:new Date().getTime()/1e3,marker:102};t.push(e),l.set(t)}};s.push(y);const f={type:m,stimulus:"<a href='/contemplate?group=N' >Click to proceed to assessment stage</a>",choices:"NO_KEYS"};return s.push(f),_.run(s),[]}class D extends P{constructor(u){super(),b(this,u,S,null,k,{})}}export{D as default};
