<script>
import toolbarHomeComponent from "../../../../public/Toolbar/toolbar-home.component.vue";
export default {
  name: "home.component",
  components:{toolbarHomeComponent},
}
</script>

<template>
  <toolbarHomeComponent>
  </toolbarHomeComponent>

  <!-- MUESTRA TODOS LOS COMPONENTES que contiene este componente y que estan RELACIONADOS AL ROOT-->
  <router-view></router-view>
</template>

<style scoped>

</style>