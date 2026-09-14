import { Category } from '../types';

export const mockCategories: Category[] = [
  // --- SẢN PHẨM VẬT LÝ ---
  {
    id: 'cat-gd',
    name: 'Gia dụng',
    slug: 'gia-dung',
    group: 'physical',
    groupSlug: 'gia-dung',
    icon: 'Utensils',
    description: 'Thiết bị nhà bếp thông minh, thiết bị làm sạch gia đình và nâng cao chất lượng cuộc sống.',
    count: 142,
    subcategories: [
      { id: 'sub-gd-1', name: 'Nồi chiên không dầu', slug: 'noi-chien', count: 38 },
      { id: 'sub-gd-2', name: 'Robot hút bụi', slug: 'robot-hut-bui', count: 42 },
      { id: 'sub-gd-3', name: 'Máy lọc không khí', slug: 'may-loc-khong-khi', count: 32 },
      { id: 'sub-gd-4', name: 'Máy pha cà phê', slug: 'may-pha-ca-phe', count: 30 }
    ],
    featuredRankingSlug: 'noi-chien-khong-dau',
    status: 'active'
  },
  {
    id: 'cat-dt',
    name: 'Điện tử & Công nghệ',
    slug: 'dien-tu',
    group: 'physical',
    groupSlug: 'dien-tu',
    icon: 'Laptop',
    description: 'Laptop làm việc, máy tính học sinh sinh viên, tai nghe chống ồn và phụ kiện công nghệ cao.',
    count: 185,
    subcategories: [
      { id: 'sub-dt-1', name: 'Laptop sinh viên & văn phòng', slug: 'laptop-sinh-vien', count: 54 },
      { id: 'sub-dt-2', name: 'Tai nghe chống ồn', slug: 'tai-nghe-chong-on', count: 46 },
      { id: 'sub-dt-3', name: 'Màn hình công thái học', slug: 'man-hinh', count: 35 },
      { id: 'sub-dt-4', name: 'Bàn phím cơ', slug: 'ban-phim-co', count: 50 }
    ],
    featuredRankingSlug: 'laptop-sinh-vien',
    status: 'active'
  },
  {
    id: 'cat-sk',
    name: 'Sức khỏe & Đời sống',
    slug: 'suc-khoe',
    group: 'physical',
    groupSlug: 'suc-khoe',
    icon: 'HeartPulse',
    description: 'Thiết bị chăm sóc sức khỏe cá nhân, máy massage và theo dõi chỉ số cơ thể chính xác.',
    count: 96,
    subcategories: [
      { id: 'sub-sk-1', name: 'Đồng hồ theo dõi sức khỏe', slug: 'dong-ho-suc-khoe', count: 34 },
      { id: 'sub-sk-2', name: 'Máy massage cổ vai gáy', slug: 'may-massage', count: 28 },
      { id: 'sub-sk-3', name: 'Cân điện tử thông minh', slug: 'can-dien-tu', count: 20 },
      { id: 'sub-sk-4', name: 'Bàn chải điện', slug: 'ban-chai-dien', count: 14 }
    ],
    status: 'active'
  },
  {
    id: 'cat-tt',
    name: 'Thời trang & Phụ kiện',
    slug: 'thoi-trang',
    group: 'physical',
    groupSlug: 'thoi-trang',
    icon: 'ShoppingBag',
    description: 'Balo công nghệ, giày chạy bộ êm chân và phụ kiện thời trang bền bỉ phong cách hiện đại.',
    count: 110,
    subcategories: [
      { id: 'sub-tt-1', name: 'Balo chống nước', slug: 'balo-chong-nuoc', count: 35 },
      { id: 'sub-tt-2', name: 'Giày chạy bộ', slug: 'giay-chay-bo', count: 45 },
      { id: 'sub-tt-3', name: 'Kính mắt chống tia UV', slug: 'kinh-mat', count: 30 }
    ],
    status: 'active'
  },
  {
    id: 'cat-mb',
    name: 'Mẹ & Bé',
    slug: 'me-va-be',
    group: 'physical',
    groupSlug: 'me-va-be',
    icon: 'Baby',
    description: 'Các sản phẩm an toàn chuẩn y tế cho mẹ bầu và chăm sóc bé yêu thông minh.',
    count: 78,
    subcategories: [
      { id: 'sub-mb-1', name: 'Máy tiệt trùng bình sữa', slug: 'may-tiet-trung', count: 24 },
      { id: 'sub-mb-2', name: 'Ghế ngồi ô tô cho bé', slug: 'ghe-o-to', count: 28 },
      { id: 'sub-mb-3', name: 'Xe đẩy gấp gọn', slug: 'xe-day', count: 26 }
    ],
    status: 'active'
  },
  {
    id: 'cat-tht',
    name: 'Thể thao & Dã ngoại',
    slug: 'the-thao',
    group: 'physical',
    groupSlug: 'the-thao',
    icon: 'Trophy',
    description: 'Trang thiết bị rèn luyện thể thao tại nhà và phụ kiện cắm trại, trekking bền chắc.',
    count: 82,
    subcategories: [
      { id: 'sub-tht-1', name: 'Thảm yoga chống trượt', slug: 'tham-yoga', count: 26 },
      { id: 'sub-tht-2', name: 'Dây kháng lực', slug: 'day-khang-luc', count: 22 },
      { id: 'sub-tht-3', name: 'Xe đạp gấp đường phố', slug: 'xe-dap-gap', count: 34 }
    ],
    status: 'active'
  },

  // --- SẢN PHẨM SỐ ---
  {
    id: 'cat-ai',
    name: 'Công cụ AI',
    slug: 'ai',
    group: 'digital',
    groupSlug: 'ai',
    icon: 'Sparkles',
    description: 'Các mô hình ngôn ngữ lớn, AI tạo ảnh nghệ thuật, sinh mã code và tự động hóa công việc.',
    count: 160,
    subcategories: [
      { id: 'sub-ai-1', name: 'Trợ lý AI & LLM', slug: 'tro-ly-ai', count: 48 },
      { id: 'sub-ai-2', name: 'AI Tạo hình ảnh & Video', slug: 'ai-tao-anh', count: 52 },
      { id: 'sub-ai-3', name: 'AI Viết bài & Marketing', slug: 'ai-copywriting', count: 35 },
      { id: 'sub-ai-4', name: 'AI Hỗ trợ lập trình', slug: 'ai-coding', count: 25 }
    ],
    featuredRankingSlug: 'cong-cu-ai-tot-nhat',
    status: 'active'
  },
  {
    id: 'cat-pm',
    name: 'Phần mềm & Ứng dụng',
    slug: 'phan-mem',
    group: 'digital',
    groupSlug: 'phan-mem',
    icon: 'AppWindow',
    description: 'Phần mềm quản lý công việc, ghi chú kiến thức (PKM), thiết kế đồ họa và quản trị dự án.',
    count: 140,
    subcategories: [
      { id: 'sub-pm-1', name: 'Quản lý dự án & Task', slug: 'quan-ly-du-an', count: 42 },
      { id: 'sub-pm-2', name: 'Ghi chú & Quản lý tri thức', slug: 'ghi-chu', count: 38 },
      { id: 'sub-pm-3', name: 'Thiết kế UI/UX & Đồ họa', slug: 'thiet-ke', count: 32 },
      { id: 'sub-pm-4', name: 'Chỉnh sửa Video chuyên nghiệp', slug: 'video-editing', count: 28 }
    ],
    featuredRankingSlug: 'phan-mem-quan-ly-du-an',
    status: 'active'
  },
  {
    id: 'cat-host',
    name: 'Hosting & Server',
    slug: 'hosting',
    group: 'digital',
    groupSlug: 'hosting',
    icon: 'Server',
    description: 'Dịch vụ lưu trữ web tốc độ cao, Cloud VPS, Managed WordPress và tên miền uy tín.',
    count: 65,
    subcategories: [
      { id: 'sub-host-1', name: 'Managed WordPress Hosting', slug: 'wp-hosting', count: 22 },
      { id: 'sub-host-2', name: 'Cloud VPS giá rẻ', slug: 'cloud-vps', count: 25 },
      { id: 'sub-host-3', name: 'Dedicated Server', slug: 'dedicated-server', count: 18 }
    ],
    status: 'active'
  },
  {
    id: 'cat-vpn',
    name: 'VPN & Bảo mật',
    slug: 'vpn',
    group: 'digital',
    groupSlug: 'vpn',
    icon: 'ShieldCheck',
    description: 'Mạng riêng ảo tốc độ cao, trình quản lý mật khẩu an toàn và phần mềm chống virus hàng đầu.',
    count: 55,
    subcategories: [
      { id: 'sub-vpn-1', name: 'VPN Tốc độ cao', slug: 'vpn-toc-do-cao', count: 25 },
      { id: 'sub-vpn-2', name: 'Trình quản lý mật khẩu', slug: 'password-manager', count: 18 },
      { id: 'sub-vpn-3', name: 'Bảo mật Endpoint', slug: 'antivirus', count: 12 }
    ],
    status: 'active'
  },
  {
    id: 'cat-mkt',
    name: 'Marketing & SEO',
    slug: 'marketing',
    group: 'digital',
    groupSlug: 'marketing',
    icon: 'TrendingUp',
    description: 'Bộ công cụ phân tích từ khóa, theo dõi đối thủ, gửi email marketing tự động hóa.',
    count: 72,
    subcategories: [
      { id: 'sub-mkt-1', name: 'Công cụ nghiên cứu SEO', slug: 'seo-tools', count: 26 },
      { id: 'sub-mkt-2', name: 'Email Marketing Platform', slug: 'email-marketing', count: 24 },
      { id: 'sub-mkt-3', name: 'CRM & Bán hàng', slug: 'crm', count: 22 }
    ],
    status: 'active'
  },
  {
    id: 'cat-edu',
    name: 'Khóa học & Nền tảng học tập',
    slug: 'khoa-hoc',
    group: 'digital',
    groupSlug: 'khoa-hoc',
    icon: 'GraduationCap',
    description: 'Các khóa học trực tuyến thực chiến về lập trình, thiết kế, kỹ năng số và ngoại ngữ.',
    count: 60,
    subcategories: [
      { id: 'sub-edu-1', name: 'Khóa học Lập trình Web', slug: 'hoc-lap-trinh', count: 25 },
      { id: 'sub-edu-2', name: 'Khóa học AI & Data', slug: 'hoc-ai', count: 20 },
      { id: 'sub-edu-3', name: 'Khóa học UI/UX Design', slug: 'hoc-design', count: 15 }
    ],
    status: 'active'
  }
];
