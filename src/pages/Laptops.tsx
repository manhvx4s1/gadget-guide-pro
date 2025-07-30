import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { getReviewsByCategory } from "@/data/reviews";

const Laptops = () => {
  const laptopReviews = getReviewsByCategory("Laptop");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Laptop</h1>
          <p className="text-muted-foreground">
            Review chi tiết về các mẫu laptop cho công việc và giải trí
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptopReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laptops;