import { createRouter, createWebHistory } from "vue-router";

export enum RouteNames {
  HOME = "home",
  REGISTER = "register",
  LOGIN = "login",
  FORGOT_PASSWORD = "forgot-password",
  PASSWORD_RESET = "password-reset",
  VERIFY_EMAIL = "verify-email",
  NOT_FOUND = "not-found",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/home/HomeView.vue"),
      redirect: () => {
        return { name: RouteNames.HOME };
      },
      children: [
        {
          path: "/dashboard",
          name: RouteNames.HOME,
          component: () => import("../views/dashboard/DashboardView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: RouteNames.LOGIN,
      component: () => import("../views/login/LoginView.vue"),
    },
    {
      path: "/register",
      name: RouteNames.REGISTER,
      component: () => import("../views/register/RegisterView.vue"),
    },
    {
      path: "/verify-email",
      name: RouteNames.VERIFY_EMAIL,
      component: () => import("../views/verifyEmail/VerifyEmailView.vue"),
    },
    {
      path: "/forgot-password",
      name: RouteNames.FORGOT_PASSWORD,
      component: () => import("../views/forgotPassword/ForgotPasswordView.vue"),
    },
    {
      path: "/password-reset/:token",
      name: RouteNames.PASSWORD_RESET,
      component: () => import("../views/passwordReset/PasswordResetView.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: RouteNames.NOT_FOUND,
      redirect: () => {
        return "/";
      },
    },
  ],
});

export default router;
