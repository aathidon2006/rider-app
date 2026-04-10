import React, { useState } from 'react';
import { AuthModule } from './components/Auth';
import { PassengerModule } from './components/Passenger';
import { DriverModule } from './components/Driver';
import { AdminModule } from './components/Admin';
import { AnimatePresence } from 'motion/react';
import { Users, Car, ShieldAlert } from 'lucide-react';

export type Role = 'auth' | 'passenger' | 'driver' | 'admin';

export default function App() {
  const [role, setRole] = useState<Role>('auth');

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white relative flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {role === 'auth' && <AuthModule key="auth" setRole={setRole} />}
        {role === 'passenger' && <PassengerModule key="passenger" />}
        {role === 'driver' && <DriverModule key="driver" />}
        {role === 'admin' && <AdminModule key="admin" />}
      </AnimatePresence>

      {/* Floating Role Switcher */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2 glass p-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <button 
          onClick={() => setRole('passenger')} 
          className={`p-3 rounded-full transition-colors ${role === 'passenger' ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.5)]' : 'text-white/50 hover:text-white'}`} 
          title="Passenger"
        >
          <Users size={20} />
        </button>
        <button 
          onClick={() => setRole('driver')} 
          className={`p-3 rounded-full transition-colors ${role === 'driver' ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.5)]' : 'text-white/50 hover:text-white'}`} 
          title="Driver"
        >
          <Car size={20} />
        </button>
        <button 
          onClick={() => setRole('admin')} 
          className={`p-3 rounded-full transition-colors ${role === 'admin' ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.5)]' : 'text-white/50 hover:text-white'}`} 
          title="Admin"
        >
          <ShieldAlert size={20} />
        </button>
      </div>
    </div>
  );
}
