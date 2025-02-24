import capitalizeFirstLetter from "./capitalizeFirstLetter";

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
