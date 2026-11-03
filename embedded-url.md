---
layout: home
title: "Embeded URL"
description: "A free service platform supported by your donations."
date: "Febuary 20, 2022"
tags: ["embeded", "url"]
lang: en
---

<section class="mb-3">
  <input id="txt" class="form-control" autofocus="" type="file" />
</section>
<section class="mb-3">
  <textarea id="out" class="form-control" readonly=""></textarea>
</section>
<section class="mb-3 text-center">
  <button class="btn btn-primary" type="button" id="cbtn">Copy</button>
  <a class="btn btn-primary" id="alink" target="_blank">Open Link</a>
</section>

<style>
  #out {
    resize: none;
    min-height: 200px;
  }
</style>

<script>
  $(function() {
    $('#cbtn').on('click', function(e) {
      navigator.clipboard.writeText($('#out').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function(err) {
        $.alert('Failed to copy text.');
      });
    });

    $('#txt').on('change', function(e) {
      var file = this.files[0];
      var out = $('#out');
      if (!file) {
        out.val('Please choose file');
      }
      if (file) {
        out.val('Reading file ...');
        var fr = new FileReader();
        fr.onload = function(e) {
          out.val(fr.result);
          $('#alink').attr('href', fr.result).attr('download', file.name);
        };
        fr.onerror = function() {
          out.val('Something went wrong!');
        };
        fr.readAsDataURL(file);
      }
    });
  });
</script>