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

  // --- VẬT LÝ TOP 3: Philips Premium Airfryer XXL ---
  {
    id: 'prod-philips-xxl',
    name: 'Philips Premium Airfryer XXL HD9650',
    slug: 'philips-airfryer-xxl',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Philips',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    score: 9.0,
    ratingCount: 2310,
    price: 5890000,
    originalPrice: 7990000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ Twin TurboStar loại bỏ đến 90% lượng mỡ dư thừa trong thực phẩm',
      'Dung tích lớn XXL 7.3L nướng trọn vẹn cả con gà hoặc 1.4kg khoai tây',
      'Chất lượng gia công xuất sắc tiêu chuẩn châu Âu, độ bền linh kiện cực cao'
    ],
    cons: [
      'Giá thành cao nhất trong phân khúc nồi chiên gia đình',
      'Không có mặt kính trong suốt để nhìn vào bên trong'
    ],
    bestFor: 'Gia đình chuộng thương hiệu cao cấp, ưu tiên công nghệ tách dầu mỡ triệt để',
    shortDescription: 'Nồi chiên không dầu cao cấp công nghệ Twin TurboStar với công suất khủng 2225W, tự động tách chất béo hiệu quả nhất.',
    deepReview: 'Philips HD9650 là tiêu chuẩn vàng về khả năng chiên nướng. Công nghệ xoáy nhiệt Twin TurboStar tạo luồng khí cực mạnh cuốn trôi chất béo đọng lại ở đáy lồng đôi, giúp món ăn giòn tan mà không bị ngấy mỡ.',
    specs: {
      'Dung tích': '7.3 Lít (Giỏ chiên 1.4 kg)',
      'Công suất': '2225W',
      'Dải nhiệt độ': '40°C - 200°C',
      'Bảng điều khiển': 'Núm xoay QuickControl + Màn hình LED',
      'Chất liệu lòng nồi': 'Hợp kim chống dính QuickClean cao cấp',
      'Trọng lượng': '7.99 kg',
      'Bảo hành': '24 tháng toàn cầu'
    },
    scoreBreakdown: {
      design: 9.1,
      performance: 9.5,
      value: 8.2,
      usability: 9.2
    },
    badge: 'Công nghệ Tách Dầu Đỉnh Cao',
    status: 'published',
    views: 31200,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-08'
  },

  // --- VẬT LÝ TOP 4: Cosori Pro LE 5.0L ---
  {
    id: 'prod-cosori-pro-le',
    name: 'Cosori Pro LE 5.0L CAF-L501',
    slug: 'cosori-pro-le-5l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Cosori',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
    score: 8.9,
    ratingCount: 1780,
    price: 2290000,
    originalPrice: 2890000,
    priceUnit: 'đ',
    pros: [
      'Thiết kế mặt kính cảm ứng phía trên phẳng lì cực kỳ sang trọng, tinh tế',
      'Công nghệ Air Crisp 360° vận hành siêu êm ái, độ ồn chỉ 55dB',
      'Chức năng làm nóng trước (Preheat) và nhắc lật thức ăn (Shake Reminder) tiện lợi'
    ],
    cons: [
      'Dung tích 5.0L vừa phải, chỉ nướng gà dưới 1.6kg',
      'Không kèm phụ kiện vỉ nướng chuyên dụng trong hộp'
    ],
    bestFor: 'Căn bếp hiện đại, người trẻ thích thiết kế tối giản thẩm mỹ và không gian yên tĩnh',
    shortDescription: 'Nồi chiên không dầu thiết kế phẳng đoạt giải Red Dot, công nghệ nấu Air Crisp êm ái hàng đầu phân khúc.',
    deepReview: 'Cosori Pro LE 5.0L nổi bật nhờ thiết kế mặt kính cường lực phẳng trên đỉnh máy, loại bỏ hoàn toàn các nút bấm lồi. Quạt tản nhiệt cải tiến giúp máy chạy cực kỳ êm ái kể cả khi đạt nhiệt độ tối đa 230°C.',
    specs: {
      'Dung tích': '5.0 Lít',
      'Công suất': '1500W',
      'Dải nhiệt độ': '75°C - 230°C',
      'Bảng điều khiển': 'Kính cảm ứng cường lực phẳng Top-Touch',
      'Chất liệu lòng nồi': 'Hợp kim nhôm phủ chống dính Teflon Free PFOA',
      'Trọng lượng': '4.54 kg',
      'Bảo hành': '24 tháng'
    },
    scoreBreakdown: {
      design: 9.6,
      performance: 8.8,
      value: 9.1,
      usability: 9.0
    },
    badge: 'Thiết Kế Đẹp Nhất',
    status: 'published',
    views: 16400,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-09'
  },

  // --- VẬT LÝ TOP 5: Lock&Lock Jumbo 7.2L ---
  {
    id: 'prod-locknlock-jumbo',
    name: 'Lock&Lock Jumbo 7.2L EJF296BLK',
    slug: 'locknlock-jumbo-7-2l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Lock&Lock',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    score: 8.8,
    ratingCount: 2950,
    price: 1950000,
    originalPrice: 3890000,
    priceUnit: 'đ',
    pros: [
      'Dung tích lòng nồi khổng lồ 7.2L chiên gà nguyên con 2.5kg thoải mái',
      'Mức giá cực kỳ hấp dẫn so với dung tích lớn',
      '8 chương trình nấu cài đặt sẵn cho món ăn Việt phổ biến'
    ],
    cons: [
      'Lớp chống dính cần giữ gìn cẩn thận khi cọ rửa',
      'Kích thước khá to và tốn điện năng khi chiên lượng ít đồ ăn'
    ],
    bestFor: 'Gia đình 5-8 thành viên cần nồi dung tích cực lớn với chi phí tiết kiệm',
    shortDescription: 'Nồi chiên không dầu dung tích khủng 7.2L công suất 1800W, nướng gà vịt nguyên con dễ dàng.',
    deepReview: 'Lock&Lock EJF296BLK là lựa chọn dung tích lớn có doanh số dẫn đầu tại thị trường Việt Nam. Lòng nồi sâu và rộng rãi giúp nướng thịt tảng hay gà vịt nguyên con chín vàng ruộm mà không cần chặt khúc nhỏ.',
    specs: {
      'Dung tích': '7.2 Lít',
      'Công suất': '1800W',
      'Dải nhiệt độ': '80°C - 200°C',
      'Bảng điều khiển': 'Cảm ứng điện tử màn hình LED',
      'Chất liệu lòng nồi': 'Thép không gỉ phủ chống dính',
      'Trọng lượng': '5.9 kg',
      'Bảo hành': '12 tháng chính hãng'
    },
    scoreBreakdown: {
      design: 8.5,
      performance: 8.7,
      value: 9.4,
      usability: 8.8
    },
    badge: 'Dung Tích Khủng Giá Tốt',
    status: 'published',
    views: 28900,
    createdAt: '2023-12-15',
    updatedAt: '2024-03-02'
  },

  // --- VẬT LÝ TOP 6: Tefal Dual Easy Fry 8.3L ---
  {
    id: 'prod-tefal-dual-easy',
    name: 'Tefal Dual Easy Fry & Grill 8.3L EY905D',
    slug: 'tefal-dual-easy-fry-8-3l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Tefal',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    score: 8.7,
    ratingCount: 760,
    price: 4190000,
    originalPrice: 5990000,
    priceUnit: 'đ',
    pros: [
      '2 ngăn nấu bất đối xứng thông minh (Ngăn lớn 5.2L + Ngăn nhỏ 3.1L) cực kỳ thực dụng',
      'Vỉ nướng đúc bằng gang Die-Cast Grill tạo vân nướng chuẩn BBQ không khói',
      'Công nghệ Extra Crisp cho món chiên giòn tan mà giữ được độ mềm ẩm bên trong'
    ],
    cons: [
      'Giá thành ở phân khúc cao cấp',
      'Thao tác thiết lập 2 ngăn độc lập cần vài phút làm quen'
    ],
    bestFor: 'Người đam mê món nướng BBQ, gia đình thích ăn món chính kèm món phụ cùng lúc',
    shortDescription: 'Nồi chiên kèm vỉ nướng đúc gang 2 ngăn bất đối xứng 8.3L với công nghệ Extra Crisp từ Pháp.',
    deepReview: 'Tefal EY905D mang đến sự linh hoạt tối đa nhờ phân bổ 2 ngăn 5.2L và 3.1L thay vì chia đôi đều, rất tiện khi ngăn lớn nướng gà và ngăn nhỏ nướng rau củ ăn kèm.',
    specs: {
      'Dung tích': '8.3 Lít (5.2L + 3.1L)',
      'Công suất': '2700W',
      'Dải nhiệt độ': '40°C - 220°C',
      'Bảng điều khiển': 'Cảm ứng kỹ thuật số 8 chế độ',
      'Chất liệu lòng nồi': 'Hợp kim nhôm phủ chống dính Teflon Tefal cao cấp',
      'Trọng lượng': '7.8 kg',
      'Bảo hành': '24 tháng'
    },
    scoreBreakdown: {
      design: 9.0,
      performance: 9.1,
      value: 8.3,
      usability: 8.6
    },
    badge: 'Nướng Vỉ Gang Chuyên Nghiệp',
    status: 'published',
    views: 14200,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-07'
  },

  // --- VẬT LÝ TOP 7: Ninja Foodi DZ201 ---
  {
    id: 'prod-ninja-foodi-dz201',
    name: 'Ninja Foodi 6-in-1 DualZone 8L DZ201',
    slug: 'ninja-foodi-dz201',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Ninja',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    score: 8.6,
    ratingCount: 1240,
    price: 4750000,
    originalPrice: 5800000,
    priceUnit: 'đ',
    pros: [
      '2 ngăn chiên độc lập 4L + 4L với 2 bộ sinh nhiệt và quạt đối lưu riêng biệt',
      'Tính năng Match Cook sao chép nhanh cài đặt giữa 2 ngăn',
      'Khả năng sấy hoa quả (Dehydrate) và nướng giòn cực kỳ chuẩn xác'
    ],
    cons: [
      'Hàng nhập khẩu cần kiểm tra chân cắm điện và chế độ bảo hành đại lý',
      'Không gian mỗi ngăn khó chứa nguyên con gà to trên 2kg'
    ],
    bestFor: 'Người đam mê ẩm thực phương Tây, cần thiết bị nấu nướng đa năng chuyên sâu',
    shortDescription: 'Nồi chiên không dầu 2 ngăn đối lưu độc lập 6 tính năng cao cấp từ thương hiệu gia dụng Mỹ Ninja.',
    deepReview: 'Ninja Foodi DZ201 là sản phẩm tiên phong trào lưu nồi 2 ngăn trên toàn cầu. Mỗi ngăn sở hữu quạt và điện trở riêng giúp món nướng không bị lẫn mùi hương giữa 2 món mặn và ngọt.',
    specs: {
      'Dung tích': '8.0 Lít (2 x 4.0L)',
      'Công suất': '1690W',
      'Dải nhiệt độ': '40°C - 230°C',
      'Bảng điều khiển': 'Kỹ thuật số Digital Smart Panel',
      'Chất liệu lòng nồi': 'Chống dính Ceramic cao cấp không chứa chì/cadmium',
      'Trọng lượng': '8.1 kg',
      'Bảo hành': '12 tháng'
    },
    scoreBreakdown: {
      design: 8.8,
      performance: 9.0,
      value: 8.2,
      usability: 8.7
    },
    badge: 'Chuẩn Ẩm Thực Mỹ',
    status: 'published',
    views: 11800,
    createdAt: '2024-01-05',
    updatedAt: '2024-03-01'
  },

  // --- VẬT LÝ TOP 8: Bear Smart Visual 5L ---
  {
    id: 'prod-bear-smart-5l',
    name: 'Bear Smart Visual 5L QZG-F15G1',
    slug: 'bear-smart-visual-5l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Bear',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
    score: 8.5,
    ratingCount: 1620,
    price: 1490000,
    originalPrice: 2190000,
    priceUnit: 'đ',
    pros: [
      'Cửa sổ kính cường lực trong suốt 6.3 inch kèm đèn chiếu sáng khoang nấu',
      'Thiết kế màu sắc trang nhã hơi hướng Vintage phù hợp gian bếp trẻ trung',
      'Mức giá rất vừa túi tiền cho sinh viên và gia đình trẻ'
    ],
    cons: [
      'Công suất 1500W tốc độ làm nóng vừa phải',
      'Thời gian nướng thịt tảng lâu hơn khoảng 3-5 phút so với các dòng 1800W'
    ],
    bestFor: 'Gia đình trẻ 2-4 người thích đồ gia dụng đẹp mắt, vừa vặn ngân sách',
    shortDescription: 'Nồi chiên không dầu kính trong suốt 5L thiết kế thanh lịch, theo dõi thức ăn chín trực tiếp dễ dàng.',
    deepReview: 'Bear QZG-F15G1 ghi điểm mạnh mẽ bởi diện mạo tinh tế màu xanh ngọc/trắng kem và khoang kính rộng 6.3 inch. Khả năng quan sát màu sắc bánh hoặc thịt nướng giúp người nấu không lo bị cháy khét.',
    specs: {
      'Dung tích': '5.0 Lít',
      'Công suất': '1500W',
      'Dải nhiệt độ': '80°C - 200°C',
      'Bảng điều khiển': 'Cảm ứng vi tính thông minh',
      'Chất liệu lòng nồi': 'Hợp kim tráng men chống dính',
      'Trọng lượng': '4.1 kg',
      'Bảo hành': '18 tháng chính hãng'
    },
    scoreBreakdown: {
      design: 9.2,
      performance: 8.2,
      value: 9.0,
      usability: 8.6
    },
    badge: 'Thiết Kế Vintage Trẻ Trung',
    status: 'published',
    views: 15300,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-10'
  },

  // --- VẬT LÝ TOP 9: Xiaomi Smart Air Fryer Pro 4L ---
  {
    id: 'prod-xiaomi-pro-4l',
    name: 'Xiaomi Smart Air Fryer Pro 4L Window',
    slug: 'xiaomi-smart-air-fryer-pro-4l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    score: 8.4,
    ratingCount: 2840,
    price: 1390000,
    originalPrice: 1990000,
    priceUnit: 'đ',
    pros: [
      'Điều khiển qua app Mi Home, hẹn giờ nấu thông minh 24h và tích hợp Google Assistant',
      'Màn hình OLED tích hợp ngay trên núm xoay tròn tương tác cực mượt',
      'Dải nhiệt độ siêu rộng 40°C - 200°C làm được cả sữa chua và sấy thịt khô'
    ],
    cons: [
      'Dung tích 4.0L hơi nhỏ cho gia đình từ 4 người trở lên',
      'Phần nhựa bóng màu trắng dễ bám dầu mỡ nếu không lau ngay'
    ],
    bestFor: 'Người đam mê nhà thông minh Smart Home, người sống độc thân hoặc cặp đôi trẻ',
    shortDescription: 'Nồi chiên không dầu thông minh 4L kết nối Wi-Fi, màn hình OLED núm xoay và cửa kính cách nhiệt 3 lớp.',
    deepReview: 'Xiaomi Smart Air Fryer Pro 4L là đại diện tiêu biểu của xu hướng smarthome trong nhà bếp. Bạn có thể bật lò nướng trước từ cơ quan qua điện thoại để khi về nhà món ăn đã sẵn sàng nóng hổi.',
    specs: {
      'Dung tích': '4.0 Lít',
      'Công suất': '1600W',
      'Dải nhiệt độ': '40°C - 200°C',
      'Bảng điều khiển': 'Núm xoay màn hình OLED + App Mi Home',
      'Chất liệu lòng nồi': 'Hợp kim 7 lớp phủ chống dính PTFE',
      'Trọng lượng': '3.9 kg',
      'Bảo hành': '12 tháng chính hãng'
    },
    scoreBreakdown: {
      design: 9.3,
      performance: 8.3,
      value: 8.9,
      usability: 9.1
    },
    badge: 'Thông Minh Kết Nối App',
    status: 'published',
    views: 24100,
    createdAt: '2024-01-08',
    updatedAt: '2024-03-05'
  },

  // --- VẬT LÝ TOP 10: Sharp AirFryer 5.5L ---
  {
    id: 'prod-sharp-kf55',
    name: 'Sharp AirFryer 5.5L KF-AF55EV',
    slug: 'sharp-airfryer-5-5l',
    type: 'physical',
    category: 'Gia dụng',
    categorySlug: 'noi-chien',
    groupSlug: 'gia-dung',
    brand: 'Sharp',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    score: 8.3,
    ratingCount: 3100,
    price: 1190000,
    originalPrice: 1890000,
    priceUnit: 'đ',
    pros: [
      'Hệ thống điều khiển núm xoay cơ học siêu bền bỉ, không sợ hỏng mạch điện tử',
      'Rất dễ sử dụng cho người lớn tuổi trong gia đình',
      'Thương hiệu Sharp Nhật Bản uy tín, giá thành bình dân dễ tiếp cận'
    ],
    cons: [
      'Không có màn hình hiển thị thời gian chính xác theo từng phút',
      'Thiết kế truyền thống đơn giản, không có đèn quan sát bên trong'
    ],
    bestFor: 'Mua tặng bố mẹ, người lớn tuổi thích sự đơn giản bền chắc không lo lỗi bo mạch',
    shortDescription: 'Nồi chiên không dầu điều khiển cơ học dung tích 5.5L chuẩn công nghệ Nhật Bản bền bỉ.',
    deepReview: 'Sharp KF-AF55EV là định nghĩa của sự bền bỉ thực dụng. Với 2 núm xoay điều chỉnh nhiệt độ và thời gian riêng biệt, bất kỳ ai cũng có thể sử dụng thành thạo ngay từ lần đầu tiên.',
    specs: {
      'Dung tích': '5.5 Lít',
      'Công suất': '1550W - 1750W',
      'Dải nhiệt độ': '80°C - 200°C',
      'Bảng điều khiển': '2 Núm xoay cơ học độc lập',
      'Chất liệu lòng nồi': 'Thép chống dính cao cấp',
      'Trọng lượng': '5.14 kg',
      'Bảo hành': '12 tháng chính hãng'
    },
    scoreBreakdown: {
      design: 8.0,
      performance: 8.4,
      value: 9.3,
      usability: 8.7
    },
    badge: 'Nồi Cơ Bền Bỉ Số 1',
    status: 'published',
    views: 19700,
    createdAt: '2023-11-10',
    updatedAt: '2024-02-28'
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
  },

  // --- SỨC KHỎE & ĐỜI SỐNG 1: Garmin Venu 3 ---
  {
    id: 'prod-garmin-venu-3',
    name: 'Đồng Hồ Garmin Venu 3 Smartwatch',
    slug: 'garmin-venu-3',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'suc-khoe',
    groupSlug: 'suc-khoe',
    brand: 'Garmin',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 940,
    price: 12290000,
    originalPrice: 13500000,
    priceUnit: 'đ',
    pros: [
      'Màn hình AMOLED 1.4 inch rực rỡ, thời lượng pin ấn tượng lên đến 14 ngày',
      'Cảm biến tim mạch Elevate V5 thế hệ mới đo điện tâm đồ ECG và giấc ngủ chuyên sâu Sleep Coach',
      'Tích hợp loa thoại và micro đàm thoại trực tiếp trên cổ tay'
    ],
    cons: [
      'Giá thành ở phân khúc cao cấp',
      'Kho ứng dụng bên thứ 3 Connect IQ chưa phong phú bằng Apple Watch'
    ],
    bestFor: 'Người tập luyện thể thao, quan tâm sức khỏe tim mạch và muốn pin dùng trên 10 ngày',
    shortDescription: 'Đồng hồ thông minh theo dõi sức khỏe và thể thao đỉnh cao với màn hình AMOLED, huấn luyện viên giấc ngủ và pin 14 ngày.',
    deepReview: 'Garmin Venu 3 kết hợp hoàn hảo giữa vẻ đẹp thời trang thanh lịch và độ chính xác đo lường y tế chuẩn xác hàng đầu của Garmin.',
    specs: {
      'Màn hình': 'AMOLED 1.4 inch (454 x 454 pixels)',
      'Thời lượng pin': 'Lên đến 14 ngày (chế độ smartwatch)',
      'Chống nước': '5 ATM (50m)',
      'Cảm biến': 'Elevate Gen 5, Pulse Ox, Body Battery, ECG Ready',
      'Trọng lượng': '47g',
      'Bảo hành': '24 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.3, performance: 9.6, value: 9.1, usability: 9.4 },
    badge: 'Đồng Hồ Sức Khỏe Tốt Nhất',
    status: 'published',
    views: 14200,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-12'
  },

  // --- SỨC KHỎE 2: Beurer MG153 Massager ---
  {
    id: 'prod-beurer-mg153',
    name: 'Máy Massage Cổ Vai Gáy Beurer MG153 4D',
    slug: 'beurer-mg153-massager',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'suc-khoe',
    groupSlug: 'suc-khoe',
    brand: 'Beurer',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    score: 9.0,
    ratingCount: 680,
    price: 2490000,
    originalPrice: 3200000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ con lăn 4D mô phỏng chính xác bàn tay chuyên viên bấm huyệt Shiatsu',
      'Tích hợp chức năng sưởi ấm nhiệt hồng ngoại làm giãn cơ và tan mỏi nhanh chóng',
      'Dây quai giữ điều chỉnh lực ép dễ dàng'
    ],
    cons: [
      'Cần cắm nguồn trực tiếp khi sử dụng',
      'Trọng lượng khoảng 1.8kg cần dùng lực tay kéo giữ'
    ],
    bestFor: 'Dân văn phòng ngồi máy tính nhiều, người hay bị đau mỏi cổ vai gáy',
    shortDescription: 'Máy massage cổ vai gáy công nghệ 4D của Đức với 4 con lăn và 2 ngón kẹp mô phỏng massage tay thật.',
    deepReview: 'Beurer MG153 là giải pháp giảm đau tức thì cho dân văn phòng sau ngày dài làm việc căng thẳng.',
    specs: {
      'Công nghệ': 'Massage Shiatsu 4D hồng ngoại',
      'Chế độ': '2 tốc độ xoay đảo chiều',
      'Chất liệu': 'Da PU cao cấp + Vải lưới thoáng khí',
      'Bảo hành': '36 tháng chính hãng Đức'
    },
    scoreBreakdown: { design: 8.9, performance: 9.3, value: 9.1, usability: 8.8 },
    badge: 'Giảm Mỏi Tức Thì',
    status: 'published',
    views: 9800,
    createdAt: '2024-01-22',
    updatedAt: '2024-03-05'
  },

  // --- THỜI TRANG 1: Tomtoc Tech Backpack T66 ---
  {
    id: 'prod-tomtoc-t66',
    name: 'Balo Công Nghệ Tomtoc Premium Navigator T66',
    slug: 'tomtoc-backpack-t66',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'thoi-trang',
    groupSlug: 'thoi-trang',
    brand: 'Tomtoc',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 1120,
    price: 1890000,
    originalPrice: 2350000,
    priceUnit: 'đ',
    pros: [
      'Chất liệu vải Cordura Ballistic 840D chống rách và trượt nước tuyệt đối',
      'Khoang chống sốc độc quyền CornerArmor bảo vệ laptop 16 inch an toàn',
      'Khóa kéo YKK chống nước mượt mà và bền bỉ'
    ],
    cons: [
      'Ngăn phụ phía trước hơi ôm khi nhét đầy đồ',
      'Ít tùy chọn màu sắc (chỉ có Đen và Xám chì)'
    ],
    bestFor: 'Lập trình viên, designer, người đi làm công nghệ thường xuyên mang laptop và phụ kiện',
    shortDescription: 'Balo đựng laptop 16 inch chuẩn quân đội, chống nước hoàn hảo với hệ thống đệm lưng êm ái chống gù.',
    deepReview: 'Tomtoc T66 được mệnh danh là chiếc balo laptop bền bỉ và thông minh nhất cho giới công nghệ hiện nay.',
    specs: {
      'Dung tích': '28 Lít',
      'Tương thích': 'Laptop lên đến 16 inch',
      'Chất liệu': 'Cordura Ballistic Nylon trượt nước',
      'Khóa kéo': 'YKK Zipper chống trộm',
      'Trọng lượng': '1.1 kg'
    },
    scoreBreakdown: { design: 9.4, performance: 9.5, value: 9.2, usability: 9.2 },
    badge: 'Balo Công Nghệ Đỉnh Cao',
    status: 'published',
    views: 11600,
    createdAt: '2024-01-05',
    updatedAt: '2024-03-01'
  },

  // --- THỜI TRANG 2: Nike Air Zoom Pegasus 41 ---
  {
    id: 'prod-nike-pegasus-41',
    name: 'Giày Chạy Bộ Nike Air Zoom Pegasus 41',
    slug: 'nike-pegasus-41',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'thoi-trang',
    groupSlug: 'thoi-trang',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    score: 9.2,
    ratingCount: 1850,
    price: 3690000,
    originalPrice: 4200000,
    priceUnit: 'đ',
    pros: [
      'Đệm bọt ReactX mới tăng 13% độ hoàn trả năng lượng so với thế hệ trước',
      'Túi khí Air Zoom kép ở mũi và gót chân giúp bước chạy êm và nảy',
      'Thân giày lưới dệt Engineered Mesh ôm chân và siêu thoáng khí'
    ],
    cons: [
      'Form ôm nhẹ, người chân bè nên tăng 0.5 size',
      'Đế ngoài mòn nhanh hơn nếu chạy nhiều trên đường nhựa thô ráp'
    ],
    bestFor: 'Người chạy bộ hàng ngày (Daily trainer), đi bộ và tập gym đa năng',
    shortDescription: 'Đôi giày chạy bộ quốc dân thế hệ 41 với đệm ReactX nảy hơn, êm ái và siêu bền bỉ.',
    deepReview: 'Pegasus 41 tiếp tục giữ vững danh xưng "chiếc giày đa năng đáng tin cậy nhất" cho mọi cự ly từ 5km đến marathon.',
    specs: {
      'Trọng lượng': '280g (Size 42)',
      'Độ dốc đế (Drop)': '10mm',
      'Bộ đệm': 'Nike ReactX Foam + Dual Zoom Air Pods',
      'Mặt đế': 'Cao su Waffle chống trượt'
    },
    scoreBreakdown: { design: 9.3, performance: 9.4, value: 9.0, usability: 9.2 },
    badge: 'Giày Chạy Bộ Quốc Dân',
    status: 'published',
    views: 24500,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-10'
  },

  // --- MẸ & BÉ 1: Fatzbaby King 2 UV ---
  {
    id: 'prod-fatzbaby-king2',
    name: 'Máy Tiệt Trùng Sấy Khô UV Fatzbaby King 2',
    slug: 'fatzbaby-king2-uv',
    type: 'physical',
    category: 'Mẹ & Bé',
    categorySlug: 'me-va-be',
    groupSlug: 'me-va-be',
    brand: 'Fatzbaby',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1620,
    price: 2650000,
    originalPrice: 3490000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ diệt khuẩn kép bằng đèn UVC LED cao cấp không chứa thủy ngân',
      'Dung tích lớn 19L tiệt trùng cùng lúc 12 bình sữa và đồ chơi cho bé',
      'Chế độ bảo quản vô trùng tự động liên tục trong 24 giờ'
    ],
    cons: [
      'Kích thước khá to cần vị trí đặt cố định trong phòng',
      'Giá cao hơn máy tiệt trùng hơi nước thông thường'
    ],
    bestFor: 'Gia đình có trẻ sơ sinh và trẻ nhỏ cần đảm bảo vệ sinh ăn uống tuyệt đối',
    shortDescription: 'Máy tiệt trùng sấy khô bình sữa bằng tia UVC LED chuẩn y tế, dung tích 19L khử khuẩn 99.99%.',
    deepReview: 'Fatzbaby King 2 là trợ thủ đắc lực nhất cho các mẹ bỉm sữa, vừa sấy khô vừa tiệt trùng và bảo quản 24h an tâm.',
    specs: {
      'Dung tích': '19 Lít',
      'Công nghệ khử khuẩn': 'UVC LED không chứa ozone',
      'Nhiệt độ sấy': '55°C - 65°C công nghệ PTC bảo vệ nhựa bình',
      'Bảo hành': '24 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.2, performance: 9.6, value: 9.3, usability: 9.5 },
    badge: 'Lựa Chọn Hàng Đầu Mẹ Bỉm',
    status: 'published',
    views: 18900,
    createdAt: '2024-01-12',
    updatedAt: '2024-03-06'
  },

  // --- THỂ THAO 1: Liforme Original Yoga Mat ---
  {
    id: 'prod-liforme-mat',
    name: 'Thảm Tập Yoga Cao Cấp Liforme Original Mat',
    slug: 'liforme-yoga-mat',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'the-thao',
    groupSlug: 'the-thao',
    brand: 'Liforme',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 810,
    price: 3850000,
    originalPrice: 4500000,
    priceUnit: 'đ',
    pros: [
      'Độ bám GripForMe huyền thoại chống trượt tuyệt đối kể cả khi đổ nhiều mồ hôi',
      'Hệ thống kẻ vạch định tuyến AlignForMe chuẩn xác giúp căn chỉnh tư thế chuẩn',
      'Chất liệu cao su thiên nhiên thân thiện môi trường, tự phân hủy sinh học'
    ],
    cons: [
      'Trọng lượng thảm 2.5kg khá nặng khi mang đi xa',
      'Cần vệ sinh bằng khăn ẩm nhẹ nhàng tránh hóa chất tẩy rửa mạnh'
    ],
    bestFor: 'Người tập Yoga, Pilates từ sơ cấp đến giáo viên chuyên nghiệp',
    shortDescription: 'Thảm tập yoga số 1 thế giới với vạch định tuyến thông minh và độ bám dính vô địch chống trượt ngã.',
    deepReview: 'Liforme là tiêu chuẩn vàng của giới Yogi quốc tế nhờ độ bám siêu thực và vạch định tuyến bảo vệ xương khớp.',
    specs: {
      'Kích thước': '185cm x 68cm x 4.2mm',
      'Chất liệu': 'Cao su tự nhiên + Bề mặt Polyurethane sinh học',
      'Trọng lượng': '2.5 kg',
      'Phụ kiện': 'Tặng kèm túi đựng thảm chính hãng'
    },
    scoreBreakdown: { design: 9.7, performance: 9.8, value: 8.9, usability: 9.6 },
    badge: 'Thảm Yoga Tốt Nhất Thế Giới',
    status: 'published',
    views: 15300,
    createdAt: '2024-01-28',
    updatedAt: '2024-03-11'
  },

  // --- THỂ THAO 2: Decathlon Tilt 500 Folding Bike ---
  {
    id: 'prod-decathlon-tilt500',
    name: 'Xe Đạp Gấp Dạo Phố Decathlon BTwin Tilt 500',
    slug: 'decathlon-tilt-500',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'the-thao',
    groupSlug: 'the-thao',
    brand: 'Decathlon',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    score: 9.1,
    ratingCount: 620,
    price: 7990000,
    originalPrice: 8990000,
    priceUnit: 'đ',
    pros: [
      'Khung nhôm 6061 siêu nhẹ, thao tác gấp gọn chỉ trong 15 giây',
      'Bộ truyền động Shimano 7 tốc độ mượt mà cho đường phố đô thị',
      'Dễ dàng bỏ vừa cốp xe ô tô hoặc mang lên thang máy căn hộ'
    ],
    cons: [
      'Bánh nhỏ 20 inch không phù hợp chạy đường địa hình đồi núi gồ ghề',
      'Yên xe nguyên bản hơi cứng cho những chuyến đi dài trên 20km'
    ],
    bestFor: 'Người sống ở chung cư, di chuyển nhẹ nhàng trong đô thị và thích dã ngoại',
    shortDescription: 'Xe đạp gấp gọn bằng nhôm 6061 với 7 tốc độ Shimano, gấp siêu nhanh trong 15 giây.',
    deepReview: 'Tilt 500 mang lại sự tiện lợi tuyệt vời cho cuộc sống đô thị hiện đại, vừa rèn luyện thể thao vừa cơ động.',
    specs: {
      'Khung sườn': 'Nhôm 6061 trọng lượng nhẹ',
      'Bộ đề': 'Shimano 7 tốc độ',
      'Bánh xe': '20 inch vành nhôm đôi',
      'Trọng lượng': '12.9 kg',
      'Bảo hành': 'Trọn đời khung sườn'
    },
    scoreBreakdown: { design: 9.2, performance: 9.0, value: 9.3, usability: 9.1 },
    badge: 'Xe Đạp Gấp Tiện Lợi',
    status: 'published',
    views: 8900,
    createdAt: '2024-02-02',
    updatedAt: '2024-03-09'
  },

  // --- HOSTING 1: Hostinger WordPress Business ---
  {
    id: 'prod-hostinger-business',
    name: 'Hostinger Business WordPress Web Hosting',
    slug: 'hostinger-business',
    type: 'digital',
    category: 'Hosting & Server',
    categorySlug: 'hosting',
    groupSlug: 'hosting',
    brand: 'Hostinger',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 2840,
    price: 79000,
    priceUnit: 'đ/tháng',
    pros: [
      'Máy chủ LiteSpeed Web Server kết hợp bộ nhớ đệm LSCache siêu tốc',
      'Tặng kèm tên miền miễn phí năm đầu và chứng chỉ SSL trọn đời',
      'Bảng quản trị hPanel trực quan, sao lưu dữ liệu tự động hàng ngày (Daily Backup)'
    ],
    cons: [
      'Để có mức giá ưu đãi nhất cần thanh toán chu kỳ gói 4 năm',
      'Hỗ trợ khách hàng qua Live Chat chưa có tổng đài hotline tiếng Việt'
    ],
    bestFor: 'Blog cá nhân, website doanh nghiệp nhỏ và cửa hàng bán hàng trực tuyến WooCommerce',
    shortDescription: 'Dịch vụ lưu trữ web WordPress tốc độ cao với LiteSpeed Server, SSL miễn phí và bảo mật Cloudflare.',
    deepReview: 'Hostinger mang lại hiệu năng/chi phí P/P số 1 trong các nhà cung cấp hosting quốc tế hiện nay với uptime 99.9%.',
    specs: {
      'Web Server': 'LiteSpeed Web Server',
      'Dung lượng lưu trữ': '200 GB NVMe SSD',
      'Băng thông': 'Không giới hạn (Unmetered)',
      'Sao lưu': 'Hàng ngày tự động (Daily Backups)',
      'Datacenter': 'Singapore, Tokyo, USA, EU'
    },
    scoreBreakdown: { design: 9.4, performance: 9.5, value: 9.6, usability: 9.3 },
    badge: 'Hosting P/P Tốt Nhất 2024',
    status: 'published',
    views: 29800,
    createdAt: '2023-10-15',
    updatedAt: '2024-03-08'
  },

  // --- MARKETING 1: Ahrefs Standard Suite ---
  {
    id: 'prod-ahrefs-standard',
    name: 'Ahrefs Standard SEO & Keyword Tool',
    slug: 'ahrefs-standard',
    type: 'digital',
    category: 'Marketing & SEO',
    categorySlug: 'marketing',
    groupSlug: 'marketing',
    brand: 'Ahrefs',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1980,
    price: 4950000,
    priceUnit: 'đ/tháng (199$)',
    pros: [
      'Cơ sở dữ liệu Backlink và Từ khóa tiếng Việt đồ sộ và cập nhật nhanh nhất thị trường',
      'Tính năng Site Explorer và Content Gap phân tích đối thủ cạnh tranh chính xác',
      'Công cụ Site Audit phát hiện toàn bộ lỗi kỹ thuật On-Page SEO trên website'
    ],
    cons: [
      'Chi phí cao với cá nhân hoặc freelancer mới bắt đầu',
      'Áp dụng cơ chế tính credit cho mỗi lần lọc dữ liệu'
    ],
    bestFor: 'SEO Agency, doanh nghiệp thương mại điện tử và chuyên gia tiếp thị tìm kiếm',
    shortDescription: 'Bộ công cụ phân tích SEO và nghiên cứu từ khóa chuyên nghiệp số 1 toàn cầu.',
    deepReview: 'Ahrefs là chuẩn mực ngành SEO, không một công cụ nào có dữ liệu backlink và độ sâu phân tích từ khóa vượt qua được Ahrefs.',
    specs: {
      'Dữ liệu': 'Hơn 12 tỷ từ khóa tại 200+ quốc gia',
      'Tính năng chính': 'Site Explorer, Keywords Explorer, Site Audit, Rank Tracker',
      'Báo cáo': 'Xuất CSV/Excel, API integration'
    },
    scoreBreakdown: { design: 9.2, performance: 9.8, value: 9.0, usability: 9.2 },
    badge: 'Chuẩn Mực Ngành SEO',
    status: 'published',
    views: 26400,
    createdAt: '2023-09-10',
    updatedAt: '2024-03-10'
  },

  // --- KHÓA HỌC 1: Coursera Plus ---
  {
    id: 'prod-coursera-plus',
    name: 'Coursera Plus Subscription Toàn Diện',
    slug: 'coursera-plus',
    type: 'digital',
    category: 'Khóa học & Nền tảng học tập',
    categorySlug: 'khoa-hoc',
    groupSlug: 'khoa-hoc',
    brand: 'Coursera',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 2150,
    price: 9900000,
    priceUnit: 'đ/năm (399$)',
    pros: [
      'Học không giới hạn hơn 7,000+ khóa học từ Google, IBM, Meta và các đại học hàng đầu (Stanford, Yale)',
      'Nhận chứng chỉ chuyên nghiệp (Professional Certificates) có giá trị quốc tế cao trên LinkedIn',
      'Có phụ đề tiếng Việt và bài tập thực hành phòng lab trực tiếp trên trình duyệt'
    ],
    cons: [
      'Một số chương trình bằng Thạc sĩ (Master Degrees) yêu cầu học phí riêng',
      'Cần tính tự giác học tập cao để hoàn thành lộ trình'
    ],
    bestFor: 'Người muốn nâng cao kỹ năng nghề nghiệp (AI, Data Science, Lập trình, Quản trị) lấy chứng chỉ uy tín',
    shortDescription: 'Gói thành viên học không giới hạn 7,000+ khóa học từ các trường đại học và tập đoàn công nghệ hàng đầu.',
    deepReview: 'Coursera Plus là khoản đầu tư học tập xứng đáng nhất với lộ trình chuẩn mực được biên soạn bởi các giáo sư hàng đầu.',
    specs: {
      'Số lượng khóa học': '7,000+ Courses & Specializations',
      'Đối tác giảng dạy': 'Google, Meta, IBM, Stanford, Yale, Johns Hopkins',
      'Chứng chỉ': 'Verified Professional Certificate',
      'Hỗ trợ nền tảng': 'Web, iOS, Android (học offline)'
    },
    scoreBreakdown: { design: 9.3, performance: 9.5, value: 9.6, usability: 9.3 },
    badge: 'Nền Tảng Học Tập Số 1',
    status: 'published',
    views: 31000,
    createdAt: '2023-10-01',
    updatedAt: '2024-03-12'
  },

  // ==========================================
  // --- ĐIỆN TỬ & CÔNG NGHỆ ---
  // ==========================================
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Tai Nghe Chống Ồn Sony WH-1000XM5',
    slug: 'sony-wh1000xm5',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'tai-nghe-chong-on',
    groupSlug: 'dien-tu',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 3200,
    price: 6990000,
    originalPrice: 8490000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ chống ồn chủ động ANC dẫn đầu thị trường với 8 micro và 2 vi xử lý V1 + QN1',
      'Chất âm Hi-Res Audio chi tiết, âm bass sâu và hỗ trợ codec LDAC cao cấp',
      'Thời lượng pin lên đến 30 giờ, sạc nhanh 3 phút nghe được 3 giờ'
    ],
    cons: [
      'Thiết kế không gấp gọn hoàn toàn vào trong như bản XM4',
      'Đệm tai da tổng hợp có thể hơi ấm khi đeo mùa hè ngoài trời'
    ],
    bestFor: 'Người thường xuyên bay, làm việc văn phòng cần không gian tĩnh lặng tuyệt đối',
    shortDescription: 'Tai nghe chống ồn đỉnh cao của Sony với 8 micro lọc tiếng ồn và âm thanh Hi-Res Audio trung thực.',
    deepReview: 'Sony WH-1000XM5 mang lại khả năng chống ồn vượt trội, lọc sạch tiếng ồn động cơ và tiếng nói xung quanh.',
    specs: {
      'Thời lượng pin': '30 giờ (bật ANC), 40 giờ (tắt ANC)',
      'Trọng lượng': '250g',
      'Chuẩn kết nối': 'Bluetooth 5.2, Jack 3.5mm, Multipoint',
      'Bảo hành': '12 tháng chính hãng Sony Việt Nam'
    },
    scoreBreakdown: { design: 9.4, performance: 9.8, value: 9.3, usability: 9.6 },
    badge: 'Chống Ồn Số 1 Thị Trường',
    status: 'published',
    views: 38900,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-12'
  },
  {
    id: 'prod-keychron-q1-pro',
    name: 'Bàn Phím Cơ Không Dây Keychron Q1 Pro QMK/VIA',
    slug: 'keychron-q1-pro',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'ban-phim-co',
    groupSlug: 'dien-tu',
    brand: 'Keychron',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1450,
    price: 4390000,
    originalPrice: 4990000,
    priceUnit: 'đ',
    pros: [
      'Vỏ nhôm nguyên khối CNC 6063 đầm chắc kết hợp cấu trúc Double-Gasket êm ái',
      'Hỗ trợ kết nối Bluetooth 5.1 và có dây, tương thích hoàn hảo cả macOS lẫn Windows',
      'Tùy biến phím bấm linh hoạt với phần mềm QMK/VIA nguồn mở'
    ],
    cons: [
      'Trọng lượng nặng (khoảng 1.7kg), phù hợp để bàn cố định',
      'Giá cao đối với người mới bắt đầu chơi phím cơ'
    ],
    bestFor: 'Lập trình viên, dân văn phòng gõ phím nhiều cần cảm giác gõ êm ái đỉnh cao',
    shortDescription: 'Bàn phím cơ vỏ nhôm CNC cao cấp với cấu trúc Gasket Mount và kết nối không dây đa thiết bị.',
    deepReview: 'Keychron Q1 Pro là sự kết hợp hoàn hảo giữa độ hoàn thiện cơ khí tinh xảo và tính tiện dụng không dây hiện đại.',
    specs: {
      'Layout': '75% (81 phím + Núm xoay Knob)',
      'Switch': 'Keychron K Pro Red / Brown / Banana (Hotswap)',
      'Vật liệu': 'Nhôm CNC 6063 mạ Anodized',
      'Pin': '4000 mAh'
    },
    scoreBreakdown: { design: 9.7, performance: 9.5, value: 9.1, usability: 9.3 },
    badge: 'Phím Cơ Custom Tốt Nhất',
    status: 'published',
    views: 22100,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-08'
  },
  {
    id: 'prod-dell-u2724d',
    name: 'Màn Hình Đồ Họa Dell UltraSharp U2724D 2K 120Hz',
    slug: 'dell-ultrasharp-u2724d',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'man-hinh',
    groupSlug: 'dien-tu',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1980,
    price: 9890000,
    originalPrice: 11500000,
    priceUnit: 'đ',
    pros: [
      'Tấm nền IPS Black nâng độ tương phản lên 2000:1, màu đen sâu vượt trội',
      'Tần số quét 120Hz siêu mượt mà cho trải nghiệm làm việc đồ họa',
      'Độ chuẩn màu 100% sRGB và 98% DCI-P3 với Delta E < 2'
    ],
    cons: [
      'Không tích hợp cổng Thunderbolt 4 sạc nhanh như bản Hub',
      'Loa ngoài không tích hợp sẵn'
    ],
    bestFor: 'Designer, Video Editor, Photographer và người làm việc đa nhiệm chuyên nghiệp',
    shortDescription: 'Màn hình 27 inch 2K IPS Black 120Hz chuẩn màu điện ảnh với cảm biến ánh sáng thông minh.',
    deepReview: 'Dell U2724D nâng cấp tần số quét lên 120Hz tạo nên bước đột phá lớn cho dòng UltraSharp trứ danh.',
    specs: {
      'Kích thước': '27 inch QHD (2560 x 1440)',
      'Tấm nền': 'IPS Black 120Hz',
      'Độ sáng & Tương phản': '350 nits, 2000:1 Contrast',
      'Bảo hành': '36 tháng đổi mới tận nơi'
    },
    scoreBreakdown: { design: 9.5, performance: 9.6, value: 9.3, usability: 9.5 },
    badge: 'Màn Hình Đồ Họa Chuẩn Mực',
    status: 'published',
    views: 34500,
    createdAt: '2024-02-05',
    updatedAt: '2024-03-11'
  },
  {
    id: 'prod-logitech-mx-master-3s',
    name: 'Chuột Công Thái Học Logitech MX Master 3S',
    slug: 'logitech-mx-master-3s',
    type: 'physical',
    category: 'Điện tử & Công nghệ',
    categorySlug: 'dien-tu',
    groupSlug: 'dien-tu',
    brand: 'Logitech',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    score: 9.7,
    ratingCount: 4100,
    price: 2190000,
    originalPrice: 2690000,
    priceUnit: 'đ',
    pros: [
      'Cuộn điện từ MagSpeed cuộn 1000 dòng/giây cực êm và chính xác',
      'Phím bấm công nghệ Quiet Clicks giảm 90% tiếng ồn bấm chuột',
      'Cảm biến quang học 8000 DPI di chuyển mượt mà trên mọi bề mặt kể cả mặt kính'
    ],
    cons: [
      'Chỉ thiết kế cho người thuận tay phải',
      'Kích thước chuột khá lớn với người có bàn tay nhỏ'
    ],
    bestFor: 'Lập trình viên, chuyên viên phân tích dữ liệu, dân văn phòng làm việc 8-12 tiếng/ngày',
    shortDescription: 'Chuột công thái học cao cấp với bánh cuộn MagSpeed siêu tốc và phím bấm siêu êm chống mỏi cổ tay.',
    deepReview: 'MX Master 3S là chiếc chuột làm việc hoàn hảo nhất với khả năng kết nối 3 thiết bị và luân chuyển file qua Logitech Flow.',
    specs: {
      'Cảm biến': 'Darkfield 8000 DPI (hoạt động trên kính)',
      'Thời lượng pin': 'Lên đến 70 ngày, sạc nhanh Type-C',
      'Kết nối': 'Bluetooth Low Energy & Logi Bolt USB',
      'Bảo hành': '12 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.8, performance: 9.7, value: 9.5, usability: 9.8 },
    badge: 'Chuột Làm Việc Tốt Nhất',
    status: 'published',
    views: 45000,
    createdAt: '2024-01-05',
    updatedAt: '2024-03-10'
  },

  // ==========================================
  // --- SỨC KHỎE & ĐỜI SỐNG ---
  // ==========================================
  {
    id: 'prod-xiaomi-s400',
    name: 'Cân Điện Tử Thông Minh Xiaomi Body Composition Scale S400',
    slug: 'xiaomi-scale-s400',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'can-dien-tu',
    groupSlug: 'suc-khoe',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    score: 9.2,
    ratingCount: 1890,
    price: 590000,
    originalPrice: 790000,
    priceUnit: 'đ',
    pros: [
      'Phân tích 25 chỉ số cơ thể chuyên sâu: tỷ lệ mỡ, cơ, nước, mỡ nội tạng và tuổi sinh học',
      'Công nghệ đo trở kháng điện sinh học tần số kép BIA độ chính xác cao tương đương máy DEXA',
      'Kết nối Bluetooth tự động đồng bộ app Mi Fitness cho cả gia đình'
    ],
    cons: [
      'Cần đứng chân trần khô ráo để điện cực đo chính xác nhất',
      'Sử dụng 3 viên pin AAA thay vì sạc cổng Type-C'
    ],
    bestFor: 'Người tập gym, giảm cân, theo dõi thể trạng sức khỏe gia đình định kỳ',
    shortDescription: 'Cân phân tích 25 chỉ số sức khỏe cơ thể chuẩn y khoa với công nghệ đo điện sinh học kép BIA.',
    deepReview: 'Xiaomi S400 là thiết bị theo dõi thể trạng ngon-bổ-rẻ nhất cho mọi gia đình hiện đại.',
    specs: {
      'Phạm vi cân': '0.1kg - 150kg',
      'Kết nối': 'Bluetooth 5.0 (App Mi Fitness)',
      'Mặt kính': 'Kính cường lực phủ màng chống trượt ITO',
      'Bảo hành': '12 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.3, performance: 9.2, value: 9.6, usability: 9.4 },
    badge: 'Cân Sức Khỏe Bán Chạy Nhất',
    status: 'published',
    views: 17800,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-09'
  },
  {
    id: 'prod-oral-b-io9',
    name: 'Bàn Chải Điện Sóng Âm Oral-B iO Series 9 Smart AI',
    slug: 'oral-b-io-series-9',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'ban-chai-dien',
    groupSlug: 'suc-khoe',
    brand: 'Oral-B',
    image: 'https://images.unsplash.com/photo-1559591937-e10220268571?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1250,
    price: 5490000,
    originalPrice: 6990000,
    priceUnit: 'đ',
    pros: [
      'Động cơ từ tính iO Magnetic Drive chuyển động êm ái làm sạch từng kẽ răng',
      'Trí tuệ nhân tạo AI theo dõi 3D 16 vùng răng giúp bạn không bỏ sót bất kỳ vị trí nào',
      'Màn hình màu OLED tương tác thông minh cùng cảm biến lực bảo vệ nướu'
    ],
    cons: [
      'Đầu bàn chải thay thế có chi phí định kỳ cao hơn dòng Vitality',
      'Cần sạc đều đặn 7-10 ngày một lần nếu chải nhiều lần/ngày'
    ],
    bestFor: 'Người niềng răng, viêm nướu, người muốn chăm sóc răng miệng chuẩn nha khoa',
    shortDescription: 'Bàn chải điện công nghệ từ tính iO cao cấp nhất với theo dõi 3D và 7 chế độ làm sạch chuyên sâu.',
    deepReview: 'Oral-B iO9 đem lại cảm giác răng sạch bóng như vừa lấy cao răng tại phòng khám nha khoa.',
    specs: {
      'Công nghệ': 'Magnetic iO Technology + Vi rung sóng âm',
      'Chế độ': '7 chế độ chải răng chuyên biệt',
      'Đế sạc': 'Sạc từ tính siêu nhanh Magnetic Charger (3 tiếng)',
      'Bảo hành': '24 tháng'
    },
    scoreBreakdown: { design: 9.6, performance: 9.7, value: 8.9, usability: 9.5 },
    badge: 'Chăm Sóc Răng Miệng Đỉnh Cao',
    status: 'published',
    views: 20400,
    createdAt: '2024-01-18',
    updatedAt: '2024-03-10'
  },
  {
    id: 'prod-omron-hem7156t',
    name: 'Máy Đo Huyết Áp Bắp Tay Omron HEM-7156T Bluetooth',
    slug: 'omron-hem7156t',
    type: 'physical',
    category: 'Sức khỏe & Đời sống',
    categorySlug: 'suc-khoe',
    groupSlug: 'suc-khoe',
    brand: 'Omron',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 2600,
    price: 1590000,
    originalPrice: 1990000,
    priceUnit: 'đ',
    pros: [
      'Vòng bít xoay 360 độ IntelliWrap quấn bắp tay chuẩn xác ở mọi góc độ',
      'Công nghệ cảm biến IntelliSense tự động bơm hơi êm dịu không gây thắt đau tay',
      'Đồng bộ kết quả tự động qua Bluetooth với ứng dụng Omron Connect trên điện thoại'
    ],
    cons: [
      'Màn hình không có đèn nền ban đêm',
      'Chưa kèm củ nguồn Adapter sạc điện lưới trong hộp cơ bản'
    ],
    bestFor: 'Người lớn tuổi, người có tiền sử huyết áp và tim mạch cần theo dõi huyết áp hàng ngày',
    shortDescription: 'Máy đo huyết áp bắp tay của Nhật Bản với vòng bít 360 độ IntelliWrap và kết nối Bluetooth tiện lợi.',
    deepReview: 'Omron HEM-7156T là thiết bị y tế gia đình tin cậy nhất được các bác sĩ tim mạch khuyên dùng.',
    specs: {
      'Phương pháp đo': 'Dao động điện tử bắp tay',
      'Bộ nhớ': 'Lưu 60 kết quả đo kèm ngày giờ',
      'Công nghệ': 'IntelliSense + Vòng bít 360 độ IntelliWrap',
      'Bảo hành': '5 năm chính hãng Omron Nhật Bản'
    },
    scoreBreakdown: { design: 9.2, performance: 9.6, value: 9.5, usability: 9.5 },
    badge: 'Đo Huyết Áp Chuẩn Y Khoa',
    status: 'published',
    views: 28900,
    createdAt: '2024-01-08',
    updatedAt: '2024-03-07'
  },

  // ==========================================
  // --- THỜI TRANG & PHỤ KIỆN ---
  // ==========================================
  {
    id: 'prod-rayban-aviator',
    name: 'Kính Mát Phân Cực Ray-Ban Aviator Classic Polarized',
    slug: 'rayban-aviator-classic',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'kinh-mat',
    groupSlug: 'thoi-trang',
    brand: 'Ray-Ban',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1680,
    price: 4690000,
    originalPrice: 5500000,
    priceUnit: 'đ',
    pros: [
      'Tròng kính thủy tinh Polarized chống chói 99.9% và bảo vệ 100% tia UV400 độc hại',
      'Gọng kim loại mạ vàng cao cấp siêu nhẹ, bền bỉ và giữ form xuất sắc',
      'Thiết kế giọt lệ phi công kinh điển không bao giờ lỗi thời qua mọi thập kỷ'
    ],
    cons: [
      'Tròng kính thủy tinh chống trầy tốt nhưng cần cẩn thận tránh làm rơi vỡ mạnh',
      'Nhiều hàng giả nhái trên thị trường cần chọn điểm bán chính hãng uy tín'
    ],
    bestFor: 'Người lái xe ô tô, du lịch biển dã ngoại và người yêu thích thời trang sang trọng',
    shortDescription: 'Mẫu kính phi công huyền thoại với tròng phân cực Polarized chống lóa hoàn hảo từ Italy.',
    deepReview: 'Ray-Ban Aviator Classic là biểu tượng vượt thời gian mang lại tầm nhìn trong trẻo và phong cách lịch lãm.',
    specs: {
      'Gọng kính': 'Hợp kim kim loại chống ăn mòn mạ vàng',
      'Tròng kính': 'Thủy tinh khoáng xanh rêu G-15 Polarized',
      'Kích thước': 'Size 58mm tiêu chuẩn',
      'Xuất xứ': 'Made in Italy (Bảo hành 24 tháng)'
    },
    scoreBreakdown: { design: 9.8, performance: 9.5, value: 9.0, usability: 9.3 },
    badge: 'Kính Mát Kinh Điển',
    status: 'published',
    views: 21300,
    createdAt: '2024-01-14',
    updatedAt: '2024-03-06'
  },
  {
    id: 'prod-bellroy-sling',
    name: 'Túi Đeo Chéo Chống Nước Bellroy Sling Mini 4L',
    slug: 'bellroy-sling-mini-4l',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'thoi-trang',
    groupSlug: 'thoi-trang',
    brand: 'Bellroy',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 920,
    price: 2450000,
    originalPrice: 2890000,
    priceUnit: 'đ',
    pros: [
      'Cơ chế dây tự động co giãn thông minh (Self-compressing gusset) tự thu gọn theo lượng đồ',
      'Chất liệu vải tái chế dệt chống thấm nước và khóa nam châm Fidlock tháo mở 1 giây',
      'Ngăn chứa kính râm có lớp lót nhung mềm riêng biệt'
    ],
    cons: [
      'Dung tích 4L nhỏ gọn chỉ chứa vừa iPad Mini, không để vừa máy tính bảng lớn',
      'Giá cao cho phân khúc túi đeo chéo mini'
    ],
    bestFor: 'Người theo phong cách EDC tối giản, đựng điện thoại, ví tiền, chìa khóa, tai nghe khi ra ngoài',
    shortDescription: 'Túi đeo chéo thông minh tự co giãn bằng vải trượt nước và khóa nam châm từ tính cao cấp.',
    deepReview: 'Bellroy Sling Mini là chiếc túi dạo phố đẹp nhất giúp bạn giải phóng hoàn toàn túi quần khi ra ngoài.',
    specs: {
      'Dung tích': '4 Lít (Kích thước 12 x 26 x 12 cm)',
      'Chất liệu': 'Vải dệt tái chế bền bỉ chống thấm nước',
      'Khóa nối': 'Nam châm từ tính Fidlock cao cấp',
      'Bảo hành': '3 năm chính hãng Bellroy'
    },
    scoreBreakdown: { design: 9.6, performance: 9.4, value: 9.0, usability: 9.5 },
    badge: 'Túi Đeo Chéo EDC Đẹp Nhất',
    status: 'published',
    views: 14700,
    createdAt: '2024-02-12',
    updatedAt: '2024-03-10'
  },
  {
    id: 'prod-secrid-slimwallet',
    name: 'Ví Da Nam Chống Trộm Sóng RFID Secrid Slimwallet',
    slug: 'secrid-slimwallet-leather',
    type: 'physical',
    category: 'Thời trang & Phụ kiện',
    categorySlug: 'thoi-trang',
    groupSlug: 'thoi-trang',
    brand: 'Secrid',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    score: 9.4,
    ratingCount: 1100,
    price: 1850000,
    originalPrice: 2190000,
    priceUnit: 'đ',
    pros: [
      'Cần gạt đẩy thẻ Cardprotector bằng nhôm đẩy thẻ xếp tầng chỉ bằng 1 nút gạt tiện lợi',
      'Ngăn chặn 100% các cuộc tấn công quét trộm thẻ tín dụng không dây RFID/NFC',
      'Chất liệu da bò tự nhiên Châu Âu cao cấp mỏng nhẹ không cộm túi quần'
    ],
    cons: [
      'Ngăn tiền mặt dạng kẹp nhựa gập chỉ giữ được khoảng 8-10 tờ tiền phẳng',
      'Không có ngăn chứa tiền xu'
    ],
    bestFor: 'Người dùng thẻ thanh toán là chính, thích ví siêu mỏng nhẹ lịch thiệp',
    shortDescription: 'Ví da đựng thẻ thông minh sản xuất tại Hà Lan với cơ chế đẩy thẻ 1 chạm và chống trộm sóng RFID.',
    deepReview: 'Secrid Slimwallet tái định nghĩa ví tiền hiện đại trong thời đại thanh toán không tiền mặt.',
    specs: {
      'Chứa được': '4-6 thẻ trong lõi nhôm + 6 thẻ phụ + Tiền mặt',
      'Vật liệu': 'Nhôm nguyên khối + Da bò Vintage Châu Âu',
      'Kích thước': '68 x 102 x 16 mm (Trọng lượng 72g)',
      'Sản xuất tại': 'Hà Lan (Made in Holland)'
    },
    scoreBreakdown: { design: 9.7, performance: 9.5, value: 9.1, usability: 9.6 },
    badge: 'Ví Thẻ Thông Minh Số 1',
    status: 'published',
    views: 19800,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-08'
  },

  // ==========================================
  // --- MẸ & BÉ ---
  // ==========================================
  {
    id: 'prod-joie-spin-360',
    name: 'Ghế Ngồi Ô Tô Xoay 360 Độ Cho Bé Joie Spin 360',
    slug: 'joie-spin-360-signature',
    type: 'physical',
    category: 'Mẹ & Bé',
    categorySlug: 'ghe-o-to',
    groupSlug: 'me-va-be',
    brand: 'Joie',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 1340,
    price: 6590000,
    originalPrice: 7990000,
    priceUnit: 'đ',
    pros: [
      'Trục xoay 360 độ linh hoạt giúp bố mẹ dễ dàng bế bé ra vào xe mà không bị vướng víu',
      'Đạt tiêu chuẩn an toàn châu Âu ECE R44/04 với hệ thống kết nối chuẩn ISOFIX cực kỳ chắc chắn',
      'Đệm êm ái thoáng khí bằng memory foam giảm chấn động tối đa cho cột sống non nớt của trẻ'
    ],
    cons: [
      'Trọng lượng ghế 12kg khá nặng khi cần tháo chuyển đổi giữa các xe',
      'Kích thước ghế ôm chiếm khoảng 1.5 vị trí ghế sau'
    ],
    bestFor: 'Gia đình có xe hơi và bé từ sơ sinh đến 4 tuổi (0 - 18kg)',
    shortDescription: 'Ghế ngồi ô tô an toàn xoay 360 độ chuẩn ISOFIX chống rung chấn bảo vệ bé trọn vẹn.',
    deepReview: 'Joie Spin 360 là sự lựa chọn số 1 của các gia đình có con nhỏ khi di chuyển bằng ô tô an toàn tuyệt đối.',
    specs: {
      'Độ tuổi phù hợp': 'Sơ sinh đến 4 tuổi (0 - 18kg)',
      'Lắp đặt': 'Chốt an toàn ISOFIX + Chân chống sàn (Load Leg)',
      'Chế độ xoay': 'Xoay 360 độ bằng 1 nút bấm',
      'Bảo hành': '24 tháng chính hãng Joie UK'
    },
    scoreBreakdown: { design: 9.5, performance: 9.7, value: 9.3, usability: 9.6 },
    badge: 'Ghế Ô Tô An Toàn Nhất Cho Bé',
    status: 'published',
    views: 23100,
    createdAt: '2024-01-08',
    updatedAt: '2024-03-09'
  },
  {
    id: 'prod-aprica-karoon-air',
    name: 'Xe Đẩy Em Bé Gấp Gọn Siêu Nhẹ Aprica Karoon Air AC',
    slug: 'aprica-karoon-air-ac',
    type: 'physical',
    category: 'Mẹ & Bé',
    categorySlug: 'xe-day',
    groupSlug: 'me-va-be',
    brand: 'Aprica',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 980,
    price: 4990000,
    originalPrice: 5990000,
    priceUnit: 'đ',
    pros: [
      'Trọng lượng siêu nhẹ chỉ 3.9kg, dễ dàng xách bằng 1 tay khi bế bé',
      'Hệ thống giảm xóc 3D trên 4 bánh xe giúp xe di chuyển êm ái trên đường phố gồ ghề',
      'Mái che chống thấm nước và cản 99% tia cực tím UV bảo vệ mắt và da bé'
    ],
    cons: [
      'Giỏ đựng đồ dưới gầm xe chỉ chịu tải tối đa 3kg',
      'Trọng lượng nhẹ nên khi treo túi nặng phía sau có thể bị bốc đầu nếu không có bé ngồi'
    ],
    bestFor: 'Mẹ bỉm thường xuyên đưa bé đi dạo, du lịch bằng máy bay hoặc ở nhà phố nhiều tầng',
    shortDescription: 'Xe đẩy em bé Nhật Bản siêu nhẹ 3.9kg, gấp gọn 1 chạm với hệ thống đệm thoáng khí Silky Air.',
    deepReview: 'Aprica Karoon Air giải tỏa hoàn toàn gánh nặng mang vác cho các mẹ với độ bền vượt thời gian.',
    specs: {
      'Trọng lượng': '3.9 kg (Siêu nhẹ)',
      'Góc ngả lưng': '121° đến 157° (Phù hợp cho bé ngủ)',
      'Bánh xe': 'Hệ thống giảm xóc 3D độc quyền',
      'Độ tuổi': '1 tháng đến 36 tháng (dưới 15kg)'
    },
    scoreBreakdown: { design: 9.4, performance: 9.3, value: 9.2, usability: 9.7 },
    badge: 'Xe Đẩy Gấp Gọn Tiện Nhất',
    status: 'published',
    views: 16500,
    createdAt: '2024-02-04',
    updatedAt: '2024-03-07'
  },
  {
    id: 'prod-bear-slow-cooker',
    name: 'Nồi Nấu Cháo Chậm Cách Thủy Bear 1.6L Thông Minh',
    slug: 'bear-slow-cooker-1-6l',
    type: 'physical',
    category: 'Mẹ & Bé',
    categorySlug: 'me-va-be',
    groupSlug: 'me-va-be',
    brand: 'Bear',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    score: 9.2,
    ratingCount: 2200,
    price: 620000,
    originalPrice: 850000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ hầm cách thủy giữ trọn 100% vitamin và chất dinh dưỡng trong thực phẩm',
      'Thố sứ Ceramic tự nhiên chịu nhiệt cao không bám mùi và an toàn tuyệt đối',
      'Chức năng hẹn giờ nấu trước lên đến 9.5 tiếng, sáng dậy cháo đã chín nhừ'
    ],
    cons: [
      'Thời gian nấu cách thủy kéo dài 2-3 tiếng (cần hẹn giờ trước)',
      'Thố sứ cần cẩn thận khi rửa tránh va chạm sứt mẻ'
    ],
    bestFor: 'Mẹ nấu cháo ăn dặm cho bé, hầm chim yến chưng và canh bổ dưỡng cho cả nhà',
    shortDescription: 'Nồi nấu cháo chậm cách thủy bằng thố sứ Ceramic tự nhiên, giữ nguyên dưỡng chất và tự động giữ ấm.',
    deepReview: 'Nồi Bear giúp hạt cháo chín bung xốp sánh mịn mà không bị khê cháy đáy nồi như nấu bếp ga.',
    specs: {
      'Dung tích': '1.6 Lít (Kèm 1 thố lớn + 2 thố nhỏ 0.5L)',
      'Công suất': '270W siêu tiết kiệm điện',
      'Chất liệu': 'Thố sứ trắng cao cấp + Vỏ nhựa PP cách nhiệt',
      'Bảo hành': '18 tháng chính hãng'
    },
    scoreBreakdown: { design: 9.2, performance: 9.4, value: 9.7, usability: 9.4 },
    badge: 'Nồi Nấu Cháo Ăn Dặm Số 1',
    status: 'published',
    views: 31200,
    createdAt: '2024-01-16',
    updatedAt: '2024-03-08'
  },

  // ==========================================
  // --- THỂ THAO & DÃ NGOẠI ---
  // ==========================================
  {
    id: 'prod-decathlon-resistance-band',
    name: 'Bộ Dây Kháng Lực Đa Năng 5 Mức Decathlon Corength',
    slug: 'decathlon-corength-bands',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'day-khang-luc',
    groupSlug: 'the-thao',
    brand: 'Decathlon',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    score: 9.3,
    ratingCount: 1750,
    price: 390000,
    originalPrice: 520000,
    priceUnit: 'đ',
    pros: [
      'Chất liệu cao su tự nhiên 100% đàn hồi siêu bền không bị giãn nhão sau hàng ngàn lần kéo',
      'Đầy đủ 5 cấp độ lực kháng từ 5kg đến 45kg phù hợp mọi bài tập mông, chân, vai, tay',
      'Nhỏ gọn dễ dàng mang đi du lịch hoặc tập luyện tại nhà mà không cần đến phòng gym'
    ],
    cons: [
      'Mới mở hộp có mùi cao su nhẹ (hết sau 1-2 ngày để nơi thoáng)',
      'Cần tránh để vật sắc nhọn cứa vào dây'
    ],
    bestFor: 'Người tập gym tại nhà, calisthenics, phục hồi chức năng và giãn cơ sau chạy bộ',
    shortDescription: 'Bộ 5 dây kháng lực cao su thiên nhiên độ bền cao hỗ trợ tập luyện toàn thân mọi lúc mọi nơi.',
    deepReview: 'Bộ dây Decathlon Corength là dụng cụ thể thao đáng tiền nhất cho bất kỳ ai muốn rèn luyện thể lực tại nhà.',
    specs: {
      'Số lượng': 'Bộ 5 dây tương ứng 5kg, 15kg, 25kg, 35kg, 45kg',
      'Chất liệu': '100% Cao su tự nhiên Latex',
      'Phụ kiện': 'Tặng kèm túi lưới đựng dây tiện dụng',
      'Bảo hành': '2 năm chính hãng Decathlon'
    },
    scoreBreakdown: { design: 9.1, performance: 9.5, value: 9.8, usability: 9.6 },
    badge: 'Dụng Cụ Tập Gym Tại Nhà Tốt Nhất',
    status: 'published',
    views: 18700,
    createdAt: '2024-01-30',
    updatedAt: '2024-03-06'
  },
  {
    id: 'prod-naturehike-village-13',
    name: 'Lều Cắm Trại Tự Bung Naturehike Village 13.0 Cloud',
    slug: 'naturehike-village-13-cloud',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'the-thao',
    groupSlug: 'the-thao',
    brand: 'Naturehike',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 840,
    price: 6890000,
    originalPrice: 8200000,
    priceUnit: 'đ',
    pros: [
      'Cơ chế khung tự bung thông minh giúp dựng lều khổng lồ chỉ trong 3 phút không cần lắp ghép phức tạp',
      'Diện tích siêu rộng 13m² thiết kế 2 phòng ngủ + 1 phòng khách kèm mái hiên che nắng',
      'Vải Oxford 210D phủ tráng bạc chống nắng UPF50+ và chống mưa lớn PU3000mm'
    ],
    cons: [
      'Trọng lượng lều khá nặng 22kg (thích hợp di chuyển bằng ô tô)',
      'Kích thước bao đựng dài 1.1m cần cốp xe rộng rãi'
    ],
    bestFor: 'Gia đình 4-8 người đi cắm trại Glamping dã ngoại cuối tuần tiện nghi như khách sạn',
    shortDescription: 'Lều cắm trại tự bung phong cách biệt thự Village rộng 13m² chống mưa bão và nắng nóng tuyệt đối.',
    deepReview: 'Naturehike Village 13.0 là chuẩn mực của xu hướng cắm trại Glamping sang chảnh và tiện lợi.',
    specs: {
      'Kích thước mở': '395 x 270 x 183 cm (Diện tích 13m²)',
      'Chống nước & Nắng': 'PU 3000mm, UPF 50+',
      'Tích hợp': 'Đèn LED gắn trần lều và cổng luồn dây điện',
      'Bảo hành': '12 tháng chính hãng Naturehike'
    },
    scoreBreakdown: { design: 9.8, performance: 9.6, value: 9.2, usability: 9.5 },
    badge: 'Lều Cắm Trại Glamping Đẳng Cấp',
    status: 'published',
    views: 25600,
    createdAt: '2024-02-18',
    updatedAt: '2024-03-12'
  },
  {
    id: 'prod-stanley-iceflow-890ml',
    name: 'Bình Nước Giữ Nhiệt Thể Thao Stanley The IceFlow 890ml',
    slug: 'stanley-iceflow-flip-straw',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'the-thao',
    groupSlug: 'the-thao',
    brand: 'Stanley',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    score: 9.5,
    ratingCount: 3100,
    price: 1190000,
    originalPrice: 1450000,
    priceUnit: 'đ',
    pros: [
      'Công nghệ cách nhiệt chân không kép giữ lạnh nước đá lên đến 48 giờ liên tục',
      'Nắp vòi hút Flip Straw chống rò rỉ nước 100% ngay cả khi nằm nghiêng trong balo',
      'Thép không gỉ 18/8 không chứa BPA an toàn sức khỏe và quai xách công thái học'
    ],
    cons: [
      'Thiết kế chuyên giữ lạnh, không khuyến khích đựng nước sôi 100°C khi uống trực tiếp qua ống hút',
      'Thân bình đường kính hơi to với các hộc để ly xe đạp cỡ nhỏ'
    ],
    bestFor: 'Người tập gym, chạy bộ, thể thao ngoài trời và dân văn phòng cần uống đủ 2L nước mỗi ngày',
    shortDescription: 'Bình giữ nhiệt thể thao chính hãng Stanley của Mỹ giữ nước đá lạnh 48h với vòi hút chống tràn.',
    deepReview: 'Stanley IceFlow là người bạn đồng hành không thể thiếu giúp bạn luôn có ngụm nước mát lạnh sảng khoái.',
    specs: {
      'Dung tích': '890ml (30 oz)',
      'Khả năng giữ nhiệt': 'Giữ lạnh 12 giờ, Giữ đá lạnh 48 giờ',
      'Vật liệu': 'Thép không gỉ 18/8 Recycled Stainless Steel',
      'Bảo hành': 'Trọn đời Lifetime Warranty'
    },
    scoreBreakdown: { design: 9.6, performance: 9.8, value: 9.3, usability: 9.7 },
    badge: 'Bình Giữ Nhiệt Thể Thao Số 1',
    status: 'published',
    views: 39000,
    createdAt: '2024-01-11',
    updatedAt: '2024-03-10'
  },
  {
    id: 'prod-coros-pace-3',
    name: 'Đồng Hồ Thể Thao Chuyên Chạy Bộ Coros Pace 3 GPS',
    slug: 'coros-pace-3-gps',
    type: 'physical',
    category: 'Thể thao & Dã ngoại',
    categorySlug: 'the-thao',
    groupSlug: 'the-thao',
    brand: 'Coros',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    score: 9.6,
    ratingCount: 1650,
    price: 6190000,
    originalPrice: 6990000,
    priceUnit: 'đ',
    pros: [
      'Trọng lượng siêu nhẹ chỉ 30g với dây nylon, đeo như không đeo khi chạy cự ly dài',
      'Chip GPS băng tần kép (Dual-Frequency GPS) bắt sóng định vị chuẩn xác dưới tán cây và nhà cao tầng',
      'Thời lượng pin khủng 38 giờ ở chế độ GPS liên tục và 17 ngày sử dụng hàng ngày'
    ],
    cons: [
      'Màn hình Memory-in-Pixel (MIP) hiển thị ngoài trời cực rõ nhưng trong nhà không rực rỡ như AMOLED',
      'Chỉ chuyên sâu thể thao, không hỗ trợ trả lời tin nhắn cuộc gọi như Apple Watch'
    ],
    bestFor: 'Vận động viên chạy bộ marathon, triathlon 3 môn phối hợp và chạy địa hình trail',
    shortDescription: 'Đồng hồ GPS chạy bộ số 1 thế giới với trọng lượng siêu nhẹ 30g và GPS băng tần kép đỉnh cao.',
    deepReview: 'Coros Pace 3 là vũ khí đắc lực giúp mọi chân chạy phá vỡ kỷ lục cá nhân (PB) trong các giải đua.',
    specs: {
      'Trọng lượng': '30g (kèm dây nylon)',
      'Định vị': 'Dual-Frequency GPS (GPS, GLONASS, Galileo, Beidou, QZSS)',
      'Thời lượng pin': '38 giờ GPS liên tục, 17 ngày hàng ngày',
      'Chống nước': '5 ATM (50m)'
    },
    scoreBreakdown: { design: 9.3, performance: 9.8, value: 9.7, usability: 9.6 },
    badge: 'Đồng Hồ Chạy Bộ Tốt Nhất 2024',
    status: 'published',
    views: 33400,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-11'
  }
];


