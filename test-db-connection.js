import pool from "./config/db.js";

async function testConnection() {
  try {
    console.log("🔄 Attempting to connect to Render PostgreSQL...");
    
    // Test connection
    const client = await pool.connect();
    console.log("✅ Successfully connected to database!");
    
    // Try to create a simple test table
    console.log("\n🔄 Creating test table 'test_stocks_page'...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_stocks_page (
        id SERIAL PRIMARY KEY,
        test_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Test table created successfully!");
    
    // Insert a test record
    console.log("\n🔄 Inserting test data...");
    const insertResult = await client.query(`
      INSERT INTO test_stocks_page (test_name) 
      VALUES ('Stock page test') 
      RETURNING *
    `);
    console.log("✅ Test data inserted:", insertResult.rows[0]);
    
    // Query the test record
    console.log("\n🔄 Querying test data...");
    const queryResult = await client.query("SELECT * FROM test_stocks_page");
    console.log("✅ Retrieved data:", queryResult.rows);
    
    // Clean up - drop the test table
    console.log("\n🔄 Cleaning up test table...");
    await client.query("DROP TABLE test_stocks_page");
    console.log("✅ Test table dropped!");
    
    client.release();
    
    console.log("\n🎉 ALL TESTS PASSED! Database is ready to use.");
    console.log("\n📋 Next steps:");
    console.log("1. Run the schema.sql file to create all tables");
    console.log("2. Restart your backend server");
    console.log("3. Your stocks page will work!");
    
    process.exit(0);
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error("\n📋 Details:", err);
    process.exit(1);
  }
}

testConnection();
