---
layout: home
title: "SMS Counter"
description: "Count SMS characters, detect Unicode, and see GSM-7 versus UCS-2 segmentation before you send a message."
date: "March 14, 2022"
tags: ["sms", "count", "unicode"]
lang: en
seo:
  type: WebPage
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#128241;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">SMS counter and Unicode detector, calculated locally as you type.</p>
  </div>
</div>

<div class="surface-card p-6 sm:p-8">
  <label for="text" class="form-label">Message</label>
  <textarea placeholder="Type or paste your message here ..." id="text" class="form-textarea min-h-[220px] resize-none" autofocus></textarea>
  <div id="out" class="mt-5 rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-slate-700 dark:border-brand-900/60 dark:bg-brand-950/30 dark:text-slate-200 [&_strong]:text-slate-900 dark:[&_strong]:text-white"></div>
</div>

<script defer src="{{ '/assets/js/sms-counter.js' | relative_url }}"></script>
