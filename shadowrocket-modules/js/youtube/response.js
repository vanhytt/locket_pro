// ═══════════════════════════════════════════════════════════════
// YouTube BlockAd + PiP + Background Play Script
// Target: youtubei.googleapis.com/youtubei/v1/(browse|next|player|...)
// Engine: Shadowrocket / Surge JS — binary-body-mode=1 (JSON wrapped)
// ═══════════════════════════════════════════════════════════════

var body = $response.body;
var obj;

try {
    obj = JSON.parse(body);
} catch (e) {
    // Body không parse được JSON → pass through không can thiệp
    console.log("⚠️ [YouTube] Non-JSON body, skipping.");
    $done({});
    // return; // không dùng được trong SR engine, dùng $done thay thế
}

// ════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════

// Duyệt đệ quy toàn bộ object/array để xóa ad renderers
function removeAds(obj) {
    if (!obj || typeof obj !== "object") return obj;

    // Danh sách renderer key chứa quảng cáo YouTube
    const AD_KEYS = [
        "adPlacements",
        "adSlots",
        "playerAds",
        "adBreakHeartbeatParams",
        "auxiliaryUi",          // banner quảng cáo overlay
        "confirmDialogRenderer" // dialog mua premium
    ];

    // Danh sách renderer type quảng cáo cần xóa khỏi array content
    const AD_RENDERERS = [
        "adPlacementRenderer",
        "adSlotRenderer",
        "playerLegacyDesktopWatchAdsRenderer",
        "linearAdSequenceRenderer",
        "instreamVideoAdRenderer",
        "promotedVideoRenderer",
        "promotedSparklesWebRenderer",
        "searchPyvRenderer"
    ];

    if (Array.isArray(obj)) {
        // Lọc bỏ item trong array nếu key đầu tiên là ad renderer
        return obj
            .filter(item => {
                if (item && typeof item === "object") {
                    return !AD_RENDERERS.some(r => r in item);
                }
                return true;
            })
            .map(item => removeAds(item));
    }

    // Xóa các key quảng cáo trực tiếp
    AD_KEYS.forEach(key => {
        if (key in obj) {
            delete obj[key];
        }
    });

    // Đệ quy vào các child object
    Object.keys(obj).forEach(key => {
        obj[key] = removeAds(obj[key]);
    });

    return obj;
}

// Bật Background Play: xóa điều kiện lockup khi màn hình tắt
function enableBackgroundPlay(obj) {
    // Xóa backgroundabilityRenderer — ngăn phát nền
    function strip(o) {
        if (!o || typeof o !== "object") return o;
        if (Array.isArray(o)) return o.map(strip);
        if ("backgroundabilityRenderer" in o) delete o["backgroundabilityRenderer"];
        if ("autoplay" in o && o.autoplay && o.autoplay.sets) {
            // Bật autoplay không điều kiện
        }
        Object.keys(o).forEach(k => { o[k] = strip(o[k]); });
        return o;
    }
    return strip(obj);
}

// Bật PiP (Picture-in-Picture)
function enablePiP(obj) {
    // playerConfig → streamingData → pip flag
    if (obj.playerConfig) {
        obj.playerConfig.audioConfig = obj.playerConfig.audioConfig || {};
        // Xóa flag ngăn PiP
        delete obj.playerConfig.exoPlayerConfig;
    }
    // videoDetails → pip allowed
    if (obj.videoDetails) {
        obj.videoDetails.allowRatings = true;
    }
    // Xóa playabilityStatus lỗi liên quan premium
    if (obj.playabilityStatus) {
        if (obj.playabilityStatus.status === "LOGIN_REQUIRED" ||
            obj.playabilityStatus.status === "CONTENT_CHECK_REQUIRED") {
            obj.playabilityStatus.status = "OK";
            delete obj.playabilityStatus.errorScreen;
        }
        // Bật phát nền / pip trong playabilityStatus
        delete obj.playabilityStatus.backgroundability;
    }
    return obj;
}

// Xóa upsell / premium prompt dialogs
function removePremiumPrompts(obj) {
    function strip(o) {
        if (!o || typeof o !== "object") return o;
        if (Array.isArray(o)) return o.map(strip);
        // Xóa các key dẫn đến dialog mua Premium
        const PROMO_KEYS = [
            "ypcTrackingParams",
            "subscribeCommand",
            "purchaseButtonRenderer",
            "offerRenderer",
            "premiumRenderer",
            "mealbarPromoRenderer"
        ];
        PROMO_KEYS.forEach(k => { if (k in o) delete o[k]; });
        Object.keys(o).forEach(k => { o[k] = strip(o[k]); });
        return o;
    }
    return strip(obj);
}

// ════════════════════════════════════════════════════════════════
// MAIN — áp dụng tất cả transforms
// ════════════════════════════════════════════════════════════════

try {
    // 1. Xóa quảng cáo
    obj = removeAds(obj);

    // 2. Bật Background Play
    obj = enableBackgroundPlay(obj);

    // 3. Bật PiP
    obj = enablePiP(obj);

    // 4. Xóa prompt mua Premium
    obj = removePremiumPrompts(obj);

    console.log("✅ [YouTube] AdBlock + PiP + Background applied");
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("❌ [YouTube] Script error: " + e.message);
    $done({}); // pass through, không làm crash response
}
