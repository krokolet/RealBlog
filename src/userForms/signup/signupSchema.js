import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(1, 'Too short, minimum 1 character').max(20, 'Too long, maximum 20 characters').required(),
  repeatPassword: Yup.string().test(null, 'Password mismatch!', function isRepeat(repeatPassword) {
    const ref = Yup.ref('password');
    return repeatPassword === this.resolve(ref);
  }),
  acceptTerms: Yup.boolean().test('Accept', 'Accept terms required.', (value) => value),
});

export default SignupSchema;
