---
layout: default
title: "Technical Guides & Blog"
description: "Explore our collection of educational guides on import-export, telecom, e-commerce, and software engineering."
permalink: /blog
---

<div class="row mb-4">
  <div class="col-12">
    <p class="lead">Independent educational resources and technical overviews covering enterprise solutions and industry frameworks.</p>
  </div>
</div>

<div class="row">
  <div class="col-12">
    {% for post in site.posts %}
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <h2 class="card-title h4">
            <a href="{{ post.url | relative_url }}" class="text-decoration-none">{{ post.title }}</a>
          </h2>
          <div class="text-muted fst-italic small mb-2">Published on {{ post.date | date: '%B %d, %Y' }}</div>
          
          {% if post.tags %}
            <div class="mb-2">
              {% for tag in post.tags %}
                <span class="badge bg-secondary">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}

          <p class="card-text">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
          <a href="{{ post.url | relative_url }}" class="btn btn-outline-primary btn-sm">Read Article &rarr;</a>
        </div>
      </div>
    {% endfor %}
  </div>
</div>