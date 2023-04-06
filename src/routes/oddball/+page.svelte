
<script>

    import {initJsPsych} from 'jspsych';
    import  jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
    import  jsPsychAudioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response';
    import  jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
    import  jsPsychPreload from '@jspsych/plugin-preload';
    import 'jspsych/css/jspsych.css';
    import {setup_muse} from '$lib/eeg'
    import {session,group,participant,stage,markers} from '$lib/store'
    export let data;
    function saveToCsv(samples) 
    {
        const a = document.createElement('a');
    
        const headers = ['timestamp','marker' ].join(',');

        let csv_str=headers +'\n'
        samples.forEach(element => {
            let temp=Object.values(element).join(',')
            csv_str+=temp
            csv_str+='\n'
        });

        const file = new Blob([csv_str], { type: 'text/csv' });
        a.href = URL.createObjectURL(file);
        document.body.appendChild(a);
        a.download = `markers_${$group}_${$participant}_${$session}.csv`;
        a.click();
        document.body.removeChild(a);
    }

    /* initialize jsPsych */
    const jsPsych = initJsPsych({show_progress_bar: true});

    let timeline=[]
    const preload = {
    type: jsPsychPreload,
    auto_preload: true
    }
    timeline.push(preload);

    let welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Welcome to the experiment.<h1> 
        <h1 style='color:blue'> Press any key to connect with Muse. </h1>`
    };
    timeline.push(welcome);

    const start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<h1> Press any key to continue further ... </h1>",
    // on_load:async ()=>await setup_muse(muse_client),
    };

    timeline.push(start);

    let n_blocks=data.n_blocks
    let n_per_block=data.n_per_block
    let even_stimulus= '/audio/500hz_50ms.wav'
    let odd_stimulus= '/audio/2000hz_50ms.wav'

    let markers_arr=[]
    function insert_marker(marker){
        markers_arr.push({timestamp:new Date().getTime()/1000.0,marker})
    }


    let test_indices=[...new Array(n_per_block).keys()]

    let n_stim= Math.floor(n_per_block/8.0) +   Math.floor(Math.random() * n_per_block/8.0) + 1  
    let audio_arr=test_indices.map(el=>0)
    // console.log(n_stim )
    for(let i = 0; i < n_stim ; i++) 
    {
        while(true)
        {
        let loc=  Math.floor(Math.random() * (n_per_block-1)) + 1 
        if(audio_arr[loc-1] !=1 && audio_arr[loc] !=1  &&  audio_arr[loc+1]!=1)
        {
            audio_arr[loc]=1
            break
        }
        }
    }

    let test_counter=0
    let trial_block=1

    const oddball_selection=()=>{
        let response=even_stimulus
        if(audio_arr[test_counter]==1) {
            insert_marker(1001)
            response= odd_stimulus
        }
        else insert_marker(1002)

        test_counter+=1
        // console.log(test_counter)
        if(test_counter==n_per_block) { 
            test_counter= 0
            trial_block+=1
        }
  
        return response
    }

    let fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:700px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 500,
        data: {
        task: 'fixation'
        }
    };

    const trial = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: oddball_selection,
        choices: "NO_KEYS",
        post_trial_gap: 900,
        trial_ends_after_audio: true,
    };

    const trial_procedure={
        timeline: [trial],
        timeline_variables: test_counter,
        repetitions: n_per_block,
        randomize_order: true
    }

    const block_change = {
        type: jsPsychHtmlKeyboardResponse,
        choices: "NO_KEYS",
        stimulus:  `<h1> Trial Block No: ${trial_block}/${n_blocks}</h1>`,
        trial_duration: 1500,
    };

    const trial_blocks={
        timeline: [fixation,block_change,trial_procedure],
        timeline_variables: test_counter,
        repetitions: n_blocks,
        randomize_order: true
    }


    timeline.push(trial_blocks);


    const end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p>The experiment is complete. Thanks!</p>`,
        choices: "NO_KEYS",
        on_start: () => {
        // const id = jsPsych.data.get().filter({ task: "subject_id" }).values()[0]
        //   .response.Q0;
        // jsPsych.data.get().localSave("json", `subject-${id}-behavioral.json`);
        console.log(n_stim,markers_arr)
        $markers.push(markers_arr)
        $markers=$markers
        saveToCsv($markers) 
        // getData()
        },
    };
    timeline.push(end)
    
    jsPsych.run(timeline);
    
</script>

