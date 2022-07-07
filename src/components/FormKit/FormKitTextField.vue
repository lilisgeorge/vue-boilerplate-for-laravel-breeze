<template>
  <div>
    <UiLabel :for="$attrs.id"> {{ label }} </UiLabel>
    <div class="mt-2">
      <UiInput :model-value="modelValue" v-bind="$attrs" @input="handleInput" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import UiLabel from "@/components/Ui/UiLabel.vue";
import UiInput from "@/components/Ui/UiInput.vue";

defineProps(["modelValue", "label"]);
const emit = defineEmits(["update:modelValue"]);

const handleInput = (evt: Event) => {
  emit("update:modelValue", (evt.target as HTMLInputElement).value);
};
</script>
