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
  "/lt/pvm-skaiciuokle/": null,
  "/lt/mb-steigimas-ir-mokesciai/": null
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

const HUB = "/lt/";
const INVEST = "/lt/investicine-saskaita/";
const PLATFORMS = "/lt/investavimo-platformos/";
const T212 = "/lt/trading-212-atsiliepimai/";
const IBKR = "/lt/interactive-brokers-lietuvoje/";
const VAT = "/lt/pvm-skaiciuokle/";
const MB = "/lt/mb-steigimas-ir-mokesciai/";

export const LT_NAV: readonly LtRelated[] = [
  { href: INVEST, label: "Investicinė sąskaita" },
  { href: PLATFORMS, label: "Investavimo platformos" },
  { href: T212, label: "Trading 212" },
  { href: IBKR, label: "Interactive Brokers" },
  { href: VAT, label: "PVM skaičiuoklė" },
  { href: MB, label: "MB steigimas ir mokesčiai" }
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
    "Lietuviški gidai apie investicinę sąskaitą, sutelktinio finansavimo platformas, Trading 212, Interactive Brokers, PVM skaičiuoklę ir MB mokesčius 2026 m.",
  h1: "Lietuviški gidai",
  lede: "Čia yra lietuviški kadunas.com gidai apie investicinę sąskaitą, sutelktinio finansavimo platformas, brokerius, PVM ir mažąją bendriją. Skaičiai imti iš VMI, Sodros, Lietuvos banko ir Registrų centro ir patikrinti 2026 m. spalio 30 d. Jei ieškote skaičiuoklės, PVM puslapyje veikia 21, 12 ir 5 proc. tarifai. Tai paaiškinimai, ne asmeninė konsultacija.",
  crumb: "Lietuviški gidai",
  investing: true,
  cfd: false,
  disclosure: true,
  placeholder:
    "Asmeninių brokerio ar steigimo ekrano kopijų šiame skyriuje dar nėra. Kiekviename gide pažymėta, ką turiu papildyti pats.",
  faqs: [
    {
      question: "Kokia kalba parašyti šie puslapiai?",
      answer:
        "Lietuvių. Angliška svetainės dalis apie įrankius ir užrašus lieka atskirai. Lietuviškų puslapių anglų kalba atitikmenų kol kas nėra."
    },
    {
      question: "Ar tai investavimo arba mokesčių patarimas?",
      answer:
        "Ne. Tekstai paaiškina viešus tarifus ir taisykles. Sprendimą ir deklaraciją turite pasitikrinti pagal savo situaciją, o prireikus su VMI, Sodra arba savo buhalteriu."
    },
    {
      question: "Iš kur paimti skaičiai?",
      answer:
        "Iš VMI, Sodros, Lietuvos banko, Registrų centro, JAV ir Lietuvos mokesčių sutarties bei pačių brokerių ir platformų puslapių. Patikros data yra 2026 m. spalio 30 d. Nepatvirtinto skaičiaus puslapyje nepalikau."
    },
    {
      question: "Kodėl PVM skaičiuoklėje nėra 9 proc. kaip galiojančio tarifo?",
      answer:
        "Nuo 2026 m. sausio 1 d. lengvatinis 9 proc. tarifas nebetaikomas naujiems sandoriams. Vietoje jo yra 12 proc. ir 5 proc. Istorinį 9 proc. skaičiavimą skaičiuoklė vis dar leidžia, bet jis pažymėtas kaip galiojęs iki 2025 m. gruodžio 31 d."
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
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: IBKR, label: "Interactive Brokers Lietuvoje" },
    { href: PLATFORMS, label: "Investavimo platformos" },
    { href: HUB, label: "Visi lietuviški gidai" }
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
    { href: INVEST, label: "Investicinė sąskaita" },
    { href: T212, label: "Trading 212" },
    { href: IBKR, label: "Interactive Brokers" },
    { href: HUB, label: "Visi lietuviški gidai" }
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
    { href: IBKR, label: "Interactive Brokers Lietuvoje" },
    { href: PLATFORMS, label: "Investavimo platformos" },
    { href: HUB, label: "Visi lietuviški gidai" }
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
    { href: T212, label: "Trading 212 atsiliepimai" },
    { href: PLATFORMS, label: "Investavimo platformos" },
    { href: HUB, label: "Visi lietuviški gidai" }
  ]
};

export const LT_VAT: LtPageMeta = {
  path: VAT,
  title: "PVM skaičiuoklė 2026: 21 %, 12 % ir 5 %",
  description:
    "PVM skaičiuoklė 2026 metams. Standartinis tarifas 21 proc., lengvatiniai 12 ir 5 proc. 9 proc. galiojo iki 2025-12-31. Formulė ir pavyzdžiai matomi be JavaScript.",
  h1: "PVM skaičiuoklė 2026 (21 %, 12 %, 5 %)",
  lede: "Nuo 2026 m. sausio 1 d. Lietuvoje standartinis PVM tarifas yra 21 proc., o lengvatiniai tarifai yra 12 proc. ir 5 proc. 9 proc. tarifas galiojo iki 2025 m. gruodžio 31 d. ir naujiems sandoriams nebetaikomas. Skaičiuoklė prideda arba išskiria PVM, o pavyzdžiai žemiau yra HTML, todėl matomi ir be JavaScript.",
  crumb: "PVM skaičiuoklė",
  investing: false,
  cfd: false,
  disclosure: false,
  placeholder: "",
  faqs: [
    {
      question: "Kokie PVM tarifai galioja 2026 metais?",
      answer:
        "21 proc. standartinis, 12 proc. ir 5 proc. lengvatiniai. VMI tarifų sąraše 9 proc. nurodytas kaip galiojęs iki 2025 m. gruodžio 31 d., o 12 proc. kaip galiojantis nuo 2026 m. sausio 1 d. Yra ir 0 proc. tarifas, bet ši skaičiuoklė jo neskaičiuoja."
    },
    {
      question: "Kam taikomas 12 proc. tarifas?",
      answer:
        "Nuo 2026 m. sausio 1 d. apgyvendinimo paslaugoms, keleivių vežimui reguliaraus susisiekimo maršrutais ir jų bagažui bei meno ir kultūros įstaigų ir renginių lankymui, kai netaikomas PVM įstatymo 23 straipsnis."
    },
    {
      question: "Kam taikomas 5 proc. tarifas?",
      answer:
        "Vaistams ir medicinos priemonėms VMI išvardytomis sąlygomis, asmenų su negalia techninės pagalbos priemonėms ir jų remontui, periodiniams leidiniams, o nuo 2026 m. sausio 1 d. ir knygoms bei neperiodiniams informaciniams leidiniams. Yra išimčių, pavyzdžiui reklamai ir kalendoriams."
    },
    {
      question: "Kaip prie sumos be PVM pridėti 21 proc.?",
      answer:
        "Suma su PVM lygi sumai be PVM, padaugintai iš 1,21. 100 eurų be PVM tampa 121 euru su PVM. Pats mokestis yra 21 euras."
    },
    {
      question: "Kaip iš sumos su PVM išskirti 21 proc.?",
      answer:
        "Suma be PVM lygi sumai su PVM, padalytai iš 1,21. 121 euras su PVM yra 100 eurų be PVM ir 21 euras mokesčio."
    },
    {
      question: "Ar 9 proc. dar galima naudoti?",
      answer:
        "Naujiems 2026 m. sandoriams ne. VMI nurodo išimtį apgyvendinimui: rezervacijai, užregistruotai iki 2025 m. gruodžio 31 d., dar galėjo būti taikomas 9 proc. Skaičiuoklėje 9 proc. paliktas tik tokiems istoriniams skaičiavimams."
    }
  ],
  sources: [
    { href: "https://www.vmi.lt/evmi/pvm-tarifai", label: "VMI. PVM tarifai" },
    {
      href: "https://www.vmi.lt/evmi/standartinis-21-proc.-pvm-tarifas-19-str.-",
      label: "VMI. Standartinis 21 proc. tarifas"
    },
    {
      href: "https://www.vmi.lt/evmi/lengvatinis-12-proc.-pvm-tarifas-19-str.-",
      label: "VMI. Lengvatinis 12 proc. tarifas nuo 2026-01-01"
    },
    {
      href: "https://www.vmi.lt/evmi/lengvatinis-5-proc.-pvm-tarifas-19-str.-",
      label: "VMI. Lengvatinis 5 proc. tarifas"
    }
  ],
  related: [
    { href: MB, label: "MB steigimas ir mokesčiai" },
    { href: HUB, label: "Visi lietuviški gidai" }
  ]
};

export const LT_MB: LtPageMeta = {
  path: MB,
  title: "MB steigimas ir MB mokesčiai 2026",
  description:
    "Mažosios bendrijos įregistravimas kainuoja 17,13 Eur. 2026 m. pelno mokestis 0, 7 arba 17 proc., nario dividendų GPM 15 proc., PSD įmoka 80,48 Eur per mėnesį.",
  h1: "MB steigimas ir MB mokesčiai 2026",
  lede: "Mažosios bendrijos įregistravimas Registrų centro įkainių lentelėje kainuoja 17,13 euro. 2026 m. pelno mokestis yra 17 proc., smulkiam vienetui 7 proc., o pirmus du mokestinius laikotarpius gali būti 0 proc., jei pajamos neviršija 300 000 eurų ir tenkinamos kitos sąlygos. MB nario mėnesio PSD įmoka 2026 m. yra 80,48 euro. Aš vadovauju MB „Mažas startuolis“.",
  crumb: "MB steigimas ir mokesčiai",
  investing: false,
  cfd: false,
  disclosure: false,
  placeholder:
    "Čia turėtų atsirasti mano 2022 m. steigimo sąskaita: kiek sumokėjau tada, ne šiandienos 17,13 Eur įkainis, ir kaip dabar klasifikuoju išėmimus. Registrų centras patvirtina tik dokumentų datas ir kodą.",
  faqs: [
    {
      question: "Kiek kainuoja įregistruoti mažąją bendriją?",
      answer:
        "Registrų centro juridinių asmenų registravimo įkainių lentelėje mažosios bendrijos įregistravimas kainuoja 17,13 euro. Notaro, buveinės ar banko kainų ta lentelė neapima. 2022 m., kai registravau savąją, įkainis galėjo būti kitas, todėl savo sumos čia neįrašau."
    },
    {
      question: "Koks pelno mokestis 2026 metais?",
      answer:
        "17 proc. yra standartinis tarifas. 7 proc. taikomas, jei mokestinio laikotarpio pajamos neviršija 300 000 eurų ir vienetas netenkina PMĮ 5 straipsnio 3 dalies sąlygų. 0 proc. galimas pirmą ir antrą laikotarpį, jei papildomai dalyviai yra tik fiziniai asmenys ir per tris laikotarpius nėra sustabdymo, likvidavimo, reorganizavimo ar dalių perleidimo naujiems dalyviams."
    },
    {
      question: "Kiek GPM nuo pelno, išmokėto nariui?",
      answer:
        "Paskirstytasis pelnas apmokestinamas 15 proc. nuo pirmo euro ir neįskaičiuojamas į 20, 25 ar 32 proc. progresiją. VMI 2026 m. pavyzdyje 12 000 eurų, deklaruotų 26 pajamų rūšies kodu, GPM yra 1 800 eurų."
    },
    {
      question: "Kiek MB narys moka Sodrai 2026 metais?",
      answer:
        "Sodra nurodo 80,48 euro mėnesio PSD įmoką. VSD tarifas yra 20,81 proc.: iki 2026 m. birželio 30 d. nuo 50 proc. asmeniniams poreikiams išimtų lėšų, nuo 2026 m. liepos 1 d. nuo 90 proc. Pensiją kaupiantiems papildomai priskaičiuojami 3 proc. Metinės VSD ir PSD lubos yra 43 VDU, tai yra 99 422,45 euro."
    },
    {
      question: "Ar reikia minimalaus įstatinio kapitalo?",
      answer:
        "Inovacijų agentūra nurodo, kad mažajai bendrijai minimalus įstatinis kapitalas netaikomas, o UAB jis yra 1 000 eurų. Nariai vis tiek moka įnašus, kurių dydį nustato patys. Steigėjų gali būti nuo vieno iki dešimties, ir tik fiziniai asmenys."
    },
    {
      question: "Ką padaryti iškart po įregistravimo?",
      answer:
        "VMI įmonę įregistruoja pagal Registrų centro duomenis. Per 5 darbo dienas per Mano VMI reikia pateikti pranešimus FR0791 ir FR0791A. Savo užpildytų formų čia dar neįdėjau."
    }
  ],
  sources: [
    {
      href: "https://www.registrucentras.lt/p/ja-registravimo-ikainiai",
      label: "Registrų centras. Juridinių asmenų registravimo įkainiai, MB 17,13 Eur"
    },
    {
      href: "https://www.registrucentras.lt/jar/p/dok.php?kod=306176766",
      label: "Registrų centras. MB Mažas startuolis, kodas 306176766"
    },
    {
      href: "https://www.registrucentras.lt/jar/atmintines/index.php",
      label: "Registrų centras. Juridinio asmens steigimas elektroniniu būdu"
    },
    {
      href: "https://www.vmi.lt/evmi/5724",
      label: "VMI. Pelno mokesčio pakeitimai nuo 2026 m."
    },
    {
      href: "https://www.vmi.lt/evmi/0proc-tarifas",
      label: "VMI. 0 proc. pelno mokesčio tarifas"
    },
    {
      href: "https://www.vmi.lt/evmi/tarifai-5-str.-",
      label: "VMI. Pelno mokesčio tarifai, 5 straipsnis"
    },
    VMI_GPM,
    {
      href: "https://www.vmi.lt/evmi/5725",
      label: "VMI. GPM tarifų paaiškinimas, įskaitant MB vadovo pajamas"
    },
    {
      href: "https://www.vmi.lt/evmi/documents/20142/391071/2025-09-24+MB+-+apmokestinimas+GPM+ir+deklaravimas.pdf",
      label: "VMI. MB nario GPM, 12 000 Eur pavyzdys"
    },
    {
      href: "https://www.vmi.lt/evmi/noriu-steigti-%C4%AFmon%C4%99-ar-organizacij%C4%85-kaip-tai-padaryti-",
      label: "VMI. FR0791 ir FR0791A per 5 darbo dienas"
    },
    {
      href: "https://sodra.lt/sodros-imoku-tarifai-taikomi-nuo-2026-m-sausio-1-d-savarankiskai-dirbantiems-asmenims",
      label: "Sodra. 2026 m. įmokų tarifai savarankiškai dirbantiems"
    },
    {
      href: "https://sodra.lt/aktuali-informacija-savarankiskai-dirbantiems-asmenims-2026-metais",
      label: "Sodra. MB narių VSD bazė 50 proc. ir 90 proc."
    },
    {
      href: "https://www.inovacijuagentura.lt/informacija-verslui/pradek-ir-vystyk/mazoji-bendrija/",
      label: "Inovacijų agentūra. Mažoji bendrija, nariai ir kapitalas"
    },
    { href: VAT, label: "PVM skaičiuoklė 2026" }
  ],
  related: [
    { href: VAT, label: "PVM skaičiuoklė" },
    { href: HUB, label: "Visi lietuviški gidai" }
  ]
};

export const LT_PAGES: readonly LtPageMeta[] = [
  LT_HUB,
  LT_INVEST,
  LT_PLATFORMS,
  LT_T212,
  LT_IBKR,
  LT_VAT,
  LT_MB
];
