import axios from "axios";
import { transactionsEndpoint } from "@/api/endpoints";
import { formatTransaction } from "@/utils/format";
import { getAccountInfo, updateAccountInfo } from "@/api/account";

export async function callGetEndpoint(URL) {
  const response = await axios.get(URL);
  return response;
}

export async function callPostEndpoint(URL, data) {
  const response = await axios.post(URL, data);
  return response;
}

export async function getTransactions(account) {
  try {
    let transactions = [];
    const response = await callGetEndpoint(transactionsEndpoint(account.id));
    for(const key in response.data) {
      let formattedTransaction = formatTransaction(response.data[key], account);
      transactions.push(formattedTransaction);
    }
    return transactions;
  } catch (e) {
    return null;
  }
}

export async function addTransaction(account, transaction) {
  try {
    let toAccount = await getAccountInfo(transaction.to);
    await postTransaction(account, toAccount, transaction);

    account = await getAccountInfo(account.id);
    toAccount = await getAccountInfo(toAccount.id);

    await updateAccounts(account, toAccount, transaction);

    return true;
  } catch (e) {
    return null;
  }
}

export async function postTransaction(fromAccount, toAccount, transaction) {
  try {
    await callPostEndpoint(transactionsEndpoint(fromAccount.id), transaction);
    await callPostEndpoint(transactionsEndpoint(toAccount.id), transaction);
    return true;
  } catch (e) {
    return null;
  }
}

async function updateAccounts(fromAccount, toAccount, transaction){
  try {
    fromAccount.balance -= transaction.amount;
    toAccount.balance += transaction.amount;
    await updateAccountInfo(fromAccount);
    await updateAccountInfo(toAccount);
    return true;
  } catch (e) {
    return null
  }
}

export default { getTransactions, postTransaction };
