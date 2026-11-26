const NAMES: Record<string, string> = {
  AED: "UAE dirham",
  AFN: "Afghan afghani",
  ALL: "Albanian lek",
  AMD: "Armenian dram",
  ANG: "Netherlands Antillean guilder",
  AOA: "Angolan kwanza",
  ARS: "Argentine peso",
  AUD: "Australian dollar",
  AWG: "Aruban florin",
  AZN: "Azerbaijani manat",
  BAM: "Bosnia-Herzegovina mark",
  BBD: "Barbadian dollar",
  BDT: "Bangladeshi taka",
  BGN: "Bulgarian lev",
  BHD: "Bahraini dinar",
  BIF: "Burundian franc",
  BMD: "Bermudian dollar",
  BND: "Brunei dollar",
  BOB: "Bolivian boliviano",
  BRL: "Brazilian real",
  BSD: "Bahamian dollar",
  BTN: "Bhutanese ngultrum",
  BWP: "Botswana pula",
  BYN: "Belarusian ruble",
  BZD: "Belize dollar",
  CAD: "Canadian dollar",
  CDF: "Congolese franc",
  CHF: "Swiss franc",
  CLP: "Chilean peso",
  CNY: "Chinese yuan",
  COP: "Colombian peso",
  CRC: "Costa Rican colón",
  CUC: "Cuban convertible peso",
  CUP: "Cuban peso",
  CVE: "Cape Verdean escudo",
  CZK: "Czech koruna",
  DJF: "Djiboutian franc",
  DKK: "Danish krone",
  DOP: "Dominican peso",
  DZD: "Algerian dinar",
  EGP: "Egyptian pound",
  ERN: "Eritrean nakfa",
  ETB: "Ethiopian birr",
  EUR: "Euro",
  FJD: "Fijian dollar",
  FKP: "Falkland Islands pound",
  GBP: "British pound",
  GEL: "Georgian lari",
  GHS: "Ghanaian cedi",
  GIP: "Gibraltar pound",
  GMD: "Gambian dalasi",
  GNF: "Guinean franc",
  GTQ: "Guatemalan quetzal",
  GYD: "Guyanese dollar",
  HKD: "Hong Kong dollar",
  HNL: "Honduran lempira",
  HRK: "Croatian kuna",
  HTG: "Haitian gourde",
  HUF: "Hungarian forint",
  IDR: "Indonesian rupiah",
  ILS: "Israeli new shekel",
  INR: "Indian rupee",
  IQD: "Iraqi dinar",
  IRR: "Iranian rial",
  ISK: "Icelandic króna",
  JMD: "Jamaican dollar",
  JOD: "Jordanian dinar",
  JPY: "Japanese yen",
  KES: "Kenyan shilling",
  KGS: "Kyrgyzstani som",
  KHR: "Cambodian riel",
  KMF: "Comorian franc",
  KPW: "North Korean won",
  KRW: "South Korean won",
  KWD: "Kuwaiti dinar",
  KYD: "Cayman Islands dollar",
  KZT: "Kazakhstani tenge",
  LAK: "Lao kip",
  LBP: "Lebanese pound",
  LKR: "Sri Lankan rupee",
  LRD: "Liberian dollar",
  LSL: "Lesotho loti",
  LYD: "Libyan dinar",
  MAD: "Moroccan dirham",
  MDL: "Moldovan leu",
  MGA: "Malagasy ariary",
  MKD: "Macedonian denar",
  MMK: "Myanmar kyat",
  MNT: "Mongolian tögrög",
  MOP: "Macanese pataca",
  MRU: "Mauritanian ouguiya",
  MUR: "Mauritian rupee",
  MVR: "Maldivian rufiyaa",
  MWK: "Malawian kwacha",
  MXN: "Mexican peso",
  MYR: "Malaysian ringgit",
  MZN: "Mozambican metical",
  NAD: "Namibian dollar",
  NGN: "Nigerian naira",
  NIO: "Nicaraguan córdoba",
  NOK: "Norwegian krone",
  NPR: "Nepalese rupee",
  NZD: "New Zealand dollar",
  OMR: "Omani rial",
  PAB: "Panamanian balboa",
  PEN: "Peruvian sol",
  PGK: "Papua New Guinean kina",
  PHP: "Philippine peso",
  PKR: "Pakistani rupee",
  PLN: "Polish złoty",
  PYG: "Paraguayan guaraní",
  QAR: "Qatari riyal",
  RON: "Romanian leu",
  RSD: "Serbian dinar",
  RUB: "Russian ruble",
  RWF: "Rwandan franc",
  SAR: "Saudi riyal",
  SBD: "Solomon Islands dollar",
  SCR: "Seychellois rupee",
  SDG: "Sudanese pound",
  SEK: "Swedish krona",
  SGD: "Singapore dollar",
  SHP: "Saint Helena pound",
  SLE: "Sierra Leonean leone",
  SLL: "Sierra Leonean leone (old)",
  SOS: "Somali shilling",
  SRD: "Surinamese dollar",
  SSP: "South Sudanese pound",
  STN: "São Tomé and Príncipe dobra",
  SVC: "Salvadoran colón",
  SYP: "Syrian pound",
  SZL: "Eswatini lilangeni",
  THB: "Thai baht",
  TJS: "Tajikistani somoni",
  TMT: "Turkmenistani manat",
  TND: "Tunisian dinar",
  TOP: "Tongan paʻanga",
  TRY: "Turkish lira",
  TTD: "Trinidad and Tobago dollar",
  TWD: "New Taiwan dollar",
  TZS: "Tanzanian shilling",
  UAH: "Ukrainian hryvnia",
  UGX: "Ugandan shilling",
  USD: "US dollar",
  UYU: "Uruguayan peso",
  UZS: "Uzbekistani som",
  VES: "Venezuelan bolívar",
  VND: "Vietnamese đồng",
  VUV: "Vanuatu vatu",
  WST: "Samoan tālā",
  XAF: "Central African CFA franc",
  XCD: "East Caribbean dollar",
  XCG: "Caribbean guilder",
  XDR: "IMF special drawing right",
  XOF: "West African CFA franc",
  XPF: "CFP franc",
  YER: "Yemeni rial",
  ZAR: "South African rand",
  ZMW: "Zambian kwacha",
  ZWG: "Zimbabwe gold",
  ZWL: "Zimbabwean dollar (old)",
}

const FLAG_COUNTRY: Record<string, string | null> = {
  EUR: "EU",
  XAF: "CM",
  XOF: "SN",
  XCD: "AG",
  XPF: "PF",
  ANG: "CW",
  XCG: "CW",
  XDR: null,
}

const FRACTION_DIGITS: Record<string, number> = {
  BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0, PYG: 0,
  RWF: 0, UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0, IDR: 0,
  BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,
}

export interface DisplayRates {
  perUsd: Record<string, number>
  quotedAt: string
}

export const RATES_URL = "https://api.prydd.co/fx/display-rates"

export function isDisplayRates(value: unknown): value is DisplayRates {
  if (!value || typeof value !== "object") return false
  const { perUsd, quotedAt } = value as Record<string, unknown>
  return (
    typeof quotedAt === "string" &&
    !!perUsd &&
    typeof perUsd === "object" &&
    Object.values(perUsd).every((rate) => typeof rate === "number" && rate > 0)
  )
}

export function currencyName(code: string): string {
  return NAMES[code] ?? code
}

export function currencyFlagUrl(code: string): string | null {
  const country =
    code in FLAG_COUNTRY ? FLAG_COUNTRY[code] : code.slice(0, 2).toUpperCase()
  return country && /^[A-Z]{2}$/.test(country)
    ? `/flags/v1/${country.toLowerCase()}.webp`
    : null
}

export function matchesCurrency(code: string, query: string): boolean {
  const haystack = `${currencyName(code)} ${code}`.toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export function formatAmount(value: number, currency: string): string {
  const digits = FRACTION_DIGITS[currency] ?? 2
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function formatRate(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 4,
  })
}

/**
 * Written from whichever side gives a number of at least one, so nobody reads
 * "1 NGN = 0.00 USD".
 */
export function formatPairRate(from: string, to: string, rate: number): string {
  return rate >= 1
    ? `1 ${from} = ${formatRate(rate)} ${to}`
    : `1 ${to} = ${formatRate(1 / rate)} ${from}`
}

/**
 * A round amount worth something in the currency: 100 where a unit is worth
 * about a dollar or more, otherwise the round figure nearest below a hundred
 * dollars' worth, so naira opens on 100,000 rather than on 100.
 */
export function startingAmount(perUsd: number): string {
  const value = perUsd < 10 ? 100 : 10 ** Math.floor(Math.log10(perUsd * 100))
  return groupDigits(String(value))
}

/**
 * Turns a comma the visitor entered as a decimal separator into a point. The
 * field shows its own grouping commas, so only the text just inserted is
 * examined: a comma in it followed by at most two digits ("," on its own,
 * "1,5" from a predictive keyboard, a pasted "12,50") is a decimal. Deletions
 * never reinterpret a comma.
 */
export function normaliseDecimalComma(raw: string, caret: number, inputType: string, data: string | null): string {
  if (raw.includes(".") || !inputType.startsWith("insert")) return raw
  if (data === null) return /^\d+,\d{1,2}$/.test(raw) ? raw.replace(",", ".") : raw
  const start = caret - data.length
  if (start < 0 || raw.slice(start, caret) !== data) return raw
  const match = /,(\d{0,2})$/.exec(data)
  if (!match || data.indexOf(",") !== match.index) return raw
  const comma = start + match.index
  return raw.slice(0, comma) + "." + raw.slice(comma + 1)
}

export function groupDigits(text: string): string {
  const [whole, ...rest] = text.split(".")
  const grouped = whole.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return rest.length ? `${grouped}.${rest.join("")}` : grouped
}

export function parseAmount(text: string): number {
  if (text.split(".").length > 2) return Number.NaN
  return Number.parseFloat(text.replace(/[\s,]/g, ""))
}
