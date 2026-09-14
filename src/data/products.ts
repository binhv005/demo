import { Product } from '../types';

export const mockProducts: Product[] = [
  // --- VẬT LÝ 1: AirCook Pro 6L ---
  {
    id: 'prod-aircook-6l',
    name: 'AirCook Pro 6L Smart Fryer',
    slug: 'aircook-pro-6l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'AirCook',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1420,
    price: 2490000,
    originalPrice: 3190000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ quạt đối lưu kép TwinTurbo 360° chín đều không cần lật',
      'Lòng nồi gốm Ceramic chống dính hữu cơ không chứa PTFE/PFOA',
      'Cửa kính cường lực trong suốt kèm đèn LED quan sát món ăn',
      'Kết nối Wi-Fi điều khiển qua app với hơn 100+ công thức nấu Việt Nam'
    ],
    cons: [
      'Dây nguồn hơi ngắn (1.1m), cần đặt gần ổ điện',
      'Kích thước vỏ ngoài khá to chiếm diện tích bếp'
    ],
    bestFor: 'Gia đình 4-6 người muốn nấu ăn nhanh, giảm 85% dầu mỡ',
    shortDescription: 'Nồi chiên không dầu dung tích lớn 6L với kính quan sát trong suốt, công suất 1800W và cảm biến nhiệt độ thông minh NTC.',
    deepReview: 'AirCook Pro 6L là sự kết hợp hoàn hảo giữa thẩm mỹ sang trọng và công nghệ nấu nướng hiện đại. Với công suất mạnh mẽ 1800W cùng luồng nhiệt xoáy 360 độ, sản phẩm giúp thực phẩm giòn rụm bên ngoài và mọng nước bên trong. Mặt kính trong suốt là điểm cộng rất lớn giúp bạn kiểm soát độ chín mà không cần mở khay làm thất thoát nhiệt.',
    specs: {
      'Dung tích': '6.0 Lít',
      'Công suất': '1800W',
      'Dải nhiệt độ': '40°C - 200°C',
      'Bảng điều khiển': 'Cảm ứng một chạm + Màn hình LED',
      'Chất liệu lòng nồi': 'Gốm Ceramic chống dính 5 lớp',
      'Trọng lượng': '5.2 kg',
      'Bảo hành': '24 tháng chính hãng'
    },
    scoreBreakdown: {
      design: 9.5,
      performance: 9.6,
      value: 9.2,
      usability: 9.3
    },
    badge: 'Lựa chọn Tốt nhất',
    status: 'published',
    views: 18450,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10'
  },

  // --- VẬT LÝ 2: HomeChef Dual Fryer ---
  {
    id: 'prod-homechef-dual',
    name: 'HomeChef Dual Zone 9L Master',
    slug: 'homechef-dual-fryer',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'HomeChef',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    score: 9.1,
    ratingCount: 890,
    price: 3690000,
    originalPrice: 4500000,
    priceUnit: 'đ',
    pros: [
      '2 ngăn độc lập dung tích lớn (4.5L + 4.5L) nấu 2 món cùng lúc',
      'Tính năng Sync Finish đồng bộ thời gian hoàn thành của 2 ngăn',
      'Vỏ kim loại chống bám vân tay cao cấp'
    ],
    cons: [
      'Giá thành cao hơn nồi đơn ngăn thông thường',
      'Trọng lượng nặng (7.8kg), ít cơ động'
    ],
    bestFor: 'Gia đình đông người thích nấu nhiều món ăn đa dạng cùng lúc',
    shortDescription: 'Nồi chiên không dầu 2 ngăn độc lập công suất 2400W giúp nấu 2 món khác nhau ở nhiệt độ và thời gian riêng biệt.',
    deepReview: 'HomeChef Dual Zone giải quyết triệt để vấn đề chờ đợi món ăn. Bạn có thể nướng gà ở ngăn A và chiên khoai tây ở ngăn B mà cả hai đều nóng hổi hoàn thành cùng một lúc nhờ công nghệ Sync Cook & Finish.',
    specs: {
      'Dung tích': '9.0 Lít (2 x 4.5L)',
      'Công suất': '2400W',
      'Dải nhiệt độ': '50°C - 220°C',
      'Bảng điều khiển': 'Kép Dual Touchscreen',
      'Chất liệu lòng nồi': 'Hợp kim nhôm phủ Ceramic PTFE Free',
      'Trọng lượng': '7.8 kg',
      'Bảo hành': '24 tháng'
    },
    scoreBreakdown: {
      design: 9.0,
      performance: 9.3,
      value: 8.8,
      usability: 9.2
    },
    badge: 'Đa năng Đỉnh cao',
    status: 'published',
    views: 12100,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-08'
  },

  // --- VẬT LÝ 3: SmartClean Vacuum X2 ---
  {
    id: 'prod-smartclean-x2',
    name: 'SmartClean Robot Vacuum X2 Omni',
    slug: 'smartclean-vacuum-x2',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'robot-hut-bui',
    groupSlug: 'gia-dung',
    brand: 'SmartClean',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 1100,
    price: 14500000,
    originalPrice: 18900000,
    priceUnit: 'đ',
    pros: [
      'Trạm sạc All-in-One: Tự giặt giẻ nước nóng 60°C, sấy khô khí nóng và hút rác',
      'Lực hút cực mạnh 8000Pa hút sạch bụi mịn khe sàn',
      'Hệ thống điều hướng LiDAR 3D + Camera AI tránh vật cản chính xác'
    ],
    cons: [
      'Trạm sạc kích thước lớn cần không gian thoáng',
      'Cần vệ sinh khay nước bẩn định kỳ mỗi 3-4 ngày'
    ],
    bestFor: 'Căn hộ chung cư, nhà phố nhiều tầng cần tự động hóa việc dọn dẹp toàn diện',
    shortDescription: 'Robot hút bụi lau nhà thông minh cao cấp trang bị trạm sạc toàn năng giặt sấy giẻ lau tự động và lực hút 8000Pa.',
    deepReview: 'SmartClean X2 Omni mang lại trải nghiệm rảnh tay đích thực. Nhờ hệ thống chổi kép chống rối tóc và trạm sạc tự giặt giẻ bằng nước nóng, sàn nhà luôn sáng bóng mà không để lại mùi ẩm mốc khó chịu.',
    specs: {
      'Lực hút': '8000 Pa',
      'Dung lượng pin': '5200 mAh (lau dọn 200m²)',
      'Điều hướng': 'LiDAR LDS + Camera RGB AI',
      'Trạm sạc': 'Giặt giẻ nước nóng + Sấy khí nóng + Hút rác 3L',
      'Vượt chướng ngại vật': '20 mm',
      'Bảo hành': '18 tháng'
    },
    scoreBreakdown: {
      design: 9.6,
      performance: 9.5,
      value: 8.9,
      usability: 9.4
    },
    badge: 'Lựa chọn Cao cấp',
    status: 'published',
    views: 15600,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-05'
  },

  // --- VẬT LÝ 4: ProBook 14 Ultra OLED ---
  {
    id: 'prod-probook-14',
    name: 'ProBook 14 Ultra OLED (Intel Core Ultra 7)',
    slug: 'probook-14-m3',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'laptop-sinh-vien',
    groupSlug: 'dien-tu',
    brand: 'ProBook',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1650,
    price: 26990000,
    originalPrice: 29990000,
    priceUnit: 'đ',
    pros: [
      'Màn hình 14 inch 2.8K OLED 120Hz chuẩn màu 100% DCI-P3 sắc nét tuyệt đối',
      'Thời lượng pin thực tế ấn tượng lên đến 14 tiếng làm việc văn phòng',
      'Trọng lượng siêu nhẹ chỉ 1.19kg với khung nhôm nguyên khối cứng cáp',
      'Tích hợp NPU xử lý tác vụ AI mượt mà, bàn phím gõ êm ái'
    ],
    cons: [
      'Màn hình gương hơi bóng khi làm việc dưới ánh nắng gắt trực tiếp',
      'Khả năng nâng cấp RAM bị hàn chết trên bo mạch'
    ],
    bestFor: 'Sinh viên, lập trình viên, nhà sáng tạo nội dung cần máy mỏng nhẹ pin trâu',
    shortDescription: 'Laptop mỏng nhẹ hiệu năng cao với chip Intel Core Ultra 7, màn hình OLED 2.8K 120Hz và pin 14 giờ.',
    deepReview: 'ProBook 14 Ultra OLED là chiếc laptop toàn diện nhất trong phân khúc dưới 30 triệu đồng hiện nay. Sự kết hợp giữa vi xử lý mới tiết kiệm điện, màn hình OLED rực rỡ và thời lượng pin xuất sắc biến đây thành bạn đồng hành lý tưởng cho cả học tập lẫn làm việc.',
    specs: {
      'CPU': 'Intel Core Ultra 7 155H (16 nhân, 22 luồng)',
      'RAM': '32GB LPDDR5X 7467MHz',
      'Ổ cứng': '1TB SSD NVMe PCIe 4.0',
      'Màn hình': '14.0 inch 2.8K (2880x1800) OLED 120Hz 500 nits',
      'Pin': '75 Wh (Lên đến 14 giờ)',
      'Trọng lượng': '1.19 kg',
      'Cổng kết nối': '2x Thunderbolt 4, 1x USB-A, 1x HDMI 2.1, Jack 3.5mm'
    },
    scoreBreakdown: {
      design: 9.7,
      performance: 9.4,
      value: 9.3,
      usability: 9.6
    },
    badge: 'Laptop của năm',
    status: 'published',
    views: 24800,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-12'
  },

  // --- VẬT LÝ 5: SoundMax QuietPro ANC ---
  {
    id: 'prod-soundmax-anc',
    name: 'SoundMax QuietPro ANC Wireless Headphones',
    slug: 'soundmax-anc-pro',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'tai-nghe-chong-on',
    groupSlug: 'dien-tu',
    brand: 'SoundMax',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    score: 9.2,
    ratingCount: 940,
    price: 4890000,
    originalPrice: 5990000,
    priceUnit: 'đ',
    pros: [
      'Chống ồn chủ động thích ứng Hybrid ANC khử 98% tiếng ồn xung quanh',
      'Chất âm Hi-Res Audio với driver Titanium 40mm âm trường rộng',
      'Thời lượng pin khủng 50 giờ (bật ANC 38 giờ)',
      'Đệm tai Memory Foam êm ái đeo liên tục 6 tiếng không đau tai'
    ],
    cons: [
      'Hộp đựng kèm theo hơi cồng kềnh',
      'App tùy chỉnh EQ hơi nhiều tùy chọn với người mới'
    ],
    bestFor: 'Dân văn phòng, người thường xuyên đi máy bay, học tập trong môi trường ồn',
    shortDescription: 'Tai nghe chụp tai chống ồn chủ động cao cấp pin 50 giờ, hỗ trợ codec LDAC và âm thanh không gian 360.',
    deepReview: 'QuietPro ANC cho khả năng triệt tiêu tiếng ồn của động cơ máy bay và tiếng trò chuyện văn phòng cực kỳ hiệu quả. Âm trầm sâu, dải trung ấm áp làm nổi bật giọng hát ca sĩ.',
    specs: {
      'Driver': '40mm Custom Titanium',
      'Thời lượng pin': '50 giờ (Tắt ANC), 38 giờ (Bật ANC)',
      'Sạc nhanh': '10 phút sạc cho 5 giờ nghe qua Type-C',
      'Bluetooth': '5.3 hỗ trợ LDAC, AAC, SBC',
      'Trọng lượng': '245g',
      'Kháng nước': 'IPX4'
    },
    scoreBreakdown: {
      design: 9.3,
      performance: 9.4,
      value: 9.0,
      usability: 9.1
    },
    badge: 'Chống ồn Xuất sắc',
    status: 'published',
    views: 9800,
    createdAt: '2024-02-14',
    updatedAt: '2024-03-01'
  },

  // --- DIGITAL 1: ChatGPT Plus ---
  {
    id: 'prod-chatgpt-plus',
    name: 'ChatGPT Plus & GPT-4o Platform',
    slug: 'chatgpt',
    type: 'digital',
    category: 'Công cụ AI',
    categorySlug: 'tro-ly-ai',
    groupSlug: 'ai',
    brand: 'OpenAI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    score: 9.7,
    ratingCount: 3200,
    price: 499000,
    priceUnit: 'đ/tháng (20$)',
    pros: [
      'Mô hình GPT-4o đa phương thức (xử lý hình ảnh, giọng nói trực tiếp cực nhanh)',
      'Hệ sinh thái Custom GPTs phong phú và tính năng phân tích dữ liệu chuyên sâu',
      'Khả năng duyệt web thời gian thực và sinh ảnh DALL-E 3 liền mạch',
      'Ứng dụng mượt mà trên Web, iOS, Android, macOS và Windows'
    ],
    cons: [
      'Đôi khi vẫn có hiện tượng hallucination (bịa đặt thông tin chuyên sâu)',
      'Giới hạn số lượng tin nhắn GPT-4o mỗi 3 giờ vào giờ cao điểm'
    ],
    bestFor: 'Mọi cá nhân, lập trình viên, nhà nghiên cứu và doanh nghiệp cần trợ lý toàn năng',
    shortDescription: 'Mô hình ngôn ngữ lớn AI dẫn đầu thế giới của OpenAI với khả năng lập trình, phân tích dữ liệu và xử lý giọng nói tự nhiên.',
    deepReview: 'ChatGPT Plus với động cơ GPT-4o tiếp tục giữ vững ngôi vương trợ lý AI toàn diện nhất. Tốc độ phản hồi vượt trội, khả năng hiểu bối cảnh và code đa ngôn ngữ chính xác khiến đây là công cụ đáng giá từng xu cho bất kỳ người làm việc tri thức nào.',
    specs: {
      'Mô hình AI': 'GPT-4o, GPT-4 Turbo, GPT-3.5',
      'Context Window': '128,000 Tokens (~300 trang sách)',
      'Đa phương thức': 'Text, Audio, Vision (Hình ảnh), Code Interpreter',
      'Custom GPTs': 'Có hỗ trợ tạo và sử dụng kho GPTs',
      'Nền tảng hỗ trợ': 'Web, iOS, Android, macOS App, Windows App'
    },
    scoreBreakdown: {
      design: 9.6,
      performance: 9.8,
      value: 9.7,
      usability: 9.7
    },
    badge: 'AI Số 1 Thế giới',
    status: 'published',
    views: 42000,
    createdAt: '2023-11-10',
    updatedAt: '2024-03-14'
  },

  // --- DIGITAL 2: Claude 3.5 Sonnet ---
  {
    id: 'prod-claude-sonnet',
    name: 'Claude 3.5 Sonnet & Claude Pro',
    slug: 'claude-3-5-sonnet',
    type: 'digital',
    category: 'Công cụ AI',
    categorySlug: 'tro-ly-ai',
    groupSlug: 'ai',
    brand: 'Anthropic',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 1980,
    price: 499000,
    priceUnit: 'đ/tháng (20$)',
    pros: [
      'Khả năng viết code, debug và refactor kiến trúc phần mềm số 1 thị trường',
      'Tính năng Artifacts xem trước UI website, sơ đồ trực tiếp trong khung chat',
      'Văn phong tự nhiên, thấu hiểu sắc thái tiếng Việt và viết lách cực kỳ sâu sắc',
      'Cửa sổ ngữ cảnh khổng lồ 200K tokens đọc tài liệu PDF dài chuẩn xác'
    ],
    cons: [
      'Không hỗ trợ sinh hình ảnh trực tiếp (như DALL-E)',
      'Chưa có chế độ hội thoại giọng nói real-time như GPT-4o Voice'
    ],
    bestFor: 'Lập trình viên phần mềm, kiến trúc sư hệ thống, copywriter và chuyên viên phân tích tài liệu',
    shortDescription: 'Mô hình AI đỉnh cao từ Anthropic với khả năng lập trình siêu hạng và tính năng Artifacts tương tác trực quan.',
    deepReview: 'Claude 3.5 Sonnet đã tạo nên một cuộc cách mạng trong giới lập trình và viết lách. Tính năng Artifacts cho phép bạn vừa yêu cầu AI code component vừa xem demo chạy thử ngay bên cạnh. Khả năng suy luận logic và độ chính xác của code tạo ra vượt trội hơn hầu hết đối thủ.',
    specs: {
      'Mô hình AI': 'Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku',
      'Context Window': '200,000 Tokens (~500 trang tài liệu)',
      'Tính năng nổi bật': 'Artifacts (Live UI & Code Preview), Document Analysis',
      'Xử lý Code': 'Top 1 HumanEval Benchmark',
      'Nền tảng hỗ trợ': 'Web, iOS, Android'
    },
    scoreBreakdown: {
      design: 9.7,
      performance: 9.9,
      value: 9.5,
      usability: 9.5
    },
    badge: 'Code & Logic Tốt nhất',
    status: 'published',
    views: 31000,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-12'
  },

  // --- DIGITAL 3: Notion Workspace ---
  {
    id: 'prod-notion-workspace',
    name: 'Notion Workspace & Notion AI',
    slug: 'notion',
    type: 'digital',
    category: 'Phần mềm & Ứng dụng',
    categorySlug: 'ghi-chu',
    groupSlug: 'phan-mem',
    brand: 'Notion Labs',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 2800,
    price: 0,
    originalPrice: 240000,
    priceUnit: 'Bản Free / Plus 8$/tháng',
    pros: [
      'Giao diện cực kỳ đẹp, tối giản, tổ chức dữ liệu dạng khối (blocks) linh hoạt',
      'Hệ thống Database liên kết quan hệ (Relation & Rollup) siêu mạnh mẽ',
      'Notion AI hỏi đáp trực tiếp trên toàn bộ kho tài liệu doanh nghiệp Q&A',
      'Kho Template cộng đồng hàng triệu mẫu cho học tập, CRM, tài chính'
    ],
    cons: [
      'Tốc độ tải hơi chậm khi database chứa hàng chục nghìn dòng',
      'Hỗ trợ chế độ ngoại tuyến (offline) còn hạn chế'
    ],
    bestFor: 'Cá nhân quản lý cuộc sống, nhóm làm việc startup, học sinh sinh viên',
    shortDescription: 'Không gian làm việc tất cả trong một (All-in-one workspace) kết hợp ghi chú, quản lý dự án, wiki công ty và trợ lý AI.',
    deepReview: 'Notion đã định nghĩa lại cách chúng ta ghi chú và làm việc nhóm. Khả năng biến một trang trắng thành hệ thống CRM, Kanban board hoặc trang web công khai chỉ trong vài cú click chuột là trải nghiệm chưa có công cụ nào vượt qua.',
    specs: {
      'Mô hình định giá': 'Freemium (Gói Free đầy đủ tính năng cá nhân)',
      'Dung lượng lưu trữ': 'Không giới hạn trên gói trả phí',
      'Tính năng AI': 'Notion AI (Hỏi đáp, tóm tắt, viết tự động)',
      'Tích hợp': 'Slack, GitHub, Figma, Google Drive, Zapier',
      'Nền tảng': 'Web, macOS, Windows, iOS, Android'
    },
    scoreBreakdown: {
      design: 9.8,
      performance: 8.9,
      value: 9.6,
      usability: 9.3
    },
    badge: 'Ghi chú & Wiki Số 1',
    status: 'published',
    views: 38000,
    createdAt: '2023-12-01',
    updatedAt: '2024-03-10'
  },

  // --- DIGITAL 4: Figma Design Platform ---
  {
    id: 'prod-figma-design',
    name: 'Figma Collaborative UI/UX Platform',
    slug: 'figma',
    type: 'digital',
    category: 'Phần mềm & Ứng dụng',
    categorySlug: 'thiet-ke',
    groupSlug: 'phan-mem',
    brand: 'Figma',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932694b?auto=format&fit=crop&w=800&q=80',
    score: 9.8,
    ratingCount: 4100,
    price: 0,
    priceUnit: 'Bản Free / Pro 12$/tháng',
    pros: [
      'Cộng tác thời gian thực nhiều người mượt mà nhất trong thế giới thiết kế',
      'Auto Layout, Variables, Component Variants cực kỳ mạnh mẽ sát với code thật',
      'Chế độ Dev Mode trích xuất mã CSS, React, Swift trực quan cho lập trình viên',
      'Hệ sinh thái Plugin và Community Widget phong phú vô tận'
    ],
    cons: [
      'Yêu cầu kết nối mạng ổn định để làm việc nhóm',
      'Giá Dev Mode gói doanh nghiệp tách riêng tăng chi phí'
    ],
    bestFor: 'UI/UX Designer, Product Manager, Web Designer và Developer',
    shortDescription: 'Công cụ thiết kế giao diện, vẽ prototype và hệ thống Design System cộng tác thời gian thực tiêu chuẩn công nghiệp.',
    deepReview: 'Figma là tiêu chuẩn vàng không thể thay thế trong ngành thiết kế sản phẩm số. Khả năng làm việc đồng thời của nhiều designer trên cùng một file canvas lớn mà không hề lag giật là kỳ tích công nghệ.',
    specs: {
      'Hệ điều hành': 'Web Browser, macOS, Windows',
      'Tính năng cốt lõi': 'Auto Layout 5.0, Interactive Prototype, Dev Mode, FigJam',
      'Design System': 'Variables, Color Styles, Tokenized Components',
      'File Export': 'PNG, JPG, SVG, PDF, Code Snippets'
    },
    scoreBreakdown: {
      design: 9.9,
      performance: 9.8,
      value: 9.6,
      usability: 9.7
    },
    badge: 'Tiêu chuẩn Thiết kế',
    status: 'published',
    views: 45000,
    createdAt: '2023-10-05',
    updatedAt: '2024-03-11'
  },

  // --- DIGITAL 5: ClickUp Project Suite ---
  {
    id: 'prod-clickup-suite',
    name: 'ClickUp 3.0 All-in-One Productivity',
    slug: 'clickup',
    type: 'digital',
    category: 'Phần mềm & Ứng dụng',
    categorySlug: 'quan-ly-du-an',
    groupSlug: 'phan-mem',
    brand: 'ClickUp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    score: 9.2,
    ratingCount: 1540,
    price: 175000,
    priceUnit: 'đ/tháng (7$)',
    pros: [
      'Đầy đủ mọi chế độ xem: Kanban, Gantt chart, List, Calendar, Mind Map',
      'Khả năng tự động hóa quy trình (Automations) không cần code',
      'Tích hợp tính năng theo dõi thời gian (Time Tracking) và báo cáo tiến độ chi tiết'
    ],
    cons: [
      'Giao diện nhiều tính năng nên mất thời gian làm quen ban đầu (Learning curve)',
      'Ứng dụng di động đôi lúc tải chậm hơn bản web'
    ],
    bestFor: 'Nhóm phát triển phần mềm Agile, Agency tiếp thị và quản lý dự án đa ngành',
    shortDescription: 'Nền tảng quản lý dự án toàn diện thay thế nhiều ứng dụng rời rạc với hơn 15 chế độ xem công việc và tích hợp AI.',
    deepReview: 'ClickUp 3.0 đã cải thiện vượt bậc tốc độ tải trang. Khả năng tùy biến trường dữ liệu, phân quyền chi tiết và bảng điều khiển Dashboard báo cáo tiến độ theo thời gian thực giúp người quản lý kiểm soát 100% công việc.',
    specs: {
      'Chế độ xem': '15+ Views (Gantt, Board, List, Box, Timeline...)',
      'Automation': '100+ mẫu tự động hóa dựng sẵn',
      'Tích hợp': 'GitHub, GitLab, Slack, Google Calendar, HubSpot',
      'Bảo mật': 'SOC 2 Type II, GDPR compliant, 2FA'
    },
    scoreBreakdown: {
      design: 9.0,
      performance: 9.1,
      value: 9.4,
      usability: 9.1
    },
    badge: 'Quản lý Dự án Tối ưu',
    status: 'published',
    views: 19800,
    createdAt: '2024-01-18',
    updatedAt: '2024-03-09'
  },

  // --- DIGITAL 6: NordVPN Plus ---
  {
    id: 'prod-nordvpn-plus',
    name: 'NordVPN Plus Security Suite',
    slug: 'nordvpn',
    type: 'digital',
    category: 'VPN & Bảo mật',
    categorySlug: 'vpn-toc-do-cao',
    groupSlug: 'vpn',
    brand: 'Nord Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 2200,
    price: 99000,
    priceUnit: 'đ/tháng (gói 2 năm)',
    pros: [
      'Tốc độ kết nối siêu nhanh nhờ giao thức độc quyền NordLynx (WireGuard)',
      'Hơn 6000+ máy chủ tại 111 quốc gia vượt tường lửa và xem phim 4K mượt mà',
      'Tính năng Threat Protection Pro chặn quảng cáo độc hại và quét mã độc',
      'Chính sách Không lưu nhật ký (Strict No-Logs Policy) được PwC & Deloitte kiểm toán độc lập'
    ],
    cons: [
      'Gói mua lẻ theo từng tháng giá cao hơn nhiều so với gói 2 năm',
      'Giao diện bản đồ đôi lúc chọn server trên mobile hơi nhạy'
    ],
    bestFor: 'Người cần bảo mật Wi-Fi công cộng, stream phim quốc tế, tải torrent an toàn',
    shortDescription: 'Mạng riêng ảo VPN bảo mật hàng đầu thế giới với tốc độ cực nhanh, bảo vệ dữ liệu và mở khóa nội dung toàn cầu.',
    deepReview: 'NordVPN luôn dẫn đầu trong các bài test tốc độ băng thông thực tế của chúng tôi. Với giao thức NordLynx, tốc độ suy hao khi kết nối máy chủ Singapore hay Mỹ chỉ dưới 5%, hoàn toàn xem được phim 4K không giật lag.',
    specs: {
      'Số lượng máy chủ': '6,400+ máy chủ tại 111 quốc gia',
      'Giao thức': 'NordLynx, OpenVPN (UDP/TCP), IKEv2/IPsec',
      'Thiết bị đồng thời': '10 thiết bị cùng lúc',
      'Tính năng bảo vệ': 'Kill Switch, Double VPN, Threat Protection Pro, Meshnet',
      'Nền tảng': 'Windows, macOS, Linux, Android, iOS, Android TV, Router'
    },
    scoreBreakdown: {
      design: 9.4,
      performance: 9.6,
      value: 9.3,
      usability: 9.4
    },
    badge: 'VPN Tốt nhất 2024',
    status: 'published',
    views: 21500,
    createdAt: '2023-11-20',
    updatedAt: '2024-03-07'
  }
];
