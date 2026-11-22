---
layout: home
title: "Verify Email"
description: "Check whether an email address is likely valid and understand hard bounces, soft bounces, and deliverability risks."
date: "July 30, 2012"
tags: ["email", "verify", "soft", "hard", "bounce"]
lang: en
seo:
  type: WebPage
inline_scripts:
  - $(pageInit);
---

<div class="mb-8 flex items-start gap-4">
  <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl dark:bg-brand-950/50" aria-hidden="true">&#9993;</span>
  <div>
    <p class="eyebrow">Free web tool</p>
    <p class="mt-2 text-lg leading-relaxed text-slate-600 dark:text-slate-300">We will make an attempt to contact the provided email address.</p>
    <p class="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">A hard bounce may mean the address does not exist. A soft bounce usually means the inbox is full or has reached its quota limit.</p>
  </div>
</div>

<div class="surface-card p-6 sm:p-8">
  <label for="email" class="form-label">Email address</label>
  <div class="flex flex-col gap-3 sm:flex-row">
    <input placeholder="name@example.com" id="email" type="email" class="form-input" autofocus>
    <button class="btn-primary shrink-0" type="button" id="btn">
      Verify
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
      </svg>
    </button>
  </div>
</div>

<script>
  function pageInit() {
    var btn = $('#btn');
    btn.on('click', function() {
      btn.addClass('disabled');
      var email = $.trim($('#email').val());
      if (!email) {
        $.alert('Email is mandatory!');
        btn.removeClass('disabled');
        return;
      }
      $.getJSON('https://email-verifier-lovat.vercel.app/api/verify', {
        'email': email
      }, function(resp) {
        if (resp.message) $.alert(resp.message);
      }).always(function() {
        btn.removeClass('disabled');
      });
    });
  }
</script>
