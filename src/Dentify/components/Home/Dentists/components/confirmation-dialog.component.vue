<script>

export default {
  name: "confirmation-dialog.component",
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    dentistName: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  },
}
</script>

<template>
  <div class="overlay" v-if="isVisible" role="dialog" aria-labelledby="dialog-title">
    <div class="dialog">
      <p><strong>{{ $t('Specialists.cDelete') }} {{ dentistName }}?</strong></p>
      <div class="button-group">
        <pv-button class="button ok" @click="confirm">{{ $t('Specialists.ok') }}</pv-button>
        <pv-button class="button cancel" @click="cancel">{{ $t('Specialists.cancel') }}</pv-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: #D1F2EB;
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button {
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-weight: bold;
  padding: 0.4em 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.ok {
  background-color: #2C3E50;
  color: white;
}

.cancel{
  background-color: white;
  color: #2C3E50;
  border: 1px solid #2C3E50;
}

.button-group {
  padding: 0.4rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>