import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, X, Plus, Edit, Trash2 } from "lucide-react";
import { reviews } from "@/data/reviews";
import { toast } from "sonner";

const CategoryManager = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(["Điện thoại", "Laptop", "Smart Home"]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingIndex(null);
    setCategoryName("");
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsCreating(false);
    setCategoryName(categories[index]);
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }

    // Check for duplicate
    const isDuplicate = categories.some((cat, index) => 
      cat.toLowerCase() === categoryName.toLowerCase() && 
      (isCreating || index !== editingIndex)
    );

    if (isDuplicate) {
      toast.error("Danh mục này đã tồn tại");
      return;
    }

    if (isCreating) {
      setCategories([...categories, categoryName]);
      toast.success("Đã thêm danh mục mới thành công!");
    } else if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = categoryName;
      setCategories(updatedCategories);
      toast.success("Đã cập nhật danh mục thành công!");
    }
    
    handleCancel();
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingIndex(null);
    setCategoryName("");
  };

  const handleDelete = (index: number) => {
    const categoryToDelete = categories[index];
    
    // Check if category is being used in reviews
    const reviewsUsingCategory = reviews.filter(review => review.category === categoryToDelete);
    if (reviewsUsingCategory.length > 0) {
      toast.error(`Không thể xóa danh mục "${categoryToDelete}" vì có ${reviewsUsingCategory.length} bài viết đang sử dụng.`);
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${categoryToDelete}"?`)) {
      setCategories(categories.filter((_, i) => i !== index));
      toast.success("Đã xóa danh mục thành công!");
    }
  };

  const getReviewCount = (category: string) => {
    return reviews.filter(review => review.category === category).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate("/admin")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">Quản lý danh mục</h1>
              <p className="text-muted-foreground mt-2">Thêm, sửa, xóa danh mục sản phẩm</p>
            </div>
            <Button onClick={handleCreateNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Form tạo/sửa danh mục */}
        {(isCreating || editingIndex !== null) && (
          <Card>
            <CardHeader>
              <CardTitle>
                {isCreating ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}
              </CardTitle>
              <CardDescription>
                {isCreating ? "Tạo danh mục sản phẩm mới" : "Cập nhật thông tin danh mục"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Tên danh mục *</Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Nhập tên danh mục"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSave();
                    } else if (e.key === 'Escape') {
                      handleCancel();
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isCreating ? "Thêm danh mục" : "Cập nhật"}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Danh sách danh mục */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Danh sách danh mục ({categories.length})</h2>
          
          <div className="grid gap-4">
            {categories.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category}</h3>
                      <p className="text-muted-foreground">
                        {getReviewCount(category)} bài viết
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEdit(index)}
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Sửa
                      </Button>
                      <Button 
                        onClick={() => handleDelete(index)}
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

            {categories.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Chưa có danh mục nào</p>
                  <Button onClick={handleCreateNew} className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm danh mục đầu tiên
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;