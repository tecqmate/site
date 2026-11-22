---
layout: post
title: "SMS Character Count and Segments"
h1: "How to Calculate SMS Character Count and Message Segments in Web Applications"
description: "A developer guide on building SMS character counters, handling GSM-7 vs. Unicode encoding rules, and preventing unexpected multi-segment delivery costs."
date: 2027-01-11
topic: telecom
tags: ["development", "sms-tools", "web-tools"]
read_mins: 5
audience: Full-Stack Developers, Mobile Messaging Engineers, SMS Marketing Platform Builders
image: "/assets/images/topics/telecom-card.png"
---
## Preventing Surprise SMS Billing Overages

When building web-based texting platforms, customer notification systems, or SMS marketing tools, a seemingly harmless message can easily double or triple in carrier cost if it crosses character thresholds. Understanding how telecommunication gateways segment text messages is essential for accurate budgeting and UI feedback.

Implementing client-side character counters with real-time encoding detection gives your users instant feedback on message length, segment splits, and encoding shifts.

---

## GSM-7 vs. Unicode Encoding Triggers
* **What is the problem?** Developers often assume every text message allows a standard 160 characters, failing to account for how emojis or special characters switch encoding standards.
* **Why does it happen?** Standard GSM-7 encoding fits 160 characters per single message. However, the introduction of a single Unicode character (such as an emoji, smart quote, or non-Latin script) forces the entire message into 16-bit UCS-2/Unicode encoding, slashing the single-message limit down to 70 characters.

---

## The SMS Encoding & Segmentation Matrix

When building validation scripts or UI character counters, calculate message segments according to standard carrier rules:

| Encoding Type | Single SMS Limit | Multipart Segment Limit | Key Triggers / Characteristics |
| :--- | :--- | :--- | :--- |
| **GSM-7 (Standard)** | 160 characters | 153 characters per segment | Standard Latin alphabet, numbers, basic punctuation (`@`, `$`, `_`). |
| **Unicode (UCS-2)** | 70 characters | 67 characters per segment | Emojis, accented letters, Cyrillic/Asian scripts, smart quotes (`“`, `”`, `‘`, `’`). |
| **Extended GSM-7** | Varies (counted as 2) | Varies | Characters like `^`, `{`, `}`, `[`, `]`, `~`, `\|`, `€` consume two character slots. |

---

## A JavaScript SMS Counter Implementation

Here is a clean, [client-side utility]({{'/sms-count' | relative_url}}) to compute character counts, detect encoding types, and determine total message parts for your web applications. Paste a few real drafts into it and compare the result with the segment count your SMS provider reports in its logs; the two should agree for ordinary text.

The counter is not measuring "characters" the way a word processor does. It measures how many 7-bit or 16-bit slots the text needs after encoding, plus the overhead needed to reassemble multiple parts. A short-looking draft can still be billed as two SMS.

## Quick answer

* Keep ordinary Latin-text messages within the **160-character** GSM-7 single-segment limit.
* If the message must be split, each GSM-7 part holds **153 characters** because a concatenation header uses some of the payload.
* Add one emoji, smart quote, or non-Latin script character and the whole message usually falls into the **70-character / 67-character per part** Unicode bucket.
* Count the segments, not just the characters: cost, rate-limit consumption, and gateway throughput are all based on parts delivered.
* Always confirm how your specific provider counts text, because gateway implementations and local filtering can differ from textbook rules.

## Why multipart messages lose capacity

When a message spans several parts, each part must tell the phone which message it belongs to and its sequence number. That reassembly information sits in a User Data Header (UDH), leaving less room for text. Hence the drop from 160 to 153 for GSM-7 and from 70 to 67 for Unicode.

Extended GSM-7 characters also matter: braces, brackets, the euro sign, and the vertical bar use two slots each. A CMS that silently inserts smart quotes or decorative dashes can flip an entire template into Unicode, so check generated text before counting.

## A step-by-step workflow for your app

1. **Normalise the draft.** Decide whether you store user text as typed or convert typographic quotes to plain ASCII before counting. Document the choice so the counter and the sender agree.
2. **Scan for encoding triggers.** Walk the string and flag any character that is not in the GSM-7 alphabet. If one exists, treat the whole message as Unicode rather than mixing alphabets.
3. **Weight extended characters.** If the message is GSM-7, add an extra slot for each extended character. Do not stop at a raw string length.
4. **Count code units carefully.** In JavaScript, `.length` counts UTF-16 code units, which is often close to the 16-bit slot count used for Unicode SMS, but it is not the same as counting visible characters. Use an explicit, tested rule and cover emoji in your tests.
5. **Apply the threshold.** Use 160/70 for a single part and 153/67 per part once the message exceeds the single-part limit. Round the segment count up.
6. **Show the result before sending.** Display the encoding, slots used, parts, and remaining characters in the composer. A quiet warning at 150 characters is far more useful than a rejected API request.
7. **Reconcile after sending.** Compare your predicted segments with the provider's billing or delivery records and investigate any mismatch.

## Worked examples to test

| Draft type | What to check | Likely outcome |
| :--- | :--- | :--- |
| Short OTP such as "Your code is 482913" | Plain digits and spaces only | One GSM-7 segment, far below the limit |
| Marketing copy with a curly apostrophe | Typographic punctuation inserted by an editor | Unicode encoding and a much smaller per-part capacity |
| Tamil, Arabic, or Chinese text | Non-Latin script | Unicode encoding from the first character |
| Message with several emoji | Surrogate pairs and repeated symbols | Slot count rises faster than visible character count |
| Template with `{name}` placeholders | Braces are extended GSM-7 characters | Two slots per brace pair member; test after substitution |

## Common mistakes

| Mistake | Consequence | Better approach |
| :--- | :--- | :--- |
| Counting characters but ignoring encoding | Under-budgeted campaigns and surprised users | Detect encoding before computing segments |
| Testing only English ASCII | Templates break when translated | Add non-Latin and emoji cases to your test suite |
| Forgetting to recount after template merge | Final message differs from the preview | Count the fully rendered payload at send time |
| Treating all provider gateways as identical | Preview disagrees with the invoice | Validate against a real sandbox or test number |
| Splitting long text yourself | Words or emoji broken across parts | Let the gateway or a tested library handle concatenation |

## FAQ

**Why did one emoji double my segment count?**
Because a single character outside GSM-7 forces the entire message into Unicode, reducing capacity for every other character too.

**Is 153 characters always safe for a two-part message?**
Only for GSM-7 text with no extended characters. Unicode parts use a different per-segment limit, and extended GSM-7 characters consume two slots each.

**Should I warn users or truncate their text?**
Warn first. Silent truncation can cut off a code, link, or legal line. If you must truncate, do it at a word boundary and show exactly what was removed.

**Do delivery reports tell me the segment count?**
Usually your provider's submit or billing log does. Delivery reports normally confirm receipt, not how the text was encoded.

## Next steps

Add a counter to your composer, then test it with a small set of real messages from each language and template family you support. If you are deciding where SMS fits alongside other channels, compare the options in our [SMS vs WhatsApp vs RCS guide]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}). For codes that never arrive, the [OTP delivery troubleshooting guide]({{ '/2026/11/21/otp-sms-not-delivered-india-causes-fixes/' | relative_url }}) covers causes beyond character counting, and the [campaign measurement guide]({{ '/2026/12/07/measure-sms-whatsapp-campaign-results-delivery-clicks-cost-per-outcome/' | relative_url }}) explains how to track the cost per outcome once segments are correct.
