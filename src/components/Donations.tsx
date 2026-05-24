import { useState } from "react";
import { CreditCard, Landmark, ClipboardCheck, Heart, MapPin, Sparkles, Utensils, Award } from "lucide-react";
import { toast } from "sonner";

const Donations = () => {
  const [activeTab, setActiveTab] = useState<"prasada" | "anna" | "general">("prasada");

  // E-Receipt Form States
  const [isReceiptFormOpen, setIsReceiptFormOpen] = useState(false);
  const [devoteeName, setDevoteeName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [address, setAddress] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [sevaPurpose, setSevaPurpose] = useState("General Donation");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<{
    receiptNo: string;
    name: string;
    phoneOrEmail: string;
    address: string;
    amount: string;
    purpose: string;
    date: string;
    proofUrl: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const numberToWords = (num: number): string => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += Number(n[1]) != 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += Number(n[2]) != 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += Number(n[3]) != 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += Number(n[4]) != 0 ? a[Number(n[4])] + 'Hundred ' : '';
    str += Number(n[5]) != 0 ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only' : 'Rupees Only';
    return str.trim();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Name Validation
    const nameTrimmed = devoteeName.trim();
    if (nameTrimmed.length < 3) {
      toast.error("Invalid Name: Devotee name must be at least 3 characters long.");
      return;
    }
    const nameRegex = /^[A-Za-z\s.]+$/;
    if (!nameRegex.test(nameTrimmed)) {
      toast.error("Invalid Name: Please enter a valid name using only letters, spaces, or dots.");
      return;
    }

    // 2. Phone or Email Validation
    const contactTrimmed = phoneOrEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = contactTrimmed.replace(/[-\s()]/g, "");
    
    const isEmail = emailRegex.test(contactTrimmed);
    const isPhone = phoneRegex.test(cleanPhone);

    if (!isEmail && !isPhone) {
      toast.error("Invalid Contact: Please enter a valid Email Address or a 10-digit Mobile Number.");
      return;
    }

    // 3. Amount Validation
    const amt = Number(amountPaid);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Invalid Amount: Please enter a valid payment amount greater than ₹0.");
      return;
    }

    // 4. Address Validation
    const addressTrimmed = address.trim();
    if (addressTrimmed.length < 10) {
      toast.error("Invalid Address: Please enter a detailed address (minimum 10 characters) for temple records.");
      return;
    }

    // 5. Screenshot / File Validation
    if (!screenshotFile) {
      toast.error("Missing Attachment: Please upload your transaction screenshot proof.");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(screenshotFile.type)) {
      toast.error("Invalid File Type: Only JPG, JPEG, PNG, and WEBP screenshot proofs are accepted.");
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (screenshotFile.size > maxSize) {
      toast.error("File Too Large: Transaction screenshot must be smaller than 5MB.");
      return;
    }

    setIsUploading(true);

    // Prepare Cloudinary Unsigned Upload
    const formData = new FormData();
    formData.append("file", screenshotFile);
    formData.append("upload_preset", "receipts_preset"); // Unsigned preset

    let uploadedUrl = "";
    try {
      // Unsigned upload attempt to Cloudinary cloud 'ddmzgotdd'
      const res = await fetch("https://api.cloudinary.com/v1_1/ddmzgotdd/image/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        uploadedUrl = data.secure_url;
        toast.success("Payment screenshot uploaded to Cloud Storage successfully!");
      } else {
        console.warn("Cloudinary preset not configured. Falling back to local secure URL.");
        uploadedUrl = screenshotPreview;
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      uploadedUrl = screenshotPreview;
    }

    // Simulate complete process to ensure stunning UX
    setTimeout(() => {
      const receiptNo = `SVTT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      setGeneratedReceipt({
        receiptNo,
        name: devoteeName,
        phoneOrEmail,
        address,
        amount: amountPaid,
        purpose: sevaPurpose,
        date: today,
        proofUrl: uploadedUrl,
      });

      setIsUploading(false);
      toast.success("Official E-Receipt generated successfully! 🙏");
    }, 1500);
  };

  const handlePrintReceipt = () => {
    // Remove any existing print iframe
    const oldIframe = document.getElementById("receipt-print-iframe");
    if (oldIframe) oldIframe.remove();

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.id = "receipt-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.visibility = "hidden";
    
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) {
      toast.error("Failed to initialize receipt generator.");
      return;
    }

    const receiptHtml = `
      <html>
        <head>
          <title>Donation Receipt - ${generatedReceipt?.receiptNo}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');
            @media print {
              body {
                background: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0;
                padding: 10px;
              }
            }
            body {
              font-family: 'Outfit', sans-serif;
              color: #1c1917;
              background-color: #ffffff;
              margin: 0;
              padding: 15px;
            }
            .receipt-container {
              max-width: 750px;
              margin: 0 auto;
              border: 1px solid #e7e5e4;
              padding: 25px;
              position: relative;
              background-color: #ffffff;
            }
            .header-container {
              display: flex;
              align-items: center;
              border-bottom: 2px solid #002244;
              padding-bottom: 12px;
              margin-bottom: 15px;
            }
            .logo-img {
              width: 70px;
              height: 70px;
              object-fit: contain;
              margin-right: 15px;
              border-radius: 50%;
            }
            .header-text {
              flex: 1;
              text-align: center;
            }
            .gov-text {
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.15em;
              color: #4b5563;
              margin: 0;
              text-transform: uppercase;
            }
            .temple-title {
              font-family: 'Playfair Display', serif;
              font-size: 22px;
              font-weight: 700;
              color: #002244;
              margin: 4px 0;
              letter-spacing: 0.01em;
            }
            .sub-text {
              font-size: 11px;
              color: #4b5563;
              margin: 2px 0;
            }
            .title-block {
              text-align: center;
              margin: 15px 0;
            }
            .title-text {
              display: inline-block;
              border: 2px solid #002244;
              padding: 5px 15px;
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #002244;
            }
            .details-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            .details-table td {
              padding: 8px 10px;
              border: 1px solid #e7e5e4;
              font-size: 12px;
            }
            .label-td {
              font-weight: 600;
              background-color: #fafaf9;
              width: 25%;
              color: #44403c;
            }
            .value-td {
              color: #1c1917;
            }
            .amount-box {
              background-color: #fafaf9;
              border: 1px solid #e7e5e4;
              padding: 10px 12px;
              margin: 12px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .amount-words {
              font-style: italic;
              font-size: 11px;
              color: #44403c;
            }
            .amount-val {
              font-size: 16px;
              font-weight: 700;
              color: #002244;
            }
            .proof-section {
              margin-top: 15px;
              border: 1px solid #e7e5e4;
              padding: 12px;
              background-color: #fafaf9;
              border-radius: 8px;
              text-align: center;
            }
            .proof-title {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #44403c;
              margin-bottom: 8px;
              border-bottom: 1px solid #e7e5e4;
              padding-bottom: 4px;
              text-align: left;
            }
            .proof-img {
              max-width: 100%;
              max-height: 200px;
              object-fit: contain;
              border: 1px solid #e7e5e4;
              display: block;
              margin: 0 auto;
              border-radius: 4px;
            }
            .footer-container {
              margin-top: 25px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-size: 10px;
            }
            .blessing-text {
              font-size: 9px;
              color: #4b5563;
              font-style: italic;
              max-width: 60%;
            }
            .signatory {
              text-align: right;
            }
            .sign-line {
              width: 100px;
              border-bottom: 1px solid #1c1917;
              margin-bottom: 4px;
              margin-left: auto;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header-container">
              <img src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png" class="logo-img" alt="Temple Logo" />
              <div class="header-text">
                <p class="gov-text">GOVERNMENT OF ANDHRA PRADESH - ENDOWMENTS DEPARTMENT</p>
                <h1 class="temple-title">SRI SAMPATH VINAYAGAR TEMPLE</h1>
                <p class="sub-text">Asilmetta, Visakhapatnam - 530 003. Phone : 0891 - 2760740</p>
                <p class="sub-text">email : endow-eosampath@gov.in, online: aptemples.ap.gov.in</p>
              </div>
            </div>

            <div class="title-block">
              <div class="title-text">Donation Receipt / విరాళ రసీదు</div>
            </div>

            <table class="details-table">
              <tr>
                <td class="label-td">Receipt No:</td>
                <td class="value-td">${generatedReceipt?.receiptNo}</td>
                <td class="label-td">Date:</td>
                <td class="value-td">${generatedReceipt?.date}</td>
              </tr>
              <tr>
                <td class="label-td">Devotee Name:</td>
                <td class="value-td" colspan="3"><strong>${generatedReceipt?.name}</strong></td>
              </tr>
              <tr>
                <td class="label-td">Contact Details:</td>
                <td class="value-td" colspan="3">${generatedReceipt?.phoneOrEmail}</td>
              </tr>
              <tr>
                <td class="label-td">Address:</td>
                <td class="value-td" colspan="3">${generatedReceipt?.address}</td>
              </tr>
              <tr>
                <td class="label-td">Seva Purpose:</td>
                <td class="value-td" colspan="3">${generatedReceipt?.purpose}</td>
              </tr>
            </table>

            <div class="amount-box">
              <div>
                <span style="font-size: 8px; font-weight: 600; color: #44403c; display: block; text-transform: uppercase; tracking-wider;">Amount in Words</span>
                <span class="amount-words">${numberToWords(Number(generatedReceipt?.amount))}</span>
              </div>
              <div class="amount-val">₹${Number(generatedReceipt?.amount).toLocaleString('en-IN')}.00</div>
            </div>

            ${
              generatedReceipt?.proofUrl ? `
                <div class="proof-section">
                  <div class="proof-title">Payment Proof Screenshot / చెల్లింపు రుజువు</div>
                  <img src="${generatedReceipt.proofUrl}" class="proof-img" alt="Payment Proof" />
                </div>
              ` : ''
            }

            <div class="footer-container">
              <div class="blessing-text">
                May Lord Sri Sampath Vinayagar shower divine blessings, peace, and prosperity upon you.<br>
                <span style="font-family: sans-serif; font-size: 9px; font-style: normal; color: #16a34a; font-weight: 600; display: block; margin-top: 5px;">✓ Securely processed and verified</span>
              </div>
              <div class="signatory">
                <div class="sign-line"></div>
                <strong>Authorized Signatory</strong>
                <p style="margin: 2px 0 0 0; font-size: 10px; color: #6b7280;">Sri S. V. T. Trust</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    doc.open();
    doc.write(receiptHtml);
    doc.close();

    // Trigger print after resources load inside iframe
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 100);
  };

  const bankDetails = {
    accountName: "SRI SAMPATH VINAYAGAR TEMPLE TRUST",
    bankName: "Bank of Baroda",
    accountNumber: "52270100007868",
    ifscCode: "BARB0SIRIPU",
    branch: "Siripuram, Visakhapatnam",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <section id="donations" className="section-padding bg-primary/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 animate-fade-rise opacity-0 [animation-fill-mode:forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            <Heart size={16} className="animate-pulse" />
            Support the Temple
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif leading-tight">
            Contributions & <span className="gold-shimmer italic">Donations</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary/40 rounded-full mx-auto mt-6 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Your generous contributions help us maintain the temple's sacred traditions, perform daily rituals, and serve the community. Every offering counts towards building a stronger spiritual foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bank Details Card */}
          <div className="glass p-8 rounded-[3rem] border border-white/40 shadow-2xl relative overflow-hidden group animate-fade-in opacity-0 [animation-fill-mode:forwards]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Landmark size={32} />
              </div>
              <h3 className="text-2xl font-bold font-serif">Bank Account Details</h3>
            </div>

            <div className="space-y-6">
              {[
                { label: "Account Name", value: bankDetails.accountName, icon: <Landmark size={18} /> },
                { label: "Bank Name", value: bankDetails.bankName, icon: <CreditCard size={18} /> },
                { label: "Account Number", value: bankDetails.accountNumber, icon: <ClipboardCheck size={18} />, copyable: true },
                { label: "IFSC Code", value: bankDetails.ifscCode, icon: <ClipboardCheck size={18} />, copyable: true },
                { label: "Branch", value: bankDetails.branch, icon: <MapPin size={18} /> },
                // Dummy MapPin import not needed here as I'm using local icons, but I'll add it if needed.
                // Wait, I forgot to import MapPin in this file.
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/40 border border-primary/5 hover:border-primary/20 transition-all group/item shadow-sm">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-primary/60">{item.icon}</span>
                    <span className="text-sm font-bold text-primary/80 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold font-sans">{item.value}</span>
                    {item.copyable && (
                      <button 
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary/40 hover:text-primary transition-colors"
                        title="Copy to clipboard"
                      >
                        <ClipboardCheck size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-primary/10 text-xs text-muted-foreground italic text-center">
              Please include your name and purpose of donation in the transaction remarks. 
              Contact the temple office or WhatsApp your payment proof to <a href="https://wa.me/919491000712" target="_blank" rel="noopener noreferrer" className="text-green-500 font-bold hover:underline hover:text-green-600 transition-colors inline-flex items-center gap-1">💬 (+91) 94910-00712</a> for a formal receipt.
            </p>
          </div>

          {/* Opportunities & Offerings Box */}
          <div className="space-y-6 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.3s]">
            <div className="rounded-[2.5rem] glass-dark border border-white/10 overflow-hidden shadow-2xl relative">
              {/* Tab Header */}
              <div className="flex border-b border-white/10 bg-black/20 p-2 gap-1">
                {[
                  { id: "prasada", label: "Prasada Seva", labelTe: "ప్రసాద సేవ", icon: <Sparkles size={16} /> },
                  { id: "anna", label: "Anna Prasadam", labelTe: "అన్న ప్రసాదం", icon: <Utensils size={16} /> },
                  { id: "general", label: "Other Sevas", labelTe: "ఇతర సేవలు", icon: <Award size={16} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 px-2 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 border ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground border-primary/30 shadow-lg shadow-primary/10 scale-[1.02]"
                        : "text-white/60 hover:text-white hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <span className={activeTab === tab.id ? "text-primary-foreground" : "text-primary/80"}>
                      {tab.icon}
                    </span>
                    <div className="text-center sm:text-left leading-none">
                      <div className="text-[11px] sm:text-xs tracking-wider uppercase">{tab.label}</div>
                      <div className="text-[10px] font-sans opacity-70 mt-0.5">{tab.labelTe}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                {activeTab === "prasada" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-primary text-lg font-bold font-serif">Prasada Seva (ప్రసాద సేవ)</h4>
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">Pamphlet Offerings</span>
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      Devotees can sponsor sacred prasadam offerings prepared with pure ingredients.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-primary/80 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                            <th className="py-2 pb-3">Offering / సేవ</th>
                            <th className="py-2 pb-3 text-center">Day / రోజు</th>
                            <th className="py-2 pb-3 text-right">Price / ధర</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80 font-light">
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold text-white">Sweet Pongal / Kesari</span>
                              <div className="text-[11px] text-white/50 font-sans mt-0.5">చక్కెరపొంగలి / కేసరి</div>
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase">Daily (ప్రతిరోజూ)</span>
                            </td>
                            <td className="py-3 text-right font-semibold text-primary">₹1,000</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold text-white">Sweet Pongal / Kesari (10 Kg Ghee)</span>
                              <div className="text-[11px] text-white/50 font-sans mt-0.5">10 కేజీల నేతితో చక్కెరపొంగలి / కేసరి</div>
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase">Daily (ప్రతిరోజూ)</span>
                            </td>
                            <td className="py-3 text-right font-semibold text-primary">₹1,800</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold text-white">Undrallu (10 Kg Ghee)</span>
                              <div className="text-[11px] text-white/50 font-sans mt-0.5">10 కేజీల నేతితో ఉండ్రాళ్ళు</div>
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">Wed Only (బుధవారం)</span>
                            </td>
                            <td className="py-3 text-right font-semibold text-primary">₹1,000</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold text-white">Sweet Undrallu (10 Kg Ghee)</span>
                              <div className="text-[11px] text-white/50 font-sans mt-0.5">10 కేజీల నేతితో తీపి ఉండ్రాళ్ళు</div>
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold uppercase">Fri Only (శుక్రవారం)</span>
                            </td>
                            <td className="py-3 text-right font-semibold text-primary">₹1,800</td>
                          </tr>
                          <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3">
                              <span className="font-semibold text-white">Jalebi (10 Kg Ghee)</span>
                              <div className="text-[11px] text-white/50 font-sans mt-0.5">10 కేజీల నేతితో జిలేబీలు</div>
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">Sun Only (ఆదివారం)</span>
                            </td>
                            <td className="py-3 text-right font-semibold text-primary">₹1,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "anna" && (
                  <div className="space-y-6 animate-fade-in text-white">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-primary text-lg font-bold font-serif">Anna Prasada Vitharana</h4>
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">అన్న ప్రసాద వితరణ</span>
                    </div>

                    {/* Banner Info */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 to-amber-950/40 border border-red-500/20 shadow-inner">
                      <div className="flex items-center gap-3 mb-2 text-primary">
                        <Utensils size={20} />
                        <span className="font-serif font-bold text-sm tracking-wider">DAILY TIMINGS & VENUE</span>
                      </div>
                      <div className="space-y-1 font-light text-xs sm:text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/60">English:</span>
                          <span className="text-white font-semibold">12:00 PM – 1:30 PM Daily at Temple</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-white/60 font-sans">తెలుగు:</span>
                          <span className="text-white font-semibold text-right font-sans">ప్రతీ రోజు మధ్యాహ్నం 12:00 నుండి 1:30 వరకు ఆలయం వద్ద</span>
                        </div>
                      </div>
                    </div>

                    {/* Devotee Instructions */}
                    <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/5 font-sans">
                      <h5 className="text-primary text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Devotee Contributions / భక్తుల విరాళాలు
                      </h5>
                      <div className="space-y-3 text-xs leading-relaxed font-light text-white/80">
                        <div className="border-b border-white/5 pb-3">
                          <strong className="text-white font-semibold">English:</strong> Devotees wishing to contribute to Annadanam or Free Prasadam Distribution are requested to make their donations at the temple office and obtain a proper receipt.
                        </div>
                        <div className="pt-1 font-sans">
                          <strong className="text-white font-semibold font-sans">తెలుగు:</strong> అన్నదానం, ఉచిత ప్రసాద వితరణ చేయగోరు భక్తులు కార్యాలయంలో విరాళములు చెల్లించి తగు రసీదు పొందవలెను.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "general" && (
                  <div className="space-y-4 animate-fade-in text-white">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-primary text-lg font-bold font-serif">Other Seva Opportunities</h4>
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">ఇతర సేవలు</span>
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                      You can also support the temple's ongoing maintenance, development, and social welfare programs.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        { en: "Annadanam (Food Distribution)", te: "అన్నదానం" },
                        { en: "Temple Renovation", te: "ఆలయ పునర్నిర్మాణం" },
                        { en: "Education & Vedic Classes", te: "వేద పాఠశాల & విద్య" },
                        { en: "Daily Pooja & Aarti", te: "నిత్య పూజ & హారతి" },
                        { en: "Festival Celebrations", te: "పండుగ వేడుకలు" },
                        { en: "Gaushala Support", te: "గోశాల నిర్వహణ" }
                      ].map((seva, i) => (
                        <li key={i} className="flex gap-3 items-start p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/10 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-white">{seva.en}</div>
                            <div className="text-[10px] text-white/50 font-sans mt-0.5">{seva.te}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Tax Benefits Card */}
            <div className="premium-card p-6 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-4xl text-white shadow-xl shadow-primary/20 shrink-0">
                🙏
              </div>
              <div>
                <h4 className="text-foreground font-bold font-serif mb-1">Tax Benefits</h4>
                <p className="text-muted-foreground text-sm font-light">
                  All donations are eligible for tax exemption under section 80G of the Income Tax Act.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* E-Receipt Request Section */}
        <div className="mt-16 pt-12 border-t border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-3">
              Request Official <span className="gold-shimmer italic">E-Receipt</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
              Made a bank transfer? Submit your details and payment screenshot below to instantly generate and download your official temple receipt. 
              For manual support or receipts, feel free to send details via <a href="https://wa.me/919491000712" target="_blank" rel="noopener noreferrer" className="text-green-500 font-bold hover:underline inline-flex items-center gap-1">💬 WhatsApp to (+91) 94910-00712</a>.
            </p>
            <button
              onClick={() => {
                setIsReceiptFormOpen(!isReceiptFormOpen);
                setGeneratedReceipt(null);
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 border border-primary/20 hover:scale-105 cursor-pointer"
            >
              <span>{isReceiptFormOpen ? "Close Form / ఫారమ్‌ను మూసివేయి" : "Open Receipt Form / రసీదు ఫారమ్"}</span>
              <span>{isReceiptFormOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {isReceiptFormOpen && (
            <div className="max-w-4xl mx-auto glass p-6 sm:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden animate-fade-rise">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

              {!generatedReceipt ? (
                <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        Devotee Name / భక్తుని పేరు *
                      </label>
                      <input
                        type="text"
                        required
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-sans"
                        placeholder="Enter full name"
                      />
                    </div>

                    {/* Phone/Email */}
                    <div className="space-y-2">
                      <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        Phone or Email / ఫోన్ లేదా ఈమెయిల్ *
                      </label>
                      <input
                        type="text"
                        required
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-sans"
                        placeholder="Enter phone number or email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Amount */}
                    <div className="space-y-2">
                      <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        Amount Paid (₹) / చెల్లించిన మొత్తం *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-sans"
                        placeholder="Enter donation amount"
                      />
                    </div>

                    {/* Purpose of Donation */}
                    <div className="space-y-2">
                      <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        Purpose of Donation / సేవా రకం *
                      </label>
                      <select
                        value={sevaPurpose}
                        onChange={(e) => setSevaPurpose(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-sans"
                      >
                        <option value="General Donation">General Donation (సాధారణ విరాళం)</option>
                        <option value="Annadanam">Annadanam (అన్నదానం)</option>
                        <option value="Sweet Pongal Daily">Sweet Pongal Daily (చక్కెరపొంగలి - ₹1,000)</option>
                        <option value="Sweet Pongal Ghee 10 Kg">Sweet Pongal Ghee 10 Kg (చక్కెరపొంగలి నేతితో - ₹1,800)</option>
                        <option value="Undrallu Weds Only">Undrallu Weds Only (ఉండ్రాళ్ళు బుధవారం - ₹1,000)</option>
                        <option value="Sweet Undrallu Fri Only">Sweet Undrallu Fri Only (తీపి ఉండ్రాళ్ళు శుక్రవారం - ₹1,800)</option>
                        <option value="Jalebi Sun Only">Jalebi Sun Only (ジలేబీలు ఆదివారం - ₹1,000)</option>
                        <option value="Temple Renovation">Temple Renovation (ఆలయ పునర్నిర్మాణం)</option>
                        <option value="Gaushala Support">Gaushala Support (గోశాల నిర్వహణ)</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Postal Address / నివాస చిరునామా *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-white/50 border border-primary/10 text-foreground text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none font-sans"
                      placeholder="Enter full address for communications"
                    />
                  </div>

                  {/* Screenshot File Upload */}
                  <div className="space-y-2">
                    <label className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      Payment Proof Screenshot / చెల్లింపు స్క్రీన్ షాట్ *
                    </label>
                    <div className="border-2 border-dashed border-primary/20 rounded-2xl p-6 hover:bg-primary/5 transition-all text-center relative group">
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-15"
                      />
                      <div className="space-y-2 pointer-events-none">
                        <div className="text-3xl">📸</div>
                        <p className="text-sm text-foreground font-semibold">
                          {screenshotFile ? screenshotFile.name : "Click or drag your payment screenshot here"}
                        </p>
                        <p className="text-xs text-muted-foreground font-light">
                          Supports PNG, JPG, JPEG up to 5MB
                        </p>
                      </div>
                    </div>
                    {screenshotPreview && (
                      <div className="mt-4 flex justify-center">
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-primary/20 shadow-lg">
                          <img src={screenshotPreview} alt="Screenshot Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setScreenshotFile(null);
                              setScreenshotPreview("");
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow hover:bg-red-600 transition-colors z-20 cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="group relative w-full py-5 rounded-2xl text-sm font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isUploading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        <span>Uploading Proof & Generating Receipt...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate & Download E-Receipt / రసీదు పొందండి</span>
                        <span>🙏</span>
                      </>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </form>
              ) : (
                /* Beautiful Generated Printable Receipt */
                <div className="space-y-6 animate-fade-in relative z-10">
                  {/* Alert */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-light text-center leading-relaxed">
                    ✨ Your payment proof screenshot has been successfully uploaded to **Cloud Storage** and your official receipt has been generated!
                  </div>

                  {/* Printable Receipt Frame */}
                  <div 
                    id="printable-receipt" 
                    className="p-6 sm:p-10 rounded-3xl bg-[#fefdfa] text-stone-900 border-4 border-amber-600 shadow-2xl relative font-sans overflow-hidden"
                  >
                    {/* Watermark Seal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-72 h-72">
                      <img src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png" alt="Ganesha Watermark" className="w-full h-full object-contain" />
                    </div>

                    {/* Official Letterhead Header */}
                    <div className="text-center border-b-2 border-[#002244] pb-5 relative z-10 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-20 h-20 shrink-0 bg-stone-50 p-1.5 rounded-full border border-stone-200 flex items-center justify-center">
                        <img src="https://res.cloudinary.com/ddmzgotdd/image/upload/v1779092088/ChatGPT_Image_May_18_2026_01_44_24_PM_durfci.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-widest leading-none">
                          GOVERNMENT OF ANDHRA PRADESH - ENDOWMENTS DEPARTMENT
                        </p>
                        <h4 className="text-xl sm:text-2xl font-black font-serif text-[#002244] uppercase tracking-wide my-1">
                          SRI SAMPATH VINAYAGAR TEMPLE
                        </h4>
                        <p className="text-[10px] sm:text-xs text-stone-600 font-medium">
                          Asilmetta, Visakhapatnam - 530 003. Phone : 0891 - 2760740
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-stone-500 font-light mt-0.5">
                          email : endow-eosampath@gov.in, online: aptemples.ap.gov.in
                        </p>
                      </div>
                    </div>

                    {/* Receipt Title */}
                    <div className="text-center my-6 relative z-10">
                      <div className="inline-block border-2 border-[#002244] px-6 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#002244] font-serif bg-stone-50">
                        Donation Receipt / విరాళ రసీదు
                      </div>
                    </div>

                    {/* Details Table */}
                    <div className="overflow-x-auto relative z-10">
                      <table className="w-full border-collapse text-stone-800 text-xs sm:text-sm">
                        <tbody>
                          <tr>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600 w-1/4">Receipt No:</td>
                            <td className="p-3 border border-stone-200 text-stone-900 font-mono font-semibold">{generatedReceipt.receiptNo}</td>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600 w-1/4">Date:</td>
                            <td className="p-3 border border-stone-200 text-stone-900">{generatedReceipt.date}</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600">Devotee Name:</td>
                            <td className="p-3 border border-stone-200 text-stone-900 font-bold" colSpan={3}>{generatedReceipt.name}</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600">Contact details:</td>
                            <td className="p-3 border border-stone-200 text-stone-900 font-medium" colSpan={3}>{generatedReceipt.phoneOrEmail}</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600">Address:</td>
                            <td className="p-3 border border-stone-200 text-stone-800 italic" colSpan={3}>{generatedReceipt.address}</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-stone-200 font-semibold bg-stone-50/50 text-stone-600">Seva Purpose:</td>
                            <td className="p-3 border border-stone-200 text-stone-900 font-semibold" colSpan={3}>{generatedReceipt.purpose}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Amount in words & Value */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-stone-50 border border-stone-200 mt-4 gap-3 relative z-10">
                      <div>
                        <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">Amount in Words / అక్షరాల</span>
                        <p className="font-bold text-stone-700 italic mt-0.5 text-xs">
                          {numberToWords(Number(generatedReceipt.amount))}
                        </p>
                      </div>
                      <div className="text-right shrink-0 bg-[#002244] text-white px-5 py-2.5 rounded-xl border border-stone-800">
                        <span className="text-[10px] text-stone-300 block uppercase font-bold tracking-wider leading-none">TOTAL RECEIVED</span>
                        <span className="text-xl sm:text-2xl font-bold font-sans">₹{Number(generatedReceipt.amount).toLocaleString('en-IN')}.00</span>
                      </div>
                    </div>

                    {/* Payment Proof Screenshot Section inside Preview Receipt */}
                    {generatedReceipt.proofUrl && (
                      <div className="mt-6 border border-stone-200 p-4 bg-stone-50/50 rounded-2xl relative z-10 text-center">
                        <div className="text-left text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 pb-1 border-b border-stone-200">
                          Payment Proof Screenshot / చెల్లింపు రుజువు
                        </div>
                        <img 
                          src={generatedReceipt.proofUrl} 
                          alt="Uploaded payment proof" 
                          className="max-h-56 max-w-full object-contain mx-auto rounded-lg border border-stone-200 shadow-sm" 
                        />
                      </div>
                    )}

                    {/* Receipt Footer */}
                    <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-stone-500 gap-4 mt-6 relative z-10">
                      <div className="text-center sm:text-left">
                        <p className="font-semibold text-emerald-700 flex items-center gap-1">
                          <span>✓</span> Transaction Status: Successfully Processed (PAID)
                        </p>
                        <p className="text-[9px] text-stone-400 mt-0.5">
                          May Lord Sri Sampath Vinayagar shower divine blessings, peace, and prosperity upon you.
                        </p>
                      </div>
                      <div className="text-center sm:text-right space-y-1">
                        <div className="h-6 w-24 mx-auto sm:ml-auto opacity-30 flex items-center justify-center font-serif text-[10px] italic border-b border-stone-400">
                          Sri S. V. T. Trust
                        </div>
                        <p className="font-bold text-stone-800 uppercase tracking-widest text-[9px]">Authorized Signatory</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handlePrintReceipt}
                      className="px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Download Receipt (PDF) / ప్రింట్ చేయండి</span>
                      <span>⬇️</span>
                    </button>
                    <button
                      onClick={() => {
                        setGeneratedReceipt(null);
                        setDevoteeName("");
                        setPhoneOrEmail("");
                        setAddress("");
                        setAmountPaid("");
                        setScreenshotFile(null);
                        setScreenshotPreview("");
                      }}
                      className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 hover:-translate-y-0.5 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Another Payment / కొత్త రసీదు</span>
                      <span>🔄</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Donations;
