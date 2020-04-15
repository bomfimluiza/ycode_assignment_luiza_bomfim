import mockAxios from "jest-mock-axios";
import { getAccountInfo, updateAccountInfo } from "@/api/account";

const fakeAccountId = "123";
const fakeGetResponse = {
  data: {
    id: 123,
    name: "First",
    balance: 10
  }
};
const fakeAccountToUpdate = {
  id: 123,
  name: "First",
  balance: 30
};

afterEach(() => {
  mockAxios.reset();
});

describe("Account api features", () => {
  it("send an account id and get all the account information", () => {
    expect.assertions(1);
    let catchFn = jest.fn();

    getAccountInfo(fakeAccountId)
      .then(response => {
        expect(response.name).toBe(fakeGetResponse.data.name);
      })
      .catch(catchFn);

    expect(catchFn).not.toHaveBeenCalled();
  });

  it("send an account and update all the account information", () => {
    expect.assertions(1);
    let catchFn = jest.fn();

    updateAccountInfo(fakeAccountToUpdate)
      .then(response => {
        expect(response.status).toBe(200);
      })
      .catch(catchFn);

    expect(catchFn).not.toHaveBeenCalled();
  });
});
