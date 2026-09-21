import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Container } from '../../components/ui/Container';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ArticleHeader } from '../../components/article/ArticleHeader';
import { ArticleBodyRenderer } from '../../components/article/ArticleBodyRenderer';
import { ArticleCard } from '../../components/article/ArticleCard';
import { Button } from '../../components/ui/Button';
import { leadApi } from '../../services/api';
import { isValidVietnamesePhone } from '../../utils/formatters';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Send,
  Sparkles,
  Star,
  Mail,
  Phone
} from 'lucide-react';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, products, experts } = useData();
  const { showToast } = useToast();

  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const article = articles.find((a) => a.slug === slug) || articles[0];
  const author = experts.find((e) => e.id === article.authorId) || experts[0];

  // Recommended products in this guide
  const recommendedProducts = (article.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  // Other related articles
  const otherArticles = articles
    .filter((a) => a.id !== article.id && (a.status === 'published' || !a.status))
    .slice(0, 2);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToSave = emailInput.trim();
    const phoneToSave = phoneInput.trim();

    if (!emailToSave && !phoneToSave) {
      showToast('Vui lòng nhập Email và Số điện thoại để nhận tư vấn!', { type: 'error' });
      return;
    }

    if (!emailToSave) {
      showToast('Vui lòng nhập địa chỉ Email!', { type: 'error' });
      return;
    }

    if (!emailToSave.includes('@') || !emailToSave.includes('.')) {
      showToast('Vui lòng nhập định dạng Email hợp lệ!', { type: 'error' });
      return;
    }

    if (!phoneToSave) {
      showToast('Vui lòng nhập số điện thoại!', { type: 'error' });
      return;
    }

    if (!isValidVietnamesePhone(phoneToSave)) {
      showToast('Số điện thoại không hợp lệ! Vui lòng nhập SĐT Việt Nam (đầu số 03, 05, 07, 08, 09 hoặc +84).', { type: 'error' });
      return;
    }

    try {
      setIsSubmittingLead(true);
      const newLead = await leadApi.create({
        email: emailToSave,
        phone: phoneToSave,
        name: `Khách hàng (${phoneToSave})`,
        service: `Tư vấn chọn mua: ${article?.title || 'Cẩm nang'}`,
        source: `guide_sidebar: ${slug || 'cam-nang'}`,
        message: `Khách hàng đăng ký nhận báo cáo kiểm nghiệm Lab & tư vấn chọn mua từ bài viết: "${article?.title || ''}"`
      });

      // Cache locally for Admin Leads sync
      try {
        const cached = localStorage.getItem('techreview_leads_cache');
        let list = cached ? JSON.parse(cached) : [];
        if (newLead) {
          list = [newLead, ...list.filter((l: any) => l.email !== emailToSave)];
          localStorage.setItem('techreview_leads_cache', JSON.stringify(list));
        }
      } catch {}

      setSubmittedSuccess(true);
      setEmailInput('');
      setPhoneInput('');
      showToast('Gửi thông tin thành công!', {
        type: 'success',
        description: 'Chuyên gia sẽ liên hệ và gửi báo cáo kiểm nghiệm Lab chi tiết đến bạn sớm nhất.'
      });
    } catch {
      // Offline fallback
      try {
        const fallbackLead = {
          id: 'lead_' + Date.now(),
          email: emailToSave,
          phone: phoneToSave,
          name: `Khách hàng (${phoneToSave})`,
          service: `Tư vấn chọn mua: ${article?.title || 'Cẩm nang'}`,
          status: 'new',
          source: `guide_sidebar: ${slug || 'cam-nang'}`,
          message: `Khách hàng đăng ký nhận báo cáo kiểm nghiệm Lab & tư vấn chọn mua từ bài viết: "${article?.title || ''}"`,
          createdAt: new Date().toISOString()
        };
        const cached = localStorage.getItem('techreview_leads_cache');
        let list = cached ? JSON.parse(cached) : [];
        list = [fallbackLead, ...list.filter((l: any) => l.email !== emailToSave)];
        localStorage.setItem('techreview_leads_cache', JSON.stringify(list));
      } catch {}

      setSubmittedSuccess(true);
      setEmailInput('');
      setPhoneInput('');
      showToast('Gửi thông tin thành công!', {
        type: 'success',
        description: 'Chuyên gia sẽ liên hệ và gửi báo cáo kiểm nghiệm Lab chi tiết đến bạn sớm nhất.'
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full min-w-0">
          {/* Main Article (8 cols) */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12 min-w-0 w-full">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 h-72 sm:h-96 shadow-sm">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            {article.blocks && article.blocks.length > 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
                <ArticleBodyRenderer blocks={article.blocks} />
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
                <div
                  id="1-gioi-thieu--boi-canh"
                  className="scroll-mt-28 prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
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

                <div id="2-cac-tieu-chi-chon-mua-quan-trong" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
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

                <div id="3-phan-khuc-ngan-sach" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    3. Phân Khúc Ngân Sách Phù Hợp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Đừng vội mua sản phẩm đắt tiền nhất nếu nhu cầu của bạn chỉ dừng ở mức cơ bản. Hãy chọn đúng sản phẩm có các tính năng bạn sẽ thực sự sử dụng hàng ngày.
                  </p>
                </div>

                <div id="4-4-sai-lam-thuong-gap-khi-mua-noi-chien" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
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

                <div id="5-ket-luan--khuyen-nghi" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    5. Kết Luận & Đề Xuất Cuối Cùng
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Hy vọng bài cẩm nang này đã cung cấp cho bạn bức tranh toàn cảnh và tự tin đưa ra quyết định mua sắm tối ưu nhất.
                  </p>
                </div>
              </div>
            )}

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
          <aside className="hidden lg:block lg:col-span-4 min-w-0 w-full space-y-6">
            {/* Consultation Lead Form Widget */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-slate-700/50 space-y-4">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  Tư Vấn Chuyên Gia Miễn Phí
                </span>
                <h4 className="font-extrabold text-lg text-white">Bạn Cần Hỗ Trợ Chọn Mua?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gửi thông tin để nhận báo cáo kiểm nghiệm Lab độc quyền &amp; báo giá ưu đãi tốt nhất.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Cảm ơn bạn! Chuyên gia sẽ liên hệ tư vấn trong thời gian sớm nhất.</span>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <div className="relative">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Nhập địa chỉ Email..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Nhập Số điện thoại..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold justify-center shadow-lg shadow-orange-500/20"
                    disabled={isSubmittingLead}
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    {isSubmittingLead ? 'Đang gửi...' : 'Nhận Tư Vấn Miễn Phí'}
                  </Button>
                </form>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Bảo mật thông tin
                </span>
                <span>Hoàn toàn miễn phí</span>
              </div>
            </div>

            {/* Top Recommended Products Widget */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Sản Phẩm Khuyên Dùng
                </h4>
              </div>

              <div className="space-y-3">
                {(recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 3)).map((p) => (
                  <Link
                    key={p.id}
                    to={`/review/${p.slug}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-orange-300 hover:bg-orange-50/40 transition-all group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-slate-200/80"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-orange-600 line-clamp-1">
                        {p.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-emerald-600">
                          {p.price.toLocaleString('vi-VN')} {p.priceUnit || '₫'}
                        </span>
                        <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md">
                          {p.score}/10
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Popular Articles - Sticky on scroll */}
            {otherArticles.length > 0 && (
              <div className="sticky top-24 z-10 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Cẩm Nang Nổi Bật Khác
                </h4>
                <div className="space-y-3">
                  {otherArticles.map((art) => (
                    <Link
                      key={art.id}
                      to={`/huong-dan/${art.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                    >
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200/60"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 line-clamp-2 leading-snug">
                          {art.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {art.readingTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
};

