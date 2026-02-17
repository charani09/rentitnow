try {
    $url = "https://commons.wikimedia.org/wiki/File:Karcher_pressure_washer_K_MINI.webp"
    $response = Invoke-WebRequest -Uri $url -UserAgent "Mozilla/5.0" -UseBasicParsing
    if ($response.Content -match 'src="(https://upload.wikimedia.org/wikipedia/commons/thumb/[0-9a-f]/[0-9a-f]{2}/[^"]+)"') {
        $imgUrl = $matches[1]
        # Remove /thumb/ and the width part to get original if possible, or just use thumb
        # Original: https://upload.wikimedia.org/wikipedia/commons/a/ab/Filename.ext
        # Thumb: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Filename.ext/800px-Filename.ext
        
        # Regex to extract the part strictly
        if ($imgUrl -match '/wikipedia/commons/thumb/([0-9a-f])/([0-9a-f]{2})/') {
             Write-Host "HASH: $($matches[1])/$($matches[2])"
        }
    }
} catch {
    Write-Host "Error: $_"
}
