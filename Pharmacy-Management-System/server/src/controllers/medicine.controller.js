import * as medicineService from "../services/medicine.service.js";

import {
  createMedicineSchema,
  updateMedicineSchema,
} from "../validators/medicine.validator.js";

export const create = async (req, res, next) => {
  try {
    const data = createMedicineSchema.parse(req.body);

    const medicine = await medicineService.createMedicine(data);

    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: medicine,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );

    const search = String(req.query.search || "").trim();

    const result = await medicineService.getMedicines({
      page,
      limit,
      search,
    });

    res.status(200).json({
      success: true,
      data: result.medicines,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const medicine = await medicineService.getMedicineById(
      req.params.id
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = updateMedicineSchema.parse(req.body);

    const medicine = await medicineService.updateMedicine(
      req.params.id,
      data
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: medicine,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const medicine = await medicineService.deleteMedicine(
      req.params.id
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};