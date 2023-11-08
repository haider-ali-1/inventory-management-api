import express, { Router } from 'express';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
} from '../../controllers/supplier.controllers.js';
import { createSupplierValidator } from '../../validations/supplier.validations.js';

const router = Router();

router
  .route('/')
  .get(getAllSuppliers)
  .post(createSupplierValidator, createSupplier);
router
  .route('/:supplierId')
  .get(getSupplier)
  .patch(updateSupplier)
  .delete(deleteSupplier);

export { router };
