import App from "./App.js";
import {
  getAllDocumentsData,
  getDocumentsData,
  createDocumentData,
  updateDocumentsData,
  deleteDocumentsData,
  request,
} from "./utils/api.js";

const $target = document.querySelector("#notion_app");

new App({
  $target,
});
