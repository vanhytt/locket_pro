// ═══════════════════════════════════════════════════════════════
// Super Duolingo Unlock Script — HTTP RESPONSE
// Target API: *.duolingo.com/.*users.*
// ═══════════════════════════════════════════════════════════════

const url = $request.url;

try {
    var body = JSON.parse($response.body);

    // ── Nhánh 1: API trả về user data ──
    if (url.includes("/users/") || url.includes("/users?")) {
        console.log(`🔓 Unlocking Super Duolingo for: ${body.username || "unknown"}`);

        // Gán trạng thái Super Duolingo
        body.subscription = {
            "productId": "com.duolingo.super.yearly",
            "isActive": true,
            "isLifetime": true,                      // Vĩnh viễn
            "expiryDate": "2099-12-31T23:59:59Z",
            "tier": "Super"
        };

        // Nếu response có trường user riêng, bổ sung flags
        if (body.hasOwnProperty("user")) {
            body.user = {
                ...body.user,
                "isSuper": true,
                "hasSuper": true
            };
        }

        // Bổ sung flags trực tiếp (một số version API)
        body.isSuper = true;
        body.hasSuper = true;

        $done({ body: JSON.stringify(body) });

    // ── Nhánh 2: API subscriber check ──
    } else if (url.includes("/subscribers/")) {
        console.log("🔓 Fake Subscription Active (Duolingo)");

        var fakeResponse = {
            "subscriber": {
                "subscriptions": {
                    "com.duolingo.super.yearly": {
                        "expires_date": "2099-12-31T23:59:59Z",
                        "purchase_date": "2024-01-01T00:00:00Z"
                    }
                },
                "entitlements": {
                    "Super": {
                        "expires_date": "2099-12-31T23:59:59Z",
                        "product_identifier": "com.duolingo.super.yearly",
                        "purchase_date": "2024-01-01T00:00:00Z"
                    }
                }
            }
        };

        $done({ body: JSON.stringify(fakeResponse) });

    } else {
        // Không khớp route nào → pass through
        $done({});
    }
} catch (e) {
    console.log("❌ Duolingo script error: " + e.message);
    $done({});
}
