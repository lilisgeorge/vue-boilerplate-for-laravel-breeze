<template>
  <input
    :value="modelValue"
    class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition duration-150 sm:text-sm"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const handleInput = (evt: Event) => {
  emit("update:modelValue", (evt.target as HTMLInputElement).value);
};
</script>
