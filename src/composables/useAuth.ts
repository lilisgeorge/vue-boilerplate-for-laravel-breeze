import useSWRV from "swrv";
import axios, { isAxiosError, type ValidationError } from "@/lib/axios";
import { watchEffect } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import type { AxiosError } from "axios";
import { RouteNames } from "@/router";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterValidationErrors = {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginValidationErrors = {
  email?: Array<string>;
  password?: Array<string>;
};

export type ForgotPasswordValidationErrors = {
  email?: Array<string>;
};

export type PasswordResetData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type PasswordResetValidationErrors = {
  email?: Array<string>;
  password?: Array<string>;
};

export type SetErrors<T = Record<string, Array<string>>> = (errors: T) => void;
export type SetStatus = (value: null | string) => void;

export enum AuthMiddleware {
  GUEST = "GUEST",
  AUTH = "AUTH",
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: AuthMiddleware;
  redirectIfAuthenticated?: RouteLocationRaw;
} = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWRV<User>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push({ name: RouteNames.VERIFY_EMAIL });
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({
    registerData,
    setErrors,
  }: {
    registerData: RegisterData;
    setErrors: SetErrors<RegisterValidationErrors>;
  }) => {
    await csrf();

    setErrors({});

    axios
      .post("/register", registerData)
      .then(() => mutate())
      .catch((error: AxiosError<ValidationError<RegisterValidationErrors>>) => {
        if (!isAxiosError(error) || error.response?.status !== 422) {
          throw error;
        }

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({
    loginData,
    setErrors,
  }: {
    loginData: LoginData;
    setErrors: SetErrors<LoginValidationErrors>;
  }) => {
    await csrf();

    setErrors({});

    axios
      .post("/login", loginData)
      .then(() => mutate())
      .catch((error: AxiosError<ValidationError<LoginValidationErrors>>) => {
        if (!isAxiosError(error) || error.response?.status !== 422) {
          throw error;
        }

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: {
    setErrors: SetErrors<ForgotPasswordValidationErrors>;
    setStatus: SetStatus;
    email: string;
  }) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch(
        (
          error: AxiosError<ValidationError<ForgotPasswordValidationErrors>>
        ) => {
          if (!isAxiosError(error) || error.response?.status !== 422) {
            throw error;
          }

          setErrors(error.response.data.errors);
        }
      );
  };

  const resetPassword = async ({
    setErrors,
    passwordResetData,
  }: {
    setErrors: SetErrors<PasswordResetValidationErrors>;
    passwordResetData: PasswordResetData;
  }) => {
    await csrf();

    setErrors({});

    axios
      .post("/reset-password", passwordResetData)
      .then((response) =>
        router.push({
          name: RouteNames.LOGIN,
          query: {
            reset: Buffer.from(response.data.status, "binary").toString(
              "base64"
            ),
          },
        })
      )
      .catch(
        (error: AxiosError<ValidationError<PasswordResetValidationErrors>>) => {
          if (!isAxiosError(error) || error.response?.status !== 422) {
            throw error;
          }

          setErrors(error.response.data.errors);
        }
      );
  };

  const resendEmailVerification = ({ setStatus }: { setStatus: SetStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error.value) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  watchEffect(() => {
    if (
      middleware === AuthMiddleware.GUEST &&
      redirectIfAuthenticated &&
      user.value
    ) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === AuthMiddleware.AUTH && error.value) {
      logout();
    }
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
