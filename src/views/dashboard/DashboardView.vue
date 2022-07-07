<template>
  <div class="max-w-7xl mx-auto my-5">
    <h2 class="font-semibold text-xl text-slate-900">Dashboard</h2>
  </div>
  <div class="max-w-7xl mx-auto my-5">
    <h1 class="text-lg font-light text-slate-900">
      Hi <span class="font-medium">{{ firstName }}</span
      >, build something interesting!
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/composables/useAuth";
import { computed } from "@vue/reactivity";
const props = defineProps<{
  user: User;
}>();

const firstName = computed(() => props.user.name.split(" ")[0]);
</script>
