<script>
import {Product} from "../models/product.entity.js";
import {InventoryService} from "../services/inventory.service.js";

export default {
  name: "newproduct.component",
  props:{
    userId:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      material_name: "",
      unit_price: "",
      quantity: "",
      registerConfirmed: false,
      product: new Product({}),
      inventoryService: new InventoryService()
    };
  },
  methods: {

    setProduct(){
      this.product.material_name=this.material_name;
      this.product.quantity=this.quantity;
      this.product.unit_price= parseFloat(this.unit_price);
      this.product.user_id=this.userId;

    },
    async registerProduct() {
      this.setProduct();
      try {
        await this.inventoryService.addProduct(this.product);
        this.registerConfirmed = true;
      } catch (error) {
        console.error("Error al registrar el producto:", error);
      }
    },
    goBack() {
      this.$emit('close');
    }
  }
}
</script>

<template>
  <div class="overlay">
    <div class="payment-card p-5 shadow-lg rounded-lg bg-light-blue">
      <h1 class="text-xl font-semibold mb-2 text-gray-800">{{ $t('addProduct.header') }}</h1>
      <form>
        <div class="mb-4">
          <label for="material_name" class="block text-black">{{ $t('addProduct.nameLabel') }}</label>
          <input id="material_name" v-model="material_name" type="text"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="unit_price" class="block text-black">{{ $t('addProduct.priceLabel') }}</label>
          <input id="unit_price" v-model="unit_price" type="text"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-black">{{ $t('addProduct.quantityLabel') }}</label>
          <input id="quantity" v-model="quantity" type="number"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>

        <div class="flex justify-center">
          <button type="submit" @click="registerProduct" class="btn bg-dark-blue text-white px-4 py-2 rounded shadow">{{ $t('addProduct.registerButton') }}</button>
        </div>
        <div class="mt-4 text-center">
          <a href="#" @click.prevent="goBack" class="text-sm text-dark-blue">{{ $t('addProduct.goBackLink') }}</a>
        </div>
      </form>
      <div v-if="registerConfirmed" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
        <p>{{ $t('addProduct.successMessage') }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-card {
  background-color: #e8f9f8;
  border-radius: 16px;
  width: 400px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  cursor: pointer;
  background-color: #2d3748;
}

.btn:hover {
  background-color: #1a202c;
}

.bg-light-blue {
  background-color: #e8f9f8;
}

.text-dark-blue {
  color: #2d3748;
}

.text-center {
  text-align: center;
}
</style>