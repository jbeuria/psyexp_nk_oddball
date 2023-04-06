
<script>

    import {initJsPsych} from 'jspsych';
    import  jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
    import  jsPsychAudioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response';
    import  jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
    import  jsPsychPreload from '@jspsych/plugin-preload';
    import 'jspsych/css/jspsych.css';
    import {setup_muse} from '$lib/eeg'
    import {session,group,participant,stage,markers} from '$lib/store'
 

    $stage=1
    $group='M'
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
        <h1 style='color:blue'> Press any key to play the meditative kirtan. </h1>
        <ul> 
            <li>The duration is around 10 minutes</li> 
            <li>Please close your eyes and try to hear each and every word attentively<li> 
            <li>Thereafter, You will be asked certain questions</li>
        </ul>
        `
    };
    timeline.push(welcome);

    let narrative_file='/audio/jahnavi_harrison.mp3'

    const trial = {
        type: jsPsychAudioKeyboardResponse,
        stimulus: narrative_file,
        choices: "NO_KEYS",
        post_trial_gap: 1000,
        trial_ends_after_audio: true,
        on_start: () => { 
            let temp={timestamp:new Date().getTime()/1000.0,marker:201}
            $markers.push(temp)
            $markers=$markers
        },
        on_finish: ()=>{
            let temp={timestamp:new Date().getTime()/1000.0,marker:202}
            $markers.push(temp)
            $markers=$markers
        } 
    };

    timeline.push(trial);
    
    const end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<a href='/contemplate?group=M' >Click to proceed to assessment stage</a>`,
        choices: "NO_KEYS",
    };
    timeline.push(end)

    jsPsych.run(timeline);
</script>


