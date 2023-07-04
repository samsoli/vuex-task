import Swal from "sweetalert2";

function updateLocalStorage(card) {
  localStorage.setItem("card", JSON.stringify(card));
}

const card = {
  namespaced: true,

  state: {
    card: localStorage.getItem("card")
      ? JSON.parse(localStorage.getItem("card"))
      : [],
  },
  getters: {
    count(state) {
      return state.card.length;
    },
    allItems(state) {
      return state.card;
    },
    totalAmount(state) {
      return state.card.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
  },
  mutations: {
    add(state, product) {
      const item = state.card.find((p) => p.id == product.id);
      if (!item) {
        state.card.push({
          ...product,
          quantity: 1,
        });
      } else {
        item.quantity++;
      }
      updateLocalStorage(state.card);
    },

    increment(state, id) {
      const item = state.card.find((p) => p.id == id);
      if (item) {
        item.quantity++;
      }
      updateLocalStorage(state.card);
    },
    decrement(state, id) {
      const item = state.card.find((p) => p.id == id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        }
      }
      updateLocalStorage(state.card);
    },
    remove(state, id) {
      state.card = state.card.filter((card) => card.id != id);

      updateLocalStorage(state.card);
    },
    clear(state) {
      state.card = [];

      updateLocalStorage(state.card);
    },
  },

  actions: {
    addToCard({ commit }, product) {
      commit("add", product);
      Swal.fire({
        title: "Product added",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    },

    increment({ commit }, id) {
      commit("increment", id);
      Swal.fire({
        title: "Product Updated",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    },
    decrement({ commit }, id) {
      commit("decrement", id);
      Swal.fire({
        title: "Product Updated",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    },
    remove({ commit }, id) {
      commit("remove", id);
      Swal.fire({
        title: "Product Deleted",
        icon: "warning",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    },
    clear({ commit }) {
      commit("clear");
      Swal.fire({
        title: "Card Empty",
        icon: "warning",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    },
  },
};

export default card;
