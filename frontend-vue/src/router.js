import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import NotFound from './views/NotFound.vue';
import Login from './components/LoginView.vue';
import Dashboard from './components/DashboardView.vue';
import UserList from './components/UserList.vue';
import CreateUser from './components/CreateUser.vue';
import EditUser from './components/EditUser.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: UserList },
  { path: '/users/create', component: CreateUser },
  { path: '/users/:id/edit', component: EditUser },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
