<script>
import {DentistApiService} from "../services/dentist-api.service.js";
import {Dentist} from "../model/Dentist.entity.js";

export default {
  name: "personal-profile.component",
  props: {
    id: {
      type: Number,
      default: null
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    isCreating: {
      type: Boolean,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dentistId: null,
      firstName: "",
      lastName: "",
      specialty: "",
      experience: null,
      phone: "",
      email: "",
      dentist: new Dentist({})
    }
  },
  async mounted() {
    if(this.isEditing && this.id != null) {
      try {
        this.dentist = await DentistApiService.getDentistById(this.id);
        this.loadDentist();
        console.log(this.dentist);
      } catch (error) {
        console.error("Error loading dentist:", error);
      }
    }
  },
  methods: {
    createDentist() {
      this.dentist.id = Number(this.dentistId);
      this.dentist.first_name = this.firstName;
      this.dentist.last_name = this.lastName;
      this.dentist.specialty = this.specialty;
      this.dentist.experience = Number(this.experience);
      this.dentist.phone = this.phone;
      this.dentist.email = this.email;
      this.dentist.total_appointments = 0;
      this.dentist.user_id = Number(this.userId);
    },
    updateDentist() {
      this.dentist.first_name = this.firstName;
      this.dentist.last_name = this.lastName;
      this.dentist.specialty = this.specialty;
      this.dentist.experience = Number(this.experience);
      this.dentist.phone = this.phone;
      this.dentist.email = this.email;
    },
    loadDentist() {
      this.dentistId = this.id;
      this.firstName = this.dentist.first_name;
      this.lastName = this.dentist.last_name;
      this.specialty = this.dentist.specialty;
      this.experience = this.dentist.experience;
      this.phone = this.dentist.phone;
      this.email = this.dentist.email;
    },
    async saveChanges() {
      if(this.validateForm()) {
        if(this.isCreating) {
          this.createDentist();
          try {
            await DentistApiService.insertDentist(this.dentist);
            console.log(this.dentist);
            this.$emit('confirm');
            return;
          } catch (error) {
            console.error("Error creating dentist:", error);
          }
        }

        if(this.isEditing) {
          this.updateDentist();
          try {
            await DentistApiService.updateDentist(this.dentist.id, this.dentist);
            console.log(this.dentist);
            this.$emit('confirm');
          } catch(error) {
            console.error("Error updating dentist:", error)
          }
        }
      }
    },
    cancel() {
      this.$emit('cancel');
    },
    validateForm() {
      if (!this.firstName || !this.lastName || !this.specialty || !this.dentistId || !this.email || !this.experience || !this.phone) {
        alert('All fields must be filled.');
        return false;
      }

      if (this.dentistId.toString().length !== 8) {
        alert('ID must be exactly 8 digits.');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        alert('Invalid email format.');
        return false;
      }

      if (isNaN(this.experience) || this.experience < 0 || this.experience > 30) {
        alert('Experience must be a number between 0 and 30.');
        return false;
      }

      if (this.phone.length !== 9 || isNaN(this.phone)) {
        alert('Phone number must be exactly 9 digits.');
        return false;
      }

      return true;
    }
  }
}
</script>

<template>
  <div v-if="isVisible" class="overlay flex justify-center items-center">
    <pv-card class="w-8/12 h-[80vh] rounded-bl-3xl justify-center">
      <template #header>
        <div class="bg-[#2C3E50] flex justify-items-start items-center rounded-t-2xl sticky top-0 z-10">
          <i class="pi pi-id-card py-8 px-5 text-white" style="font-size: 1rem;"></i>
          <p class="text-white px-5" style="font-weight: bold;" v-if="isCreating">{{ $t('Specialists.pProfile') }}</p>
          <p class="text-white px-5" style="font-weight: bold;" v-if="isEditing">{{ $t('Specialists.pProfile') }}: Dr. {{dentist?.first_name}} {{dentist?.last_name}}</p>
        </div>
      </template>
      <template #content>
        <div class="h-[60vh] overflow-y-auto bg-[#D1F2EB]">
          <form class="py-6 px-6 mb-6 grid grid-cols-2 gap-6">
            <div class="form-group w-full">
              <label for="firstName" class="block mb-1"><b>{{ $t('Specialists.fName') }}</b></label>
              <pv-inputtext id="firstName" v-model="firstName" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.fName')" />
            </div>

            <div class="form-group w-full">
              <label for="lastName" class="block mb-1"><b>{{ $t('Specialists.lName') }}</b></label>
              <pv-inputtext id="lastName" v-model="lastName" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.lName')"/>
            </div>

            <div class="form-group w-full">
              <label for="specialty" class="block mb-1"><b>{{ $t('Specialists.specialty') }}</b></label>
              <pv-inputtext id="specialty" v-model="specialty" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.specialty')"/>
            </div>

            <div class="form-group w-full">
              <label for="dni" class="block mb-1"><b>{{ $t('Specialists.id') }}</b></label>
              <pv-inputtext v-if="isCreating" id="dni" v-model="dentistId" type="number" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.id')" maxlength="8"/>
              <pv-inputtext v-if="isEditing" id="dni" v-model="dentistId" type="number" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.id')" maxlength="8" disabled/>
            </div>

            <div class="form-group w-full">
              <label for="email" class="block mb-1"><b>{{ $t('Specialists.email') }}</b></label>
              <pv-inputtext id="email" v-model="email" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.email')"/>
            </div>

            <div class="form-group w-full">
              <label for="experience" class="block mb-1"><b>{{ $t('Specialists.experience') }}</b></label>
              <pv-inputtext id="experience" v-model="experience" type="number" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.experience')" min="0" max="30"/>
            </div>

            <div class="form-group w-full">
              <label for="phone" class="block mb-1"><b>{{ $t('Specialists.phone') }}</b></label>
              <pv-inputtext id="phone" v-model="phone" type="number" class="input-field w-full rounded-xl p-2 shadow" :placeholder="$t('Specialists.phone')" maxlength="9"/>
            </div>
          </form>
        </div>
        <div class="sticky bottom-0 z-10 bg-[#D1F2EB] py-6 flex justify-center rounded-b-2xl gap-1">
          <pv-button class="button ok" @click="saveChanges">{{ $t('Specialists.save') }}</pv-button>
          <pv-button class="button cancel" @click="cancel">{{ $t('Specialists.cancel') }}</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.sticky {
  position: sticky;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>