import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, isFirebaseConfigured, db } from "@/lib/firebase";
import { uploadImageSafely } from "@/utils/imageUpload";
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
  EyeOff,
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Utensils,
  Heart,
  Package
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

const Admin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<FirebaseUser | { email: string } | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "saswatha" | "annadanam" | "prasadam" | "general_donations" | "gallery">("dashboard");

  // Dashboard state and Firestore indicators
  const [bookings, setBookings] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  // Search terms & filters for dedicated tabs
  const [saswathaSearch, setSaswathaSearch] = useState("");
  const [annadanamSearch, setAnnadanamSearch] = useState("");
  const [prasadamSearch, setPrasadamSearch] = useState("");
  const [generalSearch, setGeneralSearch] = useState("");
  const [gallerySearch, setGallerySearch] = useState("");
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>("all");
  const [loginError, setLoginError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Categorization helpers
  const isSaswathaItem = (item: any) => {
    const p = ((item.seva || item.purpose || "") + "").toLowerCase();
    const amt = Number(item.amount);
    return (
      p.includes("saswatha") || 
      p.includes("శాశ్వత") || 
      p.includes("navaratri") || 
      p.includes("నవరాత్రి") || 
      p.includes("నవరాత్రుల") ||
      amt === 5000 || 
      amt === 2500
    );
  };

  const isAnnadanamItem = (item: any) => {
    const p = ((item.seva || item.purpose || "") + "").toLowerCase();
    return p.includes("annadanam") || p.includes("అన్నదానం") || p.includes("అన్నప్రసాద") || p.includes("అన్నదాన");
  };

  const isPrasadamItem = (item: any) => {
    const p = ((item.seva || item.purpose || "") + "").toLowerCase();
    return (
      p.includes("pulihora") || p.includes("పులిహోర") ||
      p.includes("pongal") || p.includes("పొంగలి") ||
      p.includes("sanagalu") || p.includes("శనగలు") ||
      p.includes("undrallu") || p.includes("ఉండ్రాళ్ళు") ||
      p.includes("kesari")
    );
  };

  const isGeneralDonationItem = (item: any) => {
    const p = ((item.seva || item.purpose || "") + "").toLowerCase();
    return p.includes("general") || p.includes("సాధారణ") || (!isSaswathaItem(item) && !isAnnadanamItem(item) && !isPrasadamItem(item));
  };

  // Gallery Upload state
  const [galleryUploadFile, setGalleryUploadFile] = useState<File | null>(null);
  const [galleryPreviewUrl, setGalleryPreviewUrl] = useState<string>("");
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("Alankaram");
  const [gallerySpan, setGallerySpan] = useState("col-span-1 row-span-1");
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const fetchFirestoreData = async (isManualSync = false) => {
    setIsDataLoading(true);
    if (!db) {
      // Local fallback mode: load from localStorage
      const localB = JSON.parse(localStorage.getItem("local_bookings") || "[]");
      const localD = JSON.parse(localStorage.getItem("local_donations") || "[]");
      const localG = JSON.parse(localStorage.getItem("local_gallery") || "[]");

      setBookings(localB);
      setDonations(localD);
      setGalleryImages(localG);
      setIsDataLoading(false);
      if (isManualSync) toast.success("Local records synchronized!");
      return;
    }

    // 1. Fetch Bookings
    try {
      const bookingsSnap = await getDocs(collection(db, "bookings"));
      const bookingsList = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    } catch (err) {
      console.warn("Bookings fetch error, using local fallback:", err);
      const localB = JSON.parse(localStorage.getItem("local_bookings") || "[]");
      setBookings(localB);
    }

    // 2. Fetch Donations
    try {
      const donationsSnap = await getDocs(collection(db, "donations"));
      const donationsList = donationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDonations(donationsList);
    } catch (err) {
      console.warn("Donations fetch error, using local fallback:", err);
      const localD = JSON.parse(localStorage.getItem("local_donations") || "[]");
      setDonations(localD);
    }

    // 3. Fetch Gallery Images
    try {
      try {
        const galleryQuery = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const gallerySnap = await getDocs(galleryQuery);
        const galleryList = gallerySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGalleryImages(galleryList);
      } catch (galleryErr) {
        const gallerySnap = await getDocs(collection(db, "gallery"));
        const galleryList = gallerySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        galleryList.sort((a: any, b: any) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
        setGalleryImages(galleryList);
      }
    } catch (err) {
      console.warn("Gallery fetch error, using local fallback:", err);
      const localG = JSON.parse(localStorage.getItem("local_gallery") || "[]");
      setGalleryImages(localG);
    }

    setIsDataLoading(false);
    if (isManualSync) {
      toast.success("Live database synchronized successfully!");
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
    if (!window.confirm("Are you sure you want to delete this seva booking?")) return;
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

  const handleDeleteDonation = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this donation record?")) return;
    if (db) {
      try {
        const docRef = doc(db, "donations", id);
        await deleteDoc(docRef);
        toast.success("Deleted donation record from Firestore!");
      } catch (err) {
        console.error(err);
        toast.error("Firestore delete failed.");
        return;
      }
    } else {
      const localD = donations.filter(d => d.id !== id);
      localStorage.setItem("local_donations", JSON.stringify(localD));
    }
    setDonations(prev => prev.filter(d => d.id !== id));
  };

  // Gallery Actions (Cloudinary Upload & Firestore Sync)
  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Image file size exceeds 15MB limit.");
      return;
    }
    setGalleryUploadFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setGalleryPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUploadFile && !galleryPreviewUrl) {
      toast.error("Please select a sacred photo to upload.");
      return;
    }

    setIsGalleryUploading(true);
    const loadingToastId = toast.loading("Optimizing & publishing photo to gallery...");

    let uploadedUrl = "";
    let uploadMethod: "firebase-storage" | "cloudinary" | "compressed-base64" | "fallback" = "fallback";

    try {
      if (galleryUploadFile) {
        const result = await uploadImageSafely(galleryUploadFile, "gallery");
        uploadedUrl = result.url;
        uploadMethod = result.method;
      } else {
        uploadedUrl = galleryPreviewUrl;
      }

      if (uploadMethod === "firebase-storage") {
        toast.success("Image uploaded to Firebase Storage successfully!", { id: loadingToastId });
      } else if (uploadMethod === "cloudinary") {
        toast.success("Image uploaded to Cloudinary successfully!", { id: loadingToastId });
      } else {
        toast.success("Image optimized and prepared for live publishing!", { id: loadingToastId });
      }
    } catch (err) {
      console.error("Image upload processing error:", err);
      uploadedUrl = galleryPreviewUrl;
      toast.success("Photo processed with fallback.", { id: loadingToastId });
    }

    const photoDoc = {
      src: uploadedUrl,
      title: galleryTitle.trim() || "Temple Sacred Darshan",
      category: galleryCategory || "Alankaram",
      span: gallerySpan || "col-span-1 row-span-1",
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        const docRef = await addDoc(collection(db, "gallery"), photoDoc);
        setGalleryImages(prev => [{ id: docRef.id, ...photoDoc }, ...prev]);
        toast.success("Published to Live Temple Gallery!");
      } catch (err: any) {
        console.error("Firestore save error:", err);
        // Fallback to local storage so admin never loses their work
        const localCreated = { id: Date.now().toString(), ...photoDoc };
        const localG = [localCreated, ...galleryImages];
        localStorage.setItem("local_gallery", JSON.stringify(localG));
        setGalleryImages(localG);
        toast.success("Published to Gallery (Saved locally)!");
      }
    } else {
      const localCreated = { id: Date.now().toString(), ...photoDoc };
      const localG = [localCreated, ...galleryImages];
      localStorage.setItem("local_gallery", JSON.stringify(localG));
      setGalleryImages(localG);
      toast.success("Saved to local temple gallery!");
    }

    // Reset upload form
    setGalleryUploadFile(null);
    setGalleryPreviewUrl("");
    setGalleryTitle("");
    setGalleryCategory("Alankaram");
    setGallerySpan("col-span-1 row-span-1");
    setIsGalleryUploading(false);
  };

  const handleDeleteGalleryImage = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from the gallery?`)) return;

    if (db) {
      try {
        const docRef = doc(db, "gallery", id);
        await deleteDoc(docRef);
        toast.success(`Photo "${title}" deleted from Firestore!`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete photo from Firestore.");
        return;
      }
    } else {
      const localG = galleryImages.filter(img => img.id !== id);
      localStorage.setItem("local_gallery", JSON.stringify(localG));
      toast.success(`Photo "${title}" removed.`);
    }

    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2000);
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
              { id: "dashboard", label: "Overview", icon: LayoutDashboard, count: null },
              { id: "saswatha", label: "Saswatha & Sevas", icon: Sparkles, count: bookings.filter(isSaswathaItem).length, badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30" },
              { id: "annadanam", label: "Annadanam (అన్నదానం)", icon: Utensils, count: donations.filter(isAnnadanamItem).length, badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" },
              { id: "prasadam", label: "Prasadam Bookings", icon: Package, count: bookings.filter(isPrasadamItem).length, badgeColor: "bg-orange-500/20 text-orange-300 border border-orange-500/30" },
              { id: "general_donations", label: "General Donations", icon: Heart, count: donations.filter(isGeneralDonationItem).length, badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30" },
              { id: "gallery", label: "Temple Gallery", icon: ImageIcon, count: galleryImages.length }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between border cursor-pointer text-left ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10 font-bold"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.count !== null && tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      isActive 
                        ? "bg-black/40 text-white" 
                        : (tab.badgeColor || "bg-white/10 text-stone-300")
                    }`}>
                      {tab.count}
                    </span>
                  )}
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
              {activeTab === "saswatha" && "Saswatha Abhishekam (₹5,000) & Special Sevas"}
              {activeTab === "annadanam" && "Annadanam Contributions (అన్నదానం)"}
              {activeTab === "prasadam" && "Prasadam Bookings Management (ప్రసాదాలు)"}
              {activeTab === "general_donations" && "General Donations Ledger (సాధారణ విరాళాలు)"}
              {activeTab === "gallery" && "Temple Gallery Publisher"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchFirestoreData(true)}
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

                {/* Stat 3: Annadanam */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group shadow-lg hover:border-emerald-500/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Annadanam Donors</p>
                      <h3 className="text-3xl font-black text-white mt-2">{donations.filter(isAnnadanamItem).length}</h3>
                      <p className="text-emerald-400 text-xs mt-2 font-medium">
                        ₹{donations.filter(isAnnadanamItem).reduce((sum, d) => sum + (Number(d.amount) || 0), 0).toLocaleString('en-IN')} Raised
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Utensils className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Stat 4: Prasadam Bookings */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 relative overflow-hidden group shadow-lg hover:border-orange-500/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Prasadam Orders</p>
                      <h3 className="text-3xl font-black text-white mt-2">{bookings.filter(isPrasadamItem).length}</h3>
                      <p className="text-orange-400 text-xs mt-2 font-medium">
                        {galleryImages.length} Gallery Photos
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      <Package className="w-5 h-5" />
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

                {/* Quick devotee entries preview */}
                <div className="p-6 rounded-2xl glass-dark border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold font-serif text-white mb-1">Recent Seva Registrations</h4>
                    <p className="text-xs text-muted-foreground mb-6">Latest devotee seva bookings (₹2,500 / ₹5,000)</p>

                    <div className="space-y-4">
                      {bookings.filter(b => {
                        const s = (b.seva || "").toLowerCase();
                        return !s.includes("general donation") && !s.includes("సాధారణ విరాళం");
                      }).length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-6">No recent seva bookings found.</p>
                      ) : (
                        bookings
                          .filter(b => {
                            const s = (b.seva || "").toLowerCase();
                            return !s.includes("general donation") && !s.includes("సాధారణ విరాళం");
                          })
                          .slice(0, 4)
                          .map(bk => {
                            const matched = donations.find(d => 
                              (d.transactionId && bk.transactionId && d.transactionId === bk.transactionId) ||
                              (d.phone && bk.phone && d.phone === bk.phone) ||
                              (d.name && bk.name && d.name === bk.name)
                            );
                            const amt = bk.amount || matched?.amount;

                            return (
                              <div key={bk.id} className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-black/20 hover:border-primary/25 transition-all">
                                <div className="min-w-0 flex-1 mr-3">
                                  <p className="text-sm font-semibold text-white truncate">{bk.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{bk.seva} {bk.phone ? `• ${bk.phone}` : ""}</p>
                                  {bk.address && <p className="text-[10px] text-zinc-500 truncate mt-0.5">📍 {bk.address}</p>}
                                </div>
                                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                                  {amt ? `₹${Number(amt).toLocaleString('en-IN')}` : (bk.date || "")}
                                </span>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab("saswatha")}
                    className="w-full mt-6 py-2.5 rounded-xl border border-primary/20 text-primary text-xs font-serif font-black tracking-widest uppercase hover:bg-primary hover:text-stone-950 transition-all text-center cursor-pointer"
                  >
                    View Saswatha & Seva Bookings
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SASWATHA & SPECIAL SEVAS (₹5,000 & ₹2,500) */}
          {activeTab === "saswatha" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>Saswatha & Special Sevas</span>
                    <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-sans font-bold">
                      ₹5,000 / ₹2,500
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lifetime Abhishekam (₹5,000) & Ganesha Navaratri Abhishekam (₹2,500) Registrations
                  </p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={saswathaSearch}
                    onChange={e => setSaswathaSearch(e.target.value)}
                    placeholder="Search name, phone, gotram, address..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Saswatha Abhishekam (₹5,000)</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {bookings.filter(b => ((b.seva || "") + "").toLowerCase().includes("saswatha") || Number(b.amount) === 5000).length} Devotees
                    </p>
                  </div>
                  <span className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 font-serif font-black text-xs border border-amber-500/20">₹5K</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-primary/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Navaratri Seva (₹2,500)</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {bookings.filter(b => ((b.seva || "") + "").toLowerCase().includes("navaratri") || Number(b.amount) === 2500).length} Devotees
                    </p>
                  </div>
                  <span className="p-2.5 rounded-lg bg-primary/10 text-primary font-serif font-black text-xs border border-primary/20">₹2.5K</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Seva Revenue</p>
                    <p className="text-xl font-bold text-amber-400 mt-1 font-mono">
                      ₹{bookings.filter(isSaswathaItem).reduce((sum, b) => sum + (Number(b.amount) || 0), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">ID</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Devotee Name & Phone</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Postal Address</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Gotram / Nakshatram</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Seva Ritual</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Amount (₹)</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Date / Txn ID</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => {
                      if (!isSaswathaItem(b)) return false;
                      const q = saswathaSearch.toLowerCase();
                      return (
                        (b.name || "").toLowerCase().includes(q) ||
                        (b.phone || "").toLowerCase().includes(q) ||
                        (b.address || "").toLowerCase().includes(q) ||
                        (b.gotram || "").toLowerCase().includes(q) ||
                        (b.seva || "").toLowerCase().includes(q) ||
                        (b.transactionId || "").toLowerCase().includes(q)
                      );
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-xs text-muted-foreground">
                          No Saswatha or Special Seva bookings found matching your search.
                        </td>
                      </tr>
                    ) : (
                      bookings
                        .filter(b => {
                          if (!isSaswathaItem(b)) return false;
                          const q = saswathaSearch.toLowerCase();
                          return (
                            (b.name || "").toLowerCase().includes(q) ||
                            (b.phone || "").toLowerCase().includes(q) ||
                            (b.address || "").toLowerCase().includes(q) ||
                            (b.gotram || "").toLowerCase().includes(q) ||
                            (b.seva || "").toLowerCase().includes(q) ||
                            (b.transactionId || "").toLowerCase().includes(q)
                          );
                        })
                        .map((bk) => (
                          <tr key={bk.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white/70 font-mono">{bk.id}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs font-bold text-white">{bk.name}</p>
                              {bk.phone && (
                                <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">📞 {bk.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-stone-300 max-w-[180px]">
                              {bk.address ? (
                                <span className="line-clamp-2" title={bk.address}>📍 {bk.address}</span>
                              ) : (
                                <span className="text-zinc-600 italic">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">
                              {bk.gotram ? `${bk.gotram} ${bk.nakshatram ? `(${bk.nakshatram})` : ""}` : "—"}
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg inline-block">
                                {bk.seva}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-amber-400 font-mono">
                                ₹{Number(bk.amount || 5000).toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-[10px] text-amber-500/80 font-mono tracking-wider select-all">
                                {bk.transactionId || "Manual Proof"}
                              </p>
                              {bk.date && <p className="text-[10px] text-zinc-500 mt-0.5">{bk.date}</p>}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleDeleteSeva(bk.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ANNADANAM (అన్నదానం) */}
          {activeTab === "annadanam" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>Annadanam Donor Ledger</span>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-sans font-bold">
                      అన్నదానం
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Devotee Annadanam sponsorships & Nitya Anna Prasadam donor records
                  </p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={annadanamSearch}
                    onChange={e => setAnnadanamSearch(e.target.value)}
                    placeholder="Search donor name, phone, address..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Annadanam Donors</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {donations.filter(isAnnadanamItem).length} Contributions
                    </p>
                  </div>
                  <Utensils className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Annadanam Funds</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                      ₹{donations.filter(isAnnadanamItem).reduce((sum, d) => sum + (Number(d.amount) || 0), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Online vs Manual</p>
                    <p className="text-sm font-bold text-white mt-1">
                      Online: {donations.filter(d => isAnnadanamItem(d) && d.method === "Online").length} | Manual: {donations.filter(d => isAnnadanamItem(d) && d.method !== "Online").length}
                    </p>
                  </div>
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Receipt No</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Donor Name & Contact</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Postal Address</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Gotram / Nakshatram</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Offering Purpose</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Amount (₹)</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Date / Method</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Proof / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.filter(d => {
                      if (!isAnnadanamItem(d)) return false;
                      const q = annadanamSearch.toLowerCase();
                      return (
                        (d.name || "").toLowerCase().includes(q) ||
                        (d.phone || "").toLowerCase().includes(q) ||
                        (d.address || "").toLowerCase().includes(q) ||
                        (d.purpose || "").toLowerCase().includes(q) ||
                        (d.receiptNo || "").toLowerCase().includes(q)
                      );
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-xs text-muted-foreground">
                          No Annadanam donations found matching your search.
                        </td>
                      </tr>
                    ) : (
                      donations
                        .filter(d => {
                          if (!isAnnadanamItem(d)) return false;
                          const q = annadanamSearch.toLowerCase();
                          return (
                            (d.name || "").toLowerCase().includes(q) ||
                            (d.phone || "").toLowerCase().includes(q) ||
                            (d.address || "").toLowerCase().includes(q) ||
                            (d.purpose || "").toLowerCase().includes(q) ||
                            (d.receiptNo || "").toLowerCase().includes(q)
                          );
                        })
                        .map((dn) => (
                          <tr key={dn.receiptNo || dn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white font-mono">{dn.receiptNo}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs font-bold text-white">{dn.name}</p>
                              {dn.phone && (
                                <p className="text-[11px] text-emerald-400/90 font-mono mt-0.5">📞 {dn.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-stone-300 max-w-[180px]">
                              {dn.address ? (
                                <span className="line-clamp-2" title={dn.address}>📍 {dn.address}</span>
                              ) : (
                                <span className="text-zinc-600 italic">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">
                              {dn.gotram ? `${dn.gotram} ${dn.nakshatram ? `(${dn.nakshatram})` : ""}` : "—"}
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg inline-block">
                                {dn.purpose}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-emerald-400 font-mono">
                                ₹{Number(dn.amount).toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-xs text-white">{dn.date}</p>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-white/70 uppercase font-mono mt-0.5 inline-block">
                                {dn.method || "Online"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {dn.proofUrl && (
                                  <a
                                    href={dn.proofUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold inline-flex items-center gap-1"
                                    title="View Payment Proof"
                                  >
                                    <FileText className="w-3 h-3" /> Slip
                                  </a>
                                )}
                                <button
                                  onClick={() => handleDeleteDonation(dn.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                                  title="Delete Record"
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

          {/* TAB 4: PRASADAM BOOKINGS */}
          {activeTab === "prasadam" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>Prasadam Bookings</span>
                    <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full font-sans font-bold">
                      ప్రసాదాలు
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pulihora, Sweet Pongal, Sanagalu, Undrallu daily & special offerings
                  </p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={prasadamSearch}
                    onChange={e => setPrasadamSearch(e.target.value)}
                    placeholder="Search prasadam type, devotee, phone..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-orange-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Prasadam Orders</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {bookings.filter(isPrasadamItem).length} Bookings
                    </p>
                  </div>
                  <Package className="w-5 h-5 text-orange-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-orange-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Prasadam Value</p>
                    <p className="text-xl font-bold text-orange-400 mt-1 font-mono">
                      ₹{bookings.filter(isPrasadamItem).reduce((sum, b) => sum + (Number(b.amount) || 0), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <DollarSign className="w-5 h-5 text-orange-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Offerings Menu</p>
                    <p className="text-xs text-stone-300 mt-1">
                      Pulihora, Pongal, Sanagalu, Undrallu
                    </p>
                  </div>
                  <Utensils className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Order ID</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Devotee Name & Phone</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Postal Address</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Gotram / Nakshatram</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Prasadam Item</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Amount (₹)</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Date / Txn ID</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.filter(b => {
                      if (!isPrasadamItem(b)) return false;
                      const q = prasadamSearch.toLowerCase();
                      return (
                        (b.name || "").toLowerCase().includes(q) ||
                        (b.phone || "").toLowerCase().includes(q) ||
                        (b.address || "").toLowerCase().includes(q) ||
                        (b.gotram || "").toLowerCase().includes(q) ||
                        (b.seva || "").toLowerCase().includes(q) ||
                        (b.transactionId || "").toLowerCase().includes(q)
                      );
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-xs text-muted-foreground">
                          No Prasadam bookings found matching your search.
                        </td>
                      </tr>
                    ) : (
                      bookings
                        .filter(b => {
                          if (!isPrasadamItem(b)) return false;
                          const q = prasadamSearch.toLowerCase();
                          return (
                            (b.name || "").toLowerCase().includes(q) ||
                            (b.phone || "").toLowerCase().includes(q) ||
                            (b.address || "").toLowerCase().includes(q) ||
                            (b.gotram || "").toLowerCase().includes(q) ||
                            (b.seva || "").toLowerCase().includes(q) ||
                            (b.transactionId || "").toLowerCase().includes(q)
                          );
                        })
                        .map((bk) => (
                          <tr key={bk.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white/70 font-mono">{bk.id}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs font-bold text-white">{bk.name}</p>
                              {bk.phone && (
                                <p className="text-[11px] text-orange-400/90 font-mono mt-0.5">📞 {bk.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-stone-300 max-w-[180px]">
                              {bk.address ? (
                                <span className="line-clamp-2" title={bk.address}>📍 {bk.address}</span>
                              ) : (
                                <span className="text-zinc-600 italic">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">
                              {bk.gotram ? `${bk.gotram} ${bk.nakshatram ? `(${bk.nakshatram})` : ""}` : "—"}
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg inline-block">
                                {bk.seva}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-orange-400 font-mono">
                                ₹{Number(bk.amount || 1000).toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-[10px] text-orange-400/80 font-mono tracking-wider select-all">
                                {bk.transactionId || "Manual Proof"}
                              </p>
                              {bk.date && <p className="text-[10px] text-zinc-500 mt-0.5">{bk.date}</p>}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleDeleteSeva(bk.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL DONATIONS */}
          {activeTab === "general_donations" && (
            <div className="space-y-6 animate-fade-rise">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>General Donations Ledger</span>
                    <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-sans font-bold">
                      సాధారణ విరాళాలు
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Temple development, hundi contributions, and general welfare donations
                  </p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={generalSearch}
                    onChange={e => setGeneralSearch(e.target.value)}
                    placeholder="Search donor name, receipt no, phone..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Donors</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {donations.filter(isGeneralDonationItem).length} Contributions
                    </p>
                  </div>
                  <Heart className="w-5 h-5 text-purple-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Donations</p>
                    <p className="text-xl font-bold text-purple-300 mt-1 font-mono">
                      ₹{donations.filter(isGeneralDonationItem).reduce((sum, d) => sum + (Number(d.amount) || 0), 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Average Amount</p>
                    <p className="text-xl font-bold text-white mt-1 font-mono">
                      ₹{(() => {
                        const items = donations.filter(isGeneralDonationItem);
                        if (items.length === 0) return 0;
                        const total = items.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
                        return Math.round(total / items.length).toLocaleString('en-IN');
                      })()}
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50">
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Receipt No</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Donor & Contact</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Postal Address</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Amount (₹)</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Payment Date</th>
                      <th className="py-4 px-4 text-left text-xs font-serif font-bold uppercase tracking-widest text-primary">Method</th>
                      <th className="py-4 px-4 text-center text-xs font-serif font-bold uppercase tracking-widest text-primary">Slip / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.filter(d => {
                      if (!isGeneralDonationItem(d)) return false;
                      const q = generalSearch.toLowerCase();
                      return (
                        (d.name || "").toLowerCase().includes(q) ||
                        (d.phone || "").toLowerCase().includes(q) ||
                        (d.address || "").toLowerCase().includes(q) ||
                        (d.purpose || "").toLowerCase().includes(q) ||
                        (d.receiptNo || "").toLowerCase().includes(q)
                      );
                    }).length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                          No general donation records found matching your search.
                        </td>
                      </tr>
                    ) : (
                      donations
                        .filter(d => {
                          if (!isGeneralDonationItem(d)) return false;
                          const q = generalSearch.toLowerCase();
                          return (
                            (d.name || "").toLowerCase().includes(q) ||
                            (d.phone || "").toLowerCase().includes(q) ||
                            (d.address || "").toLowerCase().includes(q) ||
                            (d.purpose || "").toLowerCase().includes(q) ||
                            (d.receiptNo || "").toLowerCase().includes(q)
                          );
                        })
                        .map((dn) => (
                          <tr key={dn.receiptNo || dn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-xs font-semibold text-white font-mono">{dn.receiptNo}</td>
                            <td className="py-4 px-4">
                              <p className="text-xs font-bold text-white">{dn.name}</p>
                              {dn.phone && (
                                <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">📞 {dn.phone}</p>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-stone-300 max-w-[180px]">
                              {dn.address ? (
                                <span className="line-clamp-2" title={dn.address}>📍 {dn.address}</span>
                              ) : (
                                <span className="text-zinc-600 italic">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-lg inline-block font-mono">
                                ₹{Number(dn.amount).toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-xs text-muted-foreground">{dn.date}</td>
                            <td className="py-4 px-4">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-white/70 uppercase">
                                {dn.method || "Online"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {dn.proofUrl && (
                                  <a
                                    href={dn.proofUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-primary border border-primary/20 text-[10px] font-bold inline-flex items-center gap-1"
                                    title="View Payment Proof"
                                  >
                                    <FileText className="w-3 h-3" /> Proof
                                  </a>
                                )}
                                <button
                                  onClick={() => handleDeleteDonation(dn.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                                  title="Delete Record"
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

          {/* TAB 6: TEMPLE GALLERY & CLOUDINARY UPLOAD */}
          {activeTab === "gallery" && (
            <div className="space-y-8 animate-fade-rise">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>Sacred Temple Gallery</span>
                    <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-sans font-bold">
                      Cloudinary Cloud Storage
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload deity photos directly to Cloudinary and instantly publish them to the live temple website gallery.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/gallery"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-primary border border-primary/20 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public Gallery</span>
                  </Link>
                </div>
              </div>

              {/* Section 1: Upload Card */}
              <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-primary/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="mb-6 flex items-center gap-2.5 pb-4 border-b border-white/5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-serif">Upload Sacred Photo to Gallery</h4>
                    <p className="text-[11px] text-muted-foreground">Select an image file, choose category, and publish live to the temple website.</p>
                  </div>
                </div>

                <form onSubmit={handleGalleryUpload} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* File Picker / Preview Box (5 cols) */}
                    <div className="lg:col-span-5">
                      <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">
                        Select Photograph
                      </label>
                      
                      <div className="relative border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-4 transition-all bg-black/30 flex flex-col items-center justify-center min-h-[220px] group cursor-pointer overflow-hidden">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryFileChange}
                          disabled={isGalleryUploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        {galleryPreviewUrl ? (
                          <div className="relative w-full h-[200px] flex items-center justify-center">
                            <img
                              src={galleryPreviewUrl}
                              alt="Preview"
                              className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-primary/30"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-xl gap-2 z-10">
                              <Upload className="w-6 h-6 text-primary animate-bounce" />
                              <span className="text-xs text-white font-bold">Click to change photo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-6 space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-white">Click or drag image here</p>
                            <p className="text-[10px] text-muted-foreground">JPG, PNG, WebP up to 15MB</p>
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold mt-1">
                              Direct Cloudinary Upload
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Form Metadata Fields (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">
                          Photo Title / Event Name
                        </label>
                        <input
                          type="text"
                          value={galleryTitle}
                          onChange={e => setGalleryTitle(e.target.value)}
                          placeholder="e.g. Sree Sampath Vinayagar Maha Alankaram"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">
                            Category
                          </label>
                          <select
                            value={galleryCategory}
                            onChange={e => setGalleryCategory(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                          >
                            <option value="Alankaram">Deity & Alankaram</option>
                            <option value="Daily Pooja">Sanctum & Daily Pooja</option>
                            <option value="Festivals">Festivals & Utsavam</option>
                            <option value="Architecture">Temple Campus & Gopuram</option>
                            <option value="Annadanam">Annaprasadam Seva</option>
                            <option value="Special Sevas">Special Sevas & Homam</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-serif font-black tracking-widest text-primary uppercase mb-2">
                            Gallery Grid Span
                          </label>
                          <select
                            value={gallerySpan}
                            onChange={e => setGallerySpan(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-primary/50 focus:outline-none transition-colors"
                          >
                            <option value="col-span-1 row-span-1">Standard (1x1 Square)</option>
                            <option value="col-span-2 row-span-1">Wide (2x1 Banner)</option>
                            <option value="col-span-2 row-span-2">Feature Large (2x2 Box)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isGalleryUploading || (!galleryUploadFile && !galleryPreviewUrl)}
                          className={`w-full py-3.5 px-6 rounded-xl font-serif font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                            isGalleryUploading || (!galleryUploadFile && !galleryPreviewUrl)
                              ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed"
                              : "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-600 hover:to-amber-700 hover:scale-[1.01] active:scale-95 border border-primary/30 cursor-pointer shadow-primary/20"
                          }`}
                        >
                          {isGalleryUploading ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                              <span>Publishing Photo to Gallery...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>Publish Photo to Temple Gallery</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Section 2: Uploaded Gallery Photos Grid */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                      <span>Published Temple Photos</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                        {galleryImages.length}
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Live image references stored in Firestore and Cloudinary</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: "all", label: "All" },
                      { id: "Alankaram", label: "Alankaram" },
                      { id: "Daily Pooja", label: "Daily Pooja" },
                      { id: "Festivals", label: "Festivals" },
                      { id: "Architecture", label: "Architecture" },
                      { id: "Annadanam", label: "Annadanam" },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setGalleryCategoryFilter(cat.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider transition-all border cursor-pointer ${
                          galleryCategoryFilter === cat.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-zinc-900 border-white/10 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photos Grid */}
                {galleryImages.length === 0 ? (
                  <div className="p-12 rounded-3xl border border-white/5 bg-black/20 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center mx-auto text-muted-foreground">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-muted-foreground">No photos uploaded to the custom gallery collection yet.</p>
                    <p className="text-[11px] text-primary">Use the upload box above to upload photos to Cloudinary and see them appear here!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages
                      .filter(img => {
                        if (galleryCategoryFilter === "all") return true;
                        return img.category === galleryCategoryFilter;
                      })
                      .map(img => (
                        <div
                          key={img.id}
                          className="group p-3 rounded-2xl glass-dark border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between gap-3 shadow-md hover:shadow-xl hover:-translate-y-1"
                        >
                          {/* Photo Thumbnail */}
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40">
                            <img
                              src={img.src}
                              alt={img.title || "Temple Photo"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 text-amber-300 font-bold border border-amber-500/30 backdrop-blur-sm">
                                {img.category || "Alankaram"}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold text-white font-serif line-clamp-1">
                              {img.title || "Sacred Darshan"}
                            </h5>
                            <p className="text-[10px] text-muted-foreground">
                              {img.createdAt ? new Date(img.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Temple Photo"}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between border-t border-white/5 pt-2.5 gap-2">
                            <button
                              onClick={() => handleCopyUrl(img.src)}
                              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white text-[10px] font-medium flex items-center gap-1 transition-all border border-white/5 cursor-pointer"
                              title="Copy Cloudinary URL"
                            >
                              {copiedUrl === img.src ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy URL</span>
                                </>
                              )}
                            </button>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={img.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-primary border border-white/5 text-[10px] transition-all cursor-pointer"
                                title="Open full photo in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteGalleryImage(img.id, img.title || "Temple Photo")}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                title="Delete from gallery"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Admin;
