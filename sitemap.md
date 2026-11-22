---
layout: home
title: "Site Map & Technical Directory"
description: "A comprehensive HTML directory of technical guides, developer tools, service utilities, and category archives."
permalink: /sitemap/
---

<p class="mb-4 text-lg leading-relaxed text-slate-500 dark:text-slate-400">Complete index of technical resources, architectural blueprints, enterprise guides, and developer utilities.</p>
<p class="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
  <a href="{{ '/archive.html' | relative_url }}" class="hover:underline">Archive by year</a>
  <a href="{{ '/tags/' | relative_url }}" class="hover:underline">Browse by topic</a>
  <a href="{{ '/sitemap.xml' | relative_url }}" class="hover:underline">sitemap.xml</a>
</p>

<div class="grid gap-5 md:grid-cols-2">
  <div class="surface-card overflow-hidden">
    <h2 class="border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200">Main Navigation &amp; Utilities</h2>
    <ul class="space-y-2 p-5 text-sm">
      {% for menu in site.data.links %}
      {% if menu.nav %}
      <li><a href="{{ menu.url | relative_url }}" class="font-semibold text-slate-700 transition hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300">&rsaquo; {{ menu.name }}</a></li>
      {% endif %}
      {% endfor %}
    </ul>
  </div>

  <div class="surface-card overflow-hidden">
    <h2 class="border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200">Developer Services &amp; Tools</h2>
    <ul class="space-y-2 p-5 text-sm">
      {% for menu in site.data.services %}
      <li><a href="{{ menu.url | relative_url }}" class="font-semibold text-slate-700 transition hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300">&rsaquo; {{ menu.name }}</a></li>
      {% endfor %}
    </ul>
  </div>
</div>

<div class="surface-card mt-6 overflow-hidden">
  <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/50">
    <h2 class="text-xs font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-200">Technical Guides &amp; Articles</h2>
    <span class="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">{{ site.posts.size }}</span>
  </div>
  <ul class="divide-y divide-slate-100 dark:divide-slate-800">
    {% for post in site.posts %}
    <li class="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 text-sm transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <a href="{{ post.url | relative_url }}" class="font-semibold text-slate-700 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300">{{ post.title }}</a>
      <span class="shrink-0 text-xs text-slate-400 dark:text-slate-500">{{ post.date | date: '%b %d, %Y' }}</span>
    </li>
    {% endfor %}
  </ul>
</div>
