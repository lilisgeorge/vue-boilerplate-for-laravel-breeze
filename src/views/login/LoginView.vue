<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <h2 class="text-base text-center font-medium text-slate-800 mb-10">
          Login to your account
        </h2>

        <ValidationErrorMessages :errors="errors" class="mb-4" />

        <form @submit.prevent="submitForm">
          <div class="space-y-6">
            <!-- Email address -->
            <FormKit.TextField
              v-model="email"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
            />

            <!-- Password -->
            <FormKit.TextField
              v-model="password"
              label="Password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
            />

            <!-- Remember me -->
            <div class="flex items-center justify-between">
              <Ui.Checkbox id="remember-me" name="remember-me">
                Remember me
              </Ui.Checkbox>

              <div class="text-sm">
                <Ui.Link :to="{ name: RouteNames.FORGOT_PASSWORD }">
                  Forgot your password?
                </Ui.Link>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <Ui.Button type="submit"> Login </Ui.Button>

            <div class="mt-4 text-center text-sm">
              Don't have an account yet?
              <Ui.Link to="/register"> Register </Ui.Link>
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
import Ui from "@/components/Ui";
import FormKit from "@/components/FormKit";

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
