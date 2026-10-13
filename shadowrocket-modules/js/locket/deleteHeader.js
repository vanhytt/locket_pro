// ═══════════════════════════════════════════════════════════════
// Locket deleteHeader Script — HTTP REQUEST
// Targets:
//   - api.revenuecat.com/*/(receipts|subscribers)  → Xóa RevenueCat cache
//   - api.locketcamera.com/*                       → Xóa Locket Camera cache
//
// Mục đích: Buộc server trả FULL JSON response (200 OK)
//           thay vì trả 304 Not Modified (body rỗng → Script parse lỗi)
// ═══════════════════════════════════════════════════════════════

// Hàm set header hỗ trợ cả lowercase lẫn original case
// Shadowrocket có thể trả headers với case khác nhau tùy phiên bản
function setHeaderValue(headers, key, value) {
    const lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;

// ── Xóa/Clear cache headers cho RevenueCat ──
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// ── Xóa standard HTTP cache headers ──
// Áp dụng cho cả RevenueCat VÀ Locket Camera API
setHeaderValue(modifiedHeaders, "If-None-Match", "");
setHeaderValue(modifiedHeaders, "If-Modified-Since", "");
setHeaderValue(modifiedHeaders, "Cache-Control", "no-cache, no-store, must-revalidate");
setHeaderValue(modifiedHeaders, "Pragma", "no-cache");

console.log("🛠 [deleteHeader.js] Cache headers cleared for: " + $request.url);

$done({ headers: modifiedHeaders });
