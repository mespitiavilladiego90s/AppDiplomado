import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from "vue-toastification";
import IndexAct1 from "./views/IndexAct1.vue";
import IndexAct2 from "./views/IndexAct2.vue";
const toast = useToast();

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/act1",
    component: IndexAct1,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/act2",
    component: IndexAct2,
    meta: {
      requiresAuth: true,
    }
  }
];

const getCurrentUser = () => {
  return new Promise((resolve, _reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      }
    );
  });
};


const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      toast.error("You don't have enough access!", {
        timeout: 2000,
      });
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
