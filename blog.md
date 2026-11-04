---
layout: home
title: "Technical Guides & Blog"
description: "Explore independent educational guides on import-export, telecom, e-commerce, and software engineering."
permalink: /blog/
---

<div class="row mb-4">
  <div class="col-12">
    <p class="lead">Independent educational resources and technical overviews covering enterprise solutions and industry frameworks.</p>
  </div>
</div>

<div class="row">
  <!-- Blog Posts Column -->
  <div class="col-lg-12">
    {% assign recent_posts = site.posts | reverse | slice: 0, 3 %}
    {% if recent_posts.size > 0 %}
      {% for post in recent_posts %}
        <div class="card mb-4 shadow-sm">
          {% if post.image %}
            <img src="{{ post.image | relative_url }}" class="card-img-top" alt="{{ post.title }}" style="max-height: 240px; object-fit: cover;">
          {% endif %}
          <div class="card-body">
            <h2 class="card-title h4 bg-dark text-white">
              <a href="{{ post.url | relative_url }}" class="text-decoration-none">{{ post.title }}</a>
            </h2>
            <div class="text-muted fst-italic small mb-2">Published on {{ post.date | date: '%B %d, %Y' }}</div>

            <p class="card-text">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            <a href="{{ post.url | relative_url }}" class="btn btn-outline-primary btn-sm">Read Article &rarr;</a>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <p class="text-muted">No blog posts found.</p>
    {% endif %}
  </div>
</div>