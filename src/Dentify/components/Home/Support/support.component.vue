<script>
import changelangComponent from "../../../../public/changelang.component.vue";
import {SupportService} from "./services/support-api.service.js";
import {mapGetters} from "vuex";

export default {
  name: "support.component.vue",
  computed: {
    ...mapGetters(['getUser']),
    username() {
      return this.getUser;
    }
  },
  components: { changelangComponent },
  data() {
    return {
      name: '',
      email: '',
      problem: '',
      additionalDetails: ''
    };
  },
  methods: {
    async enviarSolicitud() {
      const service = new SupportService();
      const randomId = Math.floor(Math.random() * 1000000);

      const messageData = {
        id: randomId,
        name: this.name,
        email: this.email,
        description: this.problem + ' ' + this.additionalDetails,
        user_id: this.username.id
      }

      await service.AddMessage(messageData);

    }
  }
}
</script>

<template>
  <h1 class="support">{{ $t('Support.Title') }}</h1>
  <div class="support-form-container">
    <div class="form-card">
      <div>
        <h2>{{ $t('Support.FormTitle') }}</h2>
      </div>
      <div class="form-group">
        <label for="name">{{ $t('Support.Name') }}</label>
        <pv-inputtext id="name" v-model="name" class="input-field" :placeholder="$t('Support.NamePlaceholder')" />
      </div>
      <div class="form-group">
        <label for="email">{{ $t('Support.Email') }}</label>
        <pv-inputtext id="email" v-model="email" class="input-field" :placeholder="$t('Support.EmailPlaceholder')" />
      </div>
      <div class="form-group">
        <label for="problem">{{ $t('Support.Issue') }}</label>
        <pv-inputtext id="problem" v-model="problem" class="input-field" :placeholder="$t('Support.IssuePlaceholder')" />
      </div>
      <div class="form-group">
        <label for="additional-details">{{ $t('Support.AdditionalDetails') }}</label>
        <pv-inputtext id="additional-details" v-model="additionalDetails" class="input-field" :placeholder="$t('Support.DetailsPlaceholder')" />
      </div>
      <pv-button :label="$t('Support.SubmitButton')" class="submit-btn" @click="enviarSolicitud" />
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