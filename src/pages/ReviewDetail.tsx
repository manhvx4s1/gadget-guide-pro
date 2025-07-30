import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Eye, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReviewById } from "@/data/reviews";
import Header from "@/components/Header";

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const review = id ? getReviewById(id) : null;

  if (!review) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
            <Button onClick={() => navigate("/")}>
              Quay về trang chủ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground">
              {review.category}
            </Badge>
            {review.isFeatured && (
              <Badge variant="secondary">
                Nổi bật
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {review.title}
          </h1>
          
          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{review.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{review.views} lượt xem</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{review.likes} lượt thích</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{review.author}</span>
              <span className="mx-2">•</span>
              <span>{review.timeAgo}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={review.image}
            alt={review.title}
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            {review.description}
          </p>
          
          {review.content ? (
            <div dangerouslySetInnerHTML={{ __html: review.content }} />
          ) : (
            <div className="space-y-6">
              <p>
                Trong thế giới công nghệ ngày càng phát triển, việc lựa chọn một sản phẩm 
                phù hợp với nhu cầu sử dụng không phải là điều dễ dàng. Hôm nay, chúng ta 
                sẽ cùng nhau khám phá chi tiết về sản phẩm này.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground">Thiết kế và Chất lượng xây dựng</h2>
              <p>
                Sản phẩm mang đến một thiết kế hiện đại, tối giản nhưng không kém phần sang trọng. 
                Chất liệu cao cấp được sử dụng tạo nên cảm giác chắc chắn và bền bỉ.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground">Hiệu năng và Trải nghiệm</h2>
              <p>
                Về mặt hiệu năng, sản phẩm thể hiện sự ổn định và mượt mà trong quá trình 
                sử dụng. Các tác vụ hàng ngày được xử lý một cách nhẹ nhàng và hiệu quả.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground">Kết luận</h2>
              <p>
                Nhìn chung, đây là một sản phẩm đáng để cân nhắc trong phân khúc của nó. 
                Với những ưu điểm vượt trội và một số nhược điểm nhỏ, sản phẩm phù hợp 
                với nhiều đối tượng người dùng khác nhau.
              </p>
            </div>
          )}
        </div>

        {/* Product Link */}
        {review.productLink && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Mua sản phẩm</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-highlight hover:bg-highlight/90 flex-1"
                onClick={() => window.open(review.productLink, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Mua ngay tại cửa hàng
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(review.title)}`, '_blank')}
              >
                So sánh giá
              </Button>
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-muted rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Bạn thấy bài viết này hữu ích?</h3>
          <p className="text-muted-foreground mb-4">
            Chia sẻ để giúp nhiều người khác có thể tham khảo
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Thích
            </Button>
            <Button variant="outline" size="sm">
              Chia sẻ
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReviewDetail;