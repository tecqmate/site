---
layout: home
title: "HTML Encode Services"
description: "Escape and unescape HTML characters safely in your browser so text renders correctly without breaking markup."
date: "Febuary 20, 2022"
tags: ["escape", "html"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#60;/&#62;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Escape text so it can be displayed safely as HTML.</p>
  </div>
</div>

<div class="surface-card grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
  <div>
    <label for="txt" class="form-label">Plain text</label>
    <textarea placeholder="Type or paste plain text here ..." id="txt" class="form-textarea min-h-[220px] resize-none" autofocus></textarea>
    <button class="btn-primary mt-4 w-full" type="button" id="ebtn">Escape &rarr;</button>
  </div>
  <div>
    <label for="esc" class="form-label">Escaped output</label>
    <textarea readonly id="esc" class="form-textarea min-h-[220px] resize-none bg-slate-50 dark:bg-slate-950/50"></textarea>
    <button class="btn-secondary mt-4 w-full" type="button" id="cbtn">Copy to clipboard</button>
  </div>
</div>

<script>
  function pageInit() {
    $('#cbtn').on('click', function() {
      navigator.clipboard.writeText($('#esc').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function() {
        $.alert('Failed to copy text.');
      });
    });

    $('#ebtn').on('click', function() {
      var p = document.createElement('p');
      p.appendChild(document.createTextNode($('#txt').val()));
      $('#esc').val(p.innerHTML);
    });
  }
</script>
