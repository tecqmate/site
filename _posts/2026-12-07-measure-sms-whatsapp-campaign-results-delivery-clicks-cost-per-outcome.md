---
layout: post
title: "Measure SMS and WhatsApp Campaign Results"
h1: "How to Measure SMS and WhatsApp Campaign Results: Delivery, Clicks and Cost per Outcome"
description: "Learn which numbers matter for business messaging campaigns in India, how to track them, what a healthy delivery report looks like, and how to compare..."
date: 2026-12-07
tags: ["sms", "whatsapp", "campaign-analytics", "business-messaging", "telecom", "marketing"]
topic: telecom
read_mins: 8
audience: "Marketers, product teams and business owners running SMS or WhatsApp campaigns for customers in India"
image: "/assets/images/topics/telecom-card.png"
---

Most teams measure messaging by one number: how many messages were sent. That number says very little. A campaign can send 100,000 messages, deliver 80,000, get 2,000 clicks and produce 40 orders, and each of those figures tells you something different.

This guide explains which numbers to track, how to track them properly and how to compare SMS, WhatsApp and other channels fairly.

## Quick answer

Track the full funnel: **submitted, delivered, read or opened, clicked or replied, converted**. Then calculate **cost per outcome** (an order, booking or lead), not cost per message. Use unique tracking links and a control group, and compare channels on the same audience and message.

## The messaging funnel

| Stage | What it means | Where to see it |
| --- | --- | --- |
| Submitted | Your system sent the message to the provider | Provider dashboard or API |
| Delivered | The message reached the customer's phone or app | Delivery report |
| Read or seen | The customer opened it (not always available) | WhatsApp status, some RCS reports |
| Clicked or replied | The customer took an action in the message | Link tracking, reply logs |
| Converted | The customer did what you wanted: order, booking, sign-up | Your website, app or CRM |
| Unsubscribed or complained | The customer opted out or reported the message | Opt-out logs, complaint data |


A drop at any stage points to a different problem: delivery issues, weak message content, a poor offer or a broken landing page.

## The key metrics

### Delivery rate

Delivered messages divided by submitted messages.

**What to watch:** a low rate can point to template mismatches, outdated numbers, DND or consent issues, or provider route problems. Check delivery by operator and by day, not just the average. See our guide on [OTP SMS not being delivered]({{ '/2026/11/21/otp-sms-not-delivered-india-causes-fixes/' | relative_url }}) for common causes.

**Caution:** "accepted" or "submitted" is not the same as "delivered". Make sure your report shows the final status and the failure reason.

### Read rate (WhatsApp and some RCS)

Read messages divided by delivered messages. SMS does not give reliable read data, and customers can turn off read receipts on some apps, so treat it as a rough guide.

### Click-through rate (CTR)

Clicks divided by delivered messages. Use a unique tracking link per campaign, and ideally per channel.

**Caution:** some security tools and link previews can open links automatically, which can inflate clicks. Compare with landing page visits and conversions.

### Reply rate

Replies divided by delivered messages. This is useful for WhatsApp, RCS and conversational flows.

### Conversion rate

Customers who completed your goal divided by delivered messages (or by clicks, for landing page performance). Define "conversion" before the campaign starts.

### Opt-out and complaint rate

Opt-outs and complaints divided by delivered messages. A rising rate means your messages are too frequent, badly targeted or sent without proper consent. Review our guide on [consent for SMS and WhatsApp]({{ '/2026/11/30/customer-consent-sms-whatsapp-india-trai-dlt-dpdp/' | relative_url }}).

### Cost per outcome

Total campaign cost divided by the number of outcomes (orders, bookings, qualified leads).

Include all costs: message charges, any platform fees, creative work, discounts given and fallback messages. This is the number to use when you compare channels.

## Why cost per message is misleading

| Channel | Cost per message | Delivered | Outcomes | Cost per outcome |
| --- | --- | --- | --- | --- |
| Channel A | Lower | Lower share | Few | Can be higher |
| Channel B | Higher | Higher share | More | Can be lower |

A cheaper message that fewer people see or act on can cost more per order. Always compare channels by the end result.

## How to track properly

1. **Use unique tracking links.** Add a campaign name, channel and date to each link, so your analytics tool can tell sources apart.
2. **Keep a control group.** Hold back a small, random group that does not receive the message, and compare their behaviour. This shows what the message actually caused.
3. **Test one thing at a time.** Change the message, the time or the offer, but not all together.
4. **Segment your results.** Compare new and returning customers, cities, operators and devices.
5. **Record the context.** Note the sale, holiday or product change during the campaign, since these affect results.
6. **Review failures.** Study the reasons for undelivered messages, and clean your list.
7. **Compare over time.** One campaign shows little. A month of campaigns shows patterns.

## Tips for SMS and WhatsApp specifically

**SMS**
- Keep the message short and put the main point first.
- Test sending time. Business hours and evening often differ.
- Use one clear link and one call to action.
- Respect opt-outs immediately.

**WhatsApp**
- Match the template category to the purpose. See our guide on [why WhatsApp templates get rejected]({{ '/2026/11/27/whatsapp-template-rejected-reasons-and-fixes/' | relative_url }}).
- Use buttons for quick replies, so the response is easy to track.
- Watch for blocks and reports, since too many can lead to lower sending limits or other restrictions.
- Track conversations as well as messages, because pricing and customer behaviour work in conversations.

**RCS**
- Compare reach and response with SMS on a small pilot. See our guide on [RCS business messaging in India]({{ '/2026/12/06/rcs-business-messaging-india-2026-who-supports-it-how-to-start/' | relative_url }}).

## A simple reporting template

Report each campaign on one page:

| Item | Example entry |
| --- | --- |
| Campaign and goal | Festive offer, increase repeat orders |
| Channel and audience | WhatsApp, past customers who opted in |
| Message and offer | Short text, one button, one code |
| Date and time | Weekday evening |
| Submitted and delivered | Counts and delivery rate |
| Clicks or replies | Counts and rates |
| Conversions | Orders or bookings, with value |
| Opt-outs and complaints | Counts and rates |
| Total cost | Messages, tools, discounts |
| Cost per outcome | Total cost divided by outcomes |
| What we learned | One or two lines |

## Measurement checklist

- ✅ A clear goal and a definition of conversion are set before the campaign starts
- ✅ Delivery reports show final status and failure reasons
- ✅ Each link has a unique tracking tag
- ✅ A random control group is held back
- ✅ Opt-outs and complaints are counted and reviewed
- ✅ All costs are included in the cost per outcome
- ✅ Channels are compared on the same audience and message
- ✅ Results are saved in a simple report for each campaign
- ✅ Findings change the next campaign

## Common mistakes

- **Celebrating "messages sent".** Sent is not delivered, and delivered is not read.
- **Comparing channels by price per message only.**
- **Ignoring opt-outs and complaints.** They are an early warning for deliverability and reputation.
- **No tracking links.** Without them you cannot tell which channel worked.
- **Changing many things at once.** You will not know what made the difference.
- **Measuring on a single campaign.** Patterns appear over several.

## FAQ

**What is a good delivery rate?**
It depends on message type, list quality and route. Rather than aiming at a general number, compare your own results over time and by operator, and investigate drops.

**What is a good click-through rate?**
It varies by industry, offer and audience. Use your own past campaigns as the benchmark, and test improvements.

**Can I measure WhatsApp reads?**
Yes, in many cases, but customers can turn off read receipts, so treat it as an estimate.

**How big should the control group be?**
Large enough to be meaningful for your audience size. A small, random group is common. If you are not sure, ask your analyst or provider.

**Which provider features help with measurement?**
Delivery reports with reasons, webhooks, link tracking and exportable logs. See our [checklist for choosing a CPaaS or SMS provider]({{ '/2026/11/24/how-to-choose-cpaas-sms-provider-india-checklist/' | relative_url }}).

*This guide is for general information. Metrics, reports and features differ by provider and channel, so check how your own tools define each number.*
