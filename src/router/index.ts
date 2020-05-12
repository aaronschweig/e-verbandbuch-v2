import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";
import Create from "../views/Create.vue";
import Login from "../views/Login.vue";
import List from "../views/List.vue";
import { getIdToken } from "@/use/useQuery";
Vue.use(VueRouter);

export const authGuard: NavigationGuard = (to, from, next) => {
  if (!to.meta.public) {
    // If the user is authenticated, continue with the route
    const expiresIn = JSON.parse(atob(getIdToken().split(".")[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    if (now < expiresIn) {
      return next();
    }

    // Otherwise, log in
    return next({ name: "login" });
  } else {
    next();
  }
};

const routes: Array<RouteConfig> = [
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
    props: true,
    meta: {
      public: true
    }
  },
  {
    path: "/list",
    name: "list",
    component: List
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      public: true
    }
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

router.beforeEach(authGuard);

export default router;
