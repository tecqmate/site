---
layout: post
title: "URL Encoding vs HTML Encoding: When to Use Each (Cheat Sheet)"
description: "URL encoding and HTML encoding solve different problems. Learn what each one does, which characters change, when to use which, how to avoid double encoding, and how encoding protects against injection bugs."
date: 2026-12-11
tags: ["url-encoding", "html-encoding", "percent-encoding", "html-entities", "web-development", "tools"]
topic: tools
read_mins: 7
audience: "Developers, marketers and site owners who build links, forms and web pages and need to handle special characters correctly"
---

Special characters cause some of the most annoying bugs on the web: a link that breaks when a name contains an ampersand, a page that shows `&amp;` on screen, a search box that lets someone inject a script. Many of these come from mixing up two different things: **URL encoding** and **HTML encoding**.

They look similar, but they protect different places. This cheat sheet explains what each one does and when to use it.

## Quick answer

- **URL encoding** (percent-encoding) makes text safe to put **inside a URL**. A space becomes `%20`, and an ampersand becomes `%26`.
- **HTML encoding** (character entities) makes text safe to show **inside an HTML page**. An ampersand becomes `&amp;`, and a less-than sign becomes `&lt;`.
- Use the encoding for the place where the text will end up. Encode **when you output**, and encode only **once**.

## What is URL encoding?

A URL can only contain a limited set of characters. Other characters, and characters that have a special meaning in URLs, are replaced by a percent sign followed by two hexadecimal digits. For example:

- A space becomes `%20`
- An ampersand `&` becomes `%26`
- A hash `#` becomes `%23`

Characters outside basic ASCII are first converted to bytes using UTF-8, and each byte is percent-encoded. So the letter é becomes `%C3%A9`, and the rupee sign ₹ becomes `%E2%82%B9`.

### Characters that do not need encoding

The "unreserved" characters are always safe in a URL: letters A to Z and a to z, digits 0 to 9, and the symbols `-`, `.`, `_` and `~`.

### Reserved characters

Some characters have a job in the URL structure:

`: / ? # [ ] @ ! $ & ' ( ) * + , ; =`

If you want one of these as ordinary data, for example an ampersand inside a search term, you must encode it. If you want it to do its job, for example `?` to start the query string, leave it alone.

## What is HTML encoding?

HTML uses a few characters as markup. If you want to display them as text, or put them in an attribute, you replace them with **character entities**:

| Character | Entity | Why it matters |
| --- | --- | --- |
| `&` | `&amp;` | Starts an entity |
| `<` | `&lt;` | Starts a tag |
| `>` | `&gt;` | Ends a tag |
| `"` | `&quot;` | Ends a double-quoted attribute |
| `'` | `&#39;` | Ends a single-quoted attribute |

You can also use entities for symbols that are hard to type, such as `&copy;` for the copyright sign or `&nbsp;` for a non-breaking space.

HTML encoding is mainly about **safety and correctness**. If you print user-supplied text into a page without encoding it, a visitor could add HTML or script that runs in other people's browsers. This is called cross-site scripting (XSS).

## Side-by-side comparison

| Question | URL encoding | HTML encoding |
| --- | --- | --- |
| What does it protect? | The structure of a URL | The structure of an HTML page |
| Typical format | `%XX` (hex byte) | `&name;` or `&#number;` |
| Space | `%20` (or `+` in form data) | Usually stays a space |
| Ampersand `&` | `%26` | `&amp;` |
| Less-than `<` | `%3C` | `&lt;` |
| Double quote | `%22` | `&quot;` |
| Where you use it | Links, query strings, redirects, API calls | Text and attributes in a web page |
| Main risk if skipped | Broken links, wrong data | Broken layout, security holes |

## The same characters, both ways

| Character | URL encoded | HTML encoded |
| --- | --- | --- |
| Space | `%20` | (no change) |
| `&` | `%26` | `&amp;` |
| `?` | `%3F` | (no change) |
| `#` | `%23` | (no change) |
| `/` | `%2F` | (no change) |
| `=` | `%3D` | (no change) |
| `+` | `%2B` | (no change) |
| `%` | `%25` | (no change) |
| `<` | `%3C` | `&lt;` |
| `>` | `%3E` | `&gt;` |
| `"` | `%22` | `&quot;` |
| é | `%C3%A9` | `&eacute;` or `&#233;` |
| ₹ | `%E2%82%B9` | `&#8377;` |

You can check any text with our free [URL encoder]({{ '/url-encode/' | relative_url }}) and [HTML encoder]({{ '/html-encode/' | relative_url }}) tools.

## Worked examples

### Example 1: a search link

You want a link for the search term `chai & biscuits`.

- Wrong: `https://example.com/search?q=chai & biscuits`
- Right: `https://example.com/search?q=chai%20%26%20biscuits`

Without encoding, the space ends the link in many places, and the `&` is read as the start of a new parameter.

### Example 2: showing text on a page

You want a page to display the text `Tom & Jerry`.

- In the page source, write `Tom &amp; Jerry`.

### Example 3: both together

You put that search link in an HTML attribute:

```html
<a href="https://example.com/search?q=chai%20%26%20biscuits&amp;lang=en">Search</a>
```

The query value is **URL encoded** (`%20`, `%26`). The separator between the two parameters is an `&`, and because the link sits inside HTML, that `&` is **HTML encoded** as `&amp;`. The browser reads the HTML, turns `&amp;` back into `&`, and then follows the URL.

### Example 4: unsafe input

A visitor types `<script>alert("hi")</script>` into a form. When you print it back into a page, encode it:

```html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

It now shows as harmless text.

## Which function to use in JavaScript

| Task | Use |
| --- | --- |
| Encode one value for a URL query string | `encodeURIComponent(value)` |
| Encode a whole URL, keeping its structure | `encodeURI(url)` |
| Build query strings from an object | `URLSearchParams` |
| Put text safely into the page | Set `textContent` instead of `innerHTML`, or use a trusted templating library |

`encodeURIComponent` encodes characters such as `/`, `?`, `&` and `=`, so it is right for a single value. `encodeURI` leaves them alone, so it is meant for a full URL. Using `encodeURI` on a single value is a common mistake, because an ampersand inside the value stays unencoded.

Other languages and frameworks have equivalent functions. Use the built-in ones instead of replacing characters by hand.

## Space: `%20` or `+`?

In a URL path, a space is `%20`. In form data sent as `application/x-www-form-urlencoded`, which includes many query strings, a space is often written as `+`. Servers usually read both in query strings, but a `+` in a path is just a plus sign. If you are not sure, use `%20`.

## Double encoding: the classic bug

Encoding something that is already encoded changes it again:

- `%20` becomes `%2520` (the `%` is encoded as `%25`)
- `&amp;` becomes `&amp;amp;`

You then see odd text such as `%20` or `&amp;` on screen, or a link that does not work. To avoid it:

1. Keep raw values in your code, and encode only at the moment you output them.
2. Encode **once** for each context.
3. Do not encode text that another tool or library will encode for you.

## Other contexts need their own encoding

URL and HTML are not the only places. Text going into JavaScript strings, CSS, JSON, SQL queries or shell commands each has its own rules. For example, HTML encoding does not protect a SQL query. Use parameterised queries for databases, and the correct escaping or library for every other context.

Encoding is also **not encryption**. Anyone can decode `%20` or `&amp;`. Do not use encoding to hide secrets.

## Encoding checklist

- ✅ You know whether the text is going into a URL, an HTML page, or both
- ✅ URL values are encoded with `encodeURIComponent` or an equivalent function
- ✅ Text printed into HTML is encoded, or inserted as plain text
- ✅ Links inside HTML attributes use `&amp;` between parameters
- ✅ Values are encoded once, at the point of output
- ✅ Non-English characters are sent as UTF-8
- ✅ Links with special characters were tested in a browser
- ✅ Databases use parameterised queries, not HTML encoding
- ✅ Secrets are never "protected" by encoding

## Common mistakes

- **Using HTML encoding in a URL,** or URL encoding in page text.
- **Using `encodeURI` for a single value.**
- **Encoding twice.**
- **Putting user input into `innerHTML`** without encoding.
- **Forgetting to encode `#`,** which cuts off the rest of the link.
- **Hand-writing replacements** for a few characters and missing the rest.
- **Treating encoding as a security feature** for passwords or private data.

## FAQ

**Is URL encoding the same as percent-encoding?**
Yes. Both names mean replacing a character with `%` and two hexadecimal digits.

**Do I need to encode a URL I put in a QR code?**
Yes, if it contains spaces or special characters. A cleaner, shorter URL also makes the code easier to scan. See our guide on [QR codes that actually scan]({{ '/2026/12/10/qr-codes-that-actually-scan-print-size-error-correction-landing-page/' | relative_url }}).

**Should I encode the whole URL or only the values?**
Usually only the values (such as search terms and names), not the structure (such as the slashes and the question mark).

**Does HTML encoding stop all security problems?**
No. It prevents one kind of problem in one place. You still need input validation, parameterised queries and the right escaping for each context.

**What about emojis and non-Latin scripts in URLs?**
They are converted to UTF-8 bytes and percent-encoded. Browsers often show the readable version in the address bar, but the encoded form is what is sent.

## Further reading

- The URL standards from the IETF (RFC 3986) and the WHATWG URL Standard, for the formal rules
- The HTML standard's list of named character references
- Your framework's documentation on output escaping and template security

*This guide is for general information. Encoding rules vary slightly between languages, frameworks and servers, so test with the tools you use.*
