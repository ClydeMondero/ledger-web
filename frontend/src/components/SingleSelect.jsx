import Select from "react-select";

const SingleSelect = ({ field, form, options }) => {
  const handleChange = (option) => {
    if (!option) {
      form.setFieldValue(field.name, "");

      return;
    }

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
