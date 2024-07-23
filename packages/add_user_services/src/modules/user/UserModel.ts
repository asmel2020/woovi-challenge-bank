import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserSchema } from './validate';
import { ValidationError } from 'yup';
import { GraphQLError } from 'graphql';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    balance: {
      type: Number,
      default: 100000,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}

userSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

userSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    try {
      UserSchema.validateSync({ name: this.name, email: this.email, password: this.password });
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new GraphQLError(error.errors[0]);
      }
    }
    (this.email = this.email.trim().toLowerCase()), (this.password = this.encryptPassword(this.password));
  }
  return next();
});

const UserModel: Model<IUser> = mongoose.models['User'] || mongoose.model('User', userSchema);

export default UserModel;
