<script>
export default {
  name: "DeleteProductCardComponent",
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    confirm() {
      this.$emit('confirmDelete');
      this.close();
    },
    close() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>

<template>
  <div v-if="visible" class="overlay">
    <div class="confirmation-card">
      <p>¿Está seguro de que desea eliminar este producto?</p>
      <div class="buttons">
        <button @click="confirm" class="btn-confirm">Sí, eliminar</button>
        <button @click="close" class="btn-cancel">Cancelar</button>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirmation-card {
  background-color: #e8f9f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.btn-confirm, .btn-cancel {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #ff3b30;
  color: white;
}

.btn-cancel {
  background-color: #4CAF50;
  color: white;
}
</style>