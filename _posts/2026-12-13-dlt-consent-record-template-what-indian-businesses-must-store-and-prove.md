---
layout: post
title: "DLT Consent Record Template: What Indian Businesses Should Store and Be Able to Prove"
description: "A practical template for recording customer consent for SMS and voice in India. Learn what the DLT consent register holds, what you should keep yourself, a ready record format, sample consent wording and an audit checklist."
date: 2026-12-13
tags: ["dlt", "consent", "trai", "tcccpr", "sms", "compliance", "telecom", "business-messaging"]
topic: telecom
read_mins: 8
audience: "Businesses, compliance and marketing teams in India that send promotional or service-explicit SMS and need a clean consent record"
---

When a customer complains, a telecom provider asks questions or a regulator reviews your sending, one question decides how it goes: **can you prove the customer agreed?** A phone number in a spreadsheet is not proof. A dated, verifiable record is.

This guide gives you a practical consent record template, explains how it fits with the DLT consent register, and lists what to keep so that you can answer that question quickly.

## Quick answer

Keep **two layers of evidence**. First, the consent registered on the telecom operators' DLT platform, which is what the scrubbing system checks. Second, your own record of **who agreed, to what, when, how and on which wording**, so that you can show the context behind each registered consent. Store the exact consent text that was shown, a timestamp, the way consent was captured, the sender and purpose, and any opt-out.

## Two layers: the DLT register and your own record

| Layer | What it is | What it holds | Who controls it |
| --- | --- | --- | --- |
| DLT consent register | The shared system on the operators' DLT platform | Customer consent linked to your sender (principal entity), header and consent template | The operators and the platform |
| Your consent record | Your own database, sheet or CRM | The full story behind each consent: wording, time, source, proof and changes | You |

The DLT register is what checks messages before they reach the customer. Your own record is what you show if anyone challenges that consent. Do not depend on the platform alone.

## How consent works on DLT (the short version)

Under TRAI's rules, a sender registers a **consent template**. This is the content shown to the customer when consent is requested, and it states the purpose of the consent and the details of the sender. Under TRAI's Digital Consent Acquisition direction of June 2023:

1. The customer is shown the registered consent template.
2. The customer agrees to the purpose and the sender's details.
3. The customer is authenticated, for example with an OTP.
4. The consent is recorded on the consent register.

Operators describe several ways to collect consent, including web pages, QR codes and APIs. Consent can also be gathered through other verifiable means and then registered, following TRAI's process. The 2026 amendment to the rules, as TRAI described it, also allows older consents to count if they were obtained verifiably and are registered on the operators' platform. For details, see our summary of the [TRAI 2026 amendment]({{ '/2026/12/03/trai-tcccpr-third-amendment-2026-what-changed-business-checklist/' | relative_url }}).

Customers can also register that they do not wish to receive consent-seeking messages from senders, so an old consent is never a permanent licence.

For the full process of collecting consent, read our guide on [consent for SMS and WhatsApp in India]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}).

## The consent record template

Keep one row per consent event. Use a database or a spreadsheet with these columns.

| Field | What to store | Example |
| --- | --- | --- |
| Consent ID | A unique number you assign | C-000482 |
| Customer ID | Your internal customer reference | CUST-10482 |
| Mobile number | The number consent applies to | Stored securely, restricted access |
| Sender (principal entity) | The registered entity that sends | Your registered business name |
| Header | The sender ID used | Your registered header |
| Consent template ID | The registered consent template used | As shown on your DLT portal |
| Channel | SMS, voice, WhatsApp, email | SMS |
| Purpose | What the customer agreed to receive | Offers on [product line] |
| Consent type | Promotional or service-explicit | Promotional |
| Consent text shown | The exact wording and its version | v3, 12 Nov 2026 |
| Date and time | With time zone | 2026-12-13 15:42 IST |
| Capture method | Web form, QR code, API, in-store, call | Web form |
| Source page or place | Where it was captured | /offers signup page |
| Verification | How the person was authenticated | OTP verified |
| DLT registration status | Registered, pending, failed | Registered |
| DLT registration date | When it was recorded on the platform | 2026-12-13 |
| Status | Active or withdrawn | Active |
| Withdrawn on and how | Date, time and route of opt-out | Blank, or 2027-02-01, SMS reply |
| Notes | Anything unusual | Imported from legacy list, verified |

### The same template as a spreadsheet header row

You can paste this row into a spreadsheet or use it to build a database table:

```
consent_id, customer_id, mobile, sender_name, header, consent_template_id, channel, purpose, consent_type, consent_text_version, consented_at, capture_method, source, verification, dlt_status, dlt_registered_at, status, withdrawn_at, withdrawn_via, notes
```

Restrict access to this file or table. It contains personal data, so only the people who need it should be able to open it.

## Sample consent wording

Use plain, specific language. Adapt it to your registered consent template, because the wording on the DLT platform must match what you show.

> I agree to receive promotional messages about [product or service category] from [registered business name] on this mobile number by SMS. I can withdraw my consent at any time.

For service messages:

> I agree to receive messages about my [orders, appointments or account] from [registered business name] on this mobile number by SMS.

Keep each purpose in its own consent. A single tick-box for "offers, updates and partner promotions" is too broad, and it is hard to defend.

## What you must be able to prove

For any contact you message, you should be able to answer these quickly:

- ✅ Who agreed, and on which number
- ✅ What they agreed to receive, and from which sender
- ✅ The exact words they were shown
- ✅ When and where they agreed
- ✅ How you verified that the person really gave consent
- ✅ That the consent is registered on the DLT platform
- ✅ Whether they have since withdrawn consent, and when you stopped messaging

## Opt-outs and withdrawals

- Mark the consent **withdrawn** in your record, with a date, time and the route used.
- **Update the DLT register** so that the withdrawal is reflected there as well.
- Remove the number from every campaign list and tool, not only the one that received the request.
- Never delete the history of the consent and the opt-out. Keep it, with the status changed, so that you can show you honoured it.

## Handling old lists

If you hold older consent, such as forms, app sign-ups or call-centre agreements:

1. Check whether you can **show how and when** each consent was obtained.
2. If you can, ask your provider how to register it on the platform. Registration matters as much as the original proof.
3. If you cannot show it, treat the contact as **not consented**, and ask again through a proper consent flow.
4. Do not mix unverified lists into your main database.

## Audit routine

A short regular check keeps the record trustworthy:

- ✅ Every active consent has a template ID, a timestamp, a capture method and a verification entry
- ✅ DLT registration status matches your own record
- ✅ Withdrawn numbers are blocked in every sending tool
- ✅ Consent wording versions are saved, and each consent points to the correct version
- ✅ Access to the record is limited and logged
- ✅ A sample of consents can be traced from the platform back to your evidence
- ✅ Complaint cases can be answered within the time your provider gives you

Run this check every month at first, then at a schedule your team agrees, and again whenever you change your forms or tools.

## How this fits with the Data Protection Act

India's Digital Personal Data Protection Act, 2023 asks for clear notice and consent for processing personal data, with the right to withdraw. A good consent record supports both sets of rules. The dates on which parts of the Act apply are phased, so check the current position with a lawyer.

## Common mistakes

- **Only a phone number list.** It shows nothing about consent.
- **No record of the exact wording.** Wording changes over time, and you must know what each person saw.
- **Consent registered but no proof behind it.** The platform record alone will not answer every question.
- **Broad, bundled consent.** One tick for many purposes is weak.
- **Opt-outs that are not synced.** The same person is messaged from another tool.
- **Deleting history.** Mark status instead, so that you can prove what happened.
- **Open access.** Everyone in the company can download the customer list.

## FAQ

**Is a consent template the same as a message template?**
No. A consent template is the text shown to a customer when asking for permission, and it states the purpose and the sender's details. A message template is the content you send afterwards. Both are registered on DLT, and they are linked.

**Do I need consent for OTPs and transactional messages?**
Rules differ by message type, so confirm your category with your telecom provider. Promotional and service-explicit messages need registered consent.

**How long should I keep consent records?**
Ask a lawyer to confirm a retention period for your business. Keep records for as long as you message the person, and for the period you decide is needed afterwards.

**Can I use one record for SMS and WhatsApp?**
Keep one customer record, but note each channel separately. Agreement to SMS is not agreement to WhatsApp. See our guide on [measuring campaign results]({{ '/2026/12/07/measure-sms-whatsapp-campaign-results-delivery-clicks-cost-per-outcome/' | relative_url }}) for tracking per channel.

**What if I do not have a technical team?**
A spreadsheet with restricted access can work for a small list. Move to a database when volumes grow. Our [DLT registration guide]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}) covers the registration steps that come before consent.

{% include lead-form.html topic="telecom" %}

*This guide is for general information and is not legal advice. Telecom and data protection rules change, and operators describe their portals differently. Confirm your process with your telecom provider and a qualified lawyer.*
