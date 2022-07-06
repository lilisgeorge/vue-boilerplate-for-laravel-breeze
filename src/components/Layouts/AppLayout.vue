<template>
  <AppSidebar v-if="user" :user="user" :logout="logout" />
  <div
    v-if="user"
    class="antialized transition-all"
    :class="[contentMarginClass]"
  >
    <nav class="bg-white border-b border-gray-200">
      <div class="mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative flex items-center justify-between h-14">
          <!-- Search section -->
          <div class="flex-1 flex justify-center lg:justify-end"></div>
          <div class="flex items-center justify-end">
            <UserAccountDropdown :user="user" :logout="logout" />
          </div>
        </div>
      </div>
    </nav>
    <slot v-if="user" :user="user" />
  </div>
</template>

<script setup lang="ts">
import { AuthMiddleware, useAuth } from "@/composables/useAuth";

import AppSidebar from "./sidebar/AppSidebar.vue";
import { contentMarginClass } from "./sidebar/state";
import UserAccountDropdown from "./sidebar/UserAccountDropdown.vue";

const { user, logout } = useAuth({ middleware: AuthMiddleware.AUTH });
</script>
