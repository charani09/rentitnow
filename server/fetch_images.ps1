$urls = @(
    "https://commons.wikimedia.org/wiki/File:Meta_Quest_3_display.jpg",
    "https://commons.wikimedia.org/wiki/File:Karcher_pressure_washer_K_MINI.webp"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0" -UseBasicParsing
        # Look for the "original file" link which is usually in the class "internal" or similar, or just distinct
        # Wikimedia structure: <a href="https://upload.wikimedia.org/..." class="internal" ...>Original file</a>
        
        $pattern = 'href="(https://upload.wikimedia.org/wikipedia/commons/[^"]+)"'
        if ($response.Content -match $pattern) {
             "FOUND: $url -> $($matches[1])" | Out-File -FilePath "image_urls.txt" -Append -Encoding utf8
        } else {
             "NOT FOUND for $url" | Out-File -FilePath "image_urls.txt" -Append -Encoding utf8
        }
    } catch {
        "ERROR fetching $url : $_" | Out-File -FilePath "image_urls.txt" -Append -Encoding utf8
    }
}
