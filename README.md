<h1 align="center">🚀 Shadowrocket Modules</h1>

<p align="center">
  <b>📡 Mở khóa tính năng - 🔒 Bảo mật - 🚫 Chặn quảng cáo</b>
  <br>
  <i>Các module tùy chỉnh Shadowrocket cho Locket Gold, Spotify, YouTube, SoundCloud, Duolingo</i>
</p>

---

## 📂 Danh sách Module

| 📜 Module | 📝 Mô tả | 📦 Cài ngay (1 chạm) |
|-----------|----------|----------------------|
| `locket.module` | Mở khóa Locket Gold | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/locket.module) |
| `youtube.module` | Chặn quảng cáo YouTube + PiP + Background | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/youtube.module) |
| `spotify.module` | Mở khóa Spotify Premium (một phần) | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/spotify.module) |
| `soundcloud.module` | Mở khóa SoundCloud Go+ | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/soundcloud.module) |
| `duolingo.module` | Mở khóa Super Duolingo | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/duolingo.module) |
| `all-in-one.module` | 🎯 Tổng hợp tất cả | [Cài vào SR](shadowrocket://install?module=https://raw.githubusercontent.com/vanhytt/locket_pro/main/all-in-one.module) |

> 💡 **Tip:** Nhấn **"Cài vào SR"** trực tiếp trên iPhone để tự động mở Shadowrocket và cài module!

---

## 📁 Cấu trúc thư mục

```
shadowrocket-modules/
├── README.md                    ← Bạn đang đọc
├── GUIDE.md                     ← Hướng dẫn viết module
├── template.module              ← Template module đầy đủ có comment
├── locket.module                ← Module Locket Gold
├── youtube.module               ← Module YouTube BlockAd
├── spotify.module               ← Module Spotify Premium
├── soundcloud.module            ← Module SoundCloud Go+
├── duolingo.module              ← Module Super Duolingo
├── all-in-one.module            ← Tổng hợp tất cả
└── js/
    ├── template_response.js     ← Template JS: http-response
    ├── template_request.js      ← Template JS: http-request
    ├── locket/
    │   ├── Locket.js            ← Unlock Gold (response)
    │   └── deleteHeader.js      ← Clear cache (request)
    ├── youtube/
    │   └── response.js          ← AdBlock + PiP + Background Play
    ├── spotify/
    │   └── spotify.js           ← Unlock Premium (protobuf)
    ├── soundcloud/
    │   └── soundcloud.js        ← Unlock Go+
    └── duolingo/
        └── super.js             ← Unlock Super
```

---

## 🚀 Cách sử dụng

### Cách 1: Cài 1 chạm (trên iPhone)
Nhấn vào link **"Cài vào SR"** trong bảng trên → Shadowrocket tự động mở và cài.

### Cách 2: Thêm bằng URL thủ công
1. Copy Raw URL của module (ví dụ: `https://raw.githubusercontent.com/vanhytt/locket_pro/main/locket.module`)
2. Mở **Shadowrocket** → **Configuration** → **Module**
3. Nhấn **+** → Dán URL → Nhấn **OK**
4. Bật VPN với kiểu kết nối **Cấu Hình**

---

## ⚠️ Lưu ý
- Chỉ dùng cho mục đích **học tập cá nhân**
- Một số module có thể không hoạt động nếu app đã update hoặc bật TLS Pinning
- Luôn **đăng xuất & đăng nhập lại** sau khi cài module
- Spotify sử dụng thư viện protobuf bundled (~70KB) — toàn bộ code được host trên repo này
