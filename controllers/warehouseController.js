import pool from "../config/db.js";

export const getAllWarehouses = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        w.warehouse_id as id, 
        w.warehouse_name as name, 
        w.location, 
        w.capacity, 
        w.is_active,
        COUNT(DISTINCT s.product_id) as product_count,
        COALESCE(SUM(s.qty), 0) as total_quantity,
        w.created_at,
        w.updated_at
      FROM warehouses w
      LEFT JOIN stock s ON w.warehouse_id = s.warehouse_id
      GROUP BY w.warehouse_id, w.warehouse_name, w.location, w.capacity, w.is_active, w.created_at, w.updated_at
      ORDER BY w.warehouse_id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWarehouseById = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;
    
    // Get warehouse details
    const warehouseResult = await pool.query(
      `SELECT 
        warehouse_id as id, 
        warehouse_name as name, 
        location, 
        capacity, 
        is_active,
        created_at,
        updated_at
      FROM warehouses 
      WHERE warehouse_id=$1`,
      [warehouseId]
    );

    if (warehouseResult.rows.length === 0) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    // Get products in this warehouse with stock
    const productsResult = await pool.query(
      `SELECT 
        p.product_id as id,
        p.product_name as name,
        p.sku,
        p.category,
        p.uom,
        p.unit_price,
        p.reorder_level,
        SUM(s.qty) as quantity,
        COUNT(DISTINCT s.location_id) as location_count
      FROM stock s
      JOIN products p ON s.product_id = p.product_id
      WHERE s.warehouse_id = $1
      GROUP BY p.product_id, p.product_name, p.sku, p.category, p.uom, p.unit_price, p.reorder_level
      ORDER BY p.product_name`,
      [warehouseId]
    );

    // Get locations in this warehouse
    const locationsResult = await pool.query(
      `SELECT 
        l.id,
        l.name,
        l.code,
        COUNT(s.id) as stock_items
      FROM locations l
      LEFT JOIN stock s ON l.id = s.location_id
      WHERE l.warehouse_id = $1
      GROUP BY l.id, l.name, l.code
      ORDER BY l.code`,
      [warehouseId]
    );

    // Get recent receipts for this warehouse
    const receiptsResult = await pool.query(
      `SELECT 
        receipt_id as id,
        supplier_name as vendor,
        receipt_date as date,
        reference_number,
        COALESCE(status, 'draft') as status
      FROM receipts
      WHERE warehouse_id = $1
      ORDER BY created_at DESC
      LIMIT 10`,
      [warehouseId]
    );

    // Get recent deliveries for this warehouse
    const deliveriesResult = await pool.query(
      `SELECT 
        delivery_id as id,
        customer_name as customer,
        delivery_date as date,
        reference_number,
        COALESCE(status, 'draft') as status
      FROM deliveries
      WHERE warehouse_id = $1
      ORDER BY created_at DESC
      LIMIT 10`,
      [warehouseId]
    );

    res.json({
      ...warehouseResult.rows[0],
      products: productsResult.rows,
      locations: locationsResult.rows,
      recent_receipts: receiptsResult.rows,
      recent_deliveries: deliveriesResult.rows,
      stats: {
        total_products: productsResult.rows.length,
        total_quantity: productsResult.rows.reduce((sum, p) => sum + parseFloat(p.quantity || 0), 0),
        total_locations: locationsResult.rows.length,
        capacity_used: Math.round((productsResult.rows.reduce((sum, p) => sum + parseFloat(p.quantity || 0), 0) / warehouseResult.rows[0].capacity) * 100)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Keep old exports for compatibility
export const getWarehouses = getAllWarehouses;

export const createWarehouse = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    const result = await pool.query(
      "INSERT INTO warehouses (warehouse_name, location, capacity, is_active) VALUES ($1, $2, $3, true) RETURNING *",
      [name, location, capacity || 1000]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
