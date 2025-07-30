import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { getReviewsByCategory } from "@/data/reviews";

const SmartHome = () => {
  const smartHomeReviews = getReviewsByCategory("Smart Home");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Smart Home</h1>
          <p className="text-muted-foreground">
            Đánh giá các thiết bị thông minh cho ngôi nhà hiện đại
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smartHomeReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartHome;