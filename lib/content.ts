// All page content lives here so every template (service, form, division,
// country) is generated from one source and cross-links stay consistent.
// Figures are for tax year 2026 unless stated.

export type Service = {
  slug: string;
  title: string;
  group: string;
  answer: string;
  points: string[];
  forms: string[];
};

export type TaxForm = {
  slug: string;
  code: string;
  name: string;
  group: string;
  purpose: string;
  who: string;
  due: string;
  service: string;
};

export type Division = {
  slug: string;
  title: string;
  answer: string;
  services: string[];
};

export type Country = {
  slug: string;
  name: string;
  inName: string;
  treaty: boolean;
  totalization: boolean;
  taxYear: string;
  localDeadline: string;
  pensions: string;
  traps: string;
};

export const serviceGroups = [
  "Annual compliance",
  "Catch-up & amnesty",
  "Avoiding double taxation",
  "Foreign income & assets",
  "Business & entities",
  "Family, trusts & estates",
  "Life changes & advisory",
];

export const services: Service[] = [
  {
    slug: "expat-tax-returns",
    title: "US Expat Tax Return Preparation",
    group: "Annual compliance",
    answer:
      "US citizens and green card holders must file a federal return every year, wherever they live. We prepare your Form 1040 with the foreign-income schedules it needs, choose between the exclusion and the credit, and file electronically before the June 15 expat deadline.",
    points: [
      "Federal return with Form 2555 or Form 1116, whichever leaves you better off",
      "FBAR and Form 8938 checked in the same engagement",
      "Filed by June 15, or extended to October 15 when records are late",
    ],
    forms: ["1040", "2555", "1116", "schedule-b", "4868"],
  },
  {
    slug: "fbar",
    title: "FBAR Filing",
    group: "Annual compliance",
    answer:
      "If the combined highest balances of your foreign accounts passed $10,000 at any point in the year, you must file FinCEN Form 114. We gather each account's maximum value, convert it at the Treasury year-end rate and e-file through the BSA system.",
    points: [
      "Every account you own or can sign on, including joint and business accounts",
      "Treasury Reporting Rates of Exchange applied correctly",
      "Due April 15 with an automatic extension to October 15",
    ],
    forms: ["fbar", "schedule-b"],
  },
  {
    slug: "fatca",
    title: "FATCA Reporting",
    group: "Annual compliance",
    answer:
      "Form 8938 reports specified foreign financial assets once they pass the thresholds for taxpayers abroad: $200,000 at year-end or $300,000 at any time for single filers. It overlaps with the FBAR but is a separate form, filed with your return.",
    points: [
      "Thresholds double for joint filers ($400,000 / $600,000)",
      "Covers accounts, foreign securities and some pensions",
      "The penalty for a missed form starts at $10,000",
    ],
    forms: ["8938", "fbar"],
  },
  {
    slug: "state-tax",
    title: "State Tax & Residency Exit",
    group: "Annual compliance",
    answer:
      "Leaving the US does not always end state tax. States such as California, New York, Virginia and New Mexico can keep treating you as a resident while you keep a home, a driver's licence or other ties. We review your ties, file the final part-year return and document your exit.",
    points: [
      "Domicile review against your state's own rules",
      "Part-year or final resident state return",
      "A checklist of ties to close: licence, voter registration, mailing address",
    ],
    forms: ["1040"],
  },
  {
    slug: "streamlined-filing",
    title: "Streamlined Filing (SFOP / SDOP)",
    group: "Catch-up & amnesty",
    answer:
      "The Streamlined Filing Compliance Procedures let Americans whose non-filing was non-wilful catch up with three years of tax returns and six years of FBARs. If you live abroad and qualify for the Foreign Offshore version, there is no penalty. The Domestic version carries a 5% penalty.",
    points: [
      "Eligibility check against the 330-day non-residency test",
      "Three returns and six FBARs prepared together",
      "Non-wilful certification (Form 14653 or 14654) drafted with you",
    ],
    forms: ["14653", "14654", "fbar", "1040"],
  },
  {
    slug: "delinquent-submissions",
    title: "Delinquent FBAR & Information Return Procedures",
    group: "Catch-up & amnesty",
    answer:
      "If you filed your returns and reported all your income but missed FBARs or information returns such as Forms 5471 or 3520, the IRS delinquent submission procedures may let you file late with a reasonable-cause statement instead of entering Streamlined.",
    points: [
      "For taxpayers with no underreported income",
      "Late FBARs filed with an explanation statement",
      "Late information returns filed with a reasonable-cause statement",
    ],
    forms: ["fbar", "5471", "3520", "8938"],
  },
  {
    slug: "amended-returns",
    title: "Prior-Year & Amended Returns",
    group: "Catch-up & amnesty",
    answer:
      "Form 1040-X corrects a return you already filed: a missed exclusion, a foreign tax credit you didn't claim, or income converted at the wrong rate. For years you skipped, we file late original returns. Refund claims are generally open for three years.",
    points: [
      "Claim missed foreign tax credits and refunds",
      "Late original returns for unfiled years",
      "Corrected currency conversions and treaty positions",
    ],
    forms: ["1040-x", "1040", "1116"],
  },
  {
    slug: "feie-ftc",
    title: "Foreign Earned Income Exclusion & Foreign Tax Credit",
    group: "Avoiding double taxation",
    answer:
      "The exclusion (Form 2555) lets qualifying expats exclude up to $132,900 of foreign earned income for 2026. The credit (Form 1116) reduces US tax dollar for dollar by the foreign income tax you paid. In higher-tax countries the credit usually wins, so we model both.",
    points: [
      "Bona fide residence or 330-day physical presence test",
      "Unused foreign tax credits carry forward ten years",
      "The choice affects the refundable child tax credit and IRA contributions",
    ],
    forms: ["2555", "1116", "8960"],
  },
  {
    slug: "tax-treaties",
    title: "Tax Treaty Analysis",
    group: "Avoiding double taxation",
    answer:
      "The US has income tax treaties with more than 60 countries, but nearly all contain a saving clause that lets the US tax its citizens as if the treaty did not exist. The useful exceptions, such as pensions, social security and residency tie-breakers, are where we focus.",
    points: [
      "Saving-clause exceptions identified article by article",
      "Form 8833 disclosure where a treaty position is taken",
      "Dual-residency tie-breaker analysis for green card holders",
    ],
    forms: ["8833", "1116"],
  },
  {
    slug: "totalization",
    title: "Self-Employment Tax & Totalization Agreements",
    group: "Avoiding double taxation",
    answer:
      "The foreign earned income exclusion does not remove the 15.3% US self-employment tax. The US has totalization agreements with 30 countries that assign social security coverage to one system, and a certificate of coverage from that country can exempt you from US self-employment tax.",
    points: [
      "Schedule SE and certificate of coverage review",
      "Countries with and without agreements handled differently",
      "Planning around US Social Security credits",
    ],
    forms: ["schedule-c-se", "1040-es"],
  },
  {
    slug: "foreign-pensions",
    title: "Foreign Pensions & Retirement Accounts",
    group: "Foreign income & assets",
    answer:
      "How the US treats a foreign pension depends on the plan and the treaty. A UK workplace pension or a Canadian RRSP can keep its tax deferral; an Australian super fund or a UK ISA generally gets no special US status. We classify each plan and report it correctly.",
    points: [
      "Contributions, growth and withdrawals treated separately",
      "Trust, PFIC, FBAR and Form 8938 reporting checked",
      "Lump sums and transfers planned before they happen",
    ],
    forms: ["8938", "3520", "8621", "8606"],
  },
  {
    slug: "pfic",
    title: "PFIC Reporting (Foreign Funds)",
    group: "Foreign income & assets",
    answer:
      "Most non-US mutual funds and ETFs are passive foreign investment companies (PFICs). Without an election, gains are taxed at the top rate plus an interest charge. We file Form 8621 for each fund and model QEF and mark-to-market elections where they help.",
    points: [
      "Form 8621 for each fund, each year",
      "QEF and mark-to-market elections",
      "Excess-distribution calculations for past years",
    ],
    forms: ["8621"],
  },
  {
    slug: "foreign-property",
    title: "Foreign Rental Property & Home Sales",
    group: "Foreign income & assets",
    answer:
      "Rent from property abroad goes on Schedule E and is depreciated over 30 years rather than the 27.5 used in the US. When you sell your home, the $250,000 exclusion ($500,000 joint) still applies, but currency movements on a foreign mortgage can create a separate taxable gain.",
    points: [
      "Schedule E with foreign depreciation rules",
      "Section 121 home sale exclusion",
      "Currency gain on repaying a foreign mortgage",
    ],
    forms: ["schedule-e", "1116"],
  },
  {
    slug: "equity-compensation",
    title: "Equity Compensation (RSUs, Options)",
    group: "Foreign income & assets",
    answer:
      "RSUs and stock options earned while you move between countries are taxed partly by each country, based on where you worked during the vesting period. We source the income by workday, apply the right credits and stop the same shares being taxed twice.",
    points: [
      "Workday sourcing across countries",
      "ESPP, ISO and NSO treatment",
      "Foreign tax credits matched to the year of vest or exercise",
    ],
    forms: ["1116", "1040"],
  },
  {
    slug: "foreign-entities",
    title: "Foreign Company Reporting (5471 / 8865 / 8858)",
    group: "Business & entities",
    answer:
      "Owning part of a foreign corporation, an interest in a foreign partnership or a foreign disregarded entity creates annual information returns. A missing Form 5471 carries a $10,000 penalty per form, per year, even when no tax is due.",
    points: [
      "Filing category analysis for each form",
      "Balance sheet and earnings and profits in US terms",
      "Integrated with CFC income and Subpart F calculations",
    ],
    forms: ["5471", "8865", "8858", "926"],
  },
  {
    slug: "gilti",
    title: "GILTI & Subpart F Planning",
    group: "Business & entities",
    answer:
      "US shareholders of a controlled foreign corporation can owe tax on its profits before any dividend is paid. GILTI, renamed net CFC tested income from 2026, and Subpart F decide how much. Section 962 elections and the high-tax exception can reduce or remove the charge.",
    points: [
      "Form 8992 and Subpart F computations",
      "Section 962 election modelling",
      "High-tax exception testing",
    ],
    forms: ["8992", "5471"],
  },
  {
    slug: "non-us-spouse",
    title: "Non-US Spouse & Family Filing",
    group: "Family, trusts & estates",
    answer:
      "Married to someone who isn't American, you usually file as married filing separately, or elect to treat your spouse as a US resident and file jointly. Each choice changes your brackets, your credits and your spouse's reporting exposure. We model both and handle ITINs.",
    points: [
      "Married filing separately vs the Section 6013(g) election",
      "Head of household where a child is a US citizen",
      "Child tax credit through Schedule 8812",
    ],
    forms: ["1040", "schedule-8812"],
  },
  {
    slug: "foreign-trusts-gifts",
    title: "Foreign Trusts, Gifts & Inheritances",
    group: "Family, trusts & estates",
    answer:
      "Gifts and inheritances from non-US persons are not taxable income, but receiving more than $100,000 in a year from a foreign individual or estate must be reported on Form 3520. Foreign trusts, which can include some savings and pension plans, have their own annual filings.",
    points: [
      "Form 3520 for foreign gifts over $100,000",
      "Form 3520-A for foreign grantor trusts",
      "Penalty relief requests for late filings",
    ],
    forms: ["3520", "3520-a"],
  },
  {
    slug: "gift-estate-tax",
    title: "US Gift & Estate Tax",
    group: "Family, trusts & estates",
    answer:
      "US citizens owe gift and estate tax on worldwide assets. The lifetime exemption is $15 million per person for 2026 and the annual gift exclusion is $19,000 per recipient. Gifts to a spouse who isn't a US citizen have a lower annual limit, which we plan around.",
    points: [
      "Form 709 for gifts above the annual exclusion",
      "Estate tax treaties with countries such as the UK, France and Germany",
      "Planning for spouses who aren't US citizens",
    ],
    forms: ["709", "706"],
  },
  {
    slug: "relocation",
    title: "Moving Abroad / Returning to the US (Dual-Status)",
    group: "Life changes & advisory",
    answer:
      "The year a green card holder or foreign national arrives in or leaves the US is often a dual-status year: resident for part of it, non-resident for the rest. US citizens moving abroad file a normal 1040 but need the right qualifying dates. We prepare the return for the year you move.",
    points: [
      "Dual-status return with the required statement",
      "First-year and last-year residency elections",
      "Exclusion qualifying dates and Form 2350 for the move year",
    ],
    forms: ["1040-nr", "1040", "2350", "2555"],
  },
  {
    slug: "expatriation",
    title: "Renunciation & Expatriation Tax",
    group: "Life changes & advisory",
    answer:
      "Giving up US citizenship, or a long-held green card, ends US tax only after a final Form 8854. If you are a covered expatriate (net worth over $2 million, high average income tax, or no five-year compliance certification), an exit tax applies to unrealised gains.",
    points: [
      "Covered-expatriate test before your embassy appointment",
      "Five years of compliance certified",
      "Exit tax computation and deferral options",
    ],
    forms: ["8854"],
  },
  {
    slug: "tax-planning",
    title: "Tax Planning & Consultations",
    group: "Life changes & advisory",
    answer:
      "A one-hour call with an expat tax specialist to plan a move, a sale, a new job or a business abroad. You leave with written notes covering what to file, what it will cost and what to change before the year ends.",
    points: [
      "Planning before you move",
      "Exclusion vs credit modelling for your numbers",
      "Written notes after every call",
    ],
    forms: ["1040-es"],
  },
  {
    slug: "irs-representation",
    title: "IRS Notices & Representation",
    group: "Life changes & advisory",
    answer:
      "An IRS letter sent to a foreign address often arrives with little time left to reply. We read the notice, pull your IRS transcript and respond for you under a Form 2848 power of attorney, from penalty abatement to correspondence audits.",
    points: [
      "Notice reviewed within two business days",
      "First-time and reasonable-cause penalty abatement",
      "Representation in correspondence audits",
    ],
    forms: ["1040-x"],
  },
];

export const formGroups = [
  "Core return & filing",
  "Foreign income & credits",
  "Foreign accounts & assets",
  "Foreign entities",
  "Trusts, gifts & estates",
  "Compliance programs & expatriation",
];

const withReturn = "With your Form 1040, including extensions";

export const forms: TaxForm[] = [
  { slug: "1040", code: "Form 1040", name: "US Individual Income Tax Return", group: "Core return & filing",
    purpose: "The annual federal return filed by every US citizen and resident whose income is above the filing threshold, wherever they live. Foreign income is reported in US dollars and then reduced by the exclusion or the credit.",
    who: "US citizens and green card holders with gross income above the standard deduction ($16,100 single, $32,200 joint for 2026), or $400 of self-employment income.",
    due: "April 15; June 15 automatically if you live abroad; October 15 with Form 4868", service: "expat-tax-returns" },
  { slug: "schedule-b", code: "Schedule B", name: "Interest and Ordinary Dividends", group: "Core return & filing",
    purpose: "Lists interest and dividends. Part III asks every filer whether they had an interest in, or signature authority over, a foreign account; answering yes tells the IRS to expect an FBAR.",
    who: "Filers with more than $1,500 of interest or dividends, or any foreign account.", due: withReturn, service: "fbar" },
  { slug: "schedule-c-se", code: "Schedule C & SE", name: "Self-Employment Income and Tax", group: "Core return & filing",
    purpose: "Schedule C reports profit from a business or freelance work; Schedule SE computes the 15.3% self-employment tax on it. The foreign earned income exclusion reduces income tax but not self-employment tax.",
    who: "Self-employed expats with $400 or more of net earnings, unless a totalization certificate applies.", due: withReturn, service: "totalization" },
  { slug: "schedule-e", code: "Schedule E", name: "Supplemental Income and Loss", group: "Core return & filing",
    purpose: "Reports rent from property you own in the US or abroad, plus income from partnerships, S corporations and trusts. Foreign residential rental property is depreciated over 30 years.",
    who: "Owners of rental property and partners or shareholders in pass-through entities.", due: withReturn, service: "foreign-property" },
  { slug: "1040-x", code: "Form 1040-X", name: "Amended US Individual Income Tax Return", group: "Core return & filing",
    purpose: "Corrects a return you already filed: missed income, an unclaimed foreign tax credit or the wrong filing status. Amended returns can be e-filed.",
    who: "Anyone fixing a filed return. Refund claims are generally open for three years from filing.", due: "Within three years of filing the original, or two years from paying the tax", service: "amended-returns" },
  { slug: "1040-nr", code: "Form 1040-NR", name: "US Nonresident Alien Income Tax Return", group: "Core return & filing",
    purpose: "Filed by non-resident aliens with US-source income. In a dual-status year, one of Form 1040 or 1040-NR is the return and the other is attached as a statement, depending on your status on December 31.",
    who: "Non-resident aliens with US income, and dual-status filers in the year they arrive or leave.", due: "April 15 if you had US wages with withholding, otherwise June 15", service: "relocation" },
  { slug: "1040-es", code: "Form 1040-ES", name: "Estimated Tax for Individuals", group: "Core return & filing",
    purpose: "Quarterly payments for income with no US withholding, which is common for expats with self-employment, investment income or a foreign salary above the exclusion.",
    who: "Anyone expecting to owe $1,000 or more after credits and withholding.", due: "April 15, June 15, September 15 and January 15", service: "tax-planning" },
  { slug: "4868", code: "Form 4868", name: "Application for Automatic Extension of Time to File", group: "Core return & filing",
    purpose: "Extends the filing deadline to October 15. It extends the time to file, not to pay: interest runs on unpaid tax from April 15.",
    who: "Anyone who needs more time. Expats already have until June 15 and can file Form 4868 by then.", due: "April 15, or June 15 for taxpayers abroad", service: "expat-tax-returns" },
  { slug: "2350", code: "Form 2350", name: "Extension of Time to File to Qualify for the Exclusion", group: "Core return & filing",
    purpose: "Gives new expats more time to file until they meet the bona fide residence or physical presence test, so the exclusion can be claimed on the first return instead of amending later.",
    who: "US citizens and residents who recently moved abroad and expect to qualify for the exclusion.", due: "By the regular due date of the return", service: "relocation" },
  { slug: "2555", code: "Form 2555", name: "Foreign Earned Income", group: "Foreign income & credits",
    purpose: "Claims the foreign earned income exclusion, up to $132,900 for 2026, and the foreign housing exclusion or deduction. You must pass the bona fide residence test or the 330-day physical presence test.",
    who: "US citizens and residents with foreign earned income and a tax home abroad.", due: withReturn, service: "feie-ftc" },
  { slug: "1116", code: "Form 1116", name: "Foreign Tax Credit", group: "Foreign income & credits",
    purpose: "Turns foreign income tax you paid into a dollar-for-dollar credit against US tax, limited by income category. Unused credits carry back one year and forward ten.",
    who: "Anyone who paid income tax to another country. Filers with $300 or less ($600 joint) of passive foreign tax can skip the form.", due: withReturn, service: "feie-ftc" },
  { slug: "8833", code: "Form 8833", name: "Treaty-Based Return Position Disclosure", group: "Foreign income & credits",
    purpose: "Discloses a position that a tax treaty overrides or modifies US tax law, such as a residency tie-breaker claim. The penalty for not filing it when required is $1,000 per position.",
    who: "Taxpayers relying on a treaty to reduce US tax, subject to the listed exceptions.", due: withReturn, service: "tax-treaties" },
  { slug: "schedule-8812", code: "Schedule 8812", name: "Credits for Qualifying Children", group: "Foreign income & credits",
    purpose: "Computes the child tax credit, worth up to $2,200 per child, and its refundable part. Claiming the foreign earned income exclusion removes the refundable part, which can make the credit method better.",
    who: "Parents of children under 17 who have Social Security numbers.", due: withReturn, service: "non-us-spouse" },
  { slug: "8960", code: "Form 8960", name: "Net Investment Income Tax", group: "Foreign income & credits",
    purpose: "A 3.8% tax on investment income once modified AGI passes $200,000 ($250,000 joint). Under US law, foreign tax credits generally cannot offset it, which surprises many expats.",
    who: "Filers above the income threshold with interest, dividends, gains or rent.", due: withReturn, service: "feie-ftc" },
  { slug: "8606", code: "Form 8606", name: "Nondeductible IRAs", group: "Foreign income & credits",
    purpose: "Tracks after-tax basis in traditional IRAs and Roth conversions. Expats who exclude all their earned income may not be able to contribute to an IRA at all.",
    who: "Anyone with nondeductible IRA contributions, conversions or Roth distributions.", due: withReturn, service: "foreign-pensions" },
  { slug: "fbar", code: "FinCEN 114", name: "Report of Foreign Bank and Financial Accounts (FBAR)", group: "Foreign accounts & assets",
    purpose: "Filed with FinCEN, not the IRS, when the combined maximum value of your foreign accounts exceeds $10,000 at any time in the year. Each account is listed with its highest balance.",
    who: "US persons with a financial interest in, or signature authority over, foreign accounts.", due: "April 15, automatically extended to October 15", service: "fbar" },
  { slug: "8938", code: "Form 8938", name: "Statement of Specified Foreign Financial Assets", group: "Foreign accounts & assets",
    purpose: "Reports foreign accounts, securities and interests in foreign entities above the FATCA thresholds. For single filers abroad that is $200,000 at year-end or $300,000 at any time.",
    who: "US taxpayers above the thresholds for their filing status and residence.", due: withReturn, service: "fatca" },
  { slug: "8621", code: "Form 8621", name: "Information Return by a Shareholder of a PFIC", group: "Foreign accounts & assets",
    purpose: "Filed for each foreign mutual fund, ETF or other passive foreign investment company you hold. It is also where QEF and mark-to-market elections are made.",
    who: "PFIC shareholders. Small holdings with no distributions ($25,000, or $50,000 joint) are excepted.", due: withReturn, service: "pfic" },
  { slug: "5471", code: "Form 5471", name: "Information Return With Respect to Certain Foreign Corporations", group: "Foreign entities",
    purpose: "Reports the ownership, income, balance sheet and related-party transactions of a foreign corporation. Five filing categories decide which schedules you complete. The penalty for a missing form is $10,000.",
    who: "US officers, directors and shareholders of foreign corporations who meet a category test.", due: withReturn, service: "foreign-entities" },
  { slug: "8865", code: "Form 8865", name: "Return With Respect to Certain Foreign Partnerships", group: "Foreign entities",
    purpose: "Reports interests in foreign partnerships, including many LLPs and some companies formed abroad, and transfers of property to them.",
    who: "US persons who control or hold 10% or more of a foreign partnership, or contribute property to one.", due: withReturn, service: "foreign-entities" },
  { slug: "8858", code: "Form 8858", name: "Foreign Disregarded Entities and Foreign Branches", group: "Foreign entities",
    purpose: "Covers foreign entities treated as disregarded for US tax, such as a single-owner company that elected out of corporate status, and foreign branches.",
    who: "US owners of foreign disregarded entities or foreign branches.", due: withReturn, service: "foreign-entities" },
  { slug: "8992", code: "Form 8992", name: "US Shareholder Calculation of GILTI", group: "Foreign entities",
    purpose: "Computes the inclusion of a controlled foreign corporation's tested income on a shareholder's return. From 2026 the regime is renamed net CFC tested income.",
    who: "US shareholders of controlled foreign corporations.", due: withReturn, service: "gilti" },
  { slug: "926", code: "Form 926", name: "Return by a US Transferor of Property to a Foreign Corporation", group: "Foreign entities",
    purpose: "Reports cash or property you transfer to a foreign corporation, for example when capitalising your own company abroad. Cash transfers over $100,000 in 12 months trigger it.",
    who: "US persons transferring property to a foreign corporation.", due: withReturn, service: "foreign-entities" },
  { slug: "3520", code: "Form 3520", name: "Transactions With Foreign Trusts and Receipt of Foreign Gifts", group: "Trusts, gifts & estates",
    purpose: "Reports transactions with foreign trusts and large gifts or inheritances from non-US persons: more than $100,000 from a foreign individual or estate in a year. Penalties start at 5% of the gift per month, up to 25%.",
    who: "Recipients of large foreign gifts, and owners and beneficiaries of foreign trusts.", due: withReturn, service: "foreign-trusts-gifts" },
  { slug: "3520-a", code: "Form 3520-A", name: "Annual Information Return of Foreign Trust With a US Owner", group: "Trusts, gifts & estates",
    purpose: "The trust's own annual return when a US person is treated as its owner. If the trustee doesn't file it, the US owner must file a substitute.",
    who: "Foreign grantor trusts with a US owner.", due: "March 15, with an extension available", service: "foreign-trusts-gifts" },
  { slug: "709", code: "Form 709", name: "US Gift (and Generation-Skipping Transfer) Tax Return", group: "Trusts, gifts & estates",
    purpose: "Reports gifts above $19,000 per recipient for 2026. Tax is rarely due because the gift counts against the $15 million lifetime exemption.",
    who: "US citizens and domiciliaries making taxable gifts.", due: "April 15, extended with your income tax extension", service: "gift-estate-tax" },
  { slug: "706", code: "Form 706", name: "US Estate (and Generation-Skipping Transfer) Tax Return", group: "Trusts, gifts & estates",
    purpose: "Filed for the estate of a US citizen whose worldwide gross estate plus lifetime taxable gifts exceeds the exemption, or to pass unused exemption to a surviving spouse.",
    who: "Executors of larger estates.", due: "Nine months after death, with a six-month extension available", service: "gift-estate-tax" },
  { slug: "14653", code: "Form 14653", name: "Certification for Streamlined Foreign Offshore Procedures", group: "Compliance programs & expatriation",
    purpose: "A signed statement that your failure to file and report was non-wilful, with a narrative explaining why. Submitted with three years of returns and six years of FBARs.",
    who: "Taxpayers abroad who meet the non-residency test.", due: "With your Streamlined submission", service: "streamlined-filing" },
  { slug: "14654", code: "Form 14654", name: "Certification for Streamlined Domestic Offshore Procedures", group: "Compliance programs & expatriation",
    purpose: "The domestic version, used when you don't meet the non-residency test. It computes the 5% penalty on the highest year-end balance of unreported foreign assets.",
    who: "US residents with non-wilful foreign reporting failures who filed their original returns.", due: "With your Streamlined submission", service: "streamlined-filing" },
  { slug: "8854", code: "Form 8854", name: "Initial and Annual Expatriation Statement", group: "Compliance programs & expatriation",
    purpose: "Filed for the year you renounce citizenship or end long-term residency. It certifies five years of compliance and decides whether you are a covered expatriate.",
    who: "Former citizens, and long-term residents who held a green card in 8 of the last 15 years.", due: "With your final return", service: "expatriation" },
];

export const divisions: Division[] = [
  { slug: "individuals-families", title: "Individuals & Families",
    answer: "For Americans abroad with a salary, a family and savings in their new country. One yearly engagement covers the federal return, the FBAR, FATCA, and the decisions that come with a spouse who isn't American and children born abroad.",
    services: ["expat-tax-returns", "fbar", "fatca", "feie-ftc", "non-us-spouse", "foreign-pensions", "pfic"] },
  { slug: "business", title: "Business Owners & Entrepreneurs",
    answer: "For freelancers, founders and owners of companies registered outside the US. We handle self-employment tax, foreign company reporting and the rules that can tax a company's profit to you before you take a dividend.",
    services: ["totalization", "foreign-entities", "gilti", "equity-compensation", "tax-planning", "expat-tax-returns"] },
  { slug: "catch-up", title: "Accidental Americans & Catch-Up Filers",
    answer: "For people who learned late that they owe US filings: born in the US, born to an American parent, or never told. Most catch up through the Streamlined procedures, and those who live abroad usually pay no penalty.",
    services: ["streamlined-filing", "delinquent-submissions", "amended-returns", "fbar", "expatriation"] },
  { slug: "relocation", title: "Moving Abroad & Returning to the US",
    answer: "For anyone in the year of a move, in either direction. A move changes your federal and state residency, how your pensions and home sale are taxed, and which deadlines apply, so it is worth planning before you go.",
    services: ["relocation", "state-tax", "tax-planning", "foreign-pensions", "foreign-property", "equity-compensation"] },
  { slug: "green-card-holders", title: "Green Card Holders Abroad",
    answer: "A green card keeps you a US tax resident, wherever you live, until it is formally given up. We cover your yearly filings, treaty tie-breaker positions and the exit tax test for long-term residents.",
    services: ["expat-tax-returns", "tax-treaties", "expatriation", "relocation", "fbar"] },
  { slug: "private-client", title: "High-Net-Worth, Trusts & Estates",
    answer: "For families with significant assets in more than one country: trusts, inheritances, investment portfolios and companies. We coordinate US reporting with your local advisers and plan gifts and estates across borders.",
    services: ["foreign-trusts-gifts", "gift-estate-tax", "pfic", "gilti", "foreign-entities", "fatca"] },
];

export const countries: Country[] = [
  { slug: "canada", name: "Canada", inName: "in Canada", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "April 30 (June 15 if self-employed)",
    pensions: "RRSPs and RRIFs keep their US tax deferral under the treaty with no separate election form. TFSAs and RESPs are not recognised by the US, and their growth is taxable.",
    traps: "Canadian mutual funds and ETFs held in a TFSA or non-registered account are usually PFICs." },
  { slug: "mexico", name: "Mexico", inName: "in Mexico", treaty: true, totalization: false, taxYear: "Calendar year", localDeadline: "April 30",
    pensions: "AFORE accounts have no settled US treatment, so we document a reasoned position each year. Mexican social security benefits are covered by the treaty.",
    traps: "With no totalization agreement in force, self-employed Americans can owe social security in both countries." },
  { slug: "uk", name: "the UK", inName: "in the UK", treaty: true, totalization: true, taxYear: "6 April to 5 April", localDeadline: "31 January (online return)",
    pensions: "Workplace pensions and SIPPs keep their growth deferral under Article 18 of the treaty. ISAs get no US tax shelter, and the tax-free 25% lump sum may be taxable in the US.",
    traps: "UK unit trusts, OEICs and most ETFs inside ISAs are PFICs. The UK tax year also differs from the US calendar year." },
  { slug: "germany", name: "Germany", inName: "in Germany", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "31 July (later with an adviser)",
    pensions: "Statutory pension contributions fall under the totalization agreement. Riester and Rürup plans need plan-by-plan review for US treatment.",
    traps: "German investment funds (Investmentfonds) are PFICs, and solidarity surcharge and church tax need care when claiming foreign tax credits." },
  { slug: "france", name: "France", inName: "in France", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "May to June, by département",
    pensions: "Contributions to French social security are covered by the totalization agreement. Assurance-vie contracts often hold funds that are PFICs.",
    traps: "Joint French household taxation must be split between spouses for a US separate return." },
  { slug: "australia", name: "Australia", inName: "in Australia", treaty: true, totalization: true, taxYear: "1 July to 30 June", localDeadline: "31 October",
    pensions: "Superannuation has no settled US treatment. It is often reported as a foreign trust or employees' trust, and we document the position chosen.",
    traps: "Australian managed funds are PFICs, and the June year-end means income must be re-cut into calendar years." },
  { slug: "israel", name: "Israel", inName: "in Israel", treaty: true, totalization: false, taxYear: "Calendar year", localDeadline: "Generally 30 April",
    pensions: "Keren pensia is generally treated as a foreign pension. Keren hishtalmut is not covered by the treaty, so its growth may be taxable in the US.",
    traps: "Israeli mutual funds are PFICs, and with no totalization agreement in force, self-employed filers can pay social security twice." },
  { slug: "japan", name: "Japan", inName: "in Japan", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "March 15",
    pensions: "Contributions to the Japanese national pension are covered by the totalization agreement. iDeCo plans need review for US treatment.",
    traps: "NISA accounts are not tax-free for US purposes and usually hold Japanese investment trusts, which are PFICs." },
  { slug: "spain", name: "Spain", inName: "in Spain", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "30 June (campaign opens in April)",
    pensions: "Spanish social security falls under the totalization agreement. Planes de pensiones need review for US treatment.",
    traps: "Spain's wealth tax is not an income tax and cannot be claimed as a foreign tax credit." },
  { slug: "italy", name: "Italy", inName: "in Italy", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "31 October (Modello Redditi)",
    pensions: "INPS contributions fall under the totalization agreement. TFR severance accruals and fondi pensione need review.",
    traps: "Italian funds are PFICs, and IVIE/IVAFE wealth taxes are not creditable as income tax." },
  { slug: "netherlands", name: "the Netherlands", inName: "in the Netherlands", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "1 May",
    pensions: "Employer pensions are generally covered by the treaty. Dutch social security falls under the totalization agreement.",
    traps: "Box 3 tax on deemed returns does not line up with US income, which complicates foreign tax credits." },
  { slug: "switzerland", name: "Switzerland", inName: "in Switzerland", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "Set by canton, commonly 31 March",
    pensions: "Pillar 2 occupational pensions are generally covered by the treaty. Pillar 3a accounts have less certain US treatment.",
    traps: "Many Swiss banks restrict US clients, and Swiss funds held in 3a or brokerage accounts are PFICs." },
  { slug: "ireland", name: "Ireland", inName: "in Ireland", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "31 October (Form 11)",
    pensions: "Occupational pensions and PRSAs are generally covered by the treaty. Irish social security falls under the totalization agreement.",
    traps: "Irish-domiciled UCITS ETFs, popular across Europe, are PFICs." },
  { slug: "portugal", name: "Portugal", inName: "in Portugal", treaty: true, totalization: true, taxYear: "Calendar year", localDeadline: "30 June (campaign opens 1 April)",
    pensions: "Portuguese social security falls under the totalization agreement. PPR retirement savings plans need review for US treatment.",
    traps: "The NHR regime closed to new applicants in 2024 and was replaced by IFICI. Neither changes your US filing duty." },
  { slug: "uae", name: "the UAE", inName: "in the UAE", treaty: false, totalization: false, taxYear: "No personal income tax", localDeadline: "No personal return",
    pensions: "End-of-service gratuity is generally taxable in the US when paid, and may qualify as foreign earned income.",
    traps: "With no local income tax there is nothing to credit, so the foreign earned income exclusion does most of the work." },
  { slug: "singapore", name: "Singapore", inName: "in Singapore", treaty: false, totalization: false, taxYear: "Calendar year (year of assessment)", localDeadline: "18 April (e-filing)",
    pensions: "CPF accounts have no settled US treatment. We document a reasoned position and report the accounts for FBAR and FATCA.",
    traps: "With no income tax treaty and no totalization agreement, the exclusion and foreign tax credit are your only relief." },
];

export const glossary = [
  ["Bona fide residence test", "One of two ways to qualify for the foreign earned income exclusion: you have been a resident of a foreign country for an uninterrupted period that includes a full calendar year."],
  ["Physical presence test", "The other way to qualify for the exclusion: you are physically outside the US for at least 330 full days in any 12-month period."],
  ["FBAR", "FinCEN Form 114, the yearly report of foreign accounts required when their combined maximum value exceeds $10,000."],
  ["FATCA", "The Foreign Account Tax Compliance Act. For individuals it means Form 8938; for banks, it means reporting US account holders to the IRS."],
  ["FEIE", "The foreign earned income exclusion, up to $132,900 for 2026, claimed on Form 2555."],
  ["Foreign tax credit", "A dollar-for-dollar reduction of US tax for income tax paid to another country, claimed on Form 1116."],
  ["PFIC", "A passive foreign investment company. Most non-US mutual funds and ETFs are PFICs and are reported on Form 8621."],
  ["Saving clause", "A treaty provision that lets the US tax its citizens as if the treaty did not exist, with listed exceptions."],
  ["Totalization agreement", "A social security agreement that stops workers paying into two systems at once. The US has 30 of them."],
  ["Streamlined procedures", "The IRS program for non-wilful non-filers to catch up with three years of returns and six years of FBARs."],
  ["Covered expatriate", "A former citizen or long-term resident who meets the net worth, tax liability or compliance test and so owes exit tax."],
  ["Dual-status year", "A year in which you were a US resident for part of the year and a non-resident for the rest."],
  ["CFC", "A controlled foreign corporation: one more than 50% owned by US shareholders who each hold 10% or more."],
  ["Tax home", "Your regular place of business or work. It must be abroad to claim the foreign earned income exclusion."],
];

export const deadlines = [
  { date: "2027-01-15", label: "Fourth-quarter 2026 estimated tax payment (Form 1040-ES)" },
  { date: "2027-03-15", label: "Form 3520-A for foreign grantor trusts" },
  { date: "2027-04-15", label: "Tax payment due for 2026, FBAR due, Form 709 due, first 2027 estimated payment" },
  { date: "2027-06-15", label: "Automatic two-month filing extension for Americans abroad; second estimated payment" },
  { date: "2027-09-15", label: "Third-quarter estimated tax payment" },
  { date: "2027-10-15", label: "Extended return deadline with Form 4868; final FBAR deadline" },
  { date: "2027-12-15", label: "Further discretionary extension for taxpayers abroad (requested by letter)" },
];

export const generalFaqs = [
  ["Do I have to file US taxes if I live abroad?", "Yes. US citizens and green card holders are taxed on worldwide income and must file a federal return every year their income is above the filing threshold, wherever they live."],
  ["When is my US tax return due if I live abroad?", "Americans living abroad get an automatic extension to June 15. You can extend again to October 15 with Form 4868. Any tax owed is still due on April 15, and interest runs from then."],
  ["Will I pay tax twice?", "Usually not. The foreign earned income exclusion and the foreign tax credit are designed to remove double taxation, and most expats in countries with higher tax rates owe no US income tax."],
  ["What is the FBAR threshold?", "You must file an FBAR if the combined maximum value of all your foreign accounts was more than $10,000 at any time during the year."],
  ["I haven't filed for years. What should I do?", "If your failure to file was non-wilful, the Streamlined Foreign Offshore Procedures let you catch up with three years of returns and six years of FBARs, normally with no penalty."],
  ["Do you work with clients in any country?", "Yes. Everything is handled online: secure document upload, video consultations and e-filing."],
  ["Can you help with state taxes?", "Yes. We review whether your former state still treats you as a resident and file part-year or final state returns."],
  ["How do I get started?", "Book a 30-minute consultation. We review your situation, tell you what needs filing and send a fixed quote before any work begins."],
];

export const pricing = [
  { name: "Expat return", price: 650, unit: "per year", items: ["Form 1040 with Form 2555 or 1116", "One FBAR (up to 5 accounts)", "Form 8938 if required", "E-filing and a review call"] },
  { name: "Streamlined catch-up", price: 1950, unit: "one time", items: ["Three years of returns", "Six years of FBARs", "Form 14653 certification", "Filing and IRS follow-up"] },
  { name: "Business owner", price: 1400, unit: "per year", items: ["Expat return", "One Form 5471 or 8865", "Self-employment tax review", "CFC income calculations"] },
];

export const addOns = [
  { key: "pfic", label: "PFIC (Form 8621), per fund", price: 150 },
  { key: "state", label: "State part-year return", price: 300 },
  { key: "spouse", label: "Non-US spouse election analysis", price: 200 },
  { key: "rental", label: "Foreign rental property", price: 250 },
  { key: "trust", label: "Form 3520 / 3520-A", price: 450 },
  { key: "expat", label: "Form 8854 expatriation statement", price: 900 },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getForm = (slug: string) => forms.find((f) => f.slug === slug);
export const formsForService = (slug: string) =>
  forms.filter((f) => f.service === slug || getService(slug)?.forms.includes(f.slug));
export const divisionsForService = (slug: string) => divisions.filter((d) => d.services.includes(slug));
