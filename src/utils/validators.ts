function whenInputIsValid(
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >,
  value: string | number | null,
  shouldTargetParent: boolean
) {
  shouldTargetParent
    ? inputRef.current?.parentElement?.classList.remove("error")
    : inputRef.current?.classList.remove("error");

  shouldTargetParent
    ? inputRef.current?.parentElement?.classList.add("valid")
    : inputRef.current?.classList.add("valid");
}

function whenInputIsNotValid(
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >,
  value: string | number | null,
  shouldTargetParent: boolean
) {
  shouldTargetParent
    ? inputRef.current?.parentElement?.classList.remove("active")
    : inputRef.current?.classList.remove("active");
  shouldTargetParent
    ? inputRef.current?.parentElement?.classList.remove("valid")
    : inputRef.current?.classList.remove("valid");
  shouldTargetParent
    ? inputRef.current?.parentElement?.classList.add("error")
    : inputRef.current?.classList.add("error");
}

export function emailValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: string | number | null,
  shouldTargetParent: boolean
) {
  if (value && inputRef.current?.validity.valid) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function nameValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: string | null,
  shouldTargetParent: boolean
) {
  if (value && inputRef.current?.validity.valid) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function bioValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: string | null,
  shouldTargetParent: boolean
) {
  if (value && value.length >= 2) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function passwordValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: string | null,
  shouldTargetParent: boolean
) {
  if (value && inputRef.current?.validity.valid) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function confirmPasswordValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: string | null,
  comparisonValue: string | null,
  shouldTargetParent: boolean
) {
  if (value && inputRef.current?.validity.valid && value === comparisonValue) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function textValidator(
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >,
  value: string | null,
  shouldTargetParent: boolean
) {
  if (value?.trim() && value.length >= 1) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function categoryValidator(
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >,
  value: string | null,
  shouldTargetParent: boolean
) {
  const categoryArr = [
    "Bike Reviews",
    "Travel & Tips",
    "Parts & Accessories",
    "Latest News",
    "Maintenance",
    "Luxury Bikes",
  ];
  if (value && categoryArr.includes(value)) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}

export function numberValidator(
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  value: number | null,
  shouldTargetParent: boolean
) {
  if (value && value >= 2 && value <= 100) {
    whenInputIsValid(inputRef, value, shouldTargetParent);
    return true;
  } else {
    whenInputIsNotValid(inputRef, value, shouldTargetParent);
    return false;
  }
}
