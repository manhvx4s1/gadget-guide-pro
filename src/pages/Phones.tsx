import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { getReviewsByCategory } from "@/data/reviews";

const Phones = () => {
  const phoneReviews = getReviewsByCategory("Điện thoại");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Điện thoại</h1>
          <p className="text-muted-foreground">
            Đánh giá chi tiết về các mẫu điện thoại mới nhất
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phoneReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Phones;