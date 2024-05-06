<template>
    <aside
      class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-green-600"
    >
      <div class="sidebar-header flex items-center justify-center py-4">
        <div class="inline-flex">
          <a href="#" class="inline-flex flex-row items-center">
            <img
              src="https://www.svgrepo.com/show/474542/green-apple.svg"
              class="w-10 h-10"
            />
            <span
              class="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase"
              >Unicor</span
            >
          </a>
        </div>
      </div>
      <div class="sidebar-content px-4 py-6">
        <ul class="flex flex-col w-full">
          <li class="my-px">
            <span
              class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase"
              >Actividades</span
            >
          </li>

          <li class="my-px">
            <a
              href="#"
              @click="toggleAct1"
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span
                class="flex items-center justify-center text-lg text-gray-400"
              >
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </span>
              <span class="ml-3">Actividad 1</span>
            </a>
          </li>

          <li class="my-px">
            <a
              href="#"
              @click="toggleAct2"
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span
                class="flex items-center justify-center text-lg text-gray-400"
              >
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>
              <span class="ml-3">Actividad 2</span>
            </a>
          </li>

          <li class="my-px">
            <span
              class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase"
              >Cuenta</span
            >
          </li>
          <li class="my-px">
            <a
              href="#"
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <button
                type="button"
                @click="handleSignOut"
                class="text-gray-300 hover:text-dark text-sm flex items-center rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 6.35 6.35"
                >
                  <path
                    d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    data-original="#000000"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { useRouter } from "vue-router";
import {getAuth, signOut} from "firebase/auth";

export default defineComponent({
  setup() {
    const auth = getAuth(); 
    const router = useRouter();


    const handleSignOut = () => {
      signOut(auth).then(() => {
        router.push("/login");
      });
    };

    const toggleAct1 = () => {
      router.push("/act1");
    };

    const toggleAct2 = () => {
      router.push("/act2");
    };

    return {
      handleSignOut,
      toggleAct1,
      toggleAct2
    };
  },
});
</script>