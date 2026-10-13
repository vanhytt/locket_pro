// ═══════════════════════════════════════════════════════════════
// Locket Gold Unlock Script — HTTP RESPONSE
// Targets:
//   - api.revenuecat.com/*/receipts | /*/subscribers/*  (RevenueCat)
//   - api.locketcamera.com/(user|subscription|config)   (Locket Camera API)
// ═══════════════════════════════════════════════════════════════

const requestUrl = $request.url;

// ── Fake subscription payload chuẩn RevenueCat ──
const FAKE_SUBSCRIPTION = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-31T23:59:59Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2024-01-01T00:00:00Z",
    purchase_date: "2024-01-01T00:00:00Z",
    store: "app_store"
};

// ── Fake entitlement payload chuẩn RevenueCat ──
const FAKE_ENTITLEMENT = {
    grace_period_expires_date: null,
    purchase_date: "2024-01-01T00:00:00Z",
    product_identifier: "com.locket02.premium.yearly",
    expires_date: "2099-12-31T23:59:59Z"
};

try {
    var obj = JSON.parse($response.body);

    // ════════════════════════════════════════════════════════
    // NHÁNH 1: RevenueCat API
    //   URL pattern: api.revenuecat.com/*/(receipts|subscribers/*)
    // ════════════════════════════════════════════════════════
    if (requestUrl.includes("api.revenuecat.com")) {

        // Đảm bảo subscriber object tồn tại
        obj.subscriber = obj.subscriber || {};
        obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
        obj.subscriber.entitlements = obj.subscriber.entitlements || {};

        // Lấy User-Agent để chọn đúng product ID
        var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

        // Map User-Agent → [entitlement key, product ID]
        const UA_MAP = {
            "Locket": ["Gold", "com.locket02.premium.yearly"]
        };

        const matchedUA = Object.keys(UA_MAP).find(k => ua.includes(k));
        let entitlementKey = "pro";
        let productId = "com.locket02.premium.yearly";

        if (matchedUA) {
            [entitlementKey, productId] = UA_MAP[matchedUA];
        }

        // Inject fake subscription + entitlement
        const sub = Object.assign({}, FAKE_SUBSCRIPTION);
        const ent = Object.assign({}, FAKE_ENTITLEMENT, { product_identifier: productId });

        obj.subscriber.subscriptions[productId] = sub;
        obj.subscriber.entitlements[entitlementKey] = ent;

        console.log(`✅ [Locket/RevenueCat] Gold unlocked — entitlement: ${entitlementKey}, product: ${productId}`);
        $done({ body: JSON.stringify(obj) });

    // ════════════════════════════════════════════════════════
    // NHÁNH 2: Locket Camera API
    //   URL pattern: api.locketcamera.com/(user|subscription|config)
    // ════════════════════════════════════════════════════════
    } else if (requestUrl.includes("api.locketcamera.com")) {

        // Ghi đè các trường subscription/premium trực tiếp vào response
        // (Locket Camera API trả JSON phẳng, không nested như RevenueCat)
        obj.subscription = obj.subscription || {};
        obj.subscription.plan = "gold";
        obj.subscription.status = "active";
        obj.subscription.expires_at = "2099-12-31T23:59:59Z";
        obj.subscription.is_active = true;

        // Một số endpoint trả trường premium flat
        if ("is_premium" in obj) obj.is_premium = true;
        if ("premium" in obj) obj.premium = true;
        if ("gold" in obj) obj.gold = true;
        if ("tier" in obj) obj.tier = "gold";

        console.log("✅ [Locket Camera API] Gold unlocked");
        $done({ body: JSON.stringify(obj) });

    } else {
        // Pass through cho các URL không khớp
        $done({});
    }

} catch (e) {
    // Lỗi parse JSON → pass through, không làm hỏng response gốc
    console.log("❌ [Locket.js] Parse error: " + e.message + " | URL: " + requestUrl);
    $done({});
}
