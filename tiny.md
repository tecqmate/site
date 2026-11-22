---
layout: home
title: "Tiny URL"
description: "Create short links with our Tiny URL tool, powered by tinyurl.com. Bulk URL shortening is coming soon."
date: "January 1, 2012"
tags: ["short", "url", "tiny"]
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
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">Bulk URL service coming soon. Tiny URL service is powered by tinyurl.com.</p>
  </div>
</div>

<div class="surface-card p-6 sm:p-8">
  <label for="url" class="form-label">Long URL</label>
  <div class="flex flex-col gap-3 sm:flex-row">
    <input placeholder="Type or paste a URL here ..." id="url" type="url" class="form-input" autofocus>
    <button class="btn-primary shrink-0" type="button" id="btn">
      Shorten
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
      </svg>
    </button>
  </div>
</div>

<script>
  function pageInit() {
    $('#btn').on('click', function(e) {
      var url = $.trim($('#url').val());
      if (!url) {
        $.alert('URL is mandatory!');
        return;
      }

      $.get('https://tinyurl.com/api-create.php', {
        'url': url
      }, function(resp) {
        $('#url').val(resp);
      });
    });
  }
</script>
