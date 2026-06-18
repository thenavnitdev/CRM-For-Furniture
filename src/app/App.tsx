import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard, Users, TrendingUp, ShoppingBag, Package,
  Bell, Search, Plus, ArrowUpRight, ArrowDownRight, Settings,
  MoreHorizontal, CalendarDays, ChevronLeft, ChevronRight,
  Clock, MapPin, X, Check, User,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", value: 198 },
  { month: "Feb", value: 215 },
  { month: "Mar", value: 242 },
  { month: "Apr", value: 228 },
  { month: "May", value: 267 },
  { month: "Jun", value: 284 },
];

const clients = [
  { id: 1, name: "Helena Marchetti", company: "Marchetti Interiors", email: "h.marchetti@mi.com", spend: 84200, orders: 7, status: "VIP", since: "Mar 2022" },
  { id: 2, name: "Thomas Briggs", company: "Briggs & Co.", email: "t.briggs@briggsco.com", spend: 61500, orders: 5, status: "Active", since: "Jul 2022" },
  { id: 3, name: "Akemi Nakamura", company: "Nakamura Design Studio", email: "a.nakamura@nds.jp", spend: 52800, orders: 4, status: "Active", since: "Nov 2022" },
  { id: 4, name: "Laurent Dubois", company: "Maison Dubois", email: "l.dubois@maison.fr", spend: 43100, orders: 3, status: "Active", since: "Feb 2023" },
  { id: 5, name: "Sofia Reyes", company: "Reyes Architecture", email: "s.reyes@reyesarch.com", spend: 38600, orders: 6, status: "Active", since: "Apr 2023" },
  { id: 6, name: "James Whitfield", company: "Whitfield Estates", email: "j.whitfield@we.com", spend: 29400, orders: 2, status: "Inactive", since: "Aug 2023" },
  { id: 7, name: "Priya Kapoor", company: "Kapoor Living", email: "p.kapoor@kl.in", spend: 21800, orders: 3, status: "Active", since: "Oct 2023" },
];

const orders = [
  { id: "ORD-2847", client: "Helena Marchetti", items: "Palermo Sectional + Side Tables ×2", value: 12400, status: "In Production", date: "Jun 14, 2026", photo: "https://images.unsplash.com/photo-1605365070248-299a182a2ca6?w=80&h=60&fit=crop&auto=format" },
  { id: "ORD-2846", client: "Thomas Briggs", items: "Ojai Dining Table + Chairs ×6", value: 8900, status: "Ready to Ship", date: "Jun 12, 2026", photo: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=80&h=60&fit=crop&auto=format" },
  { id: "ORD-2845", client: "Akemi Nakamura", items: "Kyoto Platform Bed — King", value: 6200, status: "Delivered", date: "Jun 10, 2026", photo: "https://images.unsplash.com/photo-1633948393301-d43e3ec0e5cd?w=80&h=60&fit=crop&auto=format" },
  { id: "ORD-2844", client: "Laurent Dubois", items: "Provence Armoire + Bedside Tables ×2", value: 9800, status: "In Production", date: "Jun 9, 2026", photo: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=80&h=60&fit=crop&auto=format" },
  { id: "ORD-2843", client: "Sofia Reyes", items: "Mesa Coffee Table + Ottoman", value: 4100, status: "Quote Sent", date: "Jun 7, 2026", photo: "https://images.unsplash.com/photo-1585894943534-bb85647ed7c0?w=80&h=60&fit=crop&auto=format" },
  { id: "ORD-2842", client: "James Whitfield", items: "Baldwin Lounge Chair ×4", value: 7600, status: "Delivered", date: "Jun 3, 2026", photo: "https://images.unsplash.com/photo-1649511134921-67afc567280c?w=80&h=60&fit=crop&auto=format" },
];

const leads = [
  { id: 1, name: "Carla Fontaine", source: "Referral", value: 18000, stage: "Discovery", lastContact: "2 days ago" },
  { id: 2, name: "Ravi Sethi", source: "Website", value: 9500, stage: "Proposal", lastContact: "4 days ago" },
  { id: 3, name: "Marta Kovacs", source: "Trade Show", value: 24000, stage: "Negotiation", lastContact: "1 day ago" },
  { id: 4, name: "Ben Travers", source: "Instagram", value: 6200, stage: "Discovery", lastContact: "6 days ago" },
  { id: 5, name: "Yuki Tanaka", source: "Referral", value: 31000, stage: "Proposal", lastContact: "Today" },
];

const products = [
  { id: "SKU-1041", name: "Palermo Sectional", category: "Seating", price: 8400, stock: 3, lead: "8 wks", photo: "https://images.unsplash.com/photo-1605365070248-299a182a2ca6?w=600&h=400&fit=crop&auto=format" },
  { id: "SKU-1032", name: "Ojai Dining Table", category: "Tables", price: 3200, stock: 7, lead: "4 wks", photo: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=600&h=400&fit=crop&auto=format" },
  { id: "SKU-1028", name: "Kyoto Platform Bed", category: "Beds", price: 4800, stock: 2, lead: "6 wks", photo: "https://images.unsplash.com/photo-1633948393301-d43e3ec0e5cd?w=600&h=400&fit=crop&auto=format" },
  { id: "SKU-1019", name: "Provence Armoire", category: "Storage", price: 5600, stock: 1, lead: "10 wks", photo: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&h=400&fit=crop&auto=format" },
  { id: "SKU-1015", name: "Baldwin Lounge Chair", category: "Seating", price: 1900, stock: 12, lead: "3 wks", photo: "https://images.unsplash.com/photo-1649511134921-67afc567280c?w=600&h=400&fit=crop&auto=format" },
  { id: "SKU-1009", name: "Mesa Coffee Table", category: "Tables", price: 2100, stock: 5, lead: "4 wks", photo: "https://images.unsplash.com/photo-1585894943534-bb85647ed7c0?w=600&h=400&fit=crop&auto=format" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// ─── Bookings Data ───────────────────────────────────────────────────────────

type BookingType = "Showroom Visit" | "Design Consultation" | "Delivery" | "Installation";
type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

interface Booking {
  id: string;
  client: string;
  type: BookingType;
  date: string; // "2026-06-DD"
  time: string;
  duration: string;
  location: string;
  status: BookingStatus;
  note?: string;
}

const bookingsData: Booking[] = [
  { id: "BK-401", client: "Helena Marchetti", type: "Design Consultation", date: "2026-06-17", time: "10:00 AM", duration: "90 min", location: "Showroom, Level 2", status: "Confirmed", note: "Reviewing fabric swatches for Palermo sectional" },
  { id: "BK-402", client: "Marta Kovacs", type: "Showroom Visit", date: "2026-06-17", time: "2:00 PM", duration: "60 min", location: "Showroom, Level 1", status: "Confirmed" },
  { id: "BK-403", client: "Thomas Briggs", type: "Delivery", date: "2026-06-18", time: "9:00 AM", duration: "2 hrs", location: "42 Kingsway, London", status: "Confirmed", note: "Ojai dining set — elevator access confirmed" },
  { id: "BK-404", client: "Ravi Sethi", type: "Design Consultation", date: "2026-06-18", time: "3:30 PM", duration: "60 min", location: "Virtual / Zoom", status: "Pending" },
  { id: "BK-405", client: "Akemi Nakamura", type: "Installation", date: "2026-06-19", time: "8:00 AM", duration: "3 hrs", location: "14 Harrington Rd, Chelsea", status: "Confirmed", note: "Kyoto Platform Bed installation — 2 crew" },
  { id: "BK-406", client: "Yuki Tanaka", type: "Showroom Visit", date: "2026-06-19", time: "11:30 AM", duration: "90 min", location: "Showroom, Level 1", status: "Confirmed" },
  { id: "BK-407", client: "Laurent Dubois", type: "Design Consultation", date: "2026-06-20", time: "10:00 AM", duration: "60 min", location: "Showroom, Level 2", status: "Pending", note: "Discussing Provence bedroom collection" },
  { id: "BK-408", client: "Carla Fontaine", type: "Showroom Visit", date: "2026-06-20", time: "1:00 PM", duration: "60 min", location: "Showroom, Level 1", status: "Pending" },
  { id: "BK-409", client: "Sofia Reyes", type: "Delivery", date: "2026-06-23", time: "10:00 AM", duration: "2 hrs", location: "7 Blenheim Terrace, NW8", status: "Confirmed" },
  { id: "BK-410", client: "Priya Kapoor", type: "Design Consultation", date: "2026-06-24", time: "2:30 PM", duration: "90 min", location: "Virtual / Zoom", status: "Confirmed", note: "Full living room concept for new apartment" },
  { id: "BK-411", client: "Ben Travers", type: "Showroom Visit", date: "2026-06-25", time: "11:00 AM", duration: "60 min", location: "Showroom, Level 1", status: "Pending" },
  { id: "BK-412", client: "James Whitfield", type: "Installation", date: "2026-06-26", time: "9:00 AM", duration: "4 hrs", location: "Whitfield Estate, Surrey", status: "Confirmed" },
];

const typeColors: Record<BookingType, { bg: string; text: string; dot: string }> = {
  "Showroom Visit": { bg: "rgba(196,112,63,0.1)", text: "#C4703F", dot: "#C4703F" },
  "Design Consultation": { bg: "rgba(93,140,100,0.1)", text: "#3E7A52", dot: "#3E7A52" },
  "Delivery": { bg: "rgba(74,112,170,0.1)", text: "#3A6FAA", dot: "#3A6FAA" },
  "Installation": { bg: "rgba(130,90,180,0.1)", text: "#7B4FC5", dot: "#7B4FC5" },
};

const statusDot: Record<BookingStatus, string> = {
  Confirmed: "#3E7A52",
  Pending: "#C4703F",
  Completed: "#78716C",
  Cancelled: "#B85C58",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

type View = "dashboard" | "clients" | "orders" | "leads" | "products" | "bookings";

const statusColors: Record<string, string> = {
  "In Production": "bg-amber-100 text-amber-800",
  "Ready to Ship": "bg-blue-100 text-blue-800",
  "Delivered": "bg-emerald-100 text-emerald-700",
  "Quote Sent": "bg-purple-100 text-purple-700",
};

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function Initials({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const letters = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div
      className={`rounded-full bg-stone-200 flex items-center justify-center font-semibold text-stone-600 flex-shrink-0 ${size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-xs"}`}
    >
      {letters}
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  const nav = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "clients" as View, label: "Clients", icon: Users },
    { id: "leads" as View, label: "Leads", icon: TrendingUp },
    { id: "orders" as View, label: "Orders", icon: ShoppingBag },
    { id: "products" as View, label: "Products", icon: Package },
    { id: "bookings" as View, label: "Bookings", icon: CalendarDays },
  ];

  return (
    <div
      className="flex h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{ background: "#1C1410" }}>
        {/* Brand */}
        <div className="px-6 pt-8 pb-7">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "#C4703F" }}
            >
              <span className="text-white text-xs font-bold tracking-wide">N</span>
            </div>
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ color: "#EDE9E2", fontFamily: "'Playfair Display', serif" }}
            >
              Demo
            </span>
          </div>
          <p className="text-[10px] mt-1.5 tracking-widest uppercase" style={{ color: "rgba(237,233,226,0.4)" }}>
            Furniture CRM
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
              style={{
                background: view === id ? "#C4703F" : "transparent",
                color: view === id ? "#FDFAF6" : "rgba(237,233,226,0.5)",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Divider + metrics pill */}
        <div className="mx-4 mb-4 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(237,233,226,0.35)" }}>Q2 Pipeline</p>
          <p className="text-lg font-semibold" style={{ color: "#EDE9E2", fontFamily: "'Playfair Display', serif" }}>$1.24M</p>
          <div className="flex items-center gap-1 mt-0.5">
            <ArrowUpRight size={11} style={{ color: "#6EBA8A" }} />
            <span className="text-xs" style={{ color: "#6EBA8A" }}>+18% vs Q1</span>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pb-6 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{ background: "#4A3728", color: "#EDE9E2" }}
            >
              NW
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: "#EDE9E2" }}>Navnit Kumar</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(237,233,226,0.4)" }}>Sales Director</p>
            </div>
            <Settings size={13} style={{ color: "rgba(237,233,226,0.3)", cursor: "pointer" }} />
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-8 py-4 bg-card"
          style={{ borderBottom: "1px solid rgba(28,20,16,0.09)" }}
        >
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#78716C" }} />
            <input
              type="text"
              placeholder="Search clients, orders, products…"
              className="w-full rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all"
              style={{
                background: "#EDE9E2",
                border: "1px solid transparent",
                color: "#1C1917",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell size={17} style={{ color: "#78716C" }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#C4703F" }} />
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 transition-colors hover:opacity-90"
              style={{ background: "#2C2420", color: "#FDFAF6" }}
            >
              <Plus size={14} />
              New
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {view === "dashboard" && <Dashboard setView={setView} />}
          {view === "clients" && <Clients />}
          {view === "orders" && <Orders />}
          {view === "leads" && <Leads />}
          {view === "products" && <Products />}
          {view === "bookings" && <Bookings />}
        </main>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ setView }: { setView: (v: View) => void }) {
  const kpis = [
    { label: "Monthly Revenue", value: "$284,500", delta: "+12.4%", up: true, sub: "vs last month" },
    { label: "Active Orders", value: "47", delta: "+8", up: true, sub: "in production" },
    { label: "New Leads", value: "23", delta: "+5", up: true, sub: "this month" },
    { label: "Active Clients", value: "312", delta: "-2", up: false, sub: "vs last month" },
  ];

  return (
    <div className="space-y-7 max-w-[1200px]">
      <div>
        <h1
          className="text-2xl font-semibold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Good morning, Navnit
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tuesday, June 17, 2026 &middot; Q2 is tracking 18% ahead of last year
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{k.label}</p>
            <p
              className="text-[1.6rem] font-semibold text-foreground mt-2 leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {k.value}
            </p>
            <div className="flex items-center gap-1.5 mt-2.5">
              {k.up
                ? <ArrowUpRight size={13} style={{ color: "#4A9D6A" }} />
                : <ArrowDownRight size={13} style={{ color: "#B85C58" }} />}
              <span className="text-xs font-medium" style={{ color: k.up ? "#4A9D6A" : "#B85C58" }}>{k.delta}</span>
              <span className="text-xs text-muted-foreground">{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + top clients */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Revenue Trend
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">January — June 2026</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#C4703F" }} />
              Revenue (&times; $1k)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={196}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C4703F" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#C4703F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(28,20,16,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#78716C" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#78716C" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1C1410", border: "none", borderRadius: 8, color: "#EDE9E2", fontSize: 12 }}
                formatter={(v: number) => [`$${v}k`, "Revenue"]}
              />
              <Area type="monotone" dataKey="value" stroke="#C4703F" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#C4703F" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top clients */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
          <h2 className="font-semibold text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Top Clients
          </h2>
          <div className="flex-1 space-y-3.5">
            {clients.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 flex-shrink-0">{i + 1}</span>
                <Initials name={c.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{c.company}</p>
                </div>
                <span className="text-xs font-medium text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {fmt(c.spend)}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setView("clients")}
            className="mt-5 w-full text-xs text-center py-2 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            View all clients →
          </button>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(28,20,16,0.08)" }}>
          <h2 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Orders
          </h2>
          <button
            onClick={() => setView("orders")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="divide-y divide-border">
          {orders.slice(0, 5).map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-4 px-6 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <span
                className="text-xs text-muted-foreground w-[88px] flex-shrink-0"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {o.id}
              </span>
              <div className="w-12 h-9 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                <img src={o.photo} alt={o.items} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{o.client}</p>
                <p className="text-xs text-muted-foreground truncate">{o.items}</p>
              </div>
              <span
                className="text-sm font-medium text-foreground w-24 text-right"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {fmt(o.value)}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-32 text-center flex-shrink-0 ${statusColors[o.status]}`}>
                {o.status}
              </span>
              <span className="text-xs text-muted-foreground w-28 text-right flex-shrink-0">{o.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Clients ─────────────────────────────────────────────────────────────────

function Clients() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Clients
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{clients.length} total · {fmt(clients.reduce((s, c) => s + c.spend, 0))} lifetime value</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ background: "#2C2420", color: "#FDFAF6" }}
        >
          <Plus size={14} />
          Add Client
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#78716C" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients…"
          className="w-full rounded-lg pl-9 pr-4 py-2 text-sm outline-none"
          style={{ background: "#EDE9E2", border: "1px solid transparent", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(28,20,16,0.08)", background: "rgba(232,227,218,0.4)" }}>
              {["Client", "Company", "Total Spend", "Orders", "Status", "Since"].map((h) => (
                <th
                  key={h}
                  className={`text-[10px] text-muted-foreground font-medium py-3 uppercase tracking-widest ${h === "Total Spend" || h === "Orders" ? "text-right px-4" : "text-left px-4 first:px-6"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-muted/20 transition-colors cursor-pointer"
                style={{ borderBottom: "1px solid rgba(28,20,16,0.06)" }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Initials name={c.name} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-foreground">{c.company}</td>
                <td className="px-4 py-4 text-sm font-medium text-foreground text-right" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {fmt(c.spend)}
                </td>
                <td className="px-4 py-4 text-sm text-foreground text-right">{c.orders}</td>
                <td className="px-4 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.status === "VIP"
                      ? "text-[#C4703F]"
                      : c.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                      }`}
                    style={c.status === "VIP" ? { background: "rgba(196,112,63,0.12)" } : {}}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{c.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Orders ──────────────────────────────────────────────────────────────────

function Orders() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Quote Sent", "In Production", "Ready to Ship", "Delivered"];
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {orders.length} orders &middot; {fmt(orders.reduce((s, o) => s + o.value, 0))} total value
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ background: "#2C2420", color: "#FDFAF6" }}
        >
          <Plus size={14} />
          New Order
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              filter === s
                ? { background: "#2C2420", color: "#FDFAF6" }
                : { background: "#FDFAF6", border: "1px solid rgba(28,20,16,0.12)", color: "#78716C" }
            }
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(28,20,16,0.08)", background: "rgba(232,227,218,0.4)" }}>
              {["Order ID", "", "Client", "Items", "Value", "Status", "Date"].map((h) => (
                <th
                  key={h}
                  className={`text-[10px] text-muted-foreground font-medium py-3 uppercase tracking-widest text-left ${h === "Value" ? "text-right px-4" : "px-4 first:px-6"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-muted/20 transition-colors cursor-pointer"
                style={{ borderBottom: "1px solid rgba(28,20,16,0.06)" }}
              >
                <td className="px-6 py-4 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {o.id}
                </td>
                <td className="px-2 py-3">
                  <div className="w-14 h-10 rounded-lg overflow-hidden bg-stone-100">
                    <img src={o.photo} alt={o.items} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-foreground">{o.client}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground max-w-[220px] truncate">{o.items}</td>
                <td className="px-4 py-4 text-sm font-medium text-foreground text-right" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {fmt(o.value)}
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Leads ───────────────────────────────────────────────────────────────────

function Leads() {
  const stages = ["Discovery", "Proposal", "Negotiation"];
  const stageColors: Record<string, { bg: string; text: string }> = {
    Discovery: { bg: "#EDE9E2", text: "#78716C" },
    Proposal: { bg: "rgba(196,112,63,0.12)", text: "#C4703F" },
    Negotiation: { bg: "rgba(93,140,100,0.12)", text: "#3E7A52" },
  };

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Leads Pipeline
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {leads.length} active leads &middot; {fmt(leads.reduce((s, l) => s + l.value, 0))} estimated value
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ background: "#2C2420", color: "#FDFAF6" }}
        >
          <Plus size={14} />
          Add Lead
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          const col = stageColors[stage];
          return (
            <div key={stage} className="bg-muted/40 border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: col.bg, color: col.text }}
                  >
                    {stage}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {stageLeads.length} &middot; {fmt(stageLeads.reduce((s, l) => s + l.value, 0))}
                </span>
              </div>
              <div className="space-y-3">
                {stageLeads.map((l) => (
                  <div
                    key={l.id}
                    className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold text-foreground">{l.name}</p>
                      <MoreHorizontal size={14} className="text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">via {l.source}</p>
                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(28,20,16,0.07)" }}>
                      <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {fmt(l.value)}
                      </span>
                      <span className="text-xs text-muted-foreground">{l.lastContact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Products ────────────────────────────────────────────────────────────────

function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Product Catalog
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} items</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ background: "#2C2420", color: "#FDFAF6" }}
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              activeCategory === cat
                ? { background: "#2C2420", color: "#FDFAF6" }
                : { background: "#FDFAF6", border: "1px solid rgba(28,20,16,0.12)", color: "#78716C" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Photo */}
            <div className="relative h-48 bg-stone-100 overflow-hidden">
              <img
                src={p.photo}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span
                className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded font-medium tracking-widest uppercase"
                style={{ background: "rgba(253,250,246,0.92)", color: "#78716C", fontFamily: "'DM Mono', monospace" }}
              >
                {p.id}
              </span>
              <span
                className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${p.stock <= 2 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
              >
                {p.stock <= 2 ? "Low stock" : "Available"}
              </span>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="text-base font-semibold text-foreground group-hover:text-[#C4703F] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.category}</p>
                </div>
                <span
                  className="text-lg font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {fmt(p.price)}
                </span>
              </div>
              <div
                className="flex items-center gap-8 mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(28,20,16,0.07)" }}
              >
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">In Stock</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{p.stock} units</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Lead Time</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{p.lead}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bookings ────────────────────────────────────────────────────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Bookings() {
  const [cursor, setCursor] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState<string>("2026-06-17");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client: "", type: "Showroom Visit" as BookingType, date: "", time: "", duration: "60 min", location: "", note: "" });
  const [localBookings, setLocalBookings] = useState<Booking[]>(bookingsData);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );
  while (cells.length % 7 !== 0) cells.push(null);

  function dateStr(d: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  const dayBookings = localBookings.filter((b) => b.date === selectedDate);
  const allUpcoming = localBookings
    .filter((b) => b.date >= "2026-06-17" && b.status !== "Cancelled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  function handleBook() {
    if (!form.client || !form.date || !form.time) return;
    const newB: Booking = {
      id: `BK-${500 + localBookings.length}`,
      client: form.client,
      type: form.type,
      date: form.date,
      time: form.time,
      duration: form.duration,
      location: form.location || "Showroom, Level 1",
      status: "Pending",
      note: form.note || undefined,
    };
    setLocalBookings((prev) => [...prev, newB]);
    setSelectedDate(form.date);
    setForm({ client: "", type: "Showroom Visit", date: "", time: "", duration: "60 min", location: "", note: "" });
    setShowForm(false);
  }

  function cancelBooking(id: string) {
    setLocalBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "Cancelled" as BookingStatus } : b));
    setConfirmId(null);
  }

  function confirmBooking(id: string) {
    setLocalBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "Confirmed" as BookingStatus } : b));
  }

  const selParts = selectedDate.split("-");
  const selLabel = `${MONTHS[parseInt(selParts[1]) - 1]} ${parseInt(selParts[2])}, ${selParts[0]}`;

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {localBookings.filter((b) => b.status === "Confirmed").length} confirmed &middot; {localBookings.filter((b) => b.status === "Pending").length} pending
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ background: "#2C2420", color: "#FDFAF6" }}
        >
          <Plus size={14} />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left: calendar + day detail */}
        <div className="space-y-5">
          {/* Calendar */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(28,20,16,0.08)" }}>
              <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft size={16} className="text-muted-foreground" />
              </button>
              <h2 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {MONTHS[month]} {year}
              </h2>
              <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-7 px-4 pt-3 pb-1">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px px-4 pb-4">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const ds = dateStr(day);
                const isToday = ds === "2026-06-17";
                const isSelected = ds === selectedDate;
                const count = localBookings.filter((b) => b.date === ds && b.status !== "Cancelled").length;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(ds)}
                    className="relative flex flex-col items-center py-2 rounded-lg transition-all"
                    style={{ background: isSelected ? "#2C2420" : isToday ? "rgba(196,112,63,0.1)" : "transparent" }}
                  >
                    <span className="text-sm font-medium" style={{ color: isSelected ? "#FDFAF6" : isToday ? "#C4703F" : "#1C1917" }}>
                      {day}
                    </span>
                    {count > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                          <span key={j} className="w-1 h-1 rounded-full" style={{ background: isSelected ? "rgba(253,250,246,0.6)" : "#C4703F" }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day appointments */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(28,20,16,0.08)" }}>
              <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{selLabel}</h3>
              <span className="text-xs text-muted-foreground">{dayBookings.length} appointment{dayBookings.length !== 1 ? "s" : ""}</span>
            </div>

            {dayBookings.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <CalendarDays size={28} className="mx-auto mb-3 text-muted-foreground opacity-30" />
                <p className="text-sm text-muted-foreground">No bookings on this day</p>
                <button
                  onClick={() => { setForm((f) => ({ ...f, date: selectedDate })); setShowForm(true); }}
                  className="mt-2 text-xs font-medium"
                  style={{ color: "#C4703F" }}
                >
                  + Schedule one
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {dayBookings.map((b) => {
                  const tc = typeColors[b.type];
                  return (
                    <div key={b.id} className="px-6 py-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-20 flex-shrink-0 pt-0.5">
                          <p className="text-xs font-semibold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{b.time}</p>
                          <p className="text-[11px] text-muted-foreground">{b.duration}</p>
                        </div>
                        <div className="w-0.5 self-stretch rounded-full flex-shrink-0" style={{ background: tc.dot }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: tc.bg, color: tc.text }}>{b.type}</span>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusDot[b.status] }} />
                              <span className="text-xs text-muted-foreground">{b.status}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {b.status === "Pending" && (
                                <button onClick={() => confirmBooking(b.id)} className="p-1 rounded hover:bg-emerald-50 transition-colors" title="Confirm">
                                  <Check size={13} style={{ color: "#3E7A52" }} />
                                </button>
                              )}
                              {b.status !== "Cancelled" && b.status !== "Completed" && (
                                <button onClick={() => setConfirmId(confirmId === b.id ? null : b.id)} className="p-1 rounded hover:bg-red-50 transition-colors" title="Cancel">
                                  <X size={13} style={{ color: "#B85C58" }} />
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-foreground mt-1.5">{b.client}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <MapPin size={11} className="text-muted-foreground flex-shrink-0" />
                            <p className="text-xs text-muted-foreground truncate">{b.location}</p>
                          </div>
                          {b.note && <p className="text-xs text-muted-foreground mt-1.5 italic">&ldquo;{b.note}&rdquo;</p>}
                          {confirmId === b.id && (
                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">Cancel this booking?</p>
                              <button onClick={() => cancelBooking(b.id)} className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "#B85C58", color: "#fff" }}>Yes, cancel</button>
                              <button onClick={() => setConfirmId(null)} className="text-xs text-muted-foreground hover:text-foreground">Keep</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(28,20,16,0.08)" }}>
              <h3 className="font-semibold text-foreground text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Upcoming</h3>
            </div>
            <div className="divide-y divide-border">
              {allUpcoming.map((b) => {
                const tc = typeColors[b.type];
                const parts = b.date.split("-");
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedDate(b.date)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-semibold" style={{ background: tc.bg, color: tc.text }}>
                      {parseInt(parts[2])}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{b.client}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{b.type} · {b.time}</p>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusDot[b.status] }} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-3">Appointment Types</p>
            <div className="space-y-2.5">
              {(Object.entries(typeColors) as [BookingType, { bg: string; text: string; dot: string }][]).map(([type, col]) => (
                <div key={type} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: col.dot }} />
                  <span className="text-xs text-foreground">{type}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(28,20,16,0.07)" }}>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-3">Status</p>
              <div className="space-y-2">
                {(Object.entries(statusDot) as [BookingStatus, string][]).map(([s, color]) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New booking modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(28,20,16,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(28,20,16,0.08)" }}>
              <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>New Booking</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Client</label>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    list="client-list"
                    value={form.client}
                    onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                    placeholder="Search or enter name…"
                    className="w-full rounded-lg pl-8 pr-3 py-2.5 text-sm outline-none"
                    style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <datalist id="client-list">
                    {clients.map((c) => <option key={c.id} value={c.name} />)}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as BookingType }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none appearance-none"
                  style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {(["Showroom Visit", "Design Consultation", "Delivery", "Installation"] as BookingType[]).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Duration</label>
                  <select
                    value={form.duration}
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none appearance-none"
                    style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {["30 min", "60 min", "90 min", "2 hrs", "3 hrs", "4 hrs"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="Showroom, Level 1"
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider">
                  Note <span className="normal-case text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  rows={2}
                  placeholder="Any details for the appointment…"
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none resize-none"
                  style={{ background: "#EDE9E2", color: "#1C1917", fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "#2C2420", color: "#FDFAF6" }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
