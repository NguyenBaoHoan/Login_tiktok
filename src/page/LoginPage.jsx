
import React from 'react';
import TikTokLoginButton from '../component/ButtonLoginTikTok';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Login Box */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-96">
        <div className="flex flex-col gap-4">

          {/* TikTok Button */}
          <TikTokLoginButton />

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">HOẶC</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>
    
        </div>
      </div>

    </div>
    );
};

export default LoginPage;