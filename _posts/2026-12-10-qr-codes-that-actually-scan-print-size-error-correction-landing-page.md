---
layout: post
title: "QR Codes That Actually Scan: Print Size, Error Correction and Landing Page Rules"
description: "A practical guide to making QR codes that scan reliably on print and screens: minimum size, scanning distance, contrast, quiet zone, error correction levels, static vs dynamic codes and what the landing page must do."
date: 2026-12-10
tags: ["qr-code", "qr-code-generator", "offline-marketing", "print-design", "landing-page", "tools"]
topic: tools
read_mins: 7
audience: "Marketers, designers and small business owners who print or display QR codes on posters, packaging, menus and screens"
---

A QR code that does not scan is worse than no QR code. It wastes the space, the print cost and the customer's patience. Most scanning failures come from a handful of avoidable mistakes: a code that is too small, too low in contrast, squeezed against other artwork or pointing at a page that is slow on a phone.

This guide covers how to design, test and print QR codes that work, and what the page behind them needs to do.

## Quick answer

Make the code **large enough for the distance it will be scanned from**, keep **strong dark-on-light contrast**, leave a **clear blank border (quiet zone)** around it, choose a sensible **error correction level**, and use a **short URL** so the pattern stays simple. Then test it on several phones, in the real print, in real light. Finally, send people to a **fast, mobile-friendly page** with one clear action.

## How a QR code is built (the short version)

A QR code is a grid of small squares called **modules**. The three large squares in the corners help the phone locate and orient the code. The rest of the grid stores your data and some extra "repair" data used for error correction.

The more data you store, the more modules there are, and the smaller each module becomes at a given print size. Small modules are harder to scan. This is why a long URL is a common cause of unreliable codes.

## Size and scanning distance

A common rule of thumb is that the scanning distance should be about **ten times the width of the code**. A code 3 cm wide should be scanned from around 30 cm. Phone cameras vary, and lighting and print quality matter, so treat this as a starting point and test.

| Where the code appears | Typical scanning distance | Starting width (guide only) |
| --- | --- | --- |
| Business card, flyer, product label | 15 to 30 cm | 2 to 3 cm |
| Menu, table card, brochure | 20 to 40 cm | 3 to 4 cm |
| Poster on a wall | 1 to 2 metres | 10 to 20 cm |
| Shop window or large signage | 3 metres or more | Scale up in proportion |
| Screen, TV or presentation slide | Depends on the room | Large, and test from the back row |

If the code will be scanned from far away, a shorter URL helps even more, because it needs fewer modules.

## Contrast and colour

- Use **dark modules on a light background.** Black on white is safest.
- Avoid **inverted codes** (light on dark) unless you test them, because not every scanner reads them.
- If you use brand colours, keep the code **clearly darker** than the background, and test in black and white as well.
- Do not put the code on a busy photo or a gradient.
- Glossy surfaces can cause reflections. A matte finish scans more reliably.

## The quiet zone

The quiet zone is the empty border around the code. It helps the scanner see where the code starts. The standard calls for a margin of at least **four modules** on all sides for regular QR codes.

Many designs fail here: the code is placed tight against text, a border or the edge of a box. Leave the blank margin, even when space is limited.

## Error correction levels

QR codes include extra data that lets a scanner reconstruct the code if part of it is dirty, damaged or covered.

| Level | Approximate damage it can tolerate | Notes |
| --- | --- | --- |
| L (Low) | About 7% | Smallest code, least tolerance |
| M (Medium) | About 15% | A common default |
| Q (Quartile) | About 25% | Good for print that may get dirty |
| H (High) | About 30% | Needed if you place a logo in the middle |

A higher level makes the code denser, with more modules. So choose the **lowest level that still gives you the toughness you need**. For clean screens, L or M is often enough. For printed codes that may get scuffed, or codes with a logo, use Q or H.

A logo in the middle covers part of the code, so it relies on error correction. Keep the logo small, and test thoroughly.

## Static and dynamic QR codes

| Type | How it works | Good for | Watch out for |
| --- | --- | --- | --- |
| Static | The URL or text is stored directly in the code and cannot change | Permanent links, Wi-Fi details, contact cards | If the destination changes, you must reprint |
| Dynamic | The code points to a short redirect address that you can change later | Campaigns, menus, packaging, anything that may change | Depends on the redirect service staying active, and your account and plan |

Dynamic codes are convenient for print, since you can fix a broken link or change a campaign without reprinting. But if you use a third-party service, read its terms. If the service stops or your plan lapses, every printed code stops working. For important print runs, consider a redirect on your own domain, so you control it.

## Keep the URL short

- Use a **short, clean URL** or a short path on your own domain.
- Avoid long tracking parameters inside the code. Put tracking on the redirect or the landing page.
- Use **HTTPS** links.
- Be careful with special characters in a URL, which may need encoding. See our guide on [URL encoding vs HTML encoding]({{ '/2026/12/11/url-encoding-vs-html-encoding-cheat-sheet/' | relative_url }}).

You can create and test codes with our free [QR code generator]({{ '/qrcode/' | relative_url }}).

## The landing page matters as much as the code

A QR code is only a door. What people find behind it decides whether the scan was worth it.

- **Load fast on mobile.** Many people scan on a mobile connection.
- **Use a mobile-first layout.** No pinch-zoom, no tiny buttons.
- **Match the promise.** If the poster says "Scan for the menu", open the menu, not the home page.
- **One clear action.** A booking, a download, a payment or a form, not five choices.
- **Do not force a login or an app install** unless it is essential.
- **Add tracking.** Use a campaign tag for each placement so you can compare posters, products and locations. See our guide on [measuring campaign results]({{ '/2026/12/07/measure-sms-whatsapp-campaign-results-delivery-clicks-cost-per-outcome/' | relative_url }}).
- **Say what the scan does.** A short line such as "Scan to see today's offers" increases scans and builds trust.

## Safety and trust

- Add a **short label** near the code that says where it leads.
- Do not hide codes in places where someone could stick another code over yours. Fraudsters do replace real QR codes with fake ones.
- Check printed codes regularly in public locations.
- If your code leads to a payment page, use a domain people recognise.

## Test before you print

1. **Test the file** on at least two or three phones, including an older one.
2. **Test a printout** at the real size, on the real material.
3. **Test from the real distance,** in the real lighting, including dim light.
4. **Test with the default phone camera and with a scanner app.**
5. **Test the landing page** on a mobile connection.
6. **Print a small batch first** and check a few pieces after the print run.

## QR code checklist

- ✅ The code is large enough for the scanning distance
- ✅ Contrast is strong, with dark modules on a light background
- ✅ A quiet zone of at least four modules surrounds the code
- ✅ The URL is short, uses HTTPS and has no unnecessary parameters
- ✅ The error correction level suits the print environment and any logo
- ✅ You have chosen static or dynamic on purpose
- ✅ The landing page is fast, mobile-friendly and matches the promise
- ✅ A short line tells people what the scan does
- ✅ Each placement has its own tracking tag
- ✅ You have tested several phones, the real print and the real distance

## Common mistakes

- **Printing the code too small** to save space.
- **Pointing a long URL at a small code,** which creates a dense pattern.
- **Putting the code on a busy background** or over a photo.
- **Cropping the quiet zone.**
- **Using a dynamic code from a service you do not control** for a long print run.
- **Sending scanners to a desktop-only page.**
- **Not testing the printed version,** only the file on screen.
- **Stretching or recolouring** the code in a design tool.

## FAQ

**What is the smallest QR code I can print?**
It depends on the amount of data, the print quality and the scanning distance. Around 2 cm is a common lower limit for short URLs in close-range use, but test on real phones.

**Does a QR code expire?**
A static code does not expire, but the page it points to can disappear. A dynamic code can stop working if the redirect service ends.

**Can I put a logo in the middle?**
Yes, if you use a high error correction level (usually Q or H), keep the logo small and test it.

**Why does my code scan on screen but not in print?**
Common reasons: the print is too small or blurred, the contrast is low, the quiet zone is missing or the surface is glossy and reflective.

**Should I use a colour QR code?**
You can, if the contrast stays strong. Dark colours on a light background work best, and you should test them.

## Further reading

- Your printer's guidelines on minimum sizes and file formats
- The documentation of your QR code or redirect provider, on error correction, dynamic codes and account terms

*This guide is for general information. Sizes and distances are rules of thumb, so test every code in real conditions before a print run.*
