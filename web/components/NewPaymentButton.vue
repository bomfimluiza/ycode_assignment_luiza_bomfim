<template>
  <b-button size="sm" variant="success" @click="onClick">
    New payment
  </b-button>
</template>

<script>
export default {
  name: "newPaymentButton",
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>
