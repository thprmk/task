/**
 * Quick MongoDB Atlas connection check.
 * Run: node scripts/check-mongo-connection.js
 * Uses .env.local from project root (run from task/ folder).
 */
const { readFileSync } = require('fs');
const path = require('path');

// Load .env.local
try {
  const envPath = path.join(process.cwd(), '.env.local');
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key && value) process.env[key] = value;
  });
} catch (e) {
  console.error('No .env.local found in', process.cwd());
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env.local');
  process.exit(1);
}

const mongoose = require('mongoose');
console.log('Trying:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => { console.log('OK – Connected to Atlas'); process.exit(0); })
  .catch((err) => { console.error('Error:', err.message); process.exit(1); });
