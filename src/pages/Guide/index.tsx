import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ArticleHeader } from '../../components/article/ArticleHeader';
import { TableOfContents } from '../../components/article/TableOfContents';
import { ProductCard } from '../../components/product/ProductCard';
import { AuthorCard } from '../../components/article/AuthorCard';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Accordion } from '../../components/ui/Accordion';
import { ArrowRight, BookOpen, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, products, experts } = useData();

  const article = articles.find((a) => a.slug === slug) || articles[0];
  const author = experts.find((e) => e.id === article.authorId) || experts[0];

  // Recommended products in this guide
  const recommendedProducts = (article.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  // Other related articles
  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 2);

  const faqItems = [
    {
      id: 'g-faq-1',
      title: 'Các thông tin trong cẩm nang có được cập nhật thường xuyên không?',
      content: 'Có, ban biên tập TechReview rà soát định kỳ hàng tháng để bổ sung các công nghệ mới và phân khúc giá mới nhất.'
    },
    {
      id: 'g-faq-2',
      title: 'Tôi có thể chia sẻ lại bài viết này không?',
      content: 'Bạn hoàn toàn có thể trích dẫn hoặc chia sẻ link bài viết với điều kiện ghi rõ nguồn từ TechReview.'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Top Banner */}
      <section className="bg-slate-50/80 pt-6 pb-10 border-b border-slate-200/60">
        <Container size="xl">
          <Breadcrumb
            items={[
              { label: 'Hướng dẫn chọn mua', path: '/huong-dan/cach-chon-noi-chien-khong-dau' },
              { label: article.title }
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <ArticleHeader
              title={article.title}
              category={article.tags[0] || 'Cẩm nang'}
              expert={author}
              publishedAt={article.publishedAt}
              readingTime={article.readingTime}
              views={article.views}
              badge="Cẩm nang mua sắm chuẩn chuyên gia"
            />
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 h-72 sm:h-96">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
              <div
                id="1-gioi-thieu--boi-canh"
                className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  1. Giới thiệu & Bối cảnh thị trường
                </h3>
                <p>
                  {article.excerpt}
                </p>
                <p>
                  Khi quyết định đầu tư một món đồ dùng giá trị, việc trang bị đầy đủ kiến thức sẽ giúp bạn không bị lạc vào mê hồn trận của những lời quảng cáo quá đà từ nhà bán lẻ.
                </p>
              </div>

              <div id="2-cac-tieu-chi-chon-mua-quan-trong" className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2. Các Tiêu Chí Cốt Lõi Khi Lựa Chọn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                    <span className="text-xs font-bold text-indigo-700 uppercase">Tiêu chí 1</span>
                    <h4 className="font-bold text-slate-900 text-sm">Hiệu năng & Độ bền thực tế</h4>
                    <p className="text-xs text-slate-600">Được kiểm chứng qua các bài test tải và đo nhiệt.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Tiêu chí 2</span>
                    <h4 className="font-bold text-slate-900 text-sm">Chi phí sở hữu & Tiết kiệm</h4>
                    <p className="text-xs text-slate-600">Bao gồm cả chi phí thay thế linh kiện và tiêu thụ điện.</p>
                  </div>
                </div>
              </div>

              <div id="3-phan-khuc-ngan-sach" className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  3. Phân Khúc Ngân Sách Phù Hợp
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Đừng vội mua sản phẩm đắt tiền nhất nếu nhu cầu của bạn chỉ dừng ở mức cơ bản. Hãy chọn đúng sản phẩm có các tính năng bạn sẽ thực sự sử dụng hàng ngày.
                </p>
              </div>

              <div id="4-4-sai-lam-thuong-gap-khi-mua-noi-chien" className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  4. Các Sai Lầm Cần Tránh
                </h3>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs sm:text-sm text-slate-700 space-y-2">
                  <p className="font-semibold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Không kiểm tra kích thước thực tế trước khi đặt mua
                  </p>
                  <p className="text-xs text-slate-600">
                    Nhiều người mua hàng online thường quên đo đạc vị trí đặt trong nhà khiến việc bố trí gặp nhiều bất tiện.
                  </p>
                </div>
              </div>

              <div id="5-ket-luan--khuyen-nghi" className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  5. Kết Luận & Đề Xuất Cuối Cùng
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hy vọng bài cẩm nang này đã cung cấp cho bạn bức tranh toàn cảnh và tự tin đưa ra quyết định mua sắm tối ưu nhất.
                </p>
              </div>
            </div>

            {/* Recommended Products in Guide */}
            {recommendedProducts.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Sản Phẩm Đề Xuất Trong Cẩm Nang
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} variant="grid" />
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {author && <AuthorCard expert={author} />}

            {/* FAQ */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Câu Hỏi Thường Gặp</h2>
              <Accordion items={faqItems} defaultOpenId="g-faq-1" />
            </div>

            {/* Related Articles */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Bài Viết Liên Quan Khác</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherArticles.map((art) => (
                  <ArticleCard key={art.id} article={art} variant="standard" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {article.tableOfContents && (
              <div className="sticky top-24">
                <TableOfContents items={article.tableOfContents} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
