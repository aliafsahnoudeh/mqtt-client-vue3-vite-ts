<script setup lang="ts">
import type IServices from "../services/IServices";
import type IMqttService from "../services/IMqttService";
import { inject, reactive, ref } from "vue";
import type { Ref } from "vue";
import { useMqttClient } from "../store/mqttClient";
import { ISubscriptionGrant } from "mqtt";

const services = inject<IServices | null>("services");
let mqttService: IMqttService;
if (services !== undefined && services !== null)
  mqttService = services.mqttService;

const topic: Ref<string> = ref("");
const subscribedTopics: ISubscriptionGrant[] = reactive([]);

const store = useMqttClient();

async function subscribe() {
  const result = await mqttService.subscribe(topic.value);
  result.forEach((item) => subscribedTopics.push(item));
}
</script>

<template>
  <Card>
    <template #header>
      <Avatar icon="pi pi-user" size="xlarge" />
    </template>
    <template #content>
      <div class="content-container">
        <span class="p-float-label">
          <InputText id="topic" type="text" v-model="topic" />
          <label for="topic">Topic</label>
        </span>

        <DataTable :value="subscribedTopics" responsiveLayout="scroll">
          <Column field="topic" header="Topic"></Column>
          <Column field="qos" header="Qos"></Column>
        </DataTable>
      </div>
    </template>
    <template #footer>
      <Button
        icon="pi pi-check"
        label="Subscribe"
        :disabled="!store.connected"
        @click="subscribe"
      />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  row-gap: 5vh;

  &-credentials {
    display: flex;
    column-gap: 2vw;
  }
}
</style>
