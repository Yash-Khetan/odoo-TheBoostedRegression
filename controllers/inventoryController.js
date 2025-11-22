import pool from "../config/db.js";

// Get all stock levels with product and warehouse details
export const getAllStock = async (req, res) => {
  try {
    const { warehouse_id, category, status } = req.query;
    
    let query = `
      SELECT 
        i.inventory_id,
        i.product_id,
        p.product_name,
        p.sku,
        p.category,
        p.unit_price,
        p.uom,
        p.reorder_level,
        i.warehouse_id,
        w.warehouse_name,
        w.location,
        i.quantity,
        i.quantity AS quantity_on_hand,
        i.reserved_quantity,
        (i.quantity - i.reserved_quantity) AS available_quantity,
        (i.quantity * p.unit_price) AS stock_value,
        CASE 
          WHEN i.quantity = 0 THEN 'out_of_stock'
          WHEN i.quantity <= p.reorder_level THEN 'low_stock'
          ELSE 'in_stock'
        END AS stock_status,
        i.last_updated
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      WHERE p.is_active = TRUE AND w.is_active = TRUE
    `;
    const params = [];
    let paramCount = 1;

    if (warehouse_id) {
      query += ` AND i.warehouse_id = $${paramCount}`;
      params.push(warehouse_id);
      paramCount++;
    }

    if (category) {
      query += ` AND p.category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (status) {
      const statusCondition = status === 'out_of_stock' ? 'i.quantity = 0' :
                              status === 'low_stock' ? 'i.quantity > 0 AND i.quantity <= p.reorder_level' :
                              'i.quantity > p.reorder_level';
      query += ` AND (${statusCondition})`;
    }

    query += ` ORDER BY p.product_name, w.warehouse_name`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock summary (totals across all warehouses)
export const getStockSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.product_name,
        p.sku,
        p.category,
        p.unit_price,
        p.uom,
        p.reorder_level,
        SUM(i.quantity) AS total_quantity,
        SUM(i.reserved_quantity) AS total_reserved,
        SUM(i.quantity - i.reserved_quantity) AS total_available,
        SUM(i.quantity * p.unit_price) AS total_value,
        CASE 
          WHEN SUM(i.quantity) = 0 THEN 'out_of_stock'
          WHEN SUM(i.quantity) <= p.reorder_level THEN 'low_stock'
          ELSE 'in_stock'
        END AS stock_status,
        COUNT(DISTINCT i.warehouse_id) AS warehouse_count
      FROM products p
      LEFT JOIN inventory i ON p.product_id = i.product_id
      WHERE p.is_active = TRUE
      GROUP BY p.product_id, p.product_name, p.sku, p.category, p.unit_price, p.uom, p.reorder_level
      ORDER BY p.product_name
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock by product (across all warehouses)
export const getStockByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        i.inventory_id,
        i.product_id,
        p.product_name,
        p.sku,
        p.category,
        i.warehouse_id,
        w.warehouse_name,
        w.location,
        i.quantity AS quantity_on_hand,
        i.reserved_quantity,
        (i.quantity - i.reserved_quantity) AS available_quantity,
        i.last_updated
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      WHERE i.product_id = $1
      ORDER BY w.warehouse_name
    `, [product_id]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock by warehouse (all products)
export const getStockByWarehouse = async (req, res) => {
  try {
    const { warehouse_id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        i.inventory_id,
        i.product_id,
        p.product_name,
        p.sku,
        p.category,
        i.warehouse_id,
        w.warehouse_name,
        w.location,
        i.quantity AS quantity_on_hand,
        i.reserved_quantity,
        (i.quantity - i.reserved_quantity) AS available_quantity,
        i.last_updated
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      WHERE i.warehouse_id = $1
      ORDER BY p.product_name
    `, [warehouse_id]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock alerts (low stock and out of stock)
export const getStockAlerts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_id,
        p.product_name,
        p.sku,
        p.category,
        p.reorder_level,
        w.warehouse_id,
        w.warehouse_name,
        i.quantity,
        i.reserved_quantity,
        (i.quantity - i.reserved_quantity) AS available_quantity,
        CASE 
          WHEN i.quantity = 0 THEN 'out_of_stock'
          WHEN i.quantity <= p.reorder_level THEN 'low_stock'
        END AS alert_type
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      WHERE p.is_active = TRUE 
        AND w.is_active = TRUE
        AND i.quantity <= p.reorder_level
      ORDER BY 
        CASE 
          WHEN i.quantity = 0 THEN 1
          ELSE 2
        END,
        i.quantity ASC
    `);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock movement history
export const getStockMovements = async (req, res) => {
  try {
    const { product_id, warehouse_id, movement_type, start_date, end_date, limit = 50 } = req.query;
    
    // Since movement history tables might not exist yet, return adjustments only for now
    let query = `
      SELECT 
        a.adjustment_id,
        'adjustment' AS movement_type,
        a.product_id,
        p.product_name,
        a.warehouse_id,
        w.warehouse_name,
        a.quantity_change,
        a.reason,
        a.notes,
        a.created_at AS transaction_date,
        NULL AS party_name,
        NULL AS reference_number
      FROM adjustments a
      JOIN products p ON a.product_id = p.product_id
      JOIN warehouses w ON a.warehouse_id = w.warehouse_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (product_id) {
      query += ` AND a.product_id = $${paramCount}`;
      params.push(product_id);
      paramCount++;
    }

    if (warehouse_id) {
      query += ` AND a.warehouse_id = $${paramCount}`;
      params.push(warehouse_id);
      paramCount++;
    }

    if (start_date) {
      query += ` AND a.created_at >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND a.created_at <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ` ORDER BY a.created_at DESC LIMIT $${paramCount}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create stock adjustment
export const createAdjustment = async (req, res) => {
  const client = await pool.connect();
  try {
    const { product_id, warehouse_id, quantity_change, reason, notes, created_by } = req.body;

    await client.query('BEGIN');

    // Get current inventory quantity
    const currentInventory = await client.query(
      `SELECT quantity FROM inventory 
       WHERE product_id = $1 AND warehouse_id = $2`,
      [product_id, warehouse_id]
    );

    if (currentInventory.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: "Inventory record not found" });
    }

    const currentQuantity = currentInventory.rows[0].quantity;
    const newQuantity = currentQuantity + quantity_change;

    // Check if new quantity would be negative
    if (newQuantity < 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: `Cannot reduce stock by ${Math.abs(quantity_change)}. Current quantity is ${currentQuantity}. This would result in negative stock (${newQuantity}).`
      });
    }

    // Insert adjustment record
    const adjustmentResult = await client.query(
      `INSERT INTO adjustments (product_id, warehouse_id, quantity_change, reason, notes, created_by, adjustment_date)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
       RETURNING adjustment_id, product_id, warehouse_id, quantity_change, reason, notes, adjustment_date, created_by, created_at`,
      [product_id, warehouse_id, quantity_change, reason, notes, created_by]
    );

    // Update inventory quantity
    const inventoryResult = await client.query(
      `UPDATE inventory 
       SET quantity = $3, last_updated = CURRENT_TIMESTAMP
       WHERE product_id = $1 AND warehouse_id = $2
       RETURNING inventory_id, product_id, warehouse_id, quantity, reserved_quantity, last_updated`,
      [product_id, warehouse_id, newQuantity]
    );

    await client.query('COMMIT');

    res.json({ 
      message: "Stock adjustment created successfully",
      adjustment: adjustmentResult.rows[0],
      inventory: inventoryResult.rows[0]
    });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Get stock statistics
export const getStockStatistics = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT p.product_id) AS total_products,
        COUNT(DISTINCT w.warehouse_id) AS total_warehouses,
        SUM(i.quantity) AS total_stock_units,
        SUM(i.quantity * p.unit_price) AS total_stock_value,
        COUNT(CASE WHEN i.quantity = 0 THEN 1 END) AS out_of_stock_count,
        COUNT(CASE WHEN i.quantity > 0 AND i.quantity <= p.reorder_level THEN 1 END) AS low_stock_count,
        COUNT(CASE WHEN i.quantity > p.reorder_level THEN 1 END) AS in_stock_count
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      WHERE p.is_active = TRUE AND w.is_active = TRUE
    `);
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reserved quantity (for order management)
export const updateReservedQuantity = async (req, res) => {
  try {
    const { product_id, warehouse_id, reserved_quantity } = req.body;

    const result = await pool.query(
      `UPDATE inventory 
       SET reserved_quantity = $3, last_updated = CURRENT_TIMESTAMP
       WHERE product_id = $1 AND warehouse_id = $2
       RETURNING *`,
      [product_id, warehouse_id, reserved_quantity]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Inventory record not found" });
    }

    res.json({ 
      message: "Reserved quantity updated",
      inventory: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
