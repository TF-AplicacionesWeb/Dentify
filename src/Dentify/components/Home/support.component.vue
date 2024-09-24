<script>
export default {
  name: "support.component.vue"
}
</script>

<template>
  <h1 class="support">Soporte</h1>
  <div class="support-form-container">
    <div class="form-card">
      <div>
        <h2>Formulario de solicitud</h2>
      </div>
      <div class="form-group">
        <label for="name">Nombre</label>
        <pv-inputtext id="name" v-model="name" class="input-field" placeholder="Escriba su nombre"/>
      </div>
      <div class="form-group">
        <label for="email">Correo</label>
        <pv-inputtext id="email" v-model="email" class="input-field" placeholder="Escriba su correo"/>
      </div>
      <div class="form-group">
        <label for="problem">¿Cuál es el problema?</label>
        <pv-inputtext id="problem" v-model="problem" class="input-field" placeholder="Describa el problema"/>
      </div>
      <div class="form-group">
        <label for="additional-details">Detalles adicionales</label>
        <pv-inputtext id="additional-details" v-model="additionalDetails" class="input-field"
                      placeholder="Detalles adicionales"/>
      </div>
      <pv-button label="Enviar" class="submit-btn" @click="enviarSolicitud"/>
    </div>
  </div>
</template>

<style scoped>
.support {
  text-align: start;
}

.support-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

h1 {
  font-size: 50px;
}

h2 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}

.form-card {
  background-color: #D1F2EB;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
}

.submit-btn {
  background-color: #2C3E50;
  color: white;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
}
</style>