"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const PublicNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Programs', path: '/programs' },
    { label: 'Insights', path: '/insights' },
    { label: 'Free Tools', path: '/tools' },
    { label: 'Visionaries', path: '/visionaries' },
    { label: 'Shop', path: '/shop' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
      scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
            <Sparkles className="text-amber-400 w-6 h-6" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">Aumveda</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors hover:text-primary",
                pathname === item.path ? "text-primary" : "text-slate-600"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 font-bold text-xs">
            <Link href="/login">
              <User className="w-4 h-4 mr-2" /> Client Login
            </Link>
          </Button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-bold uppercase tracking-widest py-2",
                pathname === item.path ? "text-primary" : "text-slate-600"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl w-full h-12 font-bold">
            <Link href="/login" onClick={() => setIsOpen(false)}>Client Login</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavigation;
