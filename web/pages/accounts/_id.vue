<template>
  <div>
    <div class="container d-flex justify-content-center" v-if="loading">
      <b-spinner variant="primary" class="m-5 loading" label="Loading..."></b-spinner>
    </div>

    <div class="container" v-if="!loading">
      <b-card
        :header="'Welcome, ' + account.name"
        class="mt-3 animated slideInUp"
        header-bg-variant="primary"
        border-variant="primary"
        header-text-variant="white"
      >
        <account-details :account="account.id" :balance="balanceString" />

        <new-payment-button @click="show = !show" />

        <logout-button />
      </b-card>
      <transition
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <new-transaction
          v-show="show"
          @submit="onSubmit"
          :loading="addingTransaction"
        />
      </transition>
      <b-alert class="mt-3" v-model="insuficientFunds" variant="danger" dismissible>
        Your funds are insuficient for this transaction.
      </b-alert>
      <history :items="transactions" />
    </div>
  </div>
</template>

<script lang="ts">
import { getAccountInfo } from "@/api/account";
import { getTransactions, addTransaction } from "@/api/transaction";
import { formatTransaction, getCurrency } from "@/utils/format";
import AccountDetails from "@/components/AccountDetails";
import NewTransaction from "@/components/NewTransaction";
import NewPaymentButton from "@/components/NewPaymentButton";
import LogoutButton from "@/components/LogoutButton";
import History from "@/components/History";

export default {
  components: { AccountDetails, NewTransaction, NewPaymentButton, LogoutButton, History },
  data() {
    return {
      show: false,
      payment: {},
      account: {},
      transactions: [],
      loading: true,
      addingTransaction: false,
      insuficientFunds: false
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
        this.addingTransaction = true;
        addTransaction(this.account, payment)
          .then(response => {
            if(response) {
              that.addingTransaction = false;
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
        this.insuficientFunds = true;
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

<style scoped>
.loading {
  width: 50px;
  height: 50px;
}
</style>
