'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bug,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cloud,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileBarChart,
  Filter,
  FlaskConical,
  GitBranch,
  Globe2,
  HardDrive,
  LayoutDashboard,
  ListFilter,
  LoaderCircle,
  Menu,
  Monitor,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  X,
  XCircle,
  Zap,
} from 'lucide-react'

type View = 'dashboard' | 'catalog' | 'monitor' | 'history' | 'report'
type SuiteType = 'Web E2E' | 'API' | 'Appian' | 'Performance'
type RunStatus = 'running' | 'queued' | 'passed' | 'failed' | 'cancelled'
type Suite = {
  id: string
  name: string
  description: string
  category: SuiteType
  technology: string[]
  duration: string
  lastResult: 'passed' | 'failed'
  initials: string
  accent: string
  icon: typeof Globe2
  favorite?: boolean
}
type Execution = {
  id: string
  suiteId: string
  project: string
  environment: string
  user: string
  status: RunStatus
  duration: string
  elapsedSeconds: number
  progress: number
  stage: string
  branch: string
  suiteTag: string
  runner: string
  passed: number
  failed: number
  skipped: number
}

type NavItem = { id: View; label: string; icon: typeof LayoutDashboard }

const suites: Suite[] = [
  {
    id: 'portal-web',
    name: 'Portal Clientes Web',
    description: 'Flujos críticos de banca en línea, acceso y transferencias.',
    category: 'Web E2E',
    technology: ['Playwright', 'TypeScript'],
    duration: '8–12 min',
    lastResult: 'passed',
    initials: 'PC',
    accent: 'sky',
    icon: Globe2,
    favorite: true,
  },
  {
    id: 'api-pagos',
    name: 'API Core Pagos',
    description: 'Validación de servicios de pagos, saldos y movimientos.',
    category: 'API',
    technology: ['Karate', 'REST'],
    duration: '4–7 min',
    lastResult: 'passed',
    initials: 'AP',
    accent: 'violet',
    icon: Code2,
    favorite: true,
  },
  {
    id: 'appian-flows',
    name: 'Flujos Appian',
    description: 'Pruebas de procesos de originación y gestión de solicitudes.',
    category: 'Appian',
    technology: ['Screenplay', 'Java'],
    duration: '12–18 min',
    lastResult: 'failed',
    initials: 'FA',
    accent: 'amber',
    icon: GitBranch,
    favorite: true,
  },
  {
    id: 'checkout-load',
    name: 'Carga Checkout',
    description: 'Escenarios de concurrencia para el checkout y pagos digitales.',
    category: 'Performance',
    technology: ['JMeter', 'Load test'],
    duration: '15–20 min',
    lastResult: 'passed',
    initials: 'CC',
    accent: 'rose',
    icon: Cpu,
  },
  {
    id: 'mobile-banking',
    name: 'App Banca Móvil',
    description: 'Regresión de autenticación biométrica y consultas de cuenta.',
    category: 'Web E2E',
    technology: ['Playwright', 'Mobile'],
    duration: '10–15 min',
    lastResult: 'passed',
    initials: 'BM',
    accent: 'teal',
    icon: Monitor,
  },
  {
    id: 'api-onboarding',
    name: 'API Onboarding',
    description: 'Validación de alta de clientes y verificación de identidad.',
    category: 'API',
    technology: ['Karate', 'OAuth'],
    duration: '5–8 min',
    lastResult: 'passed',
    initials: 'AO',
    accent: 'blue',
    icon: ShieldCheck,
  },
]

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'catalog', label: 'Catálogo de Suites', icon: HardDrive },
  { id: 'monitor', label: 'Monitor en Vivo', icon: Activity },
  { id: 'history', label: 'Historial y Reportes', icon: FileBarChart },
]

const initialRuns: Execution[] = [
  {
    id: 'QA-1048',
    suiteId: 'portal-web',
    project: 'Portal Clientes Web',
    environment: 'QA',
    user: 'Jeffer Martínez',
    status: 'running',
    duration: 'En curso',
    elapsedSeconds: 286,
    progress: 68,
    stage: 'Ejecución de Pruebas',
    branch: 'main',
    suiteTag: '@regression',
    runner: 'Chromium',
    passed: 42,
    failed: 2,
    skipped: 3,
  },
  {
    id: 'QA-1047',
    suiteId: 'api-pagos',
    project: 'API Core Pagos',
    environment: 'Staging',
    user: 'Andrea Flores',
    status: 'running',
    duration: 'En curso',
    elapsedSeconds: 94,
    progress: 34,
    stage: 'Ejecución de Pruebas',
    branch: 'release/2.4',
    suiteTag: '@smoke',
    runner: 'Parallel Workers',
    passed: 18,
    failed: 0,
    skipped: 1,
  },
]

const historyRows: Execution[] = [
  {
    id: 'QA-1046', suiteId: 'appian-flows', project: 'Flujos Appian', environment: 'UAT', user: 'Jeffer Martínez', status: 'failed', duration: '14m 32s', elapsedSeconds: 0, progress: 100, stage: 'Completado', branch: 'main', suiteTag: '@critical', runner: 'Chromium', passed: 28, failed: 3, skipped: 1,
  },
  {
    id: 'QA-1045', suiteId: 'portal-web', project: 'Portal Clientes Web', environment: 'QA', user: 'Luis Pineda', status: 'passed', duration: '9m 18s', elapsedSeconds: 0, progress: 100, stage: 'Completado', branch: 'main', suiteTag: '@smoke', runner: 'WebKit', passed: 56, failed: 0, skipped: 2,
  },
  {
    id: 'QA-1044', suiteId: 'api-pagos', project: 'API Core Pagos', environment: 'Staging', user: 'Andrea Flores', status: 'passed', duration: '5m 04s', elapsedSeconds: 0, progress: 100, stage: 'Completado', branch: 'release/2.4', suiteTag: '@regression', runner: 'Parallel Workers', passed: 73, failed: 0, skipped: 0,
  },
  {
    id: 'QA-1043', suiteId: 'checkout-load', project: 'Carga Checkout', environment: 'QA', user: 'Carlos Mejía', status: 'passed', duration: '17m 21s', elapsedSeconds: 0, progress: 100, stage: 'Completado', branch: 'main', suiteTag: '@performance', runner: 'Parallel Workers', passed: 12, failed: 0, skipped: 0,
  },
]

const titleByView: Record<View, string> = {
  dashboard: 'Dashboard',
  catalog: 'Catálogo de Suites',
  monitor: 'Monitor en Vivo',
  history: 'Historial y Reportes',
  report: 'Reporte de Ejecución',
}

const statusInfo: Record<RunStatus, { label: string; className: string }> = {
  running: { label: 'En ejecución', className: 'status-running' },
  queued: { label: 'En cola', className: 'status-queued' },
  passed: { label: 'Exitoso', className: 'status-passed' },
  failed: { label: 'Fallido', className: 'status-failed' },
  cancelled: { label: 'Cancelado', className: 'status-cancelled' },
}

function StatusBadge({ status }: { status: RunStatus }) {
  const item = statusInfo[status]
  return <span className={`status-badge ${item.className}`}><span className="status-dot" />{item.label}</span>
}

function BrandMark({ small = false }: { small?: boolean }) {
  return <div className={`brand-mark ${small ? 'brand-mark-small' : ''}`} aria-hidden="true"><ShieldCheck size={small ? 19 : 23} strokeWidth={2.2} /></div>
}

function NavButton({ item, active, count, onClick }: { item: NavItem; active: boolean; count?: number; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button className={`nav-button ${active ? 'nav-button-active' : ''}`} onClick={onClick} aria-current={active ? 'page' : undefined}>
      <Icon size={18} strokeWidth={1.8} />
      <span>{item.label}</span>
      {typeof count === 'number' && <span className="nav-count">{count}</span>}
    </button>
  )
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action && onAction && <button className="text-action" onClick={onAction}>{action}<ArrowRight size={15} /></button>}
    </div>
  )
}

function SuiteGlyph({ suite }: { suite: Suite }) {
  const Icon = suite.icon
  return <div className={`suite-glyph glyph-${suite.accent}`}><Icon size={20} strokeWidth={1.8} /></div>
}

function KpiCard({ title, value, change, trend, icon: Icon, color, detail }: { title: string; value: string; change: string; trend: 'up' | 'down'; icon: typeof Activity; color: string; detail: string }) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight
  return (
    <article className="kpi-card">
      <div className="kpi-top"><span className={`kpi-icon ${color}`}><Icon size={19} /></span><button className="icon-button subtle-icon" aria-label={`Más información sobre ${title}`}><MoreHorizontal size={19} /></button></div>
      <p className="kpi-label">{title}</p>
      <div className="kpi-value-row"><strong>{value}</strong><span className={`kpi-change ${trend}`}><TrendIcon size={13} />{change}</span></div>
      <p className="kpi-detail">{detail}</p>
    </article>
  )
}

function RunTable({ rows, onReport }: { rows: Execution[]; onReport: (run: Execution) => void }) {
  return (
    <div className="table-wrap">
      <table className="runs-table">
        <thead><tr><th>Proyecto</th><th>Ambiente</th><th>Usuario</th><th>Estado</th><th>Duración</th><th><span className="sr-only">Acciones</span></th></tr></thead>
        <tbody>
          {rows.map((run) => (
            <tr key={run.id}>
              <td><div className="table-project"><span className="table-project-icon"><FlaskConical size={15} /></span><span><strong>{run.project}</strong><small>{run.id}</small></span></div></td>
              <td><span className={`environment-tag env-${run.environment.toLowerCase()}`}>{run.environment}</span></td>
              <td><span className="user-cell"><span className="user-avatar-small">{run.user.split(' ').map((name) => name[0]).slice(0, 2).join('')}</span>{run.user}</span></td>
              <td><StatusBadge status={run.status} /></td>
              <td className="duration-cell">{run.duration}</td>
              <td><button className="table-action" onClick={() => onReport(run)}>{run.status === 'running' ? 'Ver progreso' : 'Ver reporte'}<ArrowRight size={14} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SuiteCard({ suite, onRun, compact = false }: { suite: Suite; onRun: (suite: Suite) => void; compact?: boolean }) {
  return (
    <article className={`suite-card ${compact ? 'suite-card-compact' : ''}`}>
      <div className="suite-card-head"><SuiteGlyph suite={suite} />{suite.favorite && <span className="favorite-label"><Sparkles size={12} />Favorita</span>}</div>
      <h3>{suite.name}</h3>
      <p className="suite-description">{suite.description}</p>
      <div className="tech-tags">{suite.technology.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="suite-meta"><span><Clock3 size={14} />{suite.duration}</span><span className={`last-result ${suite.lastResult}`}><span />Último: {suite.lastResult === 'passed' ? 'Exitoso' : 'Fallido'}</span></div>
      <button className={`suite-run-button ${compact ? 'suite-run-button-compact' : ''}`} onClick={() => onRun(suite)}>{compact ? 'Ejecutar ahora' : 'Configurar y ejecutar'}<ArrowRight size={15} /></button>
    </article>
  )
}

function DashboardView({ activeRuns, onRun, onView, onReport }: { activeRuns: Execution[]; onRun: (suite: Suite) => void; onView: (view: View) => void; onReport: (run: Execution) => void }) {
  const recent = [...activeRuns, ...historyRows].slice(0, 5)
  return (
    <div className="page-stack">
      <section className="welcome-banner">
        <div className="welcome-copy"><div className="welcome-chip"><span className="welcome-dot" />PLATAFORMA DE CALIDAD</div><h1>Buenos días, Jeffer <span>—</span></h1><p>Todo listo para asegurar la calidad de tus entregas. ¿Qué vamos a probar hoy?</p><button className="primary-button welcome-button" onClick={() => onView('catalog')}><Plus size={17} />Nueva ejecución<ArrowRight size={15} /></button></div>
        <div className="welcome-side"><div className="welcome-orbit orbit-one" /><div className="welcome-orbit orbit-two" /><div className="pipeline-graphic"><div className="pipeline-node node-done"><Check size={15} /></div><span className="pipeline-link link-done" /><div className="pipeline-node node-active"><Play size={13} fill="currentColor" /></div><span className="pipeline-link" /><div className="pipeline-node"><FileBarChart size={14} /></div><div className="pipeline-caption"><span>Integración</span><span>Pruebas</span><span>Reporte</span></div></div><div className="pipeline-float"><span className="float-status-dot" /><div><strong>Pipeline conectado</strong><small>Azure DevOps · QA Automation</small></div><Cloud size={18} /></div></div>
      </section>

      <section className="kpi-grid" aria-label="Indicadores de calidad">
        <KpiCard title="Ejecuciones hoy" value="24" change="12.5%" trend="up" icon={Zap} color="blue" detail="vs. día anterior" />
        <KpiCard title="Tasa de éxito" value="96.8%" change="2.4%" trend="up" icon={CheckCircle2} color="green" detail="últimos 7 días" />
        <KpiCard title="Pipelines en curso" value={`${activeRuns.length}`} change="2 activos" trend="up" icon={Activity} color="orange" detail="en 2 proyectos" />
        <KpiCard title="Tiempo promedio" value="4m 32s" change="8.2%" trend="down" icon={Clock3} color="purple" detail="en el último mes" />
      </section>

      <section className="content-section">
        <SectionHeading eyebrow="A UN CLIC" title="Acceso rápido" action="Ver catálogo" onAction={() => onView('catalog')} />
        <div className="favorite-grid">{suites.filter((suite) => suite.favorite).map((suite) => <SuiteCard key={suite.id} suite={suite} compact onRun={onRun} />)}</div>
      </section>

      <section className="content-section activity-section">
        <SectionHeading eyebrow="ACTIVIDAD RECIENTE" title="Últimas ejecuciones" action="Ver historial" onAction={() => onView('history')} />
        <div className="panel table-panel"><RunTable rows={recent} onReport={onReport} /></div>
      </section>
      <footer className="page-footer"><span>© 2026 FICOHSA · Portal de automatizaciones</span><span><span className="footer-indicator" />Todos los sistemas operativos</span></footer>
    </div>
  )
}

function CatalogView({ onRun }: { onRun: (suite: Suite) => void }) {
  const [category, setCategory] = useState('Todas')
  const [query, setQuery] = useState('')
  const categories = ['Todas', 'Web E2E', 'API', 'Appian', 'Performance']
  const filteredSuites = useMemo(() => suites.filter((suite) => (category === 'Todas' || suite.category === category) && `${suite.name} ${suite.description} ${suite.technology.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  return (
    <div className="page-stack">
      <div className="page-intro"><div><p className="section-eyebrow">BIBLIOTECA DE PRUEBAS</p><h1>Catálogo de automatizaciones</h1><p>Explora las suites disponibles y configura una ejecución para tu equipo.</p></div><button className="secondary-button" onClick={() => setCategory('Todas')}><ListFilter size={16} />{suites.length} suites disponibles</button></div>
      <div className="catalog-tools"><label className="search-box"><Search size={17} /><input type="search" placeholder="Buscar por nombre, tecnología..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Buscar suites" /><kbd>⌘ K</kbd></label><div className="filter-label"><Filter size={15} /><span>Tipo de prueba</span></div><div className="category-tabs" role="group" aria-label="Filtrar por tipo de prueba">{categories.map((item) => <button key={item} className={`category-tab ${category === item ? 'category-tab-active' : ''}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div></div>
      <div className="catalog-summary"><span>Mostrando <strong>{filteredSuites.length}</strong> de {suites.length} suites</span><button className="sort-button"><SlidersHorizontal size={15} />Ordenar: Relevancia<ChevronDown size={14} /></button></div>
      {filteredSuites.length ? <div className="catalog-grid">{filteredSuites.map((suite) => <SuiteCard key={suite.id} suite={suite} onRun={onRun} />)}</div> : <div className="empty-state"><Search size={24} /><strong>No encontramos suites</strong><span>Prueba con otro término o cambia los filtros.</span><button className="text-action" onClick={() => { setQuery(''); setCategory('Todas') }}>Limpiar filtros</button></div>}
    </div>
  )
}

function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}m ${String(remainder).padStart(2, '0')}s`
}

function RunCard({ run, onCancel, onReport }: { run: Execution; onCancel: (run: Execution) => void; onReport: (run: Execution) => void }) {
  const stageStep = run.progress < 18 ? 0 : run.progress < 86 ? 1 : 2
  const stages = ['Preparación', 'Ejecución de pruebas', 'Publicación de evidencias']
  return (
    <article className="run-card">
      <div className="run-card-top"><div className="run-card-project"><SuiteGlyph suite={suites.find((suite) => suite.id === run.suiteId) ?? suites[0]} /><div><div className="run-id-row"><span className="run-id">{run.id}</span><StatusBadge status={run.status} /></div><h3>{run.project}</h3><p>{run.environment} <span className="meta-divider">·</span> iniciado por {run.user}</p></div></div><button className="icon-button" aria-label={`Más opciones para ${run.id}`}><MoreHorizontal size={19} /></button></div>
      <div className="run-stage-row"><span className="run-current-stage"><LoaderCircle size={15} className="spin-icon" />{run.stage}</span><span className="run-elapsed"><Clock3 size={14} />{formatElapsed(run.elapsedSeconds)}</span></div>
      <div className="progress-track" role="progressbar" aria-valuenow={run.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso de ${run.id}`}><span style={{ width: `${run.progress}%` }} /></div>
      <div className="run-progress-label"><span>{run.progress}% completado</span><span>Azure DevOps Pipeline</span></div>
      <div className="pipeline-steps">{stages.map((stage, index) => <div className={`pipeline-step ${index < stageStep ? 'step-complete' : ''} ${index === stageStep ? 'step-current' : ''}`} key={stage}><span className="step-indicator">{index < stageStep ? <Check size={11} /> : index === stageStep ? <span /> : null}</span><span>{stage}</span></div>)}</div>
      <div className="run-card-bottom"><div className="run-metrics"><span><CheckCircle2 size={14} />{run.passed} passed</span><span><XCircle size={14} />{run.failed} failed</span><span><GitBranch size={14} />{run.branch}</span></div><div className="run-actions"><button className="subtle-button" onClick={() => onReport(run)}>Detalles</button><button className="cancel-button" onClick={() => onCancel(run)}><X size={14} />Cancelar</button></div></div>
    </article>
  )
}

function MonitorView({ runs, onCancel, onReport, onCatalog }: { runs: Execution[]; onCancel: (run: Execution) => void; onReport: (run: Execution) => void; onCatalog: () => void }) {
  const [monitorFilter, setMonitorFilter] = useState('Todas')
  const filteredRuns = runs.filter((run) => monitorFilter === 'Todas' || (monitorFilter === 'QA' ? run.environment === 'QA' : run.environment === monitorFilter))
  return (
    <div className="page-stack">
      <div className="page-intro"><div><p className="section-eyebrow">AZURE DEVOPS PIPELINES</p><h1>Monitor en vivo</h1><p>Sigue el avance de tus pruebas y revisa sus resultados en tiempo real.</p></div><div className="live-pill"><span className="live-dot" />Actualizado ahora</div></div>
      <div className="monitor-summary"><div className="monitor-summary-item"><span className="summary-icon summary-blue"><Activity size={17} /></span><span><strong>{runs.length}</strong><small>Ejecuciones activas</small></span></div><div className="monitor-summary-item"><span className="summary-icon summary-green"><CheckCircle2 size={17} /></span><span><strong>3 / 4</strong><small>Agentes disponibles</small></span></div><div className="monitor-summary-item"><span className="summary-icon summary-amber"><Clock3 size={17} /></span><span><strong>2m 18s</strong><small>Tiempo promedio</small></span></div><button className="outline-button" onClick={onCatalog}><Plus size={15} />Nueva ejecución</button></div>
      <div className="monitor-toolbar"><div><h2>Ejecuciones activas <span className="active-count">{runs.length}</span></h2><p>Las etapas se actualizan automáticamente</p></div><label className="select-small"><span className="sr-only">Filtrar por ambiente</span><Filter size={14} /><select value={monitorFilter} onChange={(event) => setMonitorFilter(event.target.value)}><option>Todas</option><option>QA</option><option>Staging</option><option>UAT</option></select><ChevronDown size={14} /></label></div>
      {filteredRuns.length ? <div className="run-list">{filteredRuns.map((run) => <RunCard key={run.id} run={run} onCancel={onCancel} onReport={onReport} />)}</div> : <div className="empty-state"><Activity size={24} /><strong>No hay ejecuciones en este ambiente</strong><span>Lanza una suite para ver su progreso aquí.</span><button className="primary-button" onClick={onCatalog}><Plus size={16} />Nueva ejecución</button></div>}
      <section className="agent-card"><div className="agent-card-icon"><Cpu size={18} /></div><div><strong>Pool de agentes de Azure DevOps</strong><p>3 agentes disponibles · 1 ejecutando pruebas · Región Centroamérica</p></div><button className="text-action">Ver detalles<ArrowRight size={14} /></button></section>
    </div>
  )
}

function HistoryView({ rows, onReport }: { rows: Execution[]; onReport: (run: Execution) => void }) {
  const [statusFilter, setStatusFilter] = useState('Todos los estados')
  const filterRows = rows.filter((run) => statusFilter === 'Todos los estados' || statusInfo[run.status].label === statusFilter)
  return (
    <div className="page-stack">
      <div className="page-intro"><div><p className="section-eyebrow">TRAZABILIDAD DE CALIDAD</p><h1>Historial y reportes</h1><p>Consulta el resultado de las ejecuciones y accede a sus evidencias.</p></div><button className="secondary-button"><Download size={15} />Exportar historial</button></div>
      <div className="history-stats"><div className="history-stat"><span className="stat-mini-icon mini-green"><CheckCircle2 size={17} /></span><span><strong>96.8%</strong><small>Tasa de éxito · 7 días</small></span><span className="stat-trend">+2.4%</span></div><div className="history-stat"><span className="stat-mini-icon mini-blue"><FlaskConical size={17} /></span><span><strong>168</strong><small>Ejecuciones · 7 días</small></span><span className="stat-trend">+12.5%</span></div><div className="history-stat"><span className="stat-mini-icon mini-amber"><Bug size={17} /></span><span><strong>14</strong><small>Casos fallidos · 7 días</small></span><span className="stat-trend negative">−3.1%</span></div></div>
      <div className="history-toolbar"><div><h2>Registro de ejecuciones</h2><p>Historial reciente de pipelines</p></div><div className="history-filters"><label className="select-small"><span className="sr-only">Filtrar por estado</span><ListFilter size={14} /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>Todos los estados</option><option>Exitoso</option><option>Fallido</option><option>Cancelado</option></select><ChevronDown size={14} /></label><button className="icon-button filter-icon" aria-label="Más filtros"><SlidersHorizontal size={17} /></button></div></div>
      <div className="panel table-panel"><RunTable rows={filterRows} onReport={onReport} /></div>
      <div className="history-pagination"><span>Mostrando {filterRows.length} de 168 ejecuciones</span><div><button className="pagination-button" disabled aria-label="Página anterior">‹</button><button className="pagination-button pagination-active">1</button><button className="pagination-button">2</button><button className="pagination-button">3</button><span>…</span><button className="pagination-button">17</button><button className="pagination-button" aria-label="Página siguiente">›</button></div></div>
    </div>
  )
}

function ReportView({ run, onBack }: { run: Execution; onBack: () => void }) {
  const [showScreenshot, setShowScreenshot] = useState(false)
  const total = Math.max(run.passed + run.failed + run.skipped, 1)
  const downloadTrace = () => {
    const content = `QA Automation Hub · Trace ${run.id}\nProyecto: ${run.project}\nAmbiente: ${run.environment}\nRama: ${run.branch}\nSuite: ${run.suiteTag}\nResultado: ${run.passed} passed, ${run.failed} failed, ${run.skipped} skipped\n`
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
    link.download = `${run.id.toLowerCase()}-trace.txt`
    link.click()
    URL.revokeObjectURL(link.href)
  }
  return (
    <div className="page-stack">
      <button className="back-link" onClick={onBack}><ArrowRight size={15} className="back-arrow" />Volver al historial</button>
      <div className="report-heading"><div><p className="section-eyebrow">REPORTE DE EJECUCIÓN · {run.id}</p><h1>{run.project}</h1><p>Ejecutado el 17 nov, 2026 a las 9:42 a. m. <span className="meta-divider">·</span> Por {run.user}</p></div><StatusBadge status={run.status} /></div>
      <div className="report-overview-grid">
        <section className="panel result-panel"><div className="report-section-title"><div><h2>Resumen de resultados</h2><p>Distribución de casos de prueba</p></div><button className="icon-button" aria-label="Más acciones"><MoreHorizontal size={19} /></button></div><div className="results-content"><div className="donut-chart" style={{ background: `conic-gradient(#10b981 0 ${(run.passed / total) * 100}%, #ef4444 ${(run.passed / total) * 100}% ${((run.passed + run.failed) / total) * 100}%, #dbe4ee ${((run.passed + run.failed) / total) * 100}% 100%)` }}><div><strong>{total}</strong><span>casos</span></div></div><div className="result-legend"><div><span className="legend-dot passed-dot" /><span>Passed</span><strong>{run.passed}</strong></div><div><span className="legend-dot failed-dot" /><span>Failed</span><strong>{run.failed}</strong></div><div><span className="legend-dot skipped-dot" /><span>Skipped</span><strong>{run.skipped}</strong></div></div></div><div className="result-footnote"><CheckCircle2 size={15} />{run.failed === 0 ? 'Todos los casos críticos pasaron.' : `${Math.round((run.passed / total) * 100)}% de los casos pasaron correctamente.`}</div></section>
        <section className="panel parameters-panel"><div className="report-section-title"><div><h2>Parámetros de ejecución</h2><p>Configuración usada en el pipeline</p></div><Settings2 size={18} className="muted-icon" /></div><div className="parameter-list"><div><span><GitBranch size={15} />Rama</span><strong>{run.branch}</strong></div><div><span><Globe2 size={15} />Ambiente</span><strong className={`environment-tag env-${run.environment.toLowerCase()}`}>{run.environment}</strong></div><div><span><ListFilter size={15} />Suite / Tags</span><strong className="parameter-code">{run.suiteTag}</strong></div><div><span><Monitor size={15} />Runner</span><strong>{run.runner}</strong></div><div><span><Clock3 size={15} />Duración</span><strong>{run.duration}</strong></div></div></section>
      </div>
      <section className="panel failed-panel"><div className="report-section-title"><div><div className="failed-heading"><span className="failed-icon"><Bug size={16} /></span><h2>Casos fallidos</h2><span className="failed-count">{run.failed}</span></div><p>Revisa los errores y evidencias de esta ejecución.</p></div><button className="outline-button small-outline"><Download size={15} />Descargar reporte</button></div>
        {run.failed > 0 ? <div className="failed-case"><div className="failed-case-icon"><X size={16} /></div><div className="failed-case-content"><div className="failed-case-title"><strong>transferencia_de_terceros_debe_confirmar_monto</strong><span>TC-047</span></div><p>El saldo disponible no se actualizó después de confirmar la transferencia. Se esperaba L 2,450.00, se recibió L 2,900.00.</p><div className="error-meta"><span><Code2 size={13} />AssertionError</span><span><Clock3 size={13} />2.34s</span><span>specs/transfers/third-party.spec.ts:84</span></div><div className="failed-case-actions"><button className="evidence-button" onClick={() => setShowScreenshot(true)}><ExternalLink size={14} />Ver screenshot</button><button className="evidence-button" onClick={downloadTrace}><Download size={14} />Descargar trace</button></div></div></div> : <div className="success-report"><CheckCircle2 size={19} /><span>No se encontraron casos fallidos en esta ejecución.</span></div>}
      </section>
      <section className="panel report-timeline"><div className="report-section-title"><div><h2>Etapas del pipeline</h2><p>Azure DevOps · QA Automation</p></div><span className="completed-label"><Check size={13} />Finalizado</span></div><div className="report-timeline-row"><div className="timeline-event"><span className="timeline-check"><Check size={13} /></span><span><strong>Preparación</strong><small>Dependencias y ambiente listos · 0m 42s</small></span></div><div className="timeline-link" /><div className="timeline-event"><span className="timeline-check"><Check size={13} /></span><span><strong>Ejecución de pruebas</strong><small>Suites completadas · 8m 34s</small></span></div><div className="timeline-link" /><div className="timeline-event"><span className="timeline-check"><Check size={13} /></span><span><strong>Publicación de evidencias</strong><small>Reporte y trazas publicados · 0m 16s</small></span></div></div></section>
      {showScreenshot && <div className="modal-backdrop" onClick={() => setShowScreenshot(false)}><section className="screenshot-modal" role="dialog" aria-modal="true" aria-labelledby="screenshot-title" onClick={(event) => event.stopPropagation()}><div className="screenshot-modal-head"><div><span className="failed-icon"><Bug size={16} /></span><div><h2 id="screenshot-title">Evidencia del caso fallido</h2><p>TC-047 · {run.id}</p></div></div><button className="icon-button" onClick={() => setShowScreenshot(false)} aria-label="Cerrar evidencia"><X size={18} /></button></div><div className="fake-screenshot"><div className="fake-browser-bar"><span /><span /><span /><div>qa.ficohsa.com/transferencias</div></div><div className="fake-app"><div className="fake-app-nav"><BrandMark small /><span>Ficohsa</span><span>Transferencias</span></div><div className="fake-app-content"><span className="fake-error-icon"><XCircle size={23} /></span><strong>No pudimos completar tu transferencia</strong><small>Verifica los datos e inténtalo nuevamente.</small><span className="fake-error-code">Error TC-047 · Saldo no actualizado</span></div></div></div><div className="screenshot-modal-foot"><span><CalendarDays size={14} />Capturada durante la ejecución</span><button className="outline-button small-outline" onClick={downloadTrace}><Download size={14} />Descargar trace</button></div></section></div>}
    </div>
  )
}

function ExecutionDrawer({ suite, onClose, onLaunch }: { suite: Suite; onClose: () => void; onLaunch: (suite: Suite, details: { environment: string; branch: string; suiteTag: string; runner: string }) => void }) {
  const [branch, setBranch] = useState('main')
  const [environment, setEnvironment] = useState('QA')
  const [suiteTag, setSuiteTag] = useState('@smoke')
  const [runner, setRunner] = useState(suite.category === 'Performance' ? 'Parallel Workers' : 'Chromium')
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="execution-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header"><div><p className="section-eyebrow">CONFIGURAR PIPELINE</p><h2 id="drawer-title">Nueva ejecución</h2><p>Define los parámetros antes de lanzar tu suite.</p></div><button className="icon-button drawer-close" onClick={onClose} aria-label="Cerrar panel"><X size={19} /></button></div>
        <div className="drawer-suite"><SuiteGlyph suite={suite} /><div><strong>{suite.name}</strong><span>{suite.technology.join(' · ')}<span className="meta-divider"> · </span>{suite.duration}</span></div><ChevronDown size={16} /></div>
        <div className="drawer-form">
          <label className="form-field"><span>Rama (Branch)<span className="required-mark">*</span></span><div className="input-with-icon"><GitBranch size={16} /><select value={branch} onChange={(event) => setBranch(event.target.value)}><option value="main">main</option><option value="develop">develop</option><option value="release/2.4">release/2.4</option><option value="feature/qa-automation">feature/qa-automation</option></select><ChevronDown size={15} /></div><small>Rama del repositorio de Azure DevOps</small></label>
          <label className="form-field"><span>Ambiente de ejecución<span className="required-mark">*</span></span><div className="input-with-icon"><Globe2 size={16} /><select value={environment} onChange={(event) => setEnvironment(event.target.value)}><option>QA</option><option>Staging</option><option>UAT</option></select><ChevronDown size={15} /></div>{environment === 'UAT' ? <div className="uat-warning"><ShieldCheck size={15} /><span><strong>Ambiente controlado</strong>Las pruebas en UAT pueden afectar datos compartidos. Confirma que usas datos de prueba.</span></div> : <small>Selecciona dónde se ejecutarán las pruebas</small>}</label>
          <label className="form-field"><span>Suite / Tags</span><div className="input-with-icon"><ListFilter size={16} /><select value={suiteTag} onChange={(event) => setSuiteTag(event.target.value)}><option value="@smoke">@smoke · Pruebas críticas rápidas</option><option value="@regression">@regression · Regresión completa</option><option value="@critical">@critical · Flujos prioritarios</option><option value="@performance">@performance · Carga y rendimiento</option></select><ChevronDown size={15} /></div><small>Filtra los casos a incluir en esta ejecución</small></label>
          <label className="form-field"><span>{suite.category === 'Performance' ? 'Hilos de ejecución' : 'Navegador / Hilos'}</span><div className="input-with-icon"><Monitor size={16} /><select value={runner} onChange={(event) => setRunner(event.target.value)}><option>Chromium</option><option>WebKit</option><option>Firefox</option><option>Parallel Workers</option></select><ChevronDown size={15} /></div><small>Agente y navegador para correr las pruebas</small></label>
        </div>
        <div className="drawer-info"><span className="drawer-info-icon"><Clock3 size={16} /></span><span><strong>Duración estimada</strong><small>{suite.duration} · {runner === 'Parallel Workers' ? 'hasta 4 workers en paralelo' : `1 agente · ${runner}`}</small></span></div>
        <div className="drawer-footer"><button className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button launch-button" onClick={() => onLaunch(suite, { environment, branch, suiteTag, runner })}><Play size={15} fill="currentColor" />Lanzar pipeline</button><p><ShieldCheck size={13} />Se ejecutará en Azure DevOps Pipelines</p></div>
      </aside>
    </div>
  )
}

export default function QaAutomationHub() {
  const [view, setView] = useState<View>('dashboard')
  const [activeRuns, setActiveRuns] = useState<Execution[]>(initialRuns)
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null)
  const [selectedReport, setSelectedReport] = useState<Execution>(historyRows[0])
  const [toastMessage, setToastMessage] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [tick, setTick] = useState(0)
  const history = useMemo(() => [...historyRows, ...activeRuns.filter((run) => run.status === 'cancelled')], [activeRuns])

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 2000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!tick) return
    setActiveRuns((runs) => runs.map((run) => ({ ...run, elapsedSeconds: run.elapsedSeconds + 2, progress: Math.min(run.progress + (run.progress < 85 ? 1 : 0), 96) })))
  }, [tick])

  useEffect(() => {
    if (!toastMessage) return
    const timer = window.setTimeout(() => setToastMessage(''), 3800)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const navigate = (nextView: View) => {
    setView(nextView)
    setMobileNavOpen(false)
  }

  const openReport = (run: Execution) => {
    setSelectedReport(run)
    setView('report')
  }

  const launchRun = (suite: Suite, details: { environment: string; branch: string; suiteTag: string; runner: string }) => {
    const nextId = `QA-${1050 + activeRuns.length + historyRows.length}`
    const run: Execution = {
      id: nextId,
      suiteId: suite.id,
      project: suite.name,
      environment: details.environment,
      user: 'Jeffer Martínez',
      status: 'running',
      duration: 'En curso',
      elapsedSeconds: 0,
      progress: 5,
      stage: 'Preparación',
      branch: details.branch,
      suiteTag: details.suiteTag,
      runner: details.runner,
      passed: 0,
      failed: 0,
      skipped: 0,
    }
    setActiveRuns((runs) => [run, ...runs])
    setSelectedSuite(null)
    setView('monitor')
    setToastMessage(`Pipeline ${nextId} lanzado correctamente`)
  }

  const cancelRun = (run: Execution) => {
    setActiveRuns((runs) => runs.filter((item) => item.id !== run.id))
    setToastMessage(`Ejecución ${run.id} cancelada`)
  }

  return (
    <div className="app-shell">
      {mobileNavOpen && <button className="mobile-scrim" aria-label="Cerrar navegación" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup"><BrandMark /><div><strong>Portal de automatizaciones</strong><span>FICOHSA</span></div><button className="sidebar-close icon-button" onClick={() => setMobileNavOpen(false)} aria-label="Cerrar menú"><X size={18} /></button></div>
        <div className="workspace-switcher"><span className="workspace-icon"><Terminal size={16} /></span><span><strong>Ficohsa Digital</strong><small>Workspace QA</small></span><ChevronDown size={15} className="workspace-chevron" /></div>
        <div className="sidebar-label">MENÚ PRINCIPAL</div>
        <nav className="main-navigation" aria-label="Navegación principal">{navItems.map((item) => <NavButton key={item.id} item={item} active={view === item.id} count={item.id === 'monitor' ? activeRuns.length : undefined} onClick={() => navigate(item.id)} />)}</nav>
        <div className="sidebar-bottom"><div className="sidebar-help"><div className="help-icon"><Sparkles size={16} /></div><strong>¿Necesitas ayuda?</strong><p>Consulta la guía rápida para lanzar tus pruebas.</p><button onClick={() => setToastMessage('Guía rápida disponible próximamente')}>Ver guía<ArrowRight size={13} /></button></div><button className="sidebar-settings" onClick={() => setToastMessage('Configuración del workspace')}><Settings2 size={17} />Configuración<ChevronDown size={14} /></button><div className="sidebar-version"><span>PORTAL DE AUTOMATIZACIONES</span><span>v2.4.0</span></div></div>
      </aside>

      <div className="main-column">
        <header className="topbar"><div className="topbar-left"><button className="mobile-menu-button icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Abrir menú"><Menu size={20} /></button><div className="breadcrumb"><span>Portal de automatizaciones</span><ArrowRight size={14} /><strong>{titleByView[view]}</strong></div></div><div className="topbar-right"><div className="infra-pill"><span className="infra-dot" /><span>Agentes Azure DevOps: <strong>3/4</strong> disponibles</span><ChevronDown size={13} /></div><button className="icon-button notification-button" aria-label="Notificaciones"><Bell size={18} /><span /></button><div className="topbar-divider" /><button className="profile-button"><span className="profile-avatar">JM</span><span className="profile-copy"><strong>Jeffer Martínez</strong><small>QA Lead</small></span><ChevronDown size={14} /></button></div></header>

        <main className="main-content">
          {view === 'dashboard' && <DashboardView activeRuns={activeRuns} onRun={setSelectedSuite} onView={navigate} onReport={openReport} />}
          {view === 'catalog' && <CatalogView onRun={setSelectedSuite} />}
          {view === 'monitor' && <MonitorView runs={activeRuns} onCancel={cancelRun} onReport={openReport} onCatalog={() => navigate('catalog')} />}
          {view === 'history' && <HistoryView rows={history} onReport={openReport} />}
          {view === 'report' && <ReportView run={selectedReport} onBack={() => navigate('history')} />}
        </main>
      </div>

      {selectedSuite && <ExecutionDrawer suite={selectedSuite} onClose={() => setSelectedSuite(null)} onLaunch={launchRun} />}
      {toastMessage && <div className="toast-message" role="status"><span><Check size={15} /></span>{toastMessage}<button onClick={() => setToastMessage('')} aria-label="Cerrar notificación"><X size={15} /></button></div>}
    </div>
  )
}
