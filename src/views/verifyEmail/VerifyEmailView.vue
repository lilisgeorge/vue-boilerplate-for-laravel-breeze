<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <template #header>
          <h2 class="text-center text-3xl font-extrabold text-gray-900">
            Verify Email
          </h2>
        </template>

        <div className="text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <div
          v-if="status === 'verification-link-sent'"
          className="mt-4 font-medium text-sm text-green-600"
        >
          A new verification link has been sent to the email address you
          provided during registration.
        </div>

        <div class="mt-4">
          <button
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="resendEmailVerification({ setStatus })"
          >
            Resend Verification Email
          </button>

          <button
            type="button"
            className="mt-4 w-full underline text-sm text-gray-600 hover:text-gray-900"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </AuthCard>
    </main>
  </GuestLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth, AuthMiddleware } from "@/composables/useAuth";
import GuestLayout from "@/components/Layouts/GuestLayout.vue";
import AuthCard from "@/components/AuthCard.vue";

const { logout, resendEmailVerification } = useAuth({
  middleware: AuthMiddleware.AUTH,
});

const status = ref<null | string>(null);
const setStatus = (value: null | string) => {
  status.value = value;
};
</script>
