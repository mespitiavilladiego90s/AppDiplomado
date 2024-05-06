<template>
  <div class="w-full">
    <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
      <div class="g-0 lg:flex lg:flex-wrap">
        <!-- Left column container-->
        <div class="px-4 md:px-0 lg:w-6/12">
          <div class="md:mx-6 md:p-12">
            <!--Logo-->
            <div class="text-center">
              <img class="mx-auto w-48" src="/logo.png" alt="logo" />
              <h1 class="mb-12 mt-1 pb-1 text-xl font-semibol">
                La solución a la búsqueda de datos dentro de la Universidad!
              </h1>
            </div>

            <form>
              <h2 class="mb-4 text-4xl font-black">{{ title }}</h2>
              <!--Username input-->
              <div class="relative mb-4" data-twe-input-wrapper-init>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tu email"
                  v-model="email"
                  @input="$emit('update:email', email)"
                />
              </div>

              <!--Password input-->
              <div class="relative mb-4" data-twe-input-wrapper-init>
                <input
                  type="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tu contraseña"
                  v-model="password"
                  @input="$emit('update:password', password)"
                />
              </div>

              <!--Submit button-->
              <div class="mb-12 pb-1 pt-1 text-center">
                <button
                  @click="action"
                  class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  style="
                    background: linear-gradient(
                      to right,
                      #236c16,
                      #339f10,
                      #3ec30c,
                      #47e008
                    );
                  "
                >
                  {{ actionText }}
                </button>

                <button
                  @click="signInWithGoogle"
                  class="w-full px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                  type="button"
                >
                  <img
                    class="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>{{ googleButtonText }}</span>
                </button>
              </div>

              <!--Register button-->
              <div class="flex items-center justify-between pb-6">
                <p class="mb-0 me-2">{{ footerText }}</p>
                <button
                  type="button"
                  class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  <RouterLink :to="link">{{ footerButtonText }} </RouterLink>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Right column container with background and description-->
        <div
          class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
          style="
            background: linear-gradient(
              to right,
              #236c16,
              #339f10,
              #3ec30c,
              #47e008
            );
          "
        >
          <div class="px-4 py-6 text-white md:mx-6 md:p-12">
            <h4 class="mb-6 text-xl font-semibold">
              ¡Búsqueda de datos interesantes, ahora mucho más fácil!
            </h4>
            <p class="text-sm">
              Con nuestra app podrás obtener y visualizar datos muy interesantes
              que te ayudarán en cualquier tipo de investigación que tengas,
              además, podrás requerir cualquier tipo de información que esté
              expuesta al público.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "vue-toastification";

export default defineComponent({
  props: {
    title: String,
    actionText: String,
    googleButtonText: String,
    footerText: String,
    footerButtonText: String,
    action: {
      type: Function as () => any,
      required: false,
    },
    link: String,
  },
  setup() {
    const email: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const router = useRouter();
    const toast = useToast();

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((_result) => {
          toast.success("Successfully Logged in with Google", {
            timeout: 2000,
          });
          router.push("/act1");
        })
        .catch((error) => {
          toast.error("Error: " + error.code, {
            timeout: 2000,
          });
        });
    };

    return {
      email,
      password,
      signInWithGoogle,
    };
  },
});
</script>
