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
  }
];
