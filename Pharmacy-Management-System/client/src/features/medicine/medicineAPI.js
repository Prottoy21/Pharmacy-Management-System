import api from "../../api/axios";

export const getMedicinesRequest = (params) =>
  api.get("/medicines", {
    params,
  });

export const getMedicineRequest = (id) =>
  api.get(`/medicines/${id}`);

export const createMedicineRequest = (data) =>
  api.post("/medicines", data);

export const updateMedicineRequest = (id, data) =>
  api.put(`/medicines/${id}`, data);

export const deleteMedicineRequest = (id) =>
  api.delete(`/medicines/${id}`);