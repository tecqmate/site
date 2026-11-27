---
layout: post
title: "Outsourcing Software to India: IP Ownership, NDAs and Data Protection (Contract Checklist for US and UK Buyers)"
description: "Who owns the code you pay for? Under Indian copyright law, an assignment that is silent on duration and territory can default to five years and India only. See the contract clauses that protect IP, confidentiality and personal data, with a checklist for US and UK buyers."
date: 2026-12-24
tags: ["software-outsourcing", "ip-ownership", "nda", "data-protection", "contracts", "india", "uk-gdpr", "software"]
topic: software
read_mins: 9
audience: "Founders and product owners in the US and UK who are hiring a development team in India and want the contract to protect their code, confidential information and customer data"
---

When you pay a developer to build software, it is natural to assume you own it. In law, that is not always so. Ownership of code depends on **what the contract says**, and on the copyright rules of the countries involved. With an Indian vendor, one specific rule catches buyers out more than any other.

This guide explains the key contract points on intellectual property (IP), confidentiality and data protection, and gives you a checklist to take to your lawyer.

*This guide is general information, not legal advice. Contract and IP law differ by country and by case. Have a qualified lawyer in the relevant countries review your agreement.*

## Quick answer

Make sure your contract has a **written, signed IP assignment** that states **what is assigned, for how long (perpetual) and where (worldwide)**, and that IP passes to you on payment. Under Indian copyright law, an assignment that does not state the duration is deemed to last **five years**, and one that does not state the territory is presumed to cover **India only**. Add a clear **NDA**, a **data processing agreement** with a lawful transfer mechanism for personal data, and proof that the vendor's own developers have assigned their rights to the vendor.

## Who owns the code by default?

In many legal systems, the person who writes a work is its first owner unless an exception applies. For software built by a contractor or vendor, that usually means the **developer or vendor owns the copyright** unless it is transferred to you in writing. Typical exceptions, such as work done by employees, do not cover an outside agency.

So it is dangerous to rely on "we paid for it, so it is ours". You need an assignment or a licence written into the contract.

## The India trap: Section 19 of the Copyright Act

India's Copyright Act, 1957 sets rules for assigning copyright. In summary:

| Requirement | What the Act says |
| --- | --- |
| Form | The assignment must be **in writing and signed** by the assignor or an authorised agent |
| Content | It must identify the work, the rights assigned, and the **duration and territorial extent** |
| Default duration | If the period is not stated, it is deemed to be **five years** from the date of assignment |
| Default territory | If the territory is not stated, it is presumed to extend only **within India** |
| Non-use | If the assignee does not exercise the assigned rights within **one year**, the assignment can be deemed to have lapsed, unless the agreement says otherwise |

The Delhi High Court has applied these defaults in a dispute over software developed under a master services agreement. A division bench held that where the duration was not specified, the five-year default applied. Law firm commentary calls this a drafting trap, because buyers who intended a permanent, worldwide transfer may find that their assignment is limited.

**What to do:** state the assignment as **perpetual** and **worldwide** (or "throughout the universe"), cover **all rights**, and say explicitly that the one-year non-use rule does not apply. Ask an Indian-qualified lawyer to review the clause.

## The IP clauses to check

| Clause | What to look for |
| --- | --- |
| Assignment of deliverables | Written, signed assignment of all rights in code, designs, documentation and related materials, with perpetual and worldwide scope |
| Timing | IP passes to you on payment or on creation, and the vendor holds nothing back as security |
| Pre-existing IP | The vendor keeps its own tools and libraries, but grants you a **perpetual, worldwide, royalty-free licence** to use them inside your product |
| Third-party and open-source code | The vendor lists third-party components and licences, and confirms that none force you to release your code |
| Chain of title | The vendor confirms its employees and subcontractors have **assigned their rights to the vendor in writing** |
| Moral rights | Waiver or consent where the law allows, so authors do not block changes |
| Source code and handover | You receive source code, build scripts, documentation and access to repositories you own |
| Warranties and indemnity | The vendor warrants that the work does not infringe others' rights, and covers claims |
| Reuse by the vendor | The vendor cannot reuse your confidential material or bespoke code for other clients |

### Why chain of title matters

If a vendor's developer never assigned their rights to the vendor, the vendor cannot pass those rights on to you. Ask to see the clause in the vendor's employment and contractor agreements, or a warranty and indemnity covering it.

### Open-source licences

Most modern software uses open-source components. Some licences require you to publish your own code if you combine it in certain ways. Ask for a list of components with their licences (a software bill of materials), and have it checked for licences that do not suit your business.

## Confidentiality: the NDA

A non-disclosure agreement (NDA) should be signed **before** you share ideas, data or code. Check that it:

- Defines **confidential information** clearly, including business plans, data, designs, code and credentials
- Applies to the vendor's **staff and subcontractors**, who should also be bound
- Says how information may be **used**, only for your project
- Covers **return or destruction** of materials at the end
- Sets a **duration**, with trade secrets protected for as long as they remain secret
- States **what is excluded**, such as information that is already public
- Names the **governing law** and how disputes are resolved

Keep access tight. Give the team only the accounts and data they need, in your company's name, and remove access when people leave the project.

## Personal data and cross-border transfers

If the vendor will see personal data of your customers, such as test data copied from production or access to live systems, data protection law applies.

**UK and EU:** the UK GDPR and EU GDPR restrict transfers of personal data to countries without an adequacy decision. According to ACCA reporting in early 2026, India did not have a UK adequacy finding at that time. Check the current position on the regulator's website. If there is no adequacy decision, you typically need a lawful transfer mechanism, such as the UK's International Data Transfer Agreement (IDTA) or the UK Addendum to standard contractual clauses, plus a **data processing agreement** under Article 28.

**US:** there is no single federal law, but state privacy laws, sector rules (health, finance, children's data) and contractual promises you have made to your customers may apply.

**India:** the Digital Personal Data Protection Act, 2023 is being phased in. Ask your lawyer how it applies to the vendor.

In practice, include:

- A **data processing agreement** that sets out what data is processed, why and for how long
- A **transfer mechanism** that suits your customers' location
- A list of **sub-processors**, and your right to approve changes
- **Security measures**: access controls, encryption, logging and secure development practice
- **Breach notification**, with a clear deadline
- **Deletion or return** of data at the end
- A strong preference for **test data that is not real personal data**

For managing the day-to-day work and access across time zones, see our guide on [managing a remote development team in India]({{ '/2026/11/29/manage-remote-development-team-india-us-uk-time-zones/' | relative_url }}).

## Other terms to settle

- **Payment and milestones:** link them to deliverables and acceptance. See our guide on [contract models]({{ '/2026/11/26/fixed-price-vs-time-and-materials-vs-dedicated-team/' | relative_url }}).
- **Acceptance and warranty:** what counts as "done", and how long the vendor fixes defects free of charge.
- **Support after launch:** see [website maintenance plans]({{ '/2026/12/02/website-maintenance-plans-what-is-included-how-to-choose/' | relative_url }}).
- **Termination and handover:** what happens to code, accounts and knowledge if the relationship ends.
- **Liability:** caps and exclusions, and what the vendor's insurance covers.
- **Governing law and disputes:** choose a law and a forum. Many cross-border contracts use arbitration in a neutral place, which helps enforce a result in more than one country. Ask your lawyer which fits.
- **Key people:** who works on your project, and what happens if they leave.

## Red flags

- The vendor will not put the IP assignment in writing, or says "you own it, no need to write it down"
- A contract that is silent on duration and territory for the assignment
- The vendor keeps the repositories, domains or cloud accounts in its own name
- No list of third-party or open-source components
- No data processing terms, but real customer data is shared
- Refusal to bind subcontractors to confidentiality
- The vendor wants the right to reuse your code for others
- Vague warranties with no remedy

## Contract checklist for your lawyer

- ✅ A written, signed assignment of all deliverables, perpetual and worldwide
- ✅ The Section 19 defaults (five years and India only) are excluded by clear wording
- ✅ The one-year non-use lapse is dealt with expressly
- ✅ IP transfers on payment or creation
- ✅ The vendor's pre-existing tools are licensed to you perpetually, worldwide and royalty-free
- ✅ Third-party and open-source components are listed, with licences
- ✅ Chain of title: the vendor's staff and subcontractors have assigned rights in writing
- ✅ An NDA binds the vendor, its staff and its subcontractors
- ✅ A data processing agreement and a lawful transfer mechanism are in place
- ✅ Sub-processors, security measures and breach notice are agreed
- ✅ Repositories, domains and cloud accounts are held in your company's name
- ✅ Warranties, indemnity, liability, termination and handover terms are agreed
- ✅ A lawyer in each relevant jurisdiction has reviewed the agreement

## Common mistakes

- **Assuming payment equals ownership.**
- **Using a template that is silent on duration and territory** for an Indian vendor.
- **Sharing production data with the vendor** without a data processing agreement.
- **No NDA before the first call.**
- **Letting the vendor host your repository and your accounts.**
- **Skipping the open-source check.**
- **Signing first and asking the lawyer later.**

## FAQ

**Is the Section 19 default really that strict?**
It is in the statute, and a Delhi High Court division bench applied it in a software dispute. Many Indian and international lawyers advise stating the duration and territory in every assignment. Take legal advice on your contract.

**Does this apply if the contract is governed by US or UK law?**
The governing law of the contract and the law that applies to copyright ownership and assignment can differ. A lawyer can advise, and clear wording that works under both is the safest approach.

**Do I need to register the copyright?**
Registration is not always required for ownership, but it can help you prove it and enforce your rights in some countries. Ask your lawyer.

**Can I get a standard contract template?**
Templates can help, but cross-border software contracts have local traps. Use a template only as a starting point for your lawyer.

**What if I already signed a contract that is silent?**
Ask a lawyer about a confirmatory assignment that fixes the duration and territory, and have it signed by the vendor.

**Where do I start when choosing a vendor?**
See our checklist for [hiring a software development company in India]({{ '/2026/11/17/hire-software-development-company-india-checklist-us-uk-buyers/' | relative_url }}), and our guide on [writing a software project brief]({{ '/2026/11/23/how-to-write-software-project-brief-rfp-template/' | relative_url }}).

{% include lead-form.html topic="software" title="Planning to outsource a software project?" text="Tell us about your project and where your customers are, and we will help you plan it." %}

## Sources and further reading

- Copyright Act, 1957, [Chapter IV: Assignment of copyright](https://copyright.gov.in/Copyright_Act_1957/chapter_iv.html) (Section 19, mode of assignment)
- Legal 500, [Drafting IP assignment clauses in India](https://www.legal500.com/intelligence/india/intellectual-property/drafting-ip-assignment-clauses-in-india-copyright-patents-and-contractor-agreements)
- Legal 500, [Intellectual property in global capability centres](https://www.legal500.com/intelligence/india/intellectual-property/intellectual-property-in-global-capability-centres-navigating-ownership-protection-and-cross-border-transfers)
- The UK Information Commissioner's Office, for current guidance and adequacy decisions on international data transfers

*This guide is for general information and is not legal advice. Laws and court decisions change. Contracts for software development should be reviewed by qualified lawyers in the countries concerned.*
