---
layout: post
title: "US 10DLC Registration Guide: How to Register Your Brand and Campaign to Text US Customers"
description: "US carriers require businesses that text customers from 10-digit numbers to register. Learn the two steps, brand types, campaign use cases, what to write for opt-in and sample messages, common rejection reasons and how it compares with India's DLT."
date: 2026-12-16
tags: ["10dlc", "a2p-sms", "us-sms", "campaign-registry", "tcpa", "sms-compliance", "telecom"]
topic: telecom
read_mins: 8
audience: "Businesses, developers and agencies in the US, India and elsewhere that send SMS to US customers from local 10-digit numbers"
---

If you send text messages to customers in the United States from an ordinary 10-digit phone number, those messages must be **registered**. Unregistered business texts are blocked by carriers, and that includes simple things such as order updates and one-time passcodes.

This guide explains what 10DLC registration is, who needs it, the two registration steps, what to prepare, why applications get rejected and how it compares with India's DLT system.

*This is general information, not legal advice. Carrier rules and fees change, so confirm current requirements with your messaging provider.*

## Quick answer

**10DLC** (10-digit long code) is the standard route for **A2P** (application-to-person) business texting in the US. You register **your brand** (who you are) and **your campaign** (what you send and how people agree to receive it) with The Campaign Registry (TCR), usually through your messaging provider. According to several messaging providers, US carriers have blocked unregistered 10DLC traffic since **1 February 2025**. Prepare accurate business details, a clear opt-in process, a privacy policy and realistic sample messages.

## Who needs 10DLC registration

You need it if you send SMS or MMS to US phone numbers from standard 10-digit local numbers for business purposes, for example:

- Appointment reminders and order updates
- One-time passcodes and security alerts
- Customer service messages
- Marketing and promotions

You do **not** need it for messages that are not sent to US numbers. Other routes, such as toll-free numbers and short codes, follow their own verification processes. Alphanumeric sender names (like the ones used in India) are generally not displayed to US recipients, so a US number is the usual approach.

If you are a business in India texting US customers, you still need a US number and the same registration, which you complete through a provider that offers US numbers.

## The two steps

### Step 1: brand registration

A brand represents your business identity. The main types are:

| Brand type | Who it is for | Notes |
| --- | --- | --- |
| Standard | Most businesses and organisations that have an EIN (US tax ID) | Supports several campaigns and higher message volume |
| Sole proprietor | Individuals or very small businesses **without** an EIN | Limited to one campaign and low volume, and needs extra identity verification |

Providers document an important rule: **if your business has an EIN, it must register as a standard brand**, even if you think of yourself as a sole proprietor. Registering the wrong type can lead to rejection and extra fees.

You will usually provide:

- Legal business name
- EIN or tax ID (it must match official records exactly)
- Business address, website and contact details
- Business type and industry

Brands are given a **trust score**, which affects how many messages per second you can send. A complete, accurate application with a working website helps.

### Step 2: campaign registration

A campaign describes the kind of messages you send. You will need:

| Item | What to provide |
| --- | --- |
| Use case | The category that best matches your messages, such as customer care, account notifications, two-factor authentication or marketing |
| Description | A clear explanation of what the campaign is for |
| Sample messages | Real examples of what you will send, with no placeholder text |
| Message flow (call to action) | How people agree to receive messages, in detail |
| Opt-in and opt-out | The keywords and replies you use, such as STOP and HELP |
| Content attributes | Whether messages include links, phone numbers, age-restricted content or similar |

Messages that do not match your registered use case or sample messages can be flagged, fined or throttled.

## What reviewers expect to see

### A clear message flow

The "message flow" or "call to action" explains how a person gives consent. Providers say it should include:

- The program or brand name
- What kind of messages the person will get
- Message frequency, for recurring programs
- A statement such as "Message and data rates may apply"
- Instructions for opting out and getting help
- A link to your terms and your privacy policy

If people opt in on a website, the form text and a working privacy policy must be visible. Opt-in problems are a major cause of campaign rejections.

### Sample messages that match

Good samples:

- Look like real messages you will send
- Include your brand name
- Include opt-out language for marketing, such as "Reply STOP to unsubscribe"
- Match the use case you selected

For example, an appointment reminder might read: "Acme Dental: your appointment is tomorrow at 10:30. Reply C to confirm. Reply STOP to opt out."

### Sample opt-in wording

> I agree to receive text messages about [reasons for messaging] from [Brand name]. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our Privacy Policy [link].

Adapt this to your real program. Keep it separate from other terms, and do not pre-tick the box.

## Common reasons for rejection

| Reason | How to avoid it |
| --- | --- |
| Brand details do not match official records | Copy your legal name and EIN exactly from official documents |
| Wrong brand type | Use standard if you have an EIN |
| Opt-in is unclear or missing | Describe the full flow, with the brand name, frequency and links |
| No privacy policy or terms | Publish both, and link them |
| Samples do not match the use case | Use real samples that fit the category |
| Placeholder text in samples | Replace brackets with realistic values |
| Website is missing, broken or vague | Use a live, professional website that describes your business |
| Content that is high-risk or prohibited | Check carrier content rules before you register |

## How long does it take?

Timelines vary by provider, brand type and how complete your application is. Some providers report brand approval in a few days and campaign approval taking days to a few weeks. Plan ahead and do not schedule a launch until your campaign is approved.

## 10DLC and the law: the TCPA

Carrier registration is a technical requirement. Separately, the **Telephone Consumer Protection Act (TCPA)** is the US law on automated calls and texts. In general:

- Marketing texts need the person's prior **express written consent**.
- Informational messages, such as order updates, follow different consent rules, but still need a valid reason and clear sender identity.
- People must be able to opt out easily, and you must honour it promptly.
- The law allows statutory damages of **$500 per unsolicited message**, and up to **$1,500** where a violation is found to be willful or knowing.

Some states have additional rules. Talk to a US lawyer about your programme.

## 10DLC compared with India's DLT

| Topic | US 10DLC | India DLT |
| --- | --- | --- |
| What is registered | Brand and campaign | Entity, sender header, templates and consent |
| Message templates | Sample messages for the campaign (not every message) | Each message template must be approved |
| Registry | The Campaign Registry, through carriers and providers | Operators' DLT platforms |
| Consent | Opt-in described in the campaign and managed by you | Consent templates and the consent register |
| Sender ID | A registered US number | An approved sender header |
| Main law | TCPA, plus carrier rules | TRAI's TCCCPR rules |

If you work in both markets, see our guides to [DLT registration in India]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}) and [customer consent for SMS and WhatsApp in India]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}).

## Keep your messages efficient

Long or special-character messages split into several segments, which raises cost. Our guide on [SMS segments, GSM-7 and UCS-2]({{ '/2026/12/09/sms-segment-calculator-explained-gsm-7-vs-ucs-2-cost-examples/' | relative_url }}) explains how to check this before you send. To track results across channels, read [how to measure SMS and WhatsApp campaign results]({{ '/2026/12/07/measure-sms-whatsapp-campaign-results-delivery-clicks-cost-per-outcome/' | relative_url }}).

## 10DLC registration checklist

- ✅ You know whether your business has an EIN, and you have chosen the matching brand type
- ✅ Legal name, EIN, address and website match official records exactly
- ✅ A live website, a privacy policy and terms are published
- ✅ The campaign use case matches what you will really send
- ✅ Sample messages are realistic, include your brand name and include opt-out wording
- ✅ The opt-in process is described in full, with brand, frequency, rates and links
- ✅ STOP and HELP replies are set up and tested
- ✅ Consent records are kept for each recipient
- ✅ Marketing messages use express written consent
- ✅ You have waited for approval before sending to customers

## Common mistakes

- **Sending before approval.** Unregistered traffic is blocked.
- **Registering as a sole proprietor when you have an EIN.**
- **Vague opt-in text,** or a form that hides the consent.
- **Samples that do not match what you send.**
- **Using one campaign for several unrelated purposes.**
- **Buying a list of numbers.** You need consent from each person.
- **Ignoring opt-outs.**

## FAQ

**Do I need 10DLC if I only send a few messages?**
If they are business messages to US numbers from a 10-digit number, registration is required whatever the volume. The sole proprietor route is meant for very small senders.

**Can I register myself, or must I use a provider?**
Registration is normally done through your messaging provider, which submits it to the registry for you.

**What is a trust score?**
It is a rating given to your brand during registration. A higher score generally allows higher message throughput.

**Is a toll-free number an alternative?**
Yes. Toll-free numbers have a separate verification process, with different limits. Ask your provider which suits your use.

**Does registration make me TCPA compliant?**
No. Registration is a carrier requirement. The TCPA and state laws are separate, and you must obtain proper consent.

{% include lead-form.html topic="telecom" title="Texting US customers from India or elsewhere?" text="Tell us about your use case and we will point you in the right direction." %}

## Sources and further reading

- Microsoft Learn, [Ten-digit long code (10DLC) guidelines](https://learn.microsoft.com/azure/communication-services/concepts/sms/ten-digit-long-code-guidelines)
- Twilio documentation, [Collect business information for A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/collect-business-info)
- Twilio, [Improving your chances of A2P 10DLC registration approval](https://www.twilio.com/en-us/blog/insights/best-practices/improving-your-chances-of-a2p10dlc-registration-approval)
- The Campaign Registry and your messaging provider, for current registration requirements

*This guide is for general information and is not legal advice. Registration rules, carrier policies, fees and state laws change often. Confirm the current requirements with your provider and a US lawyer.*
