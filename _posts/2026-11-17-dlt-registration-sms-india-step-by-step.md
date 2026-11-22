---
layout: post
title: "DLT Registration for SMS in India"
h1: "DLT Registration for SMS in India: Step-by-Step Guide (2026)"
description: "How to register on a DLT platform to send business SMS in India: entity, header, templates, URL whitelisting, chain binding, timelines, and common rejections."
date: 2026-11-17 09:00:00 +0530
tags: ["cpaas", "messaging", "sms", "dlt", "trai", "telecom", "compliance"]
topic: telecom
read_mins: 7
audience: "Businesses and developers setting up commercial SMS in India"
last_reviewed: 2026-11-23
sources:
  - label: "TRAI DLT overview"
    url: "https://trai.gov.in/sites/default/files/2025-01/DLT_UCC_28012022.pdf"
    note: "Official explainer on consent, headers and templates"
  - label: "TRAI press release"
    url: "https://trai.gov.in/sites/default/files/2024-08/PR_No.12of2023.pdf"
    note: "Enforcement and misuse of headers/templates"
image: "/assets/images/topics/telecom-card.png"
---

If your business sends OTPs, alerts, or offers by SMS in India, your messages must pass through **DLT (Distributed Ledger Technology)**, the registration system run by telecom operators under TRAI rules. Skip it and your messages are blocked before they reach customers. This guide walks through each step in order, with realistic timelines and the mistakes that cause rejections.

*Rules and fees were checked on November 17, 2026. They change, so confirm details on the DLT portal you use. This is general information, not legal advice.*

## What DLT is and who needs it

TRAI's Telecom Commercial Communications Customer Preference Regulations (TCCCPR, 2018) require every commercial SMS to match three registered items:

* **Your business**, registered as a *Principal Entity (PE)*.
* **Your sender ID**, registered as a *Header*.
* **Your message text**, registered as a *Content Template*.

Anything that does not match is blocked at the operator. The rule applies to the destination, so a foreign company sending SMS to Indian numbers is also covered. Foreign companies generally cannot register themselves and usually send through a provider that is already set up on DLT.

## Before you start: get these ready

* Company PAN, plus business registration and GST details.
* A signed authorization letter on company letterhead naming the person who will register.
* The sender ID you want, and a list of every message type you plan to send, written out as text.
* Your SMS provider's details, because you will link them to your account in step 5.

Newer registrations may also need extra identity verification, so keep the authorized person's ID and phone handy.

## Step 1: Register your business (Principal Entity)

Register on **any one** operator's DLT portal. The operators are Jio, Airtel, Vi, BSNL, and MTNL. Your registration is recognised across operators, so you do not need to register more than once.

* Fill in company name, PAN, GST, address, and the authorized person's details, and upload documents.
* Approval commonly takes a few working days. You then receive a unique **Entity ID**.
* The portal fee is commonly reported at around ₹5,000 plus GST for entities. Check the portal for the current fee before paying.

## Step 2: Register your header (sender ID)

The header is the name customers see.

* Alphanumeric headers are exactly **six characters**, with no spaces or special characters.
* Choose a header that clearly relates to your business name. Generic names are often rejected.
* Each header belongs to one category, such as promotional, service, transactional, or government. Since the February 2025 amendment, headers carry suffixes that show the category (-P, -S, -T, -G).
* Header approval usually takes a few working days, and header registration is generally free on the portals.

## Step 3: Register your content templates

Every message type needs an approved template. Write it exactly as you will send it, and mark the parts that change with `{#var#}`:

* OTP: `Your OTP is {#var#}. Valid for 10 minutes. Do not share.`
* Order update: `Your order {#var#} has been shipped. Track: {#var#}`

Rules to follow:

* Pick the right category. Promotional text in a transactional template will be rejected.
* Since late 2024, each variable must be tagged for its purpose and format (for example number, alphanumeric, or URL).
* Keep the wording specific and clear. Vague or spam-like text is rejected.
* Approval takes anywhere from a day to about a week, depending on the portal.

## Step 4: Whitelist your links and numbers

TRAI's August 20, 2024 directive made it mandatory to whitelist URLs, APK links, OTT links, and callback numbers that appear in messages. A message with a link or number that is not whitelisted is blocked.

* On the portal, add each URL or number under the CTA / URL whitelisting option.
* If you use a URL shortener, whitelist the **short link too**, not just the full URL.
* Whitelist before you submit templates that use those links.

## Step 5: Bind your provider (chain binding)

Your SMS provider is called a *Telemarketer (TM)* on the portal. You must link your Principal Entity to your provider so every message can be traced from you to the operator. TRAI's traceability rules, enforced more strictly from early 2026, require the full chain to be declared. If several providers are involved, declare each of them.

## Step 6: Test before you scale

* Send test messages for each template and check that they arrive.
* Check that the header, category, and template ID in your provider's panel match what you registered.
* Test any links to confirm they open and are whitelisted.

## Timeline and cost at a glance

| Step | Usual time | Usual cost |
|---|---|---|
| Entity registration | A few days to about a week | Around ₹5,000 plus GST on many portals |
| Header registration | 1 to 3 working days | Generally free |
| Templates | 1 day to about a week | Generally free |
| URL whitelisting | Same day to a few days | Generally free |
| Chain binding | Same day | Generally free |

These are typical figures, not guarantees. Always check your chosen portal.

## Why DLT applications get rejected

* The header does not match or relate to your registered business name.
* The template category is wrong for the content.
* Variables are missing `{#var#}` or are tagged incorrectly.
* Links or numbers are not whitelisted, or a shortened link was missed.
* The wording looks like spam or is misleading.
* Documents are unclear or the authorized person does not match.

## What changed recently

* **August to October 2024:** mandatory whitelisting of URLs, APKs, OTT links, and callback numbers, plus variable tagging in templates.
* **February 2025:** TCCCPR amendments added header suffixes for categories, stricter complaint handling, and tighter traceability requirements.
* **Early 2026:** the traceability framework came into full enforcement, with penalties for routing non-compliant traffic.

## FAQ

**Is DLT required for OTP messages?**
Yes. OTPs are commercial SMS too and must use a registered header and template.

**Can I send promotional SMS to anyone?**
No. Promotional SMS must not go to numbers that are fully on the DND list, and you need valid consent. Keep proof of consent.

**Do I need DLT for WhatsApp or RCS?**
DLT applies to SMS. WhatsApp has its own template approval and opt-in rules, so see our comparison of [SMS, WhatsApp, and RCS]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}).

**How long does the whole process take?**
Often one to two weeks if your documents are complete, and longer if anything is rejected and resubmitted.
