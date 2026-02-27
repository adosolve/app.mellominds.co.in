// Multi-tenant user management API following SaaS Builder patterns
import express from 'express';
import { TenantDataAccess, extractTenantContext, requireRole } from '../lib/tenants.js';

const router = express.Router();

// Apply tenant context extraction to all routes
router.use(extractTenantContext);

/**
 * GET /api/v1/users
 * List all users for the current tenant
 */
router.get('/', async (req, res) => {
  try {
    const { tenantId } = req.tenantContext;
    const dataAccess = new TenantDataAccess(tenantId);
    
    // Query users scoped to this tenant only
    const users = await dataAccess.queryByType('User');
    
    // Remove sensitive fields before returning
    const sanitizedUsers = users.map(user => ({
      id: user.entityId,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    }));

    res.json({
      users: sanitizedUsers,
      tenantId // Include for debugging (remove in production)
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch users' }
    });
  }
});

/**
 * GET /api/v1/users/:id
 * Get a specific user (tenant-scoped)
 */
router.get('/:id', async (req, res) => {
  try {
    const { tenantId } = req.tenantContext;
    const { id } = req.params;
    
    const dataAccess = new TenantDataAccess(tenantId);
    const user = await dataAccess.getItem('User', id);
    
    if (!user) {
      return res.status(404).json({
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    // Return sanitized user data
    res.json({
      id: user.entityId,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user' }
    });
  }
});

/**
 * POST /api/v1/users
 * Create a new user (admin only)
 */
router.post('/', requireRole('admin'), async (req, res) => {
  try {
    const { tenantId } = req.tenantContext;
    const { email, name, role = 'user' } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Email and name are required' }
      });
    }

    // Generate user ID (in production, use UUID)
    const userId = `user_${Date.now()}`;
    
    const dataAccess = new TenantDataAccess(tenantId);
    
    // Create user with tenant isolation
    const newUser = await dataAccess.putItem('User', userId, {
      email,
      name,
      role,
      status: 'active'
    });

    // Return sanitized user data
    res.status(201).json({
      id: newUser.entityId,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to create user' }
    });
  }
});

/**
 * PUT /api/v1/users/:id
 * Update a user (admin only)
 */
router.put('/:id', requireRole('admin'), async (req, res) => {
  try {
    const { tenantId } = req.tenantContext;
    const { id } = req.params;
    const { name, role } = req.body;

    const dataAccess = new TenantDataAccess(tenantId);
    
    // Check if user exists
    const existingUser = await dataAccess.getItem('User', id);
    if (!existingUser) {
      return res.status(404).json({
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }

    // Update user data
    const updatedUser = await dataAccess.putItem('User', id, {
      ...existingUser,
      name: name || existingUser.name,
      role: role || existingUser.role,
      updatedAt: new Date().toISOString()
    });

    res.json({
      id: updatedUser.entityId,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      updatedAt: updatedUser.updatedAt
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to update user' }
    });
  }
});

export default router;