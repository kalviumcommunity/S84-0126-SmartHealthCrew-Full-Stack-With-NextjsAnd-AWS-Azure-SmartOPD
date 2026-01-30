// Test script for SmartOPD API endpoints
const BASE_URL = "http://localhost:3000/api";

async function testEndpoints() {
  console.log("🧪 Testing SmartOPD API Endpoints\n");

  // Test 1: GET /api/patients
  try {
    console.log("1️⃣ Testing GET /api/patients");
    const response = await fetch(`${BASE_URL}/patients`);
    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`   Found ${data.length} patients\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 2: POST /api/patients
  try {
    console.log("2️⃣ Testing POST /api/patients");
    const response = await fetch(`${BASE_URL}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Patient",
        phone: "1234567890",
      }),
    });
    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`   Created patient with token: ${data.token}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 3: GET /api/queue/current
  try {
    console.log("3️⃣ Testing GET /api/queue/current");
    const response = await fetch(`${BASE_URL}/queue/current`);
    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`   Current token: ${data.currentToken}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  // Test 4: POST /api/queue/next
  try {
    console.log("4️⃣ Testing POST /api/queue/next");
    const response = await fetch(`${BASE_URL}/queue/next`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`   ${data.message || data}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
  }

  console.log("✅ API Testing Complete!");
}

testEndpoints();
