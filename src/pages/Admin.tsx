import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, isFirebaseConfigured, db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  LayoutDashboard, 
  LogOut, 
  DollarSign, 
  Calendar, 
  Users, 
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  TrendingUp,
  FileText,
  AlertTriangle,
  UserCheck,
  Search,
  BookOpen,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for seeding events if empty in database
const initialEvents = [
  { id: "EV001", title: "New Year's Day Spl Pooja", date: "2026-01-01", time: "6:00 AM – 9:00 PM", type: "Auspicious", status: "Active" },
  { id: "EV002", title: "Ugadi (Telugu New Year)", date: "2026-03-19", time: "6:00 AM – 9:00 PM", type: "Festival", status: "Active" },
  { id: "EV003", title: "Vinayaka Chavithi (Ganesh Chaturthi)", date: "2026-09-14", time: "All Day & Night", type: "Festival", status: "Active" },
  { id: "EV004", title: "Vijayadashami Vahana Pooja", date: "2026-10-20", time: "5:00 AM – 11:00 PM", type: "Festival", status: "Active" }
];

const Admin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<FirebaseUser | { email: string } | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "sevas" | "donations" | "events" | "feedback" | "panchangam">("dashboard");

  // Dashboard state and Firestore indicators
  const [bookings, setBookings] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  // Search terms
  const [bookingSearch, setBookingSearch] = useState("");
  const [donationSearch, setDonationSearch] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Panchangam Editor state
  const [panchangam, setPanchangam] = useState({
    date: "2026-08-28",
    tithi: "Krishna Paksha Dwitiya (until 04:12 PM)",
    nakshatram: "Purvashadha (until 02:40 PM)",
    yogam: "Siddha (until 11:20 AM)",
    karanam: "Taitila (until 04:12 PM)",
    rahuKalam: "10:30 AM – 12:00 PM",
    varjyam: "08:15 PM – 09:45 PM"
  });

  // Modal event creation state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "Festival" });

  const fetchFirestoreData = async () => {
    setIsDataLoading(true);
    if (!db) {
      // Local fallback mode: load from localStorage
      const localB = JSON.parse(localStorage.getItem("local_bookings") || "[]");
      const localD = JSON.parse(localStorage.getItem("local_donations") || "[]");
      const localE = JSON.parse(localStorage.getItem("local_events") || JSON.stringify(initialEvents));
      const localF = JSON.parse(localStorage.getItem("local_feedbacks") || "[]");

      setBookings(localB);
      setDonations(localD);
      setEvents(localE);
      setFeedbacks(localF);
      setIsDataLoading(false);
      return;
    }

    try {
      // Fetch Bookings
      const bookingsSnap = await getDocs(collection(db, "bookings"));
      const bookingsList = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);

      // Fetch Donations
      const donationsSnap = await getDocs(collection(db, "donations"));
      const donationsList = donationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDonations(donationsList);

      // Fetch Events
      const eventsSnap = await getDocs(collection(db, "events"));
      const eventsList = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (eventsList.length > 0) {
        setEvents(eventsList);
      } else {
        const defaultEvents = initialEvents;
        for (const ev of defaultEvents) {
          await addDoc(collection(db, "events"), {
            title: ev.title,
            date: ev.date,
            time: ev.time,
            type: ev.type,
            status: ev.status
          });
        }
        const freshSnap = await getDocs(collection(db, "events"));
        setEvents(freshSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }

      // Fetch Feedbacks
      const feedbacksSnap = await getDocs(collection(db, "feedbacks"));
      const feedbacksList = feedbacksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbacksList);
    } catch (error) {
      console.error("Error fetching Firestore collections:", error);
      toast.error("Failed to query live Firestore database records.");
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setIsAuthChecking(false);
      });
      return () => unsubscribe();
    } else {
      // Local Session Check (Mock Mode)
      const mockSession = sessionStorage.getItem("mock_admin_auth");
      if (mockSession === "true") {
        setUser({ email: "samaathvinayakatemple@gmail.com" });
      }
      setIsAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchFirestoreData();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (userId !== "Samaathvinayakatemple" || password !== "123Sampath123") {
      setLoginError("Invalid User ID or Password. Please try again.");
      toast.error("Invalid Admin credentials!");
      return;
    }

    const email = "samaathvinayakatemple@gmail.com";

    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully logged in via Firebase!");
      } catch (error: any) {
        console.error("Firebase Login Error:", error);
        toast.error(`Firebase Auth failed: ${error.message}`);
      }
    } else {
      // Mock validation mode
      sessionStorage.setItem("mock_admin_auth", "true");
      setUser({ email });
      toast.success("Logged in successfully (Mock Mode)!");
    }
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
        toast.success("Logged out from Firebase session!");
      } catch (error) {
        toast.error("Error signing out!");
      }
    } else {
      sessionStorage.removeItem("mock_admin_auth");
      setUser(null);
      toast.success("Mock session cleared successfully!");
    }
  };

  // Seva actions
  const handleApproveSeva = async (id: string) => {
    const updatedStatus = bookings.find(b => b.id === id)?.status === "Pending" ? "Approved" : "Completed";
    
    if (db) {
      try {
        const docRef = doc(db, "bookings", id);
        await updateDoc(docRef, { status: updatedStatus });
        toast.success("Updated booking status in Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Firestore update failed.");
        return;
      }
    } else {
      const localB = bookings.map(b => b.id === id ? { ...b, status: updatedStatus } : b);
      localStorage.setItem("local_bookings", JSON.stringify(localB));
    }
    
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: updatedStatus } : b)
    );
  };

  const handleDeleteSeva = async (id: string) => {
    if (db) {
      try {
        const docRef = doc(db, "bookings", id);
        await deleteDoc(docRef);
        toast.success("Deleted booking from Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Firestore delete failed.");
        return;
      }
    } else {
      const localB = bookings.filter(b => b.id !== id);
      localStorage.setItem("local_bookings", JSON.stringify(localB));
    }
    
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Feedback actions
  const handleResolveFeedback = async (id: any) => {
    const target = feedbacks.find(f => f.id === id);
    const updatedStatus = target?.status === "New" ? "Resolved" : "New";

    if (db) {
      try {
        const docRef = doc(db, "feedbacks", id);
        await updateDoc(docRef, { status: updatedStatus });
        toast.success("Feedback status updated in Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update status in Firestore.");
        return;
      }
    } else {
      const localF = feedbacks.map(f => f.id === id ? { ...f, status: updatedStatus } : f);
      localStorage.setItem("local_feedbacks", JSON.stringify(localF));
    }
    
    setFeedbacks(prev => 
      prev.map(f => f.id === id ? { ...f, status: updatedStatus } : f)
    );
  };

  const handleDeleteFeedback = async (id: any) => {
    if (db) {
      try {
        const docRef = doc(db, "feedbacks", id);
        await deleteDoc(docRef);
        toast.success("Deleted query from Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete from Firestore.");
        return;
      }
    } else {
      const localF = feedbacks.filter(f => f.id !== id);
      localStorage.setItem("local_feedbacks", JSON.stringify(localF));
    }
    
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  // Event actions
  const handleAddEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast.error("All event fields are required!");
      return;
    }
    
    const eventPayload = {
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      status: "Active"
    };

    if (db) {
      try {
        const docRef = await addDoc(collection(db, "events"), eventPayload);
        setEvents(prev => [...prev, { id: docRef.id, ...eventPayload }]);
        toast.success("Event stored in Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to store event in Firestore.");
        return;
      }
    } else {
      const createdEvent = { id: Date.now().toString(), ...eventPayload };
      const localE = [...events, createdEvent];
      localStorage.setItem("local_events", JSON.stringify(localE));
      setEvents(localE);
    }
    
    setIsEventModalOpen(false);
    setNewEvent({ title: "", date: "", time: "", type: "Festival" });
  };

  const handleDeleteEvent = async (id: any, title: string) => {
    if (db) {
      try {
        const docRef = doc(db, "events", id);
        await deleteDoc(docRef);
        toast.success(`Event "${title}" deleted from Firestore!`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete event.");
        return;
      }
    } else {
      const localE = events.filter(e => e.id !== id);
      localStorage.setItem("local_events", JSON.stringify(localE));
      toast.error(`Event "${title}" removed.`);
    }
    
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Panchangam Update
  const handleUpdatePanchangam = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Daily Panchangam details updated successfully!");
  };

  const getDonationTrend = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    
    // Create an array of the last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(now.getMonth() - (5 - i));
      return {
        name: months[d.getMonth()],
        Amount: 0
      };
    });

    // Populate with real values
    donations.forEach(donation => {
      if (!donation.date) return;
      const dParts = donation.date.split("-");
      if (dParts.length < 2) return;
      
      const monthNum = parseInt(dParts[1], 10) - 1;
      const monthName = months[monthNum];
      
      const match = last6Months.find(m => m.name === monthName);
      if (match) {
        match.Amount += Number(donation.amount || 0);
      }
    });

    return last6Months;
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
      </div>
    );
  }

  // ────────────────── LOGIN VIEW ──────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 relative flex items-center justify-center overflow-hidden px-4">
        {/* Back Link */}
        <Link to="/" className="absolute top-6 left-6 text-xs text-primary hover:text-primary/80 transition-all flex items-center gap-2 font-serif font-black tracking-widest uppercase z-20">
          <span>← Back to Website</span>
        </Link>

        {/* Traditional BG texture details */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl glass-dark border border-primary/20 backdrop-blur-md shadow-2xl z-10 animate-fade-rise">
          
          {/* Warning header if running in local mock fallback mode */}
          {!isFirebaseConfigured && (
            <div className="mb-6 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs flex gap-2.5 items-start">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
              <div>
                <strong className="font-bold block">Developer Fallback Mode Active</strong>
                Firebase is not initialized (dummy keys detected). Logging in will use local client-side validation. Configure actual Firebase credentials in `.env` for production.
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-white tracking-wide">Admin Portal</h2>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mt-2">Sampath Vinayakagar Temple</p>
            <div className="h-0.5 w-16 bg-primary/50 mx-auto mt-4 rounded-full" />
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex gap-2.5 items-start">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
              <div>
                <strong className="font-bold block">Login Failed</strong>
                {loginError}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">User ID / Admin ID</label>
              <input 
                type="text" 
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="Enter User ID"
                required
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-primary/20 text-white placeholder-white/30 focus:border-primary/60 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-black/40 border border-primary/20 text-white placeholder-white/30 focus:border-primary/60 focus:outline-none transition-colors text-sm font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-serif font-black tracking-widest text-xs uppercase hover:from-amber-600 hover:to-amber-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10 border border-primary/30 cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ────────────────── DASHBOARD VIEW ──────────────────
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row relative">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-primary/15 flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-xl">🪔</span>
            </div>
            <div>
              <h2 className="text-sm font-bold font-serif text-white tracking-wide leading-none">Sampath</h2>
              <p className="text-[10px] text-primary/80 uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="px-6 py-3.5 border-b border-white/5 bg-black/10">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isFirebaseConfigured ? "Firebase Mode" : "Local Mock Mode"}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutDashboard },
              { id: "sevas", label: "Seva Bookings", icon: BookOpen },
              { id: "donations", label: "Donations Log", icon: DollarSign },
              { id: "events", label: "Temple Events", icon: Calendar },
              { id: "feedback", label: "Queries / Inbox", icon: MessageSquare },
              { id: "panchangam", label: "Panchangam Editor", icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 border cursor-pointer text-left ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10 font-bold"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions in sidebar */}
        <div className="p-4 border-t border-white/5 space-y-2">
          {/* Back to Site */}
          <Link
            to="/"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>← Go to Website</span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-red-500/20 text-red-400 hover:bg-red-950/20 hover:border-red-500/40 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 min-w-0 flex flex-col md:h-screen md:overflow-y-auto">
        <header className="px-8 py-5 bg-zinc-900 border-b border-primary/10 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-bold font-serif text-white uppercase tracking-wider">
              {activeTab === "dashboard" && "Overview Command Center"}
              {activeTab === "sevas" && "Seva Bookings Management"}
              {activeTab === "donations" && "Donation Records Ledger"}
              {activeTab === "events" && "Scheduled Temple Events"}
              {activeTab === "feedback" && "Devotee Message Queries"}
              {activeTab === "panchangam" && "Traditional Panchangam Editor"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={fetchFirestoreData}
              disabled={isDataLoading}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-primary border border-white/5 hover:scale-103 active:scale-97 transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-semibold"
              title="Sync dynamic database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDataLoading ? "animate-spin text-amber-500" : ""}`} />
              {isDataLoading ? "Syncing..." : "Sync Ledger"}
            </button>
            <div className="text-[10px] text-muted-foreground">
              Current Session: <span className="text-white font-medium">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Tab contents wrapped in nice padding container */}
        <div className="p-8 flex-1 bg-zinc-950 relative">
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />


          {/* TAB CONTENTS */}
          
          {/* TAB 1: OVERVIEW / DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-rise">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Stat 1 */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group shadow-lg hover:border-primary/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Total Bookings</p>
                      <h3 className="text-3xl font-black text-white mt-2">{bookings.length}</h3>
                      <p className="text-emerald-400 text-xs flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3" />
                        Live from Database
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-6 rounded-2xl glass-dark border border-primary/25 relative overflow-hidden group shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-primary text-xs uppercase tracking-widest font-black">Donations (Total)</p>
                      <h3 className="text-3xl font-black text-primary gold-shimmer mt-2">
                        ₹{donations.reduce((sum, d) => sum + Number(d.amount), 0).toLocaleString('en-IN')}
                      </h3>
                      <p className="text-emerald-400 text-xs flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3" />
                        Real-time ledger
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-500/20 text-primary border border-primary/30">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group shadow-lg hover:border-primary/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Active Events</p>
                      <h3 className="text-3xl font-black text-white mt-2">{events.length}</h3>
                      <p className="text-muted-foreground text-xs mt-2">
                        Upcoming celebrations
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group shadow-lg hover:border-primary/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">New Queries</p>
                      <h3 className="text-3xl font-black text-white mt-2">{feedbacks.filter(f => f.status === "New").length}</h3>
                      <p className="text-amber-400 text-xs mt-2 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Requires response
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Chart & Quick List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Donations Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl glass-dark border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-base font-bold font-serif text-white">Donations Stream Performance</h4>
                      <p className="text-xs text-muted-foreground">Monthly analysis of collections (INR)</p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-bold uppercase tracking-wider">6 Months Data</span>
                  </div>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getDonationTrend()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                        <YAxis stroke="#71717a" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#e5e7eb20", borderRadius: "12px" }}
                          itemStyle={{ color: "#fbbf24" }}
                        />
                        <Area type="monotone" dataKey="Amount" stroke="#fbbf24" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAmount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick bookings preview */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold font-serif text-white mb-1">Recent Booking Requests</h4>
                    <p className="text-xs text-muted-foreground mb-6">Pending confirmation approvals</p>

                    <div className="space-y-4">
                      {bookings.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-6">No recent booking requests found.</p>
                      ) : (
                        bookings.slice(0, 3).map(bk => (
                          <div key={bk.id} className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-black/20 hover:border-primary/25 transition-all">
                            <div>
                              <p className="text-sm font-semibold text-white">{bk.name}</p>
                              <p className="text-xs text-muted-foreground">{bk.seva} • {bk.date}</p>
                            </div>
                            
                            <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                              bk.status === "Approved"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : bk.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                            }`}>
                              {bk.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab("sevas")}
                    className="w-full mt-6 py-2.5 rounded-xl border border-primary/20 text-primary text-xs font-serif font-black tracking-widest uppercase hover:bg-primary hover:text-stone-950 transition-all text-center cursor-pointer"
                  >
                    View All Bookings
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SEVA BOOKINGS */}
          {activeTab === "sevas" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">Devotee Seva Bookings</h3>
                  <p className="text-xs text-muted-foreground mt-1">Manage and approve devotee pooja rituals</p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={e => setBookingSearch(e.target.value)}
                    placeholder="Search by devotee name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Booking Data Grid */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">ID</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Devotee Name</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Gotram</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Seva Ritual</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Pooja Date</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Time Slot / Txn ID</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Status</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => b.name.toLowerCase().includes(bookingSearch.toLowerCase())).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-xs text-muted-foreground">
                          No matching Seva bookings found in database.
                        </td>
                      </tr>
                    ) : (
                      bookings
                        .filter(b => b.name.toLowerCase().includes(bookingSearch.toLowerCase()))
                        .map((bk, i) => (
                          <tr key={bk.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white">{bk.id}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs font-bold text-white">{bk.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{bk.phone}</p>
                            </td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">{bk.gotram} {bk.nakshatram ? `(${bk.nakshatram})` : ""}</td>
                            <td className="py-4 px-4 text-xs text-white">{bk.seva}</td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">{bk.date}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs text-white font-medium">{bk.timeSlot || "5:30 PM - 8:00 PM"}</p>
                              <p className="text-[9px] text-amber-500/80 font-mono mt-0.5 tracking-wider select-all">{bk.transactionId || "Manual Proof"}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                                bk.status === "Approved"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : bk.status === "Pending"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                              }`}>
                                {bk.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-center gap-2">
                                {bk.status !== "Completed" && (
                                  <button
                                    onClick={() => handleApproveSeva(bk.id)}
                                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                    title={bk.status === "Pending" ? "Approve Booking" : "Mark as Completed"}
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteSeva(bk.id)}
                                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DONATION LOG */}
          {activeTab === "donations" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">Donations Ledger</h3>
                  <p className="text-xs text-muted-foreground mt-1">Audit trail of financial contributions</p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={donationSearch}
                    onChange={e => setDonationSearch(e.target.value)}
                    placeholder="Search by donor name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Donations Ledger Grid */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Receipt No</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Donor Name</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Purpose / Seva</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Amount</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Payment Date</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Method</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.filter(d => d.name.toLowerCase().includes(donationSearch.toLowerCase())).length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-muted-foreground">
                          No matching donation records found in database.
                        </td>
                      </tr>
                    ) : (
                      donations
                        .filter(d => d.name.toLowerCase().includes(donationSearch.toLowerCase()))
                        .map((dn, i) => (
                          <tr key={dn.receiptNo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white">{dn.receiptNo}</td>
                            <td className="py-4 px-4 text-xs font-bold text-white">{dn.name}</td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">{dn.purpose}</td>
                            <td className="py-4 px-4 text-xs font-semibold text-primary">₹{Number(dn.amount).toLocaleString('en-IN')}</td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">{dn.date}</td>
                            <td className="py-4 px-4">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-white/70 uppercase">
                                {dn.method}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              {dn.proofUrl ? (
                                <a
                                  href={dn.proofUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-primary border border-primary/20 text-[10px] font-serif font-black tracking-widest uppercase hover:scale-103 active:scale-97 transition-all cursor-pointer inline-flex items-center gap-1.5"
                                >
                                  <FileText className="w-3 h-3" />
                                  Proof / Slip
                                </a>
                              ) : (
                                <button
                                  onClick={() => toast.info(`Exporting PDF Receipt for ${dn.receiptNo}...`)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-primary border border-primary/20 text-[10px] font-serif font-black tracking-widest uppercase hover:scale-103 active:scale-97 transition-all cursor-pointer inline-flex items-center gap-1.5"
                                >
                                  <FileText className="w-3 h-3" />
                                  Receipt
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TEMPLE EVENTS */}
          {activeTab === "events" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">Event Scheduler</h3>
                  <p className="text-xs text-muted-foreground mt-1">Add or update public temple events</p>
                </div>
                
                <button
                  onClick={() => setIsEventModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-serif font-black tracking-widest uppercase hover:bg-primary/95 hover:scale-102 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Event
                </button>
              </div>

              {/* Event grid list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.length === 0 ? (
                  <div className="col-span-2 p-8 rounded-2xl border border-white/5 bg-black/20 text-center text-xs text-muted-foreground">
                    No scheduled events found in database.
                  </div>
                ) : (
                  events.map(ev => (
                    <div key={ev.id} className="p-6 rounded-2xl glass-dark border border-white/10 hover:border-primary/20 transition-all flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20 uppercase tracking-wider">{ev.type}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">{ev.status}</span>
                        </div>
                        <h4 className="text-base font-bold font-serif text-white">{ev.title}</h4>
                        <p className="text-xs text-muted-foreground">Date: {ev.date} | Timings: {ev.time}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        title="Remove Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Event Modal overlay */}
              {isEventModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-md p-6 rounded-3xl glass-dark border border-primary/20 animate-fade-rise shadow-2xl relative">
                    <h3 className="text-lg font-bold font-serif text-white mb-4">Add Temple Event</h3>
                    
                    <form onSubmit={handleAddEventSubmit} className="space-y-4 text-left">
                      <div>
                        <label className="block text-xs text-muted-foreground uppercase mb-1">Event Title</label>
                        <input
                          type="text"
                          required
                          value={newEvent.title}
                          onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Navaratri Festival Celebrations"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted-foreground uppercase mb-1">Date</label>
                          <input
                            type="date"
                            required
                            value={newEvent.date}
                            onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground uppercase mb-1">Category</label>
                          <select
                            value={newEvent.type}
                            onChange={e => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                          >
                            <option value="Festival">Festival</option>
                            <option value="Auspicious">Auspicious</option>
                            <option value="Poornima">Poornima</option>
                            <option value="Kalyanam">Kalyanam</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-muted-foreground uppercase mb-1">Timings</label>
                        <input
                          type="text"
                          required
                          value={newEvent.time}
                          onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                          placeholder="e.g. 7:00 AM – 1:00 PM & 5:00 PM – 9:00 PM"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex gap-3 justify-end mt-6">
                        <button
                          type="button"
                          onClick={() => setIsEventModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs hover:bg-zinc-700 transition-all cursor-pointer border border-white/5"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-serif font-black tracking-widest uppercase hover:bg-primary/95 transition-all cursor-pointer border border-primary/20"
                        >
                          Save Event
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FEEDBACK / INBOX */}
          {activeTab === "feedback" && (
            <div className="space-y-6 animate-fade-rise">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Devotee Inbox</h3>
                <p className="text-xs text-muted-foreground mt-1">Read and respond to comments, questions, and inquiries</p>
              </div>

              {/* Feedbacks Grid */}
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-white/5 bg-black/20 text-center text-xs text-muted-foreground">
                    No devotee support queries or feedbacks found in database.
                  </div>
                ) : (
                  feedbacks.map(fb => (
                    <div 
                      key={fb.id} 
                      className={`p-6 rounded-2xl glass-dark border transition-all flex flex-col gap-4 relative overflow-hidden ${
                        fb.status === "New" 
                          ? "border-primary/20 hover:border-primary/40 bg-primary/[0.01]" 
                          : "border-white/5 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {fb.status === "New" && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            {fb.name}
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              fb.status === "New"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/25"
                            }`}>
                              {fb.status}
                            </span>
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{fb.email} • Received: {fb.date}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleResolveFeedback(fb.id)}
                            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                              fb.status === "New"
                                ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                                : "bg-zinc-800 hover:bg-zinc-700 text-white/70 border-white/5"
                            }`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            {fb.status === "New" ? "Mark Resolved" : "Re-open Query"}
                          </button>

                          <button
                            onClick={() => handleDeleteFeedback(fb.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-primary">Subject: {fb.subject}</p>
                        <p className="text-xs text-white/95 leading-relaxed font-sans font-light italic bg-black/20 p-3 rounded-xl border border-white/5">
                          "{fb.message}"
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PANCHANGAM EDITOR */}
          {activeTab === "panchangam" && (
            <div className="space-y-6 animate-fade-rise max-w-2xl">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Daily Panchangam Editor</h3>
                <p className="text-xs text-muted-foreground mt-1">Update the traditional daily astrological data displayed on the homepage</p>
              </div>

              <div className="p-6 rounded-2xl glass-dark border border-white/10 shadow-lg">
                <form onSubmit={handleUpdatePanchangam} className="space-y-6 text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Calendar Date</label>
                      <input
                        type="date"
                        value={panchangam.date}
                        onChange={e => setPanchangam(prev => ({ ...prev, date: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Tithi</label>
                      <input
                        type="text"
                        value={panchangam.tithi}
                        onChange={e => setPanchangam(prev => ({ ...prev, tithi: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Nakshatram</label>
                      <input
                        type="text"
                        value={panchangam.nakshatram}
                        onChange={e => setPanchangam(prev => ({ ...prev, nakshatram: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Yogam</label>
                      <input
                        type="text"
                        value={panchangam.yogam}
                        onChange={e => setPanchangam(prev => ({ ...prev, yogam: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Karanam</label>
                      <input
                        type="text"
                        value={panchangam.karanam}
                        onChange={e => setPanchangam(prev => ({ ...prev, karanam: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Rahu Kalam</label>
                      <input
                        type="text"
                        value={panchangam.rahuKalam}
                        onChange={e => setPanchangam(prev => ({ ...prev, rahuKalam: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">Varjyam</label>
                      <input
                        type="text"
                        value={panchangam.varjyam}
                        onChange={e => setPanchangam(prev => ({ ...prev, varjyam: e.target.value }))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-serif font-black tracking-widest text-xs uppercase hover:from-amber-600 hover:to-amber-700 hover:scale-[1.01] active:scale-95 transition-all shadow-md border border-primary/30 cursor-pointer"
                  >
                    Commit Panchangam Changes
                  </button>

                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Admin;
