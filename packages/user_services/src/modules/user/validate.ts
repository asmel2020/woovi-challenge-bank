import { object, string, number, date, InferType } from 'yup';

export const UserSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().matches(
    /^(?=(?:.*[0-9]){1})(?=(?:.*[a-z]){1})(?=(?:.*[A-Z]){1})(?=(?:.*[@$!%*?&.]){1})[A-Za-z0-9@$!%*?&.]{8,}$/,
    'Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)',
  ),
});
