import axios from "axios";
import { accountEndpoint } from "@/api/endpoints";

export async function callGetEndpoint(URL) {
  const response = await axios.get(URL);
  return response;
}

export async function callPutEndpoint(URL, data) {
  const response = await axios.put(URL, data);
  return response;
}

export async function getAccountInfo(accountId) {
  try {
    const response = await callGetEndpoint(accountEndpoint(accountId));
    if(!response.data) {
      window.location.href = '/';
    }
    else {
      response.data.id = accountId;
      return response.data;
    }
  } catch (e) {
    return null;
  }
}

export async function updateAccountInfo(account) {
  try {
    const response = await callPutEndpoint(accountEndpoint(account.id), account);
    if(!response.data) {
      window.location.href = '/';
    }
    else {
      return response.data;
    }
  } catch (e) {
    return null;
  }
}

export default { getAccountInfo, updateAccountInfo };
