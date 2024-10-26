<script>
import {InventoryService} from "../services/inventory.service.js";

export default {
  name: "inventory.page",
  data() {
    return {
      allProducts: [],
      productSelection: null,
      showAddCard: false,
    }
  },
  async created() {
    try {
      const inventoryService = new InventoryService();
      this.allProducts = await inventoryService.getInventory();
      console.log("Inventario cargado:", this.allProducts);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  },
  methods: {

    setProductSelection(product) {
      this.productSelection = product;
    }/*,
    goToAddProduct() {
      this.$router.push('/home/inventory/add-product');
    },
    openUpdateCard() {
      if (this.selectedProduct) {
        this.$router.push(`/home/inventory/update-product/${this.selectedProduct.id}`);
      }
    },

    openDeleteCard() {
      if (this.selectedProduct) {
        this.$router.push(`/home/inventory/delete-product/${this.selectedProduct.id}`);
      }
    }
*/
  }
}
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">Inventory</h1>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">

      <pv-button
          label="Add new product"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click=""
      />
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3"></th>
        <th class="p-3">Name</th>
        <th class="p-3">Quantiy</th>
        <th class="p-3">Price</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="product in allProducts" :key="product.id" class="border-t">
        <td class="p-3 text-center">
          <input
              type="checkbox"
              @change="setProductSelection(product)"
              :checked="productSelection === product"
          />
        </td>
        <td class="p-3 text-center">{{ product.name }}</td>
        <td class="p-3 text-center">{{ product.quantity }}</td>
        <td class="p-3 text-center">{{ product.price}}</td>
      </tr>
      </tbody>
    </table>

    <div class="actions mt-5 flex justify-center">
      <pv-button
          label="Update product"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click=""
      />
    </div>
    <div class="actions mt-5 flex justify-center">
      <pv-button
          label="Delete product"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click=""
      />
    </div>
  </div>
</template>

<style scoped>
.payments-container {
  padding: 20px;
  max-width: 1200px;
  margin-top: 80px;
}


.payments-table {
  border: 1px solid #ccc;
}

.payments-table th,
.payments-table td {
  border: 1px solid #ccc;
}
</style>