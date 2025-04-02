import axios from "axios";

/**
 * Get transactions
 */
export const getTransactions = async () => {
  const response = await axios.get("/transactions");

  return response.data;
};

/**
 * Create transaction
 */
export const postTransaction = async ({
  payee,
  balance,
  from_account,
  to_account,
}) => {
  const response = await axios.post("/transactions", {
    payee,
    balance,
    from_account,
    to_account,
  });

  return response.data;
};

/**
 * Update transaction
 */
export const putTransaction = async ({
  id,
  payee,
  balance,
  from_account,
  to_account,
}) => {
  const response = await axios.put(`/transactions/${id}`, {
    payee,
    balance,
    from_account,
    to_account,
  });

  return response.data;
};
