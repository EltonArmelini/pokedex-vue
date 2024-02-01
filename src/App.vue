<template>
  <nav>
    <img src="@/assets/logo-pockedex.svg" alt="PockeDex">
  </nav>
  <div class="main-container">
    <router-view />
  </div>
</template>


<script lang="ts" setup>

</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
}

nav {
  background-color: #4CAF50;
  color: #fff;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  img {
    height: 100%;
    display: block;
  }

}

.main-container {
  padding: 20px;
}
</style>
