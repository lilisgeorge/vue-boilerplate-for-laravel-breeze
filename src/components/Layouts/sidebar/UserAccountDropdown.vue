<template>
  <Menu as="div" class="ml-4 relative flex-shrink-0">
    <div>
      <MenuButton
        class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <img
          class="h-8 w-8 rounded-full"
          :src="`https://ui-avatars.com/api?name=${user.name}&size=${256}`"
          alt=""
        />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="item in userNavigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <a
            :href="item.href"
            :class="[
              active ? 'bg-slate-100' : '',
              'block px-4 py-2 text-sm text-slate-700',
            ]"
            >{{ item.name }}</a
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            class="block px-4 py-2 text-sm text-slate-700 w-full text-left"
            :class="{ 'bg-slate-100': active }"
            @click="logout"
          >
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import type { User } from "@/composables/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

defineProps<{
  user: User;
  logout: () => void;
}>();

const userNavigation = [];
</script>
