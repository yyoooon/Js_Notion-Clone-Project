import App from "./App.js";
import { request } from "./api.js";

const $target = document.querySelector("#notion_app");

new App({
  $target,
});
