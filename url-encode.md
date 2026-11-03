---
layout: home
title: "URL Encode"
description: "A free service platform supported by your donations."
date: "October 23, 2021"
tags: ["encode", "url", "decode"]
lang: en
---

<section class="mb-5">
  <p class="fs-5 mb-4">Bulk URL service comming soon.</p>
</section>

<section class="mb-5">
  <div class="row">
    <div class="col-12 col-md-6 text-center">
      <textarea placeholder="Type or Paste Plain Text here ..." id="dec" class="form-control mb-3" autofocus="" rows="7"></textarea>
      <button class="btn btn-primary" type="button" id="ebtn">Encode</button>
    </div>
    <div class="col-12 col-md-6 text-center">
      <textarea placeholder="Type or Paste Encoded Text here ..." id="enc" class="form-control mb-3" rows="7"></textarea>
      <button class="btn btn-primary" type="button" id="dbtn">Decode</button>
    </div>
  </div>
</section>

<script>
  $(function() {
    $('#ebtn').on('click', function(e) {
      var inp = $.trim($('#dec').val());
      if (!inp) {
        $.alert('Input is mandate!');
        return;
      }
      inp = $.esc_url(inp);
      $('#enc').val(inp);
    });

    $('#dbtn').on('click', function(e) {
      var inp = $.trim($('#enc').val());
      if (!inp) {
        $.alert('Input is mandate!');
        return;
      }
      inp = $.unesc_url(inp);
      $('#dec').val(inp);
    });
  });
</script>