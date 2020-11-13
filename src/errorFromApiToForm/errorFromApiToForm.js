const normalizeMessageForForm = ({ errors }) => {
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

const errorFromApiToForm = (error) => {
  if (!error) return { errorUnknown: 'Sorry, something went wrong :(' };
  switch (error.status) {
    case 422:
      return normalizeMessageForForm(error.data);
    default:
      return { errorUnknown: 'Sorry, something went wrong :(' };
  }
};

export default errorFromApiToForm;
