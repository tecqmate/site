---
layout: post
title: "Collect Customer Consent for SMS"
h1: "How to Collect Customer Consent for SMS and WhatsApp in India (TRAI, DLT and DPDP)"
description: "A practical guide to getting and recording customer consent for business messages in India: TRAI consent templates on DLT, WhatsApp opt-in rules and what..."
date: 2026-11-30
tags: ["consent", "sms", "whatsapp", "dlt", "dpdp", "telecom", "business-messaging"]
topic: telecom
read_mins: 8
audience: "Businesses, marketers and developers who send SMS or WhatsApp messages to customers in India"
last_reviewed: 2026-11-23
sources:
  - label: "TRAI regulations"
    url: "http://trai.gov.in/release-publication/regulations"
    note: "TCCCPR and amendments"
  - label: "Digital Personal Data Protection Act 2023"
    url: "https://meity.gov.in/content/digital-personal-data-protection-act-2023"
    note: "Official MeitY text"
image: "/assets/images/topics/telecom-card.png"
---

Most guides about business messaging in India focus on templates and registrations. Consent gets less attention, yet it is where many businesses run into problems: messages blocked, accounts restricted or complaints from customers who never agreed to hear from you.

This guide explains, in plain language, how consent works for SMS and WhatsApp in India, how to collect it properly and what records to keep.

## Quick answer

Get **clear, specific permission** before you send promotional messages. Say who you are, which channel you will use and what kind of messages the customer will get. For SMS, register the consent on the telecom operators' DLT platform. For WhatsApp, collect an explicit opt-in that names WhatsApp. Keep a record of when, where and how each person agreed, and make opting out easy.

## Three sets of rules, not one

Consent in India sits under several overlapping frameworks. You need to meet each one.

| Framework | What it covers | Main idea |
| --- | --- | --- |
| TRAI's TCCCPR rules and DLT | SMS and voice from businesses | Register sender, templates and customer consent; promotional messages respect customer preferences |
| WhatsApp Business Messaging Policy | WhatsApp Business messages | Customers must opt in before you start messaging them |
| Digital Personal Data Protection Act (DPDP) | Personal data, including phone numbers | Notice, valid consent and the right to withdraw |

A message can be fine under one and still breach another, so check each separately.

## SMS: consent and the DLT platform

Under TRAI's rules, businesses (called principal entities) register on the DLT platform run by the telecom operators. For commercial messages, this includes consent. In outline:

1. **Register a consent template.** This is the text you show customers when asking for permission. It should state the purpose and who the sender is.
2. **Collect consent in a way the platform supports.** Operators describe several routes, such as a web form, a QR code, an API or an in-app flow. Check which ones your operator's DLT portal offers.
3. **Verify the customer.** TRAI's directions describe authenticating the person giving consent, for example by OTP, before the consent is recorded.
4. **Record and link it.** Consent is tied to your registered entity, your templates and the customer's number.
5. **Honour opt-outs.** When a customer withdraws consent, update the record and stop sending.

TRAI has also amended the TCCCPR rules several times, including in 2026, so details of the process can change. Always check the current rules and your operator's DLT portal.

Our [DLT registration guide]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}) covers the registration steps that come before this.

## WhatsApp: opt-in rules

WhatsApp is not an SMS channel, so the DLT process does not apply to it directly. But WhatsApp has its own rules, and they are strict.

**What the opt-in should do**

- Make clear that the customer is agreeing to receive messages **from your business on WhatsApp**
- Say what type of messages they will get, for example order updates or offers
- Be separate from other consents, such as accepting terms and conditions
- Be given by a clear action from the customer, such as ticking an unticked box or sending a message

**Where opt-ins commonly come from**

| Source | Example |
| --- | --- |
| Website or app form | An unticked box: "Send me order updates on WhatsApp" |
| Checkout | A separate choice during purchase |
| In-store | A QR code or sign-up sheet that names WhatsApp |
| Customer-started chat | A customer messages you first, and you reply within the allowed window |
| Paper or call centre | A recorded verbal or written agreement |

The details can change, so check Meta's current opt-in documentation. For template-related issues, see [why WhatsApp templates get rejected]({{ '/2026/11/27/whatsapp-template-rejected-reasons-and-fixes/' | relative_url }}).

## DPDP Act: what it means for consent

Phone numbers and customer lists are personal data. India's Digital Personal Data Protection Act, 2023 sets rules for how businesses collect and use it. The DPDP Rules were notified in November 2025, and the law is coming into force in phases.

According to a legal analysis published in November 2026, the core notice and consent obligations are scheduled to come into force on 13 May 2027. Dates and details can change, so confirm the current position with a lawyer.

In general terms, valid consent under the Act is expected to be free, specific, informed and unambiguous, given by a clear action, and easy to withdraw. A notice should be in plain language and say what data you collect and why.

The practical message: **do not wait for the deadline**. Building good consent habits now is easier than fixing old lists later.

## What to record

Keep a consent record for every person you message. A simple record includes:

| Field | Example |
| --- | --- |
| Name or customer ID | Customer 10482 |
| Phone number | Stored securely |
| Channel | SMS, WhatsApp or both |
| Message types | Order updates, offers |
| Date and time | With time zone |
| Source | Website form, QR code, in-store |
| Consent text shown | The exact wording and version |
| Status | Active, withdrawn |

Keep separate records for each channel. A customer who agreed to SMS has not agreed to WhatsApp. Ask your legal adviser how long to keep these records.

## Making opt-out easy

- Include a simple opt-out instruction in promotional messages
- Honour requests quickly, and do not require a long form
- Update every list and tool, so one person cannot be messaged again from a different system
- Keep a record of when each person opted out

## Consent checklist

- ✅ The consent text names your business, the channel and the type of messages
- ✅ Consent is a separate, clear action, not buried in terms and conditions
- ✅ SMS consent templates are registered and linked on the DLT portal
- ✅ WhatsApp opt-in explicitly mentions WhatsApp
- ✅ You keep a record with date, source, wording and channel for every person
- ✅ Opt-outs are honoured fast and updated in every system
- ✅ You do not buy or scrape phone number lists
- ✅ Your privacy policy explains how you use contact data
- ✅ Someone on your team owns consent and checks it regularly

## Common mistakes

- **Buying contact lists.** Purchased numbers rarely come with valid consent for your messages.
- **Pre-ticked boxes.** These do not show a clear action by the customer.
- **One consent for everything.** Agreement to receive order updates is not agreement to receive offers.
- **Forgetting old customers.** Lists collected years ago may not meet today's standards.
- **No proof.** If you cannot show when and how someone agreed, you cannot rely on it.
- **Ignoring opt-outs on one channel.** A person who opts out of SMS may expect it to apply to your other messages as well.

## FAQ

**Do I need consent to send OTPs or order updates?**
Rules differ by message type. Service and transactional messages are treated differently from promotional ones, but you still need to follow DLT and WhatsApp rules. Check your category with your telecom provider.

**Is a customer's phone number on my form enough consent?**
Not by itself. The customer should be told what they will receive and on which channel, and agree by a clear action.

**Can I message people who have messaged me first on WhatsApp?**
Within the customer service window, you can reply. Starting new conversations later usually needs a template and an opt-in. See Meta's current rules.

**Does the DPDP Act replace TRAI's rules?**
No. They run side by side. A business must meet each requirement separately.

**What should I do with old lists without consent records?**
Do not message them for marketing. Ask again with a clear opt-in, or stop using them. A lawyer can advise on your situation.

*This guide is for general information and is not legal advice. Telecom rules and data protection laws are changing. Check current requirements with a qualified lawyer and your telecom provider before you rely on this guide. See also our [privacy policy]({{ '/privacy/' | relative_url }}).*
