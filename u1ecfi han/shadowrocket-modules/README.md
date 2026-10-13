# Shadowrocket Modules - Self-Hosted

## ✅ Hoàn thành Migration Dependency về Self-Host

Tất cả các module Shadowrocket đã được migrate từ `dhungx/modules-shadowrocket` về repo này (`vanhytt/locket_pro`) để đảm bảo:
- ✅ An toàn bảo mật 100%
- ✅ Kiểm soát hoàn toàn code
- ✅ Không phụ thuộc repo bên ngoài

## 📦 Cấu trúc thư mục

```
shadowrocket-modules/
├── locket.module           ✅ Đã hoàn thành
├── spotify.module          ✅ Đã hoàn thành
├── youtube.module          ✅ Đã hoàn thành
├── duolingo.module         ✅ Đã hoàn thành
├── soundcloud.module       ✅ Đã hoàn thành
└── js/
    ├── locket/
    │   ├── Locket.js       ✅ Đã hoàn thành
    │   └── deleteHeader.js ✅ Đã hoàn thành
    ├── spotify/
    │   └── spotify.js      ⚠️ Cần tải thủ công (70KB - quá lớn)
    ├── youtube/
    │   └── youtube.response.preview.js  ⚠️ Cần tải thủ công (62KB - quá lớn)
    ├── duolingo/
    │   └── super.js        ✅ Đã hoàn thành
    ├── soundcloud/
    │   └── soundcloud.js   ✅ Đã hoàn thành
    └── bilibili/
        └── bilibili_json.js  ⚠️ Cần tải thủ công (28KB - quá lớn)
```

## ⚠️ QUAN TRỌNG: Tải các file JS lớn còn thiếu

Do giới hạn kỹ thuật, bạn cần tải 3 file JavaScript lớn thủ công:

### Cách 1: Tải bằng PowerShell (Khuyến nghị)

Chạy các lệnh sau trong PowerShell:

```powershell
# Tải spotify.js
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/spotify/spotify.js" -OutFile "shadowrocket-modules/js/spotify/spotify.js"

# Tải youtube.response.preview.js
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/Yt/youtube.response.preview.js" -OutFile "shadowrocket-modules/js/youtube/youtube.response.preview.js"

# Tải bilibili_json.js
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/bilibili/bilibili_json.js" -OutFile "shadowrocket-modules/js/bilibili/bilibili_json.js"
```

### Cách 2: Tải trực tiếp từ GitHub

1. **spotify.js**: https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/spotify/spotify.js
2. **youtube.response.preview.js**: https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/Yt/youtube.response.preview.js
3. **bilibili_json.js**: https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/bilibili/bilibili_json.js

Lưu chúng vào đúng thư mục tương ứng trong `shadowrocket-modules/js/`

### Sau khi tải xong, commit và push:

```bash
git add shadowrocket-modules/js/
git commit -m "feat: Add large JS files (spotify, youtube, bilibili)"
git push origin main
```

## 🚀 Cách sử dụng

Tất cả các module đã được cấu hình script-path trỏ đến:
```
https://raw.githubusercontent.com/vanhytt/locket_pro/main/shadowrocket-modules/...
```

**Khi tải 3 file JS lớn còn thiếu và push lên GitHub, toàn bộ hệ thống sẽ hoạt động 100% self-hosted!**

## 📝 Module đã migrate

| Module | Script Path | Status |
|--------|------------|--------|
| Locket Gold | ✅ Self-hosted | Hoạt động |
| Spotify Premium | ⚠️ Thiếu spotify.js | Cần tải file |
| YouTube AdBlock | ⚠️ Thiếu youtube.response.preview.js | Cần tải file |
| Duolingo Super | ✅ Self-hosted | Hoạt động |
| SoundCloud Go+ | ✅ Self-hosted | Hoạt động |

---

**Lưu ý:** Sau khi tải 3 file JS lớn, toàn bộ dependency sẽ được self-host 100% trên repo `vanhytt/locket_pro`. Không còn phụ thuộc repo bên ngoài!
