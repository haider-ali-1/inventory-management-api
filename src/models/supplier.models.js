import mongoose, { Schema, model } from 'mongoose';

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
    tirm: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
    tirm: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
    tirm: true,
  },
});

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      tirm: true,
    },
    address: addressSchema,
    phoneNumbers: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Supplier = model('Customer', supplierSchema);
