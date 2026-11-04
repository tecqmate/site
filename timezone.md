---
layout: home
title: "World Time Zones"
description: "A free service platform supported by your donations."
date: "August 21, 2021"
tags: ["world", "time zone"]
lang: en
---

<section class="mb-3 col-sm-12 col-md-4">
  <select id="zone" class="custom-select col-sm-12">
    <option value=""> -- Zone -- </option>
  </select>
</section>
<section class="mb-3 col-sm-12 col-md-8">
  <pre><code id="time"></code></pre>
</section>

<!-- Select2 CSS and JS Assets -->
<link href="{{ '/assets/css/select2.min.css' | relative_url }}" rel="stylesheet" />
<script src="{{ '/assets/js/select2.min.js' | relative_url }}"></script>

<script>
  $(function() {
    var baseUrl = 'https://worldtimeapi.org/api/timezone';
    $.getJSON(baseUrl, function(list) {
      var dom = $(document.createDocumentFragment());
      while (list.length) {
        dom.append(new Option(list.shift()));
      }
      $('#zone').append(dom).select2().on('change', function(e) {
        var zone = this.value;
        $('#time').text('Kindly select time zone to view more details');
        if (zone) {
          $.getJSON(baseUrl + '/' + zone, function(data) {
            $('#time').text(JSON.stringify(data, 0, 4));
          });
        }
      }).trigger('change');
    });
  });
</script>