<h1 align="center">🚀 Shadowrocket Modules</h1>

<p align="center">
  <b>📡 Mở khóa tính năng - 🔒 Bảo mật - 🚫 Chặn quảng cáo</b>
  <br>
  <i>Các module tùy chỉnh Shadowrocket dựa trên cấu trúc từ repo <a href="https://github.com/dhungx/modules-shadowrocket">dhungx/modules-shadowrocket</a></i>
</p>

---

## 📂 Danh sách Module

| 📜 Module | 📝 Mô tả | 📦 Tải về |
|-----------|----------|-----------|
| `locket.module` | Mở khóa Locket Gold | [Raw URL](locket.module) |
| `youtube.module` | Chặn quảng cáo YouTube + PiP + Background | [Raw URL](youtube.module) |
| `spotify.module` | Mở khóa Spotify Premium (một phần) | [Raw URL](spotify.module) |
| `soundcloud.module` | Mở khóa SoundCloud Go+ | [Raw URL](soundcloud.module) |
| `duolingo.module` | Mở khóa Super Duolingo | [Raw URL](duolingo.module) |
| `all-in-one.module` | 🎯 Tổng hợp tất cả | [Raw URL](all-in-one.module) |
| `template.module` | 📋 Template mẫu để tạo module mới | [Raw URL](template.module) |

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
    │   └── (dùng script ngoài)
    ├── spotify/
    │   └── (dùng script ngoài / protobuf)
    ├── soundcloud/
    │   └── soundcloud.js        ← Unlock Go+
    └── duolingo/
        └── super.js             ← Unlock Super
```

---

## 🚀 Cách sử dụng

### Cách 1: Thêm bằng URL
1. Sao chép **Raw URL** của module
2. Mở **Shadowrocket** → **Configuration** → **Module**
3. Nhấn **+** → Dán URL → Nhấn **OK**
4. Bật VPN với kiểu kết nối **Cấu Hình**

### Cách 2: Tải trực tiếp
1. Tải file `.module` về máy
2. Import vào Shadowrocket

---

## ⚠️ Lưu ý
- Chỉ dùng cho mục đích **học tập cá nhân**
- Một số module có thể không hoạt động nếu app đã update hoặc bật TLS Pinning
- Luôn **đăng xuất & đăng nhập lại** sau khi cài module
