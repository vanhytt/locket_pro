// ═══════════════════════════════════════════════════════════
// Locket Gold Unlock Script — HTTP RESPONSE
// Target API: api.revenuecat.com/*/receipts | subscribers/*
// ═══════════════════════════════════════════════════════════

// Map User-Agent → [entitlement, subscription_id]
// Dùng để hỗ trợ nhiều bundle ID / phiên bản app
const bundleMapping = {
    'Locket': ['Gold', 'com.locket02.premium.yearly']
};

// Lấy User-Agent từ request để xác định app version
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

// Parse response body từ RevenueCat API
var obj = JSON.parse($response.body);

// ── Fake subscription data ──
var fakeSubscription = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-31T23:59:59Z",    // Hạn sử dụng xa trong tương lai
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2024-01-01T00:00:00Z",
    purchase_date: "2024-01-01T00:00:00Z",
    store: "app_store"
};

// ── Fake entitlement data ──
var fakeEntitlement = {
    grace_period_expires_date: null,
    purchase_date: "2024-01-01T00:00:00Z",
    product_identifier: "com.locket02.premium.yearly",
    expires_date: "2099-12-31T23:59:59Z"
};

// Tìm bundle khớp với User-Agent
const matchedKey = Object.keys(bundleMapping).find(k => ua.includes(k));

if (matchedKey) {
    let [entitlementKey, productId] = bundleMapping[matchedKey];
    fakeEntitlement.product_identifier = productId;
    
    // Ghi subscription + entitlement vào response
    obj.subscriber.subscriptions[productId] = fakeSubscription;
    obj.subscriber.entitlements[entitlementKey] = fakeEntitlement;
    console.log(`✅ Locket Gold unlocked for: ${matchedKey}`);
} else {
    // Fallback nếu không nhận ra bundle
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = fakeSubscription;
    obj.subscriber.entitlements["pro"] = fakeEntitlement;
    console.log("✅ Locket Gold unlocked (fallback)");
}

$done({ body: JSON.stringify(obj) });
