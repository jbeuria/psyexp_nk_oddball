import { channelNames, EEGReading, MuseClient } from 'muse-js';


export async function setup_muse(client) {
  let muse_client = new MuseClient();
    await client.connect();
    await client.start();
    client.eegReadings.subscribe(reading => {
      console.log(reading);
    });
    client.telemetryData.subscribe(telemetry => {
      console.log(telemetry);
    });
    client.accelerometerData.subscribe(acceleration => {
      console.log(acceleration);
    });
}