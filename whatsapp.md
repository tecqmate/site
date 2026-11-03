---
layout: home
title: "WhatsApp Chat Link"
description: "A free service platform supported by your donations."
date: "Jan 16, 2012"
tags: ["whatsapp", "chat", "link"]
lang: en
---

<section class="mb-5">
  <p class="fs-5 mb-4">WhatsApp Chat Link builder.</p>
</section>

<section class="mb-3">
  <div class="col-md-7 col-lg-8">
    <div class="row gy-3">
      <div class="col-md-12">
        <label for="phone" class="form-label">Mobile (mandate)</label>
        <input type="text" class="form-control" autofocus="" id="phone" placeholder="WhatsApp number with country code" maxlength="16" />
      </div>
      <div class="col-sm-12">
        <label for="msg" class="form-label">Message (optional)</label>
        <textarea placeholder="Type or Paste Message here ..." id="msg" class="form-control" rows="7" style="resize:none;"></textarea>
      </div>
      <div class="col-sm-12">
        <button class="mt-3 btn btn-primary btn-sm" id="chat">Submit</button>
      </div>
      <div class="col-md-12">
        <label for="link" class="form-label">Link</label>
        <input type="text" class="form-control" id="link" readonly="" />
      </div>
      <div class="col-sm-12">
        <button class="mt-3 btn btn-primary btn-sm" id="copy">Copy Link</button>
        <a class="mt-3 btn btn-primary btn-sm" id="tab" target="_blank" rel="noopener noreferrer">Open Chat</a>
      </div>
    </div>
  </div>
</section>

<script>
  $(function() {
    $('#chat').on('click', function(e) {
      var phone = $('#phone').val().replace(/\D/g, '');
      if (!/^[0-9]{5,15}$/.test(phone)) {
        $.alert('WhatsApp number is invalid!');
        return;
      }
      var link = 'https://wa.me/' + phone;
      var msg = $.trim($('#msg').val());
      if (msg) {
        msg = $.esc_url(msg);
        link += '?text=' + msg;
      }
      $('#tab').prop('href', link);
      link = $('#link').val(link).get(0);
      link.select();
      link.focus();
    });

    $('#copy').on('click', function(e) {
      navigator.clipboard.writeText($('#link').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function(err) {
        $.alert('Failed to copy text.');
      });
    });
  });
</script>