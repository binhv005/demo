export function formatPrice(price: number, unit: string = 'đ'): string {
  if (price === 0) return 'Miễn phí';
  return `${price.toLocaleString('vi-VN')} ${unit}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('vi-VN');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getScoreColor(score: number): { bg: string; text: string; ring: string; label: string } {
  if (score >= 9.5) {
    return { bg: 'bg-[#FF9951]', text: 'text-[#FF9951]', ring: 'ring-[#FF9951]/20', label: 'Xuất sắc' };
  } else if (score >= 9.0) {
    return { bg: 'bg-[#F07C30]', text: 'text-[#F07C30]', ring: 'ring-[#F07C30]/20', label: 'Rất tốt' };
  } else if (score >= 8.0) {
    return { bg: 'bg-[#319D9B]', text: 'text-[#319D9B]', ring: 'ring-[#319D9B]/20', label: 'Tốt' };
  } else if (score >= 7.0) {
    return { bg: 'bg-[#E59830]', text: 'text-[#E59830]', ring: 'ring-[#E59830]/20', label: 'Khá' };
  } else {
    return { bg: 'bg-[#B89D8D]', text: 'text-[#B89D8D]', ring: 'ring-[#B89D8D]/20', label: 'Trung bình' };
  }
}

export function toSlug(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Kiểm tra số điện thoại Việt Nam hợp lệ:
 * - Đầu số di động 10 số: 03, 05, 07, 08, 09 (hoặc định dạng quốc tế +84 / 84)
 */
export function isValidVietnamesePhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s.-]/g, '');
  const vnPhoneRegex = /^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$/;
  return vnPhoneRegex.test(cleaned);
}

