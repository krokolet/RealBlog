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

export default normalizeMessageForForm;
