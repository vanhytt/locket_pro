# 📚 Hướng Dẫn Viết Module Shadowrocket (.sgmodule / .module)

> Phân tích từ repo: [dhungx/modules-shadowrocket](https://github.com/dhungx/modules-shadowrocket)

---

## 1. Cấu Trúc Tổng Quan

```
#!url=<URL raw file module>
#!name=<Tên module>
#!desc=<Mô tả>
#!author=<Tác giả>
#!icon=<URL icon .png>

[General]          ← Cấu hình engine (tùy chọn)
[Rule]             ← Rule định tuyến traffic (tùy chọn)
[URL Rewrite]      ← Rewrite/Redirect/Reject URL (tùy chọn)
[Script]           ← Inject JS vào request/response (tùy chọn)
[MITM]             ← Hostname giải mã SSL (bắt buộc nếu dùng Script HTTPS)
```

## 2. [Rule] — Định tuyến traffic
```
DOMAIN,ads.example.com,REJECT
DOMAIN-SUFFIX,doubleclick.net,REJECT
DOMAIN-KEYWORD,adservice,REJECT
AND,((DOMAIN-SUFFIX,googlevideo.com),(PROTOCOL,UDP)),REJECT
```

## 3. [URL Rewrite]
```
^https?://ads\.app\.com/.* _ reject-200
^https://app\.example\.com/splash - reject-dict
```

## 4. [Script]
```
tag = type=http-response, pattern=^https:\/\/api\.example\.com\/.*, requires-body=1, max-size=-1, script-path=https://cdn.com/script.js, timeout=60
```

## 5. [MITM]
```
hostname = %APPEND% api.example.com, *.cdn.com
```

Xem các module mẫu trong cùng thư mục này.
