<script setup lang="ts">
const props = defineProps({
  message: String,
});
</script>

<template>
  <div class="message-container">
    {{ props.message }}
  </div>
</template>
