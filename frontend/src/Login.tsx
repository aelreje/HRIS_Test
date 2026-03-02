import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { cn } from './lib/utils';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, rememberMe });
    onLogin(); // Only trigger login on button click/form submit
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFBFC] relative overflow-hidden flex flex-col items-center justify-center font-sans antialiased">
      {/* Figma-style Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.4]" 
        style={{ 
          backgroundImage: `radial-gradient(#E2E8F0 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Specific Bottom-Left Blue Arc Gradient */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E4D8C] via-[#3498db] to-transparent rounded-full opacity-20 blur-3xl" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[480px] px-6">
        
        {/* iREPLY Logo (Precisely matched) */}
        <div className="mb-14 flex items-center gap-4">
          <div className="relative">
            {/* Custom Speech Bubble SVG to match logo */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 14C5 9.02944 9.02944 5 14 5H42C46.9706 5 51 9.02944 51 14V35C51 39.9706 46.9706 44 42 44H21L7 53V44H14C9.02944 44 5 39.9706 5 35V14Z" fill="#1E4D8C" />
              <circle cx="16" cy="24.5" r="3" fill="white" />
              <circle cx="28" cy="24.5" r="3" fill="white" />
              <circle cx="40" cy="24.5" r="3" fill="white" />
            </svg>
          </div>
          <span className="text-[52px] font-black tracking-[-0.05em] text-[#1A1A1A] uppercase leading-none">iREPLY</span>
        </div>

        {/* Login Card (16px radius) */}
        <div className="w-full bg-white rounded-[16px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100 overflow-hidden">
          
          {/* Sign in Header (Solid #1E4D8C) */}
          <div className="bg-[#1E4D8C] px-10 py-8">
            <h1 className="text-[36px] font-bold text-white tracking-tight leading-none">Sign in</h1>
          </div>

          {/* Form Body (40px padding) */}
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            
            {/* Email Field */}
            <div className="space-y-2.5">
              <label className="text-[15px] font-medium text-[#64748B] ml-0.5">Email</label>
              <input 
                type="email"
                placeholder="your@email.com"
                className="w-full h-[56px] px-5 bg-[#F1F4F9] border border-transparent rounded-[12px] text-[16px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#1E4D8C]/20 focus:border-[#1E4D8C] outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <label className="text-[15px] font-medium text-[#64748B] ml-0.5">Password</label>
              <input 
                type="password"
                placeholder="*******"
                className="w-full h-[56px] px-5 bg-[#F1F4F9] border border-transparent rounded-[12px] text-[16px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#1E4D8C]/20 focus:border-[#1E4D8C] outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me & Link Section */}
            <div className="flex items-center gap-3 ml-0.5">
              <input 
                type="checkbox" 
                id="remember"
                className="w-5 h-5 rounded-[4px] border-slate-300 text-[#1E4D8C] focus:ring-[#1E4D8C] cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-[15px] font-medium text-slate-600 cursor-pointer select-none">Remember Me</label>
            </div>

            {/* Primary Sign In Button */}
            <button 
              type="submit"
              className="w-full h-[56px] bg-[#1E4D8C] text-white rounded-[12px] text-[18px] font-bold hover:bg-[#153a6b] active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(30,77,140,0.2)] flex items-center justify-center"
            >
              Sign in
            </button>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <a href="#" className="text-[15px] font-bold text-[#1E4D8C] hover:text-[#3498db] transition-colors underline underline-offset-[6px] decoration-2 decoration-[#1E4D8C]/20 hover:decoration-[#3498db]/40">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
