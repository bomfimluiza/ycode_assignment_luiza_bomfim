import axios from "axios";
import { accountEndpoint } from "@/api/endpoints";

export async function callGetEndpoint(URL) {
  const response = await axios.get(URL);
  return response;
}

export async function getAccountInfo(accountId) {
  try {
    const response = await callGetEndpoint(accountEndpoint(accountId));
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

export default {
  getAccountInfo
};
