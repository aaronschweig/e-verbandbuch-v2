import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from '../views/Home.vue';
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  // },
  {
    path: "/",
    name: "home",
    redirect: "create"
  },
  {
    path: "/create",
    name: "create",
    component: Create
  },
  {
    path: "/create/:token",
    name: "open-create",
    component: Create,
    props: true
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
