<script>
export default {
  name: "changelang.component",
  data(){
    return {
      isEnglish: this.$i18n.locale === 'en'
    };
  },
  methods:{
    toggleLanguage(){
      this.$i18n.locale = this.isEnglish ? 'en' : 'es';
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md w-20">
    <pv-togglebutton
        v-model="isEnglish"
        onLabel="EN"
        offLabel="ES"
        @change="toggleLanguage"
        class="text-xl"
    />
    <span class="ml-1 text-gray-700 font-semibold">
    </span>
  </div>
</template>

<style scoped>

</style>