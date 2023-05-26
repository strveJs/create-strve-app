import { setData } from "strve-sfc";
import { initRouter } from "strve-router";

import Home from "../template/home/home.js";
import About from "../template/about/about.js";
import User from "../template/user/user.js";

const router = initRouter(
  [
    {
      path: "/",
      template: [Home, "render"],
    },
    {
      path: "/about",
      template: [About, "render"],
    },
    {
      path: "/user",
      template: [User, "render"],
    },
  ],
  setData
);

export default router;
