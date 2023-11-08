import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { Supplier } from '../models/supplier.models.js';
import { asyncHandler } from '../utils/shared.utils.js';

// @ Create New Supplier
// @ POST /api/v1/suppliers
const createSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.create(req.body);
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'supplier created successfully',
    data: { supplier },
  });
});

// @ Get Single Supplier
// @ GET /api/v1/suppliers/:supplierId
const getSupplier = asyncHandler(async (req, res, next) => {
  const supplierId = req.params.supplierId;
  const supplier = await Supplier.findById(supplierId);
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { customer },
  });
});

// @ Update Supplier
// @ PATCH /api/v1/suppliers/:supplierId
const updateSupplier = asyncHandler(async (req, res, next) => {
  const supplierId = req.params.supplierId;
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    supplierId,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'supplier updated successfully',
    data: { updateSupplier },
  });
});

// @ Delete Supplier
// @ DELETE /api/v1/suppliers/:supplierId
const deleteSupplier = asyncHandler(async (req, res, next) => {
  const supplierId = req.params.supplierId;
  await Supplier.findByIdAndDelete(supplierId);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'supplier deleted successfully',
  });
});

// @ Get All Suppliers
// @ DELETE /api/v1/suppliers/:supplierId
const getAllSuppliers = asyncHandler(async (req, res, next) => {
  const suppliers = await Supplier.find({});
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { suppliers },
  });
});

export {
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  getAllSuppliers,
};
