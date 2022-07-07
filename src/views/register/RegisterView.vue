<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <h2 class="text-base text-center font-medium text-slate-800 mb-10">
          Create new account
        </h2>

        <ValidationErrorMessages :errors="errors" class="mb-4" />

        <form @submit.prevent="submitForm">
          <div class="space-y-6">
            <!-- Name -->
            <FormKit.TextField
              v-model="name"
              label="Name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
            />

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
            <Ui.Button type="submit"> Register </Ui.Button>

            <div class="mt-4 text-center text-sm">
              Already have an account ?
              <Ui.Link to="/login"> Login </Ui.Link>
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
import Ui from "@/components/Ui";
import FormKit from "@/components/FormKit";

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
