import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export interface BitacoraEntry {
  id: string;
  created_at: string;
  tipo_evento: 'Venta Cerrada' | 'Nuevo Pedido' | 'En Producción' | 'Entrega Realizada' | 'Cotización';
  cliente: string;
  producto: string;
  cantidad_unidades: number;
  monto_usd: number;
  estado: 'Completado' | 'En Proceso' | 'Pendiente' | 'Entregado';
  notas?: string;
}

const LOCAL_STORAGE_BITACORA = 'el_perchero_bitacora_records_v1';

// Initial realistic entries for evaluation and demo
const INITIAL_BITACORA: BitacoraEntry[] = [
  {
    id: 'bit-001',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    tipo_evento: 'Venta Cerrada',
    cliente: 'Carlos Mendoza (Street Brand Ec)',
    producto: 'Camisetas Oversize Negras (Full Estampado)',
    cantidad_unidades: 36, // 3 docenas
    monto_usd: 360.00,
    estado: 'Completado',
    notas: 'Pago del 50% de anticipo recibido vía transferencia Pichincha. Producción iniciada.',
  },
  {
    id: 'bit-002',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    tipo_evento: 'En Producción',
    cliente: 'Tech Ecuador (Fernanda Dávila)',
    producto: 'Termos Metálicos Grabados & Lanyards Corporativos',
    cantidad_unidades: 60, // 5 docenas
    monto_usd: 600.00,
    estado: 'En Proceso',
    notas: 'Maqueta 3D aprobada. Planchado térmico y grabado en ejecución.',
  },
  {
    id: 'bit-003',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    tipo_evento: 'Entrega Realizada',
    cliente: 'David Ortiz (Club Padel Quito)',
    producto: 'Gorras Trucker Negras con Parche HD ($5 x mayor)',
    cantidad_unidades: 48, // 4 docenas
    monto_usd: 240.00,
    estado: 'Entregado',
    notas: 'Entregado satisfactoriamente por Servientrega. Saldo 100% cancelado.',
  },
  {
    id: 'bit-004',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    tipo_evento: 'Venta Cerrada',
    cliente: 'Cafetería & Coworking La Floresta',
    producto: 'Tazas Blancas de Cerámica Personalizadas ($3.50)',
    cantidad_unidades: 24, // 2 docenas
    monto_usd: 84.00,
    estado: 'Completado',
    notas: 'Tazas para souvenirs de aniversario.',
  },
  {
    id: 'bit-005',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    tipo_evento: 'Venta Cerrada',
    cliente: 'Academia Dance Studio',
    producto: 'Hoodies Afelpados con Capucha ($15 x mayor)',
    cantidad_unidades: 24, // 2 docenas
    monto_usd: 360.00,
    estado: 'Completado',
    notas: 'Uniformes para competencia nacional.',
  },
];

export const getLocalBitacora = (): BitacoraEntry[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_BITACORA);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_BITACORA, JSON.stringify(INITIAL_BITACORA));
    return INITIAL_BITACORA;
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_BITACORA;
  } catch {
    return INITIAL_BITACORA;
  }
};

export const saveLocalBitacoraEntry = (entry: BitacoraEntry): void => {
  const current = getLocalBitacora();
  const updated = [entry, ...current.filter((b) => b.id !== entry.id)];
  localStorage.setItem(LOCAL_STORAGE_BITACORA, JSON.stringify(updated));
};

export const fetchBitacora = async (): Promise<{ entries: BitacoraEntry[]; fromSupabase: boolean; error?: string }> => {
  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const { data, error } = await client
        .from('el_perchero_bitacora')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Tabla el_perchero_bitacora no disponible en Supabase, usando respaldo local:', error.message);
        return { entries: getLocalBitacora(), fromSupabase: false, error: error.message };
      }

      if (data && data.length > 0) {
        const mapped: BitacoraEntry[] = data.map((row: any) => ({
          id: String(row.id),
          created_at: row.created_at || new Date().toISOString(),
          tipo_evento: row.tipo_evento || 'Venta Cerrada',
          cliente: row.cliente || 'Cliente General',
          producto: row.producto || 'Sublimación',
          cantidad_unidades: Number(row.cantidad_unidades) || 0,
          monto_usd: Number(row.monto_usd) || 0,
          estado: row.estado || 'Completado',
          notas: row.notas || '',
        }));
        return { entries: mapped, fromSupabase: true };
      } else if (data && data.length === 0) {
        return { entries: [], fromSupabase: true };
      }
    } catch (err: unknown) {
      console.warn('Excepción al consultar el_perchero_bitacora:', err);
    }
  }

  return { entries: getLocalBitacora(), fromSupabase: false };
};

export const createBitacoraEntry = async (payload: {
  tipo_evento: BitacoraEntry['tipo_evento'];
  cliente: string;
  producto: string;
  cantidad_unidades: number;
  monto_usd: number;
  estado?: BitacoraEntry['estado'];
  notas?: string;
}): Promise<{ success: boolean; id: string; savedInSupabase: boolean }> => {
  const newId = 'bit-' + Date.now();
  const newEntry: BitacoraEntry = {
    id: newId,
    created_at: new Date().toISOString(),
    tipo_evento: payload.tipo_evento,
    cliente: payload.cliente,
    producto: payload.producto,
    cantidad_unidades: payload.cantidad_unidades,
    monto_usd: payload.monto_usd,
    estado: payload.estado || 'Completado',
    notas: payload.notas || '',
  };

  // Save to local storage
  saveLocalBitacoraEntry(newEntry);

  let savedInSupabase = false;

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      const { error } = await client.from('el_perchero_bitacora').insert([
        {
          tipo_evento: newEntry.tipo_evento,
          cliente: newEntry.cliente,
          producto: newEntry.producto,
          cantidad_unidades: newEntry.cantidad_unidades,
          monto_usd: newEntry.monto_usd,
          estado: newEntry.estado,
          notas: newEntry.notas,
        },
      ]);

      if (!error) {
        savedInSupabase = true;
      } else {
        console.warn('Aviso: no se pudo insertar en el_perchero_bitacora:', error.message);
      }
    } catch (err) {
      console.warn('Excepción en createBitacoraEntry:', err);
    }
  }

  return { success: true, id: newId, savedInSupabase };
};

export const deleteBitacoraEntry = async (id: string): Promise<boolean> => {
  const current = getLocalBitacora();
  const updated = current.filter((b) => b.id !== id);
  localStorage.setItem(LOCAL_STORAGE_BITACORA, JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    try {
      const client = getSupabaseClient();
      await client.from('el_perchero_bitacora').delete().eq('id', id);
    } catch (err) {
      console.warn('Error eliminando entrada de bitácora en Supabase:', err);
    }
  }

  return true;
};
