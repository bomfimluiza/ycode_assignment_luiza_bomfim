<template>
  <div>
    <div class="container" v-if="loading">loading...</div>

    <div class="container" v-if="!loading">
      <b-card :header="'Welcome, ' + account.name" class="mt-3">
        <b-card-text>
          <div>
            Account: <code>{{ account.id }}</code>
          </div>
          <div>
            Balance:
            <code
              >{{ account.currency === "usd" ? "$" : "€"
              }}{{ account.balance }}</code
            >
          </div>
        </b-card-text>
        <b-button size="sm" variant="success" @click="show = !show"
          >New payment</b-button
        >

        <b-button
          class="float-right"
          variant="danger"
          size="sm"
          nuxt-link
          to="/"
          >Logout</b-button
        >
      </b-card>

      <b-card class="mt-3" header="New Payment" v-show="show">
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

          <b-button type="submit" size="sm" variant="primary">Submit</b-button>
        </b-form>
      </b-card>

      <b-card class="mt-3" header="Payment History">
        <b-table striped hover :items="transactions"></b-table>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

export default {
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
    const that = this;
    this.account.id = this.$route.params.id;

    this.getUserInfo(this);
    this.getTransactions(this);

    if (this.account && this.transactions) {
      this.loading = false;
    }
  },
  methods: {
    onSubmit(evt) {
      var that = this;
      evt.preventDefault();

      this.payment.from = this.account.id;
      const postUrl = this.getUrl(this.account.id + '/transactions');
      axios.post(postUrl, this.payment);

      this.payment = {};
      this.show = false;

      // update items
      setTimeout(() => {
        that.getUserInfo(that);
        that.getTransactions(that);
      }, 200);
    },
    getUserInfo(that) {
      axios
        .get(that.getUrl(that.account.id))
        .then(function(response) {
          if (!response.data) {
            window.location.href = "/";
          } else {
            that.account = response.data;
          }
        });
    },
    getTransactions(that) {
      axios
        .get(this.getUrl(this.account.id + '/transactions'))
        .then(function(response) {
          for(const key in response.data) {
            that.transactions.push(response.data[key]);
          }

          that.transactions = that.formatTransactions(that.transactions);
        });
    },
    formatTransactions(transactions) {
      var formattedTransactions = [];
      for (let i = 0; i < transactions.length; i++) {
        transactions[i].amount = this.getCurrency() + transactions[i].amount;
        transactions[i].amount = this.getSign(transactions[i]);
        formattedTransactions.push(transactions[i]);
      }
      return formattedTransactions;
    },
    getCurrency() {
      return this.account.currency === "usd" ? "$" : "€";
    },
    getSign(transaction) {
      if (this.account.id != transaction.to) {
        transaction.amount = "-" + transaction.amount;
      }
      return transaction.amount;
    },
    getUrl(param) {
      return 'https://ycode-81e4e.firebaseio.com/accounts/-M4uPSCQsSUxrtN_5UvY/' + param + '.json';
    }
  }
};
</script>
