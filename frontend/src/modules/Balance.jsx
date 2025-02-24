import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SingleSelect from "../components/SingleSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import formatArrayToOptions from "../utilities/formatArrayToOptions";

const Balance = () => {
  const [accounts, setAccounts] = useState([]);
  const validationSchema = Yup.object({
    account: Yup.string().required("Account is required"),
  });

  const initialValues = {
    account: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
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
  //   console.log(accounts);
  // }, [accounts]);

  return (
    <div className="container vh-100">
      <div className="row align-items-center justify-content-center h-100">
        <div className="col-6">
          <p className="h3">Check Balance</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="border p-4 rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    Account Type
                  </label>
                  <Field
                    name="account"
                    className="form-control"
                    options={accounts}
                    component={SingleSelect}
                  />
                  <ErrorMessage
                    name="account"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  Check
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Balance;
