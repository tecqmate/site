---
layout: home
title: "Privacy Policy"
description: "How Tecqmate collects, uses, and shares information when you read our guides, use our free tools, or send us a message or requirement."
permalink: /privacy/
---
{%- assign contact_page = site.pages | where: "path", "contact.md" | first -%}
{%- assign disclaimer_page = site.pages | where: "path", "disclaimer.md" | first -%}

*Last updated: November 16, 2026*

This policy explains what information Tecqmate ("we", "us") collects through this website, why we collect it, and the choices you have. By using the site you agree to this policy.

### 1. Information we collect
**Information you give us.** When you submit a contact message, partnership enquiry, or requirement form, we collect the details you enter: your name, email address, phone number (if you provide one), and the message or requirement you write. We also record which page and topic the form was sent from.

**Information collected automatically.** Like most websites, the servers that deliver this site may log technical data such as IP address, browser type, device, pages visited, and time of visit. This site is hosted on GitHub Pages, and GitHub handles that data under its own privacy statement. If we use analytics tools, they may collect similar usage data.

**Free tools.** We do not ask you to create an account to use our tools. Please do not enter passwords, financial details, or other confidential information into any online tool unless you have confirmed how it is processed.

### 2. How we use information
* To reply to your messages and enquiries.
* To understand your requirement and suggest suitable service providers.
* To keep the site secure, prevent spam, and fix problems.
* To understand which guides are useful and improve them.
* To keep records and meet legal obligations.

### 3. Sharing information
* **Service providers for your requirement.** If you submit a requirement form and tick the consent box, we may share your details with relevant service providers so they can respond to your requirement. We may receive a fee or commission from a provider when this happens. We share only what is needed for your enquiry.
* **Our own service providers.** We use third-party services to receive form submissions, host the site, and deliver scripts (for example a content delivery network for the site search). These providers process data on our behalf.
* **Legal reasons.** We may disclose information if required by law or to protect our rights and users.

We do not publish your details on the website.

### 4. Cookies and third-party links
This site can be read without creating an account. Third-party services we use or link to (such as analytics, advertising, embedded content, and affiliate partners) may set their own cookies or collect data under their own policies. When you click an affiliate link, the partner's website may place cookies on your device so a purchase can be credited to us. You can block or delete cookies in your browser settings.

### 5. How long we keep information
We keep enquiry details only for as long as needed to handle your request and for a reasonable period afterward for our records, unless the law requires a longer period. You can ask us to delete your details at any time (see section 6).

### 6. Your choices and rights
You can contact us to ask to access, correct, or delete the personal information we hold about you, to withdraw your consent to share it, or to raise a complaint about how it is handled. We will respond within a reasonable time. Withdrawing consent does not affect processing that already happened.

### 7. Children
This site is not directed at children under 18, and we do not knowingly collect personal information from them. If you believe a child has sent us information, please contact us so we can remove it.

### 8. Security
We take reasonable steps to protect the information you send us. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.

### 9. Changes to this policy
We may update this policy from time to time. The date at the top shows the latest revision.

### 10. Contact and grievances
For privacy questions, requests, or complaints, write to us at [{{site.email}}](mailto:{{site.email}}){% if contact_page %} or use our [contact page]({{ contact_page.url | relative_url }}){% endif %}. {% if disclaimer_page %}See also our [disclaimer and terms of use]({{ disclaimer_page.url | relative_url }}).{% endif %}