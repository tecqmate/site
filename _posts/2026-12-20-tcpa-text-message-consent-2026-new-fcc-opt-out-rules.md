---
layout: post
title: "TCPA Text Message Consent in 2026: What Businesses Must Get Right and What the New FCC Opt-Out Rules Change"
description: "US businesses and anyone texting US customers need valid consent and a working opt-out. See the difference between informational and marketing texts, what proof to keep, and what changed when the FCC's new consent revocation rules took effect on 25 November 2026."
date: 2026-12-20
tags: ["tcpa", "sms-consent", "fcc", "us-sms", "opt-out", "sms-compliance", "telecom"]
topic: telecom
read_mins: 8
audience: "Businesses, marketers and developers in the US, India and elsewhere that send text messages to US customers"
---

In our guide to [US 10DLC registration]({{ '/2026/12/16/us-10dlc-registration-guide-business-sms-brand-campaign/' | relative_url }}), we explained that carrier registration is a technical requirement. The law that decides **whether you were allowed to send the text at all** is the **Telephone Consumer Protection Act (TCPA)**.

This guide covers the consent basics, what proof to keep, and the new rules on **revoking consent** that the FCC adopted in 2026, which took effect on 25 November 2026.

*This is general information, not legal advice. TCPA rules are detailed and change often, and state laws add more requirements. Take advice from a US lawyer before you build or change a texting programme.*

## Quick answer

Before you send automated texts to a US number, you need the recipient's **prior express consent** for informational texts, and **prior express written consent** for marketing texts. Keep **proof** of when and how each person agreed. Tell people **how to opt out**, and honour opt-outs fast. Under the FCC's 2026 changes, you can now treat an opt-out from one kind of **informational** message as applying to that category, and you may designate **exclusive opt-out methods** if you state them clearly in your messages. Do not rely on registration with carriers to protect you from TCPA claims.

## Two kinds of text, two levels of consent

| Type | Examples | Consent needed |
| --- | --- | --- |
| Informational (non-marketing) | Order updates, appointment reminders, delivery alerts, one-time codes | Prior express consent. Providing a number for that purpose can count, if the messages stay within that purpose |
| Marketing (telemarketing) | Promotions, offers, sales messages | Prior express **written** consent, which is more specific and must be documented |

If a message mixes the two, for example an order update that ends with a promotion, regulators and plaintiffs can treat it as marketing. Keep informational messages informational.

## What good consent looks like

Written consent for marketing generally needs:

- A clear disclosure that the person agrees to receive **marketing texts** from **your named business**
- A statement that texts may be sent using automated technology
- A statement that consent is **not a condition of buying** anything
- A signature, which can be electronic, for example by ticking an unticked box on a form or replying with a keyword
- The phone number the consent applies to

Good practice also includes your message frequency, the "message and data rates may apply" notice and links to your terms and privacy policy. The same elements help with carrier registration. Our [US 10DLC guide]({{ '/2026/12/16/us-10dlc-registration-guide-business-sms-brand-campaign/' | relative_url }}) has sample opt-in wording.

Avoid:

- Pre-ticked boxes
- Consent buried inside long terms and conditions
- One consent for several companies ("partners")
- Buying or renting number lists

## What proof to keep

If you are challenged, you must show that consent existed. For each number, keep:

- ✅ The exact consent wording shown, and its version
- ✅ The date and time, with time zone
- ✅ How consent was captured, such as a web form, keyword or paper form
- ✅ The page, form or campaign where it happened, and the IP address or other evidence where lawful
- ✅ The phone number and your link to the customer record
- ✅ Any opt-out, with date, time and method

Our [consent record template]({{ '/2026/12/13/dlt-consent-record-template-what-indian-businesses-must-store-and-prove/' | relative_url }}) shows a field-by-field format. It was written for India's DLT system, but the same record structure works for US consent, with US-specific wording.

## Opt-outs: what changed on 25 November 2026

Under the FCC's 2024 consent order, most revocation rules took effect on 11 April 2025. A further requirement, the so-called **"revoke all"** rule, which would have made an opt-out from one message type apply to every message from that caller, was delayed more than once, most recently to 31 January 2027.

In 2026 the FCC replaced that rule. According to law firm summaries of the order, which was published in the Federal Register on 26 October 2026, with new rules effective **25 November 2026**:

| Area | What the new rules do |
| --- | --- |
| "Revoke all" | Replaced. A caller may treat an opt-out as applying only to the **category of informational message** that prompted it |
| Exclusive opt-out methods | Callers may **designate** certain methods for opting out, for example a specific keyword reply, if they disclose the method clearly and conspicuously in the message |
| Fraud and security alerts | The exemption for urgent fraud-related alerts was expanded |
| Further proposals | The FCC also asked for comment on more changes, such as requiring an opt-out by reply text and shortening the time allowed to process opt-outs. These were proposals, not final rules |

What this means in practice:

- **Disclose your opt-out method in the message** if you want to rely on a designated method.
- **Do not make opting out hard.** Standard keywords such as STOP remain the safe approach, and many carriers and registries require them anyway.
- **Handle categories carefully.** If someone opts out of promotions, you may still be allowed to send service messages they asked for, but you should be able to explain the category clearly.
- **Process requests promptly.** The 2024 order set a deadline of 10 business days to honour revocation, according to published summaries, and the FCC has floated shortening it. Check the current rule.
- **Marketing is different.** Opt-outs from telemarketing messages and Do Not Call rules have their own requirements.

Because the rules are new and the FCC has open proposals, review your opt-out wording, your systems and your agreements with messaging vendors.

## Other TCPA rules to keep in mind

- **Quiet hours:** telemarketing calls and texts are restricted outside **8 a.m. to 9 p.m.** in the recipient's local time.
- **Do Not Call:** the National Do Not Call Registry and company-specific do-not-call lists apply to marketing messages. Keep and honour an internal list.
- **Sender identity:** messages should identify who is sending them.
- **State laws:** several states have their own telemarketing and text rules, some stricter than federal law. Check the states where your recipients live.
- **Liability:** the TCPA lets recipients sue. Statutory damages are **$500 per unsolicited message**, and up to **$1,500** where a violation is found to be willful or knowing. Class actions are common.

## If you text US customers from outside the US

Being based in India or elsewhere does not remove the obligations. If you send messages to US numbers, US law and carrier rules apply to those messages. Work with a provider that offers US numbers and registration, and keep US-specific consent records. Compare how this differs from India in our guides on [consent for SMS and WhatsApp in India]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}) and [DLT registration]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}).

## TCPA text consent checklist

- ✅ You know whether each message type is informational or marketing
- ✅ Marketing texts have written consent that names your business and the nature of the messages
- ✅ Consent is not pre-ticked, bundled with other terms or shared across companies
- ✅ Every consent has a saved record: wording, time, method and source
- ✅ Opt-out instructions appear in your messages, with STOP and HELP supported
- ✅ If you designate an exclusive opt-out method, it is disclosed clearly in the message
- ✅ Opt-outs are processed quickly across all your systems and vendors
- ✅ Quiet hours and your internal do-not-call list are enforced
- ✅ State rules for your recipients are reviewed
- ✅ A US lawyer has reviewed your programme and the 2026 revocation changes

## Common mistakes

- **Treating carrier registration as legal clearance.**
- **Mixing marketing into informational messages.**
- **Using purchased or "lead" lists** without written consent from each person.
- **Hiding the opt-out method** or making it hard to use.
- **Keeping no proof.**
- **Forgetting that vendors send on your behalf.** You remain responsible for their sending.
- **Ignoring state laws.**
- **Assuming the rules stay still.** The FCC has more proposals open.

## FAQ

**Do I need consent to send a one-time passcode?**
Informational texts need prior express consent. A person who gives you their number to receive a code generally gives that consent for that purpose. Keep the use within the purpose.

**Is replying STOP the only way to opt out?**
Under the new rules, callers may designate exclusive methods if they disclose them clearly. In practice, a reply keyword remains the standard, and it is safest to honour any reasonable request.

**Did the "revoke all" rule come into force?**
No. The FCC replaced it before its delayed 31 January 2027 date, with the narrower approach described above.

**Does an existing customer relationship count as consent?**
Not for marketing texts. Marketing requires prior express written consent, even for existing customers.

**What if my SMS provider says it handles compliance?**
Providers can help with registration and opt-out keywords, but legal responsibility for consent generally remains with the sender. Ask for details in writing.

{% include lead-form.html topic="telecom" title="Texting US customers and unsure where to start?" text="Tell us about your messages and how people opt in, and we will point you in the right direction." %}

## Sources and further reading

- FCC, [Order DA 26-12 on the "revoke all" waiver](https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf)
- Steptoe, [FCC's new TCPA consent revocation rules go into effect on November 25, 2026](https://www.steptoe.com/en/news-publications/order-out-of-chaos-fccs-new-tcpa-consent-revocation-rules-go-into-effect-on-november-25-2026.html)
- McGuireWoods, [The FCC's new TCPA rules give businesses opt-out control](https://www.mcguirewoods.com/client-resources/alerts/2026/10/the-fccs-new-tcpa-rules-give-businesses-opt-out-control/)
- 47 U.S.C. § 227 and 47 CFR § 64.1200, the TCPA statute and the FCC's rules

*This guide summarises law firm and regulator publications and is not legal advice. TCPA rules, FCC proposals and state laws change, so confirm the current position with a qualified US attorney.*
