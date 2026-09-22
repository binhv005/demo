import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { CountUp } from '../ui/CountUp';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Quốc Bảo',
      role: 'Kỹ sư phần mềm & Độc giả thường xuyên',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content:
        'Nhờ bảng so sánh chi tiết và tiêu chí khách quan của Top20Product, mình đã chọn đúng chiếc ProBook 14 OLED phục vụ công việc lập trình. Thông số đo thời lượng pin và tản nhiệt trong lab cực kỳ chuẩn xác!',
      badge: 'Độc giả đã xác thực'
    },
    {
      id: 2,
      name: 'Trần Thị Thu Hà',
      role: 'Nội trợ & Yêu thích gia dụng',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content:
        'Trước khi mua nồi chiên không dầu mình rất bối rối vì trên mạng toàn bài quảng cáo được tài trợ. Top20Product phân tích rõ ràng ưu nhược điểm của từng loại và giúp mình tiết kiệm gần 1 triệu đồng.',
      badge: 'Người mua thông minh'
    },
    {
      id: 3,
      name: 'Lê Minh Trí',
      role: 'Content Creator & AI Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content:
        'Chuyên mục đánh giá công cụ AI và phần mềm số ở đây cập nhật cực kỳ nhanh. Bảng xếp hạng Top 10 kèm so sánh tính năng thực tế giúp team mình chọn đúng công cụ nâng cao gấp đôi năng suất.',
      badge: 'Chuyên gia công nghệ'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-7 pb-8 sm:pt-9 sm:pb-10 border-t border-stone-200/80 bg-[#f7f4ef]">
      <Container size="xl" className="relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-7">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Độc Giả Nói Gì Về Top20Product?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Hơn 1.200.000 người tiêu dùng đã lựa chọn được sản phẩm ưng ý nhất{' '}
            <span className="block sm:inline">nhờ những đánh giá độc lập, minh bạch và khoa học.</span>
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#dce4de] rounded-3xl p-6 sm:p-7 border border-[#c2cdc4] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#b8c5bb] group-hover:text-orange-400 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content Quote */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic font-medium">
                  "{t.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-[#c2cdc4] flex items-center gap-3.5 mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white/90 flex-shrink-0 shadow-xs"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {t.name}
                    </h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">{t.role}</p>
                  <span className="inline-block mt-0.5 text-[9px] font-bold text-orange-800 bg-white/90 px-2 py-0.5 rounded border border-orange-200/70 shadow-2xs">
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Trust Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-around gap-6 text-center border border-slate-800 shadow-xl">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              <CountUp end={98.6} decimals={1} suffix="%" duration={1800} />
            </div>
            <div className="text-xs text-slate-300">Độc giả tin tưởng quyết định mua sắm</div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden md:block" />
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-white">
              <CountUp end={1.2} decimals={1} suffix="M+" duration={1800} />
            </div>
            <div className="text-xs text-slate-300">Lượt tra cứu & so sánh mỗi tháng</div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden md:block" />
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              <CountUp end={0} suffix=" VNĐ" duration={1000} />
            </div>
            <div className="text-xs text-slate-300">Không nhận tiền tài trợ đổi thứ hạng</div>
          </div>
        </div>
      </Container>
    </section>
  );
};
