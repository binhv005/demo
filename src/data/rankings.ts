import { Ranking } from '../types';

export const mockRankings: Ranking[] = [
  // --- RANKING 1: Nồi chiên không dầu ---
  {
    id: 'rank-noi-chien',
    title: 'Top Nồi Chiên Không Dầu Tốt Nhất 2024: Đã Thử Nghiệm & So Sánh Thực Tế',
    slug: 'noi-chien-khong-dau',
    type: 'physical',
    groupSlug: 'gia-dung',
    categorySlug: 'noi-chien',
    subtitle: 'Đội ngũ chuyên gia của chúng tôi đã thử nghiệm chiên nướng hơn 20 mẫu nồi chiên trong 90 ngày để tìm ra sản phẩm giòn đều, an toàn và dễ vệ sinh nhất.',
    updatedAt: '12 Tháng 03, 2024',
    authorId: 'expert-1',
    intro: 'Nồi chiên không dầu đã trở thành thiết bị không thể thiếu trong gian bếp hiện đại. Để giúp bạn lựa chọn đúng chiếc nồi phù hợp với nhu cầu gia đình, chúng tôi đánh giá các yếu tố: hiệu suất nhiệt luân chuyển, độ chín đều của món ăn, chất lượng lớp chống dính và độ bền bỉ khi sử dụng hàng ngày.',
    methodology: 'Quy trình thử nghiệm tiêu chuẩn: Mỗi sản phẩm trải qua 5 bài test nấu thực tế: chiên khoai tây đông lạnh (kiểm tra độ giòn đồng đều), nướng gà nguyên con 1.8kg (kiểm tra khả năng tỏa nhiệt lõi), nướng bánh bông lan (kiểm tra độ ổn định nhiệt), thử độ ồn bằng máy đo Decibel và test rửa lớp chống dính 30 lần bằng miếng xốp mềm.',
    quickPicks: {
      bestOverallId: 'prod-aircook-6l',
      bestValueId: 'prod-aircook-6l',
      bestPremiumId: 'prod-homechef-dual'
    },
    items: [
      {
        rank: 1,
        productId: 'prod-aircook-6l',
        highlight: 'Lựa chọn Tốt nhất Tổng thể',
        verdict: 'AirCook Pro 6L đạt điểm số cao nhất nhờ quạt đối lưu kép giúp nhiệt phân bổ cực kỳ đồng đều, cửa kính quan sát tiện dụng và lớp men gốm Ceramic an toàn tuyệt đối cho sức khỏe.',
        customPros: ['Nhiệt độ cực đều không cần lật trở', 'Mặt kính đèn LED quan sát trực tiếp món ăn', 'Men gốm Ceramic cao cấp'],
        customCons: ['Thân máy chiếm diện tích mặt bếp']
      },
      {
        rank: 2,
        productId: 'prod-homechef-dual',
        highlight: 'Lựa chọn Đa năng & Dung tích lớn',
        verdict: 'HomeChef Dual Zone 9L là cứu tinh cho gia đình đông người hoặc các bữa tiệc với khả năng nấu 2 món cùng lúc ở 2 mức nhiệt riêng biệt.',
        customPros: ['2 ngăn độc lập công suất mạnh 2400W', 'Đồng bộ thời gian nấu Sync Finish'],
        customCons: ['Giá thành cao và trọng lượng nặng']
      }
    ],
    conclusion: 'Nếu bạn cần một chiếc nồi chiên gia đình 4-6 người dễ dùng, chất lượng hoàn thiện cao cấp và chiên giòn đỉnh cao, AirCook Pro 6L là lựa chọn tối ưu nhất. Với gia đình đông người hơn cần chế biến đồng thời nhiều món, HomeChef Dual Zone 9L hoàn toàn xứng đáng với mức giá cao cấp.',
    faq: [
      {
        q: 'Nồi chiên không dầu có thực sự tốt cho sức khỏe hơn chiên truyền thống?',
        a: 'Có. Các thử nghiệm chỉ ra nồi chiên không dầu giúp giảm đến 70-85% lượng chất béo nạp vào cơ thể so với phương pháp chiên ngập dầu truyền thống trong khi vẫn giữ được độ giòn rụm của vỏ thực phẩm.'
      },
      {
        q: 'Nên chọn lòng nồi chống dính Teflon hay Ceramic?',
        a: 'Lớp chống dính gốm Ceramic (không chứa PTFE/PFOA) an toàn hơn ở nhiệt độ cao trên 200°C và có độ bền chống trầy xước cao hơn so với lớp chống dính thông thường.'
      },
      {
        q: 'Dung tích bao nhiêu lít là phù hợp cho gia đình 4 người?',
        a: 'Dung tích từ 5.5L đến 6.5L là lý tưởng nhất, đủ để nướng vừa một con gà nguyên con nặng 1.5 - 2kg mà không cần chặt nhỏ.'
      }
    ],
    status: 'published'
  },

  // --- RANKING 2: Laptop Sinh viên & Văn phòng ---
  {
    id: 'rank-laptop-sv',
    title: 'Top Laptop Mỏng Nhẹ Cho Sinh Viên & Dân Văn Phòng Tốt Nhất 2024',
    slug: 'laptop-sinh-vien',
    type: 'physical',
    groupSlug: 'dien-tu',
    categorySlug: 'laptop-sinh-vien',
    subtitle: 'Đánh giá chi tiết dựa trên thời lượng pin thực tế, chất lượng màn hình OLED và bàn phím gõ êm ái cho người thường xuyên di chuyển.',
    updatedAt: '10 Tháng 03, 2024',
    authorId: 'expert-1',
    intro: 'Sinh viên và người làm việc hiện đại cần một cỗ máy không chỉ mượt mà khi xử lý đa nhiệm mà còn phải nhẹ nhàng trong balo và pin đủ dùng cả ngày mà không cần mang củ sạc cồng kềnh.',
    methodology: 'Chúng tôi đo thời lượng pin bằng script tự động duyệt 20 tab Chrome + phát video 1080p ở độ sáng 200 nits, đo độ phủ màu màn hình bằng thiết bị quang phổ SpyderX Elite và kiểm tra nhiệt độ thân máy khi render video.',
    quickPicks: {
      bestOverallId: 'prod-probook-14',
      bestValueId: 'prod-probook-14',
      bestPremiumId: 'prod-probook-14'
    },
    items: [
      {
        rank: 1,
        productId: 'prod-probook-14',
        highlight: 'Laptop Mỏng Nhẹ Toàn Diện Nhất',
        verdict: 'ProBook 14 Ultra OLED thống trị bảng xếp hạng với màn hình 2.8K OLED 120Hz rực rỡ, vi xử lý Intel Core Ultra tiết kiệm điện và pin thực tế lên đến 14 tiếng.',
        customPros: ['Màn hình OLED 2.8K 120Hz siêu đẹp', 'Thời lượng pin ấn tượng 14h', 'Trọng lượng chỉ 1.19kg'],
        customCons: ['RAM hàn chết không nâng cấp thêm được']
      }
    ],
    conclusion: 'ProBook 14 Ultra OLED là chiếc máy tính xách tay cân bằng xuất sắc nhất giữa tính cơ động, độ bền khung vỏ, màn hình xuất sắc và thời lượng pin.',
    faq: [
      {
        q: 'Nên chọn RAM 16GB hay 32GB cho nhu cầu học tập và văn phòng?',
        a: 'Với các tác vụ học tập, văn phòng cơ bản và duyệt web nhiều tab, 16GB là đủ. Nếu bạn làm lập trình, chỉnh sửa ảnh/video hoặc dùng các mô hình AI cục bộ, hãy ưu tiên 32GB.'
      }
    ],
    status: 'published'
  },

  // --- RANKING 3: Công cụ AI ---
  {
    id: 'rank-ai-tools',
    title: 'Top Công Cụ AI Tốt Nhất 2024 Giúp Tăng Năng Suất Làm Việc Gấp 10 Lần',
    slug: 'cong-cu-ai-tot-nhat',
    type: 'digital',
    groupSlug: 'ai',
    categorySlug: 'tro-ly-ai',
    subtitle: 'So sánh chuyên sâu các mô hình trí tuệ nhân tạo hàng đầu thế giới về khả năng lập trình, viết lách, phân tích dữ liệu và tư duy logic.',
    updatedAt: '14 Tháng 03, 2024',
    authorId: 'expert-2',
    intro: 'Trí tuệ nhân tạo (AI) đang tái định hình toàn bộ cách con người làm việc và sáng tạo. Lựa chọn đúng công cụ AI sẽ giúp bạn tiết kiệm hàng chục giờ lao động mỗi tuần.',
    methodology: 'Thử nghiệm qua bộ 100 câu hỏi logic phức tạp, 50 bài toán lập trình thuật toán và kiến trúc Full-stack, và kiểm tra độ chính xác khi đọc tài liệu PDF dài hơn 200 trang.',
    quickPicks: {
      bestOverallId: 'prod-chatgpt-plus',
      bestValueId: 'prod-claude-sonnet',
      bestPremiumId: 'prod-chatgpt-plus'
    },
    items: [
      {
        rank: 1,
        productId: 'prod-chatgpt-plus',
        highlight: 'Trợ lý AI Toàn Năng Nhất Thế Giới',
        verdict: 'ChatGPT Plus với GPT-4o dẫn đầu về sự đa dụng: hỗ trợ giọng nói tự nhiên, phân tích dữ liệu chuyên sâu và kho GPTs phong phú.',
        customPros: ['Đa phương thức real-time tốc độ cao', 'Hệ sinh thái Custom GPTs khổng lồ'],
        customCons: ['Giới hạn tin nhắn trong giờ cao điểm']
      },
      {
        rank: 2,
        productId: 'prod-claude-sonnet',
        highlight: 'Khả năng Lập trình & Viết Lách Số 1',
        verdict: 'Claude 3.5 Sonnet gây kinh ngạc với tính năng Artifacts xem trước UI tương tác và khả năng tạo mã code sạch, chuẩn xác nhất thị trường.',
        customPros: ['Artifacts xem trước UI trực tiếp', 'Khả năng code và debug siêu hạng', 'Văn phong tự nhiên'],
        customCons: ['Chưa hỗ trợ sinh hình ảnh DALL-E']
      }
    ],
    conclusion: 'Nếu bạn cần một trợ lý AI toàn diện cho mọi tác vụ từ hội thoại, hình ảnh đến duyệt web, hãy chọn ChatGPT Plus. Nếu bạn là lập trình viên hoặc người sáng tạo nội dung văn bản chuyên sâu, Claude 3.5 Sonnet là người chiến thắng không thể bàn cãi.',
    faq: [
      {
        q: 'Nên trả phí cho ChatGPT Plus hay Claude Pro?',
        a: 'Nếu bạn ưu tiên lập trình và phân tích tài liệu dài, Claude Pro vượt trội hơn nhờ Artifacts và context 200K tokens. Nếu bạn cần đa phương thức (giọng nói, sinh ảnh DALL-E, duyệt web thời gian thực), ChatGPT Plus là lựa chọn toàn diện hơn.'
      }
    ],
    status: 'published'
  },

  // --- RANKING 4: Phần mềm quản lý dự án ---
  {
    id: 'rank-project-mgmt',
    title: 'Top Phần Mềm Quản Lý Dự Án & Công Việc Tốt Nhất 2024 Cho Nhóm & Doanh Nghiệp',
    slug: 'phan-mem-quan-ly-du-an',
    type: 'digital',
    groupSlug: 'phan-mem',
    categorySlug: 'quan-ly-du-an',
    subtitle: 'Đánh giá các giải pháp tối ưu hóa năng suất, quản lý tiến độ Kanban/Gantt và tự động hóa công việc cho nhóm từ 5 đến 500 thành viên.',
    updatedAt: '09 Tháng 03, 2024',
    authorId: 'expert-2',
    intro: 'Một công cụ quản lý dự án hiệu quả giúp mọi thành viên nắm rõ deadline, giảm 50% thời gian họp báo cáo tiến độ và đảm bảo dự án về đích đúng hạn.',
    methodology: 'Đánh giá dựa trên tốc độ khởi tạo task, sự linh hoạt của các chế độ xem (Kanban, Gantt, Timeline), khả năng tự động hóa không cần code và mức độ thân thiện của giao diện.',
    quickPicks: {
      bestOverallId: 'prod-clickup-suite',
      bestValueId: 'prod-notion-workspace',
      bestPremiumId: 'prod-clickup-suite'
    },
    items: [
      {
        rank: 1,
        productId: 'prod-clickup-suite',
        highlight: 'Tính Năng Đầy Đủ & Tùy Biến Tối Đa',
        verdict: 'ClickUp 3.0 cung cấp mọi công cụ cần thiết cho nhóm dự án chuyên nghiệp từ bảng Kanban, Gantt chart đến tự động hóa quy trình phức tạp.',
        customPros: ['Hơn 15 chế độ xem dự án', 'Tự động hóa mạnh mẽ không cần code', 'Báo cáo Dashboard trực quan'],
        customCons: ['Cần thời gian làm quen lúc ban đầu']
      },
      {
        rank: 2,
        productId: 'prod-notion-workspace',
        highlight: 'Linh Hoạt & Quản Lý Tri Thức Hoàn Hảo',
        verdict: 'Notion xuất sắc trong việc kết hợp giữa quản lý công việc và xây dựng kho tài liệu, wiki nội bộ cho công ty.',
        customPros: ['Giao diện tối giản hiện đại', 'Cơ sở dữ liệu Database liên kết cực mạnh'],
        customCons: ['Tải chậm khi bảng dữ liệu quá lớn']
      }
    ],
    conclusion: 'ClickUp là sự lựa chọn số 1 cho các nhóm cần quản trị dự án theo chuẩn Agile/Scrum chặt chẽ. Notion là lựa chọn hoàn hảo cho nhóm đề cao tính linh hoạt, sáng tạo và quản lý tri thức tập trung.',
    faq: [
      {
        q: 'Nhóm nhỏ dưới 5 người có cần mua bản trả phí không?',
        a: 'Hầu hết các công cụ như ClickUp hay Notion đều có gói Free vĩnh viễn rất hào phóng, hoàn toàn đủ dùng cho nhóm dưới 5 người.'
      }
    ],
    status: 'published'
  }
];
