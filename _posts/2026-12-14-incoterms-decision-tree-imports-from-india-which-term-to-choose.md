---
layout: post
title: "Incoterms Decision Tree for Imports from India: Which Term Should You Choose?"
description: "Answer three questions and get a starting Incoterm for your shipment from India: EXW, FCA, FOB, CFR, CIF, CPT, CIP, DAP or DDP. Includes a step-by-step decision tree, the reasons behind each pick and what to confirm with your forwarder."
date: 2026-12-14
tags: ["import-export", "incoterms", "shipping", "decision-tree", "india-sourcing", "trade"]
topic: trade
read_mins: 6
audience: "Importers and brands buying from Indian suppliers who need to pick the right delivery term for a quote or contract"
---

Our guide on [Incoterms for buyers importing from India]({{ '/2026/11/25/incoterms-explained-importing-from-india-exw-fob-cif-ddp/' | relative_url }}) explains what each term means. This page helps you **choose** one. Answer the questions below to get a sensible starting point, then check it with your freight forwarder or customs broker before you put it in a contract.

All terms here are from **Incoterms 2020**, the current edition. Write the term together with the named place and the edition, for example "FCA Mumbai, Incoterms 2020".

## Quick answer

For most first orders, **FCA** (or **FOB** for bulk sea cargo) is a safe starting point: the supplier clears export in India, and you keep control of freight and insurance. **EXW** is for buyers with an agent in India. **CIF, CIP, DAP and DDP** are convenient but give you less control, so use them knowingly.

## Interactive picker

<div id="ic-picker" class="card card-body my-4" markdown="0">
  <p class="fw-bold mb-3">Find your starting Incoterm</p>

  <label for="ic-mode" class="form-label">1. How is the cargo moving?</label>
  <select id="ic-mode" class="form-select mb-3">
    <option value="sea-container">By sea, in a container (FCL or LCL)</option>
    <option value="sea-bulk">By sea, as bulk or non-containerised cargo</option>
    <option value="air">By air or courier</option>
    <option value="road">By road or rail</option>
  </select>

  <label for="ic-scope" class="form-label">2. How far should the supplier take the goods?</label>
  <select id="ic-scope" class="form-select mb-3">
    <option value="handover">Hand over in India, cleared for export. I arrange the main freight</option>
    <option value="all-me">Ready at their premises. I arrange everything, including export clearance</option>
    <option value="freight-paid">Supplier pays the main freight to my port or airport</option>
    <option value="door-import-me">Supplier delivers to my address. I clear import</option>
    <option value="door-all">Supplier delivers to my address and pays import duties</option>
  </select>

  <div id="ic-ins-wrap" style="display:none;">
    <label for="ic-ins" class="form-label">3. Who should buy the insurance?</label>
    <select id="ic-ins" class="form-select mb-3">
      <option value="me">I will arrange my own insurance</option>
      <option value="supplier">The supplier arranges it</option>
    </select>
  </div>

  <div id="ic-result" class="alert alert-info mb-0" role="status"></div>
</div>

<script>
(function () {
  var mode = document.getElementById('ic-mode');
  var scope = document.getElementById('ic-scope');
  var ins = document.getElementById('ic-ins');
  var insWrap = document.getElementById('ic-ins-wrap');
  var out = document.getElementById('ic-result');
  if (!mode || !scope || !ins || !out) { return; }

  function render(term, title, lines) {
    var html = '<p class="fw-bold mb-1">' + term + ' (Incoterms 2020): ' + title + '</p><ul class="mb-2">';
    for (var i = 0; i < lines.length; i++) { html += '<li>' + lines[i] + '</li>'; }
    html += '</ul><p class="small mb-0">This is a starting point, not advice. Name the place (for example, "' + term + ' Mumbai") and confirm with your forwarder or customs broker.</p>';
    out.innerHTML = html;
  }

  function update() {
    var m = mode.value;
    var s = scope.value;
    var seaBulk = (m === 'sea-bulk');
    insWrap.style.display = (s === 'freight-paid') ? 'block' : 'none';

    if (s === 'all-me') {
      render('EXW', 'Ex Works', [
        'The supplier makes the goods available at their premises. You handle loading, export clearance and everything after.',
        'Export clearance from overseas is hard. Use this only if you have an agent or forwarder in India who can do it.',
        'If you want the supplier to clear export, choose ' + (seaBulk ? 'FOB' : 'FCA') + ' instead.'
      ]);
    } else if (s === 'handover') {
      if (seaBulk) {
        render('FOB', 'Free on Board', [
          'The supplier delivers the goods on board the vessel you name and clears them for export.',
          'Risk passes to you once the goods are on board. You arrange main freight and insurance.',
          'FOB is for sea cargo only. For containers, FCA usually fits better.'
        ]);
      } else {
        render('FCA', 'Free Carrier', [
          'The supplier delivers the goods, cleared for export, to the carrier or place you name.',
          'You arrange main freight and insurance, so you keep control of cost and carrier.',
          'FCA works for any transport mode and is often the better choice for containers than FOB.'
        ]);
      }
    } else if (s === 'freight-paid') {
      var sup = (ins.value === 'supplier');
      if (seaBulk) {
        if (sup) {
          render('CIF', 'Cost, Insurance and Freight', [
            'The supplier pays freight and arranges insurance to your destination port.',
            'Risk still passes to you earlier, once the goods are on board at the Indian port.',
            'The minimum insurance cover is limited. Check it, and consider extra cover.',
            'The supplier chooses the carrier, so check the route and the shipping line.'
          ]);
        } else {
          render('CFR', 'Cost and Freight', [
            'The supplier pays freight to your destination port.',
            'Risk passes to you once the goods are on board at the Indian port, so you should insure from that point.',
            'The supplier chooses the carrier.'
          ]);
        }
      } else {
        if (sup) {
          render('CIP', 'Carriage and Insurance Paid To', [
            'The supplier pays carriage and arranges insurance to the named destination. It works for any transport mode.',
            'Under Incoterms 2020, CIP carries a higher minimum insurance cover than CIF.',
            'Risk passes to you when the goods are handed to the first carrier in India.'
          ]);
        } else {
          render('CPT', 'Carriage Paid To', [
            'The supplier pays carriage to the named destination. It works for any transport mode.',
            'Risk passes to you when the goods are handed to the first carrier in India, so arrange your own insurance from then.',
            'The supplier chooses the carrier.'
          ]);
        }
      }
    } else if (s === 'door-import-me') {
      render('DAP', 'Delivered at Place', [
        'The supplier delivers to your named place, ready for unloading, and pays the transport.',
        'You clear the goods through import and pay duties and taxes in your country.',
        'Check which charges at the destination, such as terminal and unloading costs, are included.'
      ]);
    } else {
      render('DDP', 'Delivered Duty Paid', [
        'The supplier delivers to your door, and clears import and pays duties.',
        'Many Indian suppliers cannot clear import in your country, so ask who is the importer of record.',
        'Prices are usually higher and costs are less visible. Use it knowingly, mostly for small shipments.'
      ]);
    }
  }

  mode.addEventListener('change', update);
  scope.addEventListener('change', update);
  ins.addEventListener('change', update);
  update();
})();
</script>

## The decision tree in text

If you cannot use the picker, follow these steps.

```
1. Do you want to handle export clearance in India yourself?
   Yes, I have an agent there      -> EXW
   No, the supplier should do it   -> go to 2

2. Should the supplier pay the main freight?
   No, I arrange freight           -> sea bulk cargo: FOB
                                      containers, air or road: FCA
   Yes                             -> go to 3

3. How far should the supplier take it?
   To my port or airport           -> go to 4
   To my address                   -> go to 5

4. Who buys insurance?
   Supplier                        -> sea bulk: CIF      other modes: CIP
   Me                              -> sea bulk: CFR      other modes: CPT

5. Who clears import and pays duties?
   Me                              -> DAP
   The supplier                    -> DDP
```

## Why these picks

| Term | Seller handles | Buyer handles | Mode |
| --- | --- | --- | --- |
| EXW | Goods ready at premises | Loading, export clearance, freight, insurance, import | Any |
| FCA | Export clearance, handover to your carrier | Main freight, insurance, import | Any |
| FOB | Export clearance, goods on board | Main freight, insurance, import | Sea and inland waterway |
| CFR | Export clearance, freight to port | Insurance, import | Sea and inland waterway |
| CIF | Export clearance, freight and minimum insurance to port | Extra insurance, import | Sea and inland waterway |
| CPT | Export clearance, carriage to destination | Insurance, import | Any |
| CIP | Export clearance, carriage and insurance to destination | Import | Any |
| DAP | Export clearance, carriage to your address | Unloading, import clearance and duties | Any |
| DDP | Everything, including import clearance and duties | Unloading | Any |

## Five questions to confirm with your forwarder

1. Is this term suitable for my product, route and transport mode?
2. Who is the importer of record, and who pays duties and taxes?
3. What does the quote include, such as port charges, documentation and inland transport?
4. Where does risk pass to me, and is my insurance in place from that point?
5. Does the term match what my bank or letter of credit requires?

## Decision checklist

- ✅ You know whether the cargo goes by sea container, sea bulk, air or road
- ✅ You have decided who controls main freight
- ✅ You know who clears export and who clears import
- ✅ You know where risk passes to you, and insurance covers it
- ✅ Every quote uses the same term and the same named place
- ✅ The contract names "Incoterms 2020"
- ✅ Payment terms are written separately from the Incoterm
- ✅ Your forwarder has confirmed the choice

## Common mistakes

- **Choosing FOB or CIF for containers.** FCA, CPT or CIP often match the real handover better.
- **Picking EXW without an agent in India.**
- **Choosing DDP without knowing who the importer of record is.**
- **Comparing quotes on different terms.** Convert them to the same term first.
- **Leaving out the named place.**
- **Treating the Incoterm as the payment term.**

## FAQ

**Is there one best Incoterm for importing from India?**
No. FCA (or FOB for bulk sea cargo) is a common balanced choice for a first order, but the right term depends on your product, route and experience.

**Can I change the term after I get a quote?**
Yes, but ask for a revised quote. A different term moves costs and risk between you and the supplier, so the price will change.

**Do Incoterms decide when I pay?**
No. Payment is set separately. See our guide on [paying an Indian supplier safely]({{ '/2026/12/01/payment-methods-importing-from-india-lc-advance-open-account/' | relative_url }}).

**Which documents follow from my choice?**
The term affects who arranges the transport and insurance documents. See [export documents from India]({{ '/2026/11/28/export-documents-from-india-what-buyers-should-receive/' | relative_url }}).

**Should I inspect before shipment whichever term I use?**
Yes, for meaningful orders. See our guide on [pre-shipment inspection in India]({{ '/2026/12/04/pre-shipment-inspection-india-how-to-check-goods-before-shipping/' | relative_url }}).

{% include lead-form.html topic="trade" %}

## Further reading

- The International Chamber of Commerce, for the official Incoterms 2020 rules
- Your freight forwarder or customs broker, to confirm the term for your product and route

*This page is for general information, not legal or customs advice. Incoterms are a trademark of the ICC. Check the exact wording of the rule in your contract.*
