/**
 * Affiliate URLs for the Lithuanian guides.
 *
 * Leave `affiliateUrl` empty. The site then links to `officialUrl` with
 * rel="noopener noreferrer". When a real tracking URL is pasted in,
 * the same component switches that brand to rel="sponsored nofollow noopener noreferrer".
 * Do not put commission rates, inbox addresses, or payout notes in this file.
 */

export interface LtBrand {
  id: string;
  name: string;
  officialUrl: string;
  affiliateUrl: string;
}

export const LT_BRAND_IDS = [
  "trading-212",
  "interactive-brokers",
  "xtb",
  "freedom24",
  "profitus",
  "inrento",
  "insoil",
  "finbee",
  "finbee-verslui",
  "nordstreet",
  "savy",
  "crowdpear",
  "letsinvest",
  "finomark",
  "bemybond",
  "florrid"
] as const;

export type LtBrandId = (typeof LT_BRAND_IDS)[number];

export const LT_BRANDS: Record<LtBrandId, LtBrand> = {
  "trading-212": {
    id: "trading-212",
    name: "Trading 212",
    officialUrl: "https://www.trading212.com/",
    affiliateUrl: ""
  },
  "interactive-brokers": {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    officialUrl: "https://www.interactivebrokers.ie/",
    affiliateUrl: ""
  },
  xtb: {
    id: "xtb",
    name: "XTB",
    officialUrl: "https://www.xtb.com/",
    affiliateUrl: ""
  },
  freedom24: {
    id: "freedom24",
    name: "Freedom24",
    officialUrl: "https://freedom24.com/",
    affiliateUrl: ""
  },
  profitus: {
    id: "profitus",
    name: "Profitus",
    officialUrl: "https://www.profitus.lt/",
    affiliateUrl: ""
  },
  inrento: {
    id: "inrento",
    name: "InRento",
    officialUrl: "https://www.inrento.lt/",
    affiliateUrl: ""
  },
  insoil: {
    id: "insoil",
    name: "InSoil",
    officialUrl: "https://finance.insoil.com/",
    affiliateUrl: ""
  },
  finbee: {
    id: "finbee",
    name: "Finbee",
    officialUrl: "https://www.finbee.lt/investuok/",
    affiliateUrl: ""
  },
  "finbee-verslui": {
    id: "finbee-verslui",
    name: "Finbee verslui",
    officialUrl: "https://www.finbeeeverslui.lt/",
    affiliateUrl: ""
  },
  nordstreet: {
    id: "nordstreet",
    name: "Nordstreet",
    officialUrl: "https://www.nordstreet.com/",
    affiliateUrl: ""
  },
  savy: {
    id: "savy",
    name: "Savy",
    officialUrl: "https://gosavy.com/",
    affiliateUrl: ""
  },
  crowdpear: {
    id: "crowdpear",
    name: "Crowdpear",
    officialUrl: "https://crowdpear.com/",
    affiliateUrl: ""
  },
  letsinvest: {
    id: "letsinvest",
    name: "Letsinvest",
    officialUrl: "https://letsinvest.eu/",
    affiliateUrl: ""
  },
  finomark: {
    id: "finomark",
    name: "FinoMark",
    officialUrl: "https://www.finomark.lt/",
    affiliateUrl: ""
  },
  bemybond: {
    id: "bemybond",
    name: "BeMyBond",
    officialUrl: "https://www.bemybond.com/",
    affiliateUrl: ""
  },
  florrid: {
    id: "florrid",
    name: "Florrid",
    officialUrl: "https://florrid.com/",
    affiliateUrl: ""
  }
};

export interface ResolvedBrandLink {
  name: string;
  href: string;
  sponsored: boolean;
  rel: string;
}

export function resolveBrandLink(id: LtBrandId): ResolvedBrandLink {
  const brand = LT_BRANDS[id];
  const affiliateUrl = brand.affiliateUrl.trim();
  const sponsored = affiliateUrl.length > 0;

  return {
    name: brand.name,
    href: sponsored ? affiliateUrl : brand.officialUrl,
    sponsored,
    rel: sponsored ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"
  };
}

export function hasAffiliateLinks(): boolean {
  return LT_BRAND_IDS.some((id) => LT_BRANDS[id].affiliateUrl.trim().length > 0);
}

export function affiliateDisclosureLt(): string {
  if (hasAffiliateLinks()) {
    return "Dalis nuorodų yra partnerių nuorodos. Jei per jas užsisakysite paslaugą, galėčiau gauti komisinį be papildomos kainos jums. Tokios nuorodos pažymėtos kaip reklaminės. Skaičiai imti iš oficialių šaltinių. Tekstas nėra asmeninė investavimo rekomendacija.";
  }

  return "Šiuo metu nuorodos veda į oficialius paslaugų teikėjų puslapius, nes partnerių adresai dar neįrašyti. Kai adresas bus įrašytas, nuoroda bus pažymėta kaip reklaminė. Už ją galėčiau gauti komisinį be papildomos kainos jums. Tekstas yra informacinis ir nėra asmeninė investavimo rekomendacija.";
}
