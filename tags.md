---
layout: home
title: "Topics & Tags"
description: "Browse all Tecqmate guides by topic: developer and DevOps tutorials, API security, cloud architecture, web tools, and luxury watch and handbag buying guides."
permalink: /tags/
---
{%- comment -%}
Tags like "DevOps" and "devops" are different keys in Jekyll but share one slug,
so they are merged by slug here. Topics are sorted by number of guides (largest first),
ties alphabetical. No post front matter needs to change.
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

<p class="mb-8 text-lg leading-relaxed text-slate-500 dark:text-slate-400">{{ sorted_rows.size }} topics across {{ site.posts.size }} guides. Largest topics first.</p>

<nav class="surface-card mb-12 flex flex-wrap gap-2 p-5" id="topics-index" aria-label="Topic index">
  {% for row in sorted_rows %}
    {%- assign parts = row | split: "~" -%}
    {%- assign slug = parts[1] -%}
    {%- assign name = parts[2] -%}
    {%- assign count = 0 -%}
    {%- for t in site.tags -%}
      {%- assign ts = t[0] | slugify -%}
      {%- if ts == slug -%}{%- assign count = count | plus: t[1].size -%}{%- endif -%}
    {%- endfor -%}
    <a href="#{{ slug }}" class="tag-pill">
      {{ name | replace: "-", " " }} <span class="text-brand-400">{{ count }}</span>
    </a>
  {% endfor %}
</nav>

{% for row in sorted_rows %}
  {%- assign parts = row | split: "~" -%}
  {%- assign slug = parts[1] -%}
  {%- assign name = parts[2] -%}
  {%- assign urls = "" %}
<section id="{{ slug }}" class="mb-12 scroll-mt-24">
  <h2 class="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-3 font-display text-2xl font-bold capitalize text-slate-900 dark:border-slate-800 dark:text-white">
    {{ name | replace: "-", " " }}
    <a href="#topics-index" class="text-xs font-semibold text-brand-700 no-underline hover:underline dark:text-brand-300" aria-label="Back to topics list">&uarr; Topics</a>
  </h2>
  <ul class="mt-5 space-y-4">
  {% for t in site.tags %}
    {%- assign ts = t[0] | slugify -%}
    {%- if ts == slug -%}
      {%- for post in t[1] -%}
        {%- assign umark = "|" | append: post.url | append: "|" -%}
        {%- unless urls contains umark -%}
          {%- assign urls = urls | append: umark %}
      <li class="group">
        <a href="{{ post.url | relative_url }}" class="text-base font-semibold text-slate-800 transition group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">{{ post.title }}</a>
        <p class="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ post.description | default: post.excerpt | strip_html | normalize_whitespace | strip | truncate: 120 }}</p>
      </li>
        {%- endunless -%}
      {%- endfor -%}
    {%- endif -%}
  {% endfor %}
  </ul>
</section>
{% endfor %}
