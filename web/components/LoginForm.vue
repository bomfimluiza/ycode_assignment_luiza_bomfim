<template>
  <div class="form-container">
    <b-form>
      <b-form-group
        id="input-group"
        label="Enter your account ID:"
        label-for="input"
      >
        <b-form-input
          id="input"
          type="number"
          v-model="accountId"
          required
          placeholder="Account ID"
        ></b-form-input>
      </b-form-group>

      <b-button nuxt-link :to="'/accounts/' + accountId" variant="primary">
        Login
      </b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      accountId: 1
    }
  }
}
</script>

<style>
.form-container {
  width: fit-content;
  margin-top: 50px;
  display: flex;
}

.form-container label {
  font-weight: bolder;
}
</style>
