import api from "../../services/api";

export const getMedicinesRequest = () => {
  return api.get("/medicines");
};

export const getMedicineRequest = (id) => {
  return api.get(`/medicines/${id}`);
};

export const createMedicineRequest = (data) => {
  return api.post("/medicines", data);
};

export const updateMedicineRequest = (id, data) => {
  return api.put(`/medicines/${id}`, data);
};

export const deleteMedicineRequest = (id) => {
  return api.delete(`/medicines/${id}`);
};