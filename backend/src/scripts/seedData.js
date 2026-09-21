const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');
const Ranking = require('../models/Ranking');
const Comparison = require('../models/Comparison');
const Article = require('../models/Article');
const Expert = require('../models/Expert');
const Lead = require('../models/Lead');

const sampleCategories = [
  // --- SẢN PHẨM VẬT LÝ ---
  {
    name: 'Gia dụng',
    slug: 'gia-dung',
    group: 'physical',
    groupSlug: 'gia-dung',
    icon: 'Utensils',
    description: 'Thiết bị nhà bếp thông minh, thiết bị làm sạch gia đình và nâng cao chất lượng cuộc sống.',
    count: 38,
    subcategories: [
      { name: 'Nồi chiên không dầu', slug: 'noi-chien', count: 38 },
      { name: 'Robot hút bụi', slug: 'robot-hut-bui', count: 42 },
      { name: 'Máy lọc không khí', slug: 'may-loc-khong-khi', count: 32 },
      { name: 'Máy pha cà phê', slug: 'may-pha-ca-phe', count: 30 }
    ],
    featuredRankingSlug: 'noi-chien-khong-dau',
    status: 'active'
  },
  {
    name: 'Điện tử & Công nghệ',
    slug: 'dien-tu',
    group: 'physical',
    groupSlug: 'dien-tu',
    icon: 'Laptop',
    description: 'Laptop làm việc, máy tính học sinh sinh viên, tai nghe chống ồn và phụ kiện công nghệ cao.',
    count: 54,
    subcategories: [
      { name: 'Laptop sinh viên & văn phòng', slug: 'laptop-sinh-vien', count: 54 },
      { name: 'Tai nghe chống ồn', slug: 'tai-nghe-chong-on', count: 46 },
      { name: 'Màn hình công thái học', slug: 'man-hinh', count: 35 },
      { name: 'Bàn phím cơ', slug: 'ban-phim-co', count: 50 }
    ],
    featuredRankingSlug: 'laptop-sinh-vien',
    status: 'active'
  },
  {
    name: 'Sức khỏe & Đời sống',
    slug: 'suc-khoe',
    group: 'physical',
    groupSlug: 'suc-khoe',
    icon: 'HeartPulse',
    description: 'Thiết bị chăm sóc sức khỏe cá nhân, máy massage và theo dõi chỉ số cơ thể chính xác.',
    count: 24,
    subcategories: [
      { name: 'Đồng hồ theo dõi sức khỏe', slug: 'dong-ho-suc-khoe', count: 34 },
      { name: 'Máy massage cổ vai gáy', slug: 'may-massage', count: 28 },
      { name: 'Cân điện tử thông minh', slug: 'can-dien-tu', count: 20 },
      { name: 'Bàn chải điện', slug: 'ban-chai-dien', count: 14 }
    ],
    status: 'active'
  },
  {
    name: 'Thiết bị nhà bếp',
    slug: 'thiet-bi-nha-bep',
    group: 'physical',
    groupSlug: 'thiet-bi-nha-bep',
    icon: 'Utensils',
    description: 'Bếp từ, máy rửa bát, lò vi sóng và dụng cụ nấu nướng cao cấp chuẩn phòng lab thử nghiệm.',
    count: 18,
    subcategories: [
      { name: 'Bếp từ đôi', slug: 'bep-tu', count: 12 },
      { name: 'Máy rửa bát độc lập', slug: 'may-rua-bat', count: 15 }
    ],
    status: 'active'
  },
  {
    name: 'Thời trang & Phụ kiện',
    slug: 'thoi-trang',
    group: 'physical',
    groupSlug: 'thoi-trang',
    icon: 'ShoppingBag',
    description: 'Balo công nghệ, giày chạy bộ êm chân và phụ kiện thời trang bền bỉ phong cách hiện đại.',
    count: 32,
    subcategories: [
      { name: 'Balo chống nước', slug: 'balo-chong-nuoc', count: 18 },
      { name: 'Giày chạy bộ', slug: 'giay-chay-bo', count: 22 }
    ],
    status: 'active'
  },
  {
    name: 'Mẹ & Bé',
    slug: 'me-va-be',
    group: 'physical',
    groupSlug: 'me-va-be',
    icon: 'Baby',
    description: 'Các sản phẩm an toàn chuẩn y tế cho mẹ bầu và chăm sóc bé yêu thông minh.',
    count: 26,
    subcategories: [
      { name: 'Máy tiệt trùng bình sữa', slug: 'may-tiet-trung', count: 14 },
      { name: 'Xe đẩy gấp gọn', slug: 'xe-day', count: 16 }
    ],
    status: 'active'
  },

  // --- SẢN PHẨM SỐ ---
  {
    name: 'Trí tuệ nhân tạo (AI Tools)',
    slug: 'ai-tools',
    group: 'digital',
    groupSlug: 'ai',
    icon: 'Sparkles',
    description: 'Mô hình ngôn ngữ lớn (LLM), AI tạo ảnh, trợ lý viết code và tự động hóa công việc sáng tạo.',
    count: 42,
    subcategories: [
      { name: 'Mô hình AI đa năng (LLM)', slug: 'ai-chat', count: 18 },
      { name: 'AI tạo hình ảnh & video', slug: 'ai-media', count: 14 },
      { name: 'AI hỗ trợ lập trình', slug: 'ai-code', count: 10 }
    ],
    featuredRankingSlug: 'top-ai-viet-code',
    status: 'active'
  },
  {
    name: 'Phần mềm & Năng suất',
    slug: 'phan-mem',
    group: 'digital',
    groupSlug: 'phan-mem',
    icon: 'Layers',
    description: 'Ứng dụng quản lý dự án, ghi chú kiến thức cá nhân, VPN bảo mật và thiết kế đồ họa.',
    count: 36,
    subcategories: [
      { name: 'Quản lý công việc & Ghi chú', slug: 'ghi-chu-quan-ly', count: 15 },
      { name: 'VPN & Bảo mật', slug: 'vpn-bao-mat', count: 11 },
      { name: 'Thiết kế đồ họa online', slug: 'thiet-ke-do-hoa', count: 10 }
    ],
    status: 'active'
  },
  {
    name: 'Hosting & Server',
    slug: 'hosting',
    group: 'digital',
    groupSlug: 'hosting',
    icon: 'Server',
    description: 'Dịch vụ lưu trữ web tốc độ cao, Cloud VPS, Managed WordPress và tên miền uy tín.',
    count: 28,
    subcategories: [
      { name: 'Managed WordPress Hosting', slug: 'wp-hosting', count: 14 },
      { name: 'Cloud VPS giá rẻ', slug: 'cloud-vps', count: 14 }
    ],
    status: 'active'
  },
  {
    name: 'VPN & Bảo mật',
    slug: 'vpn',
    group: 'digital',
    groupSlug: 'vpn',
    icon: 'ShieldCheck',
    description: 'Mạng riêng ảo tốc độ cao, trình quản lý mật khẩu an toàn và phần mềm chống virus hàng đầu.',
    count: 22,
    subcategories: [
      { name: 'VPN Tốc độ cao', slug: 'vpn-toc-do-cao', count: 12 },
      { name: 'Trình quản lý mật khẩu', slug: 'password-manager', count: 10 }
    ],
    status: 'active'
  },
  {
    name: 'Marketing & SEO',
    slug: 'marketing',
    group: 'digital',
    groupSlug: 'marketing',
    icon: 'TrendingUp',
    description: 'Bộ công cụ phân tích từ khóa, theo dõi đối thủ, gửi email marketing tự động hóa.',
    count: 25,
    subcategories: [
      { name: 'Công cụ nghiên cứu SEO', slug: 'seo-tools', count: 15 }
    ],
    status: 'active'
  },
  {
    name: 'Khóa học & Nền tảng học tập',
    slug: 'khoa-hoc',
    group: 'digital',
    groupSlug: 'khoa-hoc',
    icon: 'GraduationCap',
    description: 'Các khóa học trực tuyến thực chiến về lập trình, thiết kế, kỹ năng số và ngoại ngữ.',
    count: 30,
    subcategories: [
      { name: 'Khóa học Lập trình Web', slug: 'hoc-lap-trinh', count: 18 }
    ],
    status: 'active'
  }
];

const sampleExperts = [
  {
    name: 'TS. Nguyễn Văn Minh',
    role: 'Trưởng ban Đánh giá Thiết bị Điện tử & AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Tiến sĩ Khoa học Máy tính với hơn 12 năm kinh nghiệm nghiên cứu AI và thử nghiệm thiết bị phần cứng tại các viện công nghệ hàng đầu.',
    articlesCount: 48,
    experienceYears: 12,
    credentials: ['Tiến sĩ KHMT Đại học Bách Khoa', 'Chứng chỉ Chuyên gia Thử nghiệm IEEE', '12 năm Nghiên cứu R&D']
  },
  {
    name: 'ThS. Lê Hoàng Yến',
    role: 'Chuyên gia Trưởng Đánh giá Thiết bị Gia dụng',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Kỹ sư Hóa - Thực phẩm với hơn 8 năm phụ trách phòng lab thử nghiệm thiết bị gia dụng và an toàn thiết bị nhà bếp.',
    articlesCount: 36,
    experienceYears: 8,
    credentials: ['Thạc sĩ Công nghệ Thực phẩm', 'Thành viên Hiệp hội Thiết bị Gia dụng VN', '8 năm Kiểm nghiệm Lab']
  },
  {
    name: 'KTS. Trần Bảo Lâm',
    role: 'Chuyên gia Đánh giá Phần mềm & Công cụ Số',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Kiến trúc sư giải pháp phần mềm độc lập, chuyên phân tích hiệu năng, bảo mật và tính khả dụng của các công cụ SaaS & AI.',
    articlesCount: 52,
    experienceYears: 10,
    credentials: ['AWS Certified Solutions Architect', '10 năm Tư vấn Chuyển đổi Số', 'Cố vấn Công nghệ TechReview']
  }
];

const sampleProducts = [
  {
    name: 'Philips XXL HD9650/90 - Nồi Chiên Không Dầu Cao Cấp',
    slug: 'philips-xxl-hd9650',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Philips',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 528,
    price: 6490000,
    originalPrice: 8990000,
    priceUnit: '₫',
    pros: ['Công nghệ Twin TurboStar tách đến 90% dầu mỡ thừa', 'Dung tích cực lớn 1.4kg nướng gà nguyên con dễ dàng', 'Nhiệt độ đối lưu cực kỳ đồng đều, không cần lật trở'],
    cons: ['Kích thước và trọng lượng khá nặng (khoảng 8kg)', 'Giá thành cao hơn mặt bằng chung', 'Không có kính quan sát bên trong'],
    bestFor: 'Gia đình 4-6 người cần thiết bị cao cấp, tách dầu mỡ triệt để nhất.',
    shortDescription: 'Nồi chiên không dầu công suất 2225W với công nghệ lọc mỡ độc quyền Twin TurboStar, chuẩn mực vàng cho bữa ăn gia đình lành mạnh.',
    deepReview: 'Sau hơn 60 ngày thử nghiệm liên tục tại Lab TechReview với hơn 120 món ăn khác nhau, Philips HD9650 chứng minh vị thế vượt trội về độ giòn đều và khả năng tách dầu mỡ thực tế.',
    specs: {
      'Dung tích': '7.3 Lít (chứa 1.4kg thực phẩm)',
      'Công suất': '2225 W',
      'Công nghệ nhiệt': 'Twin TurboStar Rapid Air',
      'Bảng điều khiển': 'Điện tử QuickControl + Núm xoay',
      'Trọng lượng': '8.1 kg'
    },
    scoreBreakdown: { design: 9.4, performance: 9.8, value: 9.2, usability: 9.7 },
    badge: 'Tốt Nhất Tổng Thể',
    status: 'published',
    views: 3420
  },
  {
    name: 'Cosori Dual Blaze 6.4L - Nồi Chiên Nhiệt Đôi 360 ThermoIQ',
    slug: 'cosori-dual-blaze-6-4l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Cosori',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 412,
    price: 3890000,
    originalPrice: 4990000,
    priceUnit: '₫',
    pros: ['Hai thanh nhiệt trên - dưới độc lập, không cần lật thức ăn', 'Kết nối thông minh qua Wi-Fi điều khiển trên smartphone', 'Lớp chống dính cao cấp dễ vệ sinh máy rửa chén'],
    cons: ['Ứng dụng đôi khi kết nối chậm khi mạng yếu', 'Mặt điều khiển dễ bám dấu vân tay'],
    bestFor: 'Người bận rộn thích sự tiện lợi và muốn nấu ăn chính xác bằng smartphone.',
    shortDescription: 'Nồi chiên thông minh hai thanh nhiệt 360 ThermoIQ dung tích 6.4L cho hiệu suất nướng nhanh hơn 30%.',
    deepReview: 'Cosori Dual Blaze mang lại sự đột phá nhờ 2 nguồn nhiệt trên và dưới, giúp thực phẩm chín vàng đều 2 mặt mà không phải mở lồng để đảo giữa chừng.',
    specs: {
      'Dung tích': '6.4 Lít',
      'Công suất': '1700 W',
      'Công nghệ': '360 ThermoIQ Dual Element',
      'Kết nối': 'Wi-Fi qua App VeSync',
      'Trọng lượng': '5.22 kg'
    },
    scoreBreakdown: { design: 9.5, performance: 9.4, value: 9.6, usability: 9.3 },
    badge: 'Đáng Mua Nhất',
    status: 'published',
    views: 2840
  },
  {
    name: 'MacBook Air M3 (13.6 inch - 16GB / 256GB SSD)',
    slug: 'macbook-air-m3-13',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'laptop-sinh-vien',
    groupSlug: 'dien-tu',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    score: 9.7,
    ratingCount: 890,
    price: 27990000,
    originalPrice: 29990000,
    priceUnit: '₫',
    pros: ['Hiệu năng chip M3 cực kỳ mạnh mẽ, vận hành hoàn toàn không quạt êm ái', 'Thời lượng pin thực tế ấn tượng lên đến 16-18 tiếng', 'Màn hình Liquid Retina 500 nits sắc nét tuyệt đẹp'],
    cons: ['Giá nâng cấp SSD và RAM chính hãng khá đắt', 'Chỉ hỗ trợ tối đa 2 màn hình ngoài khi gập máy'],
    bestFor: 'Sinh viên, lập trình viên và nhân viên văn phòng cần máy mỏng nhẹ pin trâu.',
    shortDescription: 'Laptop siêu nhẹ 1.24kg trang bị chip Apple M3 8 nhân CPU và 10 nhân GPU, hoàn hảo cho cả ngày làm việc.',
    deepReview: 'MacBook Air M3 là chuẩn mực laptop di động cao cấp với thiết kế unibody nhôm chắc chắn, thời lượng pin cả ngày không cần cắm sạc.',
    specs: {
      'Vi xử lý': 'Apple M3 8-core CPU / 10-core GPU',
      'RAM': '16 GB Unified Memory',
      'Bộ nhớ': '256 GB SSD',
      'Màn hình': '13.6 inch Liquid Retina IPS 500 nits',
      'Trọng lượng': '1.24 kg'
    },
    scoreBreakdown: { design: 9.9, performance: 9.7, value: 9.3, usability: 9.9 },
    badge: 'Lựa Chọn Vàng',
    status: 'published',
    views: 6510
  },
  {
    name: 'Claude 3.5 Sonnet (Anthropic Pro Plan)',
    slug: 'claude-3-5-sonnet',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-chat',
    groupSlug: 'ai',
    brand: 'Anthropic',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    score: 9.8,
    ratingCount: 1420,
    price: 490000,
    originalPrice: 550000,
    priceUnit: '₫/tháng',
    pros: ['Khả năng lập trình và suy luận logic vượt trội so với các đối thủ', 'Tính năng Artifacts xem trước UI và code thời gian thực tương tác', 'Văn phong tự nhiên, thấu hiểu ngữ cảnh tiếng Việt xuất sắc'],
    cons: ['Giới hạn số lượng tin nhắn trong 5 giờ đối với phiên bản tải cao', 'Chưa có tính năng duyệt web trực tiếp theo thời gian thực'],
    bestFor: 'Lập trình viên, kỹ sư phần mềm, nhà nghiên cứu và người làm nội dung chuyên sâu.',
    shortDescription: 'Mô hình AI hàng đầu thế giới về khả năng phân tích logic, viết code, tư duy phản biện và xử lý tài liệu dài 200K token.',
    deepReview: 'Claude 3.5 Sonnet mang đến bước nhảy vọt về trí tuệ xử lý ngữ cảnh dài và hỗ trợ lập trình thông minh nhất hiện nay.',
    specs: {
      'Ngữ cảnh': '200,000 Tokens (~150,000 từ)',
      'Hỗ trợ Code': 'Python, JS/TS, Rust, Go, SQL, HTML/CSS...',
      'Giao diện': 'Web + iOS App + Android App',
      'Tính năng độc quyền': 'Interactive Artifacts Window'
    },
    scoreBreakdown: { design: 9.7, performance: 9.9, value: 9.8, usability: 9.8 },
    badge: 'AI Tốt Nhất 2024',
    status: 'published',
    views: 9240
  },
  {
    name: 'ChatGPT Plus (OpenAI GPT-4o & GPT-o1)',
    slug: 'chatgpt-plus-gpt4o',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-chat',
    groupSlug: 'ai',
    brand: 'OpenAI',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 2310,
    price: 499000,
    originalPrice: 550000,
    priceUnit: '₫/tháng',
    pros: ['Đa phương thức xuất sắc (xử lý hình ảnh, giọng nói, video thời gian thực)', 'Truy cập mô hình suy luận sâu OpenAI o1 cho các bài toán phức tạp', 'Hệ sinh thái Custom GPTs phong phú và tích hợp tìm kiếm Web realtime'],
    cons: ['Văn phong tiếng Việt đôi lúc rập khuôn', 'Khả năng viết code đôi khi thừa code boilerplate'],
    bestFor: 'Người dùng phổ thông, học sinh, sinh viên, giáo viên và sáng tạo nội dung đa phương tiện.',
    shortDescription: 'Gói đăng ký dịch vụ AI toàn diện với mô hình GPT-4o đa phương thức và GPT-o1 suy luận chuỗi tư duy cao cấp.',
    deepReview: 'ChatGPT Plus vẫn là hệ sinh thái AI toàn diện và dễ tiếp cận nhất hiện nay với kho Plugin và khả năng Voice tương tác siêu thực.',
    specs: {
      'Mô hình': 'GPT-4o, GPT-o1 preview, DALL-E 3',
      'Tìm kiếm': 'Web Search Real-time Tích hợp',
      'Phân tích dữ liệu': 'Advanced Data Analysis (Python Code Interpreter)'
    },
    scoreBreakdown: { design: 9.5, performance: 9.6, value: 9.4, usability: 9.6 },
    badge: 'Phổ Biến Nhất',
    status: 'published',
    views: 11400
  },
  // --- VẬT LÝ MỚI 1: RoboClean X10 Ultra Station ---
  {
    name: 'Robot Hút Bụi Lau Nhà RoboClean X10 Ultra Station',
    slug: 'roboclean-x10-ultra-station',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'robot-hut-bui',
    groupSlug: 'gia-dung',
    brand: 'RoboClean',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1120,
    price: 14990000,
    originalPrice: 17990000,
    priceUnit: '₫',
    pros: [
      'Trạm sạc đa năng tự động giặt sấy giẻ lau bằng nước nóng 60°C và gom bụi tự động',
      'Lực hút cực đại 7000Pa hút sạch cát mịn và lông thú cưng trên thảm dày',
      'Hệ thống định vị LiDAR 3D + Camera AI tránh 50+ loại vật cản chính xác'
    ],
    cons: [
      'Trạm sạc khá to cần không gian đặt rộng rãi',
      'Cần thay túi gom bụi và hộp nước định kỳ'
    ],
    bestFor: 'Gia đình nuôi thú cưng, nhà rộng nhiều tầng muốn trải nghiệm rảnh tay 100%',
    shortDescription: 'Robot hút bụi lau nhà hàng đầu với lực hút 7000Pa, trạm sạc tự giặt giẻ sấy khô và định vị AI thông minh.',
    deepReview: 'RoboClean X10 Ultra Station mang đến giải pháp làm sạch tự động hoàn hảo cho căn hộ hiện đại.',
    specs: {
      'Lực hút': '7000 Pa',
      'Dung lượng pin': '5200 mAh (Dọn dẹp 180 phút)',
      'Trạm sạc': 'Giặt giẻ nước nóng + Sấy khí nóng + Hút bụi tự động',
      'Bảo hành': '24 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.5, performance: 9.6, value: 9.1, usability: 9.4 },
    badge: 'Robot Lau Nhà Số 1',
    status: 'published',
    views: 19800
  },
  // --- VẬT LÝ MỚI 2: Sony WH-1000XM5 ---
  {
    name: 'Tai Nghe Chống Ồn Cao Cấp Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'tai-nghe-chong-on',
    groupSlug: 'dien-tu',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 2350,
    price: 7490000,
    originalPrice: 8490000,
    priceUnit: '₫',
    pros: [
      'Công nghệ chống ồn ANC 8 micro xử lý kép khử tạp âm máy bay và tiếng ồn văn phòng xuất sắc',
      'Driver 30mm thiết kế riêng cho âm trầm sâu lắng và dải âm trung trong trẻo',
      'Thời lượng pin 30 giờ liên tục kèm sạc nhanh 3 phút dùng 3 giờ'
    ],
    cons: [
      'Khớp nối thiết kế mới không gấp gọn cuộn tròn được như đời XM4',
      'Khả năng kháng nước ở mức cơ bản, không phù hợp tập thể thao nặng'
    ],
    bestFor: 'Người di chuyển bằng máy bay, làm việc mở tại văn phòng và yêu âm thanh Hi-Res',
    shortDescription: 'Vua chống ồn chụp tai với 8 micro xử lý, âm thanh chuẩn Hi-Res Audio Wireless và pin 30 giờ.',
    deepReview: 'Sony WH-1000XM5 tiếp tục khẳng định vị thế dẫn đầu thế giới về công nghệ chống ồn chủ động.',
    specs: {
      'Thời lượng pin': '30 giờ (bật ANC), 40 giờ (tắt ANC)',
      'Micro': '8 micro chống ồn + Cảm biến gia tốc',
      'Bluetooth': 'Version 5.2 (Hỗ trợ LDAC, AAC, SBC)',
      'Trọng lượng': '250g'
    },
    scoreBreakdown: { design: 9.4, performance: 9.8, value: 9.4, usability: 9.8 },
    badge: 'Tai Nghe ANC Tốt Nhất',
    status: 'published',
    views: 28900
  },
  // --- VẬT LÝ MỚI 3: Xiaomi Smart Band 8 Pro ---
  {
    name: 'Vòng Đeo Tay Thông Minh Xiaomi Smart Band 8 Pro',
    slug: 'xiaomi-smart-band-8-pro',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'dong-ho-suc-khoe',
    groupSlug: 'suc-khoe',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    score: 8.9,
    ratingCount: 1420,
    price: 1590000,
    originalPrice: 1790000,
    priceUnit: '₫',
    pros: [
      'Màn hình AMOLED 1.74 inch tần số quét 60Hz hiển thị rực rỡ ngoài trời',
      'Định vị GPS độc lập không cần mang theo điện thoại khi chạy bộ',
      'Theo dõi nhịp tim 24/7, SpO2 và 150+ chế độ luyện tập thể thao'
    ],
    cons: [
      'Không hỗ trợ nghe gọi trực tiếp qua SIM',
      'Kho ứng dụng cài thêm còn hạn chế'
    ],
    bestFor: 'Học sinh, sinh viên và người tập thể thao cần theo dõi sức khỏe gọn nhẹ giá tốt',
    shortDescription: 'Vòng đeo tay sức khỏe màn hình AMOLED 1.74 inch rực rỡ, tích hợp GPS độc lập và pin 14 ngày.',
    deepReview: 'Xiaomi Smart Band 8 Pro đem lại trải nghiệm tiệm cận đồng hồ thông minh cao cấp với giá cực kỳ hợp lý.',
    specs: {
      'Màn hình': '1.74 inch AMOLED 60Hz',
      'Định vị': 'GPS, GLONASS, Galileo, Beidou',
      'Thời lượng pin': '14 ngày (sử dụng thông thường)',
      'Chống nước': '5 ATM (50m)'
    },
    scoreBreakdown: { design: 9.0, performance: 8.8, value: 9.5, usability: 8.4 },
    badge: 'Ngon Bổ Rẻ 2024',
    status: 'published',
    views: 16500
  },
  // --- VẬT LÝ MỚI 4: Bếp Từ Đôi Sunhouse Mama ---
  {
    name: 'Bếp Từ Đôi Cảm Ứng Sunhouse Mama MMB9201',
    slug: 'sunhouse-mama-bep-tu-doi',
    type: 'physical',
    category: 'Thiết bị nhà bếp',
    categorySlug: 'bep-tu',
    groupSlug: 'thiet-bi-nha-bep',
    brand: 'Sunhouse',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
    score: 9.1,
    ratingCount: 780,
    price: 5290000,
    originalPrice: 6590000,
    priceUnit: '₫',
    pros: [
      'Mặt kính Schott Ceran chịu lực chịu nhiệt lên tới 1000°C chống xước xuất sắc',
      'Công nghệ Inverter tiết kiệm 35% điện năng tiêu thụ hàng tháng',
      'Tính năng Booster nấu nhanh 3600W cho 2 vùng nấu riêng biệt'
    ],
    cons: [
      'Yêu cầu sử dụng bộ nồi có đáy từ tính chuyên dụng',
      'Bảng điều khiển cảm ứng cần giữ khô tay để thao tác nhạy nhất'
    ],
    bestFor: 'Gia đình hiện đại nâng cấp căn bếp an toàn, tiết kiệm điện năng và nấu ăn nhanh',
    shortDescription: 'Bếp từ đôi âm cao cấp Inverter đun nấu siêu tốc 3600W, mặt kính Schott Ceran chịu lực 1000°C.',
    deepReview: 'Sunhouse Mama MMB9201 mang đến trải nghiệm đun nấu an toàn, sạch sẽ và cực kỳ tiết kiệm điện.',
    specs: {
      'Công suất tổng': '3600W (Booster 2x 2000W)',
      'Mặt kính': 'Schott Ceran vát cạnh sang trọng',
      'Tính năng': 'Inverter tiết kiệm điện, Hẹn giờ, Khóa trẻ em, Tự ngắt khi tràn',
      'Bảo hành': '36 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.2, performance: 9.3, value: 9.0, usability: 8.9 },
    badge: 'Bếp Từ Đôi Đáng Mua',
    status: 'published',
    views: 14200
  },
  // --- VẬT LÝ MỚI 5: Balo Mark Ryden ---
  {
    name: 'Balo Laptop Chống Nước Mark Ryden Professional 15.6 Inch',
    slug: 'mark-ryden-backpack-156',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'balo-chong-nuoc',
    groupSlug: 'thoi-trang',
    brand: 'Mark Ryden',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    score: 9.0,
    ratingCount: 950,
    price: 890000,
    originalPrice: 1190000,
    priceUnit: '₫',
    pros: [
      'Vải Oxford chống nước tuyệt đối bảo vệ an toàn laptop và thiết bị điện tử khi đi mưa',
      'Khóa kéo TSA ẩn chống trộm và đệm lưng tổ ong thoáng khí chống gù lưng',
      'Tích hợp cổng sạc USB bên ngoài kết nối tiện lợi với pin dự phòng trong balo'
    ],
    cons: [
      'Form balo cố định nên khó gấp gọn khi không đựng đồ',
      'Chỉ vừa laptop tối đa 15.6 inch (không chứa vừa laptop 17.3 inch)'
    ],
    bestFor: 'Dân công nghệ, lập trình viên, học sinh sinh viên di chuyển làm việc hàng ngày',
    shortDescription: 'Balo chống nước chuẩn TSA chống trộm, đệm lưng công thái học và cổng sạc USB thông minh.',
    deepReview: 'Mark Ryden Professional là người bạn đồng hành hoàn hảo cho dân công nghệ bảo vệ thiết bị đắt tiền.',
    specs: {
      'Chất liệu': 'Vải Oxford chống nước cao cấp + Vải Lót Polyester',
      'Kích thước': '46 x 31 x 16 cm (Vừa laptop 15.6 inch)',
      'Tính năng': 'Cổng USB sạc ngoài, Khóa số chống trộm, Đệm công thái học',
      'Bảo hành': '12 tháng'
    },
    scoreBreakdown: { design: 9.1, performance: 9.0, value: 9.2, usability: 8.8 },
    badge: 'Balo Công Nghệ Số 1',
    status: 'published',
    views: 12800
  },

  // --- AI MỚI 1: Perplexity Pro ---
  {
    name: 'Perplexity Pro AI Engine',
    slug: 'perplexity-pro-ai',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'tro-ly-ai',
    groupSlug: 'ai',
    brand: 'Perplexity',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1890,
    price: 500000,
    originalPrice: 600000,
    priceUnit: '₫/tháng',
    pros: [
      'Công cụ tìm kiếm AI thời gian thực trích dẫn nguồn chi tiết, chính xác 100%',
      'Cho phép chọn chuyển đổi linh hoạt giữa GPT-4o, Claude 3.5 Sonnet và Sonar Large',
      'Hỗ trợ đính kèm file PDF, Excel, ảnh và phân tích dữ liệu chuyên sâu qua Pro Search'
    ],
    cons: [
      'Giới hạn 600 lượt Pro Search mỗi ngày cho tài khoản trả phí',
      'Tính năng tạo ảnh chưa phong phú bằng Midjourney'
    ],
    bestFor: 'Nhà nghiên cứu, sinh viên, nhà báo và chuyên gia tìm kiếm thông tin có trích dẫn chuẩn xác',
    shortDescription: 'Công cụ tìm kiếm AI thời gian thực hàng đầu thế giới với khả năng trích dẫn nguồn tin uy tín.',
    deepReview: 'Perplexity Pro đã tái định nghĩa trải nghiệm tìm kiếm thông tin trực tuyến, loại bỏ hoàn toàn rác kết quả.',
    specs: {
      'Mô hình AI hỗ trợ': 'GPT-4o, Claude 3.5 Sonnet, Llama 3, Sonar Large',
      'Tính năng Pro': 'Pro Search thời gian thực, Upload File không giới hạn, Tạo ảnh AI',
      'Nền tảng': 'Web, iOS, Android, Chrome Extension',
      'Bảo mật': 'Mã hóa dữ liệu chuẩn SOC2'
    },
    scoreBreakdown: { design: 9.5, performance: 9.7, value: 9.3, usability: 9.5 },
    badge: 'Công Cụ Tìm Kiếm AI Số 1',
    status: 'published',
    views: 31200
  },
  // --- AI MỚI 2: GitHub Copilot Enterprise ---
  {
    name: 'GitHub Copilot Enterprise AI',
    slug: 'github-copilot-enterprise',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-code',
    groupSlug: 'ai',
    brand: 'GitHub',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1650,
    price: 480000,
    originalPrice: 550000,
    priceUnit: '₫/tháng',
    pros: [
      'Gợi ý code thời gian thực tự động hoàn thành hàm, giải thuật và viết unit test chuẩn xác',
      'Hiểu rõ toàn bộ codebase riêng của doanh nghiệp để giải thích code và review PR tự động',
      'Tích hợp hoàn hảo vào VS Code, JetBrains IDEs, Neovim và GitHub.com'
    ],
    cons: [
      'Đôi khi gợi ý code theo cú pháp cũ nếu thư viện vừa cập nhật phiên bản mới',
      'Cần kết nối Internet liên tục để gửi request đến model'
    ],
    bestFor: 'Lập trình viên, kỹ sư phần mềm và đội ngũ công nghệ muốn tăng 300% tốc độ viết code',
    shortDescription: 'Trợ lý lập trình AI hàng đầu tích hợp sâu vào IDE giúp sinh code, giải thích bug và viết test tự động.',
    deepReview: 'GitHub Copilot Enterprise chính là trợ lý đắc lực không thể thiếu của mọi lập trình viên thời đại mới.',
    specs: {
      'IDE hỗ trợ': 'VS Code, Visual Studio, JetBrains PyCharm/IntelliJ, Neovim',
      'Ngôn ngữ': 'Python, JavaScript, TypeScript, Go, Rust, Java, C++, PHP...',
      'Tính năng': 'Auto-complete, Copilot Chat, PR Summaries, Code Review AI',
      'Bảo mật': 'Không sử dụng code khách hàng để huấn luyện model'
    },
    scoreBreakdown: { design: 9.3, performance: 9.6, value: 9.2, usability: 9.5 },
    badge: 'Trợ Lý Lập Trình AI Số 1',
    status: 'published',
    views: 29500
  },
  // --- AI MỚI 3: Midjourney v6 ---
  {
    name: 'Midjourney v6 Alpha Art Generator',
    slug: 'midjourney-v6-alpha',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-media',
    groupSlug: 'ai',
    brand: 'Midjourney',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 3100,
    price: 750000,
    originalPrice: 900000,
    priceUnit: '₫/tháng',
    pros: [
      'Chất lượng tạo ảnh tả thực (photorealistic), ánh sáng và chi tiết da người đỉnh cao',
      'Khả năng render văn bản (Text in Image) chuẩn xác chưa từng có trên các model AI khác',
      'Hỗ trợ Upscale 4K, Inpainting, Outpainting và tùy chỉnh tỷ lệ khung hình linh hoạt'
    ],
    cons: [
      'Giao diện qua Discord hoặc Web Beta đòi hỏi người mới mất thời gian làm quen',
      'Không có gói miễn phí trải nghiệm dài hạn'
    ],
    bestFor: 'Designer, Art Director, Concept Artist, Marketer và Creators thiết kế hình ảnh chất lượng cao',
    shortDescription: 'Công cụ sinh ảnh AI chất lượng nhất thế giới với khả năng tái tạo ánh sáng và văn bản sống động.',
    deepReview: 'Midjourney v6 tiếp tục giữ vững ngai vàng công cụ thiết kế đồ họa AI mạnh mẽ nhất hành tinh.',
    specs: {
      'Phiên bản': 'v6.0 Alpha Engine',
      'Độ phân giải': 'Tối đa 4K (sau khi Upscale)',
      'Tính năng': 'Text Rendering, Style Reference, Zoom Out, Pan, Vary Region',
      'Nền tảng': 'Discord Bot & Web Alpha Studio'
    },
    scoreBreakdown: { design: 9.8, performance: 9.7, value: 9.3, usability: 9.6 },
    badge: 'AI Tạo Ảnh Đẹp Nhất',
    status: 'published',
    views: 42100
  },
  // --- AI MỚI 4: ElevenLabs Voice AI ---
  {
    name: 'ElevenLabs Prime Voice AI Generator',
    slug: 'elevenlabs-prime-voice-ai',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-media',
    groupSlug: 'ai',
    brand: 'ElevenLabs',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 1240,
    price: 550000,
    originalPrice: 650000,
    priceUnit: '₫/tháng',
    pros: [
      'Tái tạo giọng nói tự nhiên 99% như người thật với đầy đủ cảm xúc, ngắt nghỉ và thở nhẹ',
      'Tính năng Voice Cloning nhân bản giọng nói chuẩn xác chỉ từ mẫu âm thanh 1 phút',
      'Hỗ trợ 29+ ngôn ngữ bao gồm tiếng Việt chuẩn giọng 3 miền Bắc - Trung - Nam'
    ],
    cons: [
      'Gói Starter giới hạn số lượng ký tự chuyển đổi mỗi tháng',
      'Cần xác minh bản quyền giọng nói để tránh lạm dụng mạo danh'
    ],
    bestFor: 'YouTuber, Podcaster, Nhà làm phim, Đội ngũ sản xuất nội dung TikTok/Reels và Audiobooks',
    shortDescription: 'Công cụ sinh giọng nói AI siêu thực với khả năng nhân bản giọng đọc và lồng tiếng đa ngôn ngữ.',
    deepReview: 'ElevenLabs xóa mờ hoàn toàn ranh giới giữa giọng đọc máy tính vô hồn và chất giọng truyền cảm của MC chuyên nghiệp.',
    specs: {
      'Ngôn ngữ hỗ trợ': '29+ ngôn ngữ (có Tiếng Việt)',
      'Tính năng': 'Text-to-Speech, Voice Cloning, AI Dubbing lồng tiếng video, Speech-to-Speech',
      'Định dạng xuất': 'MP3 192kbps, WAV 44.1kHz',
      'API': 'REST API latency cực thấp < 300ms'
    },
    scoreBreakdown: { design: 9.4, performance: 9.5, value: 9.0, usability: 9.3 },
    badge: 'AI Giọng Nói Tốt Nhất',
    status: 'published',
    views: 26800
  },
  // --- AI MỚI 5: Jasper AI ---
  {
    name: 'Jasper AI Copywriting & Marketing Platform',
    slug: 'jasper-ai-marketing-platform',
    type: 'digital',
    category: 'Trí tuệ nhân tạo (AI Tools)',
    categorySlug: 'ai-copywriting',
    groupSlug: 'ai',
    brand: 'Jasper',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    score: 9.1,
    ratingCount: 1560,
    price: 990000,
    originalPrice: 1200000,
    priceUnit: '₫/tháng',
    pros: [
      'Bộ hơn 50+ template viết bài chuẩn Marketing: Bài chuẩn SEO, Quảng cáo Facebook/Google, Email sales',
      'Tính năng Brand Voice học phong cách thương hiệu để viết bài đồng bộ 100%',
      'Tích hợp trực tiếp công cụ SurferSEO phân tích từ khóa và tối ưu thứ hạng bài viết'
    ],
    cons: [
      'Chi phí hàng tháng khá cao so với mặt bằng chung',
      'Cần tinh chỉnh prompt để có giọng văn tiếng Việt tự nhiên nhất'
    ],
    bestFor: 'Digital Agency, Copywriter, Content Manager và Chủ doanh nghiệp Thương mại điện tử',
    shortDescription: 'Nền tảng viết bài AI chuyên nghiệp cho Marketing, tối ưu SEO và học phong cách thương hiệu.',
    deepReview: 'Jasper AI là giải pháp toàn diện giúp các đội ngũ Marketing sản xuất nội dung chất lượng cao gấp 5 lần.',
    specs: {
      'Templates': '50+ mẫu viết quảng cáo & SEO',
      'Tích hợp': 'SurferSEO, Grammarly, Copyscape Plagiarism Checker',
      'Tính năng': 'Brand Voice, Campaign Workflows, Chrome Extension',
      'Bảo mật': 'Enterprise SOC2 Type II Certified'
    },
    scoreBreakdown: { design: 9.2, performance: 9.1, value: 8.8, usability: 9.3 },
    badge: 'AI Marketing Hàng Đầu',
    status: 'published',
    views: 21400
  },
  {
    name: 'Notion Plus + Notion AI Workspace',
    slug: 'notion-plus-ai',
    type: 'digital',
    category: 'Phần mềm & Năng suất',
    categorySlug: 'ghi-chu-quan-ly',
    groupSlug: 'phan-mem',
    brand: 'Notion Labs',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 940,
    price: 240000,
    originalPrice: 290000,
    priceUnit: '₫/tháng',
    pros: ['Không gian làm việc tất cả trong một (Ghi chú, Wiki, Quản lý dự án)', 'Tích hợp AI viết tóm tắt, trích xuất ý chính và tìm kiếm thông minh', 'Khả năng tùy biến vô hạn với cơ sở dữ liệu quan hệ mạnh mẽ'],
    cons: ['Đường cong học tập ban đầu khá dốc cho người mới', 'Ứng dụng mobile đôi lúc tải trang nặng còn hơi chậm'],
    bestFor: 'Cá nhân tổ chức cuộc sống, freelancer và đội ngũ làm việc linh hoạt.',
    shortDescription: 'Hệ thống quản trị tri thức và công việc số 1 thế giới tích hợp AI thế hệ mới.',
    deepReview: 'Notion Plus là nền tảng quản lý dự án và kiến thức linh hoạt nhất, nay còn mạnh mẽ hơn nhờ trí tuệ nhân tạo tích hợp.',
    specs: {
      'Dung lượng': 'Không giới hạn Block & Tải lên tệp',
      'Tích hợp': 'Slack, GitHub, Figma, Google Drive, Asana',
      'Tính năng AI': 'Q&A AI, Tự động viết, Tóm tắt cơ sở dữ liệu'
    },
    scoreBreakdown: { design: 9.8, performance: 9.3, value: 9.6, usability: 9.5 },
    badge: 'Năng Suất #1',
    status: 'published',
    views: 5120
  }
];

const sampleRankings = [
  {
    title: 'Top 10 Nồi Chiên Không Dầu Tốt Nhất 2024: Kiểm Nghiệm Thực Tế',
    slug: 'noi-chien-khong-dau',
    type: 'physical',
    groupSlug: 'gia-dung',
    categorySlug: 'noi-chien',
    subtitle: 'Đánh giá chi tiết sau 60 ngày thử nghiệm nướng hơn 100 món ăn tại phòng thí nghiệm TechReview.',
    authorId: 'exp-2',
    intro: 'Nồi chiên không dầu đã trở thành thiết bị không thể thiếu trong gian bếp hiện đại. Để giúp bạn chọn đúng sản phẩm phù hợp ngân sách và chất lượng, đội ngũ chuyên gia của chúng tôi đã trực tiếp mua và thử nghiệm 25 mẫu nồi chiên bán chạy nhất.',
    methodology: 'Chúng tôi kiểm tra: 1. Độ đồng đều nhiệt độ bằng cảm biến nhiệt 8 điểm. 2. Lượng dầu mỡ tách thực tế. 3. Độ bền lớp chống dính sau 100 chu kỳ rửa. 4. Độ ồn và khả năng cách nhiệt.',
    quickPicks: {
      bestOverallId: 'philips-xxl-hd9650',
      bestValueId: 'cosori-dual-blaze-6-4l',
      bestPremiumId: 'philips-xxl-hd9650'
    },
    items: [
      {
        rank: 1,
        productId: 'philips-xxl-hd9650',
        highlight: 'Chuẩn mực vàng về khả năng tách dầu mỡ và độ chín giòn hoàn hảo.',
        verdict: 'Lựa chọn số 1 tuyệt đối cho các gia đình muốn đầu tư thiết bị chất lượng cao sử dụng lâu dài.'
      },
      {
        rank: 2,
        productId: 'cosori-dual-blaze-6-4l',
        highlight: 'Hệ thống nhiệt kép thông minh không cần lật trở thức ăn.',
        verdict: 'Sản phẩm đáng mua nhất phân khúc tầm trung với công nghệ thông minh và chống dính cực bền.'
      }
    ],
    conclusion: 'Nếu ngân sách cho phép, Philips XXL HD9650 vẫn là lựa chọn số 1 về chất lượng nướng. Với ngân sách dưới 4 triệu, Cosori Dual Blaze là ứng cử viên sáng giá nhất.',
    faq: [
      { q: 'Nồi chiên không dầu có thực sự tốt cho sức khỏe không?', a: 'Có. Quá trình chiên đối lưu giúp giảm từ 70% đến 90% lượng dầu mỡ so với chiên ngập dầu truyền thống.' },
      { q: 'Nên chọn dung tích bao nhiêu là phù hợp?', a: 'Gia đình 2-3 người nên chọn từ 4L-5L. Gia đình 4-6 người nên chọn từ 6L trở lên để nướng được gà nguyên con.' }
    ],
    status: 'published'
  },
  {
    title: 'Top Trợ Lý AI Tốt Nhất 2024: So Sánh Claude 3.5 vs GPT-4o',
    slug: 'top-ai-viet-code',
    type: 'digital',
    groupSlug: 'ai',
    categorySlug: 'ai-chat',
    subtitle: 'Bảng so sánh chi tiết năng lực lập trình, phân tích dữ liệu và suy luận thông minh giữa các mô hình hàng đầu.',
    authorId: 'exp-1',
    intro: 'Thế giới AI thay đổi từng tuần. Bảng xếp hạng này được cập nhật liên tục để phản ánh đúng năng lực thực tế của từng mô hình ngôn ngữ lớn (LLM).',
    methodology: 'Thử nghiệm hơn 200 bài kiểm tra về Refactor Code, Phân tích dữ liệu JSON/CSV, Viết luận chuyên sâu và Giải toán học tư duy logic.',
    quickPicks: {
      bestOverallId: 'claude-3-5-sonnet',
      bestValueId: 'chatgpt-plus-gpt4o',
      bestPremiumId: 'claude-3-5-sonnet'
    },
    items: [
      {
        rank: 1,
        productId: 'claude-3-5-sonnet',
        highlight: 'Vua lập trình và phân tích ngữ cảnh lớn không có đối thủ.',
        verdict: 'Mô hình AI xuất sắc nhất hiện tại cho dân công nghệ và người làm việc trí óc.'
      },
      {
        rank: 2,
        productId: 'chatgpt-plus-gpt4o',
        highlight: 'Đa phương thức mạnh nhất, hỗ trợ giọng nói và phân tích dữ liệu chuyên nghiệp.',
        verdict: 'Lựa chọn toàn diện cho người dùng đa nhu cầu cần tương tác giọng nói và tìm kiếm web.'
      }
    ],
    conclusion: 'Chọn Claude 3.5 Sonnet nếu bạn ưu tiên lập trình và tư duy logic. Chọn ChatGPT Plus nếu bạn cần tương tác giọng nói, vẽ hình ảnh DALL-E 3 và tìm kiếm web realtime.',
    faq: [
      { q: 'Claude 3.5 Sonnet hay ChatGPT Plus lập trình tốt hơn?', a: 'Các bài benchmark thực tế cho thấy Claude 3.5 Sonnet tạo ra ít lỗi bug hơn, hiểu kiến trúc code sâu sắc hơn và tính năng Artifacts hỗ trợ review cực tốt.' }
    ],
    status: 'published'
  }
];

const sampleComparisons = [
  {
    title: 'So Sánh: Claude 3.5 Sonnet vs ChatGPT Plus (GPT-4o)',
    slug: 'claude-3-5-sonnet-vs-chatgpt-plus',
    type: 'digital',
    categorySlug: 'ai-chat',
    productAId: 'claude-3-5-sonnet',
    productBId: 'chatgpt-plus-gpt4o',
    winnerId: 'claude-3-5-sonnet',
    verdict: 'Claude 3.5 Sonnet chiến thắng sít sao nhờ khả năng code vượt trội và tư duy suy luận logic sâu sắc hơn.',
    priceComparison: 'Cả hai đều có mức giá tương đương khoảng $20/tháng (~490.000đ - 500.000đ/tháng).',
    features: [
      { feature: 'Khả năng viết Code & Debug', productA: 'Rất xuất sắc (9.9/10)', productB: 'Tốt (9.2/10)', winner: 'A' },
      { feature: 'Tương tác Giọng nói (Voice)', productA: 'Chưa hỗ trợ', productB: 'Advanced Voice Siêu thực', winner: 'B' },
      { feature: 'Xử lý ngữ cảnh tài liệu', productA: '200,000 tokens siêu nhanh', productB: '128,000 tokens', winner: 'A' },
      { feature: 'Tìm kiếm Web thời gian thực', productA: 'Chưa có', productB: 'Có sẵn Realtime Web Search', winner: 'B' }
    ],
    experienceComparison: 'Khi sử dụng hàng ngày, Claude cho cảm giác đối thoại thông minh và tự nhiên như một kỹ sư kỳ cựu. ChatGPT lại đa năng như một trợ lý vạn năng.',
    finalRecommendation: 'Nếu công việc chính của bạn liên quan đến viết code, nghiên cứu và phân tích văn bản dài, hãy chọn Claude 3.5 Sonnet. Nếu bạn cần AI đa phương tiện toàn diện, hãy chọn ChatGPT Plus.',
    authorId: 'exp-1',
    status: 'published'
  }
];

const sampleArticles = [
  {
    title: 'Cẩm Nang Chọn Mua Nồi Chiên Không Dầu Chuẩn Chuyên Gia 2024',
    slug: 'cam-nang-chon-mua-noi-chien-khong-dau',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'noi-chien',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    excerpt: '7 tiêu chí vàng giúp bạn chọn đúng chiếc nồi chiên không dầu bền bỉ, dễ vệ sinh và an toàn tuyệt đối cho sức khỏe gia đình.',
    content: 'Nồi chiên không dầu là cuộc cách mạng trong nấu nướng hiện đại. Bài viết này sẽ hướng dẫn bạn chi tiết từng tiêu chí từ công nghệ gia nhiệt, dung tích, công suất cho đến lớp phủ chống dính...',
    readingTime: '6 phút đọc',
    authorId: 'exp-2',
    tags: ['Gia dụng', 'Nồi chiên không dầu', 'Mẹo mua sắm', 'Kinh nghiệm chọn đồ'],
    views: 4210,
    status: 'published'
  },
  {
    title: 'Prompt Engineering 2024: Cách Tối Ưu Hiệu Suất Với Claude 3.5 Sonnet',
    slug: 'prompt-engineering-claude-3-5',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-chat',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Khám phá cấu trúc Prompt chuẩn mực và cách tận dụng cửa sổ tương tác Artifacts để tăng gấp 3 lần tốc độ phát triển dự án.',
    content: 'Để khai thác tối đa sức mạnh của Claude 3.5 Sonnet, việc hiểu rõ cơ chế Few-shot Prompting và System Context là chìa khóa then chốt...',
    readingTime: '8 phút đọc',
    authorId: 'exp-1',
    tags: ['AI', 'Claude', 'Prompt Engineering', 'Lập trình'],
    views: 7890,
    status: 'published'
  },
  {
    title: 'Cẩm Nang Chọn Mua Laptop Sinh Viên 2024: Mỏng Nhẹ, Pin Khỏe, Bền Bỉ 4 Năm',
    slug: 'cam-nang-chon-mua-laptop-sinh-vien',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'laptop-sinh-vien',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Bí quyết chọn cấu hình CPU, RAM, ổ cứng SSD và màn hình phù hợp theo từng khối ngành: Kinh tế, Kỹ thuật - IT, Thiết kế đồ họa.',
    content: 'Laptop là công cụ học tập và làm việc quan trọng nhất của sinh viên...',
    readingTime: '7 phút đọc',
    authorId: 'exp-1',
    tags: ['Laptop', 'Sinh viên', 'Công nghệ', 'Kinh nghiệm chọn đồ'],
    views: 5320,
    status: 'published'
  },
  // --- BÀI MỚI 1: Top Robot Hút Bụi ---
  {
    title: 'Top 5 Robot Hút Bụi Lau Nhà Tự Động Giặt Giẻ Đáng Mua Nhất 2024',
    slug: 'top-5-robot-hut-bui-lau-nha-tu-giat-gie-2024',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'robot-hut-bui',
    coverImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tổng hợp đánh giá chi tiết 5 mẫu robot hút bụi có trạm sạc thông minh tự động giặt sấy giẻ bằng nước nóng, lực hút 7000Pa giúp giải phóng hoàn toàn sức lao động.',
    content: '### 1. Tại sao robot hút bụi có trạm tự giặt giẻ lại trở thành xu hướng?\nCác dòng robot đời cũ chỉ biết hút bụi và kéo lê miếng giẻ bẩn khắp nhà khiến vi khuẩn lây lan. Sự xuất hiện của trạm sạc thông minh trang bị bình chứa nước sạch/nước bẩn riêng biệt cùng công nghệ giặt giẻ bằng nước nóng 60°C và sấy khô bằng khí nóng đã giải quyết triệt để rào cản này.\n\n---\n\n### 2. Tiêu chí chọn mua robot lau nhà cao cấp\n- **Lực hút tối thiểu:** Nên từ 5000Pa đến 7000Pa để hút sạch bụi mịn nằm sâu dưới khe gạch và thảm.\n- **Công nghệ định vị:** Cảm biến LiDAR 3D kết hợp camera AI giúp nhận diện dây điện, dép và đồ chơi trẻ em mà không bị kẹt.\n- **Trạm sạc đa năng:** Tự động gom bụi vào túi chứa kín và tự giặt sấy giẻ để tránh mùi ẩm mốc.',
    tableOfContents: [
      { id: '1-tai-sao-robot-tu-giat-gie-tro-thanh-xu-huong', title: '1. Xu hướng robot tự giặt giẻ' },
      { id: '2-tieu-chi-chon-mua-robot-lau-nha-cao-cap', title: '2. Tiêu chí chọn mua cao cấp' }
    ],
    authorId: 'exp-1',
    readingTime: '7 phút đọc',
    publishedAt: '20 Tháng 03, 2024',
    relatedProductIds: ['roboclean-x10-ultra-station'],
    tags: ['Gia dụng', 'Robot hút bụi', 'Công nghệ nhà thông minh'],
    views: 31200,
    status: 'published',
    isFeatured: true
  },
  // --- BÀI MỚI 2: Đánh Giá Sony WH-1000XM5 ---
  {
    title: 'Đánh Giá Chi Tiết Tai Nghe Sony WH-1000XM5: Vua Chống Ồn Thế Hệ Mới Có Thật Sự Đáng Tiền?',
    slug: 'danh-gia-chi-tiet-sony-wh-1000xm5',
    type: 'review',
    productType: 'physical',
    categorySlug: 'tai-nghe-chong-on',
    coverImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Thử nghiệm thực tế khả năng triệt tiêu tiếng ồn trên chuyến bay 8 tiếng và chất âm Hi-Res Audio Wireless của Sony WH-1000XM5 sau 30 ngày sử dụng liên tục.',
    content: '### 1. Thiết kế mới tối giản và êm ái\nSony WH-1000XM5 từ bỏ kiểu dáng gập truyền thống để chuyển sang ngôn ngữ thiết kế "Seamless Design" thanh lịch với chất liệu da tổng hợp mềm mại Fit Leather, giảm áp lực tối đa lên đỉnh đầu khi đeo lâu.\n\n---\n\n### 2. Trải nghiệm chống ồn ANC đỉnh cao\nNhờ 8 micro đo tiếng ồn xung quanh cùng bộ xử lý V1 và QN1 kết hợp, XM5 lọc sạch tiếng động cơ máy bay và tiếng đàm thoại văn phòng mượt mà chưa từng thấy.',
    tableOfContents: [
      { id: '1-thiet-ke-moi-toi-gian', title: '1. Thiết kế mới tối giản' },
      { id: '2-trai-nghiem-chong-on-anc', title: '2. Trải nghiệm chống ồn ANC' }
    ],
    authorId: 'exp-2',
    readingTime: '8 phút đọc',
    publishedAt: '19 Tháng 03, 2024',
    relatedProductIds: ['sony-wh-1000xm5'],
    tags: ['Âm thanh', 'Tai nghe chống ồn', 'Sony', 'Công nghệ'],
    views: 28400,
    status: 'published'
  },
  // --- BÀI MỚI 3: So Sánh Bếp Từ vs Bếp Hồng Ngoại ---
  {
    title: 'So Sánh Bếp Từ Đôi Và Bếp Hồng Ngoại: Nên Chọn Loại Nào Cho Gian Bếp Gia Đình?',
    slug: 'so-sanh-bep-tu-doi-va-bep-hong-ngoai',
    type: 'comparison',
    productType: 'physical',
    categorySlug: 'bep-tu',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Phân tích chi tiết hiệu suất đun nấu, mức độ tiêu thụ điện năng, độ an toàn và độ kén nồi giữa bếp từ và bếp hồng ngoại để giúp bạn đưa ra quyết định đúng đắn.',
    content: '### 1. Nguyên lý hoạt động và hiệu suất\nBếp từ đun nóng trực tiếp đáy nồi qua từ trường nên đạt hiệu suất đến 90%, không tỏa nhiệt thất thoát ra ngoài. Trong khi bếp hồng ngoại sử dụng mâm nhiệt phát bức xạ hồng ngoại đun nóng mặt kính trước khi truyền tới đáy nồi.\n\n---\n\n### 2. Bảng so sánh nhanh\n- **Độ an toàn:** Bếp từ nguội nhanh ngay sau khi tắt bếp; Bếp hồng ngoại giữ nhiệt nóng rất lâu dễ gây bỏng.\n- **Độ kén nồi:** Bếp từ chỉ dùng nồi đáy từ; Bếp hồng ngoại dùng được tất cả các loại nồi.',
    tableOfContents: [
      { id: '1-nguyen-ly-hoat-dong', title: '1. Nguyên lý hoạt động' },
      { id: '2-bang-so-sanh-nhanh', title: '2. Bảng so sánh nhanh' }
    ],
    authorId: 'exp-1',
    readingTime: '6 phút đọc',
    publishedAt: '17 Tháng 03, 2024',
    relatedProductIds: ['sunhouse-mama-bep-tu-doi'],
    tags: ['Thiết bị nhà bếp', 'Bếp từ', 'Gia dụng'],
    views: 24100,
    status: 'published'
  },
  // --- BÀI MỚI 4: Hướng Dẫn Chọn Balo Laptop ---
  {
    title: 'Hướng Dẫn Chọn Balo Laptop Chống Nước Chuẩn Cho Sinh Viên & Dân Công Nghệ',
    slug: 'huong-dan-chon-balo-laptop-chong-nuoc',
    type: 'guide',
    productType: 'physical',
    categorySlug: 'balo-chong-nuoc',
    coverImage: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Những tiêu chí quan trọng khi chọn mua balo: Vải Oxford chống nước, đệm chống sốc 360 độ cho máy tính, khóa kéo TSA chống trộm và quai đeo giảm áp lực vai.',
    content: 'Hướng dẫn chọn mua balo chống nước...',
    tableOfContents: [{ id: '1-chat-lieu-vai', title: '1. Chất liệu vải chống nước' }],
    authorId: 'exp-1',
    readingTime: '5 phút đọc',
    publishedAt: '15 Tháng 03, 2024',
    relatedProductIds: ['mark-ryden-backpack-156'],
    tags: ['Phụ kiện', 'Balo laptop', 'Thời trang'],
    views: 18900,
    status: 'published'
  },
  // --- BÀI MỚI 5: Đánh Giá Vòng Sức Khỏe Xiaomi ---
  {
    title: 'Đánh Giá Chi Tiết Xiaomi Smart Band 8 Pro: Vòng Đeo Tay Thể Thao Đáng Tiền Nhất',
    slug: 'danh-gia-chi-tiet-xiaomi-smart-band-8-pro',
    type: 'review',
    productType: 'physical',
    categorySlug: 'dong-ho-suc-khoe',
    coverImage: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Màn hình AMOLED 60Hz rực rỡ, tích hợp GPS độc lập và thời lượng pin 14 ngày giúp Xiaomi Band 8 Pro trở thành lựa chọn vô dịch phân khúc 1.5 triệu.',
    content: 'Đánh giá vòng đeo tay sức khỏe Xiaomi...',
    tableOfContents: [{ id: '1-man-hinh', title: '1. Màn hình AMOLED 60Hz' }],
    authorId: 'exp-1',
    readingTime: '6 phút đọc',
    publishedAt: '14 Tháng 03, 2024',
    relatedProductIds: ['xiaomi-smart-band-8-pro'],
    tags: ['Sức khỏe', 'Xiaomi', 'Vòng đeo tay thông minh'],
    views: 22300,
    status: 'published'
  },
  // --- BÀI MỚI 6: Top Công Cụ AI Trợ Lý Lập Trình ---
  {
    title: 'Top 7 Công Cụ AI Trợ Lý Lập Trình Giúp Tăng 300% Năng Suất Viết Code Năm 2024',
    slug: 'top-7-cong-cu-ai-tro-ly-lap-trinh-2024',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-code',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Điểm danh các trợ lý AI viết code hàng đầu: GitHub Copilot, Claude 3.5 Sonnet, Cursor IDE, Tabnine và Supermaven giúp giải quyết nhanh bug và tự động viết unit test.',
    content: '### 1. Cuộc cách mạng AI trong ngành phần mềm\nAI không còn dừng lại ở việc gõ nốt đoạn code ngắn mà đã phát triển thành trợ lý ảo hiểu toàn bộ kiến trúc dự án, tự động giải thích lệnh phức tạp và tự tạo Pull Request.\n\n---\n\n### 2. Các công cụ AI viết code đỉnh nhất\n- **GitHub Copilot Enterprise:** Chuẩn mực trợ lý AI cho doanh nghiệp tích hợp sâu vào VS Code và GitHub.\n- **Cursor IDE:** Trình soạn thảo tích hợp AI gốc cho phép hỏi đáp và tự refactor code trên toàn bộ thư mục dự án.',
    tableOfContents: [
      { id: '1-cuoc-cach-mang-ai', title: '1. Cuộc cách mạng AI trong phần mềm' },
      { id: '2-cac-cong-cu-ai-dinh-nhat', title: '2. Các công cụ AI viết code' }
    ],
    authorId: 'exp-3',
    readingTime: '8 phút đọc',
    publishedAt: '21 Tháng 03, 2024',
    relatedProductIds: ['github-copilot-enterprise'],
    tags: ['AI', 'Lập trình', 'GitHub Copilot', 'Sản phẩm số'],
    views: 35600,
    status: 'published',
    isFeatured: true
  },
  // --- BÀI MỚI 7: Đánh Giá Perplexity Pro ---
  {
    title: 'Đánh Giá Perplexity Pro: Công Cụ Tìm Kiếm AI Có Thể Thay Thế Hoàn Toàn Google Search?',
    slug: 'danh-gia-chi-tiet-perplexity-pro-ai',
    type: 'review',
    productType: 'digital',
    categorySlug: 'tro-ly-ai',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Khám phá lý do tại sao Perplexity Pro với tính năng Pro Search và trích dẫn nguồn dẫn tin cậy đang trở thành sự lựa chọn hàng đầu của giới nghiên cứu.',
    content: 'Đánh giá chi tiết công cụ tìm kiếm Perplexity AI...',
    tableOfContents: [{ id: '1-tinh-nang-pro-search', title: '1. Tính năng Pro Search' }],
    authorId: 'exp-3',
    readingTime: '7 phút đọc',
    publishedAt: '20 Tháng 03, 2024',
    relatedProductIds: ['perplexity-pro-ai'],
    tags: ['AI', 'Perplexity', 'Tìm kiếm', 'Sản phẩm số'],
    views: 33800,
    status: 'published'
  },
  // --- BÀI MỚI 8: So Sánh ChatGPT Plus vs Claude vs Perplexity ---
  {
    title: 'So Sánh Chi Tiết ChatGPT Plus vs Claude 3.5 Sonnet vs Perplexity Pro 2024',
    slug: 'so-sanh-chatgpt-plus-vs-claude-35-vs-perplexity-pro',
    type: 'comparison',
    productType: 'digital',
    categorySlug: 'tro-ly-ai',
    coverImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'So sánh đối đầu 3 siêu mô hình AI hàng đầu thế giới ở 4 tiêu chí: Khả năng lập trình, tư duy suy luận, tìm kiếm thời gian thực và sáng tạo nội dung.',
    content: 'So sánh đối đầu 3 mô hình AI lớn nhất...',
    tableOfContents: [{ id: '1-bo-tieu-chi-so-sanh', title: '1. Bộ tiêu chí so sánh' }],
    authorId: 'exp-3',
    readingTime: '9 phút đọc',
    publishedAt: '18 Tháng 03, 2024',
    relatedProductIds: ['perplexity-pro-ai'],
    tags: ['AI', 'ChatGPT', 'Claude', 'Perplexity', 'So sánh'],
    views: 39100,
    status: 'published',
    isTopRanking: true
  },
  // --- BÀI MỚI 9: Cẩm Nang ElevenLabs Sinh Giọng Nói ---
  {
    title: 'Cẩm Nang Sử Dụng ElevenLabs Sinh Giọng Nói AI Chuẩn Như Người Thật Cho Video TikTok & YouTube',
    slug: 'cam-nang-su-dung-elevenlabs-ai-voice',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-media',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Hướng dẫn từ A-Z cách tạo giọng đọc truyền cảm, tùy chỉnh tốc độ ngắt nghỉ và nhân bản giọng đọc cá nhân bằng công nghệ ElevenLabs Prime Voice.',
    content: 'Cẩm nang hướng dẫn sử dụng ElevenLabs AI...',
    tableOfContents: [{ id: '1-voice-cloning', title: '1. Tính năng Voice Cloning' }],
    authorId: 'exp-3',
    readingTime: '6 phút đọc',
    publishedAt: '16 Tháng 03, 2024',
    relatedProductIds: ['elevenlabs-prime-voice-ai'],
    tags: ['AI Media', 'ElevenLabs', 'Giọng nói AI', 'Sáng tạo nội dung'],
    views: 25400,
    status: 'published'
  },
  // --- BÀI MỚI 10: Bí Quyết Sử Dụng Midjourney v6 ---
  {
    title: 'Bí Quyết Viết Prompt Midjourney v6 Để Thiết Kế Hình Ảnh & Banner Đồ Họa Đỉnh Cao',
    slug: 'bi-quyet-viet-prompt-midjourney-v6',
    type: 'guide',
    productType: 'digital',
    categorySlug: 'ai-media',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tổng hợp 20+ cấu trúc prompt chuẩn chuyên gia cho Midjourney v6: Điều chỉnh góc máy, ánh sáng cinematic, tham chiếu phong cách Style Reference và chèn văn bản.',
    content: 'Chi tiết hướng dẫn viết prompt Midjourney v6...',
    tableOfContents: [{ id: '1-cau-truc-prompt-v6', title: '1. Cấu trúc prompt v6 chuẩn' }],
    authorId: 'exp-3',
    readingTime: '7 phút đọc',
    publishedAt: '15 Tháng 03, 2024',
    relatedProductIds: ['midjourney-v6-alpha'],
    tags: ['AI Art', 'Midjourney', 'Thiết kế', 'Prompt Engineering'],
    views: 31800,
    status: 'published'
  }
];

const sampleLeads = [
  {
    email: 'khachhang.demo@gmail.com',
    name: 'Nguyễn Hoàng Nam',
    phone: '0901234567',
    service: 'Nhận bản tin & Cẩm nang chọn mua',
    message: 'Tôi muốn nhận bài đánh giá chi tiết về nồi chiên không dầu và laptop sinh viên.',
    status: 'new',
    source: 'homepage'
  }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techreview';
    console.log('[Seed] Connecting to MongoDB:', mongoURI);
    await mongoose.connect(mongoURI);

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Ranking.deleteMany({}),
      Comparison.deleteMany({}),
      Article.deleteMany({}),
      Expert.deleteMany({}),
      Lead.deleteMany({})
    ]);

    console.log('[Seed] Inserting sample categories...');
    await Category.insertMany(sampleCategories);

    console.log('[Seed] Inserting sample experts...');
    await Expert.insertMany(sampleExperts);

    console.log('[Seed] Inserting sample products...');
    await Product.insertMany(sampleProducts);

    console.log('[Seed] Inserting sample rankings...');
    await Ranking.insertMany(sampleRankings);

    console.log('[Seed] Inserting sample comparisons...');
    await Comparison.insertMany(sampleComparisons);

    console.log('[Seed] Inserting sample articles...');
    await Article.insertMany(sampleArticles);

    console.log('[Seed] Inserting sample leads...');
    await Lead.insertMany(sampleLeads);

    console.log('🎉 [Seed] Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed] Error seeding database:', error);
    process.exit(1);
  }
}

// Export for route usage or run directly via CLI
if (require.main === module) {
  seedDatabase();
}

module.exports = {
  seedDatabase,
  sampleCategories,
  sampleExperts,
  sampleProducts,
  sampleRankings,
  sampleComparisons,
  sampleArticles,
  sampleLeads
};
