---
layout: home
title: "Technical Guides & Blog"
description: "Explore independent educational guides on import-export, telecom, e-commerce, and software engineering."
permalink: /blog
---

<div class="row mb-4">
  <div class="col-12">
    <p class="lead">Independent educational resources and technical overviews covering enterprise solutions and industry frameworks.</p>
  </div>
</div>

<div class="row">
  <!-- Blog Posts Column -->
  <div class="col-lg-8">
    {% for post in site.posts %}
      <div class="card mb-4 shadow-sm">
        {% if post.image %}
          <img src="{{ post.image | relative_url }}" class="card-img-top" alt="{{ post.title }}" style="max-height: 240px; object-fit: cover;">
        {% endif %}
        <div class="card-body">
          <h2 class="card-title h4">
            <a href="{{ post.url | relative_url }}" class="text-decoration-none">{{ post.title }}</a>
          </h2>
          <div class="text-muted fst-italic small mb-2">Published on {{ post.date | date: '%B %d, %Y' }}</div>
          
          {% if post.categories %}
            <div class="mb-2">
              {% for cat in post.categories %}
                <span class="badge bg-secondary">{{ cat }}</span>
              {% endfor %}
            </div>
          {% endif %}

          <!-- Clean Excerpt (Editorial note is excluded automatically) -->
          <p class="card-text">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
          <a href="{{ post.url | relative_url }}" class="btn btn-outline-primary btn-sm">Read Article &rarr;</a>
        </div>
      </div>
    {% endfor %}
  </div>

  <!-- Category Filter Sidebar -->
  <div class="col-lg-4">
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-dark text-white">Categories</div>
      <div class="card-body">
        <ul class="list-unstyled mb-0">
          {% assign all_categories = site.posts | map: "categories" | compact | uniq %}
          {% for cat in all_categories %}
            <li class="mb-2">
              <span class="text-secondary">&rsaquo;</span> <strong>{{ cat }}</strong>
            </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
</div>