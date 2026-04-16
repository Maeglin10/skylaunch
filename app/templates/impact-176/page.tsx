import { motion } from "framer-motion";
import "../premium.css";

export default function EssentialDashboard() {
  return (
    <div className="bg-[#f8f9fa] text-[#212529] min-h-screen font-sans flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
            <div className="font-black text-xl text-indigo-600">MetricFlow<span className="text-gray-300">.</span></div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
            <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg font-bold text-sm">Dashboard</div>
            <div className="text-gray-600 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 cursor-pointer">Analytics</div>
            <div className="text-gray-600 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 cursor-pointer">Customers</div>
            <div className="text-gray-600 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 cursor-pointer">Transactions</div>
            <div className="text-gray-600 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 cursor-pointer">Settings</div>
        </nav>
        <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">JD</div>
                <div>
                    <div className="text-sm font-bold">Jane Doe</div>
                    <div className="text-xs text-gray-500">Admin</div>
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* TOPNAV */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="font-bold text-lg md:hidden">MetricFlow</div>
            <div className="hidden md:block">
                <input type="text" placeholder="Search..." className="bg-gray-100 border-none rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Overview</h1>
                    <p className="text-gray-500 text-sm">Welcome back, here's what's happening today.</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700">Download Report</button>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { title: "Total Revenue", val: "$45,231.89", trend: "+20.1% from last month", pos: true },
                    { title: "Active Users", val: "2,350", trend: "+15% from last month", pos: true },
                    { title: "Churn Rate", val: "2.4%", trend: "-0.5% from last month", pos: true }
                ].map((kpi, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm font-semibold text-gray-500 mb-2">{kpi.title}</div>
                        <div className="text-3xl font-bold mb-2">{kpi.val}</div>
                        <div className={`text-xs font-semibold ${kpi.pos ? 'text-emerald-600' : 'text-red-600'}`}>{kpi.trend}</div>
                    </motion.div>
                ))}
            </div>

            {/* CHARTS / DATA PLACEHOLDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
                    <h3 className="font-bold mb-6">Revenue Overview</h3>
                    <div className="w-full h-[300px] flex items-end justify-between gap-2 pb-6 border-b border-gray-100">
                        {/* Placeholder bar chart */}
                        {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-100 rounded-t-sm relative group cursor-pointer" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-0 w-full bg-indigo-600 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { action: "New subscription", user: "Alice M.", time: "2 min ago" },
                            { action: "Refund requested", user: "Bob T.", time: "1 hr ago" },
                            { action: "Plan upgraded", user: "Charlie D.", time: "4 hrs ago" },
                            { action: "Account deleted", user: "Diana Prince", time: "Yesterday" }
                        ].map((act, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"></div>
                                <div>
                                    <div className="text-sm font-bold">{act.action}</div>
                                    <div className="text-xs text-gray-500">{act.user} • {act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
