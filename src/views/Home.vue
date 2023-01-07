<script setup lang="ts">
import Connect from "../components/Connect.vue";
import Subscribe from "../components/Subscribe.vue";
import Publish from "../components/Publish.vue";
import Messages from "../components/Messages.vue";
</script>

<template>
  <div class="container">
    <Connect />
    <Publish />

    <Subscribe />
    <Messages />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 2fr 5fr;
  max-width: 100vw;
  max-height: 85vh;

  padding: 30px;
}
</style>
