---
layout: post
title: "How to Accept Online Payments in Angola: Multicaixa Express, the Online Gateway and Mobile Money"
description: "Angola's online shopping is growing fast, but most people still pay through local rails rather than international cards. Learn how Multicaixa Express, payment by reference, the Multicaixa online payments gateway and mobile money fit into an online store, and how to get started."
date: 2026-12-17
tags: ["angola", "e-commerce", "online-payments", "multicaixa-express", "payment-gateway", "africa", "website-development", "software"]
topic: software
read_mins: 8
audience: "Businesses and developers building or planning an online store or digital service for customers in Angola"
---

If you plan to sell online in Angola, the first question is not which website platform to use. It is **how customers will pay**. Angola is largely a cash and local-payments economy, and many shoppers do not use international cards online. A store that only accepts Visa or Mastercard will miss a large part of the market.

This guide explains the main payment options in Angola, how the Multicaixa online payments gateway works in general terms, and how to plan an online store that Angolan customers can actually pay on.

*This guide is general information. Banking, tax and payment rules differ by business and change over time. Confirm the details with your bank, a certified payment provider and a local adviser.*

## Quick answer

Plan around **local payment methods first**: Multicaixa Express (mobile app payments), Multicaixa payment by reference, and, where relevant, mobile money. You usually connect these through your business bank's **Gateway de Pagamentos Online (GPO)** or through a local payment aggregator that offers one API for several methods. Build the store in **Portuguese**, price in **kwanzas (AOA)**, and plan delivery through **local couriers**.

## Why this is worth planning for now

Several recent figures from Angolan media show how quickly online payments are moving:

- Reported figures show Multicaixa Express handling a larger value of transactions than ATMs and card terminals combined, up to the third quarter of 2026.
- Online purchases on the Multicaixa network were reported to have grown by 72% in the first half of 2026, reaching about 110 billion kwanzas.
- The same reporting suggested that online spending could reach roughly 220 billion kwanzas by the end of 2026, against about 144 billion in 2025.

Online shopping is still small compared with total spending, and the economy remains heavily cash-based, so treat these as signs of a growing market, not as a guarantee of sales. The US Commercial Service's country guide describes the same picture: e-commerce is limited but growing, payments are made mainly by Multicaixa debit cards, bank transfer and digital wallets, and delivery is by local couriers because the postal system is unreliable.

## The main payment methods

| Method | How it works | Notes for merchants |
| --- | --- | --- |
| Multicaixa Express | Customers pay from their mobile banking app, often by confirming a payment request or scanning a code | Widely used, familiar to customers. Connected to online stores through the gateway |
| Payment by reference | The store generates a payment reference, and the customer pays it at an ATM, in home banking or in the app | Popular for online purchases. Orders are confirmed once payment is received, often through a callback |
| Multicaixa debit cards | Card payments through the Multicaixa network | Common domestically. Works through the gateway |
| Mobile money and wallets | Payments from mobile network wallets and other digital wallets | A growing channel. Availability depends on the provider you integrate with |
| Bank transfer | The customer transfers the money to your account | Useful for larger orders, but slower to confirm |
| International cards | Visa and Mastercard | Useful for foreign customers, but not the main route for most Angolan shoppers |
{: .table .table-sm .table-bordered .table-striped }

## How the Multicaixa online gateway works

The **Gateway de Pagamentos Online (GPO)** is the Multicaixa service that lets online merchants confirm payments from Multicaixa Express and related methods. In general terms:

1. **Your business needs a bank account** with a bank that offers the gateway.
2. **You apply through your bank,** usually with a merchant adhesion form and company details such as your name, tax number (NIF), activity code and account details.
3. **You choose an integration method,** typically an embedded payment page (iframe) or an API, as described in the bank's documentation.
4. **Your developer integrates and tests.** Integrations are generally expected to use components certified by the payments operator, and merchants go through testing and certification before going live.
5. **You go live,** and payments settle in kwanzas.

Fees are set by the merchant's bank or payment service provider, not by one central price, so ask for a written quote. Several Angolan banks publish a merchant application form, and requirements may differ from one bank to another.

## Three ways to integrate

| Route | What it means | Often suits |
| --- | --- | --- |
| Directly through your bank's gateway | You integrate the gateway yourself, or with a developer | Larger stores with a development team |
| Through a local payment aggregator | One API that covers several methods, such as Multicaixa Express, mobile money and payment by reference | Stores that want several methods without separate integrations |
| Through a ready-made plug-in | Plug-ins exist for some store platforms, including one for payment by reference on WooCommerce | Small stores, with a standard store platform |
{: .table .table-sm .table-bordered .table-striped }

Whatever you choose, test the whole payment journey with real small payments, and make sure that orders update automatically when a payment is confirmed.

## Setting up the business side

Requirements depend on your business type, so ask a local adviser. In general, an Angolan business expects to deal with:

- A **NIF** (tax identification number)
- Registration with the **Commercial Registry**, and, for some steps, the one-stop business registration service
- A **business bank account**, which also gives you access to the payment gateway
- Compliance with local tax and consumer rules

If you are a foreign business selling into Angola, check how customs, currency and tax rules apply to your products.

## Designing the store for Angolan customers

- **Language:** build the shop in Portuguese. Poor or machine-translated text lowers trust.
- **Currency:** show prices in kwanzas (AOA), and be clear about delivery fees.
- **Mobile first:** most people reach the internet from a phone, so the store must be fast and simple on mobile.
- **Payment choices:** offer local methods first, at checkout, with clear instructions for payment by reference.
- **Confirmation:** show a confirmation page, and send an SMS or WhatsApp message with the order and payment status.
- **Delivery:** be clear about areas, timing and who delivers. Many shops use local couriers.
- **Support:** offer a phone or WhatsApp number that gets answered. Many first-time online buyers want reassurance.
- **Trust:** show your company details, address and returns policy.

If you plan to message customers by SMS or WhatsApp, see our guides on [SMS vs WhatsApp vs RCS]({{ '/2026/11/16/sms-vs-whatsapp-vs-rcs-business-messaging-india/' | relative_url }}) and [choosing a messaging provider]({{ '/2026/11/24/how-to-choose-cpaas-sms-provider-india-checklist/' | relative_url }}). Rules in Angola differ from India, so check local requirements.

## Choosing what to build

If you are deciding between a website, a web app and a mobile app, our guide on [web app vs mobile app vs PWA]({{ '/2026/12/05/web-app-vs-mobile-app-vs-pwa-what-to-build-first/' | relative_url }}) can help. For budgeting, read [what drives the cost of a business website]({{ '/2026/11/20/what-drives-the-cost-of-a-business-website-2026/' | relative_url }}). Plan for ongoing care too: see [website maintenance plans]({{ '/2026/12/02/website-maintenance-plans-what-is-included-how-to-choose/' | relative_url }}).

## Online payments checklist for Angola

- ✅ Local payment methods are offered first, before international cards
- ✅ You have a business bank account that offers the online payments gateway
- ✅ Your NIF and company registration details are ready
- ✅ You have a written quote for gateway fees and settlement terms
- ✅ The integration route is chosen: bank gateway, aggregator or plug-in
- ✅ The full payment flow is tested, including failed and abandoned payments
- ✅ Orders update automatically when payment is confirmed
- ✅ The store is in Portuguese and shows prices in kwanzas
- ✅ Delivery areas, fees and times are shown clearly
- ✅ Customers can reach a person for support

## Common mistakes

- **Building around international cards only.**
- **Not testing payment by reference,** where orders must be confirmed after the customer pays elsewhere.
- **Leaving payment status manual.** Orders get stuck, and customers lose trust.
- **A store that is not translated well.**
- **Ignoring delivery.** A smooth checkout is wasted if the order does not arrive.
- **Starting without a bank conversation.** Gateway approval can take time, so start early.

## FAQ

**Do I need a company to accept Multicaixa online?**
Payment gateways are normally offered to registered businesses with a bank account, and some banks have forms for small businesses and sole traders. Ask your bank about the exact requirements.

**Can I accept Multicaixa from outside Angola?**
Connecting to the gateway normally goes through an Angolan bank or a certified payment provider, so foreign businesses usually work with a local partner or aggregator.

**Are online purchases common in Angola?**
They are growing quickly, but still a small share of total spending. Many people also buy through social media and messaging channels. Use these figures as a guide to direction, not as a forecast.

**Should I also offer cash on delivery?**
It is used in some markets, but it brings risks of refused orders and cash handling. Decide based on your product and delivery model.

**Will you publish this guide in Portuguese?**
We are starting in English and will add Portuguese once we see which topics Angolan readers find most useful.

{% include lead-form.html topic="software" title="Building an online store for Angola?" text="Tell us about your product and how customers will pay, and we will help you plan the build." %}

## Sources and further reading

- U.S. International Trade Administration, [Angola Country Commercial Guide: eCommerce](https://www.trade.gov/country-commercial-guides/angola-ecommerce)
- Expansão, [E-commerce cresce 72% para 110 mil milhões Kz à boleia da expansão digital](https://expansao.co.ao/angola/detalhe/e-commerce-cresce-72-para-110-mil-milhoes-kz-a-boleia-da-expansao-digital-73724.html) (first half of 2026)
- Expansão, [Express já movimenta mais dinheiro que ATM e TPA juntos](https://expansao.co.ao/angola/detalhe/express-ja-movimenta-mais-dinheiro-que-atm-e-tpa-juntos-75758.html) (to the third quarter of 2026)
- Your bank's merchant services team, for the current process to join the Gateway de Pagamentos Online

*This guide is for general information and is not legal, tax or financial advice. Payment services, fees and rules change. Confirm the details with your bank, a certified provider and a local adviser.*
