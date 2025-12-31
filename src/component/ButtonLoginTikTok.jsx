import React from 'react';
import { FaTiktok } from 'react-icons/fa';

const TikTokLoginButton = () => {
  const handleLogin = () => {
    const appID = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    const redirectURI = import.meta.env.VITE_TIKTOK_REDIRECT_URI || import.meta.env.VITE_REDIRECT_URI;
    const state = "tiktok_login_" + Math.random().toString(36).substring(7);

    // TikTok OAuth scopes
    const scope = "user.info.basic";

    // TikTok OAuth URL
    const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${appID}&redirect_uri=${encodeURIComponent(redirectURI)}&state=${state}&scope=${scope}&response_type=code`;

    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #25F4EE 50%, #FE2C55 100%)',
        boxShadow: '0 4px 15px rgba(254, 44, 85, 0.4)'
      }}
    >
      <FaTiktok size={24} />
      <span>Đăng nhập với TikTok</span>
    </button>
  );
};

export default TikTokLoginButton;