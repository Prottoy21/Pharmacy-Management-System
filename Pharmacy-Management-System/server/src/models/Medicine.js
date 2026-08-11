import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    genericName: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    strength: {
      type: String,
      required: true,
      trim: true,
    },

    dosageForm: {
      type: String,
      required: true,
      trim: true,
    },

    barcode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    batchNumber: {
      type: String,
      required: true,
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    manufacturingDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

medicineSchema.index({
  medicineName: "text",
  genericName: "text",
  brand: "text",
  company: "text",
  barcode: "text",
});

medicineSchema.index({ category: 1 });
medicineSchema.index({ expiryDate: 1 });
medicineSchema.index({ quantity: 1 });

const Medicine = mongoose.model(
  "Medicine",
  medicineSchema
);

export default Medicine;