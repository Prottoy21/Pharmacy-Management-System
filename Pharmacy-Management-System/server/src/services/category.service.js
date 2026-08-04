import Category from "../models/Category.js";

export const createCategory = (data) =>
  Category.create(data);

export const getCategories = () =>
  Category.find().sort({ name: 1 });

export const updateCategory = (id, data) =>
  Category.findByIdAndUpdate(id, data, {
    new: true,
  });

export const deleteCategory = (id) =>
  Category.findByIdAndDelete(id);