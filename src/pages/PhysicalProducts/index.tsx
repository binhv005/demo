import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductCard } from '../../components/product/ProductCard';
import { RankingCard } from '../../components/ranking/RankingCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { renderCategoryIcon } from '../../utils/icons';
import { Flame, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PhysicalProductsPage: React.FC = () => {
  const { categories, products, rankings, articles } = useData();

  const physicalCategories = categories.filter((c) => c.group === 'physical' && c.status !== 'inactive');
  const physicalProducts = products.filter((p) => p.type === 'physical' && p.status !== 'draft');
  const physicalRankings = rankings.filter((r) => r.type === 'physical' && r.status !== 'draft');
  const physicalArticles = articles.filter((a) => a.productType === 'physical' && (a.status === 'published' || !a.status));

  const faqItems = [
    {
      id: 'phy-faq-1',
      title: 'Các sản phẩm vật lý được kiểm tra trong bao lâu trước khi viết review?',
      content: 'Thời gian thử nghiệm thực tế dao động từ 14 đến 60 ngày tùy theo chủng loại sản phẩm (ví dụ nồi chiên không dầu thử nghiệm ít nhất 30 ngày với 20 món ăn khác nhau).'
    },
    {
      id: 'phy-faq-2',
      title: 'Làm thế nào để biết giá hiển thị là mới nhất?',
      content: 'Chúng tôi cập nhật giá tham khảo từ các sàn thương mại điện tử lớn và đại lý ủy quyền chính hãng tại Việt Nam hàng tuần.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Category Hero */}
      <section className="bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200/60 py-10">
        <Container size="xl">
          <Breadcrumb items={[{ label: 'Sản phẩm vật lý' }]} />

          <div className="mt-4 space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-800 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Chuyên trang Đánh giá Đồ Gia Dụng & Công Nghệ Thực Tế</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Sản Phẩm Vật Lý & Đời Sống
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tổng hợp đánh giá chi tiết, bảng xếp hạng Top 10 và cẩm nang lựa chọn đồ gia dụng, thiết bị công nghệ, sức khỏe và thời trang được thử nghiệm độc lập.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Categories (6 Grid) */}
      <section>
        <Container size="xl">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Danh Mục Vật Lý Chính
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {physicalCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      {renderCategoryIcon(cat.icon, 'w-6 h-6')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                      <span className="text-xs text-slate-400">{cat.count}+ bài đánh giá</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {cat.description}
                  </p>
                  {/* Subcategories pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/${cat.groupSlug}/${sub.slug}`}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-orange-50 hover:text-orange-700 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>Xem danh mục</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Rankings in Physical */}
      <section className="bg-slate-100/60 py-12 border-y border-slate-200/80">
        <Container size="xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Top Picks 2024
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Bảng Xếp Hạng Vật Lý Hàng Đầu
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {physicalRankings.map((r) => (
              <RankingCard key={r.id} ranking={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Products */}
      <section>
        <Container size="xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sản phẩm nổi bật
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Thiết Bị Đạt Điểm Cao Nhất
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {physicalProducts.map((p) => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </Container>
      </section>

      {/* Buying Guides in Physical */}
      <section>
        <Container size="xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hướng Dẫn Mua Sắm Mới Nhất
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {physicalArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="standard" />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section>
        <Container size="md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Câu Hỏi Thường Gặp Về Sản Phẩm Vật Lý</h2>
          </div>
          <Accordion items={faqItems} defaultOpenId="phy-faq-1" />
        </Container>
      </section>
    </div>
  );
};
