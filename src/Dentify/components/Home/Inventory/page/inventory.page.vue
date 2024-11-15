<script>
import {InventoryService} from "../services/inventory.service.js";
import NewProductCardComponent from "../Components/newproduct-card.component.vue";
import UpdateProductCardComponent from "../Components/updateproduct-card.component.vue";
import DeleteProductCardComponent from "../Components/deleteproduct-card.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "inventory.page",
  components:{
    NewProductCardComponent,
    UpdateProductCardComponent,
    DeleteProductCardComponent
  },
  computed: {
    ...mapGetters(['getUser']),
    userLogged() {
      return this.getUser;
    },
    username() {
      return this.userLogged?.username || '';
    }
  },
  data() {
    return {
      allProducts: [],
      productSelection: null,
      showAddCard: false,
      showUpdateCard: false,
      showDeleteCard: false,
    }
  },
  async created() {
    await this.getInventoryData();
  },
  methods: {

    async getInventoryData(){
      try {
        const inventoryService = new InventoryService();
        if (!this.userLogged || !this.userLogged.id) {
          console.error("El usuario no está definido o no tiene un ID.");
          return;
        }
        this.allProducts = await inventoryService.getInventory(this.userLogged.id);
        console.log("Inventario cargado:", this.allProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },

    setProductSelection(product) {
      this.productSelection = this.productSelection === product ? null : product;
    },
    updateProductInInventory(updatedProduct) {
      const index = this.allProducts.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        this.allProducts.splice(index, 1, updatedProduct);
      }
      this.showUpdateCard = false;
    },
    showUpdateForm() {
      if (this.productSelection) {
        this.showUpdateCard = true;
      }
    },
    confirmDelete() {
      if (this.productSelection) {
        this.showDeleteCard = true;
      }
    },
    async deleteProductFromInventory() {
      if (!this.productSelection) return;
      try {
        const inventoryService = new InventoryService();
        await inventoryService.deleteProduct(this.productSelection.id);
        this.allProducts = this.allProducts.filter(p => p.id !== this.productSelection.id);
        this.productSelection = null;
        this.showDeleteCard = false;
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    },
  }
}
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5">
    <h1 class="text-left text-4xl font-bold mb-5">{{ $t('inventoryMain.header') }}</h1>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">
      <pv-button
          :label="$t('inventoryMain.addNewProduct')"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click="showAddCard = true"
      />
    </div>

    <table class="payments-table w-full border-collapse">
      <thead>
      <tr class="bg-sky-950 text-white">
        <th class="p-3"></th>
        <th class="p-3">{{ $t('inventoryMain.name') }}</th>
        <th class="p-3">{{ $t('inventoryMain.quantity') }}</th>
        <th class="p-3">{{ $t('inventoryMain.price') }}</th>
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
        <td class="p-3 text-center">{{ product.material_name }}</td>
        <td class="p-3 text-center">{{ product.quantity }}</td>
        <td class="p-3 text-center">{{ product.unit_price }}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="showAddCard">
      <NewProductCardComponent
          :userId="this.userLogged.id"
          v-if="showAddCard"
          @close="showAddCard = false"
      />
    </div>
    <UpdateProductCardComponent
        v-if="showUpdateCard"
        :product="productSelection"
        @confirmUpdate="updateProductInInventory"
        @close="showUpdateCard = false"
    />
    <div class="actions mt-5 flex justify-center">
      <pv-button
          :label="$t('inventoryMain.updateProduct')"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click="showUpdateForm"
      />
    </div>
    <div class="actions mt-5 flex justify-center">
      <pv-button
          :label="$t('inventoryMain.deleteProduct')"
          class="register-button bg-sky-950 text-white px-5 py-2 rounded-full text-lg"
          @click="confirmDelete"
      />
    </div>

    <DeleteProductCardComponent
        v-if="showDeleteCard"
        :product="productSelection"
        @confirmDelete="deleteProductFromInventory"
        @close="showDeleteCard = false"
    />
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