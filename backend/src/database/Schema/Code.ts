import mongoose, { Schema, Document } from "mongoose";

export interface ICode extends Document {
  mail: string;
  code: number;
  count: number;
  isVerefy: boolean;
}

const CodeSchema = new Schema<ICode>({
  mail: {
    type: String,
    required: true,
    unique: true, 
  },
  count: {
    type:Number,
    required: true,
    default: 0,
  },
  code: {
    type: Number,
    required: true,
  },
  isVerefy: {
    type: Boolean,
    default: false,
  },
});

const Code = mongoose.model<ICode>("code", CodeSchema);

export default Code;
