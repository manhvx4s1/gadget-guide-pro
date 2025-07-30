import { Star, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
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
}

const ReviewCard = ({
  id,
  title,
  description,
  image,
  category,
  rating,
  views,
  likes,
  author,
  timeAgo,
  isFeatured = false,
  productLink
}: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-review-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-video bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Featured Badge */}
        {isFeatured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Nổi bật
          </Badge>
        )}

        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 right-3 bg-secondary/90 backdrop-blur-sm"
        >
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{author}</span>
            <span className="mx-2">•</span>
            <span>{timeAgo}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary hover:bg-primary/10"
            onClick={() => window.location.href = `/review/${id}`}
          >
            Đọc thêm
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Product Link */}
        {productLink && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button 
              className="w-full bg-highlight hover:bg-highlight/90"
              onClick={() => window.open(productLink, '_blank')}
            >
              Mua ngay
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;