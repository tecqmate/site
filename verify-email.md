---
layout: home
title: "Verify Email"
description: "A free service platform supported by your donations."
date: "July 30, 2012"
tags: ["email", "verify", "soft", "hard", "bounce"]
lang: en
inline_scripts:
  - $(pageInit);
---

<section class="mb-5">
  <p class="fs-5 mb-4">We will make an attempt to contact the provided email address.</p>
  <p class="fs-5 mb-4">A hard bounce, possibly no such email exists. A soft bounce; most likely, the inbox is full or has reached its quota limit.</p>
</section>

<section class="mb-5">
  <div class="row">
    <div class="col-10">
      <input placeholder="Type or Paste here ..." id="email" type="email" class="form-control" autofocus="" />
    </div>
    <div class="col-2">
      <button class="btn btn-primary" type="button" id="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
        </svg>
      </button>
    </div>
  </div>
</section>

<script>
  function pageInit() {
    var btn = $('#btn');
    btn.on('click', function(e) {
      btn.addClass('disabled');
      var email = $.trim($('#email').val());
      if (!email) {
        $.alert('Email is mandate!');
        btn.removeClass('json-done disabled'); // ensures button unlocks on early return
        return;
      }
      $.getJSON('https://pingme.pythonanywhere.com/email-exists', {
        'email': email
      }, function(resp) {
        if ('msg' in resp) {
          $.alert(resp.msg);
        }
      }).always(function() {
        btn.removeClass('disabled');
      });
    });
  }
</script>