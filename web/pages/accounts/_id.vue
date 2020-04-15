<template>
  <div>
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
import { getTransactions, postTransaction } from "@/api/transaction";
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
      balanceString: '',
      transactions: [],
      loading: true
    };
  },
  mounted() {
    this.account.id = this.$route.params.id;
    const that = this;

    getAccountInfo(this.account.id).then(response => {
      that.account = response;
      that.account.id = that.$route.params.id;
      that.balanceString = getCurrency(that.account) + that.account.balance;
      getTransactions(this.account).then(response => {
        that.transactions = response;
        if (that.account && that.transactions) {
          that.loading = false;
        }
      });
    });
  },
  methods: {
    onSubmit(payment) {
      var that = this;
      payment.from = this.account.id;
      postTransaction(this.account, payment)
        .then(response => {
          if(response.status === 200) {
            that.addTransaction(payment);
            payment = {};
            this.show = false;
          }
        });
    },
    addTransaction(transaction) {
      let formattedTransaction = formatTransaction(transaction, this.account);
      this.transactions.push(formattedTransaction);
    }
  }
};
</script>
