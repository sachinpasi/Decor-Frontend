interface GetUpdatedValuesPropsTypes {
  values: object;
  initialValues: any;
}

export const GetUpadtedValues = ({
  values,
  initialValues,
}: GetUpdatedValuesPropsTypes) => {
  return Object.entries(values).reduce((acc: any, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
};
