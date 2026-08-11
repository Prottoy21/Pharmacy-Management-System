import * as api from "./medicineAPI";

export const getMedicines = async (params) => {
  const response = await api.getMedicinesRequest(params);

  return response.data;
};

export const getMedicine = async (id) => {
  const response = await api.getMedicineRequest(id);

  return response.data.data;
};

export const createMedicine = async (data) => {
  const response = await api.createMedicineRequest(data);

  return response.data.data;
};

export const updateMedicine = async (id, data) => {
  const response = await api.updateMedicineRequest(
    id,
    data
  );

  return response.data.data;
};

export const deleteMedicine = async (id) => {
  const response = await api.deleteMedicineRequest(id);

  return response.data;
};