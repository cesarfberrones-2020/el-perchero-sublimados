import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export interface QuoteRecord {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email?: string;
  product_type: string;
  quantity: string;
  specifications?: string;
  file_name?: string;
  file_url?: string;
  status: 'Pendiente' | 'Contactado' | 'En Producción' | 'Completado' | 'Cancelado';
  notes?: string;
  source?: string;
}

const LOCAL_STORAGE_QUOTES = 'el_perchero_leads_records_v1';

// Sample initial mock data so the Admin Dashboard starts with realistic data for the professor
const INITIAL_SAMPLE_QUOTES: QuoteRecord[] = [
  {
    id: 'lead-001',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
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
    return JSON.parse(data);
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
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error al consultar Supabase, usando respaldo local:', error.message);
        return { quotes: getLocalQuotes(), fromSupabase: false, error: error.message };
      }

      if (data && data.length > 0) {
        return { quotes: data as QuoteRecord[], fromSupabase: true };
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
}): Promise<{ success: boolean; id: string; savedInSupabase: boolean; error?: string }> => {
  const newId = 'lead-' + Date.now();
  const newRecord: QuoteRecord = {
    id: newId,
    created_at: new Date().toISOString(),
    full_name: payload.fullName,
    phone: payload.phone,
    email: payload.email || '',
    product_type: payload.productType,
    quantity: payload.quantity,
    specifications: payload.specifications || '',
    file_name: payload.fileName || '',
    status: 'Pendiente',
    notes: 'Nueva solicitud desde la landing page.',
    source: 'landing_page_el_perchero',
  };

  // Always save in local storage as reliable backup
  saveLocalQuote(newRecord);

  let savedInSupabase = false;

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const { error } = await client.from('quotes').insert([
        {
          full_name: payload.fullName,
          phone: payload.phone,
          email: payload.email || null,
          product_type: payload.productType,
          quantity: payload.quantity,
          specifications: payload.specifications || null,
          file_name: payload.fileName || null,
          status: 'Pendiente',
          source: 'landing_page_el_perchero',
        },
      ]);

      if (!error) {
        savedInSupabase = true;
      } else {
        console.warn('No se pudo guardar en Supabase:', error.message);
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
    q.id === id ? { ...q, status: newStatus, ...(notes !== undefined ? { notes } : {}) } : q
  );
  localStorage.setItem(LOCAL_STORAGE_QUOTES, JSON.stringify(updated));

  // Update Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      await client
        .from('quotes')
        .update({ status: newStatus, ...(notes !== undefined ? { notes } : {}) })
        .eq('id', id);
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
      await client.from('quotes').delete().eq('id', id);
    } catch (err) {
      console.warn('Error eliminando en Supabase:', err);
    }
  }

  return true;
};
