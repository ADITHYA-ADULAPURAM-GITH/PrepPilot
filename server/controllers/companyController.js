import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { companyService } from "../services/companyService.js";

export const listCompanies = asyncHandler(async (req, res) => {
  const { companies, pagination } = await companyService.list(req.query);
  res.status(200).json(new ApiResponse(200, { companies, pagination }, "OK"));
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await companyService.getById(req.params.id);
  res.status(200).json(new ApiResponse(200, { company }, "OK"));
});

export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyService.create(req.body);
  res.status(201).json(new ApiResponse(201, { company }, "Company added"));
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await companyService.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { company }, "Company updated"));
});

export const deleteCompany = asyncHandler(async (req, res) => {
  await companyService.remove(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Company deleted"));
});