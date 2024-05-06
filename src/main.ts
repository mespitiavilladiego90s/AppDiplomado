import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import router from './router'
import { initializeApp } from "firebase/app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import AuthLayout from './components/AuthLayout.vue';
import DropTable from './components/DropTable.vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Act1 from './components/Act1.vue';
import Act2 from './components/Act2.vue';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


initializeApp(firebaseConfig);
const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')
app
.component('AuthLayout', AuthLayout)
.component('DropTable', DropTable)
.component('Sidebar', Sidebar)
.component('Header', Header)
.component('Footer', Footer)
.component('Act1', Act1)
.component('Act2', Act2)