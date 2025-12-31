import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CLIENT_KEY = "aw7i27h8qolylqj7"; 
const REDIRECT_URI = "https://login-tiktok.vercel.app/auth/callback"; 

// 1. Component Button Login
const LoginButton = () => {
  const handleLogin = () => {
    // Tạo state ngẫu nhiên để bảo mật (CSRF protection)
    const csrfState = Math.random().toString(36).substring(7);
    
    // Tạo URL xác thực TikTok
    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${CLIENT_KEY}`;
    url += `&scope=user.info.basic`;
    url += `&response_type=code`;
    url += `&redirect_uri=${REDIRECT_URI}`;
    url += `&state=${csrfState}`;

    // Chuyển hướng người dùng sang TikTok
    window.location.href = url;
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with TikTok</button>
    </div>
  );
};

// 2. Component Xử lý Callback (Nhận code và gửi về Backend)
const TikTokCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy params từ URL
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code');

    if (authCode) {
      // Gửi code về Backend Spring Boot
      fetch('http://localhost:8080/api/v1/auth/tiktok_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then((response) => {
          if (response.ok) {
            alert('Login thành công!');
            navigate('/'); 
          } else {
            alert('Login thất bại!');
          }
        })
        .catch((err) => console.error('Lỗi call API:', err));
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập TikTok...</div>;
};

// 3. Main App Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/auth/callback" element={<TikTokCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;