---
layout: home
title: "7 Recent Guides & Blog"
description: "Explore independent educational guides on import-export, telecom, e-commerce, and software engineering."
permalink: /blog/
---

{% include editorial-note.html %}

<p class="mb-8 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
  Recent guides, newest first. Browse the <a href="{{ '/archive.html' | relative_url }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">full archive</a> or <a href="{{ '/tags/' | relative_url }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">explore by topic</a>.
</p>

{% assign recent_posts = site.posts | slice: 0, 7 %}
{% if recent_posts.size > 0 %}
  <div class="grid gap-6">
    {% for post in recent_posts %}
    <article class="surface-card group grid gap-5 overflow-hidden p-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:p-6">
      <div class="min-w-0">
        <p class="meta-text">{{ post.date | date: '%B %d, %Y' }}{% if post.tags.first %} &middot; {{ post.tags.first }}{% endif %}</p>
        <h2 class="mt-2 font-display text-xl font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
          <a href="{{ post.url | relative_url }}" class="no-underline">{{ post.title }}</a>
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        <a href="{{ post.url | relative_url }}" class="mt-4 inline-flex text-sm font-bold text-brand-700 hover:underline dark:text-brand-300">Read guide &rarr;</a>
      </div>
      {% if post.image %}
      <a href="{{ post.url | relative_url }}" class="hidden h-36 overflow-hidden rounded-xl bg-slate-100 sm:block dark:bg-slate-800">
        <img src="{{ post.image | relative_url }}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" alt="{{ post.title }}">
      </a>
      {% else %}
      <div class="hidden items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-violet-100 text-4xl sm:flex dark:from-brand-950/40 dark:to-violet-950/30" aria-hidden="true">&#128214;</div>
      {% endif %}
    </article>
    {% endfor %}
  </div>
{% else %}
  <p class="text-slate-500 dark:text-slate-400">No blog posts found.</p>
{% endif %}
