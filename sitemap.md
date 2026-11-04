---
layout: home
title: "Site Map & Technical Directory"
description: "A comprehensive HTML directory of technical guides, developer tools, service utilities, and category archives."
permalink: /sitemap/
---

<div class="row mb-4">
  <div class="col-12">
    <p class="lead">Complete index of technical resources, architectural blueprints, enterprise guides, and developer utilities.</p>
  </div>
</div>

<div class="row">
  <!-- Core Site Pages & Utilities -->
  <div class="col-md-6 mb-4">
    <div class="card h-100 shadow-sm border-0">
      <div class="card-header bg-dark text-white fw-bold">Main Navigation &amp; Utilities</div>
      <div class="card-body">
        <ul class="list-unstyled mb-0">
          {% for menu in site.data.menus %}
            <li class="mb-2">&rsaquo; 
              <a 
              href="{{ menu.url | relative_url }}" 
              class="text-decoration-none fw-bold">{{menu.name}}</a>
            </li>
            
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>

  <!-- Developer Web Tools Directory -->
  <div class="col-md-6 mb-4">
    <div class="card h-100 shadow-sm border-0">
      <div class="card-header bg-dark text-white fw-bold">Developer Services &amp; Tools</div>
      <div class="card-body">
        <div class="row">
          <div class="card-body">
            <ul class="list-unstyled mb-0">
            {% for menu in site.data.services %}
                <li class="mb-2">&rsaquo; <a href="{{ menu.url | relative_url }}" class="text-decoration-none fw-bold">{{menu.name}}</a></li>
                {% endfor %}
            </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- All Technical Articles (Sorted Latest First) -->
<div class="row mt-2">
  <div class="col-12">
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <span class="fw-bold">Technical Guides & Articles</span>
        <span class="badge bg-secondary">{{ site.posts.size }} Articles</span>
      </div>
      <div class="card-body">
        {% assign sorted_posts = site.posts | reverse %}
        {% if sorted_posts.size > 0 %}
          <div class="list-group list-group-flush">
            {% for post in sorted_posts %}
              <div class="list-group-item px-0 py-3 d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="mb-1">
                    <a href="{{ post.url | relative_url }}" class="text-decoration-none text-dark fw-bold">
                      {{ post.title }}
                    </a>
                  </h6>
                </div>
                <small class="text-muted text-nowrap ms-3">{{ post.date | date: '%b %d, %Y' }}</small>
              </div>
            {% endfor %}
          </div>
        {% else %}
          <p class="text-muted mb-0">No published articles found.</p>
        {% endif %}
      </div>
    </div>
  </div>
</div>