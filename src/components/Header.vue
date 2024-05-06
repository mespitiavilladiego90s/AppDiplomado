<template>
  <header class="header bg-lime-300 shadow py-4 px-4">
    <div class="header-content flex items-center flex-row">
      <h1
        class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white"
      >
        Bienvenido de vuelta,
        <span class="text-green-600 dark:text-green-500"
          >{{ userName ? userName : userEmail }}!</span
        >
      </h1>

      <div class="flex ml-auto">
        <a href="#" class="flex flex-row items-center">
          <img
            class="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-lg"
            :src="
              userImage
                ? userImage
                : 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
            "
            alt="userImage"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  setup() {
    let auth: Auth;
    const userName = ref<string | null>(null);
    const userImage = ref<string | null>(null);
    const userEmail = ref<string | null>(null);

    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userName.value = user.displayName;
          userImage.value = user.photoURL;
          userEmail.value = user.email;
        }
      });
    });

    return {
      userName,
      userEmail,
      userImage,
    };
  },
});
</script>
