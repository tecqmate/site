---
layout: home
title: "Topics & Tags"
description: "Browse all Tecqmate guides by topic: developer and DevOps tutorials, API security, cloud architecture, web tools, and luxury watch and handbag buying guides."
permalink: /tags/
---
{%- comment -%}
  Why this is built differently from a plain "for tag in site.tags" loop:
  - Tags like "DevOps" and "devops" are different keys in Jekyll but share one slug,
    which produced duplicate ids and duplicate entries. Here tags are merged by slug.
  - Topics are sorted by number of guides (largest first), ties alphabetical.
  No post front matter needs to change.
{%- endcomment -%}
{%- assign seen = "" -%}
{%- assign rows = "" -%}
{%- for tag in site.tags -%}
  {%- assign slug = tag[0] | slugify -%}
  {%- assign marker = "|" | append: slug | append: "|" -%}
  {%- unless seen contains marker -%}
    {%- assign seen = seen | append: marker -%}
    {%- assign total = 0 -%}
    {%- for t2 in site.tags -%}
      {%- assign s2 = t2[0] | slugify -%}
      {%- if s2 == slug -%}
        {%- assign total = total | plus: t2[1].size -%}
      {%- endif -%}
    {%- endfor -%}
    {%- assign inverse = 999999 | minus: total | prepend: "000000" | slice: -6, 6 -%}
    {%- assign rows = rows | append: inverse | append: "~" | append: slug | append: "~" | append: tag[0] | append: "," -%}
  {%- endunless -%}
{%- endfor -%}
{%- assign sorted_rows = rows | split: "," | sort -%}

<div class="tags-page">

<p class="lead">{{ sorted_rows.size }} topics across {{ site.posts.size }} guides. Largest topics first.</p>

<div class="list-group mb-5" id="topics-index">
{% for row in sorted_rows %}
  {%- assign parts = row | split: "~" -%}
  {%- assign slug = parts[1] -%}
  {%- assign name = parts[2] -%}
  {%- assign count = 0 -%}
  {%- for t in site.tags -%}
    {%- assign ts = t[0] | slugify -%}
    {%- if ts == slug -%}{%- assign count = count | plus: t[1].size -%}{%- endif -%}
  {%- endfor %}
  <a href="#{{ slug }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
    <span class="text-capitalize fw-bold">{{ name | replace: "-", " " }}</span>
    <span class="badge bg-secondary rounded-pill">{{ count }}</span>
  </a>
{% endfor %}
</div>

<hr class="my-5">

{% for row in sorted_rows %}
  {%- assign parts = row | split: "~" -%}
  {%- assign slug = parts[1] -%}
  {%- assign name = parts[2] -%}
  {%- assign urls = "" %}
<section id="{{ slug }}" class="mb-5">
  <h2 class="h3 text-capitalize text-dark border-bottom pb-2 mb-3">
    {{ name | replace: "-", " " }}
    <a href="#topics-index" class="small text-decoration-none float-end" aria-label="Back to topics list">&uarr; Topics</a>
  </h2>
  <ul class="list-unstyled">
  {% for t in site.tags %}
    {%- assign ts = t[0] | slugify -%}
    {%- if ts == slug -%}
      {%- for post in t[1] -%}
        {%- assign umark = "|" | append: post.url | append: "|" -%}
        {%- unless urls contains umark -%}
          {%- assign urls = urls | append: umark %}
    <li class="mb-3">
      <a href="{{ post.url | relative_url }}" class="fw-semibold fs-5 text-decoration-none">{{ post.title }}</a>
      <p class="text-muted small mb-0">{{ post.description | default: post.excerpt | strip_html | normalize_whitespace | strip | truncate: 120 }}</p>
    </li>
        {%- endunless -%}
      {%- endfor -%}
    {%- endif -%}
  {% endfor %}
  </ul>
</section>
{% endfor %}

</div>