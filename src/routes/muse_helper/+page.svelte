<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Plot</title>
    <style>
        .electrode-section {
            display: flex;
            flex-wrap: wrap;
            padding: 5px;
        }

        .electrode-item {
            margin: 5px;
        }

        .electrode-item h3 {
            text-align: center;
            margin-bottom: 4px;
        }

        canvas {
            background: #333;
            border: solid black 1px;
        }
    </style>
</svelte:head>

<script>
import { channelNames, EEGReading, MuseClient } from 'muse-js';
import { SmoothieChart, TimeSeries } from 'smoothie';

async function  stream()
{
    const graphTitles = Array.from(document.querySelectorAll('.electrode-item h3'));
    const canvases = Array.from(document.querySelectorAll('.electrode-item canvas')) ; //as HTMLCanvasElement[];
    const canvasCtx = canvases.map((canvas) => canvas.getContext('2d'));

    graphTitles.forEach((item, index) => {
        item.textContent = channelNames[index];
    });

    function dump_to_csv(reading)
    {
        for (let i = 0; i < reading.samples.length; i++) {

        }
    }
    function plot(reading) {
        // console.log(reading)

       
        const canvas = canvases[reading.electrode];
        const context = canvasCtx[reading.electrode];
        if (!context) {
            return;
        }
        const width = canvas.width / 12.0;
        const height = canvas.height / 2.0;
        context.fillStyle = 'green';
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < reading.samples.length; i++) {
            const sample = reading.samples[i] / 15.;
            if (sample > 0) {
                context.fillRect(i * 25, height - sample, width, sample);
            } else {
                context.fillRect(i * 25, height, width, -sample);
            }
        }
    }

    const client = new MuseClient();
    client.connectionStatus.subscribe((status) => {
        console.log(status ? 'Connected!' : 'Disconnected');
    });

    try {
        client.enableAux = true;
        await client.connect();
        await client.start();
        document.getElementById('headset-name').innerText = client.deviceName;

        client.eegReadings.subscribe((reading) => {
            plot(reading);

        });

        client.telemetryData.subscribe((reading) => {
            document.getElementById('temperature').innerText = reading.temperature.toString() + '℃';
            document.getElementById('batteryLevel').innerText = reading.batteryLevel.toFixed(2) + '%';
        });

        client.accelerometerData.subscribe((accel) => {
            const normalize = (v) => (v / 16384.).toFixed(2) + 'g';
            document.getElementById('accelerometer-x').innerText = normalize(accel.samples[2].x);
            document.getElementById('accelerometer-y').innerText = normalize(accel.samples[2].y);
            document.getElementById('accelerometer-z').innerText = normalize(accel.samples[2].z);
        });
        await client.deviceInfo().then((deviceInfo) => {
            document.getElementById('hardware-version').innerText = deviceInfo.hw;
            document.getElementById('firmware-version').innerText = deviceInfo.fw;
        });
    } catch (err) {
        console.error('Connection failed', err);
    }
};

function smoothie_plots(id='TP9',series)
{
    // Create a time series
    var series = new TimeSeries();

    // Find the canvas
    var canvas = document.getElementById(id);

    // Create the chart
    var chart = new SmoothieChart();
    chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)' });
    chart.streamTo(canvas, 500);
}


</script>

<section>
    <button on:click={stream}>
        Connect!
    </button>
    <div>
        Name: <span id="headset-name">unknown</span>
        Firmware: <span id="firmware-version">unknown</span>,
        Hardware version: <span id="hardware-version">unknown</span>.
    </div>
    
    <div>
        Temperature: <span id="temperature">unknown</span>, Battery: <span id="batteryLevel">unknown</span>
    </div>
    
    <div>
        Accelerometer: x=<span 
        id="accelerometer-x">?</span>, y=<span 
        id="accelerometer-y">?</span>, z=<span 
        id="accelerometer-z">?</span>
    </div>
    
    <div class="electrode-section">
        <div class="electrode-item">
            <h3>Electrode 1</h3>
            <canvas id="electrode1"></canvas>
        </div>
    
        <div class="electrode-item">
            <h3>Electrode 2</h3>
            <canvas id="electrode2"></canvas>
        </div>
    
        <div class="electrode-item">
            <h3>Electrode 3</h3>
            <canvas id="electrode3"></canvas>
        </div>
    
        <div class="electrode-item">
            <h3>Electrode 4</h3>
            <canvas id="electrode4"></canvas>
        </div>
    
        <div class="electrode-item">
            <h3>Electrode 5</h3>
            <canvas id="electrode5"></canvas>
        </div>
    </div>
    
</section>

<section>

    <canvas id="TP9" width="400" height="100"></canvas>

    <canvas id="AF7" width="400" height="100"></canvas>

    <canvas id="AF8" width="400" height="100"></canvas>

    <canvas id="TP10" width="400" height="100"></canvas>

</section>