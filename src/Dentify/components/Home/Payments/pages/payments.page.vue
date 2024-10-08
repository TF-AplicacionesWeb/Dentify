<script>
export default {
  name: "payments.vue",

  methods: {

    goToAppointments() {
      this.$router.push('/home/payments/appointments');
    },
    goToInvoices() {
      this.$router.push('/home/payments/invoices');
    }
  }
}
</script>

<template>
  <div class="payments-container mx-auto mt-20 max-w-5xl p-5" v-if="$route.path === '/home/payments'">
    <h1 class="text-left text-4xl font-bold mb-5">Pagos</h1>
    <h3 class="text-left text-2xl font-bold mb-4">Citas a pagar:</h3>

    <div class="toolbar flex justify-between items-center gap-2 mb-5">
      <div class="search-container w-full flex items-center justify-between">
        <div class="search-input-container flex items-center bg-teal-100 rounded-full px-2 py-1 w-1/2">
          <i class="pi pi-search mr-2"/>
          <pv-inputtext
              placeholder="Buscar"
              class="search-input bg-teal-100 w-full outline-none border-b-2 border-teal-700 transition duration-300 ease-in-out"
          />
          <i class="pi pi-cog ml-2 cursor-pointer" @click="$emit('openSettings')"/>
        </div>
      </div>
      <pv-button
          label="Citas a pagar"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg whitespace-nowrap"
          @click="goToAppointments"
      />
      <pv-button
          label="Facturas"
          class="action-button bg-sky-950 text-white px-4 py-2 rounded-full text-lg"
          @click="goToInvoices"
      />
    </div>
  </div>

  <router-view></router-view>
</template>

<style scoped>
.payments-container {
  padding: 20px;
  max-width: 1200px;
  margin-top: 80px;
}

.search-input-container {
  background-color: #D1F2EB;
}

.search-input {
  background-color: #D1F2EB;
  outline: none;
  border-bottom: 2px solid #2C3E50;
  transition: border-bottom 0.3s ease;
}
</style>
