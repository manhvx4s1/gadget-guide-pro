import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { searchReviews } from "@/data/reviews";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchReviews(query);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Kết quả tìm kiếm
            </h1>
          </div>
          
          {query && (
            <p className="text-muted-foreground">
              Tìm kiếm cho: <span className="font-medium text-foreground">"{query}"</span>
              {results.length > 0 && (
                <span className="ml-2">({results.length} kết quả)</span>
              )}
            </p>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy kết quả
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {query 
                ? `Không có bài viết nào phù hợp với từ khóa "${query}". Hãy thử với từ khóa khác.`
                : "Nhập từ khóa để tìm kiếm bài viết."
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;