$files = @(
    @{
        Uri = 'https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/spotify/spotify.js'
        OutFile = 'D:\dev\h\u1ecfi han\shadowrocket-modules\js\spotify\spotify.js'
    },
    @{
        Uri = 'https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/Yt/youtube.response.preview.js'
        OutFile = 'D:\dev\h\u1ecfi han\shadowrocket-modules\js\youtube\youtube.response.preview.js'
    },
    @{
        Uri = 'https://raw.githubusercontent.com/dhungx/modules-shadowrocket/main/js/bilibili/bilibili_json.js'
        OutFile = 'D:\dev\h\u1ecfi han\shadowrocket-modules\js\bilibili\bilibili_json.js'
    }
)

$ProgressPreference = 'SilentlyContinue'

foreach ($file in $files) {
    Write-Host "Downloading: $($file.Uri)"
    Invoke-WebRequest -Uri $file.Uri -OutFile $file.OutFile
    if (Test-Path $file.OutFile) {
        $size = (Get-Item $file.OutFile).Length
        Write-Host "Downloaded: $size bytes"
    } else {
        Write-Host "Failed to download"
    }
}

Write-Host "All files downloaded successfully"
