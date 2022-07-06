<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <template #header>
          <h2 class="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </template>

        <ValidationErrorMessages :errors="errors" class="mb-4" />

        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Email address -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <RouterLink
                :to="{ name: RouteNames.FORGOT_PASSWORD }"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </RouterLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>

            <div class="mt-4 text-center text-sm">
              Don't have an account ?
              <RouterLink
                to="/register"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </RouterLink>
            </div>
          </div>
        </form>
      </AuthCard>
    </main>
  </GuestLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  useAuth,
  type LoginValidationErrors,
  AuthMiddleware,
} from "@/composables/useAuth";
import { RouteNames } from "@/router";
import GuestLayout from "@/components/Layouts/GuestLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import ValidationErrorMessages from "@/components/ValidationErrorMessages.vue";

const email = ref("");
const password = ref("");
const errors = ref<LoginValidationErrors>({});
const setErrors = (value: LoginValidationErrors) => {
  errors.value = value;
};

const { login } = useAuth({
  middleware: AuthMiddleware.GUEST,
  redirectIfAuthenticated: {
    name: "home",
  },
});

function submitForm() {
  login({
    loginData: {
      email: email.value,
      password: password.value,
    },
    setErrors,
  });
}
</script>
