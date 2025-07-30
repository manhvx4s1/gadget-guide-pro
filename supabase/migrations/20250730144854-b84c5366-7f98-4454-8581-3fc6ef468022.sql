-- Create storage buckets for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('article-videos', 'article-videos', true);

-- Create policies for article images
CREATE POLICY "Anyone can view article images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Admin can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Admin can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images');

CREATE POLICY "Admin can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images');

-- Create policies for article videos
CREATE POLICY "Anyone can view article videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-videos');

CREATE POLICY "Admin can upload article videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-videos');

CREATE POLICY "Admin can update article videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-videos');

CREATE POLICY "Admin can delete article videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-videos');