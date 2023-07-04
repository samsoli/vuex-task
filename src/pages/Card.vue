<template>
  <div class="container">
    <div class="row mt-5">
      <div v-if="cardItems.length == 0" class="col-md-12 text-center">
        <div>
          <i class="bi bi-basket-fill" style="font-size: 100px"></i>
        </div>
        <h3 class="text-bold">Cart Is Empty</h3>
        <router-link class="btn btn-outline-dark mt-3" to="/products">Products</router-link>
      </div>

      <div v-else class="col-lg-12 pl-3 pt-3">
        <table class="table table-hover border bg-white">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th style="width: 10%">Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cardItems" :key="item.id">
              <td class="align-middle">
                <div class="row">
                  <div class="col-lg-2">
                    <img :src="item.image" alt="..." class="img-fluid" />
                  </div>
                  <div class="col-lg-10">
                    <h5>{{ item.name }}</h5>
                    <p>
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle">{{ item.price }}</td>
              <td class="align-middle">
                <button
                  @click="increment(item.id)"
                  class="btn btn-sm btn-dark me-2"
                >
                  +
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  @click="decrement(item.id)"
                  class="btn btn-sm btn-dark ms-2"
                >
                  -
                </button>
              </td>

              <td class="align-middle">{{ item.price * item.quantity }}</td>
              <td class="align-middle" style="width: 15%">
                <button
                  @click="removeFromCard(item.id)"
                  class="btn btn-danger btn-sm"
                >
                  delete
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button @click="clearCard" class="btn btn-dark">
                  Clear Card
                </button>
              </td>
              <td colspan="2" class="hidden-xs"></td>
              <td class="hidden-xs text-center" style="width: 15%">
                <strong>Total : {{ cardTotalAmount }}</strong>
              </td>
              <td>
                <a href="#" class="btn btn-success btn-block">Checkout</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const cardItems = computed(() => store.getters["card/allItems"]);
    const cardTotalAmount = computed(() => store.getters["card/totalAmount"]);

    function decrement(id) {
      store.dispatch("card/decrement", id);
    }
    function increment(id) {
      store.dispatch("card/increment", id);
    }
    function removeFromCard(id) {
      store.dispatch("card/remove", id);
    }
    function clearCard() {
      store.dispatch("card/clear");
    }

    return {
      cardItems,
      cardTotalAmount,
      decrement,
      increment,
      removeFromCard,
      clearCard,
    };
  },
};
</script>
