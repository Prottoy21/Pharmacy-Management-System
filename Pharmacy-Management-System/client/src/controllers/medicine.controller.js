import * as medicineService from "../services/medicine.service.js";
import { medicineSchema } from "../validators/medicine.validator.js";

export const create = async (req, res, next) => {
  try {
    const data = medicineSchema.parse(req.body);

    const medicine = await medicineService.createMedicine(data);

    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const medicines = await medicineService.getMedicines();

    res.json({
      success: true,
      data: medicines,
    });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const medicine = await medicineService.getMedicineById(req.params.id);

    res.json({
      success: true,
      data: medicine,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const medicine = await medicineService.updateMedicine(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: medicine,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await medicineService.deleteMedicine(req.params.id);

    res.json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};