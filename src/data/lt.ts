import { SITE } from "@/data/site";
import type { LtBrandId } from "@/data/lt-affiliates";

/** Facts below were checked against the cited primary pages on this day. */
export const LT_UPDATED = "2026-10-30";
export const LT_UPDATED_LABEL = "2026 m. spalio 30 d.";

export const LT_AUTHOR = {
  name: "Jaunius Kadūnas",
  url: `${SITE.url}/about/`
} as const;

export interface LtFaq {
  question: string;
  answer: string;
}

export interface LtSource {
  href: string;
  label: string;
}

export interface LtRelated {
  href: string;
  label: string;
}

export interface LtPageMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  crumb: string;
  faqs: readonly LtFaq[];
  sources: readonly LtSource[];
  related: readonly LtRelated[];
  /** Visible note where a personal screenshot or cost is still missing. */
  placeholder: string;
  investing: boolean;
  cfd: boolean;
  /** Used when `cfd` is true and the provider is not Trading 212. */
  cfdWarning?: string;
  disclosure: boolean;
}

/**
 * English counterpart of a Lithuanian URL.
 * Null means no English page exists yet, so no hreflang pair is emitted.
 */
export const EN_COUNTERPART: Record<string, string | null> = {
  "/lt/": null,
  "/lt/investicine-saskaita/": null,
  "/lt/investavimo-platformos/": null,
  "/lt/trading-212-atsiliepimai/": null,
  "/lt/interactive-brokers-lietuvoje/": null,
  "/lt/freedom24-atsiliepimai/": null,
  "/lt/xtb-atsiliepimai/": null,
  "/lt/etf-investavimas-lietuvoje/": null,
  "/lt/finbee-atsiliepimai/": null,
  "/lt/profitus-atsiliepimai/": null,
  "/lt/geriausios-investavimo-platformos/": null
};

export function hreflangAlternates(pathname: string): { hrefLang: string; href: string }[] {
  const key = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const englishPath = EN_COUNTERPART[key];
  if (!englishPath) return [];

  return [
    { hrefLang: "lt", href: new URL(key, SITE.url).toString() },
    { hrefLang: "en", href: new URL(englishPath, SITE.url).toString() },
    { hrefLang: "x-default", href: new URL(englishPath, SITE.url).toString() }
  ];
}

export const LT_CAPITAL_WARNING =
  "Kapitalo rizika. Investicijų vertė gali kristi. Galite atgauti mažiau, nei įdėjote, arba prarasti visą sumą. Tai mokomoji informacija, ne asmeninė rekomendacija pirkti, parduoti ar laikyti finansinę priemonę.";

export const LT_CFD_WARNING =
  "CFD yra sudėtingos priemonės ir dėl sverto kyla didelė rizika greitai prarasti pinigus. Trading 212 savo CFD sąlygose rašo, kad 75 proc. mažmeninių investuotojų sąskaitų patiria nuostolių prekiaujant CFD pas šį teikėją. Įvertinkite, ar suprantate, kaip veikia CFD, ir ar galite prisiimti didelę riziką prarasti pinigus.";

export const LT_XTB_CFD_WARNING =
  "CFD yra sudėtingos priemonės ir dėl sverto kyla didelė rizika greitai prarasti pinigus. XTB Limited Kipro svetainės teisinėje informacijoje rašo, kad 77 proc. mažmeninių investuotojų sąskaitų patiria nuostolių prekiaujant CFD pas šį teikėją. Įvertinkite, ar suprantate, kaip veikia CFD, ir ar galite prisiimti didelę riziką prarasti pinigus.";

const HUB = "/lt/";
const INVEST = "/lt/investicine-saskaita/";
const PLATFORMS = "/lt/investavimo-platformos/";
const T212 = "/lt/trading-212-atsiliepimai/";
const IBKR = "/lt/interactive-brokers-lietuvoje/";
const FREEDOM = "/lt/freedom24-atsiliepimai/";
const XTB_PAGE = "/lt/xtb-atsiliepimai/";
const ETF = "/lt/etf-investavimas-lietuvoje/";
const FINBEE = "/lt/finbee-atsiliepimai/";
const PROFITUS = "/lt/profitus-atsiliepimai/";
const BEST = "/lt/geriausios-investavimo-platformos/";

export const LT_NAV: readonly LtRelated[] = [
  { href: INVEST, label: "Investicinė sąskaita" },
  { href: ETF, label: "ETF investavimas" },
  { href: BEST, label: "Geriausios platformos 2026" },
  { href: PLATFORMS, label: "Investavimo platformos" },
  { href: T212, label: "Trading 212" },
  { href: IBKR, label: "Interactive Brokers" },
  { href: XTB_PAGE, label: "XTB" },
  { href: FREEDOM, label: "Freedom24" },
  { href: PROFITUS, label: "Profitus" },
  { href: FINBEE, label: "Finbee" }
];

export interface LicenceRow {
  operator: string;
  site: string;
  brandId: LtBrandId | null;
  licence: string;
  date: string;
}

/** Names and dates as published on the Bank of Lithuania crowdfunding licence list, 2026-10-30. */
export const LB_CROWDFUNDING_LICENCES: readonly LicenceRow[] = [
  {
    operator: "UAB HEAVY FINANCE",
    site: "finance.insoil.com",
    brandId: "insoil",
    licence: "Nr. 1",
    date: "2023-07-14"
  },
  {
    operator: "UAB Go investing",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 2",
    date: "2023-07-14"
  },
  {
    operator: "UAB Greenit Crowd",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 3",
    date: "2023-07-25"
  },
  {
    operator: "UAB Crowdpear",
    site: "crowdpear.com",
    brandId: "crowdpear",
    licence: "Nr. 4",
    date: "2023-07-25"
  },
  {
    operator: "8 stars, UAB",
    site: "letsinvest.eu",
    brandId: "letsinvest",
    licence: "Nr. 5",
    date: "2023-07-25"
  },
  {
    operator: "UAB „Bendras finansavimas“ (Savy)",
    site: "gosavy.com",
    brandId: "savy",
    licence: "Nr. 6",
    date: "2023-08-01"
  },
  {
    operator: "UAB „Trečia diena“",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 7",
    date: "2023-09-12"
  },
  {
    operator: "UAB „Finansų bitė verslui“",
    site: "finbeeeverslui.lt",
    brandId: "finbee-verslui",
    licence: "Nr. 8",
    date: "2023-11-10"
  },
  {
    operator: "UAB Inrento",
    site: "inrento.lt",
    brandId: "inrento",
    licence: "Nr. 9",
    date: "2023-11-10"
  },
  {
    operator: "UAB „Profitus Crowdfunding“",
    site: "profitus.lt (prekės ženklas)",
    brandId: "profitus",
    licence: "Nr. 10",
    date: "2023-11-10"
  },
  {
    operator: "UAB Nordstreet",
    site: "nordstreet.com",
    brandId: "nordstreet",
    licence: "Nr. 11",
    date: "2023-11-10"
  },
  {
    operator: "UAB „FinoMark“",
    site: "finomark.lt",
    brandId: "finomark",
    licence: "Nr. 12",
    date: "2023-11-10"
  },
  {
    operator: "UAB „Perfect Sunday“",
    site: "bemybond.com",
    brandId: "bemybond",
    licence: "Nr. 13",
    date: "2024-04-16"
  },
  {
    operator: "UAB sutelktinio finansavimo platforma „Revestus“",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 14",
    date: "2024-10-22"
  },
  {
    operator: "UAB ROIX",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 15",
    date: "2024-12-10"
  },
  {
    operator: "UAB Bondea",
    site: "svetainės licencijų sąraše nėra",
    brandId: null,
    licence: "Nr. 16",
    date: "2025-07-22"
  },
  {
    operator: "UAB „Finance EU“",
    site: "florrid.com",
    brandId: "florrid",
    licence: "Nr. 17",
    date: "2026-07-31"
  }
];

export interface CommercialRow {
  name: string;
  brandId: LtBrandId | null;
  minimum: string;
  publishedReturn: string;
  fees: string;
  licence: string;
}

export const PLATFORM_TERMS: readonly CommercialRow[] = [
  {
    name: "Profitus",
    brandId: "profitus",
    minimum: "100 €",
    publishedReturn: "9,84 % vidutinė metinė grąža",
    fees: "bendro investuotojo mokesčio pagrindiniame puslapyje nėra",
    licence: "LB sutelktinio finansavimo licencija Nr. 10, UAB „Profitus Crowdfunding“"
  },
  {
    name: "InRento",
    brandId: "inrento",
    minimum: "500 €",
    publishedReturn: "11,56 % vidutinė metinė grąža",
    fees: "bendro investuotojo mokesčio pagrindiniame puslapyje nėra",
    licence: "LB sutelktinio finansavimo licencija Nr. 9, UAB Inrento"
  },
  {
    name: "InSoil (Heavy Finance)",
    brandId: "insoil",
    minimum: "100 € pirminėje rinkoje",
    publishedReturn: "12,95 % svertinė vidutinė palūkanų norma",
    fees: "bendro investuotojo mokesčio pagrindiniame puslapyje nėra",
    licence: "LB sutelktinio finansavimo licencija Nr. 1, UAB HEAVY FINANCE"
  },
  {
    name: "Finbee",
    brandId: "finbee",
    minimum: "5 €",
    publishedReturn: "14,2 % vidutinė palūkanų norma 2025 m.",
    fees: "įskaitymas ir išmokėjimas į banko sąskaitą nemokami",
    licence:
      "Ne licencija Nr. 8. finbee.lt teigia turinti elektroninių pinigų įstaigos licenciją. CSP Nr. 8 priklauso UAB „Finansų bitė verslui“."
  }
];

const VMI_INVEST: LtSource = {
  href: "https://www.vmi.lt/evmi/5552",
  label: "VMI. Apie investicinę sąskaitą"
};
const VMI_GPM: LtSource = {
  href: "https://www.vmi.lt/evmi/tarifai-6-str.-1",
  label: "VMI. GPM tarifai nuo 2026-01-01"
};
const VMI_PRODUCTS: LtSource = {
  href: "https://www.vmi.lt/evmi/i-kokius-finansinius-produktus-galiu-investuoti-per-investicine-saskaita-",
  label: "VMI. Tinkami finansiniai produktai"
};
const LB_LIST: LtSource = {
  href: "https://www.lb.lt/lt/frd-licencijos?ff=1&type=116",
  label: "Lietuvos bankas. Sutelktinio finansavimo licencijos"
};

export const LT_HUB: LtPageMeta = {
  path: HUB,
  title: "Lietuviški gidai",
  description:
    "Lietuviški gidai apie investicinę sąskaitą, ETF mokesčius, brokerius ir sutelktinio finansavimo platformas. Skaičiai patikrinti 2026 m. spalio 30 d.",
  h1: "Lietuviški gidai",
  lede: "Čia yra lietuviški gidai apie investicinę sąskaitą, brokerius ir sutelktinio finansavimo platformas. Skaičiai patikrinti 2026 m. spalio 30 d. pagal VMI, Lietuvos banką ir pačių teikėjų dokumentus. PVM, mažosios bendrijos steigimas ir buhalterija yra kitame puslapyje, buhalteris.ai. Tai paaiškinimai, ne asmeninė konsultacija.",
  crumb: "Lietuviški gidai",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Asmeninių brokerio ekrano kopijų šiame skyriuje dar nėra. Kiekviename gide pažymėta, ką turiu papildyti pats.",
  faqs: [
    {
      question: "Kokia kalba parašyti šie puslapiai?",
      answer:
        "Lietuvių. Angliška svetainės dalis apie įrankius ir užrašus lieka atskirai. Lietuviškų puslapių anglų kalba atitikmenų kol kas nėra."
    },
    {
      question: "Ar tai investavimo arba mokesčių patarimas?",
      answer:
        "Ne. Tekstai paaiškina viešus tarifus ir taisykles. Sprendimą ir deklaraciją turite pasitikrinti pagal savo situaciją, o prireikus su VMI."
    },
    {
      question: "Iš kur paimti skaičiai?",
      answer:
        "Iš VMI, Lietuvos banko, JAV ir Lietuvos mokesčių sutarties bei pačių brokerių ir platformų puslapių. Patikros data yra 2026 m. spalio 30 d. Nepatvirtinto skaičiaus puslapyje nepalikau."
    },
    {
      question: "Kur rasti PVM ir MB mokesčius?",
      answer:
        "Ši svetainė jų nebedengia. PVM, mažosios bendrijos steigimas ir buhalterija yra buhalteris.ai. Čia lieka tik gyventojo investavimo paaiškinimai."
    }
  ],
  sources: [VMI_GPM, LB_LIST],
  related: LT_NAV
};

export const LT_INVEST: LtPageMeta = {
  path: INVEST,
  title: "Investicinė sąskaita: kas tai, kaip atidaryti ir deklaruoti",
  description:
    "Kas yra investicinė sąskaita Lietuvoje, kaip ją deklaruoti GPM311 forma ir kada mokamas 15 proc. GPM. Trading 212, Interactive Brokers ir Lietuvos finansų įstaigos pagal VMI.",
  h1: "Investicinė sąskaita: kas tai, kaip atidaryti ir deklaruoti",
  lede: "Investicinė sąskaita yra nuo 2025 m. sausio 1 d. galiojantis GPM režimas, ne atskiras banko produktas. Nuolatinis Lietuvos gyventojas deklaruoja pinigų sąskaitą EEE, EBPO ar sutarties valstybės finansų įstaigoje. Nuo 2026 m. sausio 1 d. išėmimas, viršijantis įnašą, apmokestinamas 15 proc. GPM, nepriklausomai nuo sumos dydžio.",
  crumb: "Investicinė sąskaita",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano paties sąskaitos ir GPM311 H dalies ekrano kopija. Kol jos nėra, lentelė remiasi tik VMI paaiškinimu, ne mano deklaracija.",
  faqs: [
    {
      question: "Ar investicinė sąskaita yra atskiras banko produktas?",
      answer:
        "Ne. Tai gyventojų pajamų mokesčio režimas. Deklaruojate pinigų sąskaitą, kurią naudojate tik investicijoms. Algos sąskaita, iš kurios mokate kasdienes išlaidas, investicine sąskaita būti negali."
    },
    {
      question: "Kada mokamas pajamų mokestis?",
      answer:
        "Ne tada, kai investicija uždirba palūkanas ar pardavimo pelną sąskaitos viduje, o tada, kai išimate daugiau, nei buvote įnešę. Nuo 2026 m. sausio 1 d. ta viršijanti dalis apmokestinama 15 proc. ir į 20, 25 ar 32 proc. progresiją neįtraukiama."
    },
    {
      question: "Ar Trading 212 ir Interactive Brokers tinka?",
      answer:
        "VMI tiesiogiai rašo, kad Trading 212 sąskaita gali būti deklaruojama, ir pateikia Interactive Brokers Ireland Limited paskyros pavyzdį Lietuvos gyventojui. Sąlyga ta pati: tai turi būti pinigų sąskaita, naudojama tik tinkamiems produktams."
    },
    {
      question: "Ar galima per ją investuoti į kriptovaliutas?",
      answer:
        "Ne. VMI nurodo, kad investicinės sąskaitos režimas pajamoms iš kriptovaliutų netaikomas ir į jas per šią sąskaitą investuoti negalima."
    },
    {
      question: "Iki kada deklaruoti 2025 metų sąskaitą?",
      answer:
        "GPM311 formą už 2025 m. su investicine sąskaita VMI leidžia pateikti iki 2026 m. birželio 1 d. Be investicinės sąskaitos įprastas tų metų terminas buvo 2026 m. gegužės 4 d. Vėlesnių metų terminą tikrinkite einamajame VMI paaiškinime."
    },
    {
      question: "Ar dividendai irgi atidedami iki išėmimo?",
      answer:
        "Ne. Dividendai apmokestinami įprasta tvarka. VMI pavyzdyje nuo 100 eurų Lietuvos bendrovės dividendų išskaičiuota 15 proc., o į sąskaitą įskaityti 85 eurai didina įnašą, nuo kurio vėliau lyginamas išėmimas."
    }
  ],
  sources: [
    VMI_INVEST,
    VMI_PRODUCTS,
    VMI_GPM,
    {
      href: "https://www.vmi.lt/evmi/kada-ir-kokiu-budu-turiu-deklaruoti-investicine-saskaita-",
      label: "VMI. Kada deklaruoti investicinę sąskaitą"
    },
    {
      href: "https://www.vmi.lt/evmi/kuria-forma-iki-kada-ir-kaip-turiu-pateikti-deklaruojant-2025-metais",
      label: "VMI. GPM311 terminas už 2025 m."
    },
    {
      href: "https://www.lb.lt/en/sfi-financial-market-participants/xtb-limited",
      label: "Lietuvos bankas. XTB Limited, paslaugos be filialo"
    },
    {
      href: "https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/37686/",
      label: "CySEC. XTB Ltd, licencija 169/12"
    },
    {
      href: "https://www.lb.lt/lt/finansu-rinku-dalyviai/freedom-finance-europe-ltd",
      label: "Lietuvos bankas. Freedom Finance Europe Ltd, paslaugos be filialo"
    },
    {
      href: "https://freedom24.com/download/documents/95/CySEC_License",
      label: "CySEC patvirtinimas. Freedom Finance Europe Ltd, licencija 275/15"
    }
  ],
  related: [
    { href: ETF, label: "ETF investavimas Lietuvoje" },
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: IBKR, label: "Interactive Brokers Lietuvoje" },
    { href: BEST, label: "Geriausios investavimo platformos" }
  ]
};

export const LT_PLATFORMS: LtPageMeta = {
  path: PLATFORMS,
  title: "Investavimo platformos Lietuvoje 2026: palyginimas",
  description:
    "2026 m. Lietuvos banko sutelktinio finansavimo licencijų sąrašas ir patikrintos Profitus, InRento, InSoil bei Finbee sąlygos: minimali suma, skelbiama grąža, mokesčiai.",
  h1: "Investavimo platformos Lietuvoje 2026: palyginimas",
  lede: "2026 m. spalio 30 d. Lietuvos banko sutelktinio finansavimo licencijų sąraše buvo 17 galiojančių licencijų, nuo Nr. 1 iki Nr. 17. Žemiau palygintos tik tos sąlygos, kurias radau lb.lt arba pačios platformos svetainėje. Skelbiama grąža nėra garantija. Investuotas kapitalas gali būti prarastas. EstateGuru ir Mintos tame sąraše nebuvo.",
  crumb: "Investavimo platformos",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano paties portfelio ekrano kopija, jei ja dalinsiuosi. Lentelės grąžos yra operatorių skaičiai, ne mano rezultatas.",
  faqs: [
    {
      question: "Kiek platformų turi Lietuvos banko licenciją?",
      answer:
        "2026 m. spalio 30 d. sąraše buvo 17 sutelktinio finansavimo paslaugų teikėjo licencijų. Naujausia tame sąraše yra UAB „Finance EU“ (florrid.com), licencija Nr. 17 nuo 2026 m. liepos 31 d."
    },
    {
      question: "Ar EstateGuru ir Mintos yra tame sąraše?",
      answer:
        "Ne. Šiame patikrinime jų Lietuvos banko sutelktinio finansavimo licencijų sąraše nebuvo, todėl į lentelę jų neįtraukiau ir jų užsienio licencijų čia neperrašiau."
    },
    {
      question: "Kokia mažiausia investicija?",
      answer:
        "Iš operatorių puslapių, kuriuos atidariau: Finbee 5 eurai, Profitus 100 eurų, InSoil 100 eurų pirminėje rinkoje, InRento 500 eurų. Kitų platformų minimumo neįrašiau, nes jo netikrinau jų svetainėje."
    },
    {
      question: "Ar skelbiama grąža yra pažadas?",
      answer:
        "Ne. 9,84 proc., 11,56 proc., 12,95 proc. ir 14,2 proc. yra pačių operatorių paskelbti vidurkiai. Lietuvos bankas šių procentų negarantuoja, o projektas gali vėluoti arba būti negrąžintas."
    },
    {
      question: "Ar šios paskolos tinka investicinei sąskaitai?",
      answer:
        "VMI prie tinkamų produktų priskiria sutelktinį finansavimą pagal reglamentą (ES) 2020/1503 ir tarpusavio skolinimą pagal vartojimo kredito bei su nekilnojamuoju turtu susijusio kredito įstatymus. Konkretų projektą reikia tikrinti atskirai."
    },
    {
      question: "Kokie platformų mokesčiai?",
      answer:
        "Vieno tarifo visoms platformoms nėra. Finbee rašo, kad lėšų įskaitymas ir išmokėjimas nemokami. Profitus, InRento ir InSoil pagrindiniuose puslapiuose bendro investuotojo mokesčio neradau, todėl jo neįrašiau."
    }
  ],
  sources: [
    LB_LIST,
    {
      href: "https://www.lb.lt/en/sfi-financial-market-participants/uab-inrento",
      label: "Lietuvos bankas. UAB Inrento profilis"
    },
    {
      href: "https://www.lb.lt/uploads/publications/docs/72307_51a1f51fe8714b5bef7b9a8eb13dd9b5.pdf",
      label: "Lietuvos bankas. SFPT veiklos apžvalga, 2025 m."
    },
    { href: "https://www.profitus.lt/", label: "Profitus. Pagrindinis puslapis" },
    { href: "https://inrento.com/", label: "InRento. Pagrindinis puslapis" },
    { href: "https://finance.insoil.com/", label: "InSoil. Pagrindinis puslapis" },
    { href: "https://www.finbee.lt/investuok/", label: "Finbee. Investuotojo puslapis" },
    VMI_PRODUCTS
  ],
  related: [
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: PROFITUS, label: "Profitus atsiliepimai" },
    { href: FINBEE, label: "Finbee atsiliepimai" },
    { href: INVEST, label: "Investicinė sąskaita" }
  ]
};

export const LT_T212: LtPageMeta = {
  path: T212,
  title: "Trading 212 atsiliepimai: ar saugu lietuviams?",
  description:
    "Trading 212 mokesčiai, CySEC licencija 398/21, investicinės sąskaitos tinkamumas pagal VMI ir CFD perspėjimas, kad 75 proc. mažmeninių sąskaitų patiria nuostolių.",
  h1: "Trading 212 atsiliepimai: ar saugu lietuviams?",
  lede: "Trading 212 Invest sąskaitoje pats brokeris skelbia 0 proc. prekybos komisinį, 0 proc. saugojimo mokestį ir 0,15 proc. valiutos keitimo mokestį. Kipro įmonė Trading 212 Markets Ltd turi CySEC licenciją 398/21. CFD sąlygose šis teikėjas rašo, kad 75 proc. mažmeninių sąskaitų patiria nuostolių. Licencija nereiškia, kad kapitalas apsaugotas nuo rinkos kritimo.",
  crumb: "Trading 212",
  investing: true,
  cfd: true,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano sąskaitos sutarties ekrano kopija, kurioje matyti teisinė įmonė, ir Invest sąskaitos mokesčių langas. Kol jų nėra, tai nėra mano asmeninė naudojimo apžvalga.",
  faqs: [
    {
      question: "Ar Trading 212 yra saugus lietuviui?",
      answer:
        "Tai priežiūrą turintis brokeris, ne indėlis banke. Trading 212 Markets Ltd yra registruota Kipre ir turi CySEC licenciją 398/21. Akcijų ir ETF kaina gali kristi. CFD yra atskira paslauga su didele nuostolių dalimi."
    },
    {
      question: "Kokie Invest sąskaitos mokesčiai?",
      answer:
        "Trading 212 pagalbos centras Invest, ISA ir SIPP sąskaitoms nurodo tik 0,15 proc. valiutos keitimo mokestį. Prekybos komisinis ir saugojimo mokestis yra 0. Birža ar užsienio mokesčių administratorius gali pridėti savo mokestį, pavyzdžiui JK stamp duty."
    },
    {
      question: "Kiek sąskaitų praranda pinigus su CFD?",
      answer:
        "Trading 212 CFD sąlygose parašyta, kad 75 proc. mažmeninių investuotojų sąskaitų patiria nuostolių prekiaujant CFD pas šį teikėją. Tai yra šio teikėjo skaičius, ne visos rinkos vidurkis."
    },
    {
      question: "Ar sąskaita tinka Lietuvos investicinės sąskaitos režimui?",
      answer:
        "Taip. VMI DUK tiesiai nurodo, kad gyventojo sąskaita finansų maklerio platformoje, pavyzdžiui Trading 212, gali būti deklaruojama kaip investicinė, jei naudojama tik GPM įstatyme išvardytiems produktams."
    },
    {
      question: "Kuri įmonė laiko lietuvio sąskaitą?",
      answer:
        "Trading 212 pagalbos centras išvardija kelias įmones: Trading 212 UK Ltd (FCA 609146), Trading 212 Markets Ltd (CySEC 398/21), Australijos įmonę ir Trading 212 EU GmbH (BaFin 10109603). Kuri taikoma jums, parašyta sutartyje. Savo sutarties čia dar neįdėjau."
    },
    {
      question: "Ar čia rekomendacija atsidaryti sąskaitą?",
      answer:
        "Ne. Autorius dar neįdėjo savo ekrano kopijų. Tekstas surenka brokerio dokumentus ir VMI paaiškinimą, kad galėtumėte juos palyginti patys."
    }
  ],
  sources: [
    {
      href: "https://helpcentre.trading212.com/hc/en-us/articles/11471996799517-What-are-the-fees-in-the-Invest-ISAs-and-SIPP",
      label: "Trading 212. Invest sąskaitos mokesčiai"
    },
    {
      href: "https://helpcentre.trading212.com/hc/en-us/articles/360007315078-Who-regulates-Trading-212",
      label: "Trading 212. Kas prižiūri"
    },
    {
      href: "https://www.trading212.com/legal-documentation/cy/invest/Invest-Terms_EN.pdf",
      label: "Trading 212 Markets Ltd. Invest sąlygos, CySEC 398/21"
    },
    {
      href: "https://www.trading212.com/terms/cfd",
      label: "Trading 212. CFD sąlygos ir 75 proc. perspėjimas"
    },
    VMI_INVEST
  ],
  related: [
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: XTB_PAGE, label: "XTB atsiliepimai" },
    { href: IBKR, label: "Interactive Brokers Lietuvoje" }
  ]
};

export const LT_IBKR: LtPageMeta = {
  path: IBKR,
  title: "Interactive Brokers Lietuvoje: sąskaitos atidarymas, mokesčiai, W-8BEN",
  description:
    "Kaip Lietuvos gyventojui atsidaryti Interactive Brokers Ireland sąskaitą, kokie JAV ir Baltijos akcijų komisiniai ir kam reikalinga W-8BEN bei 15 proc. sutarties tarifas.",
  h1: "Interactive Brokers Lietuvoje: sąskaitos atidarymas, mokesčiai, W-8BEN",
  lede: "VMI pavyzdyje Lietuvos gyventojas naudoja Airijoje įsikūrusios Interactive Brokers Ireland Limited paskyrą. IBKR Airijos kainyne JAV akcijų pakopinis komisinis yra 0,0035 USD už akciją, mažiausiai 0,35 USD. Be W-8BEN JAV dividendams paprastai taikomas 30 proc. išskaitymas. Lietuvos ir JAV sutartis fiziniam asmeniui dividendus riboja iki 15 proc.",
  crumb: "Interactive Brokers",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano paraiškos, W-8BEN patvirtinimo ir pasirinktos kainodaros (pakopinės ar fiksuotos) ekrano kopijos. Žingsniai žemiau yra bendra tvarka, ne mano užpildyta paraiška.",
  faqs: [
    {
      question: "Kuri Interactive Brokers įmonė tinka lietuviui?",
      answer:
        "VMI pavyzdyje nurodyta Airijoje įsikūrusi Interactive Brokers Ireland Limited. Šiame puslapyje kainynas imtas iš interactivebrokers.ie. Kitų grupės įmonių lietuviui nepriskiriu."
    },
    {
      question: "Kiek kainuoja JAV akcijos?",
      answer:
        "Pakopinis tarifas, kai per mėnesį parduodama iki 300 000 akcijų, yra 0,0035 USD už akciją, mažiausiai 0,35 USD už pavedimą ir ne daugiau kaip 1 proc. sandorio vertės. Fiksuotas tarifas yra 0,005 USD už akciją, mažiausiai 1 USD. Gali prisidėti reguliavimo mokesčiai."
    },
    {
      question: "Kiek kainuoja Baltijos akcijos?",
      answer:
        "Tas pats Airijos kainynas: pakopinis 0,05 proc. sandorio vertės, mažiausiai 1,25 euro ir daugiausiai 29 eurai. Fiksuotas tarifas yra 0,2 proc., mažiausiai 10 eurų. Trečiųjų šalių biržos mokesčiai pakopiniame plane perkeliami klientui."
    },
    {
      question: "Kam reikalinga W-8BEN forma?",
      answer:
        "IBKR paaiškina, kad JAV šaltinio dividendams paprastai taikomas 30 proc. išskaitymas, nebent galioja mokesčių sutartis. W-8BEN fizinis asmuo patvirtina, kad nėra JAV asmuo, ir paprašo sutarties lengvatos."
    },
    {
      question: "Koks Lietuvos ir JAV dividendų tarifas?",
      answer:
        "JAV iždo paskelbtoje sutarties 10 straipsnio redakcijoje dividendai apmokestinami ne daugiau kaip 15 proc., o 5 proc. tarifas taikomas tik bendrovei, kuri tiesiogiai valdo bent 10 proc. balsavimo akcijų. Fiziniam asmeniui taikytina 15 proc. riba. RIC ir REIT turi atskiras išimtis."
    },
    {
      question: "Kaip tai susiję su investicine sąskaita?",
      answer:
        "Pinigų sąskaitą galite deklaruoti GPM311, jei joje laikomos lėšos naudojamos tik tinkamiems produktams. JAV išskaitymas ir Lietuvos 15 proc. GPM nuo išėmimo virš įnašo yra du skirtingi mokesčiai."
    }
  ],
  sources: [
    VMI_INVEST,
    {
      href: "https://www.interactivebrokers.ie/en/pricing/commissions-stocks.php",
      label: "Interactive Brokers Ireland. Akcijų komisiniai"
    },
    {
      href: "https://www.interactivebrokers.com/en/support/tax-nonus-initial.php",
      label: "Interactive Brokers. W-8BEN ir 30 proc. išskaitymas"
    },
    {
      href: "https://home.treasury.gov/system/files/136/archive-documents/lithuani.pdf",
      label: "JAV iždas. Lietuvos ir JAV pajamų mokesčio sutartis, 10 straipsnis"
    },
    VMI_GPM
  ],
  related: [
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: FREEDOM, label: "Freedom24 atsiliepimai" }
  ]
};

export const LT_FREEDOM: LtPageMeta = {
  path: FREEDOM,
  title: "Freedom24 atsiliepimai: mokesčiai ir licencija",
  description:
    "Freedom24 yra Freedom Finance Europe Ltd, CySEC 275/15. Smart plane JAV ir Europos akcijoms nuo 2026-08-19 yra 2 eurai už pavedimą ir 0,02 euro už akciją. VMI šios sąskaitos neįvardija.",
  h1: "Freedom24 atsiliepimai: mokesčiai ir licencija",
  lede: "Freedom24 yra Freedom Finance Europe Ltd prekės ženklas. Įmonė registruota Kipre, HE 324220, ir turi CySEC licenciją 275/15. Lietuvos bankas ją įrašęs kaip ES finansų maklerio įmonę, teikiančią paslaugas Lietuvoje be filialo. Nuo 2026 m. rugpjūčio 19 d. kainyne JAV ir Europos akcijoms Smart plane yra 2 eurai už pavedimą ir 0,02 euro už akciją. VMI Freedom24 investicinei sąskaitai neįvardija.",
  crumb: "Freedom24",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano sutarties ekrano kopija, kurioje matyti teisinė įmonė, ir pasirinkto mokesčių plano langas. Kol jų nėra, tai nėra asmeninė naudojimo apžvalga.",
  faqs: [
    {
      question: "Ar Freedom24 turi licenciją, galiojančią lietuviui?",
      answer:
        "Freedom Finance Europe Ltd yra Kipro įmonė HE 324220 su CySEC licencija 275/15. Lietuvos bankas ją įrašęs kaip ES finansų maklerio įmonę, teikiančią paslaugas Lietuvoje be filialo. Tai nėra Lietuvos banko išduota atskira licencija ir nėra indėlių garantija."
    },
    {
      question: "Kokie Smart plano mokesčiai akcijoms ir ETF?",
      answer:
        "Nuo 2026 m. rugpjūčio 19 d. kainyne JAV ir Europos biržose kotiruojamoms akcijoms ir ETF Smart plane yra 2 USD arba 2 eurai mažiausiai už pavedimą ir 0,02 USD arba euro už akciją. Mėnesinis mokestis paskelbtuose planuose yra 0. All-inclusive plane yra 0,5 proc. apyvartos, 0,012 USD arba euro už akciją ir 1,2 USD arba euro už pavedimą."
    },
    {
      question: "Ar akcijų akcija be komisinio galioja Lietuvos gyventojui?",
      answer:
        "Ne. Kainyne eurais skelbiama akcija taikoma tik fiziniams asmenims, kurie yra Prancūzijos, Italijos, Rumunijos arba Čekijos gyventojai ar piliečiai ir sąskaitą atidarė nuo 2026 m. kovo 1 d. iki 2026 m. rugpjūčio 31 d. Lietuva tame sąraše nėra."
    },
    {
      question: "Kiek kainuoja išėmimas ir saugojimas?",
      answer:
        "Banko pavedimu išimant bazinėje sąskaitos valiutoje mokestis yra 7 eurai, jei bazė yra eurai, arba 7 JAV doleriai, jei bazė yra doleriai. Tarpininkų mokesčiai gali prisidėti, o partnerių bankai kartais jų atsisako. E-Accounts saugojimas kainyne yra 0,000822 proc. per dieną. Biržoje kotiruojamų akcijų lentelėje atskiro mėnesinio saugojimo mokesčio nėra."
    },
    {
      question: "Ar VMI įvardija Freedom24 investicinei sąskaitai?",
      answer:
        "Ne. VMI tiesiogiai įvardija Trading 212 ir pateikia Interactive Brokers Ireland pavyzdį. Freedom24 ten nėra. Bendra taisyklė lieka: deklaruojama pinigų sąskaita, naudojama tik tinkamiems produktams."
    },
    {
      question: "Ar čia asmeninis atsiliepimas?",
      answer:
        "Ne. Autoriaus sutarties ir mokesčių plano ekrano kopijų nėra. Mažmeninių CFD sąskaitų nuostolių dalies šio teikėjo dokumentuose, kuriuos tikrinau, neradau, todėl jos neįrašiau. Kriptovaliutų šis puslapis nereklamuoja."
    }
  ],
  sources: [
    {
      href: "https://freedom24.com/download/documents/95/CySEC_License",
      label: "CySEC patvirtinimas. Freedom Finance Europe Ltd, licencija 275/15"
    },
    {
      href: "https://freedom24.com/download/documents/720/General_Terms_of_Business_29082025",
      label: "Freedom Finance Europe Ltd. Bendrosios veiklos sąlygos"
    },
    {
      href: "https://www.lb.lt/lt/finansu-rinku-dalyviai/freedom-finance-europe-ltd",
      label: "Lietuvos bankas. Freedom Finance Europe Ltd, paslaugos be filialo"
    },
    {
      href: "https://freedom24.com/download/documents/1203/Appendix_6_Fee_Schedule_19082026",
      label: "Freedom24. Kainynas, galiojantis nuo 2026-08-19"
    },
    VMI_INVEST
  ],
  related: [
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: XTB_PAGE, label: "XTB atsiliepimai" },
    { href: IBKR, label: "Interactive Brokers Lietuvoje" }
  ]
};

export const LT_XTB: LtPageMeta = {
  path: XTB_PAGE,
  title: "XTB atsiliepimai: mokesčiai, licencija ir CFD rizika",
  description:
    "XTB Limited turi CySEC licenciją 169/12. Akcijų ir ETF komisinis yra 0 proc. iki 100 000 eurų per mėnesį, paskui 0,2 proc. CFD perspėjimas Kipro svetainėje yra 77 proc.",
  h1: "XTB atsiliepimai: mokesčiai, licencija ir CFD rizika",
  lede: "XTB Limited turi CySEC licenciją 169/12, o Lietuvos bankas ją įrašęs kaip įmonę, teikiančią paslaugas Lietuvoje be filialo. Kipro kainyne akcijų ir ETF komisinis yra 0 proc., kol mėnesio apyvarta neviršija 100 000 eurų, paskui 0,2 proc., mažiausiai 10 eurų. Valiutos keitimas yra 0,5 proc. CFD sąlygose ši Kipro svetainė rašo, kad 77 proc. mažmeninių sąskaitų patiria nuostolių.",
  crumb: "XTB",
  investing: true,
  cfd: true,
  cfdWarning: LT_XTB_CFD_WARNING,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti Kipro mokesčių lango ir sutarties, kurioje matyti juridinis asmuo, ekrano kopijos. Tai nėra asmeninė naudojimo apžvalga.",
  faqs: [
    {
      question: "Kuri XTB įmonė aptarnauja klientą Lietuvoje?",
      answer:
        "Lietuvos banko įraše yra XTB Limited, Kipro investicinė įmonė, CySEC licencija 169/12, adresas Pikioni 10, Limassol. CySEC registre ta pati licencija išduota 2012 m. balandžio 18 d., įmonės numeris 296794. JK FCA įmonės kainyno čia nenaudoju."
    },
    {
      question: "Kiek kainuoja akcijos ir ETF?",
      answer:
        "Kipro kainyne akcijų ir ETF komisinis yra 0 proc., kol mėnesio apyvarta neviršija 100 000 eurų arba JAV dolerių. Viršijus, komisinis yra 0,2 proc., mažiausiai 10 eurų arba 10 JAV dolerių. Mažiausia akcijų investicijos vertė yra 10 eurų arba 10 JAV dolerių. Valiutos keitimas investavimo sąlygose yra 0,5 proc. Minimalios įmokos nėra. Įmokos mokesčio XTB netaiko, bet bankas ar mokėjimo teikėjas gali."
    },
    {
      question: "Ar išėmimas mokamas?",
      answer:
        "Kipro kainynas išėmimus aprašo kaip nemokamus. Tame pačiame puslapyje yra ir sakinys, kad išėmimai virš 100 eurų arba JAV dolerių yra nemokami. Atskiro išėmimo tarifo, kurį galėčiau įrašyti kaip XTB mokestį, tame puslapyje neradau."
    },
    {
      question: "Kada taikomas neaktyvumo mokestis?",
      answer:
        "Kipro pagalbos centras, atnaujintas 2026 m. gegužės 7 d., nurodo 10 eurų per mėnesį iš investicinės sąskaitos tik tada, kai 365 dienas neatidarėte ir neuždarėte pozicijos ir 90 dienų nepadarėte įmokos. Mokestis netaikomas, jei nėra laisvų lėšų arba jei kuri nors pozicija yra atidaryta."
    },
    {
      question: "Kiek mažmeninių sąskaitų patiria CFD nuostolių?",
      answer:
        "XTB Limited teisinės informacijos puslapis rašo, kad 77 proc. mažmeninių investuotojų sąskaitų patiria nuostolių prekiaujant CFD pas šį teikėją. Kituose XTB puslapiuose pasitaiko kitų procentų, nes jie priklauso kitoms įmonėms. Čia naudoju tik Kipro subjekto 77 proc."
    },
    {
      question: "Ar VMI įvardija XTB ir ar čia kalbama apie kriptovaliutas?",
      answer:
        "VMI XTB neįvardija. Sąskaita gali tikti investicinės sąskaitos režimui tik jei tai pinigų sąskaita tinkamiems produktams. Šis gidas kriptovaliutų neapima ir jų nereklamuoja."
    }
  ],
  sources: [
    {
      href: "https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/37686/",
      label: "CySEC. XTB Ltd, licencija 169/12"
    },
    {
      href: "https://www.lb.lt/en/sfi-financial-market-participants/xtb-limited",
      label: "Lietuvos bankas. XTB Limited, paslaugos be filialo"
    },
    {
      href: "https://www.xtb.com/cy/legal-information",
      label: "XTB Limited. Teisinė informacija ir 77 proc. CFD perspėjimas"
    },
    {
      href: "https://www.xtb.com/cy/account-and-fees",
      label: "XTB Kipras. Sąskaitos ir mokesčiai"
    },
    {
      href: "https://www.xtb.com/cy/help-center/fees-and-payments/fees-and-commissions-at-xtb",
      label: "XTB Kipras. Mokesčiai ir 10 eurų neaktyvumo mokestis"
    },
    VMI_INVEST
  ],
  related: [
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: FREEDOM, label: "Freedom24 atsiliepimai" }
  ]
};

export const LT_ETF: LtPageMeta = {
  path: ETF,
  title: "ETF investavimas Lietuvoje: mokesčiai fiziniams asmenims",
  description:
    "Nuo 2026 m. ETF pardavimo pelnas per investicinę sąskaitą apmokestinamas 15 proc. tik išimant daugiau, nei įnešta. Dividendai apmokestinami išmokant. Sąlygos pagal VMI.",
  h1: "ETF investavimas Lietuvoje: mokesčiai fiziniams asmenims",
  lede: "Nuo 2026 m. sausio 1 d. per investicinę sąskaitą gautas pelnas, įskaitant ETF pardavimą, apmokestinamas 15 proc. tik tada, kai išimate daugiau, nei esate įnešę. VMI pavyzdyje ETF tinka, jei fondas yra kolektyvinio investavimo subjektas arba jo vienetais prekiaujama biržoje. Dividendai apmokestinami išmokant ir į investicinės sąskaitos atidėjimą neįeina.",
  crumb: "ETF investavimas",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia neturėtų atsirasti sugalvoto portfelio. Jei dalinsiuosi, įdėsiu deklaruotos ETF pozicijos ekrano kopiją be sąskaitos numerio. Lentelė remiasi VMI paaiškinimu, ne mano deklaracija.",
  faqs: [
    {
      question: "Kada mokamas GPM nuo ETF pardavimo?",
      answer:
        "Jei ETF laikomas per deklaruotą investicinę sąskaitą ir pardavimo pajamos lieka toje sąskaitoje, GPM mokamas ne pardavimo dieną. Nuo 2026 m. sausio 1 d. 15 proc. tarifas taikomas tik tai išimtos sumos daliai, kuri viršija įnašą. Tarifas nuo sumos dydžio nepriklauso. Anksčiau minėta 20 proc. riba virš 120 VDU šiam išėmimui nebetaikoma."
    },
    {
      question: "Ar kaupiamajam ir paskirstomajam ETF taikomas skirtingas tarifas?",
      answer:
        "Atskiro tarifo pagal fondo tipą VMI paaiškinime nėra. Yra dvi taisyklės. Dividendai apmokestinami tada, kai išmokami, ir į atidėjimą neįeina. Pardavimo pajamos sąskaitos viduje yra investicinės sąskaitos pajamos ir apmokestinamos tik išimant daugiau, nei įnešta."
    },
    {
      question: "Kada ETF tinka investicinei sąskaitai?",
      answer:
        "VMI komentare investavimas į ETF yra naudojimas pagal paskirtį, jei fondas atitinka kolektyvinio investavimo subjekto apibrėžimą arba jo vienetais prekiaujama biržoje. Kolektyvinio investavimo vertybiniams popieriams biržos sąrašo sąlyga nebūtina. Paprastoms akcijoms biržos sąlyga reikalinga."
    },
    {
      question: "Kaip dividendai keičia įnašą?",
      answer:
        "Dividendai nėra investicinės sąskaitos pajamos. VMI pavyzdyje nuo 100 eurų dividendų išskaičiuota 15 proc., į sąskaitą įskaityta 85 eurai, ir tie 85 eurai didina įnašą. Vėlesnis išėmimas lyginamas su padidėjusiu įnašu."
    },
    {
      question: "Ar šis puslapis apie įmonės PVM ar mažąją bendriją?",
      answer:
        "Ne. Čia tik gyventojo GPM per investicinę sąskaitą. PVM, mažosios bendrijos steigimas ir buhalterija yra buhalteris.ai."
    },
    {
      question: "Ar puslapis apima kriptovaliutas?",
      answer:
        "Ne. Šis puslapis kriptovaliutų neapima ir jų nereklamuoja."
    }
  ],
  sources: [
    VMI_INVEST,
    {
      href: "https://www.vmi.lt/evmi/documents/20142/737112/R-3268.pdf",
      label: "VMI. GPMĮ 12¹ straipsnio komentaras"
    },
    VMI_PRODUCTS,
    VMI_GPM
  ],
  related: [
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: IBKR, label: "Interactive Brokers Lietuvoje" }
  ]
};

export const LT_FINBEE: LtPageMeta = {
  path: FINBEE,
  title: "Finbee atsiliepimai: licencija, 5 eurai ir 14,2 proc.",
  description:
    "finbee.lt 2026-10-30 neturėjo sutelktinio finansavimo licencijos. Mokėjimų gavėja UAB „Elektroninių pinigų bitė“ turi EMI licenciją Nr. 87. Mažiausia suma 5 eurai, 2025 m. antraštė 14,2 proc.",
  h1: "Finbee atsiliepimai: licencija, minimali suma ir skelbiama grąža",
  lede: "2026 m. spalio 30 d. Lietuvos banko sutelktinio finansavimo licencijų sąraše finbee.lt nebuvo. Sąraše Nr. 8 priklauso UAB „Finansų bitė verslui“, svetainė finbeeeverslui.lt. Investuotojų pavedimų gavėja finbee.lt nurodo UAB „Elektroninių pinigų bitė“, kuri turi elektroninių pinigų įstaigos licenciją Nr. 87 nuo 2021 m. birželio 3 d. Mažiausia suma puslapyje yra 5 eurai, o 2025 m. antraštės vidurkis yra 14,2 proc.",
  crumb: "Finbee",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano portfelio ir realios grąžos po vėlavimų ekrano kopija. 14,2 proc. yra operatoriaus antraštė, ne mano rezultatas.",
  faqs: [
    {
      question: "Ar finbee.lt turi Lietuvos banko sutelktinio finansavimo licenciją?",
      answer:
        "2026 m. spalio 30 d. sąraše finbee.lt nebuvo. Licencija Nr. 8 priklauso UAB „Finansų bitė verslui“, kurios svetainė licencijų kortelėje yra finbeeeverslui.lt. Vartotojų svetainės su šia licencija nesutapatinu."
    },
    {
      question: "Kokią licenciją turi mokėjimų įmonė?",
      answer:
        "finbee.lt investuotojų puslapis pavedimų gavėja nurodo UAB „Elektroninių pinigų bitė“. Lietuvos bankas šiai įmonei 2021 m. birželio 3 d. išdavė elektroninių pinigų įstaigos licenciją Nr. 87, įmonės kodas 304473256, valdybos sprendimas 03-98. Elektroninių pinigų licencija nėra sutelktinio finansavimo licencija."
    },
    {
      question: "Kokia mažiausia suma ir kokia skelbiama grąža?",
      answer:
        "Puslapyje mažiausia investicija ir mažiausias vienas pasiūlymas yra 5 eurai. Antraštėje 2025 m. vidutinė palūkanų norma yra 14,2 proc. Žemiau tas pats puslapis rašo 14,5 proc. privačioms paskoloms ir 13 proc. verslo paskoloms. Tai operatoriaus skaičiai. Skaičiuoklės tame puslapyje pažymėtos kaip nepatikimas būsimų rezultatų rodiklis."
    },
    {
      question: "Kokia 500 eurų riba?",
      answer:
        "Vartojimo paskolai vienas investuotojas per 12 mėnesių tam pačiam paskolos gavėjui negali paskolinti daugiau kaip 500 eurų. Puslapis tai sieja su vartojimo kredito įstatymu. Verslo paskoloms tokios ribos ten nenurodyta."
    },
    {
      question: "Kokie įmokų ir išėmimo mokesčiai?",
      answer:
        "Puslapis rašo, kad įskaitymas ir išmokėjimas yra nemokami, o lėšos gali būti įskaitomos arba išmokamos per vieną darbo dieną. Atskiro investuotojo komisinio, be šio sakinio, tame puslapyje neradau, todėl jo neįrašiau. Investuotojas turi būti ne jaunesnis kaip 18 metų, turėti EEE banko sąskaitą ir tapatybės dokumentą."
    },
    {
      question: "Ar 14,2 proc. yra pažadas ir ar paskola tinka investicinei sąskaitai?",
      answer:
        "Ne. Tai 2025 m. antraštės vidurkis, ne Lietuvos banko garantija ir ne autoriaus rezultatas. Ar konkreti paskola tinka investicinei sąskaitai, tikrinkite pagal VMI produktų sąrašą. Šis puslapis to kiekvienai paskolai netvirtina."
    }
  ],
  sources: [
    LB_LIST,
    {
      href: "https://www.lb.lt/lt/frd-licencijos/view_license?id=2061",
      label: "Lietuvos bankas. Elektroninių pinigų įstaigos licencija Nr. 87"
    },
    {
      href: "https://www.lb.lt/lt/finansu-rinku-dalyviai/uab-elektroniniu-pinigu-bite",
      label: "Lietuvos bankas. UAB „Elektroninių pinigų bitė“"
    },
    { href: "https://www.finbee.lt/investuok/", label: "Finbee. Investuotojo puslapis" },
    VMI_PRODUCTS
  ],
  related: [
    { href: PLATFORMS, label: "Visos licencijuotos platformos" },
    { href: PROFITUS, label: "Profitus atsiliepimai" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: INVEST, label: "Investicinė sąskaita" }
  ]
};

export const LT_PROFITUS: LtPageMeta = {
  path: PROFITUS,
  title: "Profitus atsiliepimai: licencija Nr. 10 ir 9,84 proc.",
  description:
    "UAB „Profitus Crowdfunding“ turi Lietuvos banko sutelktinio finansavimo licenciją Nr. 10 nuo 2023-11-10. profitus.lt rašo, kad investuoti galima nuo 100 eurų, vidutinė metinė grąža 9,84 proc.",
  h1: "Profitus atsiliepimai: licencija, 100 eurų ir 9,84 proc.",
  lede: "UAB „Profitus Crowdfunding“ 2026 m. spalio 30 d. Lietuvos banko sąraše turi sutelktinio finansavimo licenciją Nr. 10, išduotą 2023 m. lapkričio 10 d. profitus.lt rašo, kad investuoti galima nuo 100 eurų, o vidutinė metinė grąža yra 9,84 proc. Tai operatoriaus skaičius, ne pažadas. Paskola, užtikrinta nekilnojamuoju turtu, vis tiek gali būti negrąžinta.",
  crumb: "Profitus",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia turėtų atsirasti mano portfelio ir realios grąžos po vėlavimų ekrano kopija. 9,84 proc. yra operatoriaus vidurkis, ne mano rezultatas.",
  faqs: [
    {
      question: "Ar Profitus turi Lietuvos banko licenciją?",
      answer:
        "Taip. 2026 m. spalio 30 d. sąraše Nr. 10 yra UAB „Profitus Crowdfunding“, adresas Lvivo g. 101, licencija išduota 2023 m. lapkričio 10 d. Licencijų kortelėje svetainės adreso nebuvo. profitus.lt yra šios įmonės prekės ženklas."
    },
    {
      question: "Nuo kokios sumos galima investuoti ir kokia skelbiama grąža?",
      answer:
        "profitus.lt rašo, kad investuoti galima nuo 100 eurų, o vidutinė metinė grąža yra 9,84 proc. Tame pačiame puslapyje operatorius taip pat skelbia bendruomenės ir surinktų sumų statistiką. Tai nėra pažadas, kad jūsų projektas uždirbs 9,84 proc."
    },
    {
      question: "Ar nekilnojamojo turto užtikrinimas apsaugo nuo nuostolio?",
      answer:
        "Ne. Tai operatoriaus aprašymas, kaip užtikrinama paskola. Užtikrinimas nėra Lietuvos banko garantija ir nereiškia, kad paskola bus grąžinta laiku arba visa."
    },
    {
      question: "Kokie investuotojo mokesčiai?",
      answer:
        "2026 m. spalio 30 d. profitus.lt pagrindiniame puslapyje bendro investuotojo mokesčio neradau, todėl jo neįrašiau. Prieš pavedimą atidarykite konkretaus projekto sąlygas."
    },
    {
      question: "Ar Profitus yra brokeris?",
      answer:
        "Ne. Tai sutelktinio finansavimo platforma su licencija Nr. 10, ne finansų maklerio įmonė ir ne investicinė sąskaita kaip banko produktas."
    },
    {
      question: "Ar projektai tinka investicinei sąskaitai?",
      answer:
        "VMI prie tinkamų produktų priskiria sutelktinį finansavimą pagal reglamentą (ES) 2020/1503, jei konkretus produktas atitinka sąrašą. VMI Profitus neįvardija. Kiekvieno projekto tinkamumo čia netvirtinu."
    }
  ],
  sources: [
    LB_LIST,
    { href: "https://www.profitus.lt/", label: "Profitus. Pagrindinis puslapis" },
    VMI_PRODUCTS,
    VMI_INVEST
  ],
  related: [
    { href: PLATFORMS, label: "Visos licencijuotos platformos" },
    { href: FINBEE, label: "Finbee atsiliepimai" },
    { href: BEST, label: "Geriausios investavimo platformos" },
    { href: INVEST, label: "Investicinė sąskaita" }
  ]
};

export const LT_BEST: LtPageMeta = {
  path: BEST,
  title: "Geriausios investavimo platformos Lietuvoje 2026",
  description:
    "2026 m. eilė pagal šaltinį, ne pagal grąžą: VMI įvardyti brokeriai, Lietuvos banko sąraše esančios ES įmonės be filialo, Profitus licencija Nr. 10 ir atskirai Finbee.",
  h1: "Geriausios investavimo platformos Lietuvoje 2026",
  lede: "Ši eilė nėra grąžos reitingas. Pirma eina brokeriai, kuriuos VMI tiesiogiai įvardija investicinei sąskaitai: Interactive Brokers Ireland ir Trading 212. Toliau XTB ir Freedom24, kuriuos Lietuvos bankas įrašęs kaip ES įmones be filialo. Profitus turi sutelktinio finansavimo licenciją Nr. 10. Finbee vartotojų svetainė tos licencijos neturi.",
  crumb: "Geriausios platformos",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Čia neturi atsirasti sakinio, kad naudoju šias platformas, kol neįdėjau savo ekrano kopijų. Eilė sudaryta pagal šaltinio tipą, ne pagal mano portfelį.",
  faqs: [
    {
      question: "Kodėl eilė tokia, o ne pagal grąžą?",
      answer:
        "Grąžos reitingo nėra, nes operatorių vidurkiai nėra palyginamas pažadas. Eilė rodo, kurio šaltinio stiprumas patikrintas: pirma VMI įvardijimas, paskui Lietuvos banko įrašas apie ES maklerio įmonę be filialo, tada sutelktinio finansavimo licencija su paskelbta mažiausia suma."
    },
    {
      question: "Kodėl Interactive Brokers ir Trading 212 yra pirmi?",
      answer:
        "VMI juos įvardija tiesiogiai. Trading 212 sąskaitą galima deklaruoti, o Interactive Brokers pavyzdyje nurodyta Airijos įmonė Interactive Brokers Ireland Limited. Kiti brokeriai VMI tekste nepaminėti."
    },
    {
      question: "Kodėl Finbee nėra toje pačioje vietoje kaip Profitus?",
      answer:
        "Profitus operatorius UAB „Profitus Crowdfunding“ turi sutelktinio finansavimo licenciją Nr. 10. finbee.lt to sąrašo 2026 m. spalio 30 d. nebuvo. Mokėjimų gavėja UAB „Elektroninių pinigų bitė“ turi elektroninių pinigų licenciją Nr. 87. Tai kita licencijos rūšis, todėl Finbee stovi atskirai."
    },
    {
      question: "Kodėl nėra eToro, EstateGuru ir Mintos?",
      answer:
        "eToro į šį skyrių neįtraukiamas. EstateGuru ir Mintos 2026 m. spalio 30 d. Lietuvos banko sutelktinio finansavimo licencijų sąraše nebuvo. Nelicencijuotų platformų eilėje nėra. Kriptovaliutų platformų taip pat nėra."
    },
    {
      question: "Ar licencija reiškia, kad pinigai apsaugoti?",
      answer:
        "Ne. Licencija patvirtina priežiūrą arba teisę teikti paslaugą. Akcijos, ETF ir paskolos gali nuvertėti arba būti negrąžintos. CFD nuostolių dalis parašyta tik tų brokerių apžvalgose, kuriose teikėjas ją paskelbė."
    },
    {
      question: "Kur visas licencijų sąrašas?",
      answer:
        "Septyniolika 2026 m. spalio 30 d. galiojusių sutelktinio finansavimo licencijų yra gide Investavimo platformos. Ši eilė yra trumpas sąrašas, ne visas registras."
    }
  ],
  sources: [
    VMI_INVEST,
    LB_LIST,
    {
      href: "https://www.lb.lt/en/sfi-financial-market-participants/xtb-limited",
      label: "Lietuvos bankas. XTB Limited"
    },
    {
      href: "https://www.lb.lt/lt/finansu-rinku-dalyviai/freedom-finance-europe-ltd",
      label: "Lietuvos bankas. Freedom Finance Europe Ltd"
    },
    {
      href: "https://www.lb.lt/lt/frd-licencijos/view_license?id=2061",
      label: "Lietuvos bankas. Elektroninių pinigų licencija Nr. 87"
    }
  ],
  related: [
    { href: PLATFORMS, label: "Visos sutelktinio finansavimo licencijos" },
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: ETF, label: "ETF investavimas Lietuvoje" },
    { href: T212, label: "Trading 212 atsiliepimai" }
  ]
};

export const LT_PAGES: readonly LtPageMeta[] = [
  LT_HUB,
  LT_INVEST,
  LT_ETF,
  LT_BEST,
  LT_PLATFORMS,
  LT_T212,
  LT_IBKR,
  LT_XTB,
  LT_FREEDOM,
  LT_PROFITUS,
  LT_FINBEE
];


