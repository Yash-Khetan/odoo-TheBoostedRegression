import express from "express";
import {
  getAllStock,
  getStockSummary,
  getStockByProduct,
  getStockByWarehouse,
  getStockAlerts,
  getStockMovements,
  createAdjustment,
  getStockStatistics,
  updateReservedQuantity
} from "../controllers/inventoryController.js";

const router = express.Router();

// Get all stock levels (with optional filters)
router.get("/", getAllStock);

// Get stock summary (totals across all warehouses)
router.get("/summary", getStockSummary);

// Get stock statistics
router.get("/statistics", getStockStatistics);

// Get stock alerts (low stock & out of stock)
router.get("/alerts", getStockAlerts);

// Get stock movements history
router.get("/movements", getStockMovements);

// Get stock by product (across all warehouses)
router.get("/product/:product_id", getStockByProduct);

// Get stock by warehouse (all products)
router.get("/warehouse/:warehouse_id", getStockByWarehouse);

// Create stock adjustment
router.post("/adjustment", createAdjustment);

// Update reserved quantity
router.put("/reserved", updateReservedQuantity);

export default router;
