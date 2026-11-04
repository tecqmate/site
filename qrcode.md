---
layout: home
title: "QR Code"
description: "A free service platform supported by your donations."
date: "June 15, 2024"
tags: ["qrcode", "generator"]
lang: en
---

<section class="mb-3">
  <input placeholder="Type or Paste here ..." id="txt" type="text" class="form-control" autofocus="" value="#tecqmate" />
</section>
<section class="mb-3" id="qrc"></section>

<style>
  #qrc img {
    margin: auto;
  }
</style>

<!-- Load qrcode.min.js plugin script -->
<script src="{{ '/assets/js/qrcode.min.js' | relative_url }}"></script>
<script>
  $(function() {
    var qrc = new QRCode(document.getElementById("qrc"), {
      width: 150,
      height: 150
    });
    $('#txt').on('input', function(e) {
      var txt = $.trim(this.value);
      this.value = txt;
      qrc.clear();
      if (txt) {
        qrc.makeCode(txt);
      }
    }).trigger('input');
  });
</script>