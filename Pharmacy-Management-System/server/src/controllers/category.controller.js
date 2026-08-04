import * as service from "../services/category.service.js";

export const create = async (req, res, next) => {
  try {
    const category = await service.createCategory(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const categories = await service.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const category = await service.updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteCategory(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};