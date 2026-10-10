param([string]$OutputDirectory = "$PSScriptRoot/data")
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$base = 'https://www.cashify.in'
$headers = @{ 'User-Agent' = 'PublicMarketResearch/1.0 (limited public page metadata collection)' }
$robots = Invoke-WebRequest -Uri "$base/robots.txt" -UseBasicParsing -Headers $headers -TimeoutSec 30
$robots.Content | Set-Content -LiteralPath "$OutputDirectory/robots.txt" -Encoding UTF8
# Fixed public allowlist; no accounts, quote calculator, API calls, forms or user data.
$paths = @('/', '/sell-old-mobile-phone', '/buy-refurbished-mobile-phones', '/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848', '/repair', '/refurbished-warranty-policy', '/warranty-policy', '/buyback-guarantee-usage-policy', '/partner-with-us', '/about-us', '/privacy-policy', '/refurbished-terms-conditions', '/offline-stores', '/pixelupgrade', '/recycle')
$rules = @(); $active = $false
foreach ($line in ($robots.Content -split "`n")) {
  $line = ($line -split '#')[0].Trim()
  if ($line -match '^User-agent:\s*(.*)') { $active = $Matches[1].Trim() -eq '*' }
  elseif ($active -and $line -match '^Disallow:\s*(.+)') { $rules += $Matches[1].Trim() }
}
$pages = @(); $links = @(); $headings = @(); $prices = @()
foreach ($path in $paths) {
  $blocked = $false
  foreach ($rule in $rules) {
    $pattern = '^' + [regex]::Escape($rule).Replace('\*', '.*').Replace('\$', '$')
    if ($path -match $pattern) { $blocked = $true; break }
  }
  $url = "$base$path"
  $timestamp = [DateTimeOffset]::UtcNow.ToString('o')
  if ($blocked) { $pages += [pscustomobject]@{url=$url; retrieved_at_utc=$timestamp; status='robots_disallowed'; title=''; bytes=0}; continue }
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers -TimeoutSec 30 -MaximumRedirection 3
    $html = $response.Content
    $title = [Net.WebUtility]::HtmlDecode(([regex]::Match($html, '(?is)<title[^>]*>(.*?)</title>')).Groups[1].Value)
    $pages += [pscustomobject]@{url=$url; retrieved_at_utc=$timestamp; status=[int]$response.StatusCode; title=$title; bytes=$html.Length}
    foreach ($m in [regex]::Matches($html, '(?is)<h([1-3])\b[^>]*>(.*?)</h\1>')) {
      $label = [Net.WebUtility]::HtmlDecode([regex]::Replace($m.Groups[2].Value, '<[^>]+>', ' ')) -replace '\s+', ' '
      if ($label.Trim()) { $headings += [pscustomobject]@{source_url=$url; level=$m.Groups[1].Value; heading=$label.Trim()} }
    }
    foreach ($link in $response.Links) {
      if ($link.href -and $link.href -notmatch '^(javascript:|mailto:|tel:|#)') {
        try { $absolute = [Uri]::new([Uri]$url, [string]$link.href); if ($absolute.Host -eq 'www.cashify.in') { $links += [pscustomobject]@{source_url=$url; target_url=$absolute.GetLeftPart([UriPartial]::Path)} } } catch {}
      }
    }
    $visible = [regex]::Replace($html, '(?is)<(script|style)\b[^>]*>.*?</\1>', ' ')
    $visible = [Net.WebUtility]::HtmlDecode([regex]::Replace($visible, '<[^>]+>', ' ')) -replace '\s+', ' '
    foreach ($m in [regex]::Matches($visible, '(?:\u20B9|Rs\.?\s*)\s*[\d,]+(?:\.\d{1,2})?')) {
      $prices += [pscustomobject]@{source_url=$url; retrieved_at_utc=$timestamp; price_token=$m.Value; interpretation='Unassociated displayed token; may be discount, EMI, list price, or product price. Not a quote.'}
    }
    Write-Output "$($response.StatusCode) $url"
  } catch {
    $pages += [pscustomobject]@{url=$url; retrieved_at_utc=$timestamp; status='fetch_failed'; title=$_.Exception.Message; bytes=0}
    Write-Output "FAILED $url"
  }
  Start-Sleep -Milliseconds 1200
}
$pages | Export-Csv -LiteralPath "$OutputDirectory/pages.csv" -NoTypeInformation -Encoding UTF8
$links | Sort-Object source_url,target_url -Unique | Export-Csv -LiteralPath "$OutputDirectory/links.csv" -NoTypeInformation -Encoding UTF8
$headings | Sort-Object source_url,level,heading -Unique | Export-Csv -LiteralPath "$OutputDirectory/headings.csv" -NoTypeInformation -Encoding UTF8
$prices | Sort-Object source_url,price_token -Unique | Export-Csv -LiteralPath "$OutputDirectory/price-tokens.csv" -NoTypeInformation -Encoding UTF8
$pages | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath "$OutputDirectory/pages.json" -Encoding UTF8
Write-Output "Finished: $($pages.Count) attempted public pages."
