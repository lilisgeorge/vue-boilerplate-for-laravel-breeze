<template>
  <button
    class="w-full flex justify-center py-2 px-4 border rounded text-sm font-medium focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-colors duration-150"
    :class="className"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["theme"]);

const className = computed(() => {
  if (props.theme === "white") {
    return "border-slate-300 text-slate-900 bg-white hover:border-slate-900 focus:ring-blue-500 focus:border-slate-900";
  }

  return "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500";
});
</script>
