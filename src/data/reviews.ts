import iphoneImage from "@/assets/iphone-15-pro-max.jpg";
import macbookImage from "@/assets/macbook-pro.jpg";
import smartSpeakerImage from "@/assets/smart-speaker.jpg";

export interface Review {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  views: string;
  likes: string;
  author: string;
  timeAgo: string;
  isFeatured?: boolean;
  productLink?: string;
  content?: string;
  videoUrl?: string;
  tags?: string[];
}

export const reviews: Review[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max: Đánh giá chi tiết sau 2 tuần sử dụng",
    description: "Liệu iPhone 15 Pro Max có đáng với mức giá 30 triệu? Khám phá những ưu nhược điểm thực tế từ góc nhìn người dùng Việt Nam.",
    image: iphoneImage,
    category: "Điện thoại",
    rating: 4.5,
    views: "12.5K",
    likes: "1.2K",
    author: "Tech Reviewer",
    timeAgo: "2 ngày trước",
    isFeatured: true,
    productLink: "https://www.thegioididong.com/dtdd/iphone-15-pro-max",
    videoUrl: "https://www.youtube.com/embed/XHTrLYShBRQ",
    tags: ["iPhone", "Apple", "Smartphone", "Premium", "Camera"],
    content: `
      <h2>Thiết kế và Chất liệu</h2>
      <p>iPhone 15 Pro Max mang đến thiết kế titanium cao cấp với trọng lượng nhẹ hơn đáng kể so với thế hệ trước...</p>
      
      <h2>Hiệu năng A17 Pro</h2>
      <p>Chip A17 Pro được sản xuất trên tiến trình 3nm mang lại hiệu năng vượt trội...</p>
      
      <h2>Camera System</h2>
      <p>Hệ thống camera 48MP với khả năng zoom 5x thực sự ấn tượng...</p>
    `
  },
  {
    id: "2",
    title: "MacBook Pro M3: Sức mạnh mới cho nhà sáng tạo",
    description: "MacBook Pro M3 14-inch có phải là lựa chọn hoàn hảo cho designer và developer? Review chi tiết về hiệu năng, pin và màn hình.",
    image: macbookImage,
    category: "Laptop",
    rating: 4.7,
    views: "8.3K",
    likes: "892",
    author: "Creative Expert",
    timeAgo: "5 ngày trước",
    isFeatured: false,
    productLink: "https://www.thegioididong.com/laptop/macbook-pro-14-m3",
    videoUrl: "https://www.youtube.com/embed/mtHoOvONFyM",
    tags: ["MacBook", "Apple", "M3", "Professional", "Creative"],
    content: `
      <h2>Hiệu năng M3 Chip</h2>
      <p>Chip M3 mang lại hiệu năng vượt trội với khả năng xử lý đa nhiệm mượt mà...</p>
      
      <h2>Màn hình Liquid Retina XDR</h2>
      <p>Màn hình 14-inch với độ sáng 1000 nits và dải màu P3 rộng...</p>
    `
  },
  {
    id: "3",
    title: "Amazon Echo Dot (5th Gen): Smart speaker tốt nhất tầm giá",
    description: "Echo Dot thế hệ 5 với Alexa thông minh hơn và chất lượng âm thanh được cải thiện đáng kể. Đánh giá toàn diện từ A-Z.",
    image: smartSpeakerImage,
    category: "Smart Home",
    rating: 4.2,
    views: "5.7K",
    likes: "634",
    author: "Smart Home Guy",
    timeAgo: "1 tuần trước",
    isFeatured: false,
    productLink: "https://www.amazon.com/echo-dot-5th-gen",
    content: `
      <h2>Thiết kế và Chất lượng</h2>
      <p>Echo Dot gen 5 có thiết kế tròn đặc trưng với chất liệu vải cao cấp...</p>
      
      <h2>Alexa và Tính năng thông minh</h2>
      <p>Alexa đã được cải thiện đáng kể về khả năng nhận diện giọng nói...</p>
    `
  },
  {
    id: "4",
    title: "Samsung Galaxy S24 Ultra vs iPhone 15 Pro Max: Cuộc chiến flagship",
    description: "So sánh chi tiết hai siêu phẩm flagship hàng đầu năm 2024. Camera, hiệu năng, pin - ai sẽ thắng?",
    image: iphoneImage,
    category: "Điện thoại",
    rating: 4.6,
    views: "15.2K",
    likes: "1.8K",
    author: "Mobile Expert",
    timeAgo: "3 ngày trước",
    isFeatured: true,
    productLink: "https://www.thegioididong.com/dtdd/samsung-galaxy-s24-ultra"
  },
  {
    id: "5",
    title: "Gaming Laptop RTX 4070: Top 5 lựa chọn tốt nhất 2024",
    description: "Tổng hợp những chiếc laptop gaming với RTX 4070 đáng mua nhất hiện tại. Từ budget đến high-end.",
    image: macbookImage,
    category: "Laptop", 
    rating: 4.4,
    views: "9.1K",
    likes: "743",
    author: "Gaming Guru",
    timeAgo: "4 ngày trước",
    isFeatured: false,
    productLink: "https://www.thegioididong.com/laptop-gaming"
  },
  {
    id: "6",
    title: "Philips Hue: Hệ thống đèn thông minh cho ngôi nhà hiện đại",
    description: "Trải nghiệm toàn bộ hệ sinh thái Philips Hue từ cơ bản đến nâng cao. Có đáng để đầu tư?",
    image: smartSpeakerImage,
    category: "Smart Home",
    rating: 4.3,
    views: "6.8K",
    likes: "567",
    author: "Home Tech",
    timeAgo: "6 ngày trước",
    isFeatured: false,
    productLink: "https://www.philips-hue.com"
  }
];

export const getReviewById = (id: string): Review | undefined => {
  return reviews.find(review => review.id === id);
};

export const getReviewsByCategory = (category: string): Review[] => {
  return reviews.filter(review => review.category === category);
};

export const getFeaturedReviews = (): Review[] => {
  return reviews.filter(review => review.isFeatured);
};

export const searchReviews = (query: string): Review[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  return reviews.filter(review => 
    review.title.toLowerCase().includes(searchTerm) ||
    review.description.toLowerCase().includes(searchTerm) ||
    review.category.toLowerCase().includes(searchTerm) ||
    review.author.toLowerCase().includes(searchTerm) ||
    review.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};