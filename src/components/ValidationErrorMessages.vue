<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div v-if="errorMessages.length" class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          Whoops! Something went wrong.
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc pl-5 space-y-1">
            <li v-for="(msg, index) in errorMessages" :key="index">
              {{ msg }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  errors: Record<string, Array<string>>;
}>();

const errorMessages = computed(() => {
  return Object.values(props.errors).flat();
});
</script>
