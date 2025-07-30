import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import { reviews, Review } from "@/data/reviews";
import { FileUpload } from "@/components/FileUpload";
import { toast } from "sonner";

const ArticleEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [categories] = useState(["Điện thoại", "Laptop", "Smart Home"]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    productLink: "",
    rating: 5,
    image: "",
    videoUrl: ""
  });

  useEffect(() => {
    if (isEditing && id) {
      const review = reviews.find(r => r.id === id);
      if (review) {
        setFormData({
          title: review.title,
          description: review.description,
          category: review.category,
          content: review.content || "",
          productLink: review.productLink || "",
          rating: review.rating,
          image: review.image || "",
          videoUrl: ""
        });
      }
    }
  }, [isEditing, id]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }
    if (!formData.category) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }

    // Simulate saving logic
    if (isEditing) {
      toast.success("Đã cập nhật bài viết thành công!");
    } else {
      toast.success("Đã tạo bài viết mới thành công!");
    }
    
    navigate("/admin");
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleVideoUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, videoUrl: url }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isEditing ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isEditing ? "Cập nhật thông tin bài viết" : "Tạo bài viết review mới"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Chỉnh sửa bài viết" : "Thông tin bài viết"}
            </CardTitle>
            <CardDescription>
              Điền thông tin chi tiết cho bài viết review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục *</Label>
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
              <Label htmlFor="description">Mô tả *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Nhập mô tả ngắn cho bài viết"
                rows={3}
              />
            </div>

            {/* Media Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                onFileUploaded={handleImageUploaded}
                acceptedTypes="image"
                className="space-y-2"
              />
              
              <FileUpload
                onFileUploaded={handleVideoUploaded}
                acceptedTypes="video"
                className="space-y-2"
              />
            </div>

            {/* Additional Info */}
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
                rows={10}
              />
            </div>

            {/* Preview sections */}
            {formData.image && (
              <div className="space-y-2">
                <Label>Ảnh đã tải lên</Label>
                <div className="border rounded-md p-4">
                  <img 
                    src={formData.image} 
                    alt="Article preview" 
                    className="max-w-md max-h-64 object-cover rounded-md"
                  />
                </div>
              </div>
            )}

            {formData.videoUrl && (
              <div className="space-y-2">
                <Label>Video đã tải lên</Label>
                <div className="border rounded-md p-4">
                  <video 
                    src={formData.videoUrl} 
                    controls 
                    className="max-w-md max-h-64 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? "Cập nhật" : "Tạo bài viết"}
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleEditor;