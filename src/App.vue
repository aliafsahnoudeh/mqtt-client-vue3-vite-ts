<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

import * as mqtt from 'mqtt/dist/mqtt.min.js';
import type { IClientOptions } from 'mqtt';

const options: IClientOptions = {
    clientId: 'clientId-sqt8rMcmA6',
    hostname: '21c9dfead6da4092a72c0da98562c2b5.s2.eu.hivemq.cloud',
    username: 'ali-test',
    password: 'FkNYnhLFmrTUj6_',
    protocol: 'wss',
    protocolVersion: 4,
    port: 8884,
    path: '/mqtt',
    clean: true,
    resubscribe: false,
    keepalive: 60,
    reconnectPeriod: 0,
}

// initialize the MQTT client
const client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error: any) {
    console.log(error);
});

client.on('message', function (topic:any, message:any) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
