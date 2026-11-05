---
layout: home
title: "Topics & Tags"
permalink: /tags/
---

<div class="container my-4">
  <h1 class="mb-4">Explore by Topics</h1>

  <div class="list-group mb-5">
    {% for tag in site.tags %}
      <a href="#{{ tag[0] | slugify }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <span class="text-capitalize fw-bold">{{ tag[0] | replace: "-", " " }}</span>
        <span class="badge bg-secondary rounded-pill">{{ tag[1].size }}</span>
      </a>
    {% endfor %}
  </div>

  <hr class="my-5">

  {% for tag in site.tags %}
    <div id="{{ tag[0] | slugify }}" class="mb-5">
      <h2 class="h3 text-capitalize text-dark border-bottom pb-2 mb-3">
        Tag: {{ tag[0] | replace: "-", " " }}
      </h2>
      <ul class="list-unstyled">
        {% for post in tag[1] %}
          <li class="mb-3">
            <a href="{{ post.url | relative_url }}" class="fw-semibold fs-5 text-decoration-none">{{ post.title }}</a>
            <p class="text-muted small mb-0">{{ post.description | default: post.excerpt | strip_html | truncate: 120 }}</p>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>