import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export interface QuoteRecord {
  id: string;
  created_at: string;
  nombre_completo: string;
  telefono: string;
  correo?: string;
  producto_a_personalizar: string;
  cantidad_aproximada: string;
  detalles_idea?: string;
  acepta_lopdp: boolean;
  estado: 'Pendiente' | 'Contactado' | 'En Producción' | 'Completado' | 'Cancelado' | string;

  // Aliases for compatibility
  full_name: string;
  phone: string;
  email?: string;
  product_type: string;
  quantity: string;
  specifications?: string;
  file_name?: string;
  status: 'Pendiente' | 'Contactado' | 'En Producción' | 'Completado' | 'Cancelado' | string;
  notes?: string;
  source?: string;
}

const LOCAL_STORAGE_QUOTES = 'el_perchero_leads_records_v2';

export const mapRowToQuoteRecord = (row: any): QuoteRecord => {
  const nombre = row.nombre_completo || row.full_name || 'Cliente sin nombre';
  const tel = row.telefono || row.phone || '';
  const email = row.correo || row.email || '';
  const prod = row.producto_a_personalizar || row.product_type || 'Sublimación general';
  const cant = row.cantidad_aproximada || row.quantity || '1 Docena';
  const detalles = row.detalles_idea || row.specifications || '';
  const lopdp = row.acepta_lopdp !== undefined ? Boolean(row.acepta_lopdp) : true;
  const estado = row.estado || row.status || 'Pendiente';

  return {
    id: String(row.id || 'lead-' + Date.now()),
    created_at: row.created_at || new Date().toISOString(),
    nombre_completo: nombre,
    telefono: tel,
    correo: email,
    producto_a_personalizar: prod,
    cantidad_aproximada: cant,
    detalles_idea: detalles,
    acepta_lopdp: lopdp,
    estado,

    // Aliases
    full_name: nombre,
    phone: tel,
    email: email,
    product_type: prod,
    quantity: cant,
    specifications: detalles,
    file_name: row.nombre_archivo_adjunto || row.archivo_nombre || row.file_name || '',
    status: estado,
    notes: row.notas || row.notes || '',
    source: row.source || 'landing_page_el_perchero',
  };
};

// Initial realistic mock data for evaluation and fallback
const INITIAL_SAMPLE_QUOTES: QuoteRecord[] = [
  {
    id: 'lead-001',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    nombre_completo: 'Carlos Mendoza (Street Brand Ec)',
    telefono: '0991234567',
    correo: 'carlos@streetbrand.ec',
    producto_a_personalizar: 'Camisetas, Hoodies & Joggers (Streetwear y Alta Pinta)',
    cantidad_aproximada: '2 a 4 Docenas (24 - 48 unidades - Marca / Negocio)',
    detalles_idea: '36 camisetas oversize negras con estampado full color en espalda y logo en pecho. Tallas S, M, L.',
    acepta_lopdp: true,
    estado: 'Pendiente',

    full_name: 'Carlos Mendoza (Street Brand Ec)',
    phone: '0991234567',
    email: 'carlos@streetbrand.ec',
    product_type: 'Camisetas, Hoodies & Joggers (Streetwear y Alta Pinta)',
    quantity: '2 a 4 Docenas (24 - 48 unidades - Marca / Negocio)',
    specifications: '36 camisetas oversize negras con estampado full color en espalda y logo en pecho. Tallas S, M, L.',
    file_name: 'logo_streetwear_vector.png',
    status: 'Pendiente',
    notes: 'Cliente prioritario para nuevo drop de temporada.',
    source: 'web_form',
  },
  {
    id: 'lead-002',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    nombre_completo: 'Fernanda Dávila (Tech Ecuador)',
    telefono: '0987654321',
    correo: 'fernanda.davila@techec.com',
    producto_a_personalizar: 'Artículos de Sublimación Corporativa',
    cantidad_aproximada: '5 a 10 Docenas (60 - 120 unidades - Evento / Empresa)',
    detalles_idea: 'Welcome kit institucional con termos metálicos grabados y lanyards en satín azul marino.',
    acepta_lopdp: true,
    estado: 'En Producción',

    full_name: 'Fernanda Dávila (Tech Ecuador)',
    phone: '0987654321',
    email: 'fernanda.davila@techec.com',
    product_type: 'Artículos de Sublimación Corporativa',
    quantity: '5 a 10 Docenas (60 - 120 unidades - Evento / Empresa)',
    specifications: 'Welcome kit institucional con termos metálicos grabados y lanyards en satín azul marino.',
    file_name: 'manual_marca_corporativo.pdf',
    status: 'En Producción',
    notes: 'Aprobó mockup digital el día de ayer. Prensas térmicas en proceso.',
    source: 'web_form',
  },
  {
    id: 'lead-003',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    nombre_completo: 'David Ortiz (Club Deportivo)',
    telefono: '0994567890',
    correo: 'david@clubpadel.ec',
    producto_a_personalizar: 'Gorras Personalizadas ($5.00 x mayor desde la docena)',
    cantidad_aproximada: '1 Docena (12 unidades - Precio al por mayor)',
    detalles_idea: '12 gorras trucker negras con parche sublimado HD del escudo del equipo.',
    acepta_lopdp: true,
    estado: 'Completado',

    full_name: 'David Ortiz (Club Deportivo)',
    phone: '0994567890',
    email: 'david@clubpadel.ec',
    product_type: 'Gorras Personalizadas ($5.00 x mayor desde la docena)',
    quantity: '1 Docena (12 unidades - Precio al por mayor)',
    specifications: '12 gorras trucker negras con parche sublimado HD del escudo del equipo.',
    file_name: 'escudo_club_alta_resolucion.jpg',
    status: 'Completado',
    notes: 'Entregado por Servientrega en Quito. Cliente satisfecho.',
    source: 'web_form',
  },
];

export const getLocalQuotes = (): QuoteRecord[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_QUOTES);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_QUOTES, JSON.stringify(INITIAL_SAMPLE_QUOTES));
    return INITIAL_SAMPLE_QUOTES;
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.map(mapRowToQuoteRecord) : INITIAL_SAMPLE_QUOTES;
  } catch {
    return INITIAL_SAMPLE_QUOTES;
  }
};

export const saveLocalQuote = (quote: QuoteRecord): void => {
  const current = getLocalQuotes();
  const updated = [quote, ...current.filter((q) => q.id !== quote.id)];
  localStorage.setItem(LOCAL_STORAGE_QUOTES, JSON.stringify(updated));
};

export const fetchAllQuotes = async (): Promise<{ quotes: QuoteRecord[]; fromSupabase: boolean; error?: string }> => {
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const { data, error } = await client
        .from('el_perchero_cotizaciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error al consultar tabla el_perchero_cotizaciones en Supabase:', error.message);
        return { quotes: getLocalQuotes(), fromSupabase: false, error: error.message };
      }

      if (data && data.length > 0) {
        const mappedQuotes = data.map(mapRowToQuoteRecord);
        return { quotes: mappedQuotes, fromSupabase: true };
      } else if (data && data.length === 0) {
        // Table exists in Supabase but has 0 records yet
        return { quotes: [], fromSupabase: true };
      }
    } catch (err: unknown) {
      console.warn('Excepción de Supabase:', err);
    }
  }

  // Fallback to local storage
  return { quotes: getLocalQuotes(), fromSupabase: false };
};

export const createQuote = async (payload: {
  fullName: string;
  phone: string;
  email?: string;
  productType: string;
  quantity: string;
  specifications?: string;
  fileName?: string;
  aceptaLopdp?: boolean;
}): Promise<{ success: boolean; id: string; savedInSupabase: boolean; error?: string }> => {
  const newId = 'lead-' + Date.now();
  const lopdpAccepted = payload.aceptaLopdp !== undefined ? payload.aceptaLopdp : true;

  const newRecord: QuoteRecord = {
    id: newId,
    created_at: new Date().toISOString(),
    nombre_completo: payload.fullName,
    telefono: payload.phone,
    correo: payload.email || '',
    producto_a_personalizar: payload.productType,
    cantidad_aproximada: payload.quantity,
    detalles_idea: payload.specifications || '',
    acepta_lopdp: lopdpAccepted,
    estado: 'Pendiente',

    // Aliases
    full_name: payload.fullName,
    phone: payload.phone,
    email: payload.email || '',
    product_type: payload.productType,
    quantity: payload.quantity,
    specifications: payload.specifications || '',
    file_name: payload.fileName || '',
    status: 'Pendiente',
    notes: 'Nueva cotización desde la landing page.',
    source: 'landing_page_el_perchero',
  };

  // Always save in local storage as reliable backup
  saveLocalQuote(newRecord);

  let savedInSupabase = false;

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const insertData: Record<string, any> = {
        nombre_completo: payload.fullName,
        telefono: payload.phone,
        correo: payload.email || null,
        producto_a_personalizar: payload.productType,
        cantidad_aproximada: payload.quantity,
        detalles_idea: payload.specifications || null,
        acepta_lopdp: lopdpAccepted,
        nombre_archivo_adjunto: payload.fileName || null,
        estado: 'Pendiente',
      };

      // Try inserting with all fields
      let { error } = await client
        .from('el_perchero_cotizaciones')
        .insert([insertData]);

      // If optional column error occurs, retry with strictly the 7 specified core fields
      if (error && (error.code === '42703' || error.message.includes('column'))) {
        const strictData = {
          nombre_completo: payload.fullName,
          telefono: payload.phone,
          correo: payload.email || null,
          producto_a_personalizar: payload.productType,
          cantidad_aproximada: payload.quantity,
          detalles_idea: payload.specifications || null,
          acepta_lopdp: lopdpAccepted,
        };
        const retry = await client
          .from('el_perchero_cotizaciones')
          .insert([strictData]);
        error = retry.error;
      }

      if (!error) {
        savedInSupabase = true;
      } else {
        console.warn('No se pudo guardar en Supabase (el_perchero_cotizaciones):', error.message);
      }
    } catch (err: unknown) {
      console.warn('Excepción al enviar a Supabase:', err);
    }
  }

  return { success: true, id: newId, savedInSupabase };
};

export const updateQuoteStatus = async (
  id: string,
  newStatus: QuoteRecord['status'],
  notes?: string
): Promise<boolean> => {
  // Update local storage
  const current = getLocalQuotes();
  const updated = current.map((q) =>
    q.id === id ? { ...q, estado: newStatus, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : q
  );
  localStorage.setItem(LOCAL_STORAGE_QUOTES, JSON.stringify(updated));

  // Update Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const { error } = await client
        .from('el_perchero_cotizaciones')
        .update({ estado: newStatus })
        .eq('id', id);

      if (error && (error.message.includes('estado') || error.code === '42703')) {
        await client
          .from('el_perchero_cotizaciones')
          .update({ status: newStatus })
          .eq('id', id);
      }
    } catch (err) {
      console.warn('Error actualizando estado en Supabase:', err);
    }
  }

  return true;
};

export const deleteQuoteRecord = async (id: string): Promise<boolean> => {
  // Delete from local storage
  const current = getLocalQuotes();
  const updated = current.filter((q) => q.id !== id);
  localStorage.setItem(LOCAL_STORAGE_QUOTES, JSON.stringify(updated));

  // Delete from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      await client.from('el_perchero_cotizaciones').delete().eq('id', id);
    } catch (err) {
      console.warn('Error eliminando en Supabase:', err);
    }
  }

  return true;
};
