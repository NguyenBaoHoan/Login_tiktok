import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
    
function App() {
  const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY; 
  
  const REDIRECT_URI = import.meta.env.VITE_TIKTOK_REDIRECT_URI; 
  
  const SCOPE = 'user.info.basic,user.info.profile'; 

  // URL Backend của bạn để nhận code
  const BACKEND_API_URL = 'http://localhost:8080/api/v1/auth/tiktok_login'; 

  const [status, setStatus] = useState('idle');

  // 3. HÀM GỬI CODE VỀ BACKEND
  const sendCodeToBackend = useCallback(async (authCode) => {
    try {
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authCode }),
      });

      const data = await response.json();
      console.log('Kết quả từ Backend:', data);
      setStatus('success');
      // Có thể lưu token vào localStorage hoặc redirect sang trang chủ tại đây
    } catch (err) {
      console.error('Lỗi khi gửi code lên backend:', err);
      setStatus('error');
    }
  }, [BACKEND_API_URL]);

  useEffect(() => {
    // 2. LOGIC LẤY CODE SAU KHI REDIRECT
    // Kiểm tra xem URL hiện tại có chứa tham số "?code=" không
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const error = queryParams.get('error');

    if (code) {
      console.log('Đã nhận được Authorization Code:', code);
      setStatus('processing');
      
      // Gọi hàm gửi code xuống backend
      sendCodeToBackend(code);
    } else if (error) {
        console.error('Người dùng từ chối hoặc có lỗi:', error);
        setStatus('error');
    }
  }, [sendCodeToBackend]);

  // 4. HÀM CHUYỂN HƯỚNG ĐĂNG NHẬP
  const handleLogin = () => {
    // Tạo chuỗi state ngẫu nhiên để bảo mật (CSRF protection)
    const csrfState = Math.random().toString(36).substring(7);
    
    // Xây dựng URL đăng nhập TikTok
    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${CLIENT_KEY}`;
    url += `&scope=${SCOPE}`;
    url += `&response_type=code`;
    url += `&redirect_uri=${REDIRECT_URI}`;
    url += `&state=${csrfState}`;

    // Chuyển hướng người dùng sang TikTok
    window.location.href = url;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Demo TikTok Login</h1>

      {status === 'idle' && (
        <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Login with TikTok
        </button>
      )}

      {status === 'processing' && <p>Đang xác thực và gửi code về server...</p>}
      
      {status === 'success' && <p style={{ color: 'green' }}>Đăng nhập thành công! Kiểm tra Console Log.</p>}
      
      {status === 'error' && <p style={{ color: 'red' }}>Có lỗi xảy ra. Vui lòng thử lại.</p>}
    </div>
  );
}

export default App;