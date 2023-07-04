import { createStore } from "vuex";
import task from "./modules/task.js";
import product from "./modules/product.js";
import card from "./modules/card.js";

const store = createStore({
  modules: {
    task,
    product,
    card,
  },
});

export default store;
