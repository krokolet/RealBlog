import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string().email(),
  password: Yup.string().min(8, 'Too short, minimum 8 character').max(20, 'Too long, maximum 20 characters'),
  image: Yup.string().url(),
});

export default EditProfileSchema;
