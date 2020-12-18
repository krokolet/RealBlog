import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8, 'Too short, minimum 8 character').max(20, 'Too long, maximum 20 characters').required(),
  image: Yup.string().url(),
});

export default EditProfileSchema;
