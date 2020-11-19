const normalizeMessageForForm = (errors) => {
  const errTypes = Object.keys(errors);

  return errTypes.reduce(
    (acc, err) => ({
      ...acc,
      [err === 'email or password' ? 'email' : err]:
        `${err} ${errors[err][0]}`.charAt(0).toUpperCase() + `${err} ${errors[err][0]}`.slice(1),
    }),
    {}
  );
};

const errorFromApiToForm = (status, errors) => {
  if (!errors) return { errorUnknown: 'Sorry, something went wrong :(' };
  switch (status) {
    case 422:
      return normalizeMessageForForm(errors);
    default:
      return { errorUnknown: 'Sorry, something went wrong :(' };
  }
};

export default errorFromApiToForm;
