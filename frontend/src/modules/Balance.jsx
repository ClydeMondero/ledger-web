import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SingleSelect from "../components/SingleSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import formatArrayToOptions from "../utilities/formatArrayToOptions";
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";

const balances = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState(null);

  const validationSchema = Yup.object({
    account: Yup.string().required("Account is required"),
  });

  const initialValues = {
    account: "",
  };

  const handleSubmit = async (values) => {
    const account = values.account;

    setSelectedAccount(account);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/ledger?account=${account}`
      );

      setBalances(response.data.balance);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ledger");
        if (response.data.success) {
          const formattedAccounts = formatArrayToOptions(
            response.data.accounts
          );

          setAccounts(formattedAccounts);
        } else {
          console.log("Error fetching accounts");
        }
      } catch (e) {
        console.error(e);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    console.log(balances);
  }, [balances]);

  return (
    <div className="container vh-100">
      <div className="row align-items-center justify-content-center h-100">
        <div className="col-6">
          <p className="h3">Check balances</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="border p-4 rounded shadow-sm">
                <div className="row">
                  <label htmlFor="account" className="form-label">
                    Account Type
                  </label>
                  <div className="col-8">
                    <Field
                      name="account"
                      className="form-control"
                      options={accounts}
                      component={SingleSelect}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="col-4 btn btn-primary"
                  >
                    Check
                  </button>
                </div>
                <ErrorMessage
                  name="account"
                  component="div"
                  className="text-danger"
                />

                {balances &&
                  (balances.length != 0 ? (
                    <div>
                      <p>Balances for {selectedAccount}:</p>
                      {Object.keys(balances).map((key, index) => (
                        <p key={index}>
                          <span>{capitalizeFirstLetter(key)} </span>
                          <span>{balances[key]}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div>No balances found for {selectedAccount}</div>
                  ))}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default balances;
