import React, { useState, useEffect } from 'react';
import { ScreenTransition, GlassCard, Button, Input } from './UI';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModule = ({ setRole }: { setRole: (role: any) => void, key?: string }) => {
  const [screen, setScreen] = useState<'login' | 'signup' | 'otp'>('login');
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (screen === 'otp' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [screen, timeLeft]);

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-screen">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFD600]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[420px] z-10">
        {screen === 'login' && (
          <ScreenTransition keyId="login">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FFD600] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,214,0,0.3)]">
                <ArrowRight size={32} className="text-black" />
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-white/50 mt-2">Sign in to continue your journey</p>
            </div>
            <GlassCard>
              <Input label="Email" type="email" placeholder="name@example.com" icon={Mail} />
              <Input label="Password" type="password" placeholder="••••••••" icon={Lock} />
              <div className="flex justify-end mb-6">
                <button className="text-sm text-[#FFD600] hover:underline">Forgot password?</button>
              </div>
              <Button className="w-full mb-4" onClick={() => setRole('passenger')}>Login</Button>
              <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-white/50 text-sm">OR</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              <Button variant="outline" className="w-full mb-6">Continue with Google</Button>
              <p className="text-center text-sm text-white/50">
                Don't have an account? <button onClick={() => setScreen('signup')} className="text-[#FFD600] hover:underline">Sign up</button>
              </p>
            </GlassCard>
          </ScreenTransition>
        )}

        {screen === 'signup' && (
          <ScreenTransition keyId="signup">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-white/50 mt-2">Join us as a Passenger or Driver</p>
            </div>
            <GlassCard>
              <div className="flex bg-black/40 p-1 rounded-xl mb-6">
                <button className="flex-1 py-2 rounded-lg bg-[#FFD600] text-black font-medium text-sm shadow-sm">Passenger</button>
                <button className="flex-1 py-2 rounded-lg text-white/70 font-medium text-sm hover:text-white transition-colors">Driver</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" icon={User} />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email" type="email" placeholder="name@example.com" icon={Mail} />
              <Input label="Phone" type="tel" placeholder="+1 234 567 8900" icon={Phone} />
              <Input label="Password" type="password" placeholder="••••••••" icon={Lock} />
              <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-white/20 bg-black/20 flex items-center justify-center group-hover:border-[#FFD600] transition-colors">
                  <div className="w-3 h-3 bg-[#FFD600] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-white/70">I agree to the Terms & Conditions</span>
              </label>
              <Button className="w-full mb-4" onClick={() => setScreen('otp')}>Create Account</Button>
              <p className="text-center text-sm text-white/50">
                Already have an account? <button onClick={() => setScreen('login')} className="text-[#FFD600] hover:underline">Login</button>
              </p>
            </GlassCard>
          </ScreenTransition>
        )}

        {screen === 'otp' && (
          <ScreenTransition keyId="otp">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FFD600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-[#FFD600]" />
              </div>
              <h1 className="text-3xl font-bold">Verify Phone</h1>
              <p className="text-white/50 mt-2">Enter the 6-digit code sent to your phone</p>
            </div>
            <GlassCard>
              <div className="flex justify-between gap-2 mb-8">
                {[0,1,2,3,4,5].map(i => (
                  <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold bg-black/20 border border-white/10 rounded-xl focus:border-[#FFD600] focus:outline-none transition-colors" placeholder="0" />
                ))}
              </div>
              <Button className="w-full mb-6" onClick={() => setRole('passenger')}>Verify & Continue</Button>
              <p className="text-center text-sm text-white/50">
                Didn't receive code? <button className={`ml-1 ${timeLeft === 0 ? 'text-[#FFD600] hover:underline' : 'text-white/30 cursor-not-allowed'}`} disabled={timeLeft > 0}>Resend {timeLeft > 0 && `(0:${timeLeft.toString().padStart(2, '0')})`}</button>
              </p>
            </GlassCard>
          </ScreenTransition>
        )}
      </div>
    </div>
  );
}
