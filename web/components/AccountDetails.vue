<template>
  <b-card-text>
    <div>
      Account: <strong>{{ account }}</strong>
    </div>
    <div>
      Balance: <strong>{{ balance }}</strong>
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
