export interface Country {
    /** Country name and translations */
    name:         Name;
    /** TopLevelDomain zone, starts with `.` */
    tld?:         string[];
    /** Country Code Alpha - ISO 3166-1 alpha-2 code */
    cca2:         string;
    /** Currency Numeric Code - ISO 3166-1 numeric-3 */
    ccn3?:        string;
    /** Country Code Alpha - ISO 3166-1 alpha-3 */
    cca3:         string;
    /** International Olympic Committee Code */
    cioc?:        string;
    /** Is country independent or not */
    independent?: boolean;
    /** Country status (official or user-defined) */
    status:       Status;
    /** Is Country a Member State of the United Nations */
    unMember:     boolean;
    /** Usable currencies inside a country */
    currencies?:  Currencies;
    /** International Direct Dialing information */
    idd:          InternationalDirectDialing;
    /** Country's capital */
    capital?:     string[];
    /** Alternative spellings */
    altSpellings: string[];
    /** Country region */
    region:       Region;
    /** Country Subregion */
    subregion?:   string;
    /** Official Country's languages */
    languages?:   { [language: string]: string };
    /** Country name translations (i18n) */
    translations: { [language: string]: Translation };
    /** Geographic coordinates */
    latlng:       [lat: number, lon: number];
    /** If `false` - Country has access to global ocean */
    landlocked:   boolean;
    /** Nearby countries */
    borders?:     string[];
    /** Total country area in square kilometers */
    area:         number;
    /** Denonyms (a word that identifies a group of people (inhabitants, residents, natives) in relation to a particular place) */
    demonyms?:    Demonyms;
    /** Emoji flag */
    flag:         string;
    /** Links to popular maps sources */
    maps:         Maps;
    /** Approximate population */
    population:   number;
    /** Gini coefficient (wealth equality) */
    gini?:        { [year: string]: number };
    /** FIFA Country code */
    fifa?:        string;
    /** Car movements related information */
    car:          Car;
    /** Country timezones (`UTC+XX:XX`) */
    timezones:    string[];
    /** Country Continents */
    continents:   Continent[];
    /** Country flags (png, svg) */
    flags:        Flags;
    /** Coat of Arms or Country "Emblem" */
    coatOfArms:   CoatOfArms;
    /** Country week start at */
    startOfWeek:  StartOfWeek;
    /** Country capital information */
    capitalInfo:  CapitalInfo;
    /** Country postal code information */
    postalCode?:  PostalCode;
}

export interface CapitalInfo {
    /** Geographic coordinates */
    latlng?: [lat: number, lon: number];
}

export interface Car {
    signs?: string[];
    /** Cars driving side */
    side:   CarSide;
}

export type CarSide = "left" | "right";

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export type Continent = "Africa" | "Antarctica" | "Asia" | "Europe" | "North America" | "Oceania" | "South America";

export type Currency = string;

export interface Currencies {
    [currencyCode: Currency]: CurrencyInformation;
}

export interface CurrencyInformation {
    /** Full currency name */
    name:   string;
    /** Currency symbol (in rare cases like BAM and SDG can be undefined) */
    symbol?: string;
}

export interface Demonyms {
    eng:  Denonym;
    fra?: Denonym;
}

export interface Denonym {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface InternationalDirectDialing {
    /** The number starts with */
    root?:     string;
    suffixes?: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    /** Common name */
    common:      string;
    /** Official name */
    official:    string;
    /** Native name in native language */
    nativeName?: { [language: string]: Translation };
}

export interface Translation {
    /** Official name */
    official: string;
    /** Common name */
    common:   string;
}

export interface PostalCode {
    /** Postal code format (`#` is a number) */
    format: string;
    /** RegExp postal code validator */
    regex?: string;
}

export type Region = "Africa" | "Americas" | "Antarctic" | "Asia" | "Europe" | "Oceania";

export type StartOfWeek = "monday" | "saturday" | "sunday";

export type Status = "officially-assigned" | "user-assigned";
