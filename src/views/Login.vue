<template>
  <div>
    <AuthLayout
      :title="'Inicia sesión en tu cuenta para continuar'"
      :actionText="'Iniciar Sesión'"
      :googleButtonText="'Login in with Google'"
      :footerText="'¿No tienes cuenta?'"
      :footerButtonText="'Crea Una'"
      :action="login"
      :link="'/register'"
      v-model:email="email"
      v-model:password="password"
    />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toast = useToast();
    const email = ref("");
    const password = ref("");

    const login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
          router.push("/act1");
          toast.success("Successfully Logged in!", {
            timeout: 2000,
          });
        })
        .catch((error) => {
          const errors = [];
          switch (error.code) {
            case "auth/invalid-credential":
              errors.push("Invalid credentials provided.");
              break;
            case "auth/invalid-email":
              errors.push("Invalid email.");
              break;
            case "auth/user-not-found":
              errors.push("No account with that email was found.");
              break;
            case "auth/wrong-password":
              errors.push("Incorrect password.");
              break;
            default:
              errors.push("An error occurred while logging in.");
              break;
          }

          errors.forEach((errorMessage) => {
            toast.error(errorMessage, {
              timeout: 2000,
            });
          });
        });
    };

    return {
      email,
      password,
      login
    };
  },
});
</script>
