<template>
  <div>
    <div class="container flex flex-col lg:flex-row px-5 mx-auto mt-20 lg:mt-32 mother-container">
      <div class="mb-10 mr-10 mother-container-left-side">
        <div class="min-h-full p-4 bg-white rounded-md shadow left-side-content">
          <ul class="space-y-4">
            <li v-if="!itemCount" class="min-w-full p-4 bg-gray-200 rounded-md text-xs text-center">Oops.., its empty here. <br> Go buy some at our <b>store</b>.</li>
            <li
              v-else
              v-for="(item, index) in carts"
              :key="item.product.id"
              class="min-w-full p-4 bg-gray-200 rounded-md"
            >
              <div class="">
                <div class="mb-2 --top-section">
                  <div class="flex items-start">
                    <div class="img-wrapper">
                      <div class="relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20">
                        <div class="absolute top-0 left-0 w-16 h-16 lg:w-20 lg:h-20">
                          <div class="relative">
                            <div class="absolute top-0 left-0 w-16 h-16 lg:w-20 lg:h-20">
                              <img
                                class="w-16 h-16 lg:w-20 lg:h-20 rounded-md"
                                :src="item.product.image[0]"
                                alt="#"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pl-4 product-wrapper">
                      <div class="">
                        <div class="mb-2 --product-name">
                          <nuxt-link to="#">
                            {{ item.product.name }}
                          </nuxt-link>
                        </div>
                        <div class="--product-price">
                          <del v-show="item.afterDiscount" class="inline-block"
                            >IDR {{ price(item.product.price) }}
                          </del>
                          <b class="inline-block"
                            >IDR
                            {{
                              price(
                                item.afterDiscount
                                  ? item.afterDiscount
                                  : item.product.price
                              )
                            }}</b
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="--bottom-section">
                  <div class="flex items-center justify-between">
                    <div class="--left-item">
                      <!-- <input type="text" name="catatan" id="catatan" /> -->
                      <button type="button" class="text-xs font-medium underline">
                        Tambah catatan
                      </button>
                    </div>
                    <div class="--right-item">
                      <div class="inline-flex space-x-4">
                        <!-- <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-heart"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                            />
                          </svg>
                        </div> -->
                        <button @click="$modal.show('delete', item.product)" role="button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-trash"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>

                        <div class="flex">
                          <button @click="min(index, item.product.id, $refs.quantity)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-circle-minus"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#000"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="12" r="9" />
                              <line x1="9" y1="12" x2="15" y2="12" />
                            </svg>
                          </button>
                          <!-- <ValidationProvider rules="positive" v-slot="{errors}"> -->
                          <input
                            type="text"
                            maxlength="3"
                            onkeyup="this.value = this.value.replace(/\D/g,'')"
                            @keyup="updateQty(item.product.id, $event)"
                            @keydown="updateQty(item.product.id, $event)"
                            @change="updateQty(item.product.id, $event)"
                            class="w-10 text-center bg-transparent"
                            :value="item.quantity"
                            ref="quantity"
                          />
                          <!-- <span>min</span> -->
                          <!-- </ValidationProvider> -->
                          <button @click="plus(index, item.product.id, $refs.quantity)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-circle-plus"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#000"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="12" r="9" />
                              <line x1="9" y1="12" x2="15" y2="12" />
                              <line x1="12" y1="9" x2="12" y2="15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <code v-show="!isValid" class="text-xs"
                      >min. order {{ item.product.quantity }}</code
                    >
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-shrink-0 lg:w-4/12 mother-container-right-side">
        <div class="sticky top right-side-content">
          <div class="lg:absolute top-0 left-0 bottom-auto mb-4 right-auto z-10 w-full">
            <div class="lg:relative">
              <div class="translate-y-0 opacity-100">
                <div>
                  <section
                    class="p-0 m-0 overflow-visible bg-white rounded-md shadow"
                  >
                    <!-- <div class="p-4 border-b-4">
                      <div class="">
                        <div class="flex">
                          <input
                            type="text"
                            class="flex-grow-0 flex-shrink-0 px-5 py-2 mr-2 bg-gray-200 rounded-md flex-basis focus:outline-none focus:shadow-outline"
                            placeholder="Input voucher code"
                          />

                          <t-button variant="disabled" class="w-full">Apply</t-button>
                        </div>
                      </div>
                    </div> -->
                    <div class="p-4">
                      <h4 class="font-bold text-gray-800">Order Summary</h4>
                      <div class="my-4">
                        <div>
                          <div class="flex items-center justify-between">
                            <div>Total Price</div>
                            <div>IDR {{ price(totalPrice) }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-6">
                        <div>
                          <t-button
                            :disabled="!isValid || !totalQty"
                            :variant="isValid && totalQty ? 'cta' : 'disabledCta'"
                            @click="showModal = true"
                            class="w-full"
                            >Buy ({{ totalQty }})
                          </t-button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <t-modal name="delete" @before-open="deleteBeforeOpen" variant="clean">
        <template v-slot:header> Are you sure ? </template>
        <p v-if="product">{{ product.name }}</p>
        <p v-else>what ?</p>
        <template v-slot:footer>
          <div class="flex justify-between">
            <t-button variant="outline" type="button">Cancel</t-button>
            <t-button @click="removeItem(product)">Delete</t-button>
          </div>
        </template>
      </t-modal>

      <ValidationObserver ref="form" v-slot="{ invalid }">
        <t-modal v-model="showModal" variant="clean">
          <template v-slot:header>
            Shipping
            <div class="flex mt-4">
              <label class="flex items-center">
                <t-checkbox variant="success" name="options" v-model="checkbox" />
                <span class="ml-2 text-xs font-medium capitalize"
                  >Use your account information</span
                >
              </label>
            </div>
          </template>
          <form action="">
            <div class="flex justify-center mb-4 space-x-4">
              <ValidationProvider
                class="flex-grow"
                rules="required"
                v-slot="{ errors, classes }"
              >
                <label
                  class="block mb-2 text-xs font-medium text-gray-600"
                  for="Recipient Name"
                  >Recipient Name</label
                >
                <div class="content" :class="classes">
                  <input
                    id="Recipient Name"
                    v-model="shipping.name"
                    class="w-full px-3 py-2 text-xs leading-none border border-gray-300 rounded outline-none border-box focus:border-teal-500"
                    type="text"
                    :class="classes"
                    :disabled="checkbox"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|numeric" v-slot="{ errors, classes }">
                <label
                  class="block mb-2 text-xs font-medium text-gray-600"
                  for="Phone Number"
                  >Phone Number</label
                >
                <div class="content" :class="classes">
                  <input
                    id="Phone Number"
                    v-model.trim="shipping.phone"
                    class="w-full px-3 py-2 text-xs leading-none border border-gray-300 rounded outline-none border-box focus:border-teal-500"
                    type="text"
                    :disabled="checkbox"
                    :class="classes"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="flex justify-center mb-4 space-x-4">
              <ValidationProvider
                class="flex-grow"
                rules="required"
                v-slot="{ errors, classes }"
              >
                <label class="block mb-2 text-xs font-medium text-gray-600" for="City"
                  >City or District</label
                >
                <div class="content" :class="classes">
                  <input
                    id="City"
                    v-model="shipping.city"
                    class="w-full px-3 py-2 text-xs leading-none border border-gray-300 rounded outline-none border-box focus:border-teal-500"
                    type="text"
                    :disabled="checkbox"
                    :class="classes"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                class="flex-1"
                rules="required"
                v-slot="{ errors, classes }"
              >
                <label
                  class="block mb-2 text-xs font-medium text-gray-600"
                  for="Postal Code"
                  >Postal Code</label
                >
                <div class="content" :class="classes">
                  <input
                    id="Postal Code"
                    v-model.trim="shipping.postal"
                    class="w-full px-3 py-2 text-xs leading-none border border-gray-300 rounded outline-none border-box focus:border-teal-500"
                    type="text"
                    :disabled="checkbox"
                    :class="classes"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="flex justify-center space-x-4">
              <ValidationProvider
                class="flex-1"
                rules="required"
                v-slot="{ errors, classes }"
              >
                <label class="block mb-2 text-xs font-medium text-gray-600" for="Address"
                  >Address</label
                >
                <div class="content" :class="classes">
                  <textarea
                    id="Address"
                    v-model="shipping.address"
                    class="w-full px-3 py-2 text-xs leading-none border border-gray-300 rounded outline-none border-box focus:border-teal-500"
                    type="text"
                    :class="classes"
                    :disabled="checkbox"
                    maxlength="200"
                  ></textarea>
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </form>
          <template v-slot:footer>
            <div class="flex justify-between">
              <t-button variant="outline" type="button"> Cancel</t-button>
              <t-button
                @click="processOrder()"
                :disabled="(invalid && !checkbox) || loading || !shipping.address"
                :variant="{
                  disabled: (invalid && !checkbox) || loading || !shipping.address,
                }"
                >{{ loading ? "Please wait..." : "Proceed" }}</t-button
              >
            </div>
          </template>
        </t-modal>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  head() {
    return {
      script: [
        {
          src: "https://app.sandbox.midtrans.com/snap/snap.js",
          "data-client-key": "SB-Mid-client-Q0fAI3TTlUCQpc4X",
        },
      ],
    };
  },
  data() {
    return {
      showModal: false,
      loading: false,
      product: undefined,
      shipping: {
        name: this.$auth.user.name,
        phone: this.$auth.user.phone,
        city: this.$auth.user.city,
        postal: this.$auth.user.postal_code,
        address: this.$auth.user.address,
      },
      checkbox: true,
    };
  },
  methods: {
    deleteBeforeOpen({ params, cancel }) {
      // you can add a condition to cancel the modal opening
      if (false) {
        cancel();
      }

      this.product = params;
    },
    updateQty(id, event) {
      this.$store.dispatch("cart/quantityUpdate", {
        productId: id,
        quantity: event.target.value !== "" ? event.target.value : 1,
      });
    },
    plus(index, id, ref) {
      let val = Number(ref[index].value) + 1;

      if (val > 999) val = 999;
      this.$store.dispatch("cart/quantityUpdate", {
        productId: id,
        quantity: val,
      });
    },
    min(index, id, ref) {
      let val = Number(ref[index].value) - 1;

      if (val < 0) val = 0
      this.$store.dispatch("cart/quantityUpdate", {
        productId: id,
        quantity: val,
      });
    },
    async processOrder() {
      this.loading = true;

      await this.$store.dispatch("cart/processOrder", {
        shipping: this.shipping,
        vendor: false,
      });

      this.loading = false;
      this.showModal = false;
    },
    price(value) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "decimal",
        currency: "IDR",
      });

      return formatter.format(value);
    },
    // trxCreate() {
    // 	let data = this.showModal
    // 		? (
    // 				btoa(+new Date() + Math.random().toString()).substr(-7, 5) +
    // 				new Date().getTime()
    // 		  ).toUpperCase()
    // 		: "";

    // 	return (this.trxCode = data);
    // },
    removeItem(product) {
      this.$store.dispatch("cart/removeItemFromCart", product);
      this.$modal.hide('delete');
    },
  },
  computed: {
    carts() {
      return this.$store.state.cart.cart;
    },
    totalQty() {
      let total = 0;

      this.carts.forEach((item) => {
        total += parseInt(item.quantity);
      });

      return total;
    },
    isValid() {
      let data = true;

      this.carts.some((item) => {
        if (item.quantity < item.product.quantity) {
          data = false;
          return false;
        }
      });

      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.mother-container-left-side {
  // width: calc(100% - 400px);
  width: 100%;
}

.top {
  top: 8rem;
}

.flex-basis {
  flex-basis: 60%;
}

textarea {
  resize: none;
}

@media (min-width: 680px) {
  .mother-container-left-side {
    width: calc(100% - 400px);
  // width: 100%;
  }
}
</style>
