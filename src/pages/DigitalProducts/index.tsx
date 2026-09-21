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
import { Sparkles, ArrowRight, Zap, Code, ShieldCheck, Check } from 'lucide-react';

export const DigitalProductsPage: React.FC = () => {
  const { categories, products, rankings, comparisons, articles } = useData();

  const digitalCategories = categories.filter((c) => c.group === 'digital' && c.status !== 'inactive');
  const digitalProducts = products.filter((p) => p.type === 'digital' && p.status !== 'draft');
  const digitalRankings = rankings.filter((r) => r.type === 'digital' && r.status !== 'draft');
  const digitalComparisons = comparisons.filter((c) => c.type === 'digital' && c.status !== 'draft');

  const useCases = [
    { title: 'Dành cho Lập trình viên', desc: 'AI coding, Hosting VPS, Git & Task Management', link: '/phan-mem/quan-ly-du-an' },
    { title: 'Dành cho Designer & Creator', desc: 'Figma, AI tạo ảnh Midjourney, Video Editor', link: '/phan-mem/thiet-ke' },
    { title: 'Dành cho Marketer & SEO', desc: 'Ahrefs, Copywriting AI, Email Marketing', link: '/marketing/seo-tools' },
    { title: 'Dành cho Bảo mật & Cá nhân', desc: 'NordVPN, Quản lý mật khẩu, Anti-tracking', link: '/vpn/vpn-toc-do-cao' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 border-b border-slate-200/60 py-10">
        <Container size="xl">
          <Breadcrumb items={[{ label: 'Sản phẩm số & AI' }]} />

          <div className="mt-4 space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cẩm Nang Công Cụ AI & Giải Pháp Phần Mềm 2024</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Sản Phẩm Số, AI & SaaS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Khám phá các mô hình AI tiên tiến nhất, ứng dụng năng suất, hosting cloud và phần mềm bảo mật giúp tối ưu hóa công việc cá nhân và doanh nghiệp.
            </p>
          </div>
        </Container>
      </section>

      {/* Browse by Use Case */}
      <section>
        <Container size="xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Khám Phá Theo Nhu Cầu Sử Dụng
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc, idx) => (
              <Link
                key={idx}
                to={uc.link}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all group space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {uc.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {uc.desc}
                </p>
                <div className="pt-2 text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <span>Khám phá</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section>
        <Container size="xl">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Danh Mục Phần Mềm & Công Cụ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      {renderCategoryIcon(cat.icon, 'w-6 h-6')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                      <span className="text-xs text-slate-400">{cat.count}+ giải pháp</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/${cat.groupSlug}/${sub.slug}`}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/${cat.groupSlug}/${cat.subcategories[0]?.slug || cat.slug}`}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
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

      {/* Top 10 Digital Rankings */}
      <section className="bg-slate-100/60 py-12 border-y border-slate-200/80">
        <Container size="xl">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            Bảng Xếp Hạng Công Cụ AI & Phần Mềm Hàng Đầu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalRankings.map((r) => (
              <RankingCard key={r.id} ranking={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Digital Products */}
      <section>
        <Container size="xl">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            Công Cụ AI & Phần Mềm Được Đánh Giá Cao Nhất
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalProducts.map((p) => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Comparisons */}
      {digitalComparisons.length > 0 && (
        <section>
          <Container size="xl">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
              So Sánh Đối Đầu Phổ Biến
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {digitalComparisons.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-all">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Cuộc Chiến AI
                  </span>
                  <Link to={`/so-sanh/${c.slug}`} className="block font-bold text-lg text-slate-900 hover:text-indigo-600 transition-colors">
                    {c.title}
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-2">{c.verdict}</p>
                  <Link to={`/so-sanh/${c.slug}`} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                    Xem bảng so sánh chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};
