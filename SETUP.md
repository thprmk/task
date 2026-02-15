# Setup Guide

## MongoDB Connection Error Fix

If you're getting `ECONNREFUSED` error when running `npm run seed`, it means MongoDB is not running or not accessible.

## Solution Options

### Option 1: Use Local MongoDB

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Homebrew: `brew install mongodb-community`
   - Or use Chocolatey: `choco install mongodb`

2. **Start MongoDB**:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS/Linux
   mongod
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   ```

### Option 2: Use MongoDB Atlas (Cloud - Recommended)

1. **Create a free MongoDB Atlas account**: https://www.mongodb.com/cloud/atlas

2. **Create a cluster** (free tier is fine)

3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Create `.env.local` file** in the project root:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-booking
   ```
   Replace `username`, `password`, and `cluster` with your actual values.

5. **Run the seed script**:
   ```bash
   npm run seed
   ```

### Option 3: Use Docker MongoDB

1. **Run MongoDB in Docker**:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Run the seed script**:
   ```bash
   npm run seed
   ```

## Verify MongoDB is Running

### Check if MongoDB is running locally:
```bash
# Windows
net start | findstr MongoDB

# macOS/Linux
ps aux | grep mongod
```

### Test connection:
```bash
# Windows
mongo

# macOS/Linux
mongosh
```

## After Successful Seeding

Once the seed script runs successfully, you'll see:
- ✅ Created 5 departments
- ✅ Created 8 doctors

Then you can:
- Start the development server: `npm run dev`
- Visit `/booking` to test patient booking
- Visit `/calendar` to view the hospital calendar
- Visit `/appointments` to manage appointments

## Troubleshooting

### Error: "ECONNREFUSED"
- MongoDB is not running
- Check if MongoDB service is started
- Verify connection string is correct

### Error: "Authentication failed"
- Check username/password in connection string
- For Atlas, ensure IP is whitelisted

### Error: "Cannot find module"
- Run `npm install` to install dependencies
- Ensure `tsx` is installed: `npm install -D tsx`



