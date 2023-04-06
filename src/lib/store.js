import { writable } from 'svelte/store'
import { browser } from "$app/environment";

export const group = writable( 'N');
if(browser) group.subscribe((value) => localStorage.group = value);

export const participant= writable('Name');
if(browser) participant.subscribe((value) => localStorage.participant = value);


export const stage= writable(0);
if(browser) stage.subscribe((value) => localStorage.stage = value);


export const session = writable('001');
if(browser) session.subscribe((value) => localStorage.session = value);



// const markerArr = "markerArr"
// const markerArrRetrieved = browser? localStorage.getItem(markerArr) :null;
// const  markerArrParsed = JSON.parse(markerArrRetrieved);


// let defaultUser={name:null,id:null,email:null, role:'Anonymous'};


// export const markers = writable(browser? localStorage.getItem('markers_str') :[])
// if(browser) markers.subscribe(value => localStorage.setItem('markers_str', JSON.stringify(value)) );


    const itemName = "storedArray"
    const retrieved = browser? localStorage.getItem(itemName) : "[]"
    const parsed = JSON.parse(retrieved)
    export const markers = writable(parsed === null ? [] : parsed)
    
    markers.subscribe(value =>
        browser?  localStorage.setItem(itemName, JSON.stringify(value)): []
    )
    

