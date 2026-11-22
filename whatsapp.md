---
layout: home
title: "WhatsApp Chat Link"
description: "Build a click-to-chat WhatsApp link with a prefilled message for your website, campaign, or support flow."
date: "Jan 16, 2012"
tags: ["whatsapp", "chat", "link"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#128172;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">WhatsApp chat link builder. Create a click-to-chat link with an optional message.</p>
  </div>
</div>

<div class="surface-card grid gap-5 p-6 sm:p-8">
  <div>
    <label for="phone" class="form-label">Mobile number (mandatory)</label>
    <input type="text" class="form-input" autofocus id="phone" placeholder="WhatsApp number with country code" maxlength="16">
  </div>
  <div>
    <label for="msg" class="form-label">Message (optional)</label>
    <textarea placeholder="Type or paste your message here ..." id="msg" class="form-textarea resize-none" rows="6"></textarea>
  </div>
  <div class="flex flex-wrap gap-3">
    <button class="btn-primary" id="chat">Build link</button>
    <button class="btn-secondary" id="copy">Copy link</button>
    <a class="btn-secondary" id="tab" target="_blank" rel="noopener noreferrer">Open chat</a>
  </div>
  <div>
    <label for="link" class="form-label">Generated link</label>
    <input type="text" class="form-input font-mono text-xs" id="link" readonly>
  </div>
</div>

<script>
  function pageInit() {
    $('#chat').on('click', function() {
      var phone = $('#phone').val().replace(/\D/g, '');
      if (!/^[0-9]{5,15}$/.test(phone)) {
        $.alert('WhatsApp number is invalid!');
        return;
      }
      var link = 'https://wa.me/' + phone;
      var msg = $.trim($('#msg').val());
      if (msg) link += '?text=' + $.esc_url(msg);
      $('#tab').prop('href', link);
      link = $('#link').val(link).get(0);
      link.select();
      link.focus();
    });

    $('#copy').on('click', function() {
      navigator.clipboard.writeText($('#link').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function() {
        $.alert('Failed to copy text.');
      });
    });
  }
</script>
