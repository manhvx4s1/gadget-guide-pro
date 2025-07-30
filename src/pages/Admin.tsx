import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { reviews, Review } from "@/data/reviews";

const Admin = () => {
  const [categories, setCategories] = useState(["Điện thoại", "Laptop", "Smart Home"]);
  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    productLink: "",
    rating: 5
  });

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      content: "",
      productLink: "",
      rating: 5
    });
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setIsCreating(false);
    setFormData({
      title: review.title,
      description: review.description,
      category: review.category,
      content: review.content || "",
      productLink: review.productLink || "",
      rating: review.rating
    });
  };

  const handleSave = () => {
    if (isCreating) {
      const newReview: Review = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        rating: formData.rating,
        content: formData.content,
        productLink: formData.productLink,
        image: "/placeholder.svg",
        views: "0",
        likes: "0",
        author: "Admin",
        timeAgo: "Vừa tạo",
        isFeatured: false
      };
      setReviewList([...reviewList, newReview]);
    } else if (editingId) {
      setReviewList(reviewList.map(review => 
        review.id === editingId 
          ? { ...review, ...formData }
          : review
      ));
    }
    handleCancel();
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      content: "",
      productLink: "",
      rating: 5
    });
  };

  const handleDeleteReview = (id: string) => {
    setReviewList(reviewList.filter(review => review.id !== id));
  };

  // Category management functions
  const handleCreateCategory = () => {
    setIsCreatingCategory(true);
    setNewCategoryName("");
  };

  const handleEditCategory = (index: number) => {
    setEditingCategoryIndex(index);
    setNewCategoryName(categories[index]);
  };

  const handleSaveCategory = () => {
    if (isCreatingCategory) {
      setCategories([...categories, newCategoryName]);
    } else if (editingCategoryIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingCategoryIndex] = newCategoryName;
      setCategories(updatedCategories);
    }
    handleCancelCategory();
  };

  const handleCancelCategory = () => {
    setIsCreatingCategory(false);
    setEditingCategoryIndex(null);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (index: number) => {
    const categoryToDelete = categories[index];
    // Check if category is being used in reviews
    const reviewsUsingCategory = reviewList.filter(review => review.category === categoryToDelete);
    if (reviewsUsingCategory.length > 0) {
      alert(`Không thể xóa danh mục "${categoryToDelete}" vì có ${reviewsUsingCategory.length} bài viết đang sử dụng.`);
      return;
    }
    setCategories(categories.filter((_, i) => i !== index));
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
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Quản lý bài viết</TabsTrigger>
            <TabsTrigger value="categories">Quản lý danh mục</TabsTrigger>
          </TabsList>

          {/* Quản lý bài viết */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Bài viết ({reviewList.length})</h2>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="h-4 w-4" />
                Tạo bài viết mới
              </Button>
            </div>

            {/* Form tạo/sửa bài viết */}
            {(isCreating || editingId) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCreating ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
                  </CardTitle>
                  <CardDescription>
                    Điền thông tin chi tiết cho bài viết review
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Tiêu đề</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Nhập tiêu đề bài viết"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Nhập mô tả ngắn cho bài viết"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productLink">Link sản phẩm</Label>
                      <Input
                        id="productLink"
                        value={formData.productLink}
                        onChange={(e) => setFormData({...formData, productLink: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Đánh giá (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Nhập nội dung chi tiết bài viết (hỗ trợ HTML)"
                      rows={8}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Lưu
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="gap-2">
                      <X className="h-4 w-4" />
                      Hủy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Danh sách bài viết */}
            <div className="grid gap-4">
              {reviewList.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{review.title}</h3>
                          <Badge variant="secondary">{review.category}</Badge>
                          {review.isFeatured && <Badge variant="default">Nổi bật</Badge>}
                        </div>
                        <p className="text-muted-foreground mb-2">{review.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>⭐ {review.rating}</span>
                          <span>👁 {review.views}</span>
                          <span>❤️ {review.likes}</span>
                          <span>✍️ {review.author}</span>
                          <span>🕒 {review.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(review)}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quản lý danh mục */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Danh mục sản phẩm</h2>
              <Button onClick={handleCreateCategory} className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm danh mục
              </Button>
            </div>

            {/* Form tạo/sửa danh mục */}
            {(isCreatingCategory || editingCategoryIndex !== null) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCreatingCategory ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Tên danh mục</Label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Nhập tên danh mục"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveCategory} className="gap-2">
                      <Save className="h-4 w-4" />
                      Lưu
                    </Button>
                    <Button onClick={handleCancelCategory} variant="outline" className="gap-2">
                      <X className="h-4 w-4" />
                      Hủy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {categories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{category}</h3>
                        <p className="text-muted-foreground">
                          {reviewList.filter(r => r.category === category).length} bài viết
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditCategory(index)}
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </Button>
                        <Button 
                          onClick={() => handleDeleteCategory(index)}
                          variant="destructive" 
                          size="sm" 
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;