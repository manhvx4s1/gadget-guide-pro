import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect to home if user is authenticated
        if (session?.user) {
          navigate('/');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Redirect to home if already authenticated
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('signupEmail') as string;
    const password = formData.get('signupPassword') as string;
    const displayName = formData.get('displayName') as string;

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Tài khoản đã tồn tại",
            description: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Lỗi đăng ký",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Đăng ký thành công!",
          description: "Vui lòng kiểm tra email để xác nhận tài khoản.",
        });
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('signinEmail') as string;
    const password = formData.get('signinPassword') as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Thông tin đăng nhập không đúng",
            description: "Email hoặc mật khẩu không chính xác.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Lỗi đăng nhập",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng bạn trở lại.",
        });
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">TechReview</h1>
          <p className="text-muted-foreground">Đăng nhập hoặc tạo tài khoản mới</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
            <TabsTrigger value="signup">Đăng ký</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>
                  Nhập thông tin để đăng nhập vào tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signinEmail">Email</Label>
                    <Input
                      id="signinEmail"
                      name="signinEmail"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signinPassword">Mật khẩu</Label>
                    <Input
                      id="signinPassword"
                      name="signinPassword"
                      type="password"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Tạo tài khoản</CardTitle>
                <CardDescription>
                  Điền thông tin để tạo tài khoản mới
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Tên hiển thị</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      type="text"
                      placeholder="Tên của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      name="signupEmail"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Mật khẩu</Label>
                    <Input
                      id="signupPassword"
                      name="signupPassword"
                      type="password"
                      placeholder="Tối thiểu 6 ký tự"
                      minLength={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate('/')}>
            ← Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;