Param(
  [Parameter(Mandatory=$true)][string]$SkinUrl,
  [Parameter(Mandatory=$true)][string]$BonesUrl
)

$outDir = Join-Path $PSScriptRoot "..\public\models"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Write-Host "Downloading skin model..."
Invoke-WebRequest -UseBasicParsing -Uri $SkinUrl -OutFile (Join-Path $outDir "hand_skin.glb")
Write-Host "Downloading bones model..."
Invoke-WebRequest -UseBasicParsing -Uri $BonesUrl -OutFile (Join-Path $outDir "hand_bones.glb")

Write-Host "Saved to $outDir"

