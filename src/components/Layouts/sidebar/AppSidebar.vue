<template>
  <div
    class="fixed top-0 left-0 bottom-0 bg-slate-800 transition-all flex flex-col"
    :class="[sidebarWidthClass]"
  >
    <div class="flex items-center flex-shrink-0 p-4">
      <img
        class="h-8 w-auto rounded-full"
        src="https://ui-avatars.com/api?name=vue-laravel-breeze&size=256&background=42b883&color=000000"
        alt="Vue laraver breeze logo"
      />
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition ease-in-out duration-300"
        enter-to-class="opacity-1"
        leave-from-class="opacity-1"
        leave-active-class="transition ease-in-out duration-300"
        leave-to-class="opacity-0"
      >
        <span v-if="!collapsed" class="ml-4 text-white text-lg truncate"
          >Vue Laravel Breeze</span
        >
      </Transition>
    </div>
    <div class="flex-1 px-2 py-4 space-y-1">
      <SidebarLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        :exact-match="item.exactMatch"
        :icon="item.icon"
        >Dashboard</SidebarLink
      >
    </div>
    <div class="mt-auto p-4">
      <CollapseButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/outline";
import { sidebarWidthClass, collapsed } from "./state";
import CollapseButton from "./CollapseButton.vue";
import SidebarLink from "./SidebarLink.vue";

const navigation = [{ to: "/dashboard", exactMatch: true, icon: HomeIcon }];
</script>
