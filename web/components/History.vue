<template>
  <b-card
    class="mt-3 history animated slideInUp"
    header="Payment History"
    header-bg-variant="primary"
    border-variant="primary"
    header-text-variant="white"
  >
    <div class="scroll-y">
      <b-table striped hover :items="items"></b-table>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "history",
  props: {
    items: Array
  }
}
</script>

<style>
.history {
  max-height: 60vh;
}

.history .card-body {
  overflow-y: scroll;
}
</style>
