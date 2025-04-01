import axios from "axios";

/**
 * Get accounts
 */
export const getAccounts = async () => {
  const response = await axios.get("/accounts/info");

  return response.data;
};

/**
 * Get accounts options
 */
export const getAccountsOptions = async () => {
  const response = await axios.get("/accounts");

  return response.data;
};
