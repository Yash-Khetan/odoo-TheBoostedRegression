import express from "express";
import {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById
} from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/", getAllWarehouses);
router.get("/:warehouseId", getWarehouseById);
router.post("/", createWarehouse);

export default router;
