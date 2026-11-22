---
layout: home
title: "About Tecqmate"
description: "Tecqmate publishes step-by-step how-to guides for developers and buyers. Learn what we cover, how we make money, and how we handle corrections."
permalink: /about/
---
{%- assign contact_page = site.pages | where: "path", "contact.md" | first -%}
{%- assign disclaimer_page = site.pages | where: "path", "disclaimer.md" | first -%}
{%- assign partner_page = site.pages | where: "path", "partnerships.md" | first -%}
{%- assign privacy_page = site.pages | where: "path", "privacy.md" | first -%}

<p class="lead">Tecqmate publishes practical, step-by-step guides that help you solve a problem or make a safer buying decision.</p>

### What we publish
Each guide starts with the problem, walks through the solution or a checklist, and points out common mistakes. We cover:

{% if site.data.topics %}
<ul>
{% for t in site.data.topics %}{% if t.enabled %}
  <li><strong>{{ t.name }}:</strong> {{ t.short }}</li>
{% endif %}{% endfor %}
</ul>
{% endif %}

We also offer a small set of free web tools. New topics are added over time.

### Who is behind the site
Tecqmate is an independent publication based in Mira Road, Thane, Maharashtra, India.
<!-- Add a short, true author bio here (who writes the guides, relevant experience). It is the single biggest trust signal on this page. -->

### How we make money
We want you to know how this site is funded:
* **Affiliate links.** Some links are affiliate links. If you buy through them we may earn a commission at no extra cost to you.
* **Sponsored content.** Some guides are sponsored. They are labeled "Sponsored".
* **Referral fees.** If you send us a requirement through a form and agree to share it, we may pass your enquiry to relevant providers and receive a fee.

Payment never decides what we say about a product's risks, limits, or authenticity. See our {% if partner_page %}[partnerships page]({{ partner_page.url | relative_url }}){% else %}partnerships page{% endif %} for our sponsorship standards.

### Our editorial approach
* Guides are for general education. They are not professional, legal, financial, or investment advice, and we are not an authentication or appraisal service. Read our {% if disclaimer_page %}[disclaimer]({{ disclaimer_page.url | relative_url }}){% else %}disclaimer{% endif %}.
* We try to keep guides accurate and current. Prices, laws, software versions, and market conditions change, so check important details yourself.
* We do not publish a company's direct contact details inside our guides. If you need help finding a provider, send us your requirement and we will respond.

### Corrections
If you spot an error or outdated information, tell us the page and what should change. We review reports and update the guide when we confirm a problem. Write to us through the {% if contact_page %}[contact page]({{ contact_page.url | relative_url }}){% else %}contact page{% endif %}.

### Your privacy
We explain what we collect and why in our {% if privacy_page %}[privacy policy]({{ privacy_page.url | relative_url }}){% else %}privacy policy{% endif %}.