import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Settings, FileText } from "lucide-react";
import { reviews, Review } from "@/data/reviews";

const Admin = () => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const handleDeleteReview = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setReviewList(reviewList.filter(review => review.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Trang Quản Trị</h1>
              <p className="text-muted-foreground mt-2">Quản lý danh mục và bài viết review</p>
            </div>
            <Button 
              onClick={() => window.location.href = "/"}
              variant="outline"
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviewList.length}</div>
                <p className="text-xs text-muted-foreground">
                  Bài viết review sản phẩm
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Danh mục sản phẩm
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
                <Badge variant="secondary">👁</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reviewList.reduce((total, review) => total + parseInt(review.views), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tổng lượt xem
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
              <CardDescription>
                Quản lý nội dung và cấu hình hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => navigate("/admin/article-editor")}
                className="gap-2 h-16"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Tạo bài viết mới</div>
                  <div className="text-sm opacity-90">Viết review sản phẩm</div>
                </div>
              </Button>

              <Button 
                onClick={() => navigate("/admin/categories")}
                variant="outline"
                className="gap-2 h-16"
                size="lg"
              >
                <Settings className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Quản lý danh mục</div>
                  <div className="text-sm opacity-70">Thêm, sửa, xóa danh mục</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Bài viết gần đây</CardTitle>
              <CardDescription>
                {reviewList.length} bài viết review sản phẩm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewList.slice(0, 5).map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{review.title}</h3>
                      <Badge variant="secondary">{review.category}</Badge>
                      {review.isFeatured && <Badge variant="default">Nổi bật</Badge>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{review.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⭐ {review.rating}</span>
                      <span>👁 {review.views}</span>
                      <span>❤️ {review.likes}</span>
                      <span>✍️ {review.author}</span>
                      <span>🕒 {review.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/admin/article-editor/${review.id}`)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDeleteReview(review.id)}
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}

              {reviewList.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chưa có bài viết nào</p>
                  <Button 
                    onClick={() => navigate("/admin/article-editor")}
                    className="mt-4 gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Tạo bài viết đầu tiên
                  </Button>
                </div>
              )}

              {reviewList.length > 5 && (
                <div className="text-center pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/admin/article-editor")}
                  >
                    Xem tất cả bài viết
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;