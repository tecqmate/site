---
layout: home
title: "QR Code"
description: "Generate QR codes for text, links, and Wi-Fi details instantly in your browser. No uploads, no sign-up, and no data stored on our servers."
date: "June 15, 2024"
tags: ["qrcode", "generator"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#9635;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Generate a QR code for any text or link. Everything runs in your browser.</p>
  </div>
</div>

<div class="surface-card p-6 sm:p-8">
  <label for="txt" class="form-label">Text or link</label>
  <input placeholder="Type or paste here ..." id="txt" type="text" class="form-input" autofocus value="#tecqmate">
  <div id="qrc" class="mt-8 flex min-h-40 justify-center [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200 [&_img]:p-1 dark:[&_img]:border-slate-700"></div>
</div>

<script src="{{ '/assets/js/qrcode.min.js' | relative_url }}"></script>
<script>
  function pageInit() {
    var qrc = new QRCode(document.getElementById("qrc"), {
      width: 150,
      height: 150
    });
    $('#txt').on('input', function(e) {
      var txt = $.trim(this.value);
      this.value = txt;
      qrc.clear();
      if (txt) {
        qrc.makeCode(txt);
        var img = document.querySelector('#qrc img');
        if (img) img.setAttribute('alt', 'QR code for ' + txt);
      }
    }).trigger('input');
  }
</script>
