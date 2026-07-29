import * as api from "./medicineAPI";

export const getMedicines = async () => {
  const res = await api.getMedicinesRequest();
  return res.data.data;
};

export const getMedicine = async (id) => {
  const res = await api.getMedicineRequest(id);
  return res.data.data;
};

export const createMedicine = async (data) => {
  const res = await api.createMedicineRequest(data);
  return res.data.data;
};

export const updateMedicine = async (id, data) => {
  const res = await api.updateMedicineRequest(id, data);
  return res.data.data;
};

export const deleteMedicine = async (id) => {
  const res = await api.deleteMedicineRequest(id);
  return res.data;
};