---
layout: post
title: "SMS Segments Explained: GSM-7 vs UCS-2, Character Limits and Cost Examples"
description: "Why does one SMS count as two or three messages? Learn how SMS segments work, the difference between GSM-7 and UCS-2 encoding, which characters change the count, and how to cut your SMS costs."
date: 2026-12-09
tags: ["sms", "sms-segments", "gsm-7", "ucs-2", "character-count", "telecom", "business-messaging"]
topic: telecom
read_mins: 7
audience: "Developers, marketers and business owners who send SMS and want to predict message counts and costs"
---

You write what looks like one short text, send it to 100,000 customers and later find the bill is twice what you expected. The reason is almost always the same: your message was split into more than one **segment**, and most providers charge per segment, not per message.

This guide explains how SMS segments work, why a single emoji can double your cost, and how to check a message before you send it.

## Quick answer

A single SMS holds **160 characters** in the standard GSM-7 alphabet, or **70 characters** if it contains any character outside that alphabet (for example an emoji or a curly quote). Longer messages are split into segments of **153** (GSM-7) or **67** (Unicode, called UCS-2) characters. You are usually billed for every segment, so keep messages short and avoid characters that force Unicode.

## The limits at a glance

| Encoding | Single message | Each part of a longer message |
| --- | --- | --- |
| GSM-7 | 160 characters | 153 characters |
| UCS-2 (Unicode) | 70 characters | 67 characters |

Why do long messages hold fewer characters per part? Each part needs a small header that tells the phone how to join the parts back together. That header takes space, so each part carries slightly less text.

## What is GSM-7?

GSM-7 is the basic character set for SMS. It includes:

- Letters A to Z in upper and lower case
- Digits 0 to 9
- Common punctuation, such as . , ? ! : ; ' " ( ) - / @ # % & * + = < > _ and the space
- A few accented letters and symbols, such as é, ü, ñ and £

It does **not** include most emojis, curly ("smart") quotes, many accented letters, and nearly all non-Latin scripts.

### The extended characters

A small group of GSM-7 characters is called the **extended set**. These characters are valid, but each one takes **two** character spaces:

- ^ { } \ [ ] ~ | and the euro sign (€)

So a message with a few square brackets or a euro sign can run over the limit sooner than you expect.

## What is UCS-2?

UCS-2 (a form of Unicode) is the fallback encoding. It lets you send almost any character: emojis, curly quotes, accented letters outside GSM-7, and scripts such as Hindi (Devanagari), Tamil, Arabic or Chinese.

The price is capacity. One single character outside GSM-7 is enough to switch the **whole message** to UCS-2, cutting the limit to 70 characters for a single SMS.

## The trap: one character changes the whole message

| Message | Encoding | Length | Segments |
| --- | --- | --- | --- |
| Plain English text, 150 characters | GSM-7 | 150 | 1 |
| The same text with one emoji added | UCS-2 | 152 | 3 (67 + 67 + 18) |
| Plain English text, 165 characters | GSM-7 | 165 | 2 (153 + 12) |
| Text with curly apostrophes, 100 characters | UCS-2 | 100 | 2 (67 + 33) |
| Hindi text, 60 characters | UCS-2 | 60 | 1 |
| Hindi text, 80 characters | UCS-2 | 80 | 2 (67 + 13) |

Emojis can also count as **two** characters each in Unicode, because of how they are stored, so the length may be slightly higher than you would count by eye.

Curly quotes are a common hidden cause. Word processors and some editors replace straight quotes (') and (") with curly versions (’ and “), and a copied message can then switch to Unicode without anybody noticing.

## What it costs: a simple example

The rate below is **illustrative only**. Use your own provider's price.

| Scenario | Segments per message | Messages | Segments billed | Cost at 0.20 per segment |
| --- | --- | --- | --- | --- |
| Short GSM-7 message | 1 | 100,000 | 100,000 | 20,000 |
| Same message with an emoji, now 2 segments | 2 | 100,000 | 200,000 | 40,000 |
| Same message with an emoji, now 3 segments | 3 | 100,000 | 300,000 | 60,000 |

One emoji across a 100,000-message campaign can double or triple the cost, and it may also not match the template you registered.

## How SMS segments work in India

For commercial SMS in India, messages are sent through registered templates on the DLT platform. A few practical points:

- **Variables change the length.** A template with variable fields such as a name, an amount or an OTP is only as long as the final text after the variables are filled in. Test with the longest realistic values.
- **Registered text must match.** You cannot freely add emojis or extra words to an approved template. Doing so can also cause the message to be blocked. See our [DLT registration guide]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}).
- **Regional languages use UCS-2.** A Hindi or other Indian-language message is usually Unicode, so its single-message limit is 70 characters. If you message in regional languages, plan the length of your template carefully.
- **Links add length.** A long URL can eat up half a segment. Use short, clean links, and make sure each link is allowed on your account.

## How to check a message before you send

1. **Write the message in a plain-text editor,** not a word processor, to avoid curly quotes and other hidden characters.
2. **Count characters** with a segment counter. You can use our free [SMS character count and segments tool]({{ '/sms-count/' | relative_url }}) to see the encoding and the number of segments.
3. **Test with the longest variable values** you will really send, such as a long name or a large amount.
4. **Send yourself a test** on more than one phone and network.
5. **Check the delivery report** to confirm how the provider billed it. Some platforms show the number of segments per message.

## How to reduce segments and cost

- Keep each message under **160 characters** in GSM-7 if you can.
- Avoid emojis, curly quotes and decorative symbols in SMS. Use them in WhatsApp or RCS, where they do not change your cost per message in the same way.
- Remove unnecessary words, repeated greetings and long links.
- Use straight quotes and plain hyphens.
- For OTP and alert messages, stay well inside one segment.
- If you must use a regional language, aim for under 70 characters per single message, or accept two segments.
- Split a promotion into a short SMS with a link rather than a long text.

For choosing the right channel for each type of message, see our comparison of [SMS, WhatsApp and RCS]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}). To track the cost per result, read [how to measure SMS and WhatsApp campaign results]({{ '/2026/12/07/measure-sms-whatsapp-campaign-results-delivery-clicks-cost-per-outcome/' | relative_url }}).

## SMS length checklist

- ✅ The message is written in a plain-text editor
- ✅ It uses only GSM-7 characters, unless you chose Unicode on purpose
- ✅ Extended characters (such as [ ] { } ^ ~ | and the euro sign) are counted as two
- ✅ The message fits in 160 characters, or you know how many segments it will use
- ✅ Variable values are tested at their longest
- ✅ No emoji, curly quote or hidden symbol has slipped in
- ✅ Links are short and allowed on your account
- ✅ The text matches your registered DLT template
- ✅ The delivery report matches the segments you expected

## Common mistakes

- **Pasting text from a document.** Curly quotes and dashes can switch the message to Unicode.
- **Adding one emoji** to an SMS and sending it to your full list.
- **Testing with short sample values,** then seeing longer messages in production.
- **Counting by eye.** Extended characters and emojis count as two.
- **Ignoring segments in the budget.** Cost depends on segments, not on the number of messages.

## FAQ

**Is there a limit to the number of segments?**
Platforms usually allow a maximum number of segments per message, and the limit depends on the provider and network. Very long messages are costly and may be rejected, so keep them short.

**Do the parts of a long SMS always arrive in order?**
Phones put the parts back together using the header in each part, so the message normally displays as a single text. If a part is lost, the customer may see a partial message.

**Does a space count as a character?**
Yes. Spaces, punctuation and line breaks all count.

**Can I send Hindi in GSM-7?**
No. Hindi and other Indian scripts need Unicode (UCS-2), so the limit is 70 characters per single message and 67 per part in longer messages.

**Are WhatsApp and RCS messages counted in segments?**
No. Segments are an SMS concept. WhatsApp and RCS have their own pricing models. See our [RCS business messaging guide]({{ '/2026/12/06/rcs-business-messaging-india-2026-who-supports-it-how-to-start/' | relative_url }}).

{% include lead-form.html topic="telecom" %}

## Further reading

- Your messaging provider's documentation on encoding, segments and billing
- Technical standards for SMS, for the full GSM character set (you can search for the GSM 03.38 character table)

*This guide is for general information. Character limits are widely used, but some providers and networks handle long messages differently, so confirm billing rules with your provider.*
