/**
 * Apify REST API Service
 * Official API v2 Client for Browser / Frontend Integration
 * Documentation: https://docs.apify.com/api/v2
 */

export interface ApifyLeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  productType: string;
  quantity: string;
  specifications: string;
  source: string;
  createdAt: string;
}

const APIFY_BASE_URL = 'https://api.apify.com/v2';

// Get API token from Vite environment or local storage
export const getApifyToken = (): string => {
  return import.meta.env.VITE_APIFY_API_TOKEN || localStorage.getItem('apify_token') || '';
};

export const setLocalApifyToken = (token: string): void => {
  if (token) {
    localStorage.setItem('apify_token', token.trim());
  } else {
    localStorage.removeItem('apify_token');
  }
};

/**
 * Test Apify token connection and fetch account details
 */
export const testApifyConnection = async (
  tokenToTest?: string
): Promise<{ valid: boolean; user?: string; error?: string }> => {
  const token = (tokenToTest || getApifyToken()).trim();
  if (!token) {
    return { valid: false, error: 'Por favor ingresa un API Token de Apify' };
  }

  try {
    const res = await fetch(`${APIFY_BASE_URL}/users/me?token=${encodeURIComponent(token)}`);
    if (!res.ok) {
      if (res.status === 401) {
        return { valid: false, error: 'Token inválido o sin permisos suficientes' };
      }
      return { valid: false, error: `Error del servidor Apify (Código: ${res.status})` };
    }

    const data = await res.json();
    const user = data.data?.username || data.data?.email || 'Usuario Apify';
    return { valid: true, user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error de red al conectar con Apify';
    return { valid: false, error: msg };
  }
};

/**
 * Sends a lead / quotation to an Apify Actor, Task or Dataset
 */
export const sendLeadToApify = async (
  payload: ApifyLeadPayload,
  actorOrTaskId?: string
): Promise<{ success: boolean; runId?: string; error?: string }> => {
  const token = getApifyToken().trim();
  const targetId = (actorOrTaskId || import.meta.env.VITE_APIFY_ACTOR_ID || '').trim();

  // If no token is provided, log simulated success so frontend doesn't break
  if (!token) {
    console.info('[Apify Mode]: Modo demostración local (sin token configurado). Para sincronización real, configura tu token de Apify.');
    return {
      success: true,
      runId: 'demo_simulated_id_' + Date.now(),
    };
  }

  try {
    if (targetId) {
      // Trigger specific Actor or Task run with the payload
      const endpoint = targetId.includes('/')
        ? `${APIFY_BASE_URL}/acts/${encodeURIComponent(targetId)}/runs?token=${encodeURIComponent(token)}`
        : `${APIFY_BASE_URL}/actor-tasks/${encodeURIComponent(targetId)}/runs?token=${encodeURIComponent(token)}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        return { success: false, error: `Fallo al ejecutar Actor: ${errText}` };
      }

      const json = await res.json();
      return {
        success: true,
        runId: json.data?.id,
      };
    } else {
      // Fallback: Create / Push to a default Apify Dataset for El Perchero Leads
      const createRes = await fetch(`${APIFY_BASE_URL}/datasets?token=${encodeURIComponent(token)}&name=el-perchero-leads`, {
        method: 'POST',
      });

      let datasetId = 'default';
      if (createRes.ok) {
        const createdData = await createRes.json();
        datasetId = createdData.data?.id || datasetId;
      }

      const pushRes = await fetch(`${APIFY_BASE_URL}/datasets/${encodeURIComponent(datasetId)}/items?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([payload]),
      });

      if (!pushRes.ok) {
        const pushErr = await pushRes.text();
        return { success: false, error: `Error guardando en dataset: ${pushErr}` };
      }

      return {
        success: true,
        runId: datasetId,
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error inesperado al conectar con Apify';
    console.error('[Apify API Error]', errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
};

/**
 * Fetch scraped items from an Apify Dataset
 */
export const fetchApifyDatasetItems = async <T = unknown>(
  datasetId: string,
  limit = 20
): Promise<T[]> => {
  const token = getApifyToken().trim();
  if (!token) return [];

  try {
    const res = await fetch(
      `${APIFY_BASE_URL}/datasets/${encodeURIComponent(datasetId)}/items?token=${encodeURIComponent(token)}&limit=${limit}`
    );
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch (err) {
    console.error('[Apify Dataset Error]', err);
    return [];
  }
};
