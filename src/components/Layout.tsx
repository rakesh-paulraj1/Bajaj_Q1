"use client"

// import { useTheme } from 'next-themes';
import { Award } from 'lucide-react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // const { theme, setTheme } = useTheme();
  
  
 

  const [mobileMenuOpen] = useState(false);
  
  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };
  
  return (
    
    <div className="min-h-screen flex flex-col bg-white text-foreground antialiased">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        
          <div className="flex items-center">
            <Link to="/" className="font-semibold text-lg hover:opacity-80 transition-opacity">
              Mobidoc
            </Link>
          </div>
          {/* <nav className="hidden md:flex items-center gap-4">
            <Link href="/author/createcourse">
              <button className="px-4 py-2 rounded-md border border-border bg-primary/10 text-foreground text-sm hover:bg-primary/20 transition-colors">
                Create Course
              </button>
            </Link>
            <Link href="/author/profile">
              <button className="px-4 py-2 rounded-md border border-border bg-primary/10 text-foreground text-sm hover:bg-primary/20 transition-colors">
                Profile
              </button>
            </Link>
          </nav> */}
          
      
          {/* <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary"  />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
            </button>
            
            <button 
              // onClick={handleSignOut} 
              className="hidden md:flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
            
            <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                console.log(theme);
              }}
              className="  items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary"  />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
            </button>
              <button 
                onClick={toggleMobileMenu} 
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col space-y-2">
              <Link to="/author/createcourse">
                <button className="w-full px-4 py-2 rounded-md border border-border bg-primary/10 text-foreground text-sm hover:bg-primary/20 transition-colors">
                  Create Course
                </button>
              </Link>
              <Link to="/author/profile">
                <button className="w-full px-4 py-2 rounded-md border border-border bg-primary/10 text-foreground text-sm hover:bg-primary/20 transition-colors">
                  Profile
                </button>
              </Link>
              <button
                //  onClick={handleSignOut} 
                className="w-full px-4 py-2 rounded-md border border-border bg-primary/10 text-foreground text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
              >
               LogOut
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full">
          {children}
        </div>
      </main>
      
      <footer className="border-t border-border py-6 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Built with passion</p>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MobiDoc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}