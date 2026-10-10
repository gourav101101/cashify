$ErrorActionPreference = 'Stop'
$report = Join-Path $PSScriptRoot 'Cashify-alternative-report.md'
$lines = Get-Content -LiteralPath $report -Encoding UTF8
$body = [System.Text.StringBuilder]::new()
$toc = [System.Text.StringBuilder]::new()
function Inline([string]$value) {
  $s = [Net.WebUtility]::HtmlEncode($value)
  $s = [regex]::Replace($s, '\[([^\]]+)\]\(([^)]+)\)', '<a href="$2">$1</a>')
  $s = [regex]::Replace($s, '\*\*([^*]+)\*\*', '<strong>$1</strong>')
  $s = [regex]::Replace($s, '`([^`]+)`', '<code>$1</code>')
  return $s
}
$code = $false; $table = $false; $list = ''; $section = 0
foreach ($line in $lines) {
  if ($line.StartsWith('```')) {
    if ($code) { [void]$body.AppendLine('</code></pre>') } else { [void]$body.AppendLine('<pre><code>') }
    $code = -not $code; continue
  }
  if ($code) { [void]$body.AppendLine([Net.WebUtility]::HtmlEncode($line)); continue }
  if ($line.StartsWith('|')) {
    if ($line -match '^\|[\s:|\-]+\|$') { continue }
    $cells = $line.Trim('|').Split('|')
    if (-not $table) { [void]$body.AppendLine('<div class="table-scroll"><table><thead>'); $tag = 'th'; $table = $true } else { $tag = 'td' }
    [void]$body.Append('<tr>')
    foreach ($cell in $cells) { [void]$body.Append("<$tag>$(Inline $cell.Trim())</$tag>") }
    [void]$body.AppendLine('</tr>')
    if ($tag -eq 'th') { [void]$body.AppendLine('</thead><tbody>') }
    continue
  }
  if ($table) { [void]$body.AppendLine('</tbody></table></div>'); $table = $false }
  $isUnordered = $line -match '^\- '
  $isOrdered = $line -match '^\d+\. '
  if ($list -and -not $isUnordered -and -not $isOrdered) { [void]$body.AppendLine("</$list>"); $list = '' }
  if (-not $line.Trim()) { continue }
  if ($line -match '^(#{1,3}) (.*)$') {
    $level = $Matches[1].Length; $label = $Matches[2]; $section++
    [void]$body.AppendLine("<h$level id=""s$section"">$(Inline $label)</h$level>")
    if ($level -eq 2) { [void]$toc.AppendLine("<a href=""#s$section"">$(Inline $label)</a>") }
  } elseif ($isUnordered -or $isOrdered) {
    $needed = if ($isOrdered) { 'ol' } else { 'ul' }
    if ($list -ne $needed) { if ($list) { [void]$body.AppendLine("</$list>") }; [void]$body.AppendLine("<$needed>"); $list = $needed }
    [void]$body.AppendLine("<li>$(Inline ([regex]::Replace($line, '^(\- |\d+\. )', '')))</li>")
  } else { [void]$body.AppendLine("<p>$(Inline $line)</p>") }
}
if ($table) { [void]$body.AppendLine('</tbody></table></div>') }
if ($list) { [void]$body.AppendLine("</$list>") }
$html = @"
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cashify alternative research and blueprint</title>
<style>
:root{color-scheme:light;font-family:Segoe UI,Arial,sans-serif;color:#152c35;background:#f4f7f7}*{box-sizing:border-box}body{margin:0;line-height:1.65}aside{position:fixed;width:280px;inset:0 auto 0 0;padding:24px;background:#102f38;color:#eefafa;overflow:auto}aside strong{font-size:20px}aside small{display:block;color:#9dbdc5;margin:10px 0 24px}aside a{display:block;color:#d5e8eb;text-decoration:none;font-size:13px;padding:6px 0}main{margin-left:280px;max-width:1200px;padding:40px 55px 90px;background:white}h1{font-size:38px;line-height:1.2;color:#123f4b}h2{font-size:25px;border-top:2px solid #dbe8e8;padding-top:30px;margin-top:48px;scroll-margin-top:25px}p,li{font-size:15px}a{color:#086d80}table{width:100%;border-collapse:collapse;font-size:13px;margin:15px 0}td,th{padding:10px 12px;text-align:left;vertical-align:top;border:1px solid #dbe4e7}th{background:#e9f2f3}tr:nth-child(even){background:#f8fafb}.table-scroll{overflow-x:auto}pre{background:#102f38;color:#edfafa;padding:20px;overflow:auto;font-size:12px}code{font-family:Consolas,monospace}p code,li code{background:#edf3f4;padding:2px 4px}.toolbar{padding:12px 18px;background:#e8f4ed;border-left:4px solid #348659;font-size:14px}.toolbar button{float:right;border:0;background:#123f4b;color:white;padding:7px 14px;cursor:pointer}@media(max-width:950px){aside{position:static;width:auto;max-height:260px}main{margin:0;padding:24px}}@media print{aside,.toolbar{display:none}main{margin:0;padding:0;max-width:none}body{background:white}h2{break-after:avoid}tr{break-inside:avoid}pre{white-space:pre-wrap;color:black;background:#eee}a{color:#123f4b}table{font-size:10px}p,li{font-size:11px}h1{font-size:28px}h2{font-size:20px}.table-scroll{overflow:visible}@page{size:A4;margin:16mm}}
</style></head><body><aside><strong>Cashify alternative</strong><small>Research &amp; product blueprint<br>10 October 2026</small>$toc</aside><main><div class="toolbar"><button onclick="window.print()">Print / save PDF</button>Public research + proposed business plan. Estimates are labelled.</div>$body</main></body></html>
"@
$html | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'Cashify-alternative-report.html') -Encoding UTF8
Write-Output 'Rendered standalone report HTML.'
