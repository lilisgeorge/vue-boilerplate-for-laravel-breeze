<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <template #header>
          <h2 class="text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </template>

        <div class="text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        <div v-if="status" class="mt-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>

        <ValidationErrorMessages :errors="errors" class="mt-4" />

        <form class="mt-4 space-y-6" @submit.prevent="submitForm">
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

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Email Password Reset Link
            </button>
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
import GuestLayout from "@/components/Layouts/GuestLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import { RouteNames } from "@/router";
import ValidationErrorMessages from "@/components/ValidationErrorMessages.vue";

const email = ref("");
const errors = ref<LoginValidationErrors>({});
const setErrors = (value: LoginValidationErrors) => {
  errors.value = value;
};
const status = ref<null | string>(null);
const setStatus = (value: null | string) => {
  status.value = value;
};

const { forgotPassword } = useAuth({
  middleware: AuthMiddleware.GUEST,
  redirectIfAuthenticated: {
    name: RouteNames.HOME,
  },
});

function submitForm() {
  forgotPassword({
    email: email.value,
    setStatus,
    setErrors,
  });
}
</script>
