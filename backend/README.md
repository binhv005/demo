# TechReview Backend REST API

Hệ thống Backend RESTful API hoàn chỉnh xây dựng bằng **Node.js + Express.js + MongoDB + Mongoose** phục vụ nền tảng đánh giá và bảng xếp hạng TechReview.

---

## 1. Cài đặt và Khởi chạy

### Bước 1: Cài đặt Dependencies
```bash
cd backend
npm install
```

### Bước 2: Cấu hình File `.env`
Tạo file `.env` trong thư mục `backend/` dựa trên `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/techreview
CLIENT_URL=http://localhost:5173
```
> **Lưu ý:** Nếu sử dụng MongoDB Atlas trên mây, thay thế `MONGODB_URI` bằng chuỗi kết nối từ Atlas (ví dụ: `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/techreview?retryWrites=true&w=majority`).

### Bước 3: Nạp dữ liệu mẫu ban đầu (Seed Database)
```bash
npm run seed
```

### Bước 4: Khởi chạy Server
- Chế độ phát triển (Development với auto-reload):
```bash
npm run dev
```
- Chế độ Production:
```bash
npm start
```

Server sẽ lắng nghe tại: `http://localhost:3000`  
API Endpoint: `http://localhost:3000/api`

---

## 2. Danh Sách REST API Endpoints

### 2.1 Products (`/api/products`)
- `GET /api/products` - Danh sách sản phẩm (hỗ trợ query `type`, `categorySlug`, `groupSlug`, `search`, `sort`, `page`, `limit`)
- `GET /api/products/:id` - Xem chi tiết sản phẩm theo ID hoặc slug
- `POST /api/products` - Thêm sản phẩm mới (Zod validate)
- `PATCH /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### 2.2 Categories (`/api/categories`)
- `GET /api/categories` - Danh sách danh mục
- `GET /api/categories/:id` - Chi tiết danh mục
- `POST /api/categories` - Thêm danh mục mới
- `PATCH /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

### 2.3 Rankings (`/api/rankings`)
- `GET /api/rankings` - Danh sách bảng xếp hạng Top 10
- `GET /api/rankings/:id` - Chi tiết bảng xếp hạng
- `POST /api/rankings` - Tạo bảng xếp hạng
- `PATCH /api/rankings/:id` - Cập nhật bảng xếp hạng
- `DELETE /api/rankings/:id` - Xóa bảng xếp hạng

### 2.4 Comparisons (`/api/comparisons`)
- `GET /api/comparisons` - Danh sách so sánh đối đầu
- `GET /api/comparisons/:id` - Chi tiết so sánh
- `POST /api/comparisons` - Tạo bài so sánh
- `PATCH /api/comparisons/:id` - Cập nhật so sánh
- `DELETE /api/comparisons/:id` - Xóa so sánh

### 2.5 Articles (`/api/articles`)
- `GET /api/articles` - Danh sách bài viết & cẩm nang
- `GET /api/articles/:id` - Chi tiết bài viết
- `POST /api/articles` - Đăng bài viết mới
- `PATCH /api/articles/:id` - Cập nhật bài viết
- `DELETE /api/articles/:id` - Xóa bài viết

### 2.6 Experts (`/api/experts`)
- `GET /api/experts` - Danh sách chuyên gia
- `GET /api/experts/:id` - Chi tiết chuyên gia
- `POST /api/experts` - Thêm chuyên gia
- `PATCH /api/experts/:id` - Cập nhật thông tin chuyên gia
- `DELETE /api/experts/:id` - Xóa chuyên gia

### 2.7 Leads / Subscriptions (`/api/leads`)
- `POST /api/leads` - Khách gửi form nhận tin / yêu cầu tư vấn (Rate limited & Zod validated)
- `GET /api/leads` - Admin xem danh sách lead
- `PATCH /api/leads/:id` - Admin đổi trạng thái (`new`, `contacted`, `resolved`)
- `DELETE /api/leads/:id` - Admin xóa lead

### 2.8 System Stats & Seed
- `GET /api/stats` - Thống kê số liệu hệ thống cho Dashboard
- `POST /api/seed` - Khôi phục / Seed lại dữ liệu mẫu
- `GET /api/health` - Kiểm tra trạng thái máy chủ

---

## 3. Hướng Dẫn Deploy Render & Vercel

### Deploy Backend lên Render
1. Đẩy code lên GitHub Repository.
2. Đăng nhập vào [Render.com](https://render.com) -> New **Web Service**.
3. Kết nối với repo và thiết lập:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
4. Trong phần **Environment Variables**, thêm:
   - `MONGODB_URI`: `<Chuỗi kết nối MongoDB Atlas>`
   - `CLIENT_URL`: `<URL domain của Frontend trên Vercel>`
   - `PORT`: `10000`

### Deploy Frontend lên Vercel
1. Trong Vercel Dashboard của dự án, vào **Settings** -> **Environment Variables**.
2. Thêm biến:
   - `VITE_API_URL`: `<URL Backend Render>/api` (ví dụ: `https://techreview-backend.onrender.com/api`)
3. Redeploy lại dự án Frontend.
