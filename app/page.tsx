'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileBarChart,
  FileCheck2,
  FilePlus2,
  FileText,
  Filter,
  Home,
  LayoutDashboard,
  LogOut,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  PackageCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Printer,
  Download,
  UserPlus,
  UserMinus,
  Truck,
  ReceiptText,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'

const requests = [
  { id: 'GIS-REQ-2026-00125', title: '10 Laptop Computers', requester: 'Daniel Kato', department: 'ICT', date: '03 Oct 2026 · 10:35 AM', amount: 'UGX 28,500,000', status: 'Pending Principal Approval', priority: 'High', color: 'amber' },
  { id: 'GIS-REQ-2026-00124', title: 'Science Laboratory Chemicals', requester: 'Joseph Mugisha', department: 'Science', date: '03 Oct 2026 · 09:12 AM', amount: 'UGX 1,850,000', status: 'Pending Finance Approval', priority: 'Normal', color: 'blue' },
  { id: 'GIS-REQ-2026-00127', title: 'Football & Basketball Equipment', requester: 'Achileo Mulalira', department: 'Sports', date: '01 Oct 2026 · 03:44 PM', amount: 'UGX 3,750,000', status: 'In Procurement', priority: 'High', color: 'violet' },
  { id: 'GIS-REQ-2026-00126', title: 'Printer Toner and A4 Paper', requester: 'Sarah Namusoke', department: 'Administration', date: '02 Oct 2026 · 02:08 PM', amount: 'UGX 1,240,000', status: 'Approved', priority: 'Normal', color: 'green' },
  { id: 'GIS-REQ-2026-00123', title: 'Boarding Mattresses', requester: 'Grace Atim', department: 'Boarding', date: '30 Sep 2026 · 11:20 AM', amount: 'UGX 8,920,000', status: 'Completed', priority: 'Urgent', color: 'slate' },
]

const navGroups = [
  { label: 'Workspace', items: [['Dashboard', LayoutDashboard], ['Requisitions', FileText], ['My Requests', FilePlus2], ['Approvals', ClipboardCheck], ['Procurement', ShoppingCart], ['Purchase Orders', FileCheck2], ['Invoices', WalletCards]] },
  { label: 'Manage', items: [['Suppliers', Building2], ['Budgets', WalletCards], ['Inventory / Stores', Boxes], ['Staff', Users], ['Departments', Building2]] },
  { label: 'Insights', items: [['Reports', FileBarChart], ['Notifications', Bell], ['Audit Logs', ShieldCheck]] },
]



type DemoRole = 'Teacher / Requester' | 'Department Head' | 'Operations / Procurement' | 'Finance' | 'Principal' | 'School Administrator'

type DemoUser = {
  name: string
  email: string
  role: DemoRole
  department: string
  initials: string
}

const demoUsers: Record<DemoRole, DemoUser> = {
  'Teacher / Requester': { name: 'Joseph Mugisha', email: 'joseph.mugisha@galaxy-demo.school', role: 'Teacher / Requester', department: 'Science', initials: 'JO' },
  'Department Head': { name: 'Mary Akello', email: 'mary.akello@galaxy-demo.school', role: 'Department Head', department: 'Science', initials: 'MA' },
  'Operations / Procurement': { name: 'Achileo Mulalira', email: 'Achileo.Mulalira@galaxy-demo.school', role: 'Operations / Procurement', department: 'Procurement', initials: 'RO' },
  Finance: { name: 'Peter Mugisha', email: 'peter.mugisha@galaxy-demo.school', role: 'Finance', department: 'Finance', initials: 'PM' },
  Principal: { name: 'Dr. Andrew Kato', email: 'principal@galaxy-demo.school', role: 'Principal', department: 'Leadership', initials: 'AK' },
  'School Administrator': { name: 'Sarah Namusoke', email: 'sarah.namusoke@galaxy-demo.school', role: 'School Administrator', department: 'Administration', initials: 'SN' },
}

const roleNavigation: Record<DemoRole, string[]> = {
  'Teacher / Requester': ['Dashboard', 'Requisitions', 'My Requests', 'Notifications'],
  'Department Head': ['Dashboard', 'Requisitions', 'My Requests', 'Approvals', 'Budgets', 'Reports', 'Notifications'],
  'Operations / Procurement': ['Dashboard', 'Requisitions', 'Procurement', 'Purchase Orders', 'Invoices', 'Suppliers', 'Inventory / Stores', 'Reports', 'Notifications'],
  Finance: ['Dashboard', 'Requisitions', 'Approvals', 'Invoices', 'Budgets', 'Reports', 'Audit Logs', 'Notifications'],
  Principal: ['Dashboard', 'Requisitions', 'Approvals', 'Procurement', 'Invoices', 'Budgets', 'Reports', 'Audit Logs', 'Notifications'],
  'School Administrator': ['Dashboard', 'Requisitions', 'My Requests', 'Approvals', 'Procurement', 'Purchase Orders', 'Invoices', 'Suppliers', 'Budgets', 'Inventory / Stores', 'Staff', 'Departments', 'Reports', 'Notifications', 'Audit Logs', 'Settings'],
}

const roleHomeCopy: Record<DemoRole, { title: string; subtitle: string; alertTitle: string; alertText: string }> = {
  'Teacher / Requester': {
    title: 'My requisition workspace',
    subtitle: 'Create requests, follow approvals and know exactly where each request stands.',
    alertTitle: 'Your requests are moving',
    alertText: '2 of your requests were approved this week and 1 is waiting for your Head of Department.',
  },
  'Department Head': {
    title: 'Department approval dashboard',
    subtitle: 'Review Science department requests, protect the budget and keep approvals moving.',
    alertTitle: '3 requests need your attention',
    alertText: 'The oldest request has been waiting 18h 42m. Review it before the 24-hour approval SLA is breached.',
  },
  'Operations / Procurement': {
    title: 'Procurement operations dashboard',
    subtitle: 'Turn approved requests into quotations, purchase orders, deliveries and completed purchases.',
    alertTitle: '5 approved requests are ready for procurement',
    alertText: 'Two supplier quotations expire this week and one delivery is currently overdue.',
  },
  Finance: {
    title: 'Finance control dashboard',
    subtitle: 'Control budgets, approve financial commitments and keep supplier invoices visible.',
    alertTitle: 'UGX 18.45M is awaiting payment',
    alertText: '4 invoices are due this week and 2 requisitions require finance approval today.',
  },
  Principal: {
    title: 'Principal executive dashboard',
    subtitle: 'A school-wide view of approvals, spending, procurement performance and accountability.',
    alertTitle: 'Executive attention required',
    alertText: '3 high-value requisitions are awaiting your approval and one department is above 80% budget utilization.',
  },
  'School Administrator': {
    title: 'School operations dashboard',
    subtitle: 'Monitor requisitions, approvals, procurement, people and financial activity across the school.',
    alertTitle: 'Good control this month',
    alertText: 'Department spending is tracking 6.4% below forecast. You have 8 approvals waiting for review.',
  },
}

function money(value: string) { return value }

export default function Page() {
  const [active, setActive] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[number] | null>(null)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [user, setUser] = useState<DemoUser | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('galaxy-demo-user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch { window.localStorage.removeItem('galaxy-demo-user') }
    }
    setReady(true)
  }, [])

  const filteredRequests = useMemo(() => requests.filter((request) => `${request.id} ${request.title} ${request.requester} ${request.department}`.toLowerCase().includes(query.toLowerCase())), [query])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  function login(role: DemoRole) {
    const selected = demoUsers[role]
    window.localStorage.setItem('galaxy-demo-user', JSON.stringify(selected))
    setUser(selected)
    setActive('Dashboard')
  }

  function logout() {
    window.localStorage.removeItem('galaxy-demo-user')
    setProfileOpen(false)
    setUser(null)
    setActive('Dashboard')
  }

  if (!ready) return null
  if (!user) return <LoginScreen onLogin={login} />

  const visibleNavigation = roleNavigation[user.role]
  const canCreate = ['Teacher / Requester', 'Department Head', 'School Administrator'].includes(user.role)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} /></div>
          {sidebarOpen && <div><strong>Galaxy</strong><span>International School</span></div>}
          <button className="icon-button sidebar-close" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'} title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>{sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</button>
        </div>
        <div className="school-switcher"><div className="school-avatar">GI</div>{sidebarOpen && <><div className="school-copy"><b>Galaxy International</b><span>{user.role}</span></div><ChevronDown size={15} /></>}</div>
        <nav className="nav-area" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const items = group.items.filter(([label]) => visibleNavigation.includes(label as string))
            if (!items.length) return null
            return <div className="nav-group" key={group.label}>{sidebarOpen && <p className="nav-label">{group.label}</p>}{items.map(([label, Icon]) => <button key={label as string} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label as string)} title={label as string}><Icon size={18} /><span>{sidebarOpen && label}</span>{sidebarOpen && label === 'Approvals' && <em>{user.role === 'Principal' ? '3' : user.role === 'Finance' ? '2' : '8'}</em>}</button>)}</div>
          })}
        </nav>
        <div className="sidebar-bottom">
          {visibleNavigation.includes('Settings') && <button className={`nav-item ${active === 'Settings' ? 'active' : ''}`} onClick={() => setActive('Settings')}><Settings size={18} />{sidebarOpen && <span>Settings</span>}</button>}
          {sidebarOpen && <div className="help-card"><div className="help-icon">?</div><b>Demo mode</b><span>Signed in as {user.role}</span></div>}
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="mobile-menu icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>{user.department}</span><ChevronRight size={14} /><b>{active}</b></div></div>
          <div className="top-actions">
            <label className="global-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setActive('Notifications')}><Bell size={19} /><i>3</i></button>
            {canCreate && <button className="quick-create" onClick={() => setCreateOpen(true)}><Plus size={17} /> <span>New requisition</span></button>}
            <div className="profile-wrap">
              <button className="user-menu user-menu-button" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}>
                <div className="avatar">{user.initials}</div><div className="user-meta"><b>{user.name}</b><span>{user.role}</span></div><ChevronDown size={15} />
              </button>
              {profileOpen && <div className="profile-menu">
                <div className="profile-menu-head"><div className="avatar">{user.initials}</div><div><b>{user.name}</b><span>{user.email}</span></div></div>
                <button onClick={() => { setProfileOpen(false); notify('Profile view opened') }}><UserRound size={16} /> My profile</button>
                <button onClick={() => { setProfileOpen(false); notify('Account settings opened') }}><Settings size={16} /> Account settings</button>
                <div className="profile-menu-divider" />
                <button className="logout-item" onClick={logout}><LogOut size={16} /> Log out</button>
              </div>}
            </div>
          </div>
        </header>

        <div className="content">
          {active === 'Dashboard' ? <Dashboard user={user} onView={(view) => setActive(view)} onRequest={setSelectedRequest} /> : active === 'Requisitions' || active === 'My Requests' ? <RequisitionList requests={active === 'My Requests' ? filteredRequests.filter((request) => request.requester === user.name || user.role !== 'Teacher / Requester') : filteredRequests} onRequest={setSelectedRequest} onCreate={() => setCreateOpen(true)} /> : active === 'Approvals' ? <Approvals onRequest={setSelectedRequest} onAction={notify} /> : <ModulePage title={active} onCreate={() => canCreate ? setCreateOpen(true) : notify(`${active} action opened`)} onAction={notify} />}
        </div>
      </main>

      {createOpen && <CreateRequisition onClose={() => setCreateOpen(false)} onSubmit={() => { setCreateOpen(false); notify('Requisition submitted successfully') }} />}
      {selectedRequest && <RequestDetail request={selectedRequest} onClose={() => setSelectedRequest(null)} onAction={notify} />}
      {toast && <div className="toast"><div className="toast-check"><Check size={16} /></div>{toast}</div>}
    </div>
  )
}

function PageHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow || 'Galaxy International School'}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>
}


function LoginScreen({ onLogin }: { onLogin: (role: DemoRole) => void }) {
  const [role, setRole] = useState<DemoRole>('School Administrator')
  const [email, setEmail] = useState(demoUsers['School Administrator'].email)
  const [password, setPassword] = useState('demo123')
  const selected = demoUsers[role]

  function changeRole(nextRole: DemoRole) {
    setRole(nextRole)
    setEmail(demoUsers[nextRole].email)
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!email || !password) return
    onLogin(role)
  }

  return <div className="login-shell">
    <section className="login-showcase">
      <div className="login-brand"><div className="brand-mark"><Sparkles size={19} /></div><div><strong>Galaxy</strong><span>International School</span></div></div>
      <div className="login-showcase-copy">
        <span className="login-kicker">Requisition & Procurement Management</span>
        <h1>Control every request.<br />See every approval.</h1>
        <p>A clear, accountable workflow for school requisitions, procurement, invoices, budgets and operational reporting.</p>
        <div className="login-proof-grid">
          <div><strong>248</strong><span>Demo requisitions</span></div>
          <div><strong>23</strong><span>Pending requests</span></div>
          <div><strong>92.4%</strong><span>Approval SLA</span></div>
        </div>
      </div>
      <div className="login-security"><ShieldCheck size={16} /><span>Role-based access · Timestamped approvals · Complete audit trail</span></div>
    </section>

    <section className="login-panel">
      <form className="login-card" onSubmit={submit}>
        <div className="login-mobile-brand"><div className="brand-mark"><Sparkles size={18} /></div><div><strong>Galaxy</strong><span>International School</span></div></div>
        <div className="login-icon"><LockKeyhole size={20} /></div>
        <div className="login-heading"><span>Galaxy demo access</span><h2>Welcome back</h2><p>Select a role to test exactly what that user sees.</p></div>

        <label className="login-field">Role to test
          <select value={role} onChange={(event) => changeRole(event.target.value as DemoRole)}>
            {(Object.keys(demoUsers) as DemoRole[]).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <div className="role-preview"><div className="avatar">{selected.initials}</div><div><b>{selected.name}</b><span>{selected.department} · {selected.role}</span></div></div>

        <label className="login-field">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="login-field">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>

        <div className="login-options"><label><input type="checkbox" defaultChecked /> Remember this demo user</label><button type="button">Forgot password?</button></div>
        <button className="login-submit" type="submit">Sign in as {role}<ChevronRight size={16} /></button>
        <p className="demo-note">Prototype mode: any password works. Role selection controls dashboard access for presentation testing.</p>
      </form>
    </section>
  </div>
}

function Dashboard({ user, onView, onRequest }: { user: DemoUser; onView: (view: string) => void; onRequest: (request: (typeof requests)[number]) => void }) {
  const copy = roleHomeCopy[user.role]
  const statsByRole: Record<DemoRole, readonly [string, string, string, string, any][]> = {
    'Teacher / Requester': [
      ['My requests', '12', '3 submitted this month', 'blue', FileText],
      ['Pending approval', '3', '1 waiting on HOD', 'amber', Clock3],
      ['Approved', '7', '58% of requests', 'green', Check],
      ['Returned', '2', 'Action required', 'red', AlertTriangle],
    ],
    'Department Head': [
      ['Department requests', '34', '+6 this month', 'blue', FileText],
      ['Awaiting my approval', '3', 'Oldest: 18h 42m', 'amber', Clock3],
      ['Approved this month', '18', '91% within SLA', 'green', ClipboardCheck],
      ['Budget remaining', 'UGX 47.5M', '39.6% available', 'blue', WalletCards],
    ],
    'Operations / Procurement': [
      ['Procurement queue', '19', '5 newly approved', 'blue', ShoppingCart],
      ['Awaiting quotations', '7', '2 expire this week', 'amber', Clock3],
      ['Purchase orders', '14', 'UGX 36.8M committed', 'green', FileCheck2],
      ['Overdue deliveries', '2', 'Supplier follow-up due', 'red', AlertTriangle],
    ],
    Finance: [
      ['Finance approvals', '2', 'UGX 9.6M pending', 'amber', ClipboardCheck],
      ['Outstanding invoices', 'UGX 18.45M', '4 due this week', 'red', AlertTriangle],
      ['Approved spend', 'UGX 42.78M', '+18.2% vs last month', 'green', WalletCards],
      ['Budget alerts', '3', '1 department above 80%', 'blue', FileBarChart],
    ],
    Principal: [
      ['Principal approvals', '3', '2 high-value requests', 'amber', ClipboardCheck],
      ['School spend', 'UGX 42.78M', '6.4% below forecast', 'green', WalletCards],
      ['Open requisitions', '23', 'Across 11 departments', 'blue', FileText],
      ['SLA exceptions', '4', 'Need management attention', 'red', AlertTriangle],
    ],
    'School Administrator': [
      ['Total requisitions', '248', '+12.5%', 'blue', FileText],
      ['Pending requests', '23', '8 need attention', 'amber', Clock3],
      ['Approved spend', 'UGX 42.78M', '+18.2% vs last month', 'green', WalletCards],
      ['Outstanding invoices', 'UGX 18.45M', '4 due this week', 'red', AlertTriangle],
    ],
  }
  const stats = statsByRole[user.role]
  const teacher = user.role === 'Teacher / Requester'
  const ops = user.role === 'Operations / Procurement'
  const finance = user.role === 'Finance'
  const principal = user.role === 'Principal'

  return <>
    <PageHeader title={`Good afternoon, ${user.name.split(' ')[0]}`} subtitle={copy.subtitle} action={<button className="primary-button" onClick={() => onView(teacher ? 'My Requests' : ops ? 'Procurement' : finance || principal ? 'Approvals' : 'Requisitions')}><FileText size={17} /> {teacher ? 'View my requests' : ops ? 'Open procurement queue' : finance || principal ? 'Review approvals' : 'View requisitions'}</button>} />
    <div className="role-heading"><div><span>{user.role}</span><h2>{copy.title}</h2></div><div className="role-chip"><ShieldCheck size={14} /> {user.department}</div></div>
    <div className="insight-banner"><div className="insight-mark"><Sparkles size={18} /></div><div><b>{copy.alertTitle}</b><span>{copy.alertText}</span></div><button onClick={() => onView(teacher ? 'My Requests' : ops ? 'Procurement' : finance || principal ? 'Approvals' : 'Reports')}>Open details <ChevronRight size={16} /></button></div>
    <div className="stats-grid">{stats.map(([label, value, note, tone, Icon]) => <div className={`stat-card ${tone}`} key={label}><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={17} /></div></div><strong>{value}</strong><div className="stat-note">{tone === 'red' || tone === 'amber' ? <Clock3 size={13} /> : <ArrowUpRight size={13} />} {note}</div></div>)}</div>

    {teacher ? <div className="dashboard-grid"><section className="panel role-focus-panel"><div className="panel-header"><div><h2>My recent requests</h2><p>Follow each request from submission to completion.</p></div><button className="link-button" onClick={() => onView('My Requests')}>View all</button></div>{requests.slice(0, 3).map((request) => <button className="focus-row" key={request.id} onClick={() => onRequest(request)}><div><span>{request.id}</span><b>{request.title}</b><small>{request.date}</small></div><StatusBadge status={request.status} /><ChevronRight size={16} /></button>)}</section><section className="panel role-focus-panel"><div className="panel-header"><div><h2>Approval journey</h2><p>What happens after you submit.</p></div></div><div className="mini-journey"><span className="done"><Check size={14} /> Submitted</span><span className="done"><Check size={14} /> HOD review</span><span><Clock3 size={14} /> Finance / Principal</span><span>Procurement</span><span>Delivered</span></div></section></div> : <>
      <div className="dashboard-grid"><section className="panel trend-panel"><div className="panel-header"><div><h2>{ops ? 'Procurement activity' : finance ? 'Financial activity' : principal ? 'School requisition trend' : 'Requisition activity'}</h2><p>Monthly requests and approved spend</p></div><select><option>Last 6 months</option></select></div><div className="legend"><span><i className="dot blue-dot" />Requests</span><span><i className="dot green-dot" />Approved spend</span></div><div className="chart"><div className="y-axis"><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /></div><div className="bars">{[['May', 42, 30], ['Jun', 53, 39], ['Jul', 35, 26], ['Aug', 48, 41], ['Sep', 58, 46], ['Oct', 44, 36]].map(([month, a, b]) => <div className="bar-group" key={month as string}><div className="bar-pair"><i style={{ height: `${a}%` }} /><i style={{ height: `${b}%` }} /></div><span>{month}</span></div>)}</div></div></div></section><section className="panel status-panel"><div className="panel-header"><div><h2>{ops ? 'Procurement status' : 'Request status'}</h2><p>Across visible school activity</p></div><button className="link-button" onClick={() => onView('Reports')}>View report</button></div><div className="donut-wrap"><div className="donut"><div><b>248</b><span>Total</span></div></div><div className="status-list"><span><i className="dot green-dot" />Completed <b>78%</b></span><span><i className="dot blue-dot" />Approved <b>11%</b></span><span><i className="dot amber-dot" />Pending <b>7%</b></span><span><i className="dot red-dot" />Rejected <b>4%</b></span></div></div></section></div>
      <div className="lower-grid"><section className="panel role-focus-panel"><div className="panel-header"><div><h2>{ops ? 'Procurement queue' : finance ? 'Financial actions' : principal ? 'Requests needing executive review' : 'Recent requisitions'}</h2><p>Priority activity for your role.</p></div><button className="link-button" onClick={() => onView(ops ? 'Procurement' : finance || principal ? 'Approvals' : 'Requisitions')}>View all</button></div>{requests.slice(0, 3).map((request) => <button className="focus-row" key={request.id} onClick={() => onRequest(request)}><div><span>{request.id}</span><b>{request.title}</b><small>{request.requester} · {request.department}</small></div><div className="focus-amount"><b>{request.amount}</b><StatusBadge status={request.status} /></div><ChevronRight size={16} /></button>)}</section><section className="panel role-focus-panel"><div className="panel-header"><div><h2>{ops ? 'Supplier watch' : finance ? 'Budget watch' : principal ? 'Management watch' : 'Attention required'}</h2><p>Issues that need timely action.</p></div></div><div className="watch-list"><div><span className="watch-dot amber-dot" /><p><b>{ops ? '2 quotations expiring' : finance ? 'Science budget at 81%' : principal ? '3 high-value approvals' : '8 approvals pending'}</b><small>Requires action today</small></p></div><div><span className="watch-dot red-dot" /><p><b>{ops ? '1 delivery overdue' : finance ? '4 invoices due this week' : principal ? '1 SLA breach' : '4 invoices due this week'}</b><small>Escalation recommended</small></p></div><div><span className="watch-dot green-dot" /><p><b>{ops ? 'UGX 650K procurement savings' : '6.4% below monthly forecast'}</b><small>Positive performance</small></p></div></div></section></div>
    </>}
  </>
}

function RequisitionList({ requests: list, onRequest, onCreate }: { requests: typeof requests; onRequest: (request: (typeof requests)[number]) => void; onCreate: () => void }) {
  return <><PageHeader title="Requisitions" subtitle="Track every request from creation to completion." action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Create requisition</button>} /><div className="toolbar"><div className="filter-search"><Search size={17} /><input placeholder="Search requisitions..." /></div><button className="filter-button"><Filter size={16} /> Filters <span>3</span></button><button className="filter-button">Export <ChevronDown size={15} /></button></div><section className="panel table-panel full-panel"><div className="table-summary"><div><b>248 requisitions</b><span>Updated just now</span></div><div className="view-toggle"><button className="selected">All</button><button>Pending</button><button>Completed</button></div></div><RequestTable requests={list} onRequest={onRequest} /></section></>
}

function RequestTable({ requests: list, onRequest }: { requests: typeof requests; onRequest: (request: (typeof requests)[number]) => void }) { return <div className="table-scroll"><table><thead><tr><th>Requisition</th><th>Requester</th><th>Department</th><th>Requested</th><th>Amount</th><th>Status</th><th>Priority</th><th /></tr></thead><tbody>{list.map((request) => <tr key={request.id} onClick={() => onRequest(request)}><td><b className="request-id">{request.id}</b><span className="request-title">{request.title}</span></td><td><div className="person-cell"><div className="small-avatar">{request.requester.split(' ').map((n) => n[0]).join('')}</div>{request.requester}</div></td><td>{request.department}</td><td className="muted-cell">{request.date}</td><td><b>{money(request.amount)}</b></td><td><StatusBadge status={request.status} /></td><td><PriorityBadge priority={request.priority} /></td><td><button className="row-action" onClick={(event) => { event.stopPropagation(); onRequest(request) }}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div> }

function StatusBadge({ status }: { status: string }) { const tone = status.includes('Pending') ? 'pending' : status === 'Approved' ? 'approved' : status === 'In Procurement' ? 'procurement' : status === 'Completed' ? 'completed' : 'rejected'; return <span className={`status-badge ${tone}`}><i />{status}</span> }
function PriorityBadge({ priority }: { priority: string }) { return <span className={`priority ${priority.toLowerCase()}`}><i />{priority}</span> }

function Approvals({ onRequest, onAction }: { onRequest: (request: (typeof requests)[number]) => void; onAction: (message: string) => void }) { return <><PageHeader title="Approval inbox" subtitle="Review and action requests assigned to you." action={<button className="outline-button" onClick={() => onAction('Approval delegation settings opened')}><Clock3 size={16} /> Delegation settings</button>} /><div className="approval-stats"><div><span>Awaiting your approval</span><b>8</b><small>2 high priority</small></div><div><span>Average approval time</span><b>4h 18m</b><small className="positive"><ArrowDownRight size={13} /> 18% faster</small></div><div><span>Approval SLA compliance</span><b>92.4%</b><small className="positive"><ArrowUpRight size={13} /> 4.2% this month</small></div></div><div className="tabs"><button className="active">Awaiting my approval <span>8</span></button><button>Approved by me</button><button>Returned</button><button>All approvals</button></div><div className="approval-cards">{requests.slice(0, 3).map((request) => <div className="approval-card" key={request.id}><div className="approval-card-top"><div><span className="request-id">{request.id}</span><h3>{request.title}</h3><p>{request.requester} · {request.department}</p></div><PriorityBadge priority={request.priority} /></div><div className="approval-meta"><div><span>Amount</span><b>{request.amount}</b></div><div><span>Submitted</span><b>{request.date}</b></div><div><span>Time waiting</span><b className="warning-text">18h 42m</b></div><div><span>Budget impact</span><b>15.4%</b></div></div><div className="approval-actions"><button className="text-button" onClick={() => onRequest(request)}>View details <ChevronRight size={15} /></button><div><button className="reject-button" onClick={() => onAction('Request returned for correction')}>Return</button><button className="approve-button" onClick={() => onAction('Requisition approved successfully')}><Check size={15} /> Approve</button></div></div></div>)}</div></> }

function escapeXml(value: unknown) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function downloadExcel(filename: string, rows: Record<string, string | number>[]) {
  if (!rows.length) return
  const columns = Object.keys(rows[0])
  const workbook = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="${escapeXml(filename).slice(0, 28)}"><Table><Row>${columns.map((column) => `<Cell><Data ss:Type="String">${escapeXml(column)}</Data></Cell>`).join('')}</Row>${rows.map((row) => `<Row>${columns.map((column) => `<Cell><Data ss:Type="String">${escapeXml(row[column])}</Data></Cell>`).join('')}</Row>`).join('')}</Table></Worksheet></Workbook>`
  const blob = new Blob([workbook], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename.replace(/\s+/g, '-').toLowerCase()}.xls`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const procurementRows = [
  { reference: 'GIS-REQ-2026-00127', item: 'Sports equipment', department: 'Sports', supplier: 'Prime Supplies Uganda', amount: 'UGX 3,750,000', stage: 'Quotation comparison', due: '06 Oct 2026' },
  { reference: 'GIS-REQ-2026-00118', item: 'School bus spare parts', department: 'Transport', supplier: 'AutoServe Uganda', amount: 'UGX 6,840,000', stage: 'PO issued', due: '07 Oct 2026' },
  { reference: 'GIS-REQ-2026-00116', item: 'Classroom projectors', department: 'ICT', supplier: 'TechWorld Uganda Ltd', amount: 'UGX 12,600,000', stage: 'Awaiting delivery', due: '05 Oct 2026' },
  { reference: 'GIS-REQ-2026-00109', item: 'Kitchen supplies', department: 'Kitchen', supplier: 'FreshLine Traders', amount: 'UGX 4,190,000', stage: 'Goods received', due: '02 Oct 2026' },
]

const invoiceRows = [
  { invoice: 'INV-2026-1042', supplier: 'TechWorld Uganda Ltd', po: 'GIS-PO-0088', date: '03 Oct 2026 · 11:20 AM', due: '10 Oct 2026', amount: 'UGX 8,450,000', status: 'Awaiting Payment' },
  { invoice: 'INV-2026-1041', supplier: 'Prime Supplies Uganda', po: 'GIS-PO-0086', date: '02 Oct 2026 · 09:14 AM', due: '09 Oct 2026', amount: 'UGX 3,750,000', status: 'Verified' },
  { invoice: 'INV-2026-1038', supplier: 'Smart Office Solutions', po: 'GIS-PO-0081', date: '29 Sep 2026 · 03:08 PM', due: '04 Oct 2026', amount: 'UGX 1,240,000', status: 'Overdue' },
  { invoice: 'INV-2026-1032', supplier: 'LabCare East Africa', po: 'GIS-PO-0077', date: '25 Sep 2026 · 10:42 AM', due: '02 Oct 2026', amount: 'UGX 5,010,000', status: 'Paid' },
]

const supplierRows = [
  { supplier: 'TechWorld Uganda Ltd', category: 'ICT Equipment', contact: 'Brian Kato', phone: '+256 701 220 114', rating: '4.8 / 5', delivery: '2.4 days', status: 'Active' },
  { supplier: 'Prime Supplies Uganda', category: 'General Supplies', contact: 'Diana Nambasa', phone: '+256 772 980 221', rating: '4.6 / 5', delivery: '3.1 days', status: 'Active' },
  { supplier: 'Smart Office Solutions', category: 'Office Supplies', contact: 'Joel Ssemanda', phone: '+256 750 319 880', rating: '4.4 / 5', delivery: '2.8 days', status: 'Active' },
  { supplier: 'LabCare East Africa', category: 'Laboratory', contact: 'Faith Achieng', phone: '+256 783 442 102', rating: '4.7 / 5', delivery: '4.0 days', status: 'Under Review' },
]

const staffRows = [
  { id: 'GIS-ST-001', name: 'Sarah Namusoke', department: 'Administration', role: 'School Administrator', lastLogin: '04 Oct · 03:42 PM', status: 'Active' },
  { id: 'GIS-ST-012', name: 'Mary Akello', department: 'Science', role: 'Department Head', lastLogin: '04 Oct · 02:15 PM', status: 'Active' },
  { id: 'GIS-ST-018', name: 'Peter Mugisha', department: 'Finance', role: 'Finance', lastLogin: '04 Oct · 01:52 PM', status: 'Active' },
  { id: 'GIS-ST-026', name: 'Achileo Mulalira', department: 'Procurement', role: 'Operations / Procurement', lastLogin: '04 Oct · 12:36 PM', status: 'Active' },
  { id: 'GIS-ST-041', name: 'Grace Atim', department: 'Boarding', role: 'Requester', lastLogin: '01 Oct · 08:11 AM', status: 'Inactive' },
]

const inventoryRows = [
  { code: 'ST-IT-018', item: 'HDMI Cable 3m', category: 'ICT', stock: '18', minimum: '10', location: 'ICT Store', status: 'In Stock' },
  { code: 'ST-ADM-004', item: 'A4 Paper 80gsm', category: 'Stationery', stock: '9 reams', minimum: '15', location: 'Main Store', status: 'Low Stock' },
  { code: 'ST-SCI-031', item: 'Protective Gloves', category: 'Laboratory', stock: '0 boxes', minimum: '5', location: 'Science Store', status: 'Out of Stock' },
  { code: 'ST-SPT-008', item: 'Football Size 5', category: 'Sports', stock: '14', minimum: '8', location: 'Sports Store', status: 'In Stock' },
]

const budgetRows = [
  { department: 'Science', allocated: 'UGX 120,000,000', spent: 'UGX 72,500,000', committed: 'UGX 8,200,000', available: 'UGX 39,300,000', utilization: 67 },
  { department: 'ICT', allocated: 'UGX 180,000,000', spent: 'UGX 138,400,000', committed: 'UGX 28,500,000', available: 'UGX 13,100,000', utilization: 93 },
  { department: 'Administration', allocated: 'UGX 95,000,000', spent: 'UGX 61,200,000', committed: 'UGX 4,840,000', available: 'UGX 28,960,000', utilization: 69 },
  { department: 'Sports', allocated: 'UGX 75,000,000', spent: 'UGX 39,700,000', committed: 'UGX 7,100,000', available: 'UGX 28,200,000', utilization: 62 },
]

const auditRows = [
  { date: '04 Oct 2026', time: '03:42 PM', user: 'Sarah Namusoke', action: 'Updated staff role', record: 'GIS-ST-018', device: 'Chrome · Windows' },
  { date: '04 Oct 2026', time: '02:15 PM', user: 'Peter Mugisha', action: 'Approved finance request', record: 'GIS-REQ-2026-00124', device: 'Edge · Windows' },
  { date: '04 Oct 2026', time: '12:48 PM', user: 'Achileo Mulalira', action: 'Created purchase order', record: 'GIS-PO-0088', device: 'Chrome · Android' },
  { date: '04 Oct 2026', time: '08:32 AM', user: 'Dr. Andrew Kato', action: 'Approved principal request', record: 'GIS-REQ-2026-00125', device: 'Safari · iPhone' },
]

function DataTable({ columns, rows, actionLabel, onAction }: { columns: { key: string; label: string }[]; rows: Record<string, any>[]; actionLabel?: string; onAction?: (row: Record<string, any>) => void }) {
  return <div className="data-table-wrap"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}{actionLabel && <th />}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{columns.map((column) => <td key={column.key}>{column.key === 'status' || column.key === 'stage' ? <span className={`table-status ${String(row[column.key]).toLowerCase().replace(/\s+/g, '-')}`}>{row[column.key]}</span> : row[column.key]}</td>)}{actionLabel && <td><button className="table-action" onClick={() => onAction?.(row)}>{actionLabel}<ChevronRight size={14} /></button></td>}</tr>)}</tbody></table></div>
}

function ReportsPage({ onAction }: { onAction: (message: string) => void }) {
  const [report, setReport] = useState('Requisition report')
  const [period, setPeriod] = useState('This month')
  const reportRows = [
    { 'Requisition No.': 'GIS-REQ-2026-00125', Department: 'ICT', Requester: 'Daniel Kato', Status: 'Pending Principal Approval', Amount: 'UGX 28,500,000', 'Requested At': '03 Oct 2026 10:35 AM', 'Approval Time': '21h 57m' },
    { 'Requisition No.': 'GIS-REQ-2026-00124', Department: 'Science', Requester: 'Joseph Mugisha', Status: 'Pending Finance Approval', Amount: 'UGX 1,850,000', 'Requested At': '03 Oct 2026 09:12 AM', 'Approval Time': '18h 42m' },
    { 'Requisition No.': 'GIS-REQ-2026-00127', Department: 'Sports', Requester: 'Achileo Mulalira', Status: 'In Procurement', Amount: 'UGX 3,750,000', 'Requested At': '01 Oct 2026 03:44 PM', 'Approval Time': '12h 08m' },
    { 'Requisition No.': 'GIS-REQ-2026-00126', Department: 'Administration', Requester: 'Sarah Namusoke', Status: 'Approved', Amount: 'UGX 1,240,000', 'Requested At': '02 Oct 2026 02:08 PM', 'Approval Time': '8h 16m' },
  ]
  return <>
    <PageHeader title="Reports & analytics" subtitle="Printable management reports with Excel extraction for deeper analysis." action={<div className="page-actions"><button className="outline-button" onClick={() => window.print()}><Printer size={16} /> Print report</button><button className="primary-button" onClick={() => { downloadExcel(`${report}-${period}`, reportRows); onAction('Excel report downloaded') }}><Download size={16} /> Export Excel</button></div>} />
    <div className="report-controls"><label>Report<select value={report} onChange={(e) => setReport(e.target.value)}><option>Requisition report</option><option>Approval performance</option><option>Department spending</option><option>Procurement report</option><option>Supplier performance</option><option>Invoice report</option><option>Budget utilization</option><option>Inventory report</option><option>Staff activity report</option><option>Audit report</option></select></label><label>Period<select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Today</option><option>This week</option><option>This month</option><option>This quarter</option><option>This year</option></select></label><label>Department<select><option>All departments</option><option>Science</option><option>ICT</option><option>Finance</option><option>Administration</option></select></label></div>
    <div className="module-card-grid report-kpis"><div className="module-stat"><div className="module-stat-icon tone-0"><FileText size={18}/></div><span>Total requests</span><b>248</b><small>+12.5% this term</small></div><div className="module-stat"><div className="module-stat-icon tone-1"><Clock3 size={18}/></div><span>Avg. approval time</span><b>11h 24m</b><small>1h 16m faster</small></div><div className="module-stat"><div className="module-stat-icon tone-2"><WalletCards size={18}/></div><span>Approved spend</span><b>UGX 42.78M</b><small>Current month</small></div><div className="module-stat"><div className="module-stat-icon tone-3"><AlertTriangle size={18}/></div><span>SLA breaches</span><b>4</b><small className="warning-text">Needs attention</small></div></div>
    <section className="panel report-sheet printable-report"><div className="report-title"><div><span>Galaxy International School</span><h2>{report}</h2><p>{period} · Generated 04 Oct 2026 · 05:48 PM</p></div><div className="report-stamp">Management Report</div></div><DataTable columns={[{key:'Requisition No.',label:'Requisition'},{key:'Department',label:'Department'},{key:'Requester',label:'Requester'},{key:'Status',label:'Status'},{key:'Amount',label:'Amount'},{key:'Requested At',label:'Requested at'},{key:'Approval Time',label:'Approval time'}]} rows={reportRows} /><div className="report-foot"><span>Confidential · Galaxy International School</span><span>4 records shown · Demo data</span></div></section>
  </>
}

function ProcurementPage({ onAction }: { onAction: (message: string) => void }) {
  return <><PageHeader title="Procurement" subtitle="Move approved requests through quotations, supplier selection, purchase orders and delivery." action={<button className="primary-button" onClick={() => onAction('Quotation comparison opened')}><Plus size={17}/> New quotation comparison</button>} /><div className="module-card-grid"><Metric title="Procurement queue" value="19" note="5 newly approved" icon={<ShoppingCart size={18}/>} tone="0"/><Metric title="Awaiting quotations" value="7" note="2 expire this week" icon={<Clock3 size={18}/>} tone="1"/><Metric title="POs this month" value="14" note="UGX 36.8M committed" icon={<FileCheck2 size={18}/>} tone="2"/><Metric title="Overdue deliveries" value="2" note="Supplier follow-up due" icon={<Truck size={18}/>} tone="3"/></div><section className="panel module-table-panel"><div className="panel-header"><div><h2>Active procurement queue</h2><p>Every approved request remains visible until delivery is completed.</p></div><button className="outline-button" onClick={() => downloadExcel('procurement-queue', procurementRows)}>Export Excel</button></div><DataTable columns={[{key:'reference',label:'Request'},{key:'item',label:'Item / service'},{key:'department',label:'Department'},{key:'supplier',label:'Supplier'},{key:'amount',label:'Value'},{key:'stage',label:'Stage'},{key:'due',label:'Due'}]} rows={procurementRows} actionLabel="Open" onAction={() => onAction('Procurement record opened')} /></section></>
}

function InvoicePage({ onAction }: { onAction: (message: string) => void }) {
  return <><PageHeader title="Invoices" subtitle="Verify supplier invoices, monitor due dates and maintain a complete payment trail." action={<button className="primary-button" onClick={() => onAction('Invoice upload opened')}><Plus size={17}/> Add invoice</button>} /><div className="module-card-grid"><Metric title="Total invoices" value="46" note="This financial year" icon={<ReceiptText size={18}/>} tone="0"/><Metric title="Pending verification" value="5" note="UGX 9.2M" icon={<Clock3 size={18}/>} tone="1"/><Metric title="Awaiting payment" value="UGX 18.45M" note="4 due this week" icon={<WalletCards size={18}/>} tone="3"/><Metric title="Paid this month" value="UGX 31.6M" note="18 invoices" icon={<Check size={18}/>} tone="2"/></div><section className="panel module-table-panel"><div className="panel-header"><div><h2>Invoice register</h2><p>Received time, verification and payment status remain fully traceable.</p></div><button className="outline-button" onClick={() => downloadExcel('invoice-register', invoiceRows)}>Export Excel</button></div><DataTable columns={[{key:'invoice',label:'Invoice'},{key:'supplier',label:'Supplier'},{key:'po',label:'Purchase order'},{key:'date',label:'Received'},{key:'due',label:'Due date'},{key:'amount',label:'Amount'},{key:'status',label:'Status'}]} rows={invoiceRows} actionLabel="View" onAction={() => onAction('Invoice details opened')} /></section></>
}

function StaffPage({ onAction }: { onAction: (message: string) => void }) {
  return <><PageHeader title="Staff" subtitle="Manage system access, school roles, departments and approval authority without losing historical records." action={<button className="primary-button" onClick={() => onAction('Add staff form opened')}><UserPlus size={17}/> Add staff</button>} /><div className="module-card-grid"><Metric title="Active staff" value="84" note="6 system roles" icon={<Users size={18}/>} tone="0"/><Metric title="Approvers" value="18" note="Across 17 departments" icon={<ClipboardCheck size={18}/>} tone="2"/><Metric title="Inactive" value="6" note="Access removed" icon={<UserMinus size={18}/>} tone="1"/><Metric title="Logged in today" value="37" note="44% of active staff" icon={<ShieldCheck size={18}/>} tone="2"/></div><section className="panel module-table-panel"><div className="panel-header"><div><h2>Staff directory</h2><p>Deactivation removes access but always preserves requisitions and approval history.</p></div><button className="outline-button" onClick={() => downloadExcel('staff-directory', staffRows)}>Export Excel</button></div><DataTable columns={[{key:'id',label:'Staff ID'},{key:'name',label:'Staff member'},{key:'department',label:'Department'},{key:'role',label:'System role'},{key:'lastLogin',label:'Last login'},{key:'status',label:'Status'}]} rows={staffRows} actionLabel="Manage" onAction={(row) => onAction(`${row.name} staff controls opened`)} /></section></>
}

function BudgetPage({ onAction }: { onAction: (message: string) => void }) {
  return <><PageHeader title="Budgets" subtitle="See allocated, committed, spent and available funds before requests become financial problems." action={<button className="outline-button" onClick={() => downloadExcel('department-budgets', budgetRows.map(({utilization,...row}) => ({...row, utilization:`${utilization}%`})))}><Download size={16}/> Export Excel</button>} /><div className="budget-overview">{budgetRows.map((row) => <div className="budget-card" key={row.department}><div><span>{row.department}</span><b>{row.available} available</b></div><div className="budget-progress"><i style={{width:`${row.utilization}%`}} className={row.utilization >= 85 ? 'danger-progress' : ''}/></div><div className="budget-meta"><span>{row.utilization}% utilized</span><span>{row.spent} spent</span></div>{row.utilization >= 85 && <small><AlertTriangle size={13}/> Budget threshold alert</small>}</div>)}</div><section className="panel module-table-panel"><div className="panel-header"><div><h2>Department budget control</h2><p>Committed amounts include approved requisitions not yet fully paid.</p></div></div><DataTable columns={[{key:'department',label:'Department'},{key:'allocated',label:'Allocated'},{key:'spent',label:'Spent'},{key:'committed',label:'Committed'},{key:'available',label:'Available'}]} rows={budgetRows} actionLabel="Details" onAction={() => onAction('Budget detail opened')} /></section></>
}

function InventoryPage({ onAction }: { onAction: (message: string) => void }) {
  return <><PageHeader title="Inventory / Stores" subtitle="Check internal stock before purchasing and keep every issue, receipt and adjustment visible." action={<button className="primary-button" onClick={() => onAction('Receive stock form opened')}><PackageCheck size={17}/> Receive stock</button>} /><div className="module-card-grid"><Metric title="Stock items" value="386" note="Across 5 stores" icon={<Boxes size={18}/>} tone="0"/><Metric title="Low stock" value="14" note="Reorder recommended" icon={<AlertTriangle size={18}/>} tone="1"/><Metric title="Out of stock" value="6" note="Immediate attention" icon={<X size={18}/>} tone="3"/><Metric title="Issued this month" value="128" note="Internal issues" icon={<PackageCheck size={18}/>} tone="2"/></div><section className="panel module-table-panel"><div className="panel-header"><div><h2>Stock register</h2><p>The system can recommend internal issue before an external requisition is purchased.</p></div><button className="outline-button" onClick={() => downloadExcel('inventory-register', inventoryRows)}>Export Excel</button></div><DataTable columns={[{key:'code',label:'Item code'},{key:'item',label:'Item'},{key:'category',label:'Category'},{key:'stock',label:'Current stock'},{key:'minimum',label:'Minimum'},{key:'location',label:'Location'},{key:'status',label:'Status'}]} rows={inventoryRows} actionLabel="History" onAction={() => onAction('Stock history opened')} /></section></>
}

function GenericManagementPage({ title, onAction }: { title: string; onAction: (message: string) => void }) {
  const configs: Record<string, { subtitle: string; rows: Record<string, any>[]; columns: {key:string;label:string}[]; button: string }> = {
    'Purchase Orders': { subtitle: 'Track authorized purchases from issue through supplier delivery.', button: 'Create purchase order', rows: procurementRows.map((r,i) => ({ po:`GIS-PO-00${88-i}`, supplier:r.supplier, request:r.reference, issued:`0${4-i} Oct 2026`, amount:r.amount, status:i===2?'Awaiting Delivery':'Sent' })), columns:[{key:'po',label:'PO Number'},{key:'supplier',label:'Supplier'},{key:'request',label:'Requisition'},{key:'issued',label:'Issued'},{key:'amount',label:'Amount'},{key:'status',label:'Status'}] },
    Suppliers: { subtitle: 'Compare supplier performance, reliability, delivery speed and purchasing history.', button: 'Add supplier', rows:supplierRows, columns:[{key:'supplier',label:'Supplier'},{key:'category',label:'Category'},{key:'contact',label:'Contact'},{key:'phone',label:'Phone'},{key:'rating',label:'Rating'},{key:'delivery',label:'Avg. delivery'},{key:'status',label:'Status'}] },
    Departments: { subtitle: 'Department ownership, staffing, budget and requisition performance in one view.', button: 'Add department', rows:budgetRows.map((r,i)=>({ department:r.department, head:['Mary Akello','Daniel Kato','Sarah Namusoke','Achileo Mulalira'][i], staff:[12,9,14,8][i], budget:r.allocated, requests:[34,29,41,22][i], status:'Active' })), columns:[{key:'department',label:'Department'},{key:'head',label:'Department head'},{key:'staff',label:'Staff'},{key:'budget',label:'Annual budget'},{key:'requests',label:'Requests'},{key:'status',label:'Status'}] },
    Notifications: { subtitle: 'Actions, deadlines and escalations that need your attention.', button: 'Mark all as read', rows:[{ notification:'3 requisitions require approval', time:'8 minutes ago', module:'Approvals', status:'Unread'},{notification:'Invoice INV-2026-1038 is overdue',time:'34 minutes ago',module:'Invoices',status:'Unread'},{notification:'ICT budget reached 93%',time:'2 hours ago',module:'Budgets',status:'Unread'},{notification:'PO GIS-PO-0081 delivery received',time:'Yesterday',module:'Procurement',status:'Read'}], columns:[{key:'notification',label:'Notification'},{key:'module',label:'Module'},{key:'time',label:'Time'},{key:'status',label:'Status'}] },
    'Audit Logs': { subtitle: 'An immutable, timestamped record of important user and system actions.', button: 'Export audit log', rows:auditRows, columns:[{key:'date',label:'Date'},{key:'time',label:'Time'},{key:'user',label:'User'},{key:'action',label:'Action'},{key:'record',label:'Record'},{key:'device',label:'Device'}] },
    Settings: { subtitle: 'Configure school profile, workflows, permissions, financial year, notifications and security.', button: 'Save settings', rows:[{setting:'Approval workflows',value:'4 value-based levels',updated:'02 Oct 2026'},{setting:'Financial year',value:'2026 / 2027',updated:'01 Oct 2026'},{setting:'Default currency',value:'UGX',updated:'15 Sep 2026'},{setting:'Approval SLA',value:'24 hours per stage',updated:'12 Sep 2026'}], columns:[{key:'setting',label:'Setting'},{key:'value',label:'Current value'},{key:'updated',label:'Last updated'}] },
  }
  const config = configs[title] || configs.Suppliers
  return <><PageHeader title={title} subtitle={config.subtitle} action={<button className="primary-button" onClick={() => title === 'Audit Logs' ? downloadExcel('audit-log', auditRows) : onAction(`${config.button} opened`)}><Plus size={17}/>{config.button}</button>} /><div className="module-card-grid"><Metric title="Active records" value={title==='Suppliers'?'8':'46'} note="Updated today" icon={<FileText size={18}/>} tone="0"/><Metric title="Pending actions" value="5" note="Requires review" icon={<Clock3 size={18}/>} tone="1"/><Metric title="Completed this month" value="31" note="On track" icon={<Check size={18}/>} tone="2"/><Metric title="Needs attention" value="2" note="Follow-up required" icon={<AlertTriangle size={18}/>} tone="3"/></div><section className="panel module-table-panel"><div className="panel-header"><div><h2>{title} register</h2><p>Demo records for presentation and workflow testing.</p></div>{title !== 'Settings' && <button className="outline-button" onClick={() => downloadExcel(title, config.rows)}>Export Excel</button>}</div><DataTable columns={config.columns} rows={config.rows} actionLabel={title==='Notifications'?'Open':'View'} onAction={() => onAction(`${title} record opened`)} /></section></>
}

function Metric({ title, value, note, icon, tone }: { title:string; value:string; note:string; icon:React.ReactNode; tone:string }) { return <div className="module-stat"><div className={`module-stat-icon tone-${tone}`}>{icon}</div><span>{title}</span><b>{value}</b><small>{note}</small></div> }

function ModulePage({ title, onCreate, onAction }: { title: string; onCreate: () => void; onAction: (message: string) => void }) {
  if (title === 'Reports') return <ReportsPage onAction={onAction} />
  if (title === 'Procurement') return <ProcurementPage onAction={onAction} />
  if (title === 'Invoices') return <InvoicePage onAction={onAction} />
  if (title === 'Staff') return <StaffPage onAction={onAction} />
  if (title === 'Budgets') return <BudgetPage onAction={onAction} />
  if (title === 'Inventory / Stores') return <InventoryPage onAction={onAction} />
  return <GenericManagementPage title={title} onAction={onAction} />
}

function CreateRequisition({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) { const [items, setItems] = useState([{ name: 'A4 Paper 80gsm', qty: 20, price: 28500 }]); const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0); return <div className="modal-backdrop"><div className="modal large-modal"><div className="modal-header"><div><div className="eyebrow">New request</div><h2>Create requisition</h2><p>Save a draft or submit it into the approval workflow.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="form-body"><div className="form-grid"><label>Request title<input defaultValue="Printer toner and office supplies" /></label><label>Department<select defaultValue="Administration"><option>Administration</option><option>ICT</option><option>Science</option><option>Finance</option></select></label><label>Category<select><option>Office supplies</option><option>ICT equipment</option><option>Laboratory</option></select></label><label>Priority<select defaultValue="Normal"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label>Required by<input type="date" defaultValue="2026-10-15" /></label><label>Cost centre<input defaultValue="ADM-OPS-01" /></label></div><label>Purpose / justification<textarea defaultValue="Replenish shared office supplies for the administration block and term opening." /></label><div className="section-heading"><div><h3>Requested items</h3><p>Add products or services to this request.</p></div><button className="small-outline" onClick={() => setItems([...items, { name: '', qty: 1, price: 0 }])}><Plus size={15} /> Add item</button></div>{items.map((item, index) => <div className="item-row" key={index}><input placeholder="Item or service" value={item.name} onChange={(e) => setItems(items.map((current, i) => i === index ? { ...current, name: e.target.value } : current))} /><input type="number" aria-label="Quantity" value={item.qty} onChange={(e) => setItems(items.map((current, i) => i === index ? { ...current, qty: Number(e.target.value) } : current))} /><input type="number" aria-label="Unit price" value={item.price} onChange={(e) => setItems(items.map((current, i) => i === index ? { ...current, price: Number(e.target.value) } : current))} /><b>UGX {(item.qty * item.price).toLocaleString()}</b><button className="icon-button" onClick={() => setItems(items.filter((_, i) => i !== index))} aria-label="Remove item"><X size={16} /></button></div>)}<div className="budget-callout"><div className="budget-icon"><WalletCards size={17} /></div><div><b>Budget check</b><span>Available department budget is UGX 47,500,000 after this request.</span></div><strong>UGX {subtotal.toLocaleString()}</strong></div></div><div className="modal-footer"><button className="outline-button" onClick={onClose}>Cancel</button><button className="secondary-button" onClick={onSubmit}>Save draft</button><button className="primary-button" onClick={onSubmit}>Submit requisition <ChevronRight size={16} /></button></div></div></div> }

function RequestDetail({ request, onClose, onAction }: { request: (typeof requests)[number]; onClose: () => void; onAction: (message: string) => void }) { return <div className="modal-backdrop"><div className="modal detail-modal"><div className="modal-header"><div><span className="request-id">{request.id}</span><h2>{request.title}</h2><p>Full request activity and approval history</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="detail-summary"><div><span>Status</span><StatusBadge status={request.status} /></div><div><span>Total amount</span><b>{request.amount}</b></div><div><span>Requester</span><b>{request.requester}</b></div><div><span>Required by</span><b>15 Oct 2026</b></div></div><div className="detail-content"><section><div className="section-heading"><div><h3>Approval timeline</h3><p>Every action is timestamped for accountability.</p></div><span className="sla-badge"><Clock3 size={14} /> 23h 14m total</span></div><div className="timeline">{[['Created', '03 Oct 2026', '09:12 AM', 'John Okello', 'Requester'], ['Submitted', '03 Oct 2026', '09:18 AM', 'John Okello', 'Requester'], ['HOD Approved', '03 Oct 2026', '10:42 AM', 'Mary Akello', 'Head of Department'], ['Finance Approved', '03 Oct 2026', '02:15 PM', 'Peter Mugisha', 'Finance Manager'], ['Principal Approved', '04 Oct 2026', '08:32 AM', 'Dr. Andrew Kato', 'Principal'], ['Sent to Procurement', '04 Oct 2026', '09:05 AM', 'Sarah Namusoke', 'School Administrator']].map((event, index) => <div className="timeline-item" key={event[0]}><div className={`timeline-dot ${index === 5 ? 'current' : ''}`}>{index === 5 ? <Clock3 size={13} /> : <Check size={13} />}</div><div className="timeline-line" /><div className="timeline-copy"><div><b>{event[0]}</b><span>{event[1]} · {event[2]}</span></div><p>By <strong>{event[3]}</strong> · {event[4]}</p>{index === 2 && <blockquote>“Approved for departmental requirement.”</blockquote>}</div></div>)}</div></section><aside className="detail-side"><div className="side-callout"><AlertTriangle size={18} /><div><b>Currently waiting</b><span>Procurement Department</span><small>Waiting time · 2h 37m</small></div></div><h3>Requested items</h3><div className="line-item"><span>10 × Laptop computers</span><b>UGX 28,500,000</b></div><div className="line-item"><span>Delivery & setup</span><b>UGX 850,000</b></div><div className="total-line"><span>Grand total</span><b>{request.amount}</b></div><h3>Attachments</h3><button className="attachment"><FileText size={16} /><span>Specification.docx<small>428 KB · uploaded 03 Oct</small></span><ChevronRight size={15} /></button></aside></div><div className="modal-footer"><button className="outline-button" onClick={onClose}>Close</button><button className="secondary-button" onClick={() => onAction('Approval sheet prepared for printing')}>Print approval sheet</button><button className="primary-button" onClick={() => onAction('Requisition approved successfully')}><Check size={16} /> Approve request</button></div></div></div> }

