import normalizeMessageForForm from './normalizeMessageForForm';

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
