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

3. **Network Access**: In Atlas go to **Network Access** → **IP Access List** → **Add IP Address**. Add `0.0.0.0/0` (allow from anywhere) or your current IP. Wait 1–2 minutes for it to apply.

4. **Get your connection string** (use the exact one from Atlas):
   - In Atlas: **Database** → click **Connect** on your cluster (e.g. Cluster0)
   - Choose **Drivers** (or "Connect your application") → **Node.js**
   - Copy the **connection string** shown (e.g. `mongodb+srv://user:<password>@cluster0.xxxxx.mongodb.net/...`)
   - Replace `<password>` with your database user password
   - Add your database name in the path, e.g. change `...mongodb.net/` to `...mongodb.net/hospital` (before any `?`)

5. **Create `.env.local`** in the project root with that exact string:
   ```env
   MONGODB_URI="<paste the connection string here>"
   ```

6. **Run the seed script**:
   ```bash
   npm run seed
   ```

**If you see "Could not connect" or "IP not whitelisted"**: Use the connection string you **copied from the Atlas Connect dialog** (step 4). Do not build the URI by hand—Atlas gives the correct hostnames (including replica set hosts for the standard format).

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



