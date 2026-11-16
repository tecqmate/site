---
layout: home
title: "Contact Us"
description: "Contact Tecqmate for questions, corrections, partnership enquiries, or help with a guide. Email, phone, and a message form."
permalink: /contact/
---
{%- assign partner_page = site.pages | where: "path", "partnerships.md" | first -%}
{%- assign disclaimer_page = site.pages | where: "path", "disclaimer.md" | first -%}

<div class="row mb-4">
  <div class="col-12">
    <p class="lead">Have a question, a correction, or need help with one of our guides? Write to us using any option below.</p>
  </div>
</div>

<div class="row">
  <!-- Contact Info Card -->
  <div class="col-md-6 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h2 class="card-title h5 text-primary mb-3">Direct Contact</h2>
        <p class="card-text mb-2"><strong>Email:</strong> <a href="mailto:tecqmat@gmail.com">tecqmat@gmail.com</a></p>
        <p class="card-text mb-0"><strong>Phone:</strong> <a href="tel:+917304164348">+91 7304164348</a></p>
      </div>
    </div>
  </div>

  <!-- Location & Hours Card -->
  <div class="col-md-6 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h2 class="card-title h5 text-primary mb-3">Location &amp; Timing</h2>
        <p class="card-text mb-2"><strong>Address:</strong> Mira Road, Thane, Maharashtra, 401107, India</p>
        <p class="card-text mb-0"><strong>Working Hours:</strong> Monday to Sunday, 10:00 AM to 07:00 PM IST</p>
      </div>
    </div>
  </div>
</div>

<div class="row mb-4">
  <div class="col-12">
    <h2 class="h5 text-primary mb-3">What can we help with?</h2>
    <ul>
      <li><strong>Questions about a guide:</strong> mention the guide's title or link so we can reply faster.</li>
      <li><strong>Corrections and takedown requests:</strong> tell us the page and what should change. See also our <a href="{{ disclaimer_page.url | relative_url }}">disclaimer</a>.</li>
      {% if partner_page %}<li><strong>Partnerships and sponsorships:</strong> see our <a href="{{ partner_page.url | relative_url }}">partnerships page</a>.</li>{% endif %}
    </ul>
  </div>
</div>

{% include lead-form.html topic="general" general=true title="Send us a message" text="Tell us how we can help and we will reply by email." %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Tecqmate",
  "url": "{{ page.url | absolute_url }}",
  "mainEntity": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "url": "{{ '/' | absolute_url }}",
    "email": "tecqmat@gmail.com",
    "telephone": "+917304164348",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mira Road, Thane",
      "addressRegion": "Maharashtra",
      "postalCode": "401107",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": "+917304164348",
      "email": "tecqmat@gmail.com",
      "areaServed": "IN"
    }
  }
}
</script>