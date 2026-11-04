---
layout: home
title: "SMS Counter"
description: "A free service platform supported by your donations."
date: "March 14, 2022"
tags: ["sms", "count", "unicode"]
lang: en
---

<section class="mb-2">
  <p class="fs-5">SMS Counter and unicode detector.</p>
</section>

<section class="mb-2">
  <div class="row">
    <div class="col-12 mb-2">
      <textarea placeholder="Type or Paste here ..." id="text" class="form-control" rows="7" style="resize:none;" autofocus=""></textarea>
    </div>
  </div>
</section>

<section class="mb-2">
  <div id="out"></div>
</section>

<!-- Load sms-counter.js plugin script -->
<script defer="" src="{{ '/assets/js/sms-counter.js' | relative_url }}"></script>