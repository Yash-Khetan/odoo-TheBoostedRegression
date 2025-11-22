import pool from "./config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploySchema() {
  const client = await pool.connect();
  try {
    console.log("🔄 Reading schema.sql file...");
    const schemaPath = path.join(__dirname, "database", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    
    console.log("🔄 Deploying database schema to Render PostgreSQL...");
    console.log("This will create all tables for the stocks page...\n");
    
    await client.query(schema);
    
    console.log("✅ Schema deployed successfully!");
    console.log("\n📊 Tables created:");
    console.log("  ✅ users");
    console.log("  ✅ products");
    console.log("  ✅ warehouses");
    console.log("  ✅ inventory");
    console.log("  ✅ receipts");
    console.log("  ✅ deliveries");
    console.log("  ✅ transfers");
    console.log("  ✅ adjustments");
    console.log("\n📋 Sample data inserted:");
    console.log("  ✅ 3 users");
    console.log("  ✅ 4 warehouses");
    console.log("  ✅ 8 products");
    console.log("  ✅ 24 inventory records");
    
    // Verify by counting records
    const countResult = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM products) as products,
        (SELECT COUNT(*) FROM warehouses) as warehouses,
        (SELECT COUNT(*) FROM inventory) as inventory
    `);
    
    console.log("\n✅ Verification:");
    console.log(`  Products: ${countResult.rows[0].products}`);
    console.log(`  Warehouses: ${countResult.rows[0].warehouses}`);
    console.log(`  Inventory records: ${countResult.rows[0].inventory}`);
    
    console.log("\n🎉 DEPLOYMENT COMPLETE!");
    console.log("\n📋 Next step: Restart your backend server");
    console.log("   npm start");
    
  } catch (err) {
    console.error("\n❌ ERROR deploying schema:", err.message);
    console.error("\nDetails:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

deploySchema();
