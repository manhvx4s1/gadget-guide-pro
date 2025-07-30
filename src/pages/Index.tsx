import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { reviews, getFeaturedReviews } from "@/data/reviews";

const Index = () => {
  const featuredReviews = getFeaturedReviews();
  const allReviews = reviews;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Đánh giá nổi bật
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những review được đánh giá cao nhất từ cộng đồng tech Việt Nam
          </p>
        </section>

        {/* Featured Reviews */}
        {featuredReviews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Bài viết nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        )}

        {/* All Reviews */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Tất cả bài viết</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
