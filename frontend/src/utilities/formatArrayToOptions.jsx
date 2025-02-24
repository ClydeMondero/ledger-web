function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const formatArrayToOptions = (array) => {
  const formattedArray = [];

  array.map((element) => {
    const newOption = {
      value: element,
      label: capitalizeFirstLetter(element),
    };

    formattedArray.push(newOption);
  });

  return formattedArray;
};

export default formatArrayToOptions;
