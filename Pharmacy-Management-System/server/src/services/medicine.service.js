import Medicine from "../models/Medicine.js";

export const createMedicine = async (data) => {
  return Medicine.create(data);
};

export const getMedicines = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  const skip = (page - 1) * limit;

  const filter = {};

  if (search) {
    filter.$or = [
      { medicineName: { $regex: search, $options: "i" } },
      { genericName: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { barcode: { $regex: search, $options: "i" } },
    ];
  }

  const [medicines, total] = await Promise.all([
    Medicine.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Medicine.countDocuments(filter),
  ]);

  return {
    medicines,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getMedicineById = async (id) => {
  return Medicine.findById(id);
};

export const updateMedicine = async (id, data) => {
  return Medicine.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteMedicine = async (id) => {
  return Medicine.findByIdAndDelete(id);
};