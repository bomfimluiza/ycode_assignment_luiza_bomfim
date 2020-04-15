const base = 'https://ycode-81e4e.firebaseio.com/accounts/-M4uPSCQsSUxrtN_5UvY/';

export function accountEndpoint(accountId) {
  return `${base}/${accountId}.json`;
}

export function transactionsEndpoint(accountId) {
  return `${base}/${accountId}/transactions.json`;
}

export default {
  accountEndpoint,
  transactionsEndpoint
};
