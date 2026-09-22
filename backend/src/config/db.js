const mongoose = require('mongoose');
const dns = require('dns');

// Configure reliable DNS servers to prevent querySrv ECONNREFUSED on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.warn('[DNS] Could not set custom DNS servers:', e.message);
}

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techreview';
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'techreview'
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Disable buffering when DB is disconnected to prevent 10s request hanging
    mongoose.set('bufferCommands', false);
    console.warn(`[MongoDB] Tip: Hãy đảm bảo MongoDB đang chạy hoặc cấu hình MONGODB_URI trong file backend/.env (ví dụ: MongoDB Atlas URI)`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;

