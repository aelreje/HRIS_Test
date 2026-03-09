import React, { useState } from 'react';
import loginBg from './assets/Login Background.png';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, rememberMe });
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-[#CFD8DC] relative overflow-hidden flex flex-col items-center justify-center font-['Roboto',sans-serif] antialiased">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-center"
        style={{ 
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[451px]">
        
        {/* Login Card */}
        <div className="w-[451px] bg-[#FAFAFA] rounded-[16px] shadow-[0px_20px_20px_0px_rgba(5,13,29,0.2)] overflow-hidden">
          
          {/* Sign in Header */}
          <div className="bg-[#0D47A1] h-[76px] flex items-center px-[35px]">
            <h1 className="text-[34px] font-normal text-[#ECEFF1] leading-none tracking-[0.25px]">Sign in</h1>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="px-[39px] py-[30px] space-y-[25px] flex flex-col items-center">
            
            {/* Email Field */}
            <div className="w-[373px] space-y-[5px]">
              <label className="text-[23px] font-normal text-[#757575] block">Email</label>
              <input 
                type="email"
                placeholder="your@email.com"
                className="w-full h-[53px] px-[16px] bg-[#ECEFF1] border-none rounded-[16px] text-[23px] text-[#212121] placeholder:text-[#BDBDBD] focus:ring-2 focus:ring-[#0D47A1]/20 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="w-[373px] space-y-[5px]">
              <label className="text-[23px] font-normal text-[#757575] block">Password</label>
              <input 
                type="password"
                placeholder="*******"
                className="w-full h-[53px] px-[16px] bg-[#ECEFF1] border-none rounded-[16px] text-[23px] text-[#212121] placeholder:text-[#BDBDBD] focus:ring-2 focus:ring-[#0D47A1]/20 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me Section */}
            <div className="w-[373px] flex items-center gap-[10px]">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-[18px] h-[18px] rounded-[2px] border-2 border-[#49454F] text-[#0D47A1] focus:ring-[#0D47A1] cursor-pointer appearance-none bg-transparent checked:bg-[#0D47A1] checked:border-[#0D47A1]"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                {rememberMe && (
                  <svg className="absolute w-[14px] h-[14px] text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <label htmlFor="remember" className="text-[23px] font-normal text-[#37474F] cursor-pointer select-none">Remember Me</label>
            </div>

            {/* Primary Sign In Button */}
            <button 
              type="submit"
              className="w-[373px] h-[53px] bg-[#0D47A1] text-[#ECEFF1] rounded-[16px] text-[23px] font-normal hover:bg-[#0a3d8a] transition-all flex items-center justify-center mt-[10px]"
            >
              Sign in
            </button>

            {/* Forgot Password Link */}
            <div className="text-center pt-[5px]">
              <a href="#" className="text-[23px] font-normal text-[#37474F] underline decoration-solid">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
