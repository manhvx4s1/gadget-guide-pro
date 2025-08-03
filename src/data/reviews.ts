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
      <h2>Thiết kế và Chất liệu Titanium</h2>
      <p>iPhone 15 Pro Max mang đến một cuộc cách mạng trong thiết kế với việc sử dụng titanium cấp hàng không vũ trụ thay vì thép không gỉ. Điều này giúp giảm trọng lượng từ 240g xuống còn 221g - một cải tiến đáng kể cho một chiếc điện thoại có kích thước lớn như vậy. Viền titanium không chỉ mang lại vẻ ngoài sang trọng mà còn tăng khả năng chống trầy xước và va đập.</p>
      
      <p>Mặt lưng kính matted giúp giảm thiểu vết vân tay và tạo cảm giác cầm nắm thoải mái hơn. Khung viền được gia công với độ chính xác cao, tạo nên sự liền mạch giữa các chi tiết. Hệ thống camera được bố trí trong một module vuông vắn, kích thước tương đương thế hệ trước nhưng với khả năng nhiếp ảnh được nâng cấp đáng kể.</p>
      
      <h2>Hiệu năng A17 Pro - Đỉnh cao công nghệ</h2>
      <p>Chip A17 Pro được sản xuất trên tiến trình 3nm tiên tiến nhất hiện tại, mang lại hiệu năng vượt trội với 19 tỷ transistor. CPU 6 nhân mới nhanh hơn 10% so với A16 Bionic, trong khi GPU 6 nhân nhanh hơn tới 20%. Điều đặc biệt ấn tượng là Neural Engine 16 nhân có khả năng xử lý 35.17 nghìn tỷ phép tính mỗi giây.</p>
      
      <p>Trong thực tế sử dụng, A17 Pro cho phép chạy mượt mà các game AAA như Resident Evil 4, Death Stranding với chất lượng console. Khả năng multitasking cũng được cải thiện đáng kể, có thể mở đồng thời hàng chục ứng dụng mà không bị lag hay reload. Hiệu suất render video 4K ProRes cũng nhanh hơn 2x so với thế hệ trước.</p>
      
      <h2>Hệ thống Camera Pro Max - Công nghệ nhiếp ảnh tiên tiến</h2>
      <p>Camera chính 48MP với cảm biến lớn hơn 1.22μm mỗi pixel cho khả năng thu sáng vượt trội. Tính năng Spatial Video mới có thể quay video 3D để xem trên Apple Vision Pro. Camera telephoto 12MP với zoom quang học 5x (tương đương 120mm) sử dụng hệ thống prism tetrahedron độc đáo để gấp ánh sáng trong thân máy mỏng.</p>
      
      <p>Camera ultra-wide 12MP không chỉ chụp ảnh góc rộng mà còn có khả năng macro xuất sắc. Hệ thống Photographic Styles thế hệ mới cho phép điều chỉnh tone và warmth riêng biệt cho từng tấm ảnh. Action Button mới có thể được tùy chỉnh để mở nhanh camera hoặc các chức năng nhiếp ảnh khác.</p>
      
      <h2>Pin và Charging - Bền bỉ cả ngày dài</h2>
      <p>Pin 4441mAh lớn nhất từng có trên iPhone, cho thời gian sử dụng video lên tới 29 giờ. Hỗ trợ sạc nhanh USB-C 27W, sạc không dây MagSafe 15W và Qi 7.5W. Tính năng Optimized Battery Charging thông minh giúp bảo vệ tuổi thọ pin dài hạn.</p>
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
      <h2>Sức mạnh M3 Chip - Hiệu năng đột phá</h2>
      <p>M3 chip là bước tiến vượt bậc với kiến trúc 3nm tiên tiến, tích hợp 25 tỷ transistor. CPU 8 nhân với 4 nhân hiệu năng cao và 4 nhân tiết kiệm năng lượng mang lại tốc độ xử lý nhanh hơn 20% so với M2. GPU 10 nhân hỗ trợ ray tracing phần cứng lần đầu tiên trên Mac, cho khả năng render 3D và gaming vượt trội.</p>
      
      <p>Neural Engine 16 nhân xử lý machine learning nhanh hơn 60% so với M1, đặc biệt hữu ích cho các tác vụ AI như nhận diện hình ảnh, xử lý ngôn ngữ tự nhiên. Trong Photoshop, việc apply filter và xử lý ảnh RAW nhanh hơn đáng kể. Premiere Pro có thể edit video 4K ProRes mượt mà mà không cần proxy.</p>
      
      <h2>Màn hình Liquid Retina XDR - Chất lượng cinema</h2>
      <p>Màn hình 14.2-inch với độ phân giải 3024×1964 pixels, mật độ 254 ppi mang lại hình ảnh cực kỳ sắc nét. Công nghệ mini-LED với 1000 nits độ sáng SDR và 1600 nits HDR cho độ tương phản 1,000,000:1. Hỗ trợ 100% dải màu P3 và 1 tỷ màu cho độ chính xác màu sắc chuyên nghiệp.</p>
      
      <p>ProMotion 120Hz adaptive refresh rate tự động điều chỉnh từ 24Hz đến 120Hz tùy theo nội dung, vừa mượt mà vừa tiết kiệm pin. True Tone tự động điều chỉnh nhiệt độ màu theo môi trường xung quanh. Đặc biệt, màn hình này đạt chuẩn Dolby Vision và HDR10 cho trải nghiệm xem phim cinema.</p>
      
      <h2>Thiết kế và Build Quality</h2>
      <p>Khung nhôm tái chế 100% với lớp hoàn thiện anodized mờ chống vân tay. Bàn phím Magic Keyboard cải tiến với key travel 1mm, phản hồi chính xác và âm thanh yên tĩnh. Touch Bar được thay thế bằng dãy phím function vật lý được yêu thích trở lại.</p>
      
      <p>Trackpad Force Touch rộng rãi với độ nhạy cao, hỗ trợ đầy đủ cử chỉ macOS. Hệ thống tản nhiệt được thiết kế lại với fan yên tĩnh hơn, chỉ hoạt động khi thực sự cần thiết. MagSafe 3 an toàn và tiện lợi, kèm theo 2 cổng Thunderbolt 4 và jack 3.5mm.</p>
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
    tags: ["Amazon", "Echo", "Smart Speaker", "Alexa", "Smart Home"],
    content: `
      <h2>Thiết kế và Chất lượng Build</h2>
      <p>Echo Dot thế hệ 5 mang đến thiết kế hình cầu đặc trưng với kích thước compact 100 x 89mm, phủ vải Acoustic có khả năng tái chế 100%. Chất liệu vải không chỉ mang tính thẩm mỹ cao mà còn tối ưu cho việc truyền âm thanh. Phần đế cao su chống trượt giúp thiết bị đứng vững trên mọi bề mặt.</p>
      
      <p>Thiết kế LED ring ở phía dưới với 4 microphone array có khả năng noise cancellation tiên tiến. Các nút điều khiển vật lý gồm volume up/down, mute và action button được bố trí hợp lý ở phía trên. Cổng power 15W đặt ở phía sau cùng với jack 3.5mm để kết nối loa ngoài.</p>
      
      <h2>Alexa và Khả năng AI thông minh</h2>
      <p>Alexa trên Echo Dot Gen 5 đã được nâng cấp với khả năng nhận diện giọng nói chính xác hơn 30% so với thế hệ trước. Công nghệ far-field voice recognition cho phép nhận lệnh từ khoảng cách lên tới 8 mét ngay cả trong môi trường ồn. Neural speech processing giúp hiểu được accent và cách nói khác nhau của người Việt.</p>
      
      <p>Tính năng Adaptive Volume tự động điều chỉnh âm lượng theo tiếng ồn môi trường. Multi-room audio sync cho phép phát nhạc đồng bộ trên nhiều Echo devices. Routines automation có thể kết hợp hàng trăm smart home devices từ các hãng khác nhau.</p>
      
      <h2>Chất lượng âm thanh và kết nối</h2>
      <p>Driver 1.6-inch full-range với bass port được điều chỉnh chính xác mang lại âm thanh clear và balanced. Công nghệ computational audio processing tự động phân tích acoustics của phòng để tối ưu output. Hỗ trợ Amazon Music HD, Spotify, Apple Music với chất lượng lossless.</p>
      
      <p>WiFi 6 dual-band 2.4/5GHz đảm bảo kết nối ổn định. Bluetooth 5.2 A2DP cho phép kết nối headphone hoặc loa không dây. Zigbee 3.0 hub tích hợp điều khiển trực tiếp smart home devices mà không cần bridge riêng.</p>
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
    productLink: "https://www.thegioididong.com/dtdd/samsung-galaxy-s24-ultra",
    tags: ["Samsung", "Galaxy S24", "Android", "Flagship", "Camera"]
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
    productLink: "https://www.thegioididong.com/laptop-gaming",
    tags: ["Gaming", "RTX 4070", "Laptop", "Performance", "2024"]
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
    productLink: "https://www.philips-hue.com",
    tags: ["Philips", "Hue", "Smart Light", "IoT", "Home Automation"]
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