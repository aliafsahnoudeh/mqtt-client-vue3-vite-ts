<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useMqttClientStore } from "../store/mqttClient";
import { useMqttClient } from "../composables/useMqttClient";
import type { QoS } from "mqtt";

const topic: Ref<string> = ref("");
const qos: Ref<QoS> = ref("");

const OoSOptions = ["0", "1", "2"];

const store = useMqttClientStore();
const { subscribe } = useMqttClient();

async function handleSubscribe() {
  await subscribe(topic.value);
}
</script>

<template>
  <Card>
    <template #header> Subscriptions </template>
    <template #content>
      <div class="content-container">
        <div class="content-container-inputs">
          <span class="p-float-label">
            <InputText id="topic" type="text" v-model="topic" />
            <label for="topic">Topic</label>
          </span>

          <span class="p-float-label">
            <Dropdown
              id="qos"
              v-model="qos"
              :options="OoSOptions"
              placeholder="Quality of Service (QoS)"
            />
            <label for="qos">QoS</label>
          </span>
        </div>

        <div class="content-container-table">
          <DataTable :value="store.subscribedTopics" responsiveLayout="scroll">
            <Column field="topic" header="Topic"></Column>
            <Column field="qos" header="Qos"></Column>
          </DataTable>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        icon="pi"
        label="Subscribe"
        :disabled="!store.connected || topic.length === 0"
        @click="handleSubscribe"
      />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  row-gap: 5vh;

  &-inputs {
    display: flex;
    column-gap: 2vw;
  }

  &-table {
    max-height: 15vh;
    overflow-y: scroll;
  }
}
</style>
