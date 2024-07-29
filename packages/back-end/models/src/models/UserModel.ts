import bcrypt from 'bcryptjs';
import mongoose, { Document, Model } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true
    },
    balance: {
      type: Number,
      default: 100000
    },
    password: {
      type: String,
      required: true,
      hidden: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    collection: 'User'
  }
);

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  balance: number;
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
  }
};

userSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.email = this.email.trim().toLowerCase();
    this.password = this.encryptPassword(this.password);
  }
  return next();
});

const UserModel: Model<IUser> = mongoose.models['User'] || mongoose.model('User', userSchema);

export default UserModel;
