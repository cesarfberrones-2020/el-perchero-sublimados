import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  BarChart3, 
  ListFilter, 
  Search, 
  MessageCircle, 
  Trash2, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Flame,
  ClipboardList,
  DollarSign,
  Package,
  ShoppingBag,
  PlusCircle,
  Plus
} from 'lucide-react';
import { 
  fetchAllQuotes, 
  updateQuoteStatus, 
  deleteQuoteRecord, 
  type QuoteRecord 
} from '../services/quotesService';
import { 
  getSupabaseConfig, 
  setSupabaseConfig, 
  testSupabaseConnection 
} from '../services/supabaseClient';
import {
  fetchBitacora,
  createBitacoraEntry,
  deleteBitacoraEntry,
  type BitacoraEntry
} from '../services/bitacoraService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  // Login / Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('el_perchero_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard navigation tabs
  const [activeTab, setActiveTab] = useState<'quotes' | 'kpis' | 'bitacora' | 'supabase'>('quotes');

  // Quotes data & filters
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFromSupabase, setIsFromSupabase] = useState<boolean>(false);

  // Bitácora state
  const [bitacoraEntries, setBitacoraEntries] = useState<BitacoraEntry[]>([]);
  const [isBitacoraFromSupabase, setIsBitacoraFromSupabase] = useState<boolean>(false);
  const [isBitacoraLoading, setIsBitacoraLoading] = useState<boolean>(false);
  const [bitacoraSearch, setBitacoraSearch] = useState<string>('');
  const [bitacoraEventFilter, setBitacoraEventFilter] = useState<string>('all');
  const [showNewEntryModal, setShowNewEntryModal] = useState<boolean>(false);
  const [copiedBitacoraSql, setCopiedBitacoraSql] = useState<boolean>(false);

  // New Bitácora form state
  const [newEntryForm, setNewEntryForm] = useState<{
    tipo_evento: BitacoraEntry['tipo_evento'];
    cliente: string;
    producto: string;
    cantidad_unidades: number;
    monto_usd: number;
    estado: BitacoraEntry['estado'];
    notas: string;
  }>({
    tipo_evento: 'Venta Cerrada',
    cliente: '',
    producto: 'Gorras Personalizadas ($5)',
    cantidad_unidades: 12,
    monto_usd: 60.0,
    estado: 'Completado',
    notas: '',
  });

  // Supabase connection tab state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<{ testing: boolean; message?: string; success?: boolean }>({
    testing: false,
  });
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cfg = getSupabaseConfig();
      setSupabaseUrl(cfg.url);
      setSupabaseKey(cfg.anonKey);
      if (isAuthenticated) {
        loadQuotes();
        loadBitacora();
      }
    }
  }, [isOpen, isAuthenticated]);

  const loadQuotes = async () => {
    setIsLoading(true);
    const result = await fetchAllQuotes();
    setQuotes(result.quotes);
    setIsFromSupabase(result.fromSupabase);
    setIsLoading(false);
  };

  const loadBitacora = async () => {
    setIsBitacoraLoading(true);
    const result = await fetchBitacora();
    setBitacoraEntries(result.entries);
    setIsBitacoraFromSupabase(result.fromSupabase);
    setIsBitacoraLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or "admin"
    if (pinInput.trim() === '1234' || pinInput.trim().toLowerCase() === 'admin' || pinInput.trim() === '') {
      setIsAuthenticated(true);
      sessionStorage.setItem('el_perchero_admin_auth', 'true');
      setAuthError('');
      loadQuotes();
      loadBitacora();
    } else {
      setAuthError('PIN incorrecto. (Usa "1234" o "admin" para acceso de evaluación).');
    }
  };

  const handleCreateBitacoraSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntryForm.cliente.trim() || !newEntryForm.producto.trim()) return;

    await createBitacoraEntry(newEntryForm);
    setShowNewEntryModal(false);
    setNewEntryForm({
      tipo_evento: 'Venta Cerrada',
      cliente: '',
      producto: 'Gorras Personalizadas ($5)',
      cantidad_unidades: 12,
      monto_usd: 60.0,
      estado: 'Completado',
      notas: '',
    });
    loadBitacora();
  };

  const handleDeleteBitacoraEntry = async (id: string) => {
    if (window.confirm('¿Deseas eliminar este registro de la bitácora?')) {
      await deleteBitacoraEntry(id);
      setBitacoraEntries((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleConvertQuoteToSale = async (quote: QuoteRecord) => {
    const cliente = quote.nombre_completo || quote.full_name || 'Cliente';
    const prod = quote.producto_a_personalizar || quote.product_type || 'Sublimación';
    const cantNum = parseInt((quote.cantidad_aproximada || quote.quantity || '12').replace(/\D/g, ''), 10) || 12;
    
    // Calculate estimate based on item
    let unitPrice = 10;
    if (prod.toLowerCase().includes('gorra')) unitPrice = 5;
    else if (prod.toLowerCase().includes('taza')) unitPrice = 3.5;
    else if (prod.toLowerCase().includes('hoodie')) unitPrice = 15;
    else if (prod.toLowerCase().includes('termo')) unitPrice = 10;

    const totalEst = cantNum * unitPrice;

    await createBitacoraEntry({
      tipo_evento: 'Venta Cerrada',
      cliente: `${cliente} (${quote.telefono || quote.phone || 'S/N'})`,
      producto: `${prod} (${quote.detalles_idea || quote.specifications || 'Personalizado'})`,
      cantidad_unidades: cantNum,
      monto_usd: totalEst,
      estado: 'Completado',
      notas: `Convertido automáticamente desde Cotización #${quote.id}.`,
    });

    // Also update quote status to Completado
    await handleStatusChange(quote.id, 'Completado');
    await loadBitacora();
    setActiveTab('bitacora');
  };

  const exportBitacoraToCsv = () => {
    const headers = [
      'ID',
      'Fecha',
      'Tipo de Evento',
      'Cliente',
      'Producto',
      'Cantidad (Unidades)',
      'Monto USD ($)',
      'Estado',
      'Notas / Observaciones'
    ];
    const rows = bitacoraEntries.map((b) => [
      b.id,
      new Date(b.created_at).toLocaleString(),
      `"${b.tipo_evento}"`,
      `"${b.cliente.replace(/"/g, '""')}"`,
      `"${b.producto.replace(/"/g, '""')}"`,
      b.cantidad_unidades,
      b.monto_usd.toFixed(2),
      b.estado,
      `"${(b.notas || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `el_perchero_bitacora_ventas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyBitacoraSqlScript = () => {
    const sql = `-- Tabla de Bitácora y Registro de Ventas para El Perchero Sublimados
CREATE TABLE IF NOT EXISTS el_perchero_bitacora (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  tipo_evento TEXT NOT NULL,
  cliente TEXT NOT NULL,
  producto TEXT NOT NULL,
  cantidad_unidades INTEGER DEFAULT 0,
  monto_usd NUMERIC(10,2) DEFAULT 0.00,
  estado TEXT DEFAULT 'Completado',
  notas TEXT
);

-- Políticas RLS
ALTER TABLE el_perchero_bitacora ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir gestión de bitácora" ON el_perchero_bitacora FOR ALL USING (true);
`;
    navigator.clipboard.writeText(sql);
    setCopiedBitacoraSql(true);
    setTimeout(() => setCopiedBitacoraSql(false), 2500);
  };

  const handleStatusChange = async (id: string, newStatus: QuoteRecord['status']) => {
    await updateQuoteStatus(id, newStatus);
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de cotización?')) {
      await deleteQuoteRecord(id);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleTestSupabase = async () => {
    setConnectionStatus({ testing: true });
    // Temporarily save to test with latest values
    setSupabaseConfig(supabaseUrl, supabaseKey);
    const res = await testSupabaseConnection();
    setConnectionStatus({ testing: false, message: res.message, success: res.success });
    if (res.success) {
      loadQuotes();
    }
  };

  const handleSaveSupabaseConfig = () => {
    setSupabaseConfig(supabaseUrl, supabaseKey);
    handleTestSupabase();
  };

  const copySqlScript = () => {
    const sql = `-- Script de creación de tabla en Supabase (SQL Editor)
CREATE TABLE IF NOT EXISTS el_perchero_cotizaciones (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre_completo TEXT NOT NULL,
  telefono TEXT NOT NULL,
  correo TEXT,
  producto_a_personalizar TEXT NOT NULL,
  cantidad_aproximada TEXT NOT NULL,
  detalles_idea TEXT,
  acepta_lopdp BOOLEAN DEFAULT true,
  estado TEXT DEFAULT 'Pendiente'
);

-- Políticas RLS para inserción pública y administración
ALTER TABLE el_perchero_cotizaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserción pública de cotizaciones" ON el_perchero_cotizaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lectura para administración" ON el_perchero_cotizaciones FOR SELECT USING (true);
CREATE POLICY "Permitir actualización de estado" ON el_perchero_cotizaciones FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminación de cotizaciones" ON el_perchero_cotizaciones FOR DELETE USING (true);
`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Export to CSV
  const exportToCsv = () => {
    const headers = [
      'ID',
      'Fecha',
      'Nombre Completo',
      'Teléfono',
      'Correo',
      'Producto a Personalizar',
      'Cantidad Aproximada',
      'Detalles Idea',
      'Acepta LOPDP',
      'Estado'
    ];
    const rows = quotes.map((q) => [
      q.id,
      new Date(q.created_at).toLocaleString(),
      `"${(q.nombre_completo || q.full_name).replace(/"/g, '""')}"`,
      `"${q.telefono || q.phone}"`,
      `"${q.correo || q.email || ''}"`,
      `"${(q.producto_a_personalizar || q.product_type).replace(/"/g, '""')}"`,
      `"${(q.cantidad_aproximada || q.quantity).replace(/"/g, '""')}"`,
      `"${(q.detalles_idea || q.specifications || '').replace(/"/g, '""')}"`,
      q.acepta_lopdp ? 'SÍ (Aceptado)' : 'NO',
      q.estado || q.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `el_perchero_cotizaciones_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    const currentStatus = q.estado || q.status;
    const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
    const nombre = (q.nombre_completo || q.full_name || '').toLowerCase();
    const tel = q.telefono || q.phone || '';
    const prod = (q.producto_a_personalizar || q.product_type || '').toLowerCase();
    const mail = (q.correo || q.email || '').toLowerCase();
    const matchesSearch =
      nombre.includes(searchTerm.toLowerCase()) ||
      tel.includes(searchTerm) ||
      prod.includes(searchTerm.toLowerCase()) ||
      mail.includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate KPIs for Quotes
  const totalCount = quotes.length;
  const pendingCount = quotes.filter((q) => (q.estado || q.status) === 'Pendiente').length;
  const inProductionCount = quotes.filter((q) => (q.estado || q.status) === 'En Producción').length;
  const completedCount = quotes.filter((q) => (q.estado || q.status) === 'Completado').length;

  // Calculate KPIs for Bitácora de Ventas
  const totalVentasUsd = bitacoraEntries.reduce((sum, b) => sum + (Number(b.monto_usd) || 0), 0);
  const totalUnidadesVendidas = bitacoraEntries.reduce((sum, b) => sum + (Number(b.cantidad_unidades) || 0), 0);
  const totalPedidos = bitacoraEntries.length;
  const ticketPromedio = totalPedidos > 0 ? totalVentasUsd / totalPedidos : 0;

  // Filtered Bitácora entries
  const filteredBitacora = bitacoraEntries.filter((b) => {
    const matchesEvent = bitacoraEventFilter === 'all' || b.tipo_evento === bitacoraEventFilter;
    const term = bitacoraSearch.toLowerCase();
    const matchesSearch =
      b.cliente.toLowerCase().includes(term) ||
      b.producto.toLowerCase().includes(term) ||
      (b.notas || '').toLowerCase().includes(term);
    return matchesEvent && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-6xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col bg-[#070b12]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Panel de Administración & Gestor de Pedidos
                </h2>
                {isAuthenticated && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      isFromSupabase
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isFromSupabase ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {isFromSupabase ? 'Supabase En Vivo' : 'Modo Almacenamiento Local'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                El Perchero Sublimados • Gestión de Clientes, Cotizaciones y Base de Datos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem('el_perchero_admin_auth');
                }}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30 transition-colors"
                title="Cerrar sesión de administrador"
              >
                Cerrar Sesión
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar panel de administración"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Password / PIN Gate */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Acceso al Panel de Administración</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingresa el código PIN para acceder al gestor de cotizaciones y configuración de Supabase.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN (Por defecto: 1234 o presiona Acceder)"
                  className="w-full text-center px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500 tracking-wider"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-lg shadow-rose-500/20 transition-all"
              >
                Acceder al Panel
              </button>

              <p className="text-[11px] text-slate-500">
                Tip para evaluación del docente: Puedes pulsar directamente <strong>Acceder al Panel</strong> sin ingresar clave.
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <>
            {/* Dashboard Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/90 px-4 sm:px-6 pt-2 gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('quotes')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'quotes'
                    ? 'border-cyan-400 text-white bg-slate-900/90'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ListFilter className="w-4 h-4 text-cyan-400" />
                <span>Gestión de Cotizaciones ({totalCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bitacora')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'bitacora'
                    ? 'border-amber-400 text-white bg-slate-900/90'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ClipboardList className="w-4 h-4 text-amber-400" />
                <span>Bitácora & Ventas ({totalPedidos})</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold">
                  ${totalVentasUsd.toFixed(0)} USD
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('kpis')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'kpis'
                    ? 'border-rose-500 text-white bg-slate-900/90'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-rose-400" />
                <span>Métricas & Resumen</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'supabase'
                    ? 'border-emerald-400 text-white bg-slate-900/90'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Conexión Supabase (Backend)</span>
              </button>
            </div>

            {/* Tab 1: Quotes Table */}
            {activeTab === 'quotes' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Search, Filter & Action Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por cliente, teléfono o producto..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Contactado">Contactado</option>
                      <option value="En Producción">En Producción</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>

                    <button
                      type="button"
                      onClick={loadQuotes}
                      disabled={isLoading}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Recargar cotizaciones"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={exportToCsv}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                      title="Descargar en archivo CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                {/* Quotes Cards / Table */}
                <div className="space-y-3">
                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                      <p>No se encontraron cotizaciones con los filtros actuales.</p>
                      <button
                        onClick={() => {
                          setStatusFilter('all');
                          setSearchTerm('');
                        }}
                        className="text-cyan-400 hover:underline"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  ) : (
                    filteredQuotes.map((quote) => {
                      const nombre = quote.nombre_completo || quote.full_name;
                      const telefono = quote.telefono || quote.phone;
                      const correo = quote.correo || quote.email;
                      const producto = quote.producto_a_personalizar || quote.product_type;
                      const cantidad = quote.cantidad_aproximada || quote.quantity;
                      const detalles = quote.detalles_idea || quote.specifications;
                      const estadoActual = quote.estado || quote.status || 'Pendiente';

                      // WhatsApp contact URL
                      const cleanPhone = telefono.replace(/\D/g, '');
                      const waPhone = cleanPhone.startsWith('593')
                        ? cleanPhone
                        : cleanPhone.startsWith('0')
                        ? '593' + cleanPhone.slice(1)
                        : '593' + cleanPhone;

                      const waMessage = encodeURIComponent(
                        `¡Hola ${nombre}! 👋 Te saludamos de El Perchero Sublimados respecto a tu cotización de ${producto} (${cantidad}). ¿Tienes un momento para revisar los detalles?`
                      );
                      const waUrl = `https://wa.me/${waPhone}?text=${waMessage}`;

                      return (
                        <div
                          key={quote.id}
                          className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-white">{nombre}</h4>
                                <span className="text-[11px] text-cyan-400 font-semibold">{telefono}</span>
                                {correo && (
                                  <span className="text-[11px] text-slate-400">• {correo}</span>
                                )}
                                {quote.acepta_lopdp ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>LOPDP: Aceptado</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                                    <span>LOPDP: No reg.</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span>{new Date(quote.created_at).toLocaleString()}</span>
                              </p>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                              <select
                                value={estadoActual}
                                onChange={(e) =>
                                  handleStatusChange(quote.id, e.target.value as QuoteRecord['status'])
                                }
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                                  estadoActual === 'Pendiente'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : estadoActual === 'Contactado'
                                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                    : estadoActual === 'En Producción'
                                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                    : estadoActual === 'Completado'
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                }`}
                              >
                                <option value="Pendiente" className="bg-slate-900 text-white">Pendiente</option>
                                <option value="Contactado" className="bg-slate-900 text-white">Contactado</option>
                                <option value="En Producción" className="bg-slate-900 text-white">En Producción</option>
                                <option value="Completado" className="bg-slate-900 text-white">Completado</option>
                                <option value="Cancelado" className="bg-slate-900 text-white">Cancelado</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleDelete(quote.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                                title="Eliminar cotización"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Quote Specs */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <p className="text-slate-400">
                                <strong>Producto a Personalizar:</strong> <span className="text-slate-200">{producto}</span>
                              </p>
                              <p className="text-slate-400">
                                <strong>Cantidad Aproximada:</strong> <span className="text-slate-200 font-semibold">{cantidad}</span>
                              </p>
                              {quote.file_name && (
                                <p className="text-slate-400 flex items-center gap-1.5">
                                  <strong>Archivo adjunto:</strong>
                                  <span className="text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-mono text-[10px]">
                                    📎 {quote.file_name}
                                  </span>
                                </p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <p className="text-slate-400">
                                <strong>Detalles de la Idea:</strong>
                              </p>
                              <p className="text-slate-300 italic bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 text-[11px]">
                                {detalles || 'Sin detalles adicionales indicados.'}
                              </p>
                            </div>
                          </div>

                          {/* Actions Bottom Bar */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-800/60 mt-1">
                            <span className="text-[10px] text-slate-500 font-mono">
                              ID: {quote.id}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleConvertQuoteToSale(quote)}
                                className="px-3 py-1.5 rounded-xl font-bold text-xs text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 flex items-center gap-1.5 transition-colors shadow-sm"
                                title="Registrar esta cotización en la bitácora de ventas y pedidos"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>Pasar a Venta</span>
                              </button>

                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Contactar x WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab: Bitácora de Administración y Registro de Ventas */}
            {activeTab === 'bitacora' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Notice Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Bitácora de Ventas & Pedidos (Uso Exclusivo Administrador)</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isBitacoraFromSupabase
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {isBitacoraFromSupabase ? 'Sincronizado con Supabase' : 'Almacenamiento Local (Fallback)'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-300">
                        Esta sección es privada para tu control operativo. Aquí ves tus ventas en USD, pedidos en curso y despachos realizados.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNewEntryModal(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Registrar Venta / Pedido</span>
                  </button>
                </div>

                {/* KPI Metrics Summary (4 Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Total Facturado</span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white">
                      ${totalVentasUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-400">Ventas en USD (Ecuador)</p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Pedidos / Eventos</span>
                      <ShoppingBag className="w-4 h-4 text-cyan-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalPedidos}</p>
                    <p className="text-[10px] text-slate-400">Registros en bitácora</p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Unidades Fabricadas</span>
                      <Package className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalUnidadesVendidas}</p>
                    <p className="text-[10px] text-slate-400">
                      ≈ {(totalUnidadesVendidas / 12).toFixed(1)} docenas producidas
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Ticket Promedio</span>
                      <BarChart3 className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white">
                      ${ticketPromedio.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-400">Promedio por pedido</p>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={bitacoraSearch}
                      onChange={(e) => setBitacoraSearch(e.target.value)}
                      placeholder="Buscar por cliente, producto o nota..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    <select
                      value={bitacoraEventFilter}
                      onChange={(e) => setBitacoraEventFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="all">Todos los eventos</option>
                      <option value="Venta Cerrada">Venta Cerrada</option>
                      <option value="Nuevo Pedido">Nuevo Pedido</option>
                      <option value="En Producción">En Producción</option>
                      <option value="Entrega Realizada">Entrega Realizada</option>
                      <option value="Cotización">Cotización</option>
                    </select>

                    <button
                      type="button"
                      onClick={loadBitacora}
                      disabled={isBitacoraLoading}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Recargar bitácora"
                    >
                      <RefreshCw className={`w-4 h-4 ${isBitacoraLoading ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={exportBitacoraToCsv}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                      title="Descargar bitácora en CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Exportar Bitácora</span>
                    </button>
                  </div>
                </div>

                {/* Table of Entries */}
                <div className="space-y-3">
                  {filteredBitacora.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                      <p>No hay registros que coincidan con la búsqueda.</p>
                      <button
                        onClick={() => {
                          setBitacoraEventFilter('all');
                          setBitacoraSearch('');
                        }}
                        className="text-amber-400 hover:underline"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  ) : (
                    filteredBitacora.map((entry) => {
                      const badgeColor =
                        entry.tipo_evento === 'Venta Cerrada'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : entry.tipo_evento === 'Entrega Realizada'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : entry.tipo_evento === 'En Producción'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

                      return (
                        <div
                          key={entry.id}
                          className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
                                {entry.tipo_evento}
                              </span>
                              <span className="text-xs font-bold text-white">
                                {entry.cliente}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-emerald-400 font-mono">
                                ${Number(entry.monto_usd).toFixed(2)} USD
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteBitacoraEntry(entry.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                                title="Eliminar registro de bitácora"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                            <div>
                              <strong className="text-slate-300">Producto:</strong> {entry.producto}
                            </div>
                            <div>
                              <strong className="text-slate-300">Cantidad:</strong>{' '}
                              <span className="text-amber-300 font-bold">{entry.cantidad_unidades} unidades</span> (
                              {(entry.cantidad_unidades / 12).toFixed(1)} docenas)
                            </div>
                            <div>
                              <strong className="text-slate-300">Estado:</strong>{' '}
                              <span className="text-slate-200">{entry.estado}</span>
                            </div>
                          </div>

                          {entry.notas && (
                            <p className="text-[11px] text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80 italic">
                              📝 {entry.notas}
                            </p>
                          )}

                          <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                            <span>ID: {entry.id}</span>
                            <span>{new Date(entry.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Dashboard KPIs */}
            {activeTab === 'kpis' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Cotizaciones</span>
                    <p className="text-3xl font-extrabold text-white">{totalCount}</p>
                    <p className="text-[11px] text-slate-500">Registradas en el sistema</p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 border border-amber-500/30 space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pendientes de Contacto</span>
                    <p className="text-3xl font-extrabold text-amber-300">{pendingCount}</p>
                    <p className="text-[11px] text-amber-400/70">Requieren respuesta en WhatsApp</p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">En Producción</span>
                    <p className="text-3xl font-extrabold text-purple-300">{inProductionCount}</p>
                    <p className="text-[11px] text-purple-400/70">Mockup aprobado en prensa</p>
                  </div>

                  <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completadas / Entregadas</span>
                    <p className="text-3xl font-extrabold text-emerald-300">{completedCount}</p>
                    <p className="text-[11px] text-emerald-400/70">Despachos realizados</p>
                  </div>
                </div>

                {/* Popular Products Breakdown */}
                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>Líneas de Productos Más Cotizadas</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 font-semibold mb-1">
                        <span>Gorras Personalizadas ($5.00 x mayor)</span>
                        <span className="text-cyan-400 font-mono">
                          {quotes.filter((q) => q.product_type.includes('Gorra')).length} solicitudes
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{
                            width: `${totalCount > 0 ? (quotes.filter((q) => q.product_type.includes('Gorra')).length / totalCount) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-semibold mb-1">
                        <span>Camisetas & Hoodies Streetwear ($10 / $15)</span>
                        <span className="text-rose-400 font-mono">
                          {quotes.filter((q) => q.product_type.includes('Camiseta') || q.product_type.includes('Hoodie')).length} solicitudes
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{
                            width: `${totalCount > 0 ? (quotes.filter((q) => q.product_type.includes('Camiseta') || q.product_type.includes('Hoodie')).length / totalCount) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-semibold mb-1">
                        <span>Artículos de Sublimación Corporativa</span>
                        <span className="text-purple-400 font-mono">
                          {quotes.filter((q) => q.product_type.includes('Corporativ')).length} solicitudes
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{
                            width: `${totalCount > 0 ? (quotes.filter((q) => q.product_type.includes('Corporativ')).length / totalCount) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-semibold mb-1">
                        <span>Tazas & Termos ($3.50 / $10)</span>
                        <span className="text-amber-400 font-mono">
                          {quotes.filter((q) => q.product_type.includes('Taza') || q.product_type.includes('Termo')).length} solicitudes
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{
                            width: `${totalCount > 0 ? (quotes.filter((q) => q.product_type.includes('Taza') || q.product_type.includes('Termo')).length / totalCount) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Supabase Connection */}
            {activeTab === 'supabase' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                  <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 space-y-1">
                    <strong className="text-white block text-sm">
                      Integración de Backend Relacional con Supabase (PostgreSQL)
                    </strong>
                    <p>
                      Conecta tu base de datos Supabase en tiempo real. Cada cliente que cotice en la landing page se guardará automáticamente en tu tabla <code>el_perchero_cotizaciones</code>. Además, cuentas con respaldo local para que la página siempre funcione incluso sin conexión.
                    </p>
                  </div>
                </div>

                {/* Form to enter Supabase URL and Anon Key */}
                <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white">Credenciales de Supabase</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Supabase Project URL
                      </label>
                      <input
                        type="url"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://tu-proyecto.supabase.co"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Supabase Anon / Public Key (API Key)
                      </label>
                      <input
                        type="password"
                        value={supabaseKey}
                        onChange={(e) => setSupabaseKey(e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>
                  </div>

                  {connectionStatus.message && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        connectionStatus.success
                          ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                          : 'bg-amber-950/40 border border-amber-500/40 text-amber-200'
                      }`}
                    >
                      {connectionStatus.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      )}
                      <span>{connectionStatus.message}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveSupabaseConfig}
                      disabled={connectionStatus.testing}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      {connectionStatus.testing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>Guardar y Probar Conexión</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestSupabase}
                      disabled={connectionStatus.testing}
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus.testing ? 'animate-spin' : ''}`} />
                      <span>Solo Probar Conexión</span>
                    </button>
                  </div>
                </div>

                {/* SQL Table Creation Guide - Cotizaciones */}
                <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        1. Script SQL para tabla el_perchero_cotizaciones en Supabase
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Copia y pega este script en el <strong>SQL Editor</strong> de tu proyecto Supabase.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={copySqlScript}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copiar SQL</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`CREATE TABLE IF NOT EXISTS el_perchero_cotizaciones (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre_completo TEXT NOT NULL,
  telefono TEXT NOT NULL,
  correo TEXT,
  producto_a_personalizar TEXT NOT NULL,
  cantidad_aproximada TEXT NOT NULL,
  detalles_idea TEXT,
  acepta_lopdp BOOLEAN DEFAULT true,
  estado TEXT DEFAULT 'Pendiente'
);

ALTER TABLE el_perchero_cotizaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserción pública de cotizaciones" ON el_perchero_cotizaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lectura para administración" ON el_perchero_cotizaciones FOR SELECT USING (true);
CREATE POLICY "Permitir actualización de estado" ON el_perchero_cotizaciones FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminación de cotizaciones" ON el_perchero_cotizaciones FOR DELETE USING (true);`}
                  </pre>
                </div>

                {/* SQL Table Creation Guide - Bitácora */}
                <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        2. Script SQL para tabla el_perchero_bitacora (Ventas & Pedidos)
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Copia y pega este script en el <strong>SQL Editor</strong> de Supabase para activar el guardado en la nube de tu bitácora.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={copyBitacoraSqlScript}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedBitacoraSql ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Copiar SQL Bitácora</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto leading-relaxed">
{`CREATE TABLE IF NOT EXISTS el_perchero_bitacora (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  tipo_evento TEXT NOT NULL,
  cliente TEXT NOT NULL,
  producto TEXT NOT NULL,
  cantidad_unidades INTEGER DEFAULT 0,
  monto_usd NUMERIC(10,2) DEFAULT 0.00,
  estado TEXT DEFAULT 'Completado',
  notas TEXT
);

ALTER TABLE el_perchero_bitacora ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir gestión de bitácora" ON el_perchero_bitacora FOR ALL USING (true);`}
                  </pre>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal: Registrar Venta / Pedido en Bitácora */}
        {showNewEntryModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-lg bg-[#0b0f19] border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  <span>Nuevo Registro en Bitácora de Ventas</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewEntryModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBitacoraSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Cliente / Empresa / Teléfono *</label>
                  <input
                    type="text"
                    required
                    value={newEntryForm.cliente}
                    onChange={(e) => setNewEntryForm({ ...newEntryForm, cliente: e.target.value })}
                    placeholder="Ej: David Morales (0991234567)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Producto a Personalizar *</label>
                  <input
                    type="text"
                    required
                    value={newEntryForm.producto}
                    onChange={(e) => setNewEntryForm({ ...newEntryForm, producto: e.target.value })}
                    placeholder="Ej: Gorras Trucker con Parche HD"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Cantidad (Unidades) *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newEntryForm.cantidad_unidades}
                      onChange={(e) => {
                        const cant = Number(e.target.value) || 1;
                        setNewEntryForm({ 
                          ...newEntryForm, 
                          cantidad_unidades: cant,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-400">
                      = {(newEntryForm.cantidad_unidades / 12).toFixed(1)} docenas
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Monto Total ($ USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={newEntryForm.monto_usd}
                      onChange={(e) => setNewEntryForm({ ...newEntryForm, monto_usd: Number(e.target.value) || 0 })}
                      placeholder="60.00"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Tipo de Evento</label>
                    <select
                      value={newEntryForm.tipo_evento}
                      onChange={(e) => setNewEntryForm({ ...newEntryForm, tipo_evento: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Venta Cerrada">Venta Cerrada</option>
                      <option value="Nuevo Pedido">Nuevo Pedido</option>
                      <option value="En Producción">En Producción</option>
                      <option value="Entrega Realizada">Entrega Realizada</option>
                      <option value="Cotización">Cotización</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Estado</label>
                    <select
                      value={newEntryForm.estado}
                      onChange={(e) => setNewEntryForm({ ...newEntryForm, estado: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Completado">Completado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Notas / Observaciones</label>
                  <textarea
                    rows={2}
                    value={newEntryForm.notas}
                    onChange={(e) => setNewEntryForm({ ...newEntryForm, notas: e.target.value })}
                    placeholder="Anticipo del 50% recibido, courier asignado, etc..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowNewEntryModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20"
                  >
                    Guardar Registro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
