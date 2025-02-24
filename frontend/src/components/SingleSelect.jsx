import Select from "react-select";

const SingleSelect = ({ field, form, options, setBalances }) => {
  const handleChange = (option) => {
    //set the field value to empty when no selected option
    if (!option) {
      form.setFieldValue(field.name, "");

      return;
    }

    //clears the balances
    setBalances(null);

    //sets the field value based on the selected option
    form.setFieldValue(field.name, option.value);
  };

  return (
    <Select
      options={options}
      isClearable
      onChange={handleChange}
      placeholder={"Select " + field.name}
    />
  );
};

export default SingleSelect;
