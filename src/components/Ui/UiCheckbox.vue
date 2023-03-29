<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const handleChange = (evt: Event) => {
  emit("update:modelValue", (evt.target as HTMLInputElement).value);
};
</script>

<template>
  <label :class="[$slots.default ? 'flex pl-6' : '']">
    <input
      v-bind="$attrs"
      :value="modelValue"
      type="checkbox"
      class="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-4 focus:ring-offset-0 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 sm:text-sm transition duration-150"
      :class="[$slots.default ? '-ml-6 mt-0.5' : '']"
      @change="handleChange"
    />
    <span v-if="$slots.default" class="ml-2 block text-sm text-slate-900">
      <slot />
    </span>
  </label>
</template>
