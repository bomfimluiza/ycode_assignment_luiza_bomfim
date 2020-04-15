import mockAxios from "jest-mock-axios";
import { getTransactions, addTransaction } from "@/api/transaction";

const fakeGetResponse = {
  data: {
    from: 123,
    to: 456,
    details: "fake transaction",
    amount: 10
  }
};
const fakeAccount = {
  id: 123,
  name: "First",
  balance: 30
};
const fakeTransaction = {
  from: 456,
  to: 123,
  details: "fake transaction 2",
  amount: 10
};

afterEach(() => {
  mockAxios.reset();
});

describe("Transaction api features", () => {
  it("send an account and get all account transactions", () => {
    expect.assertions(1);
    let catchFn = jest.fn();

    getTransactions(fakeAccount)
      .then(response => {
        expect(response[0].amount).toBe(fakeGetResponse.data.amount);
      })
      .catch(catchFn);

    expect(catchFn).not.toHaveBeenCalled();
  });

  it("send an transaction and update all the accounts involved", () => {
    expect.assertions(2);
    let catchFn = jest.fn();

    addTransaction(fakeTransaction)
      .then(response => {
        expect(response).toBe(true);
      })
      .catch(catchFn);

    expect(catchFn).not.toHaveBeenCalled();
  });
});
