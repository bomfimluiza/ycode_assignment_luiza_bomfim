<template>
  <div>
    <div class="container" v-if="loading">loading...</div>

    <div class="container" v-if="!loading">
      <b-card :header="'Welcome, ' + account.name" class="mt-3">
        <account-details :account="account.id" :balance="getCurrency() + account.balance" />

        <b-button size="sm" variant="success" @click="show = !show">
          New payment
        </b-button>

        <logout-button />
      </b-card>
      <new-transaction v-show="show" @submit="onSubmit" />

      <b-card class="mt-3" header="Payment History">
        <b-table striped hover :items="transactions"></b-table>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import AccountDetails from '../../components/AccountDetails';
import NewTransaction from '../../components/NewTransaction';
import LogoutButton from '../../components/LogoutButton';

export default {
  components: { AccountDetails, NewTransaction, LogoutButton },
  data() {
    return {
      show: false,
      payment: {},
      account: {},
      transactions: [],
      loading: true
    };
  },
  mounted() {
    this.account.id = this.$route.params.id;
    const that = this;

    this.getUserInfo(this);
    this.getTransactions(this);

    if (this.account && this.transactions) {
      this.loading = false;
    }
  },
  methods: {
    onSubmit(payment) {
      var that = this;

      payment.from = this.account.id;
      const postUrl = this.getUrl(this.account.id + '/transactions');
      axios
        .post(postUrl, payment)
        .then(res => {
          if(res.status === 200) {
            that.addTransaction(payment);
            payment = {};
            this.show = false;
          }
        });
    },
    getUserInfo(that) {
      axios
        .get(this.getUrl(this.account.id))
        .then(function(response) {
          if (!response.data) {
            window.location.href = '/';
          } else {
            that.account = response.data;
            that.account.id = that.$route.params.id;
          }
        });
    },
    getTransactions(that) {
      axios
        .get(this.getUrl(this.account.id + '/transactions'))
        .then(function(response) {
          for(const key in response.data) {
            let formattedTransaction = that.formatTransaction(response.data[key]);
            that.transactions.push(formattedTransaction);
          }
        });
    },
    addTransaction(transaction) {
      let formattedTransaction = this.formatTransaction(transaction);
      this.transactions.push(formattedTransaction);
    },
    formatTransaction(transaction) {
      if(typeof transaction.amount === typeof 1) {
        transaction.amount = this.getCurrency() + transaction.amount;
        transaction.amount = this.getSign(transaction);
      }
      return transaction;
    },
    getCurrency() {
      return this.account.currency === 'usd' ? '$' : '€';
    },
    getSign(transaction) {
      if (this.account.id != transaction.to) {
        transaction.amount = '-' + transaction.amount;
      }
      return transaction.amount;
    },
    getUrl(param) {
      return 'https://ycode-81e4e.firebaseio.com/accounts/-M4uPSCQsSUxrtN_5UvY/' + param + '.json';
    }
  }
};
</script>
