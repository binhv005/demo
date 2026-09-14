import { Comparison } from '../types';

export const mockComparisons: Comparison[] = [
  // --- SO SÁNH 1: AirCook Pro 6L vs HomeChef Dual Zone 9L ---
  {
    id: 'comp-aircook-homechef',
    title: 'So Sánh AirCook Pro 6L vs HomeChef Dual Zone 9L: Nên Mua Nồi Đơn Hay Nồi 2 Ngăn?',
    slug: 'aircook-vs-homechef',
    type: 'physical',
    categorySlug: 'noi-chien',
    productAId: 'prod-aircook-6l',
    productBId: 'prod-homechef-dual',
    winnerId: 'prod-aircook-6l',
    verdict: 'AirCook Pro 6L giành chiến thắng chung cuộc nhờ mức giá dễ tiếp cận hơn 30%, độ đồng đều nhiệt độ vượt trội và mặt kính trong suốt tiện lợi cho đa số gia đình 4-5 người. Tuy nhiên, nếu bạn thường xuyên nấu 2 món cùng lúc hoặc phục vụ gia đình trên 6 người, HomeChef Dual Zone 9L vẫn là sự nâng cấp rất giá trị.',
    priceComparison: 'AirCook Pro 6L có giá 2.490.000đ (tiết kiệm 1.200.000đ so với HomeChef Dual Zone giá 3.690.000đ). Về chi phí trên mỗi lít dung tích thực tế, AirCook Pro đạt tỷ lệ hiệu năng/giá thành (P/P) tốt hơn 18%.',
    features: [
      {
        feature: 'Dung tích tổng & Phân chia ngăn',
        productA: '6.0 Lít (Ngăn đơn rộng rãi nướng gà nguyên con 2kg)',
        productB: '9.0 Lít (Chia 2 ngăn độc lập 4.5L + 4.5L)',
        winner: 'B'
      },
      {
        feature: 'Công suất & Tốc độ làm nóng',
        productA: '1800W (Gia nhiệt nhanh trong 3 phút)',
        productB: '2400W (Mỗi bên 1200W, gia nhiệt riêng biệt)',
        winner: 'A'
      },
      {
        feature: 'Độ giòn đồng đều 360°',
        productA: '9.6/10 (Nhờ quạt xoáy kép TwinTurbo)',
        productB: '9.2/10 (Lòng hẹp hơn nên cần đảo nhẹ giữa chừng)',
        winner: 'A'
      },
      {
        feature: 'Khả năng quan sát món ăn',
        productA: 'Mặt kính cường lực trong suốt + Đèn LED',
        productB: 'Cửa kín hoàn toàn (phải kéo khay để xem)',
        winner: 'A'
      },
      {
        feature: 'Tính năng Sync Finish',
        productA: 'Không có (chỉ nấu 1 chu trình)',
        productB: 'Có (Đồng bộ thời gian nấu 2 món chín cùng lúc)',
        winner: 'B'
      },
      {
        feature: 'Vệ sinh & Rửa khay',
        productA: 'Men gốm Ceramic chống dính 5 lớp',
        productB: 'Lớp phủ Ceramic PTFE Free',
        winner: 'Tie'
      }
    ],
    experienceComparison: 'Trong trải nghiệm nấu ăn hàng ngày, AirCook Pro 6L mang lại cảm giác thoải mái hơn nhờ khay chiên lớn nguyên khối, dễ dàng đặt vừa pizza size 20cm hoặc gà nguyên con. Mặt kính đèn LED giúp người dùng không lo bị cháy xém. Trong khi đó, HomeChef Dual Zone tỏa sáng khi bạn muốn làm món chính (cá hồi) và món phụ (măng tây nướng) cùng lúc mà không bị lẫn mùi.',
    finalRecommendation: 'Chọn AirCook Pro 6L nếu bạn muốn một chiếc nồi chiên gia đình hoàn hảo, nấu ngon, dễ chùi rửa và giá hợp lý. Chọn HomeChef Dual Zone nếu bạn nấu ăn nhiều món phức tạp và muốn tiết kiệm thời gian vào bếp tối đa.',
    authorId: 'expert-1',
    updatedAt: '08 Tháng 03, 2024',
    faq: [
      {
        q: 'Nồi 2 ngăn HomeChef có bị lẫn mùi vị giữa 2 bên không?',
        a: 'Hoàn toàn không. Hai ngăn của HomeChef được thiết kế gioăng cách nhiệt và luồng khí đối lưu độc lập, món cá hồi ở ngăn trái không bị ám mùi sang bánh ngọt ở ngăn phải.'
      },
      {
        q: 'AirCook Pro 6L có nướng bánh ngọt được không?',
        a: 'Được. Dải nhiệt độ bắt đầu từ 40°C cho phép ủ men bánh mì và nướng bánh bông lan, bánh quy rất chuẩn xác.'
      }
    ],
    status: 'published'
  },

  // --- SO SÁNH 2: ChatGPT Plus vs Claude 3.5 Sonnet ---
  {
    id: 'comp-chatgpt-claude',
    title: 'ChatGPT Plus (GPT-4o) vs Claude 3.5 Sonnet: Cuộc Chiến Trợ Lý AI Số 1 Năm 2024',
    slug: 'chatgpt-vs-claude',
    type: 'digital',
    categorySlug: 'tro-ly-ai',
    productAId: 'prod-chatgpt-plus',
    productBId: 'prod-claude-sonnet',
    winnerId: 'prod-claude-sonnet',
    verdict: 'Claude 3.5 Sonnet chiến thắng sát nút nhờ năng lực sinh code đỉnh cao, tính năng Artifacts trực quan xem trước sản phẩm và lối hành văn tinh tế, sâu sắc hơn. Tuy nhiên, ChatGPT Plus vẫn dẫn đầu nếu bạn cần đàm thoại giọng nói real-time và tạo ảnh DALL-E.',
    priceComparison: 'Cả hai nền tảng đều có cùng mức giá 20 USD/tháng (khoảng 499.000đ/tháng) cho gói cá nhân cao cấp. Cả hai cũng cung cấp bản miễn phí với giới hạn lượt truy vấn hàng ngày.',
    features: [
      {
        feature: 'Khả năng Lập trình & Debug Code',
        productA: 'Rất tốt (GPT-4o giải quyết 90% bài toán)',
        productB: 'Xuất sắc số 1 thế giới (Claude 3.5 Sonnet đạt 93.7% HumanEval)',
        winner: 'B'
      },
      {
        feature: 'Tính năng Tương tác trực quan (Artifacts)',
        productA: 'Chưa hỗ trợ trực tiếp bên cạnh khung chat',
        productB: 'Hỗ trợ xem trước UI React, SVG, game mini trực tiếp',
        winner: 'B'
      },
      {
        feature: 'Đa phương thức (Voice & Image)',
        productA: 'Đầy đủ Voice đàm thoại mượt mà + Sinh ảnh DALL-E 3',
        productB: 'Chỉ nhận hình ảnh đầu vào, chưa có Voice real-time',
        winner: 'A'
      },
      {
        feature: 'Dung lượng bộ nhớ ngữ cảnh (Context Window)',
        productA: '128,000 Tokens (~300 trang tài liệu)',
        productB: '200,000 Tokens (~500 trang tài liệu chuẩn xác)',
        winner: 'B'
      },
      {
        feature: 'Tìm kiếm Web thời gian thực',
        productA: 'Tích hợp Bing Search real-time rất mượt',
        productB: 'Chưa hỗ trợ duyệt web tự động trong khung chat',
        winner: 'A'
      }
    ],
    experienceComparison: 'Khi làm việc với code và văn bản học thuật, Claude 3.5 Sonnet tạo cảm giác như bạn đang trò chuyện với một Senior Software Engineer tỉ mỉ. Tính năng Artifacts giúp bạn tiết kiệm hàng giờ chuyển đổi giữa editor và trình duyệt. Mặt khác, ChatGPT Plus mang lại trải nghiệm trợ lý cá nhân sống động khi bạn có thể bật micro nói chuyện tự nhiên bằng tiếng Việt trong lúc lái xe.',
    finalRecommendation: 'Đăng ký Claude Pro nếu công việc của bạn là lập trình, phân tích văn bản dài, thiết kế giao diện hoặc sáng tạo nội dung văn bản. Đăng ký ChatGPT Plus nếu bạn cần trợ lý đa năng toàn diện cho nhiều nhu cầu thường nhật.',
    authorId: 'expert-2',
    updatedAt: '12 Tháng 03, 2024',
    faq: [
      {
        q: 'Tôi có thể dùng cả 2 công cụ mà không tốn tiền không?',
        a: 'Có. Cả OpenAI và Anthropic đều cho phép bạn sử dụng GPT-4o và Claude 3.5 Sonnet miễn phí với giới hạn khoảng 10-20 tin nhắn mỗi chu kỳ vài tiếng.'
      }
    ],
    status: 'published'
  }
];
