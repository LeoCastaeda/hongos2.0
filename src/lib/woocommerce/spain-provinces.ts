/** WooCommerce Spanish state codes (plugins/woocommerce/i18n/states.php). */
export const SPAIN_PROVINCES: { code: string; name: string }[] = [
  { code: 'C', name: 'A Coruña' },
  { code: 'VI', name: 'Araba/Álava' },
  { code: 'AB', name: 'Albacete' },
  { code: 'A', name: 'Alicante' },
  { code: 'AL', name: 'Almería' },
  { code: 'O', name: 'Asturias' },
  { code: 'AV', name: 'Ávila' },
  { code: 'BA', name: 'Badajoz' },
  { code: 'PM', name: 'Baleares' },
  { code: 'B', name: 'Barcelona' },
  { code: 'BU', name: 'Burgos' },
  { code: 'CC', name: 'Cáceres' },
  { code: 'CA', name: 'Cádiz' },
  { code: 'S', name: 'Cantabria' },
  { code: 'CS', name: 'Castellón' },
  { code: 'CE', name: 'Ceuta' },
  { code: 'CR', name: 'Ciudad Real' },
  { code: 'CO', name: 'Córdoba' },
  { code: 'CU', name: 'Cuenca' },
  { code: 'GI', name: 'Girona' },
  { code: 'GR', name: 'Granada' },
  { code: 'GU', name: 'Guadalajara' },
  { code: 'SS', name: 'Gipuzkoa' },
  { code: 'H', name: 'Huelva' },
  { code: 'HU', name: 'Huesca' },
  { code: 'J', name: 'Jaén' },
  { code: 'LO', name: 'La Rioja' },
  { code: 'GC', name: 'Las Palmas' },
  { code: 'LE', name: 'León' },
  { code: 'L', name: 'Lleida' },
  { code: 'LU', name: 'Lugo' },
  { code: 'M', name: 'Madrid' },
  { code: 'MA', name: 'Málaga' },
  { code: 'ML', name: 'Melilla' },
  { code: 'MU', name: 'Murcia' },
  { code: 'NA', name: 'Navarra' },
  { code: 'OR', name: 'Ourense' },
  { code: 'P', name: 'Palencia' },
  { code: 'PO', name: 'Pontevedra' },
  { code: 'SA', name: 'Salamanca' },
  { code: 'TF', name: 'Santa Cruz de Tenerife' },
  { code: 'SG', name: 'Segovia' },
  { code: 'SE', name: 'Sevilla' },
  { code: 'SO', name: 'Soria' },
  { code: 'T', name: 'Tarragona' },
  { code: 'TE', name: 'Teruel' },
  { code: 'TO', name: 'Toledo' },
  { code: 'V', name: 'Valencia' },
  { code: 'VA', name: 'Valladolid' },
  { code: 'BI', name: 'Bizkaia' },
  { code: 'ZA', name: 'Zamora' },
  { code: 'Z', name: 'Zaragoza' },
];

export function normalizeSpainState(value: string | undefined | null): string {
  const raw = (value || '').trim();
  if (!raw) return '';
  const upper = raw.toUpperCase();
  if (SPAIN_PROVINCES.some((p) => p.code === upper)) return upper;

  const lower = raw.toLowerCase();
  const byName = SPAIN_PROVINCES.find(
    (p) =>
      p.name.toLowerCase() === lower ||
      p.name.toLowerCase().includes(lower) ||
      lower.includes(p.name.toLowerCase())
  );
  return byName?.code || raw;
}
