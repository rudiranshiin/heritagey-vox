import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    learnerId?: string;
    role: 'learner' | 'admin' | 'system';
  };
}

export interface JWTPayload {
  sub: string;
  learnerId?: string;
  role: 'learner' | 'admin' | 'system';
  iat: number;
  exp: number;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization format. Use: Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = {
      id: decoded.sub,
      learnerId: decoded.learnerId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next();
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = {
      id: decoded.sub,
      learnerId: decoded.learnerId,
      role: decoded.role,
    };
  } catch {
    // Invalid token in optional auth - just proceed without user
  }

  next();
}

export function requireRole(...roles: Array<'learner' | 'admin' | 'system'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

export function requireLearnerAccess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const requestedLearnerId = req.params.learnerId || req.params.id;

  if (req.user.role === 'admin' || req.user.role === 'system') {
    return next();
  }

  if (req.user.learnerId !== requestedLearnerId) {
    return res.status(403).json({ error: 'Access denied to this learner data' });
  }

  next();
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function generateSystemToken(): string {
  return jwt.sign(
    { sub: 'system', role: 'system' as const },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

