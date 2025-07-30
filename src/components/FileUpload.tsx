import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUploaded: (url: string) => void;
  acceptedTypes: "image" | "video" | "both";
  className?: string;
}

export const FileUpload = ({ onFileUploaded, acceptedTypes, className }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const getAcceptAttribute = () => {
    switch (acceptedTypes) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "both":
        return "image/*,video/*";
      default:
        return "";
    }
  };

  const getBucketName = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return "article-images";
    } else if (fileType.startsWith("video/")) {
      return "article-videos";
    }
    return "article-images"; // fallback
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const bucketName = getBucketName(file.type);

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      
      // Set preview for images
      if (file.type.startsWith("image/")) {
        setPreview(publicUrl);
      }

      onFileUploaded(publicUrl);
      toast.success("File uploaded successfully!");
      
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className={className}>
      <div className="space-y-2">
        <Label>
          {acceptedTypes === "image" ? "Tải ảnh lên" : 
           acceptedTypes === "video" ? "Tải video lên" : 
           "Tải file lên"}
        </Label>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="file"
              accept={getAcceptAttribute()}
              onChange={handleFileUpload}
              disabled={uploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            className="gap-2"
          >
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Đang tải...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {acceptedTypes === "image" ? <Image className="h-4 w-4" /> :
                 acceptedTypes === "video" ? <Video className="h-4 w-4" /> :
                 "Tải lên"}
              </>
            )}
          </Button>
        </div>

        {preview && (
          <div className="relative mt-2">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-xs max-h-32 object-cover rounded-md border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={clearPreview}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};