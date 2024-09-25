
<script>
export default {
  name: "appointments.vue"
}
</script>
<template>
  <div class="payments-container">
    <h1 class="title">Pagos</h1>

    <!-- Barra de búsqueda y botones -->
    <div class="toolbar">
      <div class="search-container">
        <div class="search-input-container">
          <i class="pi pi-search"  />
          <pv-inputtext placeholder="Buscar" class="search-input" />
          <i class="pi pi-cog" @click="$emit('openSettings')" />
        </div>
      </div>
      <pv-button label="Citas a pagar" class="action-button" />
      <pv-button label="Facturas" class="action-button" />
    </div>

    <!-- Tabla de citas a pagar -->
    <table class="payments-table">
      <thead>
      <tr>
        <th><input type="checkbox" /></th>
        <th>Paciente</th>
        <th>DNI</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Duración</th>
        <th>Tipo de cita</th>
        <th>Odontólogo</th>
        <th>Estado</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input type="checkbox" /></td>
        <td>Lorem ipsum dolor sit</td>
        <td>XXXXXXXX</td>
        <td>dd/mm/aa</td>
        <td>hh/mm</td>
        <td>hh/mm</td>
        <td>Lorem</td>
        <td>Lorem ipsum dolor sit</td>
        <td>Lorem</td>
      </tr>
      <tr>
        <td><input type="checkbox" /></td>
        <td>Lorem ipsum dolor sit</td>
        <td>XXXXXXXX</td>
        <td>dd/mm/aa</td>
        <td>hh/mm</td>
        <td>hh/mm</td>
        <td>Lorem</td>
        <td>Lorem ipsum dolor sit</td>
        <td>Lorem</td>
      </tr>

      </tbody>
    </table>

    <!-- Botón de registrar pago -->
    <div class="actions">
      <pv-button label="Registrar pago" class="register-button" />
    </div>
  </div>
</template>

<style scoped>
.payments-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
}
.payments-table th,
.payments-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.payments-table th {
  background-color: #2C3E50;
  color: #ffffff;
  font-weight: bold;
}
.action-button {
  background-color: #2C3E50;
  color: white;
  width: 15%;
  padding: 5px;
  border-radius: 25px;
  font-size: 16px;
  border: none;
}
.register-button {
  background-color: #2C3E50;
  color: white;
  width: 20%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 25px;
  font-size: 16px;
  border: none;
}
.search-input{
  background-color: #D1F2EB;

  outline: none;
  border-bottom: 2px solid #2C3E50;
  transition: border-bottom 0.3s ease;
}

.search-input-container {
  display: flex;
  align-items: center;
  background-color: #D1F2EB;
  border-radius: 25px;
  padding: 0.5em;
  width: 100%;
}

.search-input-container > .pi-search {
  margin-right: 0.5em;
}

.search-input-container > .pi-cog {
  margin-left: 0.5em;
  cursor: pointer;
}

.search-input-container > .pi-inputtext {
  flex: 1;
  border: none;
  padding: 0;
  margin: 0;
}

</style>