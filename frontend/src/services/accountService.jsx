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

/**
 * Create account
 */
export const postAccount = async ({ name, description, balance }) => {
  const response = await axios.post("/accounts", {
    name,
    description,
    balance,
  });

  return response.data;
};

/**
 * Update account
 */
export const putAccount = async ({ id, name, description }) => {
  const response = await axios.put(`/accounts/${id}`, {
    name,
    description,
  });

  return response.data;
};
