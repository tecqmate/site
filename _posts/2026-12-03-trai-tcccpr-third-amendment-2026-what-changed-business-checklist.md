---
layout: post
title: "TRAI 2026 Spam Rules Update"
h1: "TRAI's 2026 Spam Rules Update (TCCCPR Third Amendment): What Changed and What Businesses Should Do"
description: "TRAI amended its commercial messaging rules in September 2026. See what changed for SMS and voice senders: AI-based detection, A2P calls, inquiry-based..."
date: 2026-12-03
tags: ["trai", "tcccpr", "dlt", "sms", "a2p-calls", "compliance", "telecom", "business-messaging"]
topic: telecom
read_mins: 8
audience: "Businesses, marketers and developers who send SMS or automated voice calls to customers in India"
last_reviewed: 2026-11-23
sources:
  - label: "TRAI Third Amendment Regulations, 2026"
    url: "https://trai.gov.in/sites/default/files/2026-09/Regulation_18092026.pdf"
    note: "Full published regulation text"
  - label: "TRAI regulations index"
    url: "http://trai.gov.in/release-publication/regulations"
    note: "Official status and related regulations"
image: "/assets/images/topics/telecom-card.png"
---

On 18 September 2026, the Telecom Regulatory Authority of India (TRAI) announced the **Telecom Commercial Communications Customer Preference (Third Amendment) Regulations, 2026**. It updates the 2018 rules (TCCCPR) that govern promotional and transactional messages and calls in India.

This guide explains the main changes in plain language, based on TRAI's own press release, and lists what a business that sends messages or automated calls should check.

## Quick answer

The amendment makes enforcement faster and more technology-driven. The changes most likely to affect you are: **automated (A2P) voice calls must be pre-declared**, **inquiry-based messages are allowed only for seven days**, **legacy consents can be recognised if they are verifiable and registered**, and **misused headers and templates can be suspended within six hours**. Check your consent records, your voice-call setup and your access controls on your DLT account.

## What TRAI announced

The changes followed a consultation that began with a draft in March 2026, comments from stakeholders and an open house discussion in June 2026. The press release lists the main features below. TRAI's press release does not give an effective date for each change, so check the regulation text and your telecom provider for when each provision applies to you.

| Area | What changed (summary of the press release) |
| --- | --- |
| AI/ML-based spam detection | Telecom providers must identify sender numbers likely to be used for spam and share this among themselves |
| A2P calls | Automated calls must be declared in advance; undeclared ones are treated as unsolicited commercial communication |
| Inquiry-based messages | Allowed for seven days after a customer's inquiry, which must be in writing or digital form and kept verifiable |
| Consumer appeals | Customers can appeal a complaint outcome within 15 days |
| Complaint-based action | Action can start after 3 or more unique complaints in ten days, if the sender is also flagged by the AI system |
| Legacy consent | Older consents can count if obtained through verifiable means and registered on the telecom providers' platform |
| Header and template misuse | Misused headers and templates must be suspended within six hours of the provider becoming aware |
| Sender classification | TRAI may classify senders and set different enforcement measures for each class |

## The changes in more detail

### 1. AI and machine-learning detection of spam senders

Telecom providers must identify sender numbers (CLIs) with a high probability of being used for unsolicited commercial communication, and share that information with other providers. If five or more numbers linked to one sender are flagged within ten days, the providers start further investigation and graded action. That can include KYC re-verification, physical verification, barring of outgoing services and, for repeated violations, disconnection.

The regulated number series for commercial communication, 140xx, 1600xx and 1601xx, should not be flagged as suspected spam for recipients.

**What it means for you:** if you use many numbers, or your numbers are shared by several teams or vendors, make sure you can show that each is used for permitted purposes.

### 2. Rules for automated (A2P) voice calls

Application-to-Person calls are voice calls started by software or an automated platform without a person dialling, including auto-dialers, robo-calls and pre-recorded or artificial voice. Every entity using them must **tell its telecom provider in advance**, with the numbers it will use. An A2P call without the prior declaration is treated as unsolicited commercial communication.

TRAI also introduced a termination charge for A2P calls, stated in the press release as up to 0.05 per minute, charged between telecom providers. Calls made through the designated commercial number series are exempt. Check the full regulation for how the charge is defined and who bears it.

**What it means for you:** if you use automated calling for reminders, collections or sales, ask your provider whether your use is declared, and which number series you should use.

### 3. Inquiry-based messages: a seven-day window

A business may send commercial messages to a customer who has made an inquiry about goods or services, but only for **seven days** from the date of that inquiry. The inquiry must be made in writing or digitally, and the sender must keep it in a **verifiable form**. TRAI says the change is aimed mainly at e-commerce and e-service platforms.

**What it means for you:** keep a record of each inquiry (form entry, chat or email), and stop inquiry-based messages after seven days unless you have proper consent.

### 4. Consumer appeals

Customers can now appeal the resolution of a spam complaint within 15 days. This adds a layer of review for both sides, so keep records that show you had permission.

### 5. Earlier action on complaints

Previously, action against a sender needed five or more unique complaints in ten days. Under the amendment, action can start after **three or more unique complaints in ten days**, provided the sender's number is also flagged by the telecom provider's AI/ML system.

### 6. Legacy consent can count, if it is verifiable

The definition of consent has been widened to include consent you already hold. It is valid only if it was obtained through **verifiable means** and is then **registered on the telecom providers' digital platform**. Consent you cannot prove, or have not registered, does not qualify.

This builds on the process in our guide to [collecting customer consent for SMS and WhatsApp in India]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}).

### 7. Misuse of headers and content templates

If a header or template is misused, the originating telecom provider must suspend it within **six hours** of becoming aware. The sender must then take remedial steps and file a complaint with law enforcement. If the misuse is attributed to a telemarketer (the platform sending messages for you), all of its telecom resources across providers will be disconnected for one year, with blacklisting.

**What it means for you:** protect access to your DLT account and your messaging platform. Limit who can create or use templates, remove access when staff or vendors leave, and monitor traffic for anything you did not send.

### 8. Stricter agreements, sender classes and other changes

- TRAI may prescribe essential conditions that must appear in contracts between telecom providers and senders or telemarketers.
- TRAI may classify senders by sector, scale and impact, and apply different enforcement measures to each class.
- Call management apps are barred from blanket blocking or spam-tagging calls from the designated commercial number series, although individual users can still block calls on their own phones.
- Network operators must give virtual network operators a digital interface with the DLT platform.

## What businesses should do now

1. **Audit your consent records.** Find out which customers you message on the basis of consent, inquiry or an existing relationship, and whether you can prove it.
2. **Register legacy consent** if you hold older permissions that were collected in a verifiable way. Ask your provider how.
3. **Check your voice calls.** If any are automated, confirm that your use is declared to your telecom provider.
4. **Use the right number series** for service, transactional and promotional calls.
5. **Set a seven-day rule** in your CRM for inquiry-based messages.
6. **Lock down DLT and platform access.** Use named accounts and review them regularly.
7. **Review your agreement** with your messaging provider. Ask how they handle suspended headers or templates and how quickly they inform you.
8. **Keep complaint records.** If a customer complains, you should be able to show consent, inquiry and the message sent.

## Compliance checklist

- ✅ Consent or inquiry proof is stored for every contact you message
- ✅ Older consents are registered, where they are valid and verifiable
- ✅ Inquiry-based messages stop after seven days
- ✅ Automated voice calls are declared to your telecom provider
- ✅ Each number is used for one clear purpose
- ✅ DLT and platform logins are personal, protected and regularly reviewed
- ✅ You monitor your sending for activity you did not authorise
- ✅ Your provider contract explains what happens when a header or template is suspended
- ✅ Opt-outs and complaints are logged and handled quickly

## Common mistakes

- **Treating the amendment as only the provider's problem.** Senders carry responsibility too.
- **Assuming old lists are fine.** Consent must be verifiable, and registered to count.
- **Sharing one DLT login** across the team or with vendors.
- **Using automated calls without telling your provider.**
- **Messaging inquiry leads for weeks.** The window is seven days.
- **Ignoring complaints.** Three unique complaints, combined with an AI flag, can trigger action.

## FAQ

**Is this amendment already in force?**
TRAI announced the amendment on 18 September 2026. The press release does not state dates for each provision, so check the published regulation and your telecom provider.

**Does this apply to WhatsApp?**
No. WhatsApp is not regulated under TCCCPR in the same way. It follows Meta's policies, and data protection law applies to personal data. See our guide on [consent for SMS and WhatsApp]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}).

**Do OTP and transactional messages get affected?**
The amendment focuses on spam enforcement. Misused headers and templates can be suspended quickly, so protect your OTP templates and monitor delivery. See our guide on [OTP SMS not being delivered]({{ '/2026/11/21/otp-sms-not-delivered-india-causes-fixes/' | relative_url }}).

**What if my provider sends the messages for me?**
You are still responsible for consent and content. Choose a provider carefully. Our [checklist for choosing a CPaaS or SMS provider]({{ '/2026/11/24/how-to-choose-cpaas-sms-provider-india-checklist/' | relative_url }}) can help.

**Where do I start with registration?**
Read our [DLT registration guide]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}).

{% include lead-form.html topic="telecom" %}

*This guide summarises a regulator's press release and is for general information, not legal advice. Regulations are detailed and may be clarified through directions. Read the full text and take advice from a qualified lawyer or your telecom provider before you act.*
