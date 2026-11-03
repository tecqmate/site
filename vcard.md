---
layout: home
title: "VCard"
description: "A free service platform supported by your donations."
date: "July 25, 2012"
tags: ["vcard", "contact"]
lang: en
---

<section class="mb-5">
  <p class="fs-5 mb-4">VCard / Contact builder.</p>
</section>

<section class="mb-3">
  <div class="col-md-7 col-lg-8">
    <form action="" method="post">
      <fieldset>
        <legend>Name</legend>
        <p><label for="first_name">First name</label><input type="text" name="first_name" size="40" /></p>
        <p><label for="last_name">Last name</label><input type="text" name="last_name" size="40" /></p>
      </fieldset>
      <fieldset>
        <legend>Home</legend>
        <p><label for="street">Street and number</label><input type="text" name="street" size="40" /></p>
        <p><label for="city">City</label><input type="text" name="city" size="40" /></p>
        <p><label for="postal_code">Postal code</label><input type="text" name="postal_code" size="40" /></p>
        <p><label for="region">Region</label><input type="text" name="region" size="40" /></p>
        <p><label for="country">Country</label><input type="text" name="country" size="40" /></p>
      </fieldset>
      <p><input type="button" name="submit" value="submit" /></p>
    </form>
    <h2>vCard output</h2>
    <h3>Text</h3>
    <textarea name="vcard" cols="60" rows="50"></textarea>
    <h3>Qr code</h3>
    <img id="qr" src="" alt="QR Code Output" />
  </div>
</section>

<!-- Load vcard.js script -->
<script src="{{ '/vcard.js' | relative_url }}"></script>