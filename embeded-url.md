---
layout: home
title: "Embeded URL"
description: "Turn local files into data URLs you can embed, copy, or share without hosting them anywhere."
date: "Febuary 20, 2022"
tags: ["embeded", "url"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#128193;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Turn a local file into a data URL you can embed or share.</p>
  </div>
</div>

<div class="surface-card space-y-5 p-6 sm:p-8">
  <div>
    <label for="txt" class="form-label">Choose a file</label>
    <input id="txt" class="form-input" autofocus type="file">
  </div>
  <div>
    <label for="out" class="form-label">Data URL</label>
    <textarea id="out" class="form-textarea min-h-[220px] resize-none bg-slate-50 dark:bg-slate-950/50" readonly></textarea>
  </div>
  <div class="flex flex-wrap gap-3">
    <button class="btn-primary" type="button" id="cbtn">Copy to clipboard</button>
    <a class="btn-secondary" id="alink" target="_blank" rel="noopener noreferrer">Open link</a>
  </div>
</div>

<script>
  function pageInit() {
    $('#cbtn').on('click', function() {
      navigator.clipboard.writeText($('#out').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function() {
        $.alert('Failed to copy text.');
      });
    });

    $('#txt').on('change', function() {
      var file = this.files[0];
      var out = $('#out');
      if (!file) {
        out.val('Please choose a file');
        return;
      }
      out.val('Reading file ...');
      var fr = new FileReader();
      fr.onload = function() {
        out.val(fr.result);
        $('#alink').attr('href', fr.result).attr('download', file.name);
      };
      fr.onerror = function() {
        out.val('Something went wrong!');
      };
      fr.readAsDataURL(file);
    });
  }
</script>
