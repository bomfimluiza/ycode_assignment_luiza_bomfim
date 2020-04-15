<template>
  <b-card
    class="mt-3"
    header="New Payment"
    header-bg-variant="success"
    border-variant="success"
    header-text-variant="white"
  >
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="To:" label-for="input-1">
        <b-form-input
          id="input-1"
          size="sm"
          v-model="payment.to"
          type="number"
          required
          placeholder="Destination ID"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
        <b-input-group prepend="$" size="sm">
          <b-form-input
            id="input-2"
            v-model="payment.amount"
            type="number"
            required
            placeholder="Amount"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group id="input-group-3" label="Details:" label-for="input-3">
        <b-form-input
          id="input-3"
          size="sm"
          v-model="payment.details"
          required
          placeholder="Payment details"
        ></b-form-input>
      </b-form-group>

      <b-button id="submit" type="submit" size="sm" variant="primary">
        <b-spinner small v-show="loading"></b-spinner>
        <span v-show="!loading">Submit</span>
      </b-button>
    </b-form>
  </b-card>
</template>

<script lang="ts">
export default {
  name: 'newTransaction',
  props: {
    loading: Boolean
  },
  data() {
    return {
      payment: {}
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.payment.amount = +this.payment.amount;
      this.$emit('submit', this.payment);
    }
  }
}
</script>

<style scoped>
#submit {
  width: 100px;
}
</style>
