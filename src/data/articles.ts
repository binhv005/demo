import { Article } from '../types';

export const mockArticles: Article[] = [
  // --- BÀI HƯỚNG DẪN 1: Chọn Nồi chiên không dầu ---
  {
    id: 'art-guide-noi-chien',
    title: 'Hướng Dẫn Toàn Diện Cách Chọn Mua Nồi Chiên Không Dầu Phù Hợp Nhu Cầu Gia Đình',
    slug: 'cach-chon-noi-chien-khong-dau',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'noi-chien',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tổng hợp mọi tiêu chí cốt lõi: dung tích, công suất, chất liệu chống dính, kiểu dáng cửa kính quan sát và ngân sách để bạn chọn được chiếc nồi chiên ưng ý nhất.',
    content: `
### 1. Giới thiệu & Bối cảnh

Nồi chiên không dầu (Air Fryer) đã thay đổi thói quen nấu nướng của hàng triệu gia đình Việt Nam. Bằng cách sử dụng dòng khí nóng luân chuyển tốc độ cao, thiết bị này tạo ra lớp vỏ giòn rụm cho món ăn mà không cần dùng đến lượng dầu mỡ lớn.

Tuy nhiên, với hàng trăm mẫu mã từ vài trăm nghìn đến cả chục triệu đồng, việc chọn đúng sản phẩm không hề đơn giản. Bài viết này sẽ giúp bạn hiểu rõ từng tiêu chí quan trọng nhất.

---

### 2. Các Tiêu Chí Chọn Mua Quan Trọng

#### 2.1. Dung tích nồi theo số lượng thành viên
- **Dưới 4 Lít**: Phù hợp cho người độc thân hoặc gia đình 2 người.
- **5 Lít đến 7 Lít**: Mức dung tích vàng cho gia đình 4-6 người, đủ để nướng vừa một con gà nguyên con nặng 1.5 - 2kg.
- **Trên 8 Lít hoặc Nồi 2 ngăn**: Dành cho gia đình đông người hoặc người thích nấu đồng thời 2 món ăn khác nhau.

#### 2.2. Công suất & Công nghệ đối lưu nhiệt
Hãy chọn nồi có công suất từ **1500W đến 2000W** cho dung tích 5-6L. Công suất đủ lớn giúp luồng khí nóng đạt nhiệt độ 200°C nhanh chóng, làm săn bề mặt thực phẩm ngay lập tức để giữ độ ẩm ngọt bên trong.

#### 2.3. Chất liệu chống dính & An toàn sức khỏe
Ưu tiên các dòng nồi sử dụng **lớp men gốm Ceramic cao cấp (PTFE/PFOA Free)**. Lớp phủ này chịu được nhiệt độ cao trên 250°C mà không sinh khí độc và có độ bền chống trầy xước cao hơn lớp phủ thông thường.

#### 2.4. Cửa kính quan sát trong suốt
Đây là cải tiến rất đáng tiền trên các dòng nồi đời mới. Bạn có thể theo dõi độ vàng giòn của món ăn qua kính cường lực và đèn chiếu sáng bên trong mà không cần kéo khay làm thất thoát nhiệt độ.

---

### 3. Phân Khúc Ngân Sách

| Phân khúc | Mức giá | Đặc điểm tiêu biểu |
|---|---|---|
| **Cơ bản** | 800.000đ - 1.500.000đ | Điều khiển cơ (núm vặn), lòng nồi chống dính cơ bản, dung tích 4-5L |
| **Tầm trung (Đáng mua nhất)** | 1.800.000đ - 3.200.000đ | Cảm ứng điện tử, cửa kính trong suốt, men Ceramic, quạt đối lưu kép (AirCook Pro 6L) |
| **Cao cấp** | Trên 3.500.000đ | Thiết kế 2 ngăn độc lập Sync Cook, kết nối thông minh Wi-Fi (HomeChef Dual) |

---

### 4. 4 Sai Lầm Thường Gặp Khi Mua Nồi Chiên

1. **Mua dung tích quá nhỏ**: Nhiều người mua nồi 3.5L vì tiết kiệm, nhưng sau đó phải chia thực phẩm chiên làm 2-3 mẻ mất gấp ba thời gian.
2. **Chọn nồi không có quạt đối lưu mạnh**: Khiến thức ăn mặt trên bị cháy nhưng mặt dưới vẫn chưa chín giòn.
3. **Không chú ý đến kích thước ngoài**: Nồi dung tích lớn có thể chiếm nhiều diện tích mặt bếp hẹp.
4. **Dùng miếng cọ sắt chà rửa lòng nồi**: Làm bong tróc lớp chống dính và gây hại cho sức khỏe.

---

### 5. Kết Luận & Khuyến Nghị

Một chiếc nồi chiên không dầu tốt là chiếc nồi có dung tích phù hợp với gia đình, lớp chống dính an toàn và công suất đủ lớn. Nếu bạn đang tìm kiếm sự cân bằng hoàn hảo giữa giá cả và tính năng hiện đại, chúng tôi đặc biệt đề xuất **AirCook Pro 6L Smart Fryer**.
    `,
    tableOfContents: [
      { id: '1-gioi-thieu--boi-canh', title: '1. Giới thiệu & Bối cảnh' },
      { id: '2-cac-tieu-chi-chon-mua-quan-trong', title: '2. Các Tiêu Chí Chọn Mua Quan Trọng' },
      { id: '3-phan-khuc-ngan-sach', title: '3. Phân Khúc Ngân Sách' },
      { id: '4-4-sai-lam-thuong-gap-khi-mua-noi-chien', title: '4. 4 Sai Lầm Thường Gặp' },
      { id: '5-ket-luan--khuyen-nghi', title: '5. Kết Luận & Khuyến Nghị' }
    ],
    authorId: 'expert-1',
    readingTime: '6 phút đọc',
    publishedAt: '05 Tháng 03, 2024',
    relatedProductIds: ['prod-aircook-6l', 'prod-homechef-dual'],
    tags: ['Gia dụng', 'Nồi chiên', 'Cẩm nang mua sắm', 'Đồ bếp'],
    views: 14200,
    status: 'published'
  },

  // --- BÀI HƯỚNG DẪN 2: Chọn Laptop Sinh Viên ---
  {
    id: 'art-guide-laptop',
    title: 'Cẩm Nang Chọn Mua Laptop Sinh Viên 2024: Mỏng Nhẹ, Pin Khỏe, Hiệu Năng Bền Bỉ 4 Năm Đại Học',
    slug: 'kinh-nghiem-chon-laptop-sinh-vien',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'laptop-sinh-vien',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Bí quyết chọn cấu hình CPU, RAM, ổ cứng SSD và màn hình phù hợp theo từng khối ngành: Kinh tế, Kỹ thuật - IT, Thiết kế đồ họa và Y Dược.',
    content: `
### 1. Tổng quan nhu cầu sinh viên 2024

Laptop là khoản đầu tư quan trọng nhất của mỗi tân sinh viên khi bước chân vào giảng đường. Một chiếc laptop tốt cần đáp ứng trọn vẹn việc học tập liên tục trong 4-5 năm mà không bị lỗi thời hay giật lag.

---

### 2. Cấu Hình Tối Thiểu Khuyên Dùng Cho Từng Ngành Học

#### Khối Kinh Tế, Xã Hội, Luật, Quản Trị:
- **CPU**: Intel Core i5 / Ultra 5 hoặc AMD Ryzen 5 thế hệ mới.
- **RAM**: Tối thiểu 16GB (để mở nhiều tab Excel và Chrome mượt mà).
- **Trọng lượng**: Dưới 1.3kg để tiện mang lên giảng đường mỗi ngày.

#### Khối Công Nghệ Thông Tin (IT, Khoa Học Máy Tính):
- **CPU**: Intel Core Ultra 7 hoặc AMD Ryzen 7 (nhiều nhân luồng).
- **RAM**: 32GB (khuyên dùng để chạy Docker, máy ảo và compile code nhanh).
- **Bàn phím**: Hành trình phím sâu, độ nảy tốt giúp gõ code thoải mái.

#### Khối Thiết Kế Đồ Họa, Kiến Trúc:
- **Màn hình**: Chuẩn màu 100% sRGB hoặc 100% DCI-P3, tấm nền OLED hoặc IPS chất lượng cao.
- **GPU**: Card đồ họa rời NVIDIA RTX series hỗ trợ CUDA render.

---

### 3. Kết luận
Hãy cân nhắc kỹ ngành học và ngân sách trước khi xuống tiền. Lựa chọn tiêu biểu hiện tại là **ProBook 14 Ultra OLED** cho trải nghiệm học tập và làm việc xuất sắc.
    `,
    tableOfContents: [
      { id: '1-tong-quan-nhu-cau-sinh-vien-2024', title: '1. Tổng quan nhu cầu sinh viên' },
      { id: '2-cau-hinh-toi-thieu-khuyen-dung-cho-tung-nganh-hoc', title: '2. Cấu Hình Theo Ngành Học' },
      { id: '3-ket-luan', title: '3. Kết luận' }
    ],
    authorId: 'expert-1',
    readingTime: '8 phút đọc',
    publishedAt: '01 Tháng 03, 2024',
    relatedProductIds: ['prod-probook-14'],
    tags: ['Laptop', 'Sinh viên', 'Công nghệ', 'Văn phòng'],
    views: 18900,
    status: 'published'
  },

  // --- BÀI HƯỚNG DẪN 3: Ứng Dụng AI Năng Suất ---
  {
    id: 'art-guide-ai-workflows',
    title: 'Top 10 Phương Pháp Ứng Dụng Trí Tuệ Nhân Tạo (AI) Tự Động Hóa Công Việc 2024',
    slug: 'ung-dung-ai-tu-dong-hoa-cong-viec',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'tro-ly-ai',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Hướng dẫn từng bước kết hợp ChatGPT, Claude và các công cụ Automation để tiết kiệm 15 giờ làm việc mỗi tuần cho dân văn phòng.',
    content: `
### 1. Cuộc Cách Mạng Tự Động Hóa Cá Nhân

Sự bùng nổ của các mô hình ngôn ngữ lớn (LLM) đã mở ra kỷ nguyên mới cho năng suất cá nhân. Thay vì mất hàng giờ xử lý email, tổng hợp tài liệu hay viết báo cáo định kỳ, bạn hoàn toàn có thể tự động hóa 80% khối lượng công việc này.

---

### 2. Các Bước Thiết Lập Quy Trình Tự Động

- **Bước 1: Chuẩn hóa Prompt System**: Xây dựng bộ ngữ cảnh chuẩn cho vai trò và phong cách làm việc.
- **Bước 2: Tích hợp API qua Make/Zapier**: Đồng bộ hóa dữ liệu giữa bảng tính Notion/Google Sheets và trợ lý AI.
- **Bước 3: Tận dụng Custom GPTs & Claude Projects**: Đào tạo AI theo kho tài liệu nội bộ riêng của doanh nghiệp.

---

### 3. Kết luận
Tự động hóa với AI không làm mất đi vai trò của con người, mà nâng tầm bạn trở thành người điều phối quy trình thông minh và hiệu quả hơn.
    `,
    tableOfContents: [
      { id: '1-cuoc-cach-mang-tu-dong-hoa-ca-nhan', title: '1. Cuộc Cách Mạng Tự Động Hóa' },
      { id: '2-cac-buoc-thiet-lap-quy-trinh-tu-dong', title: '2. Các Bước Thiết Lập' },
      { id: '3-ket-luan', title: '3. Kết luận' }
    ],
    authorId: 'expert-2',
    readingTime: '5 phút đọc',
    publishedAt: '14 Tháng 03, 2024',
    relatedProductIds: ['prod-chatgpt-plus', 'prod-claude-sonnet'],
    tags: ['AI', 'Năng suất', 'Tự động hóa', 'Phần mềm'],
    views: 22400,
    status: 'published'
  },

  // --- BÀI HƯỚNG DẪN 4: Ghế Công Thái Học ---
  {
    id: 'art-guide-ergonomic',
    title: 'Kinh Nghiệm Chọn Ghế Công Thái Học & Bàn Nâng Hạ Chống Đau Mỏi Cột Sống',
    slug: 'kinh-nghiem-chon-ghe-cong-thai-hoc',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'ban-ghe-cong-thai-hoc',
    coverImage: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tìm hiểu các tiêu chí công thái học chuẩn chỉnh: đệm thắt lưng 3D, tay vịn 4D, góc ngả lưng và chất liệu lưới thông thoáng khí cho người ngồi làm việc 8+ tiếng.',
    content: `
### 1. Tầm quan trọng của góc ngồi chuẩn y khoa

Ngồi sai tư thế liên tục 8 tiếng mỗi ngày là nguyên nhân hàng đầu gây thoái hóa đốt sống cổ và thoát vị đĩa đệm. Đầu tư một chiếc ghế công thái học đạt chuẩn là quyết định bảo vệ sức khỏe dài hạn quan trọng nhất.
    `,
    tableOfContents: [
      { id: '1-tam-quan-trong', title: '1. Tầm quan trọng của tư thế ngồi' }
    ],
    authorId: 'expert-1',
    readingTime: '7 phút đọc',
    publishedAt: '11 Tháng 03, 2024',
    relatedProductIds: [],
    tags: ['Gia dụng', 'Nội thất', 'Công thái học', 'Sức khỏe'],
    views: 12100,
    status: 'published'
  }
];
