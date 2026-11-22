---
layout: home
title: "URL Encode"
description: "Encode or decode URLs safely in your browser. Convert text to URL-safe format and decode percent-encoded strings instantly."
date: "October 23, 2021"
tags: ["encode", "url", "decode"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#128279;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Bulk URL service coming soon. Encode or decode text safely in your browser.</p>
  </div>
</div>

<div class="surface-card grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
  <div>
    <label for="dec" class="form-label">Plain text</label>
    <textarea placeholder="Type or paste plain text here ..." id="dec" class="form-textarea" autofocus rows="7"></textarea>
    <button class="btn-primary mt-4 w-full" type="button" id="ebtn">Encode &rarr;</button>
  </div>
  <div>
    <label for="enc" class="form-label">Encoded text</label>
    <textarea placeholder="Type or paste encoded text here ..." id="enc" class="form-textarea" rows="7"></textarea>
    <button class="btn-secondary mt-4 w-full" type="button" id="dbtn">Decode &rarr;</button>
  </div>
</div>

<script>
  function pageInit() {
    $('#ebtn').on('click', function(e) {
      var inp = $.trim($('#dec').val());
      if (!inp) {
        $.alert('Input is mandatory!');
        return;
      }
      $('#enc').val($.esc_url(inp));
    });

    $('#dbtn').on('click', function(e) {
      var inp = $.trim($('#enc').val());
      if (!inp) {
        $.alert('Input is mandatory!');
        return;
      }
      $('#dec').val($.unesc_url(inp));
    });
  }
</script>
