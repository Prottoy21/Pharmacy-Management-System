import Medicine from "../models/Medicine.js";

export const createMedicine = async (payload) => {
  return await Medicine.create(payload);
};

export const getMedicines = async () => {
  return await Medicine.find().sort({
    createdAt: -1,
  });
};

export const getMedicineById = async (id) => {
  return await Medicine.findById(id);
};

export const updateMedicine = async (id, payload) => {
  return await Medicine.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteMedicine = async (id) => {
  return await Medicine.findByIdAndDelete(id);
};