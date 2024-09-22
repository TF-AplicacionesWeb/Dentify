<script>
export default {
  name: "profile-general-information.component"
}
</script>

<template>
  <div class="profile-general-information-container">
    <p><b>General information</b></p>
    <hr class="custom-line">
    <p><b>Name:</b> Lorem ipsum dolor sit amet</p>
    <p><b>Email:</b> Aliquam scelerisque viverra lobortis</p>
  </div>
</template>

<style scoped>
.profile-general-information-container {
  background-color: #D1F2EB;
  border-radius: 30px;
  height: 20vw;
  padding: 2em 2em;
  text-align: left;
  margin-top: 1em;
  font-size: 1em;
}

.profile-general-information-container p, .profile-general-information-container hr {
  margin: 0.7em 0.5em;
}

.custom-line {
  background-color: black;
  height: 0.2em;
}
</style>