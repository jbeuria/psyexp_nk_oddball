import{s as o,g}from"./store.8b8872e6.js";import{g as s}from"./navigation.5efb51a5.js";function i({params:p,url:r}){let e,a;return o.subscribe(t=>{e=t}),g.subscribe(t=>{a=t}),parseInt(r.searchParams.get("stage"))&&(e=parseInt(r.searchParams.get("stage"))),r.searchParams.get("group")&&(a=r.searchParams.get("group")),a=="N"&&e==0?s("/lecture"):a=="M"&&e==0?s("/kirtan"):e==1?s(`/contemplate?group=${a}`):e==2?s("/oddball"):e==3&&s("/end"),{}}const c=Object.freeze(Object.defineProperty({__proto__:null,load:i},Symbol.toStringTag,{value:"Module"}));export{c as _,i as l};
