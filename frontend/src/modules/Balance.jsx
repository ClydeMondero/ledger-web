import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SingleSelect from "../components/SingleSelect";

const Balance = () => {
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
  });

  const initialValues = {
    category: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <Field
                    name="category"
                    className="form-control"
                    options={options}
                    component={SingleSelect}
                  />
                  <ErrorMessage
                    name="category"
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
