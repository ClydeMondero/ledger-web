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

  // useEffect(() => {
  //   console.log(balances);
  // }, [balances]);

  return (
    <div className="container-sm ">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-sm-12">
          <p className="h3">Check balances</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white border p-4 rounded shadow-sm">
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
                      setBalances={setBalances}
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
                    <table className="table table-striped  table-bordered mt-4">
                      <thead>
                        <tr className="table-light">
                          <th
                            className="text-success bg-success text-white"
                            scope="col"
                          >
                            #
                          </th>
                          <th
                            className="text-success bg-success text-white"
                            scope="col"
                          >
                            Sub-Account
                          </th>
                          <th
                            className="text-success bg-success text-white"
                            scope="col "
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(balances).map((key, index) => (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td>{capitalizeFirstLetter(key)}</td>
                            <td>{balances[key]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-warning">
                      No balances found for {selectedAccount} account
                    </p>
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
