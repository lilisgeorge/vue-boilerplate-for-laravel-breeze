<template>
  <GuestLayout>
    <main>
      <AuthCard>
        <h2 class="text-base text-center font-medium text-slate-800 mb-10">
          Verify email
        </h2>

        <div className="text-sm text-slate-600">
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

        <div class="mt-10">
          <Ui.Button
            type="button"
            class="w-full"
            @click="resendEmailVerification({ setStatus })"
          >
            Resend Verification Email
          </Ui.Button>

          <Ui.Button
            type="button"
            class="mt-4 w-full"
            theme="white"
            @click="logout"
          >
            Logout
          </Ui.Button>
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
import Ui from "@/components/Ui";

const { logout, resendEmailVerification } = useAuth({
  middleware: AuthMiddleware.AUTH,
});

const status = ref<null | string>(null);
const setStatus = (value: null | string) => {
  status.value = value;
};
</script>
