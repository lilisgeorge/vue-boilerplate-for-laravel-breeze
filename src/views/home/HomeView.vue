<template>
  <AppLayout v-slot="{ user }">
    <RouterView v-if="user" :user="user" />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/components/Layouts/AppLayout.vue";
</script>
