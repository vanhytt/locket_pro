// ═══════════════════════════════════════════════
// Template: HTTP RESPONSE Script
// Dùng khi cần modify body JSON trả về từ server
// API: $response.body, $request.url, $done()
// ═══════════════════════════════════════════════

const url = $request.url;
var body = $response.body;

try {
    var obj = JSON.parse(body);

    // ── Ví dụ 1: Thêm subscription Premium ──
    if (url.includes("/user") || url.includes("/subscribers")) {
        obj.subscriber = obj.subscriber || {};
        obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
        obj.subscriber.entitlements = obj.subscriber.entitlements || {};

        // Fake subscription đã mua
        obj.subscriber.subscriptions["com.yourapp.premium.yearly"] = {
            is_sandbox: false,
            ownership_type: "PURCHASED",
            billing_issues_detected_at: null,
            period_type: "normal",
            expires_date: "2099-12-31T23:59:59Z",
            original_purchase_date: "2024-01-01T00:00:00Z",
            purchase_date: "2024-01-01T00:00:00Z",
            store: "app_store"
        };

        // Fake entitlement pro
        obj.subscriber.entitlements["pro"] = {
            expires_date: "2099-12-31T23:59:59Z",
            product_identifier: "com.yourapp.premium.yearly",
            purchase_date: "2024-01-01T00:00:00Z"
        };

        console.log("✅ Premium unlocked!");
    }

    // ── Ví dụ 2: Xóa quảng cáo trong JSON response ──
    if (obj.ads) delete obj.ads;
    if (obj.ad_banners) obj.ad_banners = [];
    if (obj.promotions) obj.promotions = [];

    // ── Ví dụ 3: Bật feature flags ──
    if (obj.features) {
        obj.features.forEach(f => {
            if (f.name === "no_ads") f.enabled = true;
            if (f.name === "premium_content") f.enabled = true;
        });
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("❌ Script error: " + e.message);
    $done({}); // Không can thiệp nếu lỗi
}
