<script setup lang="ts">
const { timelineItems } = useSystemData()
</script>

<template>
  <UiTimeline :items="timelineItems" />
</template>
