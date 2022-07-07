<template>
  <GuestLayout>
    <AuthCard>
      <h2 class="text-base text-center font-medium text-slate-800 mb-10">
        Reset your password
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

          <!-- Password confirmation -->
          <FormKit.TextField
            v-model="passwordConfirmation"
            label="Confirm password"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <div class="mt-10">
          <Ui.Button type="submit"> Reset Password </Ui.Button>
        </div>
      </form>
    </AuthCard>
  </GuestLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  useAuth,
  type PasswordResetValidationErrors,
  AuthMiddleware,
} from "@/composables/useAuth";
import { RouteNames } from "@/router";
import GuestLayout from "@/components/Layouts/GuestLayout.vue";
import AuthCard from "@/components/AuthCard.vue";
import ValidationErrorMessages from "@/components/ValidationErrorMessages.vue";
import Ui from "@/components/Ui";
import FormKit from "@/components/FormKit";

const props = defineProps<{
  token: string;
}>();

const route = useRoute();
const email = ref(
  typeof route.query?.email === "string" ? route.query?.email : ""
);
const password = ref("");
const passwordConfirmation = ref("");
const errors = ref<PasswordResetValidationErrors>({});
const setErrors = (value: PasswordResetValidationErrors) => {
  errors.value = value;
};

const { resetPassword } = useAuth({
  middleware: AuthMiddleware.GUEST,
  redirectIfAuthenticated: {
    name: RouteNames.HOME,
  },
});

function submitForm() {
  resetPassword({
    passwordResetData: {
      token: props.token,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    },
    setErrors,
  });
}
</script>
