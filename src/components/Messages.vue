<script setup lang="ts">
import { useMqttClientStore } from "../store/mqttClient";

const store = useMqttClientStore();
</script>

<template>
  <Card>
    <template #header> Messages </template>
    <template #content>
      <div class="content-container">
        <DataTable :value="store.receivedMessages" responsiveLayout="scroll">
          <Column field="body" header="Message"></Column>
          <Column field="topic" header="Topic"></Column>
          <Column field="qos" header="Qos"></Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.content-container {
  overflow-y: scroll;
  max-height: 35vh;
}
</style>
