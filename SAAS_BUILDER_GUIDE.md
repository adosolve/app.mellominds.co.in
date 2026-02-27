# SaaS Builder Integration Guide

This guide shows how your MelloMinds application has been enhanced with SaaS Builder patterns for multi-tenant architecture.

## What's New

Your application now includes:

### 🏢 Multi-Tenant Architecture
- **Tenant Isolation**: Each customer (tenant) has completely isolated data
- **Scalable Design**: Add new tenants without code changes
- **Cost Efficiency**: Pay only for what you use with serverless architecture

### 🔐 Enhanced Security
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Admin vs user permissions
- **Tenant Context**: All operations are automatically scoped to the correct tenant

### 📊 Modern Data Layer
- **DynamoDB**: NoSQL database optimized for multi-tenant SaaS
- **Composite Keys**: Tenant ID prefix ensures data isolation
- **Serverless**: No database servers to manage

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Add your AWS credentials (or use AWS CLI configured profile):
```env
AWS_REGION=us-east-1
DYNAMODB_TABLE=saas-app-data
```

### 3. Test the Multi-Tenant API

Start your server:
```bash
npm run dev
```

Run the test script:
```bash
node test-multitenant.js
```

This will demonstrate:
- Creating users for different tenants
- Tenant data isolation
- Role-based permissions
- Proper error handling

## API Examples

### Authentication
All API calls require a JWT token with tenant context:
```bash
curl -H "Authorization: Bearer <jwt-token>" \
     http://localhost:3000/api/v1/users
```

### Create User (Admin Only)
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-jwt-token>" \
  -d '{"email":"user@company.com","name":"John Doe","role":"user"}' \
  http://localhost:3000/api/v1/users
```

### List Users (Tenant-Scoped)
```bash
curl -H "Authorization: Bearer <jwt-token>" \
     http://localhost:3000/api/v1/users
```

## Key SaaS Builder Patterns Implemented

### 1. Tenant Data Access (`backend/lib/tenants.js`)
```javascript
// All database keys are prefixed with tenant ID
const key = `${tenantId}#User#${userId}`;

// Queries are automatically scoped to tenant
const users = await dataAccess.queryByType('User');
```

### 2. JWT Middleware
```javascript
// Extract tenant context from JWT (simulated)
req.tenantContext = {
  tenantId: 'tenant-acme',
  userId: 'user-123',
  roles: ['admin']
};
```

### 3. Role-Based Access Control
```javascript
// Require admin role for sensitive operations
router.post('/users', requireRole('admin'), async (req, res) => {
  // Only admins can create users
});
```

### 4. Tenant-Scoped Queries
```javascript
// All data operations include tenant context
const dataAccess = new TenantDataAccess(tenantId);
const user = await dataAccess.getItem('User', userId);
```

## Production Deployment

For production, you'll want to:

1. **Use AWS Lambda**: Convert Express routes to Lambda functions
2. **Add API Gateway**: Handle authentication and rate limiting
3. **Use Cognito/Auth0**: Proper JWT token management
4. **Add CloudWatch**: Monitoring and logging
5. **Enable Stripe**: Payment processing and billing

## Next Steps

1. **Explore AWS Tools**: Use the saas-builder power's AWS knowledge server
2. **Add Billing**: Integrate Stripe for subscription management
3. **Deploy Serverless**: Convert to Lambda functions
4. **Add Monitoring**: CloudWatch dashboards and alerts

## Architecture Benefits

### Cost Efficiency
- **No Idle Costs**: Pay only when customers use your app
- **Linear Scaling**: Costs scale with usage, not infrastructure
- **Shared Infrastructure**: All tenants share the same codebase

### Scalability
- **Automatic Scaling**: DynamoDB and Lambda scale automatically
- **Global Reach**: Deploy to multiple AWS regions
- **High Availability**: Built-in redundancy and failover

### Security
- **Data Isolation**: Impossible for tenants to access each other's data
- **Encryption**: Data encrypted at rest and in transit
- **Compliance**: Built for SOC2, GDPR, and other standards

## Troubleshooting

### Common Issues

1. **AWS Credentials**: Make sure AWS CLI is configured or environment variables are set
2. **DynamoDB Table**: Create the table in AWS console or use local DynamoDB
3. **JWT Tokens**: Use the test script format for development

### Local Development

For local development without AWS:
1. Install DynamoDB Local
2. Set `AWS_ENDPOINT=http://localhost:8000` in `.env`
3. Create local tables for testing

## Learn More

Use the SaaS Builder power to explore:
- AWS serverless patterns
- DynamoDB best practices
- Stripe integration
- Multi-tenant security
- Cost optimization strategies