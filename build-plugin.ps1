# Build the React app
Write-Host "Building React app..." -ForegroundColor Green
npm run build

# Create clean plugin directory
Write-Host "Creating clean plugin export..." -ForegroundColor Green
if (Test-Path "christine-valmy-test-export") {
    Remove-Item -Recurse -Force "christine-valmy-test-export"
}
New-Item -ItemType Directory -Name "christine-valmy-test-export"

# Copy only necessary files
Copy-Item -Recurse "build" "christine-valmy-test-export/"
Copy-Item -Recurse "public" "christine-valmy-test-export/"
Copy-Item -Recurse "src" "christine-valmy-test-export/"
Copy-Item "christine-valmy-test.php" "christine-valmy-test-export/"
Copy-Item "package.json" "christine-valmy-test-export/"
Copy-Item "README.md" "christine-valmy-test-export/"

# Remove development files from export
Set-Location "christine-valmy-test-export"
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}
if (Test-Path ".gitignore") {
    Remove-Item ".gitignore"
}
if (Test-Path "build-plugin.sh") {
    Remove-Item "build-plugin.sh"
}
if (Test-Path "build-plugin.ps1") {
    Remove-Item "build-plugin.ps1"
}

# Create zip file
Write-Host "Creating zip file..." -ForegroundColor Green
Compress-Archive -Path * -DestinationPath "../christine-valmy-test.zip" -Force

Set-Location ".."
$zipSize = (Get-Item "christine-valmy-test.zip").Length
$zipSizeMB = [math]::Round($zipSize / 1MB, 2)

Write-Host "Plugin export created: christine-valmy-test.zip" -ForegroundColor Green
Write-Host "Size: $zipSizeMB MB" -ForegroundColor Green
