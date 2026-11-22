---
layout: post
title: "WhatsApp Business API in India"
h1: "WhatsApp Business API in India: How to Get Started, Step by Step"
description: "Step-by-step guide to getting the WhatsApp Business API in India: what you need, business verification, display name, number setup, templates, and..."
date: 2026-11-18 09:00:00 +0530
tags: ["whatsapp", "whatsapp-business-api", "cpaas", "messaging", "telecom", "india"]
topic: telecom
read_mins: 6
audience: "Businesses and developers who want to send WhatsApp messages at scale from India"
image: "/assets/images/topics/telecom-card.png"
---

The WhatsApp Business API (officially the WhatsApp Business Platform) lets a business send notifications, support replies, and campaigns at scale, with templates, automation, and integrations. It is different from the free WhatsApp Business app on your phone. This guide walks through how to get started in India, in the order you will actually do things.

*Rules, limits, and fees change often. Confirm current details in Meta's documentation or with your provider. This is general information.*

## What you need before you start

* **A Meta business portfolio** (previously called Business Manager) with admin access.
* **A business phone number** that you own and that can receive an SMS or voice call for verification. Meta has said the number must be dedicated to your WhatsApp Business account. If the number is already on the WhatsApp Business app, you may be offered a coexistence option, depending on Meta's current eligibility rules.
* **A display name** that matches your real business name, not a keyword or a sales slogan.
* **A business website or other proof** that Meta can use to confirm you are a real business.
* **Business documents** for verification, such as registration or tax documents that match your business name.

## Step 1: Choose how you will get access

Most businesses connect through a **business solution provider (BSP)**, an approved Meta partner that handles the technical connection, onboarding, and support. You can also build directly on Meta's Cloud API if you have developers. Direct access means no platform subscription, but you must build everything a BSP would normally provide, such as inboxes, template tools, and reporting.

## Step 2: Prepare your Meta business portfolio

Create or choose the portfolio that will own the account. Use your correct legal business name and details so they match the documents you will submit later.

## Step 3: Decide which phone number to use

* **A new number** that has never been used on WhatsApp is the simplest route.
* **An existing WhatsApp Business app number** can sometimes be connected through coexistence, so you can use both the app and the API on the same number.
* **A personal WhatsApp number** needs to be removed from the personal app before it can be used with the API, so avoid this if you still need it for personal chats.

## Step 4: Complete the signup flow

Your provider or Meta's embedded signup will guide you through logging in with your Meta credentials, selecting your portfolio, entering your business details and number, and verifying the number with a code.

## Step 5: Submit your display name

The display name is what customers see. Make sure it clearly corresponds to your business name and website. A display name that does not match is one of the most common reasons for delays and rejections.

## Step 6: Complete business verification

You can start testing without verification, but verification matters because it:

* Confirms your business legally exists.
* Raises your messaging limits and lets you connect more phone numbers.
* Helps your verified business name appear to customers.
* Is needed for some features, such as eligibility for an Official Business Account (blue tick).

Verification usually means uploading documents and sometimes completing a short confirmation, and it can take a few days.

## Step 7: Create and submit message templates

Business-initiated messages must use a template that Meta approves. Pick the right category:

* **Utility:** order updates, appointment reminders, account alerts.
* **Authentication:** OTPs and login codes.
* **Marketing:** promotions, offers, announcements.

Write clear, specific text, use variables for the parts that change, and do not label marketing messages as utility. Templates in the wrong category can be rejected or recategorised, which changes your cost.

## Step 8: Collect opt-ins

Customers should agree to receive messages from you on WhatsApp before you contact them first. Collect opt-in at checkout, on a form, or through a click-to-WhatsApp ad, and keep a record of when and how each person agreed.

## Step 9: Send a test, then scale slowly

Send a few test messages to your own team. Then start with small batches and watch your quality rating. As you send high-quality messages that customers do not block or report, Meta raises your limits. Since October 2025, messaging limits are applied across the whole business portfolio instead of per phone number, so adding a second number does not double your capacity. Starting limits for business-initiated messages are commonly reported as a few hundred per day for unverified accounts, and higher once you are verified, but these numbers change, so check current rules.

## Costs in short

Meta charges per delivered template message based on its category and the recipient's country, and your provider may add a platform fee. See our [comparison of SMS, WhatsApp, and RCS]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}) for current India rates and how to calculate your budget.

## Typical timeline

| Stage | Usual time |
|---|---|
| Account and number setup | Same day |
| Display name review | A few days |
| Business verification | A few days to about a week |
| Template approval | Minutes to a day or two |

These are rough figures, not guarantees.

## Common mistakes

1. **Display name does not match the business name or website.**
2. **Using the wrong template category,** especially marketing content in a utility template.
3. **No opt-in records.**
4. **Sending too much, too fast,** which hurts quality rating and limits.
5. **Using a number you still need on personal WhatsApp** without planning the move.
6. **Not budgeting for Meta fees and provider fees together.**

## Quick checklist

* Meta business portfolio with admin access.
* Dedicated business phone number.
* Display name that matches your business.
* Documents ready for verification.
* Access route chosen (BSP or direct).
* Templates written and categorised correctly.
* Opt-in process and records in place.
* Test sent, then scale slowly.

## FAQ

**Do I need a developer?**
Not always. Many providers offer no-code dashboards. A developer helps if you want deep integration with your own systems.

**Can I keep using the WhatsApp Business app?**
Possibly, through coexistence, if you are eligible. Check Meta's current rules.

**Is the API free?**
There is no sign-up fee from Meta, but you pay per delivered template message, and a provider may charge for its platform.
