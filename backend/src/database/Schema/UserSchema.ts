import mongoose, { Schema, Document } from "mongoose";
import { v4 } from "uuid";

interface IChat {
  id: string;
}

interface IUser extends Document {
  id: string;
  name: string;
  surname: string;
  email: string;
  hash_password: string;
  avatar: string;
  birthday: string;
  chatList: IChat[];
}

const UserSchema = new Schema<IUser>({
  id: { type: String, unique: true, default: () => v4() },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    require: false,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  chatList: [
    {
      id: { type: String, required: true },
    },
  ],
});

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
