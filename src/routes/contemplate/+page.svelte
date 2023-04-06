
<script>

    import {initJsPsych} from 'jspsych';
    import  jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
    import  jsPsychAudioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response';
    import  jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
    import  jsPsychPreload from '@jspsych/plugin-preload';
    import 'jspsych/css/jspsych.css';
    import {setup_muse} from '$lib/eeg'
    import {session,group,participant,stage,markers} from '$lib/store'
    export let data

    $group=data.group
    $stage=data.stage

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
        <h1 style='color:blue'> Press any key to start the self reflective questions</h1>
        <ul> 
            <li>The duration of each will be for 30 seconds</li> 
            <li>Please close your eyes and hear the question being asked <li> 
            <li>Then, you will have to contemplate on the answer mentally without opening eyes</li>
            <li>Please do not sleep </li>
        </ul>
        `
    };
    timeline.push(welcome);

    let question_index=0
    let assessment=[]
    if($group=='N')
    {
        assessment=[
            '/audio/assessment/N/1.mp3',
            '/audio/assessment/N/2.mp3',
            '/audio/assessment/N/3.mp3',
            '/audio/assessment/N/4.mp3',
        ]
    }
    else if($group=='M')
    {
        assessment=[
            '/audio/assessment/M/1.mp3',
            '/audio/assessment/M/2.mp3',
            '/audio/assessment/M/3.mp3',
            '/audio/assessment/M/4.mp3',
        ]       
    }
    const trial = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: assessment[question_index],
        choices: "NO_KEYS",
        post_trial_gap: 1000,
        trial_ends_after_audio: true,
        on_start: () => { 
            let temp={timestamp:new Date().getTime()/1000.0,marker:301 + question_index}
            $markers.push(temp)
            $markers=$markers
        },
        on_finish: ()=>{
            let temp={timestamp:new Date().getTime()/1000.0,marker:320+ question_index}
            $markers.push(temp)
            $markers=$markers
            question_index+=1
        } 
    };
    
    const trial_procedure={
        timeline: [trial],
        timeline_variables: question_index,
        repetitions: assessment.length ,
        randomize_order: true
    }

    timeline.push(trial_procedure);
    
    const trial_end = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: '/audio/assessment/open_eyes.mp3',
        choices: "NO_KEYS",
        post_trial_gap: 1000,
        trial_ends_after_audio: true,
    }
    timeline.push(trial_end);

    const end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<a href='/oddball' >Click to proceed to the last stage</a>`,
        choices: "NO_KEYS",
    };
    timeline.push(end)
    jsPsych.run(timeline);
</script>


