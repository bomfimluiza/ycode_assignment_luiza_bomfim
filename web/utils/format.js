export function formatTransaction(transaction, account) {
  if(typeof transaction.amount === typeof 1) {
    transaction.amount = getCurrency(account) + transaction.amount;
    transaction.amount = getSign(transaction, account);
  }
  return transaction;
}

export function getCurrency(account) {
  return account.currency === 'usd' ? '$' : '€';
}

export function getSign(transaction, account) {
  if (account.id != transaction.to) {
    transaction.amount = '-' + transaction.amount;
  }
  return transaction.amount;
}

export default { formatTransaction, getCurrency, getSign };
