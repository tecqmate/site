---
layout: home
title: "Google Analytics Campaign Links"
description: "A free service platform supported by your donations."
date: "May 18, 2022"
tags: ["ga", "utm", "analytics"]
lang: en
---

<section class="mb-5">
  <p class="fs-5 mb-4">Bulk URL service comming soon.</p>
</section>

<section class="mb-5">
  <div class="row">
    <div class="col-12">
      <label for="url" class="form-label">Landing/Website URL</label>
      <input placeholder="Type or Paste URL here ..." id="url" type="url" class="form-control" autofocus="" />
    </div>
    <div class="col-sm-6">
      <label for="source" class="form-label">Campaign Source</label>
      <input type="text" class="form-control" id="source" name="source" placeholder="Google" />
    </div>
    <div class="col-sm-6">
      <label for="medium" class="form-label">Campaign Medium</label>
      <input type="text" class="form-control" id="medium" name="medium" placeholder="Banner" />
    </div>
    <div class="col-sm-6">
      <label for="name" class="form-label">Campaign Name</label>
      <input type="text" class="form-control" id="name" name="name" placeholder="Name to view in CRM" />
    </div>
    <div class="col-sm-6">
      <label for="term" class="form-label">Campaign Term(Optional)</label>
      <input type="text" class="form-control" id="term" name="term" placeholder="Some keyword" />
    </div>
    <div class="col-sm-6">
      <label for="content" class="form-label">Campaign Content(Optional)</label>
      <input type="text" class="form-control" id="content" name="content" placeholder="To defferentiate from ads" />
    </div>
    <div class="col-sm-12" style="padding-top:10px; text-align: right;">
      <button class="btn btn-primary" type="button" id="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
        </svg>
      </button>
    </div>
  </div>
</section>

<script>
  $(function() {
    var fields = ['source', 'medium', 'name', 'term', 'content'];
    var optional = ['term', 'content'];
    var url = $('#url');
    $('#btn').on('click', function() {
      var href = $.trim(url.val());
      if (!href) {
        $.alert('URL is mandate!');
        return;
      }
      var params = {};
      $.each(fields, function(_, id) {
        var el = document.getElementById(id);
        var va = $.trim(el.value);
        if (!va)
          if (-1 === $.inArray(id, optional)) {
            $.alert(id + ' is mandate');
            return false;
          }
        if (va) params['utm_' + id] = va;
      });
      $.alert(href + '?' + $.param(params));
    });
  });
</script>