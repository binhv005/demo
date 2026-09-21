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
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
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
    views: 34200,
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
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
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
  },

  // --- BÀI 5: Robot Hút Bụi ---
  {
    id: 'art-guide-robot-hut-bui',
    title: 'Kinh Nghiệm Chọn Robot Hút Bụi Lau Nhà Tự Động Tránh Mua Phải Hàng Kém Chất Lượng',
    slug: 'kinh-nghiem-chon-robot-hut-bui-lau-nha',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'robot-hut-bui',
    coverImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Hướng dẫn chọn robot hút bụi có trạm giặt sấy giẻ tự động, cảm biến LiDAR tránh chướng ngại vật thông minh và lực hút tối thiểu 5000Pa.',
    content: 'Chi tiết hướng dẫn cách chọn robot hút bụi...',
    tableOfContents: [{ id: '1-tieu-chi', title: '1. Tiêu chí lựa chọn' }],
    authorId: 'expert-1',
    readingTime: '6 phút đọc',
    publishedAt: '18 Tháng 03, 2024',
    tags: ['Gia dụng thông minh', 'Robot hút bụi', 'Tiện ích'],
    views: 29800,
    status: 'published'
  },

  // --- BÀI 6: Máy Lọc Không Khí ---
  {
    id: 'art-guide-may-loc-khong-khi',
    title: 'Hướng Dẫn Chọn Máy Lọc Không Khí Chuẩn Màng Lọc HEPA H13 Cho Phòng Ngủ & Trẻ Nhỏ',
    slug: 'huong-dan-chon-may-loc-khong-khi-hepa',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'may-loc-khong-khi',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Đánh giá chỉ số CADR, diện tích phòng phù hợp và cách nhận biết màng lọc HEPA thật để khử bụi mịn PM2.5, phấn hoa và mùi hôi hiệu quả.',
    content: 'Chi tiết hướng dẫn máy lọc không khí...',
    tableOfContents: [{ id: '1-cadr', title: '1. Chỉ số CADR và diện tích' }],
    authorId: 'expert-1',
    readingTime: '5 phút đọc',
    publishedAt: '16 Tháng 03, 2024',
    tags: ['Sức khỏe', 'Gia dụng', 'Bụi mịn'],
    views: 27600,
    status: 'published'
  },

  // --- BÀI 7: Màn Hình Đồ Họa ---
  {
    id: 'art-guide-man-hinh-do-hoa',
    title: 'Top Tiêu Chí Chọn Màn Hình Đồ Họa 4K Chuẩn Màu 100% sRGB & DCI-P3 Cho Designer',
    slug: 'tieu-chi-chon-man-hinh-do-hoa-chuan-mau',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'man-hinh-may-tinh',
    coverImage: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Phân biệt tấm nền IPS Black, độ lệch màu Delta E < 2, chuẩn kết nối Thunderbolt và cổng sạc Type-C 90W cho người làm sáng tạo nội dung chuyên nghiệp.',
    content: 'Chi tiết hướng dẫn màn hình đồ họa...',
    tableOfContents: [{ id: '1-do-lech-mau', title: '1. Độ lệch màu Delta E' }],
    authorId: 'expert-2',
    readingTime: '8 phút đọc',
    publishedAt: '12 Tháng 03, 2024',
    tags: ['Đồ họa', 'Màn hình', 'Công nghệ'],
    views: 21300,
    status: 'published'
  },

  // --- BÀI 8: Bàn Phím Cơ Custom ---
  {
    id: 'art-guide-ban-phim-co',
    title: 'Cẩm Nang Chọn Bàn Phím Cơ Custom Dành Cho Lập Trình Viên & Dân Gõ Văn Bản Hàng Ngày',
    slug: 'cam-nang-chon-ban-phim-co-custom',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'ban-phim-co',
    coverImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tất tần tật về layout 75% vs TKL, Switch Linear vs Tactile, cấu trúc Gasket Mount và Foam tiêu âm giúp tăng tốc độ gõ phím mà không gây mỏi ngón tay.',
    content: 'Chi tiết hướng dẫn bàn phím cơ...',
    tableOfContents: [{ id: '1-switch', title: '1. Chọn loại Switch' }],
    authorId: 'expert-2',
    readingTime: '6 phút đọc',
    publishedAt: '09 Tháng 03, 2024',
    tags: ['Setup', 'Bàn phím cơ', 'Lập trình'],
    views: 19500,
    status: 'published'
  },

  // --- BÀI 9: Tai Nghe Chống Ồn ANC ---
  {
    id: 'art-guide-tainghe-chongon',
    title: 'Đánh Giá & Hướng Dẫn Chọn Mua Tai Nghe Chống Ồn Chủ Động ANC Tốt Nhất 2024',
    slug: 'huong-dan-chon-tai-nghe-chong-on-anc',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'tai-nghe-bluetooth',
    coverImage: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'So sánh thuật toán chống ồn giữa Sony, Bose và Apple. Tiêu chí chọn tai nghe Over-ear vs In-ear cho người thường xuyên làm việc tại quán cafe hoặc di chuyển máy bay.',
    content: 'Chi tiết tai nghe chống ồn...',
    tableOfContents: [{ id: '1-anc', title: '1. Công nghệ chống ồn ANC' }],
    authorId: 'expert-2',
    readingTime: '7 phút đọc',
    publishedAt: '05 Tháng 03, 2024',
    tags: ['Âm thanh', 'Tai nghe', 'ANC'],
    views: 17400,
    status: 'published'
  },

  // --- BÀI 10: Dịch Vụ VPN & Bảo Mật Số ---
  {
    id: 'art-guide-vpn-baomat',
    title: 'Bảo Vệ Quyền Riêng Tư Số: Tiêu Chí Lựa Chọn Dịch Vụ VPN Đáng Tin Cậy Cho Cá Nhân',
    slug: 'tieu-chi-chon-dich-vu-vpn-bao-mat',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'vpn-bao-mat',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Chính sách No-Logs đã kiểm toán độc lập, tốc độ máy chủ WireGuard và tính năng Kill Switch: Những yếu tố sống còn khi mua phần mềm VPN.',
    content: 'Chi tiết hướng dẫn dịch vụ VPN...',
    tableOfContents: [{ id: '1-no-logs', title: '1. Chính sách No-Logs' }],
    authorId: 'expert-2',
    readingTime: '5 phút đọc',
    publishedAt: '01 Tháng 03, 2024',
    tags: ['Bảo mật', 'VPN', 'Sản phẩm số'],
    views: 15200,
    status: 'published'
  },

  // --- BÀI MỚI 1: Top Robot Hút Bụi ---
  {
    id: 'art-top-robot-hut-bui-2024',
    title: 'Top 5 Robot Hút Bụi Lau Nhà Tự Động Giặt Giẻ Đáng Mua Nhất 2024',
    slug: 'top-5-robot-hut-bui-lau-nha-tu-giat-gie-2024',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'robot-hut-bui',
    coverImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tổng hợp đánh giá chi tiết 5 mẫu robot hút bụi có trạm sạc thông minh tự động giặt sấy giẻ bằng nước nóng, lực hút 7000Pa giúp giải phóng hoàn toàn sức lao động.',
    content: `
### 1. Tại sao robot hút bụi có trạm tự giặt giẻ lại trở thành xu hướng?
Các dòng robot đời cũ chỉ biết hút bụi và kéo lê miếng giẻ bẩn khắp nhà khiến vi khuẩn lây lan. Sự xuất hiện của trạm sạc thông minh trang bị bình chứa nước sạch/nước bẩn riêng biệt cùng công nghệ giặt giẻ bằng nước nóng 60°C và sấy khô bằng khí nóng đã giải quyết triệt để rào cản này.

---

### 2. Tiêu chí chọn mua robot lau nhà cao cấp
- **Lực hút tối thiểu:** Nên từ 5000Pa đến 7000Pa để hút sạch bụi mịn nằm sâu dưới khe gạch và thảm.
- **Công nghệ định vị:** Cảm biến LiDAR 3D kết hợp camera AI giúp nhận diện dây điện, dép và đồ chơi trẻ em mà không bị kẹt.
- **Trạm sạc đa năng:** Tự động gom bụi vào túi chứa kín và tự giặt sấy giẻ để tránh mùi ẩm mốc.
    `,
    tableOfContents: [
      { id: '1-tai-sao-robot-tu-giat-gie-tro-thanh-xu-huong', title: '1. Xu hướng robot tự giặt giẻ' },
      { id: '2-tieu-chi-chon-mua-robot-lau-nha-cao-cap', title: '2. Tiêu chí chọn mua cao cấp' }
    ],
    authorId: 'expert-1',
    readingTime: '7 phút đọc',
    publishedAt: '20 Tháng 03, 2024',
    relatedProductIds: ['prod-roboclean-x10'],
    tags: ['Gia dụng', 'Robot hút bụi', 'Công nghệ nhà thông minh'],
    views: 31200,
    status: 'published',
    isFeatured: true
  },

  // --- BÀI MỚI 2: Đánh Giá Sony WH-1000XM5 ---
  {
    id: 'art-review-sony-wh1000xm5',
    title: 'Đánh Giá Chi Tiết Tai Nghe Sony WH-1000XM5: Vua Chống Ồn Thế Hệ Mới Có Thật Sự Đáng Tiền?',
    slug: 'danh-gia-chi-tiet-sony-wh-1000xm5',
    type: 'review',
    productType: 'physical',
    categorySlug: 'tai-nghe-chong-on',
    coverImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Thử nghiệm thực tế khả năng triệt tiêu tiếng ồn trên chuyến bay 8 tiếng và chất âm Hi-Res Audio Wireless của Sony WH-1000XM5 sau 30 ngày sử dụng liên tục.',
    content: `
### 1. Thiết kế mới tối giản và êm ái
Sony WH-1000XM5 từ bỏ kiểu dáng gập truyền thống để chuyển sang ngôn ngữ thiết kế "Seamless Design" thanh lịch với chất liệu da tổng hợp mềm mại Fit Leather, giảm áp lực tối đa lên đỉnh đầu khi đeo lâu.

---

### 2. Trải nghiệm chống ồn ANC đỉnh cao
Nhờ 8 micro đo tiếng ồn xung quanh cùng bộ xử lý V1 và QN1 kết hợp, XM5 lọc sạch tiếng động cơ máy bay và tiếng đàm thoại văn phòng mượt mà chưa từng thấy.
    `,
    tableOfContents: [
      { id: '1-thiet-ke-moi-toi-gian', title: '1. Thiết kế mới tối giản' },
      { id: '2-trai-nghiem-chong-on-anc', title: '2. Trải nghiệm chống ồn ANC' }
    ],
    authorId: 'expert-2',
    readingTime: '8 phút đọc',
    publishedAt: '19 Tháng 03, 2024',
    relatedProductIds: ['prod-sony-wh1000xm5'],
    tags: ['Âm thanh', 'Tai nghe chống ồn', 'Sony', 'Công nghệ'],
    views: 28400,
    status: 'published'
  },

  // --- BÀI MỚI 3: So Sánh Bếp Từ vs Bếp Hồng Ngoại ---
  {
    id: 'art-compare-bep-tu-bep-hong-ngoai',
    title: 'So Sánh Bếp Từ Đôi Và Bếp Hồng Ngoại: Nên Chọn Loại Nào Cho Gian Bếp Gia Đình?',
    slug: 'so-sanh-bep-tu-doi-va-bep-hong-ngoai',
    type: 'comparison',
    productType: 'physical',
    categorySlug: 'bep-tu',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Phân tích chi tiết hiệu suất đun nấu, mức độ tiêu thụ điện năng, độ an toàn và độ kén nồi giữa bếp từ và bếp hồng ngoại để giúp bạn đưa ra quyết định đúng đắn.',
    content: `
### 1. Nguyên lý hoạt động và hiệu suất
Bếp từ đun nóng trực tiếp đáy nồi qua từ trường nên đạt hiệu suất đến 90%, không tỏa nhiệt thất thoát ra ngoài. Trong khi bếp hồng ngoại sử dụng mâm nhiệt phát bức xạ hồng ngoại đun nóng mặt kính trước khi truyền tới đáy nồi.

---

### 2. Bảng so sánh nhanh
- **Độ an toàn:** Bếp từ nguội nhanh ngay sau khi tắt bếp; Bếp hồng ngoại giữ nhiệt nóng rất lâu dễ gây bỏng.
- **Độ kén nồi:** Bếp từ chỉ dùng nồi đáy từ; Bếp hồng ngoại dùng được tất cả các loại nồi.
    `,
    tableOfContents: [
      { id: '1-nguyen-ly-hoat-dong', title: '1. Nguyên lý hoạt động' },
      { id: '2-bang-so-sanh-nhanh', title: '2. Bảng so sánh nhanh' }
    ],
    authorId: 'expert-1',
    readingTime: '6 phút đọc',
    publishedAt: '17 Tháng 03, 2024',
    relatedProductIds: ['prod-sunhouse-mama-bep-tu'],
    tags: ['Thiết bị nhà bếp', 'Bếp từ', 'Gia dụng'],
    views: 24100,
    status: 'published'
  },

  // --- BÀI MỚI 4: Hướng Dẫn Chọn Balo Laptop ---
  {
    id: 'art-guide-balo-laptop-chong-nuoc',
    title: 'Hướng Dẫn Chọn Balo Laptop Chống Nước Chuẩn Cho Sinh Viên & Dân Công Nghệ',
    slug: 'huong-dan-chon-balo-laptop-chong-nuoc',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'balo-chong-nuoc',
    coverImage: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Những tiêu chí quan trọng khi chọn mua balo: Vải Oxford chống nước, đệm chống sốc 360 độ cho máy tính, khóa kéo TSA chống trộm và quai đeo giảm áp lực vai.',
    content: 'Hướng dẫn chọn mua balo chống nước...',
    tableOfContents: [{ id: '1-chat-lieu-vai', title: '1. Chất liệu vải chống nước' }],
    authorId: 'expert-1',
    readingTime: '5 phút đọc',
    publishedAt: '15 Tháng 03, 2024',
    relatedProductIds: ['prod-mark-ryden-backpack'],
    tags: ['Phụ kiện', 'Balo laptop', 'Thời trang'],
    views: 18900,
    status: 'published'
  },

  // --- BÀI MỚI 5: Đánh Giá Vòng Sức Khỏe Xiaomi ---
  {
    id: 'art-review-xiaomi-band-8-pro',
    title: 'Đánh Giá Chi Tiết Xiaomi Smart Band 8 Pro: Vòng Đeo Tay Thể Thao Đáng Tiền Nhất',
    slug: 'danh-gia-chi-tiet-xiaomi-smart-band-8-pro',
    type: 'review',
    productType: 'physical',
    categorySlug: 'dong-ho-suc-khoe',
    coverImage: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Màn hình AMOLED 60Hz rực rỡ, tích hợp GPS độc lập và thời lượng pin 14 ngày giúp Xiaomi Band 8 Pro trở thành lựa chọn vô dịch phân khúc 1.5 triệu.',
    content: 'Đánh giá vòng đeo tay sức khỏe Xiaomi...',
    tableOfContents: [{ id: '1-man-hinh', title: '1. Màn hình AMOLED 60Hz' }],
    authorId: 'expert-1',
    readingTime: '6 phút đọc',
    publishedAt: '14 Tháng 03, 2024',
    relatedProductIds: ['prod-xiaomi-band-8-pro'],
    tags: ['Sức khỏe', 'Xiaomi', 'Vòng đeo tay thông minh'],
    views: 22300,
    status: 'published'
  },

  // --- BÀI MỚI 6: Top Công Cụ AI Trợ Lý Lập Trình ---
  {
    id: 'art-top-ai-coding-tools-2024',
    title: 'Top 7 Công Cụ AI Trợ Lý Lập Trình Giúp Tăng 300% Năng Suất Viết Code Năm 2024',
    slug: 'top-7-cong-cu-ai-tro-ly-lap-trinh-2024',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-code',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Điểm danh các trợ lý AI viết code hàng đầu: GitHub Copilot, Claude 3.5 Sonnet, Cursor IDE, Tabnine và Supermaven giúp giải quyết nhanh bug và tự động viết unit test.',
    content: `
### 1. Cuộc cách mạng AI trong ngành phần mềm
AI không còn dừng lại ở việc gõ nốt đoạn code ngắn mà đã phát triển thành trợ lý ảo hiểu toàn bộ kiến trúc dự án, tự động giải thích lệnh phức tạp và tự tạo Pull Request.

---

### 2. Các công cụ AI viết code đỉnh nhất
- **GitHub Copilot Enterprise:** Chuẩn mực trợ lý AI cho doanh nghiệp tích hợp sâu vào VS Code và GitHub.
- **Cursor IDE:** Trình soạn thảo tích hợp AI gốc cho phép hỏi đáp và tự refactor code trên toàn bộ thư mục dự án.
    `,
    tableOfContents: [
      { id: '1-cuoc-cach-mang-ai', title: '1. Cuộc cách mạng AI trong phần mềm' },
      { id: '2-cac-cong-cu-ai-dinh-nhat', title: '2. Các công cụ AI viết code' }
    ],
    authorId: 'expert-2',
    readingTime: '8 phút đọc',
    publishedAt: '21 Tháng 03, 2024',
    relatedProductIds: ['prod-github-copilot-enterprise'],
    tags: ['AI', 'Lập trình', 'GitHub Copilot', 'Sản phẩm số'],
    views: 35600,
    status: 'published',
    isFeatured: true
  },

  // --- BÀI MỚI 7: Đánh Giá Perplexity Pro ---
  {
    id: 'art-review-perplexity-pro-ai',
    title: 'Đánh Giá Perplexity Pro: Công Cụ Tìm Kiếm AI Có Thể Thay Thế Hoàn Toàn Google Search?',
    slug: 'danh-gia-chi-tiet-perplexity-pro-ai',
    type: 'review',
    productType: 'digital',
    categorySlug: 'tro-ly-ai',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Khám phá lý do tại sao Perplexity Pro với tính năng Pro Search và trích dẫn nguồn dẫn tin cậy đang trở thành sự lựa chọn hàng đầu của giới nghiên cứu.',
    content: 'Đánh giá chi tiết công cụ tìm kiếm Perplexity AI...',
    tableOfContents: [{ id: '1-tinh-nang-pro-search', title: '1. Tính năng Pro Search' }],
    authorId: 'expert-2',
    readingTime: '7 phút đọc',
    publishedAt: '20 Tháng 03, 2024',
    relatedProductIds: ['prod-perplexity-pro'],
    tags: ['AI', 'Perplexity', 'Tìm kiếm', 'Sản phẩm số'],
    views: 33800,
    status: 'published'
  },

  // --- BÀI MỚI 8: So Sánh ChatGPT Plus vs Claude vs Perplexity ---
  {
    id: 'art-compare-chatgpt-claude-perplexity',
    title: 'So Sánh Chi Tiết ChatGPT Plus vs Claude 3.5 Sonnet vs Perplexity Pro 2024',
    slug: 'so-sanh-chatgpt-plus-vs-claude-35-vs-perplexity-pro',
    type: 'comparison',
    productType: 'digital',
    categorySlug: 'tro-ly-ai',
    coverImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'So sánh đối đầu 3 siêu mô hình AI hàng đầu thế giới ở 4 tiêu chí: Khả năng lập trình, tư duy suy luận, tìm kiếm thời gian thực và sáng tạo nội dung.',
    content: 'So sánh đối đầu 3 mô hình AI lớn nhất...',
    tableOfContents: [{ id: '1-bo-tieu-chi-so-sanh', title: '1. Bộ tiêu chí so sánh' }],
    authorId: 'expert-2',
    readingTime: '9 phút đọc',
    publishedAt: '18 Tháng 03, 2024',
    relatedProductIds: ['prod-perplexity-pro'],
    tags: ['AI', 'ChatGPT', 'Claude', 'Perplexity', 'So sánh'],
    views: 39100,
    status: 'published',
    isTopRanking: true
  },

  // --- BÀI MỚI 9: Cẩm Nang ElevenLabs Sinh Giọng Nói ---
  {
    id: 'art-guide-elevenlabs-ai-voice',
    title: 'Cẩm Nang Sử Dụng ElevenLabs Sinh Giọng Nói AI Chuẩn Như Người Thật Cho Video TikTok & YouTube',
    slug: 'cam-nang-su-dung-elevenlabs-ai-voice',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-media',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Hướng dẫn từ A-Z cách tạo giọng đọc truyền cảm, tùy chỉnh tốc độ ngắt nghỉ và nhân bản giọng đọc cá nhân bằng công nghệ ElevenLabs Prime Voice.',
    content: 'Cẩm nang hướng dẫn sử dụng ElevenLabs AI...',
    tableOfContents: [{ id: '1-voice-cloning', title: '1. Tính năng Voice Cloning' }],
    authorId: 'expert-2',
    readingTime: '6 phút đọc',
    publishedAt: '16 Tháng 03, 2024',
    relatedProductIds: ['prod-elevenlabs-ai-voice'],
    tags: ['AI Media', 'ElevenLabs', 'Giọng nói AI', 'Sáng tạo nội dung'],
    views: 25400,
    status: 'published'
  },

  // --- BÀI MỚI 10: Bí Quyết Sử Dụng Midjourney v6 ---
  {
    id: 'art-guide-midjourney-v6-prompting',
    title: 'Bí Quyết Viết Prompt Midjourney v6 Để Thiết Kế Hình Ảnh & Banner Đồ Họa Đỉnh Cao',
    slug: 'bi-quyet-viet-prompt-midjourney-v6',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-media',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tổng hợp 20+ cấu trúc prompt chuẩn chuyên gia cho Midjourney v6: Điều chỉnh góc máy, ánh sáng cinematic, tham chiếu phong cách Style Reference và chèn văn bản.',
    content: 'Chi tiết hướng dẫn viết prompt Midjourney v6...',
    tableOfContents: [{ id: '1-cau-truc-prompt-v6', title: '1. Cấu trúc prompt v6 chuẩn' }],
    authorId: 'expert-2',
    readingTime: '7 phút đọc',
    publishedAt: '15 Tháng 03, 2024',
    relatedProductIds: ['prod-midjourney-v6'],
    tags: ['AI Art', 'Midjourney', 'Thiết kế', 'Prompt Engineering'],
    views: 31800,
    status: 'published'
  }
];
