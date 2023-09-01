// JWT settings
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRATION = '1d'; // 1 day

// Rate limiter settings
export const MAX_REQUESTS = 100; // Max number of requests per windowMs
export const WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

// Database settings
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';

// Error messages
export const INVALID_TOKEN = 'Invalid token. Authorization denied.';
export const MISSING_TOKEN = 'No token. Authorization denied.';
export const INVALID_CREDENTIALS = 'Invalid email or password.';
export const EMAIL_ALREADY_EXISTS = 'An account with this email already exists.';
export const USERNAME_ALREADY_EXISTS = 'An account with this username already exists.';
