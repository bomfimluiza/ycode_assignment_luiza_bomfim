<template>
  <div class="container">
    <div class="animated slideInUp">
      <logo />
      <login-form />
    </div>
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';

export default {
  components: { Logo, LoginForm }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding-top: 10%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
