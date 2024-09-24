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
    <pv-togglebutton v-model="isEnglish" onLabel="EN" offLabel="ES" @change="toggleLanguage" class="px-10"/>
</template>

<style scoped>

</style>