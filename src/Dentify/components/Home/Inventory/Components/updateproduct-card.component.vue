<script>
import {InventoryService} from "../services/inventory.service.js";

export default {
  name: "UpdateProductCardComponent",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      material_name: this.product.material_name || "",
      unit_price: this.product.unit_price || "",
      quantity: this.product.quantity || "",
      last_updated: this.product.last_updated || "",
      updateConfirmed: false,
    };
  },
  methods: {
    async updateProduct() {
      const inventoryService = new InventoryService();
      if (this.material_name && this.unit_price && this.quantity) {
        const updatedProduct = {
          ...this.product,
          material_name: this.material_name,
          unit_price: parseFloat(this.unit_price),
          quantity: Number(this.quantity),
          last_updated: new Date().toISOString().split('T')[0]
        };
        try {
          await inventoryService.updateProduct(updatedProduct.id, updatedProduct);
          this.$emit("confirmUpdate", updatedProduct);
          this.updateConfirmed = true;
        } catch (error) {
          console.error("Error al actualizar el producto:", error);
        }
      }
    },
    goBack() {
      this.$emit("close");
    }
  }
};
</script>

<template>
  <div class="overlay">
    <div class="payment-card p-5 shadow-lg rounded-lg bg-light-blue">
      <h1 class="text-xl font-semibold mb-2 text-gray-800">Actualizar Producto</h1>
      <form @submit.prevent="updateProduct">
        <div class="mb-4">
          <label for="material_name" class="block text-black">Nombre:</label>
          <input id="material_name" v-model="material_name" type="text"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="unit_price" class="block text-black">Precio:</label>
          <input id="unit_price" v-model="unit_price" type="text"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-black">Cantidad:</label>
          <input id="quantity" v-model="quantity" type="number"
                 class="input border-2 border-gray-300 rounded px-3 py-2"/>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="btn bg-dark-blue text-white px-4 py-2 rounded shadow">Actualizar</button>
        </div>
        <div class="mt-4 text-center">
          <a href="#" @click.prevent="goBack" class="text-sm text-dark-blue">Regresar</a>
        </div>
      </form>
      <div v-if="updateConfirmed" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
        <p>¡Producto actualizado!</p>
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
