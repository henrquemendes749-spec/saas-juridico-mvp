'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Scale, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Não mostrar navbar nas páginas de login/register
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold text-white">LexFlow</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/domain">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Domínio
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={signOut}
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-gray-200 font-bold">
                    Começar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
