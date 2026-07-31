import { Company } from "../models/Company.js";
import { ApiError } from "../utils/apiResponse.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const companyService = {
  async list({ search, tag, page, limit }) {
    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (tag) filter.tags = tag;

    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      Company.find(filter).sort({ order: 1, name: 1 }).skip(skip).limit(limit),
      Company.countDocuments(filter),
    ]);

    return {
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async getById(id) {
    const company = await Company.findById(id);
    if (!company) {
      throw new ApiError(404, "Company not found");
    }
    return company;
  },

  async create(data) {
    const existing = await Company.findOne({ name: data.name });
    if (existing) {
      throw new ApiError(409, "A company with this name already exists");
    }

    const payload = { ...data, slug: slugify(data.name) };
    for (const key of ["logoUrl", "website"]) {
      if (!payload[key]) delete payload[key];
    }

    return Company.create(payload);
  },

  async update(id, data) {
    const company = await Company.findById(id);
    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    if (data.name && data.name !== company.name) {
      const existing = await Company.findOne({ name: data.name, _id: { $ne: id } });
      if (existing) {
        throw new ApiError(409, "A company with this name already exists");
      }
      company.slug = slugify(data.name);
    }

    Object.assign(company, data);
    if (data.logoUrl === "") company.logoUrl = null;
    if (data.website === "") company.website = null;

    await company.save();
    return company;
  },

  async remove(id) {
    const result = await Company.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(404, "Company not found");
    }
  },
};