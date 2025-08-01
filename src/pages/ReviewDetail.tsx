import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Eye, Heart, ExternalLink, Share2, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      
      {/* News-style layout */}
      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Trang chủ
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-card">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8">
              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                  {review.category}
                </Badge>
                {review.isFeatured && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    Nổi bật
                  </Badge>
                )}
                {review.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {review.title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {review.description}
              </p>

              {/* Author & Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{review.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{review.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{review.likes}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Featured Image */}
            <div className="mb-8">
              <figure className="w-full">
                <img
                  src={review.image}
                  alt={review.title}
                  className="w-full rounded-lg shadow-lg"
                />
                <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                  {review.title}
                </figcaption>
              </figure>
            </div>

            {/* Video Section */}
            {review.videoUrl && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Video Review</h3>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={review.videoUrl}
                    title="Video Review"
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Article Content */}
        <div className="bg-background">
          <div className="container mx-auto px-4 py-8 max-w-4xl">

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {review.content ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: review.content }} 
                  className="space-y-6 text-foreground [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-foreground [&>p]:leading-relaxed [&>p]:mb-4"
                />
              ) : (
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    Trong thế giới công nghệ ngày càng phát triển, việc lựa chọn một sản phẩm 
                    phù hợp với nhu cầu sử dụng không phải là điều dễ dàng. Hôm nay, chúng ta 
                    sẽ cùng nhau khám phá chi tiết về sản phẩm này.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Thiết kế và Chất lượng xây dựng</h2>
                  <p className="text-foreground leading-relaxed">
                    Sản phẩm mang đến một thiết kế hiện đại, tối giản nhưng không kém phần sang trọng. 
                    Chất liệu cao cấp được sử dụng tạo nên cảm giác chắc chắn và bền bỉ.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Hiệu năng và Trải nghiệm</h2>
                  <p className="text-foreground leading-relaxed">
                    Về mặt hiệu năng, sản phẩm thể hiện sự ổn định và mượt mà trong quá trình 
                    sử dụng. Các tác vụ hàng ngày được xử lý một cách nhẹ nhàng và hiệu quả.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Kết luận</h2>
                  <p className="text-foreground leading-relaxed">
                    Nhìn chung, đây là một sản phẩm đáng để cân nhắc trong phân khúc của nó. 
                    Với những ưu điểm vượt trội và một số nhược điểm nhỏ, sản phẩm phù hợp 
                    với nhiều đối tượng người dùng khác nhau.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar & Actions */}
        <div className="bg-muted/30">
          <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Purchase Section */}
              {review.productLink && (
                <div className="lg:col-span-2">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                      Mua sản phẩm
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Sản phẩm được review trong bài viết này có thể mua tại các cửa hàng sau:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        className="bg-primary hover:bg-primary/90 h-12"
                        onClick={() => window.open(review.productLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Mua ngay tại cửa hàng
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-12"
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(review.title)} giá`, '_blank')}
                      >
                        So sánh giá tốt nhất
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Interaction Section */}
              <div className={review.productLink ? "lg:col-span-1" : "lg:col-span-3"}>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Tương tác</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Đánh giá bài viết</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{review.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="h-10">
                        <Heart className="h-4 w-4 mr-2" />
                        {review.likes}
                      </Button>
                      <Button variant="outline" size="sm" className="h-10">
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </Button>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        {review.views} lượt xem • {review.timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;