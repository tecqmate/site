---
layout: home
title: "Contact Us"
description: "Contact Tecqmate for questions, corrections, partnership enquiries, or help with a guide. Email, phone, and a message form."
permalink: /contact/
---
{%- assign partner_page = site.pages | where: "path", "partnerships.md" | first -%}
{%- assign disclaimer_page = site.pages | where: "path", "disclaimer.md" | first -%}

<p class="mb-8 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
  Have a question, a correction, or need help with one of our guides? Write to us using any option below.
</p>

<div class="grid gap-5 sm:grid-cols-2">
  <div class="surface-card p-6">
    <span class="grid size-10 place-items-center rounded-xl bg-brand-50 text-lg dark:bg-brand-950/50" aria-hidden="true">&#9993;</span>
    <h2 class="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">Direct Contact</h2>
    <p class="mt-3 text-sm text-slate-600 dark:text-slate-300"><strong class="text-slate-800 dark:text-white">Email:</strong> <a href="mailto:{{ site.email }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">{{ site.email }}</a></p>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300"><strong class="text-slate-800 dark:text-white">Phone:</strong> <a href="tel:{{ site.phone }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">{{ site.phone }}</a></p>
  </div>

  <div class="surface-card p-6">
    <span class="grid size-10 place-items-center rounded-xl bg-brand-50 text-lg dark:bg-brand-950/50" aria-hidden="true">&#128205;</span>
    <h2 class="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">Location &amp; Timing</h2>
    <p class="mt-3 text-sm text-slate-600 dark:text-slate-300"><strong class="text-slate-800 dark:text-white">Address:</strong> {{ site.location }}</p>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300"><strong class="text-slate-800 dark:text-white">Working Hours:</strong> {{ site.timings }}</p>
  </div>
</div>

<section class="mt-10">
  <h2 class="section-heading text-xl">What can we help with?</h2>
  <ul class="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
    <li><strong class="text-slate-800 dark:text-white">Questions about a guide:</strong> mention the guide's title or link so we can reply faster.</li>
    <li><strong class="text-slate-800 dark:text-white">Corrections and takedown requests:</strong> tell us the page and what should change. See also our <a href="{{ disclaimer_page.url | relative_url }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">disclaimer</a>.</li>
    {% if partner_page %}<li><strong class="text-slate-800 dark:text-white">Partnerships and sponsorships:</strong> see our <a href="{{ partner_page.url | relative_url }}" class="font-semibold text-brand-700 hover:underline dark:text-brand-300">partnerships page</a>.</li>{% endif %}
  </ul>
</section>

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
    "email": "{{ site.email }}",
    "telephone": "{{site.phone}}",
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
      "telephone": "{{site.phone}}",
      "email": "{{site.email}}",
      "areaServed": "IN"
    }
  }
}
</script>
