<script>
export default {
  name: "reservation.vue",
  methods:{
    goToReservation(){
      this.$router.push('/reservation');
    }
  }
}
</script>

<template>

  <h1 class="support">{{ $t('Reservation.Tittle') }}</h1>
  <div class="content-wrapper">
    <div class="support-form-container">
      <div class="form-card">
        <div>
          <h2>{{ $t('Reservation.SubTittle') }}</h2>
        </div>

        <div class="form-group">
          <label for="name">{{ $t('Reservation.Name') }}</label>
          <pv-inputtext id="name" v-model="name" class="input-field" :placeholder="$t('Reservation.namePlaceholder')" />
        </div>

        <div class="form-group">
          <label for="last-name">{{ $t('Reservation.LastName') }}</label>
          <pv-inputtext id="last-name" v-model="lastname" class="input-field" :placeholder="$t('Reservation.lastNamePlaceholder')" />
        </div>

        <div class="form-group">
          <label for="dni">{{ $t('Reservation.DNI') }}</label>
          <pv-inputtext id="dni" v-model="dni" class="input-field" :placeholder="$t('Reservation.dniPlaceholder')" />
        </div>

        <div class="form-group">
          <label for="date">{{ $t('Reservation.Date') }}</label>
          <pv-inputtext id="date" v-model="date" class="input-field" placeholder="dd/mm/aa" />
        </div>

        <div class="form-group">
          <label for="time">{{ $t('Reservation.Time') }}</label>
          <pv-inputtext id="time" v-model="time" class="input-field" placeholder="hh/mm" />
        </div>

        <div class="form-group">
          <label for="appointment">{{ $t('Reservation.Appointment') }}</label>
          <pv-inputtext id="appointment" v-model="appointment" class="input-field" :placeholder="$t('Reservation.appointmentPlaceholder')" />
        </div>

        <div class="form-group">
          <label for="dentist">{{ $t('Reservation.Dentist') }}</label>
          <pv-inputtext id="dentist" v-model="dentist" class="input-field" :placeholder="$t('Reservation.dentistPlaceholder')" />
        </div>

        <div class="form-group">
          <label for="duration">{{ $t('Reservation.Duration') }}</label>
          <pv-inputtext id="duration" v-model="duration" class="input-field" :placeholder="$t('Reservation.durationPlaceholder')" />
        </div>

        <pv-button :label="$t('Reservation.reserveLabel')" class="submit-btn" @click="goToReservation()" />
      </div>
    </div>

    <div class="image-container">
      <pv-Image src="../src/assets/img/reservation.png" width="100%"></pv-Image>
    </div>
  </div>

</template>

<style scoped>

.support {
  text-align: center;
  font-size: 50px;
  margin-bottom: 30px;
  font-weight: bold;
}

h2 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;
  margin-top: 30px;
}

.support-form-container {
  flex-basis: 50%;
}

.form-card {
  background-color: #D1F2EB;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
}

.image-container pv-Image {
  max-width: 100%;
  height: auto;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label {
  width: 30%;
  margin-right: 10px;
  text-align: right;
}

.input-field {
  width: 65%;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background-color: white;
}

.submit-btn {
  background-color: #2C3E50;
  color: white;
  width: 100%;
  padding: 10px;
  border-radius: 25px;
  font-size: 16px;
  border: none;
}

</style>