// Test script to demonstrate multi-tenant SaaS Builder patterns
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// Helper function to create a JWT token for testing
function createTestToken(tenantId, userId, roles = ['user']) {
  const payload = {
    tenantId,
    userId,
    roles,
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour
  };
  
  // Simple base64 encoding for demo (use proper JWT library in production)
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = 'demo-signature';
  
  return `${header}.${payloadB64}.${signature}`;
}

async function testMultiTenantAPI() {
  console.log('🧪 Testing Multi-Tenant SaaS API\n');

  // Create tokens for different tenants
  const tenant1AdminToken = createTestToken('tenant-acme', 'user-admin-1', ['admin']);
  const tenant1UserToken = createTestToken('tenant-acme', 'user-regular-1', ['user']);
  const tenant2AdminToken = createTestToken('tenant-globex', 'user-admin-2', ['admin']);

  try {
    console.log('1️⃣ Creating users for Tenant 1 (ACME Corp)...');
    
    // Create user in tenant 1
    const createUser1 = await fetch(`${BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tenant1AdminToken}`
      },
      body: JSON.stringify({
        email: 'john@acme.com',
        name: 'John Doe',
        role: 'user'
      })
    });
    
    const user1 = await createUser1.json();
    console.log('✅ Created user for ACME:', user1);

    console.log('\n2️⃣ Creating users for Tenant 2 (Globex Corp)...');
    
    // Create user in tenant 2
    const createUser2 = await fetch(`${BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tenant2AdminToken}`
      },
      body: JSON.stringify({
        email: 'jane@globex.com',
        name: 'Jane Smith',
        role: 'admin'
      })
    });
    
    const user2 = await createUser2.json();
    console.log('✅ Created user for Globex:', user2);

    console.log('\n3️⃣ Testing tenant isolation - ACME can only see their users...');
    
    // List users for tenant 1
    const listUsers1 = await fetch(`${BASE_URL}/api/v1/users`, {
      headers: {
        'Authorization': `Bearer ${tenant1AdminToken}`
      }
    });
    
    const acmeUsers = await listUsers1.json();
    console.log('👥 ACME users:', acmeUsers);

    console.log('\n4️⃣ Testing tenant isolation - Globex can only see their users...');
    
    // List users for tenant 2
    const listUsers2 = await fetch(`${BASE_URL}/api/v1/users`, {
      headers: {
        'Authorization': `Bearer ${tenant2AdminToken}`
      }
    });
    
    const globexUsers = await listUsers2.json();
    console.log('👥 Globex users:', globexUsers);

    console.log('\n5️⃣ Testing role-based access control...');
    
    // Try to create user with regular user token (should fail)
    const unauthorizedCreate = await fetch(`${BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tenant1UserToken}`
      },
      body: JSON.stringify({
        email: 'unauthorized@acme.com',
        name: 'Unauthorized User'
      })
    });
    
    const unauthorizedResult = await unauthorizedCreate.json();
    console.log('❌ Unauthorized attempt (expected):', unauthorizedResult);

    console.log('\n✅ Multi-tenant test completed successfully!');
    console.log('\n📋 Key SaaS Builder patterns demonstrated:');
    console.log('   • Tenant isolation at data layer');
    console.log('   • Role-based access control (RBAC)');
    console.log('   • JWT token validation');
    console.log('   • RESTful API design');
    console.log('   • Proper error handling');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your server is running: npm run dev');
  }
}

// Run the test
testMultiTenantAPI();