---
layout: home
title: "HTML Encode Services"
description: "A free service platform supported by your donations."
date: "Febuary 20, 2022"
tags: ["escape", "html"]
lang: en
---

<section class="mb-5">
  <div class="row">
    <div class="col-12 col-md-6 text-center">
      <textarea placeholder="Type or Paste Plain Text here ..." id="txt" class="form-control mb-3" autofocus=""></textarea>
      <button class="btn btn-primary" type="button" id="ebtn">Escape</button>
    </div>
    <div class="col-12 col-md-6 text-center">
      <textarea readonly="" id="esc" class="form-control mb-3"></textarea>
      <button class="btn btn-primary" type="button" id="cbtn">Copy</button>
    </div>
  </div>
</section>

<style>
  #txt,
  #esc {
    resize: none;
    min-height: 200px;
  }
</style>

<script>
  $(function() {
    $('#cbtn').on('click', function(e) {
      navigator.clipboard.writeText($('#esc').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function(err) {
        $.alert('Failed to copy text.');
      });
    });

    $('#ebtn').on('click', function(e) {
      var text = document.createTextNode($('#txt').val());
      var p = document.createElement('p');
      p.appendChild(text);
      $('#esc').val(p.innerHTML);
    });
  });
</script>