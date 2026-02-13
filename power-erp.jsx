import React, { useState, useEffect } from 'react';
import { 
  Zap, Users, DollarSign, Package, Wrench, FileText, TrendingUp,
  Power, Activity, AlertTriangle, CheckCircle, Clock, MapPin,
  Search, Filter, Download, Upload, Settings, Bell, Menu, X,
  Plus, Edit, Trash2, Eye, ChevronRight, ChevronDown, Calendar,
  BarChart3, PieChart, LineChart, Grid, List, Map
} from 'lucide-react';

// Utility Functions
const formatCurrency = (amount) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const formatDateTime = (date) => new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

// Main ERP Application
export default function PowerSupplyERP() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data
  const [utilityData, setUtilityData] = useState({
    activePlants: 24,
    totalCapacity: '15,400 MW',
    currentLoad: '12,850 MW',
    efficiency: 83.5,
    outages: 3,
    maintenanceScheduled: 8
  });

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corporation', accountNo: 'AC-10245', type: 'Commercial', balance: 15420.50, status: 'Active', consumption: 45800 },
    { id: 2, name: 'Tech Industries Ltd', accountNo: 'TI-10892', type: 'Industrial', balance: 0, status: 'Active', consumption: 128500 },
    { id: 3, name: 'John Smith', accountNo: 'JS-20441', type: 'Residential', balance: 245.80, status: 'Active', consumption: 850 },
    { id: 4, name: 'Green Energy Co', accountNo: 'GE-15678', type: 'Commercial', balance: 8920.00, status: 'Pending', consumption: 32100 },
    { id: 5, name: 'Downtown Mall', accountNo: 'DM-18234', type: 'Commercial', balance: 0, status: 'Active', consumption: 76400 }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-2024-1001', customer: 'Acme Corporation', amount: 15420.50, dueDate: '2024-02-28', status: 'Overdue' },
    { id: 'INV-2024-1002', customer: 'Tech Industries Ltd', amount: 42850.00, dueDate: '2024-03-15', status: 'Paid' },
    { id: 'INV-2024-1003', customer: 'John Smith', amount: 245.80, dueDate: '2024-03-10', status: 'Pending' },
    { id: 'INV-2024-1004', customer: 'Green Energy Co', amount: 8920.00, dueDate: '2024-03-12', status: 'Pending' },
    { id: 'INV-2024-1005', customer: 'Downtown Mall', amount: 25100.00, dueDate: '2024-03-08', status: 'Paid' }
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, item: 'Power Transformers', category: 'Equipment', quantity: 45, unit: 'Units', minStock: 20, supplier: 'ElectroCorp', lastOrdered: '2024-01-15' },
    { id: 2, item: 'Copper Cables (10mm)', category: 'Materials', quantity: 8500, unit: 'Meters', minStock: 5000, supplier: 'CableTech', lastOrdered: '2024-02-01' },
    { id: 3, item: 'Circuit Breakers', category: 'Equipment', quantity: 180, unit: 'Units', minStock: 100, supplier: 'SafetyFirst', lastOrdered: '2024-01-28' },
    { id: 4, item: 'Insulation Material', category: 'Materials', quantity: 320, unit: 'Rolls', minStock: 200, supplier: 'InsulPro', lastOrdered: '2024-02-05' },
    { id: 5, item: 'Smart Meters', category: 'Equipment', quantity: 1200, unit: 'Units', minStock: 500, supplier: 'MeterTech', lastOrdered: '2024-01-20' }
  ]);

  const [workOrders, setWorkOrders] = useState([
    { id: 'WO-5401', type: 'Maintenance', priority: 'High', assignee: 'Team A', location: 'Substation #12', status: 'In Progress', scheduledDate: '2024-02-15' },
    { id: 'WO-5402', type: 'Repair', priority: 'Critical', assignee: 'Team B', location: 'Distribution Line 45', status: 'Assigned', scheduledDate: '2024-02-14' },
    { id: 'WO-5403', type: 'Installation', priority: 'Medium', assignee: 'Team C', location: 'New Development Area', status: 'Scheduled', scheduledDate: '2024-02-18' },
    { id: 'WO-5404', type: 'Inspection', priority: 'Low', assignee: 'Team A', location: 'Grid Section 8', status: 'Completed', scheduledDate: '2024-02-13' },
    { id: 'WO-5405', type: 'Emergency', priority: 'Critical', assignee: 'Team D', location: 'Residential Zone 3', status: 'In Progress', scheduledDate: '2024-02-14' }
  ]);

  const [powerPlants, setPowerPlants] = useState([
    { id: 1, name: 'Central Coal Plant', type: 'Coal', capacity: 2500, current: 2100, status: 'Operational', efficiency: 85 },
    { id: 2, name: 'Solar Farm Alpha', type: 'Solar', capacity: 500, current: 420, status: 'Operational', efficiency: 84 },
    { id: 3, name: 'Wind Park Beta', type: 'Wind', capacity: 800, current: 650, status: 'Operational', efficiency: 81 },
    { id: 4, name: 'Hydro Station 1', type: 'Hydro', capacity: 1200, current: 1050, status: 'Operational', efficiency: 88 },
    { id: 5, name: 'Gas Turbine Plant', type: 'Natural Gas', capacity: 1500, current: 0, status: 'Maintenance', efficiency: 0 }
  ]);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Grid, color: 'from-blue-500 to-cyan-500' },
    { id: 'operations', name: 'Utility Operations', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'billing', name: 'Billing & Revenue', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { id: 'crm', name: 'Customer Management', icon: Users, color: 'from-purple-500 to-pink-500' },
    { id: 'inventory', name: 'Inventory & Procurement', icon: Package, color: 'from-indigo-500 to-blue-500' },
    { id: 'workforce', name: 'Workforce & Field Service', icon: Wrench, color: 'from-orange-500 to-red-500' },
    { id: 'finance', name: 'Finance & Compliance', icon: FileText, color: 'from-teal-500 to-cyan-500' },
    { id: 'analytics', name: 'Analytics & Forecasting', icon: TrendingUp, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-slate-950/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 flex flex-col shadow-2xl`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="text-slate-900" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">PowerGrid</h1>
                <p className="text-xs text-slate-400">Enterprise ERP</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? `bg-gradient-to-r ${module.color} text-white shadow-lg` 
                    : 'hover:bg-slate-800/50 text-slate-300'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{module.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700/50">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-slate-400">System Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-950/30 backdrop-blur-xl border-b border-slate-700/50 px-8 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search customers, invoices, work orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3 hover:bg-slate-800 rounded-xl transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-3 hover:bg-slate-800 rounded-xl transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeModule === 'dashboard' && <Dashboard utilityData={utilityData} customers={customers} invoices={invoices} workOrders={workOrders} />}
          {activeModule === 'operations' && <UtilityOperations powerPlants={powerPlants} utilityData={utilityData} />}
          {activeModule === 'billing' && <BillingRevenue invoices={invoices} />}
          {activeModule === 'crm' && <CustomerManagement customers={customers} />}
          {activeModule === 'inventory' && <InventoryProcurement inventory={inventory} />}
          {activeModule === 'workforce' && <WorkforceFieldService workOrders={workOrders} />}
          {activeModule === 'finance' && <FinanceCompliance invoices={invoices} />}
          {activeModule === 'analytics' && <AnalyticsForecasting utilityData={utilityData} customers={customers} />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ utilityData, customers, invoices, workOrders }) {
  const stats = [
    { label: 'Active Customers', value: customers.length.toLocaleString(), change: '+12%', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Monthly Revenue', value: '$1.2M', change: '+8.5%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Current Load', value: utilityData.currentLoad, change: `${utilityData.efficiency}%`, icon: Activity, color: 'from-yellow-500 to-orange-500' },
    { label: 'Active Work Orders', value: workOrders.filter(w => w.status !== 'Completed').length, change: '-3', icon: Wrench, color: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          System Overview
        </h2>
        <p className="text-slate-400">Real-time monitoring and operational insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-3 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power Generation Status */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Power className="text-yellow-400" size={24} />
              Power Generation Status
            </h3>
            <button className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
              <div>
                <p className="font-medium">Total Capacity</p>
                <p className="text-2xl font-bold text-yellow-400">{utilityData.totalCapacity}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Current Output</p>
                <p className="text-xl font-bold">{utilityData.currentLoad}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Active Plants</p>
                <p className="text-2xl font-bold text-green-400">{utilityData.activePlants}</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Outages</p>
                <p className="text-2xl font-bold text-red-400">{utilityData.outages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText className="text-green-400" size={24} />
              Recent Invoices
            </h3>
            <button className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {invoices.slice(0, 5).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-slate-400">{invoice.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">{formatCurrency(invoice.amount)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                    invoice.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Work Orders */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Wrench className="text-blue-400" size={24} />
              Active Work Orders
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {workOrders.filter(w => w.status !== 'Completed').slice(0, 4).map((order) => (
              <div key={order.id} className="p-3 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{order.id}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    order.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    order.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {order.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{order.location}</span>
                  <span className="text-slate-400">{order.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="text-orange-400" size={24} />
              System Alerts
            </h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="font-medium text-red-400">Critical Outage</p>
                  <p className="text-sm text-slate-300 mt-1">Distribution Line 45 - Residential Zone 3</p>
                  <p className="text-xs text-slate-400 mt-2">15 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Clock className="text-yellow-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="font-medium text-yellow-400">Maintenance Due</p>
                  <p className="text-sm text-slate-300 mt-1">Substation #12 - Scheduled maintenance overdue</p>
                  <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="font-medium text-blue-400">System Update</p>
                  <p className="text-sm text-slate-300 mt-1">Load balancing optimization completed</p>
                  <p className="text-xs text-slate-400 mt-2">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Operations Component
function UtilityOperations({ powerPlants, utilityData }) {
  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Utility Operations
          </h2>
          <p className="text-slate-400">Monitor and manage power generation facilities</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Add Plant
        </button>
      </div>

      {/* Grid Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Power size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-200">System Status</p>
              <p className="text-xl font-bold text-white">Operational</p>
            </div>
          </div>
          <p className="text-green-100 text-sm">All critical systems functioning normally</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Grid Efficiency</p>
              <p className="text-xl font-bold text-white">{utilityData.efficiency}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-900/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{ width: `${utilityData.efficiency}%` }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-200">Peak Demand</p>
              <p className="text-xl font-bold text-white">14,200 MW</p>
            </div>
          </div>
          <p className="text-purple-100 text-sm">Expected at 6:00 PM today</p>
        </div>
      </div>

      {/* Power Plants Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Power Generation Facilities</h3>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plant Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Capacity (MW)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Current Output</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Efficiency</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {powerPlants.map((plant) => (
                <tr key={plant.id} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium">{plant.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm">{plant.type}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{plant.capacity.toLocaleString()} MW</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-700/50 rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                          style={{ width: `${(plant.current / plant.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{plant.current} MW</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${plant.efficiency > 85 ? 'text-green-400' : plant.efficiency > 75 ? 'text-yellow-400' : 'text-slate-400'}`}>
                      {plant.efficiency}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      plant.status === 'Operational' ? 'bg-green-500/20 text-green-400' :
                      plant.status === 'Maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {plant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Settings">
                        <Settings size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Billing & Revenue Component
function BillingRevenue({ invoices }) {
  const [viewMode, setViewMode] = useState('list');
  
  const revenueStats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidRevenue: invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0),
    pendingRevenue: invoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdueRevenue: invoices.filter(i => i.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Billing & Revenue Management
          </h2>
          <p className="text-slate-400">Track invoices, payments, and revenue streams</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Create Invoice
        </button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(revenueStats.totalRevenue)}</p>
          <p className="text-green-400 text-sm mt-2">All time</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Collected</p>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(revenueStats.paidRevenue)}</p>
          <p className="text-slate-400 text-sm mt-2">{((revenueStats.paidRevenue / revenueStats.totalRevenue) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{formatCurrency(revenueStats.pendingRevenue)}</p>
          <p className="text-slate-400 text-sm mt-2">{invoices.filter(i => i.status === 'Pending').length} invoices</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Overdue</p>
          <p className="text-3xl font-bold text-red-400">{formatCurrency(revenueStats.overdueRevenue)}</p>
          <p className="text-slate-400 text-sm mt-2">{invoices.filter(i => i.status === 'Overdue').length} invoices</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Invoices</h3>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Invoice ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-blue-400">{invoice.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{invoice.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-green-400">{formatCurrency(invoice.amount)}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{formatDate(invoice.dueDate)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                      invoice.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Customer Management Component
function CustomerManagement({ customers }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Customer Relationship Management
          </h2>
          <p className="text-slate-400">Manage customer accounts and service requests</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Customers</p>
          <p className="text-3xl font-bold">{customers.length}</p>
          <p className="text-green-400 text-sm mt-2">+12% this month</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Residential</p>
          <p className="text-3xl font-bold text-blue-400">{customers.filter(c => c.type === 'Residential').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Commercial</p>
          <p className="text-3xl font-bold text-purple-400">{customers.filter(c => c.type === 'Commercial').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Industrial</p>
          <p className="text-3xl font-bold text-orange-400">{customers.filter(c => c.type === 'Industrial').length}</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Customer Accounts</h3>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Account No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Consumption (kWh)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{customer.accountNo}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      customer.type === 'Residential' ? 'bg-blue-500/20 text-blue-400' :
                      customer.type === 'Commercial' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{customer.consumption.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <p className={`font-bold ${customer.balance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {formatCurrency(customer.balance)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      customer.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="View Profile">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Contact">
                        <MapPin size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inventory & Procurement Component
function InventoryProcurement({ inventory }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Inventory & Procurement
          </h2>
          <p className="text-slate-400">Track equipment, materials, and purchase orders</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          New Purchase Order
        </button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Items</p>
          <p className="text-3xl font-bold">{inventory.length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Low Stock Items</p>
          <p className="text-3xl font-bold text-orange-400">{inventory.filter(i => i.quantity < i.minStock).length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Equipment</p>
          <p className="text-3xl font-bold text-blue-400">{inventory.filter(i => i.category === 'Equipment').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Materials</p>
          <p className="text-3xl font-bold text-purple-400">{inventory.filter(i => i.category === 'Materials').length}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Inventory Items</h3>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Item Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Min Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Ordered</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const isLowStock = item.quantity < item.minStock;
                return (
                  <tr key={item.id} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.item}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        item.category === 'Equipment' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-bold ${isLowStock ? 'text-orange-400' : 'text-green-400'}`}>
                        {item.quantity} {item.unit}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4 text-slate-300">{item.supplier}</td>
                    <td className="px-6 py-4 text-slate-300">{formatDate(item.lastOrdered)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Reorder">
                          <Plus size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="View History">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Workforce & Field Service Component
function WorkforceFieldService({ workOrders }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            Workforce & Field Service
          </h2>
          <p className="text-slate-400">Manage field teams and work orders</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Plus size={20} />
          Create Work Order
        </button>
      </div>

      {/* Work Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{workOrders.length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">In Progress</p>
          <p className="text-3xl font-bold text-blue-400">{workOrders.filter(w => w.status === 'In Progress').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Scheduled</p>
          <p className="text-3xl font-bold text-purple-400">{workOrders.filter(w => w.status === 'Scheduled').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Critical</p>
          <p className="text-3xl font-bold text-red-400">{workOrders.filter(w => w.priority === 'Critical').length}</p>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-400">{workOrders.filter(w => w.status === 'Completed').length}</p>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Work Orders</h3>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <Map size={16} />
                Map View
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Assignee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Scheduled Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((order) => (
                <tr key={order.id} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-blue-400">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm">{order.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      order.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      order.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-slate-300">
                      <MapPin size={14} />
                      {order.location}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.assignee}</td>
                  <td className="px-6 py-4 text-slate-300">{formatDate(order.scheduledDate)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'Assigned' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" title="Location">
                        <MapPin size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Finance & Compliance Component
function FinanceCompliance({ invoices }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Finance & Compliance
          </h2>
          <p className="text-slate-400">Financial reporting and regulatory compliance</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <Download size={20} />
          Generate Report
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-200">Total Revenue YTD</p>
              <p className="text-2xl font-bold text-white">$14.8M</p>
            </div>
          </div>
          <p className="text-green-100 text-sm">+15.3% vs last year</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Operating Expenses</p>
              <p className="text-2xl font-bold text-white">$8.2M</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm">Within budget</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-200">Net Profit Margin</p>
              <p className="text-2xl font-bold text-white">44.6%</p>
            </div>
          </div>
          <p className="text-purple-100 text-sm">+2.1% improvement</p>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Regulatory Compliance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="font-medium text-green-400">Environmental Standards</p>
                  <p className="text-sm text-slate-300">EPA Compliance - Current</p>
                </div>
              </div>
              <span className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Compliant</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="font-medium text-green-400">Safety Regulations</p>
                  <p className="text-sm text-slate-300">OSHA Standards - Verified</p>
                </div>
              </div>
              <span className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Compliant</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="text-yellow-400" size={24} />
                <div>
                  <p className="font-medium text-yellow-400">Financial Audit</p>
                  <p className="text-sm text-slate-300">Annual Review - Due March 31</p>
                </div>
              </div>
              <span className="text-xs text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full">Pending</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="font-medium text-green-400">Grid Reliability</p>
                  <p className="text-sm text-slate-300">NERC Standards - Compliant</p>
                </div>
              </div>
              <span className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Compliant</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Financial Documents</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={20} />
                <div className="text-left">
                  <p className="font-medium">Q1 2024 Financial Statement</p>
                  <p className="text-sm text-slate-400">Generated Feb 10, 2024</p>
                </div>
              </div>
              <Download size={20} className="text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={20} />
                <div className="text-left">
                  <p className="font-medium">Tax Filing 2023</p>
                  <p className="text-sm text-slate-400">Generated Jan 15, 2024</p>
                </div>
              </div>
              <Download size={20} className="text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={20} />
                <div className="text-left">
                  <p className="font-medium">Annual Budget Report 2024</p>
                  <p className="text-sm text-slate-400">Generated Jan 5, 2024</p>
                </div>
              </div>
              <Download size={20} className="text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={20} />
                <div className="text-left">
                  <p className="font-medium">Compliance Certificate</p>
                  <p className="text-sm text-slate-400">Valid until Dec 31, 2024</p>
                </div>
              </div>
              <Download size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics & Forecasting Component
function AnalyticsForecasting({ utilityData, customers }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
            Analytics & Forecasting
          </h2>
          <p className="text-slate-400">Data insights and predictive analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
            <Download size={20} />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="text-blue-400" size={32} />
            <span className="text-green-400 text-sm">+12.5%</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Energy Consumption</p>
          <p className="text-3xl font-bold">285.4 GWh</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-green-400" size={32} />
            <span className="text-green-400 text-sm">+8.2%</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Revenue Growth</p>
          <p className="text-3xl font-bold">$1.24M</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <PieChart className="text-purple-400" size={32} />
            <span className="text-green-400 text-sm">+5.1%</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Customer Growth</p>
          <p className="text-3xl font-bold">{customers.length}</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-orange-400" size={32} />
            <span className="text-green-400 text-sm">+3.8%</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">System Uptime</p>
          <p className="text-3xl font-bold">99.8%</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <LineChart className="text-blue-400" />
            Energy Consumption Trends
          </h3>
          <div className="h-64 bg-slate-900/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-3 text-slate-600" size={48} />
              <p className="text-slate-400">Line chart visualization</p>
              <p className="text-slate-500 text-sm mt-1">Monthly consumption data</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <PieChart className="text-purple-400" />
            Customer Distribution
          </h3>
          <div className="h-64 bg-slate-900/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <PieChart className="mx-auto mb-3 text-slate-600" size={48} />
              <p className="text-slate-400">Pie chart visualization</p>
              <p className="text-slate-500 text-sm mt-1">Customer segments breakdown</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-400" />
            Revenue Forecast
          </h3>
          <div className="h-64 bg-slate-900/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-3 text-slate-600" size={48} />
              <p className="text-slate-400">Forecast chart visualization</p>
              <p className="text-slate-500 text-sm mt-1">Projected revenue next 6 months</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-orange-400" />
            Load Demand Patterns
          </h3>
          <div className="h-64 bg-slate-900/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Activity className="mx-auto mb-3 text-slate-600" size={48} />
              <p className="text-slate-400">Area chart visualization</p>
              <p className="text-slate-500 text-sm mt-1">Hourly demand patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-blue-400 mt-1" size={24} />
              <div>
                <p className="font-medium text-blue-400 mb-2">Peak Demand Prediction</p>
                <p className="text-sm text-slate-300">Expected peak load of 14,200 MW at 6:00 PM today. Consider activating reserve capacity.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-400 mt-1" size={24} />
              <div>
                <p className="font-medium text-green-400 mb-2">Revenue Opportunity</p>
                <p className="text-sm text-slate-300">Industrial customer segment shows 18% growth potential. Recommend targeted commercial offerings.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-orange-400 mt-1" size={24} />
              <div>
                <p className="font-medium text-orange-400 mb-2">Maintenance Alert</p>
                <p className="text-sm text-slate-300">Transformer Unit #7 showing performance degradation. Schedule preventive maintenance within 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}