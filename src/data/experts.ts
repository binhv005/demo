import { Expert } from '../types';

export const mockExperts: Expert[] = [
  {
    id: 'expert-1',
    name: 'Hoàng Nam',
    role: 'Trưởng ban Đánh giá Công nghệ & Đồ gia dụng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Hơn 8 năm kinh nghiệm đánh giá phần cứng, đồ gia dụng thông minh và thiết bị công nghệ tiêu dùng. Đã trực tiếp kiểm nghiệm hơn 300+ sản phẩm.',
    articlesCount: 84,
    experienceYears: 8,
    credentials: ['Cựu Reviewer Tinhte', 'Chuyên gia Đo lường Tiêu chuẩn RoHS & Energy Star', 'Tốt nghiệp ĐH Bách Khoa']
  },
  {
    id: 'expert-2',
    name: 'Thanh Thảo',
    role: 'Chuyên gia Đánh giá Phần mềm & Công cụ AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Product Manager & AI Enthusiast với 6 năm nghiên cứu các giải pháp SaaS, công cụ tối ưu hóa quy trình làm việc và phần mềm năng suất cá nhân.',
    articlesCount: 62,
    experienceYears: 6,
    credentials: ['Certified Scrum Master', 'AI Prompt Engineering Lead', 'Tác giả sách "Làm chủ AI 2024"']
  },
  {
    id: 'expert-3',
    name: 'Minh Tuấn',
    role: 'Chuyên gia Điện tử & Thiết bị Âm thanh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Chuyên gia âm thanh và hiển thị, thường xuyên thực hiện các bài test mù (blind test) và đo quang phổ âm thanh chuyên sâu.',
    articlesCount: 45,
    experienceYears: 7,
    credentials: ['Audio Engineer', 'Thành viên Hội Kỹ thuật Âm thanh AES']
  }
];
