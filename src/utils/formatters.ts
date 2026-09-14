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
    return { bg: 'bg-[#606C38]', text: 'text-[#606C38]', ring: 'ring-[#606C38]/20', label: 'Xuất sắc' };
  } else if (score >= 9.0) {
    return { bg: 'bg-[#283618]', text: 'text-[#283618]', ring: 'ring-[#283618]/20', label: 'Rất tốt' };
  } else if (score >= 8.0) {
    return { bg: 'bg-[#BC6C25]', text: 'text-[#BC6C25]', ring: 'ring-[#BC6C25]/20', label: 'Tốt' };
  } else if (score >= 7.0) {
    return { bg: 'bg-[#DDA15E]', text: 'text-[#DDA15E]', ring: 'ring-[#DDA15E]/20', label: 'Khá' };
  } else {
    return { bg: 'bg-[#9E5518]', text: 'text-[#9E5518]', ring: 'ring-[#9E5518]/20', label: 'Trung bình' };
  }
}
