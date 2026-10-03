import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Activity, 
  RefreshCw, 
  ExternalLink, 
  Database, 
  Send 
} from 'lucide-react';
import { 
  getApifyToken, 
  setLocalApifyToken, 
  testApifyConnection, 
  sendLeadToApify 
} from '../services/apifyService';

interface ApifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApifyIntegrationModal: React.FC<ApifyModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [userInfo, setUserInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [testLeadStatus, setTestLeadStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      const currentToken = getApifyToken();
      setToken(currentToken);
      if (currentToken) {
        verifyToken(currentToken);
      }
    }
  }, [isOpen]);

  const verifyToken = async (tokenToTest: string) => {
    if (!tokenToTest.trim()) {
      setStatus('idle');
      return;
    }

    setStatus('testing');
    setErrorMessage('');
    
    const result = await testApifyConnection(tokenToTest);
    if (result.valid) {
      setStatus('connected');
      setUserInfo(result.user || 'Cuenta conectada');
      setLocalApifyToken(tokenToTest);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'No se pudo conectar a Apify');
    }
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    verifyToken(token);
  };

  const handleSendTestLead = async () => {
    setTestLeadStatus('Enviando lead de prueba a Apify...');
    const result = await sendLeadToApify({
      fullName: 'Cliente de Prueba (El Perchero)',
      phone: '+57 300 000 0000',
      email: 'test@elperchero.com',
      productType: 'Camisetas & Joggers (Streetwear y Alta Pinta)',
      quantity: '25 unidades',
      specifications: 'Prueba de integración de leads con Apify Dataset',
      source: 'test_modal_apify',
      createdAt: new Date().toISOString(),
    });

    if (result.success) {
      setTestLeadStatus(`¡Éxito! Lead registrado en Apify (Run/Dataset ID: ${result.runId})`);
    } else {
      setTestLeadStatus(`Error al enviar: ${result.error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Conexión con Apify
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Integración API
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Conecta tu cuenta de Apify para automatizar leads o sincronizar datos.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
          status === 'connected'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : status === 'error'
            ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            : status === 'testing'
            ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            {status === 'connected' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {status === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {status === 'testing' && <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />}
            {status === 'idle' && <Database className="w-4 h-4 text-slate-500" />}
            
            <span>
              {status === 'connected' && `Conectado a Apify (${userInfo})`}
              {status === 'error' && (errorMessage || 'Error de conexión')}
              {status === 'testing' && 'Verificando credencial en Apify...'}
              {status === 'idle' && 'No hay token activo o configurado'}
            </span>
          </div>

          <a
            href="https://console.apify.com/account/integrations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] underline hover:text-white"
          >
            <span>Obtener Token</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Token Form */}
        <form onSubmit={handleSaveToken} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Apify API Token (Personal API Token)
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="apify_api_..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full min-h-[46px] px-4 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              También puedes configurarlo permanentemente en tu archivo <code className="text-cyan-400 font-mono">.env</code> como <code className="text-cyan-400 font-mono">VITE_APIFY_API_TOKEN</code>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === 'testing'}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              {status === 'testing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Validando...</span>
                </>
              ) : (
                <span>Guardar y Probar Conexión</span>
              )}
            </button>
          </div>
        </form>

        {/* Test Section */}
        {status === 'connected' && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Acciones de Prueba con Apify:
            </h3>

            <button
              type="button"
              onClick={handleSendTestLead}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Cotización de Prueba a Apify Dataset</span>
            </button>

            {testLeadStatus && (
              <p className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                {testLeadStatus}
              </p>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  );
};
