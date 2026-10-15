import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'el_perchero_supabase_url';
const STORAGE_KEY_KEY = 'el_perchero_supabase_anon_key';

// Official Supabase credentials for El Perchero Sublimados
export const OFFICIAL_SUPABASE_URL = 'https://ieepblxrqzbthapkngje.supabase.co';
export const OFFICIAL_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZXBibHhycXpidGhhcGtuZ2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNDM0OTIsImV4cCI6MjEwNjYxOTQ5Mn0.F4HXCV1MT2ZljZseiNBJa10BWuT8AL5vfuM7s99bpjE';

const DEFAULT_URL = import.meta.env.VITE_SUPABASE_URL || OFFICIAL_SUPABASE_URL;
const DEFAULT_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || OFFICIAL_SUPABASE_ANON_KEY;

export const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem(STORAGE_KEY_URL) || OFFICIAL_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem(STORAGE_KEY_KEY) || OFFICIAL_SUPABASE_ANON_KEY;
  return { url, anonKey };
};

export const setSupabaseConfig = (url: string, anonKey: string) => {
  if (url.trim()) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
  }
  if (anonKey.trim()) {
    localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_KEY);
  }
};

export const isSupabaseConfigured = (): boolean => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(
    url && 
    anonKey && 
    url.includes('supabase.co') && 
    !anonKey.includes('dummy_anon_key')
  );
};

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export const getSupabaseClient = (): SupabaseClient => {
  const { url, anonKey } = getSupabaseConfig();
  const effectiveUrl = url || DEFAULT_URL;
  const effectiveKey = anonKey || DEFAULT_ANON_KEY;

  if (cachedClient && lastUsedUrl === effectiveUrl && lastUsedKey === effectiveKey) {
    return cachedClient;
  }

  cachedClient = createClient(effectiveUrl, effectiveKey);
  lastUsedUrl = effectiveUrl;
  lastUsedKey = effectiveKey;
  return cachedClient;
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    return {
      success: false,
      message: 'Faltan credenciales de Supabase (Project URL o Anon Key).',
    };
  }

  try {
    const client = createClient(url, anonKey);
    // Attempt a light query to check authentication and table existence
    const { error } = await client.from('el_perchero_cotizaciones').select('id, nombre_completo').limit(1);
    
    if (error) {
      if (error.code === '42P01' || error.message.includes('el_perchero_cotizaciones') || error.message.includes('not found')) {
        return {
          success: true,
          message: 'Conexión exitosa a Supabase. Nota: La tabla "el_perchero_cotizaciones" aún no está creada o tiene otro nombre. Revisa el script SQL.',
        };
      }
      return {
        success: false,
        message: `Error al consultar Supabase: ${error.message} (${error.code || 'Code'})`,
      };
    }

    return {
      success: true,
      message: '¡Conexión exitosa y tabla "el_perchero_cotizaciones" detectada correctamente en Supabase!',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Error de red o conexión: ${msg}`,
    };
  }
};
