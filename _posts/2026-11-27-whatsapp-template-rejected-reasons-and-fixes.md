---
layout: post
title: "WhatsApp Message Template Rejected? 10 Common Reasons and How to Fix Them"
description: "Why WhatsApp Business templates get rejected or reclassified, from category mismatches to parameter mistakes, and a practical checklist to get approved faster."
date: 2026-11-27
tags: ["whatsapp", "whatsapp-business-api", "message-templates", "telecom", "business-messaging"]
topic: telecom
read_mins: 7
audience: "Businesses, marketers and developers sending WhatsApp template messages to customers in India"
---

You wrote a template, submitted it, and it came back rejected, or approved under a different category than you chose. This is one of the most common frustrations when starting with the WhatsApp Business Platform.

Most rejections are not random. They follow a small set of patterns, and once you know them, they are easy to avoid. This guide lists the ten reasons we see most often and what to do about each.

## Quick answer

The most common cause is a **category mismatch**: the label you chose (Marketing, Utility or Authentication) does not match what the message actually says. After that come formatting mistakes with variables, missing sample values, requests for sensitive information and duplicate content. Fix the category and the variables first.

## First, understand how review works

Every template must be assigned one of three categories:

| Category | Purpose | Example |
| --- | --- | --- |
| Marketing | Promotion, offers, re-engagement | "Our sale starts tomorrow" |
| Utility | Transactional updates about something the customer already did | Order shipped, appointment reminder |
| Authentication | Verification codes only | "Your code is {{1}}" |

Meta checks the category you chose against the content. If they do not match, the template may be reclassified (usually to Marketing) or rejected with a reason such as an incorrect category. Meta's review rules and policies change, so always confirm details in the current official documentation.

## The 10 common reasons and the fixes

### 1. Category does not match the content

A promotional message submitted as Utility is the classic case. Words like "discount", "offer" or "limited time", or a button inviting a purchase, make a template look like marketing.

**Fix:** Choose the category by what the message does, not by what you would like it to cost. Keep Utility messages strictly about an existing transaction or request. After approval, check which category was actually assigned.

### 2. Marketing language inside a Utility template

"Your order has shipped. Shop more with 20% off!" mixes two purposes.

**Fix:** Split them. Send the shipping update as Utility and the offer separately as Marketing, with proper opt-in.

### 3. Authentication template with extra content

Authentication templates are the most restricted. They are meant for one-time codes, not for greetings or promotions.

**Fix:** Use the standard authentication format: the code, a short security note and, if needed, a copy-code button. Nothing else.

### 4. The template starts or ends with a variable

A body like "{{1}}, your order is ready" or "Your order number is {{1}}" can be rejected because the text begins or ends with a parameter.

**Fix:** Add fixed words before the first variable and after the last one.

### 5. Variables sit next to each other

Two placeholders back to back, such as "{{1}} {{2}}", give reviewers little context and are commonly flagged.

**Fix:** Put fixed text between variables, for example "Hello {{1}}, your appointment on {{2}} is confirmed."

### 6. Missing or poor sample values

When you submit a template with variables, you must give example values. A missing example, or one such as "test", often leads to rejection.

**Fix:** Provide realistic samples, such as a plausible first name, date or order number. Avoid real customer data.

### 7. Invalid variable names or formatting

Named variables have strict rules, for example lowercase letters and underscores only. Broken placeholders, stray brackets and unusual formatting cause errors.

**Fix:** Follow the exact format in the current documentation, and preview the template before you submit it.

### 8. Asking for sensitive personal information

Templates that ask customers for sensitive identifiers, such as full payment card numbers or bank account numbers, violate WhatsApp's business policy.

**Fix:** Never request these in a message. Send people to a secure page or app flow instead.

### 9. Duplicate or near-duplicate templates

Submitting a template with the same wording as one that already exists can lead to a duplicate rejection. Authentication templates are treated differently.

**Fix:** Reuse an existing approved template when the wording is the same. If you need a variant, change the content in a meaningful way.

### 10. Policy and content issues

Abusive or threatening wording, misleading claims, prohibited products or services, and content that breaks the platform's commerce and business policies will all be rejected.

**Fix:** Read the current WhatsApp Business and Commerce policies, and review your message as a stranger would. Avoid pressure tactics and unclear claims.

## Practical tips from the review process

- **Complete your business profile** before you submit. Some providers report that an incomplete profile (website, description, category) can increase rejections, so it is worth filling in.
- **Edit and resubmit** a rejected template instead of creating several copies. Some platforms also limit reuse of a template name for a period after rejection.
- **Check the reason** shown with the rejection. Your messaging provider's dashboard or the template status notification usually gives a rejection reason code.
- **Request a review** if you believe the decision was wrong, using the appeal option available in your account.
- **Watch for patterns.** Repeatedly mislabelling templates can create account-level problems, such as lower sending limits or slower approvals.

## Template quality checklist

- ✅ The category matches the real purpose of the message
- ✅ No promotional wording in Utility or Authentication templates
- ✅ The template does not start or end with a variable
- ✅ No two variables are placed next to each other
- ✅ Every variable has a realistic sample value
- ✅ Variable names follow the required format
- ✅ No request for sensitive personal or financial information
- ✅ The wording is not a copy of an existing template
- ✅ The business profile is complete
- ✅ You have opt-in from recipients for the type of message you send

## Common mistakes to avoid

- **Trying to disguise marketing as Utility** to get a different price. This tends to backfire.
- **Submitting many versions at once** instead of fixing the cause of the first rejection.
- **Skipping opt-in.** Approval of a template does not mean you have permission to message everyone.
- **Using one template for several different purposes.** Narrow, specific templates are easier to approve and to maintain.

## FAQ

**Why was my Utility template approved as Marketing?**
Meta may reclassify a template when the content looks promotional. Check the category after approval, and rewrite the message if you need it to stay Utility.

**Can I change the category of an approved template?**
Usually you create a new template or request a review of the category decision. The options depend on your account and provider.

**How long does template approval take?**
It varies. Many templates are reviewed quickly, but some take longer. Plan your launch with a buffer.

**Do I need templates for every WhatsApp message?**
Not always. Templates are generally needed to start a conversation or message outside the customer service window. The rules and pricing change, so check the current documentation. Our guide on [WhatsApp Business API in India]({{ '/2026/11/18/whatsapp-business-api-india-how-to-get-started/' | relative_url }}) covers the basics.

**Is WhatsApp the right channel for every message?**
No. See our comparison of [SMS, WhatsApp and RCS for business in India]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}).


*This guide is for general information. Meta's policies, categories and review behaviour change often, so confirm the current rules in the official documentation before you rely on them.*
