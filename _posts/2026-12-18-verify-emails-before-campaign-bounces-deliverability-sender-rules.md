---
layout: post
title: "How to Verify Emails Before a Campaign: Bounces, Deliverability and the Sender Rules That Matter in 2026"
description: "Sending to a bad email list damages your sender reputation. Learn what email verification can and cannot check, how to read the results, which Gmail, Yahoo and Outlook sender rules apply, and a pre-send checklist."
date: 2026-12-18
tags: ["email-verification", "email-deliverability", "bounce-rate", "spf-dkim-dmarc", "email-marketing", "tools"]
topic: tools
read_mins: 8
audience: "Marketers, founders and developers who send email campaigns or transactional email and want to protect their sender reputation"
---

A bad email list is expensive in a quiet way. Invalid addresses bounce, bounces hurt your sender reputation, and a damaged reputation sends even your good emails to the spam folder. By the time you notice, replies and sales have already dropped.

Verifying addresses **before** you send is the cheapest fix. This guide explains what verification checks, what it cannot do, how to read the results and which inbox-provider rules matter now. For the basics of hard and soft bounces, see our earlier guide on [verifying email addresses and preventing bounces]({{ '/2027/01/10/how-to-verify-email-addresses-and-prevent-bounces/' | relative_url }}).

## Quick answer

Before a campaign, **clean the list** (syntax, domain, disposable and role addresses, known typos), **verify the rest** with a reliable checker, and **separate risky addresses** instead of mailing them with everyone else. Then confirm that your domain is **authenticated** (SPF, DKIM, DMARC), that marketing emails have **one-click unsubscribe**, and that you only send to people who **agreed** to hear from you. Verification protects your reputation. It does not replace consent.

## What email verification checks

| Check | What it looks for | What it catches |
| --- | --- | --- |
| Syntax | Is the format valid, with an `@` and an allowed domain format? | Typing errors such as missing characters or spaces |
| Domain and mail server | Does the domain exist and accept email (MX records)? | Dead or made-up domains |
| Common typos | Does the domain look like a misspelling of a popular one? | Entries like `gmial.com` |
| Disposable addresses | Is it from a temporary-email service? | Throwaway sign-ups |
| Role accounts | Is it a shared inbox such as `info@` or `sales@`? | Low-engagement or high-complaint addresses |
| Mailbox check | Does the mail server say that this mailbox exists? | Closed or non-existent mailboxes, where servers answer honestly |

You can test single addresses with our free [email verification tool]({{ '/verify-email/' | relative_url }}).

## What verification cannot do

- **It cannot confirm that a person wants your email.** Only consent does that.
- **It cannot be fully certain.** Some mail servers accept every address and bounce later (called catch-all), some delay answers, and some do not reveal whether a mailbox exists.
- **It cannot tell you whether the person will read, click or complain.**
- **A "valid" result today may be wrong later.** People change jobs and close accounts, so lists age.

## How to read the results

Verification services usually sort addresses into groups. Names differ, but the logic is similar:

| Result | Meaning | What to do |
| --- | --- | --- |
| Valid | The address looks real and the server accepts it | Safe to send, if you have consent |
| Invalid | The address or domain does not exist | Remove it |
| Risky or catch-all | The server accepts everything, or the address is a role account or disposable | Send carefully, in a small separate batch, or exclude it |
| Unknown | The server did not give a clear answer | Treat as risky, and retest later |

## Why bounces matter to your reputation

- A **hard bounce** means the address cannot receive email, for example because it does not exist. Remove it straight away.
- A **soft bounce** is a temporary problem, such as a full mailbox. Retry a few times, then stop.
- Sending again and again to dead addresses tells inbox providers that you do not look after your list. That is one of the signals that harms deliverability.
- Old, unengaged addresses and spam traps can damage your reputation too, which verification may not detect.

## The sender rules that matter now

Since 2024, large inbox providers have set stricter rules for businesses that send a lot of email. According to Google and Yahoo's guidance, and to deliverability guides that summarise it:

| Requirement | What it means |
| --- | --- |
| Bulk sender threshold | Roughly 5,000 or more messages a day to Gmail or Yahoo addresses. Providers describe this status as lasting, so prepare early |
| Authentication | Set up SPF and DKIM. Bulk senders also need a DMARC record, with at least a policy of none, and the From domain aligned with SPF or DKIM |
| One-click unsubscribe | Marketing and subscribed messages need a one-click unsubscribe option, with requests processed within about two days. Transactional messages, such as receipts and password resets, are generally exempt from this |
| Spam complaint rate | Keep reported spam rates below 0.3%, and aim for under 0.1%. At 1,000 messages, three complaints reach 0.3% |
| Other technical points | Valid reverse DNS (PTR) records, a properly formatted message and encrypted transport |

Microsoft has also tightened rules for large senders to Outlook.com, Hotmail and Live addresses, and expects SPF, DKIM and DMARC. Apple's iCloud Mail has its own expectations too. These rules are updated by the providers, so check Google's, Yahoo's and Microsoft's current sender guidelines.

The sensible approach is to follow them even if you send less than 5,000 emails a day. They describe good practice for every sender.

## Consent and the law

Verification answers "does this address work?" The law asks "may you email it?" These are separate questions.

- **UK and EU:** marketing email generally needs consent or a valid exemption, and you must make unsubscribing easy.
- **US:** the CAN-SPAM Act sets rules for commercial email, including a working unsubscribe and an accurate sender identity.
- **India:** the Digital Personal Data Protection Act asks for clear notice and consent for processing personal data, with phased dates.
- Do not buy or scrape lists. Even a verified address from a purchased list can lead to complaints.

Ask a lawyer to check the rules for your markets.

## A pre-send process you can follow

1. **Collect carefully.** Use clear sign-up forms. Consider **double opt-in**, where the person confirms by clicking a link, to filter out typos and fake sign-ups.
2. **Clean the file.** Remove duplicates, obvious typos, role and disposable addresses you do not want.
3. **Verify** the remaining addresses, and split them into valid, risky and unknown.
4. **Warm up** if you are a new sender or have a new domain. Start with small batches to your most engaged contacts, then increase gradually.
5. **Authenticate** your domain with SPF, DKIM and DMARC, and test it.
6. **Add one-click unsubscribe** and a visible unsubscribe link to marketing emails.
7. **Send to a small test group** and check bounces and complaints.
8. **Monitor** after sending: bounces, complaints, opens and replies. Tools from the inbox providers, such as Google Postmaster Tools, show your reputation at Gmail.
9. **Clean up afterwards.** Remove hard bounces and complainers immediately, and stop mailing contacts who have not engaged for a long time.

## Pre-send checklist

- ✅ Every address on the list came from a person who agreed to receive your emails
- ✅ Duplicates, typos, disposable and unwanted role addresses are removed
- ✅ The list has been verified, and risky addresses are separated
- ✅ SPF and DKIM pass, and DMARC is published
- ✅ The From domain is aligned with your authentication
- ✅ Marketing emails include one-click and visible unsubscribe options
- ✅ You have a plan to process unsubscribes within two days
- ✅ New senders warm up gradually
- ✅ A small test batch was sent and checked before the full send
- ✅ Spam complaints and bounces are monitored after each send

## Common mistakes

- **Skipping verification on an old list** and mailing it all at once.
- **Treating "valid" as "consented".**
- **Mailing catch-all and risky addresses** with the rest.
- **Not authenticating the domain.**
- **Burying the unsubscribe link,** which drives complaints.
- **Never removing bounces and inactive contacts.**
- **Sending a big campaign from a new domain** without warming up.

## FAQ

**How often should I verify my list?**
Verify new addresses when they join, and re-check older lists before a big campaign. Lists decay over time.

**Is email verification 100% accurate?**
No. Catch-all and non-responding servers make some results uncertain. Use the "risky" and "unknown" groups with care.

**Should I verify transactional email addresses?**
Yes, at sign-up. A typo in an address means the customer never receives their receipt or password reset.

**What bounce rate is acceptable?**
There is no single official number. Keep it as low as you can, remove hard bounces after each send and watch for sudden increases.

**Does verification help with spam traps?**
Only partly. Some traps look like normal addresses. Good list collection and removing inactive contacts matter more.

## Sources and further reading

- Google, Yahoo and Microsoft sender guidelines for bulk senders, on their official support and sender pages
- Your email platform's deliverability documentation on SPF, DKIM, DMARC and one-click unsubscribe

*This guide is for general information. Inbox provider rules, thresholds and enforcement change, so check the current official guidelines and take legal advice on consent in your markets.*
