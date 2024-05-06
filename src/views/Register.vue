<template>
  <div>
    <AuthLayout
      :title="'Registra la cuenta para continuar'"
      :actionText="'Registrarse'"
      :googleButtonText="'Sign in with Google'"
      :footerText="'Ya tienes una cuenta?'"
      :footerButtonText="'Inicia Sesión'"
      :action="register"
      :link="'/login'"
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
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toast = useToast();
    const email = ref("");
    const password = ref("");

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
          .then(() => {
            router.push("/login");
            toast.success("Successfully registered!", {
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
              case "auth/email-already-in-use":
                errors.push("Email already in use.");
                break;
              case "auth/weak-password":
                errors.push("Password should be at least 6 characters.");
                break;
              default:
                errors.push("An error occurred while registering.");
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
      register
    };
  },
});
</script>