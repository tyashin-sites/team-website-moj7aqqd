// GENERATED from THRIDIFY-PUBLIC-MATERIAL-CONTRIBUTION-AGREEMENT-DRAFT.md (v0.2,
// approved 2026-10-19) — Part A (PMCA-1.0) and Part B (PML-1.0) only; the draft
// banner and notes for counsel are excluded. Edit the source and regenerate,
// and bump the version labels for any change in meaning (accepted versions are
// recorded per submission).

export type TLegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] };
export type TLegalSection = { title: string; blocks: TLegalBlock[] };
export type TLegalPart = { title: string; sections: TLegalSection[] };

export const PMCA_VERSION = 'PMCA-1.0';
export const PML_VERSION = 'PML-1.0';
export const PMCA_EFFECTIVE_DATE = '19 October 2026';

export const PMCA_DOCUMENT: TLegalPart[] = [
  {
    "title": "PART A — PUBLIC MATERIAL CONTRIBUTION AGREEMENT (PMCA-1.0)",
    "sections": [
      {
        "title": "Parties",
        "blocks": [
          {
            "type": "p",
            "text": "This Public Material Contribution Agreement (the **\"Agreement\"**) is made between:"
          },
          {
            "type": "p",
            "text": "**(1) Aapastech Private Limited**, a company incorporated under the Companies Act, 2013, CIN U72900DL2022PTC395508, registered office at 8/3, 2nd Floor, Roop Nagar, Delhi 110007, India, principal place of business at 1st Floor, 145, Sector 44, Gurugram, Haryana 122003, which owns and operates the Thridify platform (**\"Aapastech\"**, \"we\", \"us\"); and"
          },
          {
            "type": "p",
            "text": "**(2) the company, firm or person named as the contributor** when a submission is made (the **\"Contributor\"**, \"you\"). It is accepted on the Contributor's behalf by the individual who confirms they have authority to bind it (the **\"Signatory\"**)."
          }
        ]
      },
      {
        "title": "1. Definitions",
        "blocks": [
          {
            "type": "p",
            "text": "1.1 **\"Platform\"** means the Thridify software, websites, APIs, web components, plugins, viewers, applications and services operated by Aapastech or its Affiliates, now or in future."
          },
          {
            "type": "p",
            "text": "1.2 **\"Contributed Material\"** means each material, texture, image, map (including base colour, normal, roughness, metalness, occlusion, displacement, emissive, alpha and transmission maps), thumbnail, design icon, video texture, parameter, factor, transform, name, description, SKU, category and associated metadata that you submit."
          },
          {
            "type": "p",
            "text": "1.3 **\"Approved Material\"** means a Contributed Material that Aapastech has approved for the Public Library. Each approval is recorded in the Platform's audit log."
          },
          {
            "type": "p",
            "text": "1.4 **\"Public Library\"** means the collection of Approved Materials that Aapastech makes available to Users under Part B."
          },
          {
            "type": "p",
            "text": "1.5 **\"Processed Forms\"** means technical versions of a Contributed Material that the Platform makes: compressed, resized, re-encoded or transcoded copies (including KTX2, lite, WebP and AVIF versions), thumbnails, tiles, mip-maps, and renders of it applied to 3D models."
          },
          {
            "type": "p",
            "text": "1.6 **\"Users\"** means holders of a Platform account, together with their customers, website visitors and shoppers who view or interact with experiences built on the Platform."
          },
          {
            "type": "p",
            "text": "1.7 **\"Affiliate\"** means an entity that controls, is controlled by, or is under common control with Aapastech, including 14818032 Canada Inc."
          },
          {
            "type": "p",
            "text": "1.8 **\"Brand Assets\"** means your trade marks, trade names, logos and get-up."
          }
        ]
      },
      {
        "title": "2. Ownership stays with you",
        "blocks": [
          {
            "type": "p",
            "text": "2.1 **Nothing in this Agreement transfers ownership of anything.** You keep all copyright, design rights, Brand Assets and other intellectual property in your Contributed Materials. You remain free to use them, and to license them to anyone else, in any way you choose."
          },
          {
            "type": "p",
            "text": "2.2 Aapastech owns the Platform, the Public Library as a curated collection, the Processed Forms it creates (to the extent they are new works), and the records and metadata it generates."
          }
        ]
      },
      {
        "title": "3. Permission you give us",
        "blocks": [
          {
            "type": "p",
            "text": "3.1 **Licence.** For each Approved Material, you grant Aapastech and its Affiliates a **worldwide, royalty-free, non-exclusive, perpetual and irrevocable licence**, with the right to sublicense through multiple tiers, to:"
          },
          {
            "type": "ul",
            "items": [
              "(a) host, store, copy, cache and back it up;",
              "(b) make Processed Forms of it, and adjust its technical presentation (colour management, tiling, scale, rotation, offset, UV mapping, brightness normalisation) so it renders correctly on 3D models;",
              "(c) publish, display, perform, distribute and make it available to Users through the Public Library and through any experience, website, plugin, export or render made with the Platform;",
              "(d) let Users use it, copy it into their own accounts, and change its metadata and parameters under Part B;",
              "(e) organise, rename for consistency, categorise, tag, version, retire, unpublish, remove, restore or replace it in the Public Library at Aapastech's discretion;",
              "(f) show it, attributed to you, in Aapastech's marketing describing the Public Library."
            ]
          },
          {
            "type": "p",
            "text": "3.2 **Why the licence is irrevocable.** Approved Materials are copied into Users' products and published experiences. If permission could be withdrawn, those products would break, so the licence cannot be revoked. Clause 8 explains how you can ask for a material to stop being offered for new use."
          },
          {
            "type": "p",
            "text": "3.3 **Promise not to sue, as a separate agreement.** In addition to the licence in clause 3.1, and as a separate contractual promise that stands even if that licence were found ineffective for any reason, you agree that you and your Affiliates, successors and assignees will never bring any claim against Aapastech, its Affiliates or any User for doing anything the licence in clause 3.1 or Part B permits."
          },
          {
            "type": "p",
            "text": "3.4 **Accepting electronically.** You agree that accepting this Agreement on the Platform is your signature and your written consent to the licence and promises in it. That acceptance consists of typing the Signatory's name, giving the company's legal name and confirming your authority. You will not challenge this Agreement, or any licence under it, on the ground that it was formed or signed electronically."
          }
        ]
      },
      {
        "title": "4. Credit and the integrity of your work",
        "blocks": [
          {
            "type": "p",
            "text": "4.1 **Credit.** Aapastech will show each Approved Material under the name of your library, or another credit you reasonably request, wherever the Public Library lists it. Users' own products may show the material without credit."
          },
          {
            "type": "p",
            "text": "4.2 **Changes you consent to.** You consent to the processing and adjustments described in clause 3.1(b) and to Users' changes permitted by Part B. You accept that these changes do not distort, mutilate or harm your honour or reputation."
          },
          {
            "type": "p",
            "text": "4.3 **Moral rights.** To the extent the law allows, you agree not to assert moral rights (including any right under section 57 of the Indian Copyright Act, 1957) against Aapastech, its Affiliates or Users for any use permitted by this Agreement. Where your employees or contractors created the material, you will obtain the same agreement from them. This clause limits only how such rights are enforced. It does not claim to remove any right that cannot legally be waived."
          }
        ]
      },
      {
        "title": "5. Brand Assets",
        "blocks": [
          {
            "type": "p",
            "text": "5.1 You grant Aapastech and its Affiliates a non-exclusive, worldwide, royalty-free licence, for as long as an Approved Material remains in the Public Library or in use, to use your name, library name and product identifiers (including SKUs) as you supplied them. This licence covers only identifying you as the contributor, and naming, labelling, searching and filtering your Approved Materials."
          },
          {
            "type": "p",
            "text": "5.2 Users may show your name and SKUs alongside a material only to identify it. This does not suggest that you endorse them."
          },
          {
            "type": "p",
            "text": "5.3 You must not include logos, watermarks, or third-party marks or artwork inside texture images. Aapastech may reject or remove any material that does."
          }
        ]
      },
      {
        "title": "6. Physical products are excluded",
        "blocks": [
          {
            "type": "p",
            "text": "6.1 This Agreement is about **digital depiction only.** Nothing in it gives Aapastech or any User any right to manufacture, sell or copy any physical product, pattern, finish or surface design shown in an Approved Material. The promise in clause 3.3 does not apply to any such physical activity."
          }
        ]
      },
      {
        "title": "7. What you confirm",
        "blocks": [
          {
            "type": "p",
            "text": "You confirm, on the date you submit and again on the date each material is approved, that:"
          },
          {
            "type": "ul",
            "items": [
              "7.1 you own, or are authorised to license, everything in each Contributed Material as set out in this Agreement;",
              "7.2 the Signatory has authority to bind you;",
              "7.3 no Contributed Material infringes anyone's intellectual property, privacy or publicity rights;",
              "7.4 no Contributed Material contains personal data, identifiable people, confidential information, malware, hidden content, or unlawful, obscene, defamatory or offensive material;",
              "7.5 your rights in the materials are not subject to any exclusive licence or other conflicting licence;",
              "7.6 the metadata you supply (names, SKUs, specifications) is accurate. Any prices are indicative only, and are not an offer by you to any User;",
              "7.7 you are not subject to sanctions administered by India, Canada, the European Union, the United Kingdom, the United States or the United Nations."
            ]
          }
        ]
      },
      {
        "title": "8. Withdrawal, retirement and takedown",
        "blocks": [
          {
            "type": "p",
            "text": "8.1 **Withdrawal request.** You may ask Aapastech to withdraw an Approved Material. Aapastech will then **retire** it within a reasonable time: it stops being offered for new use or copying. Existing uses, copies and published experiences may continue under the licence. Aapastech has no duty to recall them."
          },
          {
            "type": "p",
            "text": "8.2 **Where you lose the right.** If you tell us in writing that you no longer have the right to license a material (for example, a third party has made a valid claim), Aapastech will retire it and may, at its discretion, also remove it from the Platform. You remain responsible under clause 10 for any claim that results."
          },
          {
            "type": "p",
            "text": "8.3 **Aapastech's discretion.** Aapastech may approve, reject, retire, replace, remove or restore any material, and may suspend or discontinue the Public Library, at any time and for any reason. It owes you no obligation to publish, keep or promote any material."
          },
          {
            "type": "p",
            "text": "8.4 **Infringement notices (India).** Notices go to the Grievance Officer: **Shikha Gupta, contact@aapastech.com**. Aapastech will act on them under the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021."
          },
          {
            "type": "p",
            "text": "8.5 **Infringement notices (United States).** Notices under 17 U.S.C. §512 go to Aapastech's designated agent, **Shikha Gupta, contact@aapastech.com**. A notice must include the elements required by §512(c)(3), and counter-notices must meet §512(g)(3). Aapastech will remove or disable access to the material identified, notify the affected parties, and may restore it as §512(g) allows. Aapastech ends the access of repeat infringers where appropriate."
          }
        ]
      },
      {
        "title": "9. Liability",
        "blocks": [
          {
            "type": "p",
            "text": "9.1 **No warranty from us.** Aapastech provides the Platform and the Public Library \"as is\" and \"as available\". To the fullest extent the law allows, it gives no warranty of any kind: about availability, accuracy, approval, retention, attribution, promotion, or anything Users do."
          },
          {
            "type": "p",
            "text": "9.2 **What we are never liable for.** Aapastech is not liable for any of the following, however caused, even if it was told they might happen:"
          },
          {
            "type": "ul",
            "items": [
              "indirect, incidental, special, consequential, exemplary or punitive loss;",
              "lost profits, revenue, goodwill, data, business or opportunity;",
              "harm to reputation;",
              "anything a User or any other third party does with an Approved Material, including how a User describes a copy;",
              "any decision to approve, reject, retire, remove or restore a material."
            ]
          },
          {
            "type": "p",
            "text": "9.3 **Cap.** Aapastech's total liability arising out of or relating to this Agreement is limited to the greater of:"
          },
          {
            "type": "ul",
            "items": [
              "(a) the fees you paid Aapastech for the Platform in the 12 months before the event giving rise to the claim; and",
              "(b) INR 10,000."
            ]
          },
          {
            "type": "p",
            "text": "9.4 **Exceptions.** Nothing in this Agreement limits liability for fraud, or any other liability that cannot be limited by law. Nothing in it shortens any limitation period set by law."
          },
          {
            "type": "p",
            "text": "9.5 **Events outside our control.** Aapastech is not liable for any delay or failure caused by events beyond its reasonable control. These include outages at its hosting, storage or network providers."
          }
        ]
      },
      {
        "title": "10. Indemnity",
        "blocks": [
          {
            "type": "p",
            "text": "10.1 You will defend, indemnify and hold harmless Aapastech, its Affiliates, and their directors, officers, employees and Users against all claims, losses, liabilities, fines, costs and expenses (including reasonable legal fees) arising from:"
          },
          {
            "type": "ul",
            "items": [
              "(a) a breach of clause 7 or of this Agreement;",
              "(b) a claim that a Contributed Material, used as this Agreement permits, infringes or violates anyone's rights;",
              "(c) claims by your personnel or licensors relating to the Contributed Materials."
            ]
          },
          {
            "type": "p",
            "text": "10.2 Aapastech may take control of the defence and any settlement, at your cost. You may not settle a claim in a way that places an obligation on someone you are indemnifying without their written consent."
          }
        ]
      },
      {
        "title": "11. Data and records",
        "blocks": [
          {
            "type": "p",
            "text": "11.1 Aapastech processes the Signatory's and your personnel's personal data (name, email, role, IP address, user agent, timestamps). It does so to run submissions, moderation, credit and audit records, to send notices, and to protect its legal position. Processing follows the Privacy Policy (https://thridify.com/privacy-policy) and the Digital Personal Data Protection Act, 2023 where it applies."
          },
          {
            "type": "p",
            "text": "11.2 You agree that Aapastech's electronic records are admissible evidence of this Agreement and of how it was carried out. These records include acceptance details, audit logs, content hashes, IP addresses and timestamps (Information Technology Act, 2000; Bharatiya Sakshya Adhiniyam, 2023)."
          }
        ]
      },
      {
        "title": "12. Term, changes and survival",
        "blocks": [
          {
            "type": "p",
            "text": "12.1 This Agreement takes effect when you first accept it and applies to every submission you make until Aapastech publishes a new version. A new version applies only to submissions made after you accept it."
          },
          {
            "type": "p",
            "text": "12.2 Clauses 2 to 13 continue to apply after the closure or deletion of your account, and after any material is retired or removed."
          }
        ]
      },
      {
        "title": "13. General",
        "blocks": [
          {
            "type": "p",
            "text": "13.1 **Governing law.** The laws of India govern this Agreement."
          },
          {
            "type": "p",
            "text": "13.2 **Disputes.** Any dispute arising out of or in connection with this Agreement will be finally settled by arbitration:"
          },
          {
            "type": "ul",
            "items": [
              "administered by the Delhi International Arbitration Centre (DIAC) under its rules;",
              "before a sole arbitrator appointed under those rules;",
              "seated in New Delhi;",
              "conducted in English."
            ]
          },
          {
            "type": "p",
            "text": "Either party may seek urgent interim relief from any competent court. Subject to arbitration, the courts at New Delhi have exclusive jurisdiction."
          },
          {
            "type": "p",
            "text": "13.3 **Transfer of this Agreement.** Aapastech may assign or transfer this Agreement to an Affiliate, an acquirer or a successor without your consent. You may not assign it without Aapastech's written consent."
          },
          {
            "type": "p",
            "text": "13.4 **Entire agreement.** This Agreement, Part B and the Platform Terms of Service (https://thridify.com/terms-of-service) are the entire agreement on this subject. If they conflict, this Agreement prevails for Contributed Materials."
          },
          {
            "type": "p",
            "text": "13.5 **Severability.** If a provision is invalid, it applies to the smallest extent needed to make it enforceable, and the rest of the Agreement continues."
          },
          {
            "type": "p",
            "text": "13.6 **No waiver or partnership.** A delay in exercising a right is not a waiver of it. This Agreement creates no partnership, joint venture, agency or employment."
          },
          {
            "type": "p",
            "text": "13.7 **Notices.** Aapastech may give notice by email to the account owner or through the Platform. You must send notices to contact@aapastech.com."
          },
          {
            "type": "p",
            "text": "13.8 **Injunctions.** A breach of clauses 3 to 7 may cause harm for which an injunction is an appropriate remedy."
          }
        ]
      }
    ]
  },
  {
    "title": "PART B — THRIDIFY PUBLIC MATERIAL LICENCE (PML-1.0)",
    "sections": [
      {
        "title": "B-1 Grant",
        "blocks": [
          {
            "type": "p",
            "text": "Aapastech grants each User a non-exclusive, worldwide, royalty-free licence to use, reproduce, display, adapt and distribute Approved Materials, and copies of them, for commercial or non-commercial purposes. The licence is perpetual, subject to B-5, and can be transferred only together with the User's business. It covers use within the User's products, product experiences, configurators, renders, images, videos, AR and 3D content, websites, marketplaces and marketing, including content made with, published from, or exported from the Platform."
          }
        ]
      },
      {
        "title": "B-2 Restrictions",
        "blocks": [
          {
            "type": "p",
            "text": "Users must not:"
          },
          {
            "type": "ul",
            "items": [
              "(1) sell, license or distribute Approved Materials as standalone texture, material or asset files, packs or libraries, or in any form that substitutes for the Public Library;",
              "(2) use them to train or evaluate machine-learning models for a competing texture, material or 3D-asset product;",
              "(3) claim to have created them;",
              "(4) remove or falsify credit metadata supplied by the Platform;",
              "(5) present a product as made or endorsed by the contributing brand when it is not, including by keeping the brand's name or SKU on a copy used for a different product;",
              "(6) use them unlawfully or in a defamatory, obscene or misleading way."
            ]
          }
        ]
      },
      {
        "title": "B-3 Physical products excluded",
        "blocks": [
          {
            "type": "p",
            "text": "This licence covers digital depiction only. It gives no right to manufacture, sell or reproduce any physical product, pattern or finish."
          }
        ]
      },
      {
        "title": "B-4 Copies",
        "blocks": [
          {
            "type": "p",
            "text": "A User who copies an Approved Material may change its metadata and parameters and add their own files. The underlying files remain covered by this licence. Files the User adds remain the User's."
          }
        ]
      },
      {
        "title": "B-5 No warranty, liability, retirement or termination",
        "blocks": [
          {
            "type": "ul",
            "items": [
              "Approved Materials are provided \"as is\", with no warranty, including about non-infringement, accuracy of names, SKUs, prices or specifications, or colour fidelity. Users must check a material matches any real product they sell.",
              "Part A clause 9 applies to Users in the same way.",
              "Aapastech may retire or remove a material at any time. Retirement does not end the licence for existing uses.",
              "Aapastech may end this licence for a User who breaches B-2."
            ]
          }
        ]
      },
      {
        "title": "B-6 Indemnity",
        "blocks": [
          {
            "type": "p",
            "text": "Each User indemnifies Aapastech against claims arising from that User's breach of this licence."
          }
        ]
      },
      {
        "title": "B-7 Law",
        "blocks": [
          {
            "type": "p",
            "text": "Part A clauses 13.1 and 13.2 apply."
          }
        ]
      }
    ]
  }
];
