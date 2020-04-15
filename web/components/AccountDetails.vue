<template>
  <b-card-text>
    <div>
      Account: <code>{{ account }}</code>
    </div>
    <div>
      Balance: <code>{{ balance }}</code>
    </div>
  </b-card-text>
</template>

<script>
export default {
  name: 'accountDetails',
  props: {
    account: String,
    balance: String
  }
}
</script>
