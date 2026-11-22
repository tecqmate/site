---
layout: post
title: "OTP SMS Not Delivered in India? 9 Common Causes"
h1: "OTP SMS Not Delivered in India? 9 Common Causes and How to Fix Them"
description: "OTP messages in India fail silently more often than people expect. Learn the nine most common causes, from template mismatches to chain binding, and how..."
date: 2026-11-21
tags: ["sms", "otp", "dlt", "telecom", "business-messaging"]
topic: telecom
read_mins: 7
audience: "Founders, product managers and developers who send OTPs to Indian mobile numbers"
image: "/assets/images/topics/telecom-card.png"
---

If your users say "I never got the OTP", the problem is rarely the phone. In India, a one-time password passes through several checks before it reaches a handset, and a failure at any one of them can drop the message without an error your team will notice.

This guide lists the nine most common causes, in the order we would check them, and what to do about each.

## Quick answer

Most missing OTPs in India come from a mismatch between what you send and what is registered on the DLT platform: the template text, the Template ID, the sender header or the link between you and your SMS provider. Fix those first. Retry logic, expiry times and a fallback channel come next.

## How an OTP travels (and where it can stop)

1. Your app asks your SMS platform to send a message.
2. The platform submits it to a telecom operator.
3. The operator checks it against your DLT registrations: entity, header and template.
4. If it matches, the message goes to the handset. If not, it is scrubbed (blocked), often without a clear alert to you.

Every cause below is a point where step 3 or the steps around it can go wrong.

## The 9 causes and fixes

### 1. The message text does not match the registered template

This is the most common cause. A template is approved word for word, with placeholders for the variable parts. If your code adds a word, changes punctuation or reorders the sentence, the operator may block it silently.

**Fix:** Store the approved template text in one place and generate every OTP message from it. Do not let developers or marketing edit the wording in code.

### 2. The Template ID is missing or wrong

Each approved template has its own ID, and it normally has to be sent with every request. A missing or incorrect ID is a frequent reason for failure.

**Fix:** Map each message type (login OTP, payment OTP, password reset) to its own Template ID in your configuration, and fail loudly in testing if one is empty.

### 3. The variable does not fit the placeholder

Templates define variable fields. A longer value than expected, or a value with unusual characters, can cause a mismatch.

**Fix:** Keep OTP values to the length you registered, and test with the longest and shortest values you will really send.

### 4. The sender header is not approved for that message type

Headers are registered and tied to a category. Sending a transactional OTP from a header that is not approved for it can fail.

**Fix:** Check in your DLT panel that the header you use is active and linked to the right template.

### 5. The chain between you and your provider is not set up

Under the current traceability rules, the business (the principal entity) and the sending platform (the telemarketer) are expected to be linked on the DLT portal. If that link is missing or was never approved, traffic can be rejected even when everything else looks right.

**Fix:** Confirm in your DLT account that your provider is linked, and that the link is approved. Ask your provider which entity ID they have on record for you.

### 6. Links or numbers inside the message are not whitelisted

If your OTP message includes a URL, callback number or app link, it may need to be registered too. Unregistered links are a common reason for otherwise valid templates being blocked.

**Fix:** The safest OTP has no link at all. If you must include one, register it first.

### 7. Wrong message category

Marketing text inside an OTP, such as "Your OTP is 4821. Also, enjoy 20% off today", can get a message treated as promotional, which has different delivery rules and timing.

**Fix:** Keep OTPs strictly about the code, its purpose and its expiry. Send offers separately, with proper consent.

### 8. Your own retry and expiry logic is working against you

Some OTPs are delivered but arrive too late, or users request a second code and then enter the first one. This feels like non-delivery to the user.

**Fix:**
- Set an expiry long enough for a slow network, and show a clear countdown.
- Rate-limit "resend", and make the resend button wait before it can be tapped again.
- Invalidate older codes when a new one is issued, and tell the user so.

### 9. No fallback when SMS fails

Even a perfect setup will sometimes fail: the phone is out of coverage, roaming, or the operator has a problem.

**Fix:** Offer another route after a failed attempt, such as a voice call OTP, a WhatsApp authentication message, or an in-app prompt, depending on what you have set up. Whichever you choose, it needs its own approvals and consent. See our guide on [SMS vs WhatsApp vs RCS for business in India]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}).

## A 10-minute debugging checklist

Before you change anything, collect three things for one failed message: the exact text sent, the Template ID used and the sender header. Then compare them against your DLT panel.

- ✅ The text is identical to the approved template, apart from the variables
- ✅ The Template ID is correct for this message type
- ✅ The header is active and linked to that template
- ✅ Your SMS provider is linked to your entity and approved
- ✅ No unregistered link or number is in the message
- ✅ The OTP contains no promotional wording
- ✅ Delivery reports show a clear status, not just "submitted"
- ✅ Resend and expiry rules are sensible
- ✅ A fallback route exists

If all nine pass and messages still fail, the issue may be on a specific operator route, so ask for delivery logs by operator.

## Common mistakes to avoid

- **Testing only on your own number.** Test across several operators and a few circles.
- **Treating "accepted" as "delivered".** An API response that says the message was accepted does not confirm that it reached the phone.
- **Changing the template after approval.** Even a small edit means a new approval.
- **Using one template for everything.** Separate templates for login, payments and password resets make debugging far easier.

## FAQ

**Why does my OTP work on some numbers but not others?**
Operator routes and device settings differ. Check delivery reports by operator and test across networks.

**Can I change a few words in an approved template?**
Not safely. Treat approved text as fixed, and apply for a new template when you need a change.

**Do I still need DLT registration if I only send OTPs?**
Yes. OTPs and other service messages also pass through the same registration checks. If you have not completed it, start with our [DLT registration guide]({{ '/2026/11/17/dlt-registration-sms-india-step-by-step/' | relative_url }}).

**How many seconds should an OTP stay valid?**
It depends on your risk level and your users' network quality. Many teams use a few minutes. Confirm any sector rules that apply to you, such as for banking or payments.

**Is SMS OTP secure enough?**
It is widely used, but it is not the strongest option. For high-risk actions, consider adding another factor.

*This guide is for general information. Rules and platform behaviour change, so check the current requirements on your DLT portal and with your telecom provider before you rely on them.*
