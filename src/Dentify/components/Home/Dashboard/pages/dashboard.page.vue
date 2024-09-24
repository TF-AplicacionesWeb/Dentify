<script>
export default {
  name: "dashboard.vue"
}
</script>

<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard</h1>

    <div class="cards-bar">
      <pv-card class="dashboard-card info-card">
        <template #content>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
        </template>
      </pv-card>

      <pv-card class="dashboard-card info-card">
        <template #content>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
        </template>
      </pv-card>

      <pv-card class="dashboard-card info-card">
        <template #content>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum</p>
        </template>
      </pv-card>
    </div>

    <div class="appointments-payments-container">
      <!-- Citas para Hoy -->
      <div class="appointments">
        <h2>Citas para hoy</h2>
        <pv-card class="dashboard-card appointments-card">
          <template #content>
            <p>Odontólogo: Lorem Ipsum</p>
            <p>Paciente: Lorem Ipsum</p>
            <p>Fecha: dd/mm/aa</p>
            <p>Hora: hh/dd</p>
          </template>
        </pv-card>

      </div>

      <!-- Pagos Recientes -->
      <div class="payments">
        <h2>Pagos recientes</h2>
        <pv-card class="dashboard-card payments-card">
          <template #content>
            <p>Odontólogo: Lorem Ipsum</p>
            <p>Paciente: Lorem Ipsum</p>
            <p>Fecha: dd/mm/aa</p>
            <p>Estado: Cancelado</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal del Dashboard */
.dashboard-container {
  padding: 20px;
  width: 1200px;
}

/* Estilo del título */
.dashboard-title {
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 0;
}

/* Barra de Cards */
.cards-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
}

/* Estilo de las Cards */
.dashboard-card {
  width: 100%;
  background-color: #D1F2EB;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.dashboard-card.info-card {
  border-radius: 0;
}
/* Contenedor de Citas y Pagos */
.appointments-payments-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Sección de Citas */
.appointments {
  width: 48%;
}

/* Sección de Pagos */
.payments {
  width: 48%;
}

/* Estilo de las Cards de Citas y Pagos */
.appointments-card,
.payments-card {
  margin-bottom: 20px;
  background-color: #A9DFBF;
  padding: 15px;
}

/* Estilo de los subtítulos */
h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>