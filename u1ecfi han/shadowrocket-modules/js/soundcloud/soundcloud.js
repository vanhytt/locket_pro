// ═══════════════════════════════════════════════════════════════
// SoundCloud Go+ Unlock Script — HTTP RESPONSE
// Target API: api-mobile.soundcloud.com/configuration/ios
// ═══════════════════════════════════════════════════════════════

var body = $response.body;
var obj = JSON.parse(body);

// ── Thay đổi plan thành Go+ (high_tier) ──
obj.plan = {
    "vendor": "apple",
    "id": "high_tier",                // Tier cao nhất
    "manageable": true,
    "plan_upsells": [],
    "plan_id": "go-plus",
    "upsells": [],
    "plan_name": "SoundCloud Go+"
};

// ── Bật tất cả tính năng premium ──
obj.features = [
    {
        "name": "offline_sync",        // Tải nhạc nghe offline
        "enabled": true,
        "plans": ["mid_tier", "high_tier"]
    },
    {
        "name": "no_audio_ads",        // Không quảng cáo âm thanh
        "enabled": true,
        "plans": ["mid_tier", "high_tier"]
    },
    {
        "name": "hq_audio",            // Âm thanh chất lượng cao
        "enabled": true,
        "plans": ["high_tier"]
    },
    {
        "name": "system_playlist_in_library",
        "enabled": true,
        "plans": []
    },
    {
        "name": "ads_krux",            // Tắt tracking quảng cáo
        "enabled": false,
        "plans": []
    },
    {
        "name": "new_home",
        "enabled": true,
        "plans": []
    },
    {
        "name": "spotlight",
        "enabled": false,
        "plans": []
    }
];

console.log("✅ SoundCloud Go+ unlocked");

body = JSON.stringify(obj);
$done({ body });
