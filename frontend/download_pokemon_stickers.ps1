# Downloads the same Pokémon artwork used by the original Secure Steg frontend.
# Run this PowerShell script from your frontend project folder.

$target = Join-Path $PSScriptRoot "src\assets\stickers"
New-Item -ItemType Directory -Force -Path $target | Out-Null

$ids = @(25, 1, 7, 6, 39, 94, 133, 143, 54, 4, 152, 155, 158, 175, 183, 196, 197, 2, 3, 5, 8, 9, 10, 13, 16, 19, 21, 23, 27, 29, 32, 35, 37, 41, 43, 46, 48, 50, 52, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96, 98, 100, 102, 104, 107, 108, 109, 111, 113, 114, 115, 116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 134, 135, 136, 137, 138, 140, 142, 144, 145, 146, 147, 148, 149, 150, 151, 153, 154, 156, 157, 159, 160, 161, 163, 165, 167, 170, 172, 173, 174, 176, 177, 179, 181, 182, 184, 185, 186, 187, 190, 191, 193, 194, 198, 199, 200, 201, 202)

$baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

foreach ($id in $ids) {
    $url = "$baseUrl/$id.png"
    $output = Join-Path $target "$id.png"

    Write-Host "Downloading Pokemon $id..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
    }
    catch {
        Write-Warning "Failed to download Pokemon $id : $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Done. Downloaded Pokémon artwork to:"
Write-Host $target
