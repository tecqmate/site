---
layout: home
title: "Transliterate"
description: "A free service platform supported by your donations."
date: "March 7, 2022"
tags: ["translate", "transliterate"]
lang: en
scripts:
  - '/assets/js/G.min.js'
  - '/assets/js/I.min.js'
styles:
  - '/assets/css/I.min.css'
inline_scripts:
  - $(pageInit);
---

<section class="mb-3">
  <textarea placeholder="Type here ..." id="msg" class="form-control" rows="7" style="resize:none;" autofocus=""></textarea>
</section>

<section class="mb-3">
  <div class="row">
    <div class="col-sm-4">
      From <select class="custom-select" id="srcLang"></select>
    </div>
    <div class="col-sm-4">
      To <select class="custom-select" id="destLang"></select>
    </div>
    <div class="col-sm-4">
      <button class="btn btn-primary btn-sm" id="copy">Copy</button>
    </div>
  </div>
</section>

<!-- Google Transliteration Asset Scripts and Styles -->

<style>
  .inputapi-popupeditor-logo {
    display: none;
  }
</style>

<script>
  var control = null;
  function onLoad() {
    var options = {
      sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage: [google.elements.transliteration.LanguageCode.HINDI],
      transliterationEnabled: true
    };

    control = new google.elements.transliteration.TransliterationControl(options);
    control.makeTransliteratable(['msg']);
    control.c.qc.t13n.c[3].c.d.keyup[0].ia.F.p = 'https://www.google.com';
  }

  function pageInit() {
    google.load('elements', '1', {packages: 'transliteration'});
    google.setOnLoadCallback(onLoad);
    var srcLang = $('#srcLang');
    var destLang = $('#destLang');
    var langCode = google.elements.transliteration.LanguageCode;
    for (var lang in langCode) {
      var opt = ['<option value="', langCode[lang], '">', lang, '</option>'].join('');
      srcLang.append(opt);
      destLang.append(opt);
    }
    destLang.find('option[value=' + google.elements.transliteration.LanguageCode.HINDI + ']').prop('selected', true);

    var changeLang = function(e) {
      try {
        control.setLanguagePair(srcLang.val(), destLang.val());
      } catch (ex) {
        srcLang.find('option[value=' + control.p.b.t13n.X + ']').prop('selected', true);
        destLang.find('option[value=' + control.p.b.t13n.B + ']').prop('selected', true);
        $.alert('Cannot use those language(s)! Please try a different language.');
      }
    };

    srcLang.on('change', changeLang);
    destLang.on('change', changeLang);

    $('#copy').on('click', function(e) {
      navigator.clipboard.writeText($('#msg').val()).then(function() {
        $.alert('Copied successfully!');
      }).catch(function(err) {
        $.alert('Failed to copy text.');
      });
    });
  }
</script>