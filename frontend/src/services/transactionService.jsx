import axios from "axios";

/**
 * Get Transactions
 */
export const getTransactions = async () => {
  const response = await axios.get("/transactions");

  console.log(response);

  return response.data;
};
