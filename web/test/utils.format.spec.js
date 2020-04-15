import {
  formatTransaction,
  getCurrency,
  getSign
} from "@/utils/format";

const fakeAccount = {
  id: 123,
  name: "First",
  balance: 30
};
const fakeTransaction = {
  from: 123,
  to: 456,
  details: "fake transaction 2",
  amount: 10
};
const fakeAccount2 = {
  id: 123,
  name: "First",
  balance: 30,
  currency: "usd"
};
const fakeTransaction2 = {
  from: 456,
  to: 123,
  details: "fake transaction 2",
  amount: 10
};

describe("Format utils", () => {
  it("get transaction and returns its amount with currency and sign", () => {
    const formattedTransaction = formatTransaction(fakeTransaction, fakeAccount);
    expect(formattedTransaction.amount).toBe("-€10");
    const formattedTransactionAgain = formatTransaction(fakeTransaction, fakeAccount);
    expect(formattedTransactionAgain.amount).toBe("-€10");
  });

  it("get account and return the currency symbol accordingly to the account value (euro is the default)", () => {
    const accountCurrency = getCurrency(fakeAccount);
    expect(accountCurrency).toBe("€");
    const accountCurrency2 = getCurrency(fakeAccount2);
    expect(accountCurrency2).toBe("$");
  });

  it("get transaction amount sign accordingly to if the money is going out or in the account", () => {
    const amountWithSign = getSign(fakeTransaction2, fakeAccount2);
    expect(amountWithSign).toBe(10);
  });
});
