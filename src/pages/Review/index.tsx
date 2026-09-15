import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductHero } from '../../components/product/ProductHero';
import { ProsCons } from '../../components/product/ProsCons';
import { ProductScore } from '../../components/product/ProductScore';
import { SpecsTable } from '../../components/product/SpecsTable';
import { ProductCard } from '../../components/product/ProductCard';
import { AuthorCard } from '../../components/article/AuthorCard';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, ArrowRight, CheckCircle2, HelpCircle, Scale } from 'lucide-react';

export const ReviewDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, experts, comparisons } = useData();

  const product = products.find((p) => p.slug === slug) || products[0];
  const author = experts[0];

  // Find competitors/alternatives in same category
  const alternatives = products
    .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.type === product.type))
    .slice(0, 3);

  // Related comparison if exists
  const relatedComparison = comparisons.find(
    (c) => c.productAId === product.id || c.productBId === product.id
  );

  const faqItems = [
    {
      id: 'rev-faq-1',
      title: `${product.name} có đáng mua trong tầm giá không?`,
      content: `Với số điểm ${product.score}/10, đây là một trong những sản phẩm có tỷ lệ hiệu năng trên giá thành (P/P) tốt nhất phân khúc hiện nay, đặc biệt là ưu điểm ${product.pros[0] || 'vượt trội'}.`
    },
    {
      id: 'rev-faq-2',
      title: 'Chính sách bảo hành và đổi trả như thế nào?',
      content: 'Sản phẩm được bảo hành chính hãng từ 12-24 tháng theo tiêu chuẩn nhà phân phối với hệ thống trung tâm bảo hành toàn quốc.'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-slate-50/80 pt-6 pb-12 border-b border-slate-200/60">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: product.type === 'physical' ? 'Sản phẩm vật lý' : 'Sản phẩm số', path: product.type === 'physical' ? '/san-pham-vat-ly' : '/san-pham-so' },
              { label: product.category, path: `/${product.groupSlug}/${product.categorySlug}` },
              { label: product.name }
            ]}
          />
          <div className="mt-4">
            <ProductHero product={product} />
          </div>
        </Container>
      </section>

      {/* Main Review Body */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full min-w-0">
          {/* Main Review Article (8 cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12 min-w-0 w-full">
            {/* Quick Verdict */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Nhận Định Nhanh Của Chuyên Gia (Quick Verdict)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {product.deepReview}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Ưu Điểm & Nhược Điểm Đã Kiểm Nghiệm
              </h2>
              <ProsCons pros={product.pros} cons={product.cons} />
            </div>

            {/* Score Breakdown (Mobile & Tablet) */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Chi Tiết Chấm Điểm Từng Tiêu Chí
              </h2>
              <ProductScore score={product.score} breakdown={product.scoreBreakdown} />
            </div>

            {/* In-depth Deep Review Section */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Đánh Giá Chi Tiết Sau 30 Ngày Sử Dụng Thực Tế
              </h2>
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                <p>
                  Trong suốt quá trình thử nghiệm khắt khe, chúng tôi đã đưa <strong>{product.name}</strong> qua nhiều kịch bản sử dụng cường độ cao để kiểm tra độ ổn định nhiệt độ, phản hồi thao tác và độ bền vật liệu.
                </p>
                <h4 className="text-base font-bold text-slate-900 pt-2">1. Về thiết kế và cảm giác sử dụng</h4>
                <p>
                  Sản phẩm mang lại cảm giác hoàn thiện rất chắc chắn, các mối nối kín khít và vật liệu thân thiện. Thiết kế tối giản hiện đại phù hợp với mọi không gian làm việc hoặc gian bếp gia đình.
                </p>
                <h4 className="text-base font-bold text-slate-900 pt-2">2. Về hiệu năng vận hành</h4>
                <p>
                  Khả năng vận hành vượt qua kỳ vọng của chúng tôi. Độ ồn trong quá trình hoạt động được giữ ở mức rất thấp, nhiệt độ bề mặt ngoài luôn an toàn khi chạm vào.
                </p>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Bảng Thông Số Kỹ Thuật Chi Tiết
              </h2>
              <SpecsTable specs={product.specs} />
            </div>

            {/* Related Comparison Callout */}
            {relatedComparison && (
              <div className="p-6 rounded-3xl bg-indigo-50/80 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" /> So sánh đối đầu
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">{relatedComparison.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{relatedComparison.verdict}</p>
                </div>
                <Link to={`/so-sanh/${relatedComparison.slug}`} className="flex-shrink-0">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Xem bài so sánh
                  </Button>
                </Link>
              </div>
            )}

            {/* Author */}
            {author && <AuthorCard expert={author} />}

            {/* FAQ */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Câu Hỏi Thường Gặp Về {product.name}
              </h2>
              <Accordion items={faqItems} defaultOpenId="rev-faq-1" />
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8 min-w-0 w-full">
            {/* Quick Buy Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-sm sticky top-24">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tóm tắt quyết định
                </span>
                <h3 className="font-extrabold text-xl text-slate-900">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-indigo-600">
                    {product.score.toFixed(1)} / 10
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Khuyên Dùng
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <Button variant="primary" size="md" className="w-full font-bold">
                  Xem nơi bán giá tốt nhất
                </Button>
                <Link to={`/${product.groupSlug}/${product.categorySlug}`} className="w-full block">
                  <Button variant="outline" size="md" className="w-full">
                    Xem sản phẩm cùng danh mục
                  </Button>
                </Link>
              </div>

              {/* Alternatives List */}
              {alternatives.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Các lựa chọn thay thế (Alternatives)
                  </span>
                  <div className="space-y-2.5">
                    {alternatives.map((alt) => (
                      <Link
                        key={alt.id}
                        to={`/review/${alt.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <img
                          src={alt.image}
                          alt={alt.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 truncate block">
                            {alt.name}
                          </span>
                          <span className="text-[11px] text-slate-400">Điểm: {alt.score}/10</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
