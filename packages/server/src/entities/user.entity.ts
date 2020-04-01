import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator = require('mongoose-unique-validator');
import bcrypt from 'bcryptjs';

import { hashSync } from 'bcryptjs';
import { IUserDocument } from './../../../shared/models/user';

const UserAddressSchema = new Schema(
  {
    postCode: String,
    city: String,
  },
  { versionKey: false, _id: false, id: false },
);

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    telephone: String,
    address: { type: [UserAddressSchema] },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: { type: String, required: true, enum: ['admin', 'client'] },
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

mongooseUniqueValidator(UserSchema);

export interface UserDocument extends IUserDocument, Document {
  isPasswordValid(password: string): string;
}

// check password is valid
UserSchema.methods.isPasswordValid = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

// crypt password before save
UserSchema.pre<UserDocument>('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.password = hashSync(this.password);
  }
  next();
});

// Delete password before sending user model
UserSchema.set('toJSON', {
  transform: function(_, ret) {
    delete ret.password;
    return ret;
  },
  getters: true,
});

export const UserEntity = model<UserDocument>('User', UserSchema);
