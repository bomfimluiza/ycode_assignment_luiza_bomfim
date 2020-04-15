import axios from "axios";
import { transactionsEndpoint } from "@/api/endpoints";
import { formatTransaction } from "@/utils/format";

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

export async function postTransaction(account, transaction) {
  try {
    const response = await callPostEndpoint(transactionsEndpoint(account.id), transaction);
    return response;
  } catch (e) {
    return null;
  }
}

export default { getTransactions, postTransaction };
