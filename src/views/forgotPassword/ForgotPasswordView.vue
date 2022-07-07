<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <h2 class="text-base text-center font-medium text-slate-800 mb-10">
          Forgot password
        </h2>

        <div class="text-sm text-slate-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        <div v-if="status" class="mt-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>

        <ValidationErrorMessages :errors="errors" class="mt-4" />

        <form class="mt-4" @submit.prevent="submitForm">
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

          <div class="mt-10">
            <Ui.Button type="submit"> Email Password Reset Link </Ui.Button>
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
import Ui from "@/components/Ui";
import FormKit from "@/components/FormKit";

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
