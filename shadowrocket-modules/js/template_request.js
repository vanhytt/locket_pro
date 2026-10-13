// ═══════════════════════════════════════════════
// Template: HTTP REQUEST Script
// Dùng khi cần modify headers / body REQUEST
// API: $request.headers, $request.body, $done()
// ═══════════════════════════════════════════════

// Lấy headers hiện tại của request
var headers = $request.headers;

// ── Ví dụ 1: Xóa các cache/etag headers để bypass cache ──
function setHeader(headers, key, value) {
    // Shadowrocket có thể dùng lowercase key
    const lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

// Xóa ETag & cache headers để buộc server trả response mới
setHeader(headers, "X-RevenueCat-ETag", "");
setHeader(headers, "If-None-Match", "");
setHeader(headers, "Cache-Control", "no-cache");
setHeader(headers, "Pragma", "no-cache");

// ── Ví dụ 2: Thêm header tùy chỉnh ──
// setHeader(headers, "X-Custom-Header", "value");

// ── Ví dụ 3: Xóa header ──
// delete headers["Authorization"];

console.log("🛠 Modified Headers:", JSON.stringify(headers, null, 2));

// Trả về request với headers đã chỉnh sửa
$done({ headers: headers });
