<script>
export default {
  name: 'card-invoice.vue',
  props: {
    invoice: Object
  },
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$emit('close');
    }
  }
};
</script>

<template>
  <div class="overlay">
    <div class="invoice-card p-5 shadow-lg rounded-lg bg-light-blue">
      <h1 class="text-3xl font-bold mb-4 text-center text-black">Factura</h1>

      <div class="invoice-info mb-6">

        <p><strong>Nombre:</strong> {{ invoice.name }}</p>
        <p><strong>DNI:</strong> {{ invoice.dni }}</p>
        <!--<p><strong>Correo electrónico:</strong> {{ invoice.email }}</p>-->
        <p><strong>Fecha:</strong> {{ new Date(invoice.date).toLocaleDateString() }}</p>
        <p><strong>Hora:</strong> {{ new Date(invoice.date).toLocaleTimeString() }}</p>
      </div>

      <table class="w-full mb-4 table-fixed border-collapse border border-gray-300">
        <thead>
        <tr class="bg-sky-950">
          <th class="border border-gray-300 p-2 text-white px-4 py-2 rounded shadow">Descripción</th>
          <th class="border border-gray-300 p-2 text-white px-4 py-2 rounded shadow">Monto</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="border border-gray-300 p-2">{{ invoice.description }}</td>
          <td class="border border-gray-300 p-2">{{ invoice.amount }}</td>
        </tr>
        </tbody>
      </table>

      <div class="actions flex justify-center mt-5">
        <button @click.prevent="goBack" class="bg-sky-950 btn bg-dark-blue text-white px-4 py-2 rounded shadow">
          Regresar a Facturas
        </button>
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

.invoice-card {
  background-color: #e8f9f8;
  border-radius: 16px;
  width: 500px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

.bg-light-blue {
  background-color: #e8f9f8;
}

.text-center {
  text-align: center;
}
</style>
