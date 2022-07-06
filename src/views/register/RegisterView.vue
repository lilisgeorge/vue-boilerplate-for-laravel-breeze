<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <template #header>
          <h2 class="text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </template>

        <ValidationErrorMessages :errors="errors" class="mb-4" />

        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Name -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div class="mt-1">
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

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

          <!-- Password confirmation -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div class="mt-1">
              <input
                v-model="passwordConfirmation"
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="current-password"
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
              Register
            </button>

            <div class="mt-4 text-center text-sm">
              Already have an account ?
              <RouterLink
                to="/login"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
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
  type RegisterValidationErrors,
  AuthMiddleware,
} from "@/composables/useAuth";
import GuestLayout from "@/components/Layouts/GuestLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import ValidationErrorMessages from "@/components/ValidationErrorMessages.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errors = ref<RegisterValidationErrors>({});
const setErrors = (value: RegisterValidationErrors) => {
  errors.value = value;
};

const { register } = useAuth({
  middleware: AuthMiddleware.GUEST,
  redirectIfAuthenticated: {
    name: "home",
  },
});

function submitForm() {
  register({
    registerData: {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    },
    setErrors,
  });
}
</script>
