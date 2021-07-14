export const inputCheckValidity = (value, needValidation) => {
  let isValid = true;
  if (needValidation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (needValidation.minLenght) {
    isValid = needValidation.minLenght <= value.length && isValid;
  }

  if (needValidation.maxLenght) {
    isValid = needValidation.maxLenght >= value.length && isValid;
  }

  return isValid;
};
