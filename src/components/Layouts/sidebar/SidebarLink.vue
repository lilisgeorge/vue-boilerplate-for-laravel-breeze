<template>
  <RouterLink custom v-slot="{ href, navigate, isActive, isExactActive }">
    <a
      :href="href"
      :class="[
        (exactMatch && isExactActive) || (!exactMatch && isActive)
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'group flex items-center px-3 py-2 text-sm font-normal rounded-md',
      ]"
      @click="navigate"
    >
      <component
        :is="icon"
        :class="[
          (exactMatch && isExactActive) || (!exactMatch && isActive)
            ? 'text-gray-300'
            : 'text-gray-400 group-hover:text-gray-300',
          'mr-3 flex-shrink-0 h-6 w-6',
        ]"
        aria-hidden="true"
      />
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition ease-in-out duration-300"
        enter-to-class="opacity-1"
        leave-from-class="opacity-1"
        leave-active-class="transition ease-in-out duration-300"
        leave-to-class="opacity-0"
      >
        <span v-if="!collapsed" class="truncate">Dashboard</span>
      </Transition>
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";
import { collapsed } from "./state";

defineProps<{
  exactMatch: boolean;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
}>();
</script>
