import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  const categories = [
    { name: "Điện thoại", href: "/phones" },
    { name: "Laptop", href: "/laptops" },
    { name: "Smart Home", href: "/smart-home" }
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 font-bold text-lg">
              RV
            </div>
            <span className="font-bold text-xl text-foreground">ReviewViet</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = category.href;
                }}
              >
                {category.name}
              </a>
            ))}
            <a
              href="/admin"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin";
              }}
            >
              Quản trị
            </a>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <a
                href="/auth"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/auth";
                }}
              >
                Đăng nhập
              </a>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    window.location.href = category.href;
                  }}
                >
                  {category.name}
                </a>
              ))}
              <a
                href="/admin"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.location.href = "/admin";
                }}
              >
                Quản trị
              </a>
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-foreground">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-foreground hover:text-primary w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <a
                  href="/auth"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    window.location.href = "/auth";
                  }}
                >
                  Đăng nhập
                </a>
              )}
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;