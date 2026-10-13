// ═══════════════════════════════════════════════════════════
// Locket deleteHeader Script — HTTP REQUEST
// Xóa cache headers → buộc RevenueCat API trả full JSON
// (không trả 304 Not Modified rỗng body)
// ═══════════════════════════════════════════════════════════

// Hàm set header hỗ trợ cả lowercase lẫn original case
function setHeaderValue(headers, key, value) {
    const lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;

// Xóa ETag & cache headers để bypass 304
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
setHeaderValue(modifiedHeaders, "If-None-Match", "");
setHeaderValue(modifiedHeaders, "Cache-Control", "no-cache");
setHeaderValue(modifiedHeaders, "Pragma", "no-cache");

console.log("🛠 RevenueCat cache headers cleared");

$done({ headers: modifiedHeaders });
