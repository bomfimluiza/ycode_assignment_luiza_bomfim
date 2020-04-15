<template>
  <div>
    <!-- TODO: Change loading... for a spinner -->
    <div class="container" v-if="loading">loading...</div>

    <div class="container" v-if="!loading">
      <b-card :header="'Welcome, ' + account.name" class="mt-3">
        <account-details :account="account.id" :balance="balanceString" />

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
import { getAccountInfo } from "@/api/account";
import { getTransactions, addTransaction } from "@/api/transaction";
import { formatTransaction, getCurrency } from "@/utils/format";
import AccountDetails from "@/components/AccountDetails";
import NewTransaction from "@/components/NewTransaction";
import LogoutButton from "@/components/LogoutButton";

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

    getAccountInfo(this.account.id).then(response => {
      that.account = response;
      getTransactions(this.account).then(response => {
        that.transactions = response;
        if (that.account && that.transactions) {
          that.loading = false;
        }
      });
    });
  },
  computed: {
    balanceString() {
      return getCurrency(this.account) + this.account.balance;
    }
  },
  methods: {
    onSubmit(payment) {
      var that = this;
      payment.from = this.account.id;
      if(this.hasFunds(payment)){
        //TODO: Insert a spinner while request is being made
        addTransaction(this.account, payment)
          .then(response => {
            if(response) {
              that.makeTransaction(payment);
              payment = {};
              that.show = false;
            }
          });
      }
    },
    hasFunds(transaction){
      if(this.account.balance - transaction.amount > 0) {
        return true;
      }
      else {
        //TODO: Change alert for a dialog
        alert('Your funds are insuficient.');
        return false;
      }
    },
    makeTransaction(transaction) {
      if (this.account.id != transaction.to) {
        this.account.balance -= transaction.amount;
      }
      else {
        this.account.balance += transaction.amount;
      }
      this.addToHistory(transaction);
    },
    addToHistory(transaction) {
      let formattedTransaction = formatTransaction(transaction, this.account);
      this.transactions.push(formattedTransaction);
    }
  }
};
</script>
