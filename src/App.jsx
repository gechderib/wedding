import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronDown, CheckCircle2, Printer, Settings, LayoutGrid, LayoutTemplate, Minus, Plus } from 'lucide-react';
import './App.css';

const TEMPLATES = [
  { id: 'teklil', name: 'Traditional Teklil (ተክሊል)' },
  { id: 'minimal-gold', name: 'Elegant Gold (ወርቃማ)' },
  { id: 'modern-dark', name: 'Modern Dark (ዘመናዊ ጥቁር)' },
  { id: 'branna', name: 'Parchment Branna (ብራና)' },
  { id: 'orthodox-cross', name: 'Orthodox Vintage (መስቀል)' },
];

// Standard 5x7 card. A4 = 8.27x11.69in. Landscape A4 = 11.69x8.27in.
// In landscape: 2 cards of 5" wide fit side-by-side (5+5+margins=~11.5" ✓), height 7" fits in 8.27" ✓
// So 2 cards per A4 landscape page is physically possible.
const LAYOUT_OPTIONS = [
  { id: 'single', label: '1 per page', subLabel: '5×7 in card stock', perPage: 1 },
  { id: 'double', label: '2 per page', subLabel: 'A4 Landscape', perPage: 2 },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('teklil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [printCount, setPrintCount] = useState(10);
  const [layoutOption, setLayoutOption] = useState('single');

  // Editable Card Details
  const [groomName, setGroomName] = useState("የ ዲያቆን ደረጀ ደርብ");
  const [groomTitle, setGroomTitle] = useState("(እጩ ዶክተር)");
  const [brideName, setBrideName] = useState("የ ወይዘሪት ርብቃ ብርሃነ");
  const [invitingFamily, setInvitingFamily] = useState("መምህር ደርብ ጌቴ እና ወይዘሮ እናንየ ሞላ");
  const [verse, setVerse] = useState("እግዚአብሔር ያጣመረውን እንግዲህ ሰው አይለየው። (ማቴ ፲፱፥፮)");
  const [weddingDate, setWeddingDate] = useState("ቅዳሜ, መስከረም 23 2019\nSaturday, October 3 2026");
  const [weddingTime, setWeddingTime] = useState("ከሰዓት 6:00 ጀምሮ\n12:00 PM onwards");
  const [weddingLocation, setWeddingLocation] = useState("ሳሎ ቅዱስ ጊዮርጊስ ቤተክርስቲያን\nቃሊቲ ቶታል - አዲስ ሰፈር (Kality Total - Addis Sefer)");
  const [mapLink, setMapLink] = useState("https://maps.app.goo.gl/Vk8Cgm9zjrshFpqC8");

  const selectedLayout = LAYOUT_OPTIONS.find(l => l.id === layoutOption);
  const pageCount = Math.ceil(printCount / selectedLayout.perPage);

  const handleTemplateChange = (id) => {
    setSelectedTemplate(id);
    setIsMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCardBackground = () => {
    switch (selectedTemplate) {
      case 'teklil': return 'bg-wedding-red-dark text-white bg-[url("/teklil_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'minimal-gold': return 'bg-[#fdfaf5] text-gray-800 bg-[url("/gold_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'modern-dark': return 'bg-gray-950 text-gray-200 bg-[url("/dark_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'branna': return 'bg-[#d8c3a5] text-[#3e2723] bg-[url("/branna_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'orthodox-cross': return 'bg-blue-950 text-white bg-[url("/cross_bg.png")] bg-cover bg-center bg-no-repeat';
      default: return 'bg-white text-gray-900';
    }
  };

  const getContainerStyles = () => {
    switch (selectedTemplate) {
      case 'teklil': return 'shadow-2xl shadow-red-950/50 border-wedding-gold/40 border';
      case 'minimal-gold': return 'shadow-2xl shadow-yellow-900/10 border-[#D4AF37]/30 border';
      case 'modern-dark': return 'shadow-2xl shadow-black/80 border-gray-600/50 border';
      case 'branna': return 'shadow-2xl shadow-[#3e2723]/30 border-[#8d6e63]/30 border';
      case 'orthodox-cross': return 'shadow-2xl shadow-blue-950/80 border-yellow-500/40 border';
      default: return 'shadow-xl';
    }
  };

  const getAccentColor = () => {
    if (selectedTemplate === 'teklil') return 'text-white';
    if (selectedTemplate === 'minimal-gold') return 'text-[#b38728]';
    if (selectedTemplate === 'modern-dark') return 'text-gray-300';
    if (selectedTemplate === 'branna') return 'text-[#5d4037]';
    if (selectedTemplate === 'orthodox-cross') return 'text-[#f6c342]';
    return 'text-white';
  };

  const isDark = ['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate);
  const appBackground = isDark ? 'bg-gray-950' : 'bg-[#e9ecef]';

  const FrontCard = ({ isPreview = false }) => (
    <div className={`wedding-card relative rounded-xl overflow-hidden flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 text-center font-amharic ${getCardBackground()} ${isPreview ? getContainerStyles() : ''}`}>
      <div className={`absolute inset-0 z-0 ${selectedTemplate === 'teklil' ? 'bg-black/50' :
        selectedTemplate === 'minimal-gold' ? 'bg-white/40' :
          selectedTemplate === 'orthodox-cross' ? 'bg-black/40' :
            selectedTemplate === 'branna' ? 'bg-transparent' : 'bg-black/40'
        }`}></div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
        {/* Header Verse */}
        <div className="text-[10px] sm:text-xs lg:text-sm font-medium leading-snug mt-2 text-white">
          "{verse}"
        </div>

        {/* Static blank lines for pen-writing guest names */}
        <div className="mt-3 w-full text-center space-y-2">
          <div className={`text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
            ለክቡር/ርት{' '}
            <span className={`inline-block border-b-2 ${isDark ? 'border-wedding-gold/80' : 'border-gray-600'} w-32 sm:w-44 lg:w-56 align-bottom mx-1`}></span>
          </div>
          <div className={`text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
            ከ{' '}
            <span className={`inline-block border-b-2 ${isDark ? 'border-wedding-gold/80' : 'border-gray-600'} w-28 sm:w-40 lg:w-48 align-bottom mx-1`}></span>
            {' '}ጋር
          </div>
        </div>

        {/* Names */}
        <div className="flex-1 flex flex-col justify-center items-center py-2">
          <h1 className={`text-xl sm:text-2xl lg:text-4xl font-bold leading-tight ${selectedTemplate === 'minimal-gold' ? 'text-[#b38728]' : ''}`}>
            {groomName}
            {groomTitle && <span className="block text-sm sm:text-base lg:text-xl font-bold mt-1 opacity-95">{groomTitle}</span>}
          </h1>
          <div className={`text-lg sm:text-xl lg:text-2xl my-2 font-elegant ${getAccentColor()}`}>እና</div>
          <h1 className={`text-xl sm:text-2xl lg:text-4xl font-bold leading-tight ${selectedTemplate === 'minimal-gold' ? 'text-[#b38728]' : ''}`}>
            {brideName}
          </h1>
        </div>

        <div className={`text-[10px] sm:text-xs lg:text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          በእግዚአብሔር ፈቃድ የልጆቻችን ጋብቻ ስለምንፈጽም፣ በዚህ አስደሳች ቀን ተገኝታችሁ ደስታችንን እንድትካፈሉ በታላቅ አክብሮት ጠርተንዎታል።
          <div className="font-semibold mt-2 lg:mt-3 text-[10px] sm:text-xs lg:text-base">
            አክባሪዎ፡ {invitingFamily}
          </div>
        </div>

        {/* Details Grid */}
        <div className={`w-full grid grid-cols-2 gap-x-2 gap-y-3 lg:gap-y-4 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t ${selectedTemplate === 'minimal-gold' || selectedTemplate === 'branna' ? 'border-gray-800/20' : 'border-white/20'} text-center font-sans`}>
          <div className="flex flex-col items-center justify-start">
            <Calendar className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <h3 className={`font-bold text-[9px] sm:text-[10px] lg:text-xs font-amharic ${isDark ? 'text-white' : 'text-gray-900'}`}>የሰርግ ቀን</h3>
            <p className={`text-[9px] sm:text-[10px] lg:text-xs whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{weddingDate}</p>
          </div>

          <div className="flex flex-col items-center justify-start">
            <Clock className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <h3 className={`font-bold text-[9px] sm:text-[10px] lg:text-xs font-amharic ${isDark ? 'text-white' : 'text-gray-900'}`}>ሰዓት</h3>
            <p className={`text-[9px] sm:text-[10px] lg:text-xs whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{weddingTime}</p>
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center mt-1 pb-2 lg:pb-4">
            <MapPin className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <p className={`text-[9px] sm:text-[10px] lg:text-xs font-semibold px-2 whitespace-pre-line ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{weddingLocation}</p>
            {isPreview && mapLink && (
              <a
                href={mapLink} target="_blank" rel="noreferrer"
                className={`no-print inline-block mt-2 lg:mt-3 px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-[9px] lg:text-xs font-medium transition-transform hover:scale-105 shadow-md ${['teklil', 'orthodox-cross'].includes(selectedTemplate) ? 'bg-wedding-gold text-wedding-red-dark hover:bg-white' :
                  selectedTemplate === 'modern-dark' ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
              >
                Open in Google Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const BackCard = () => (
    <div className={`wedding-card relative overflow-hidden flex flex-col justify-center items-center p-10 text-center font-amharic ${getCardBackground()}`}>
      <div className={`absolute inset-0 z-0 ${selectedTemplate === 'teklil' ? 'bg-black/60' :
        selectedTemplate === 'minimal-gold' ? 'bg-white/60' :
          selectedTemplate === 'orthodox-cross' ? 'bg-black/60' :
            selectedTemplate === 'branna' ? 'bg-transparent' : 'bg-black/60'
        }`}></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center space-y-8">
        <h2 className={`text-2xl lg:text-3xl font-bold font-elegant ${getAccentColor()}`}>Thank You</h2>
        <p className={`text-lg lg:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>በመገኘትዎ እናመሰግናለን</p>
        <div className={`w-16 h-px ${getAccentColor()} bg-current opacity-50`}></div>
        <p className={`text-xs lg:text-sm italic max-w-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          "ፍቅር ይታገሣል፥ ቸርነትንም ያደርጋል" (1ኛ ቆሮ 13:4)
        </p>
      </div>
    </div>
  );

  // Build print copies array
  const printCopies = Array.from({ length: printCount }, (_, i) => i);

  // For double layout, pair up into groups of 2
  const printGroups = useMemo(() => {
    if (layoutOption === 'single') {
      return printCopies.map(i => [i]);
    } else {
      const groups = [];
      for (let i = 0; i < printCopies.length; i += 2) {
        groups.push(printCopies.slice(i, i + 2));
      }
      return groups;
    }
  }, [printCount, layoutOption]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-700 ${appBackground}`}>

      {/* Top Header */}
      <header className="no-print relative z-50 bg-white shadow-sm border-b border-gray-200 shrink-0 flex flex-col lg:flex-row items-center py-3 lg:py-0 lg:h-16 px-4 sm:px-6 gap-3 justify-between">
        <h1 className="text-lg lg:text-xl font-bold text-gray-900 font-amharic">Wedding Studio</h1>

        <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-3 w-full lg:w-auto">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-medium text-xs lg:text-sm"
            >
              <span className="truncate max-w-[130px] lg:max-w-none">Theme: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
              <ChevronDown size={15} />
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]"
                >
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 ${selectedTemplate === template.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="truncate">{template.name}</span>
                      {selectedTemplate === template.id && <CheckCircle2 size={17} className="text-indigo-600 shrink-0" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Layout (Cards per page) */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
            {LAYOUT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setLayoutOption(opt.id)}
                title={`${opt.label} — ${opt.subLabel}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${layoutOption === opt.id ? 'bg-white shadow text-indigo-700 border border-indigo-200' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {opt.id === 'single' ? <LayoutTemplate size={14} /> : <LayoutGrid size={14} />}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Print Count */}
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
            <button
              onClick={() => setPrintCount(c => Math.max(1, c - 1))}
              className="px-2 py-2 hover:bg-gray-200 transition-colors text-gray-700"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              max="500"
              value={printCount}
              onChange={(e) => setPrintCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center text-sm font-semibold bg-transparent outline-none text-gray-800"
            />
            <button
              onClick={() => setPrintCount(c => Math.min(500, c + 1))}
              className="px-2 py-2 hover:bg-gray-200 transition-colors text-gray-700"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Info badge */}
          <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 leading-tight text-center">
            <span className="font-semibold text-gray-700">{printCount}</span> cards
            <span className="mx-1 text-gray-400">·</span>
            <span className="font-semibold text-gray-700">{pageCount}</span> sheets
            <div className="text-[10px] text-gray-400">Front + back per sheet</div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium text-sm"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </header>

      {/* Main Studio: 2-column (preview + settings) */}
      <div className="no-print flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">

        {/* Center: Live Preview */}
        <main className="flex-1 w-full lg:h-full lg:overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[500px] flex justify-center py-4 lg:py-8"
          >
            <FrontCard isPreview={true} />
          </motion.div>
        </main>

        {/* Right Sidebar: Details Editor */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-300/30 bg-white/90 backdrop-blur-md flex flex-col shrink-0 lg:h-full z-10">
          <div className="p-4 border-b border-gray-200/50 bg-white hidden lg:flex items-center">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Settings size={16} className="text-indigo-600" /> Card Details
            </h2>
          </div>
          <div className="lg:hidden p-4 bg-gray-50 text-gray-700 text-sm font-medium border-b border-gray-200 flex items-center gap-2">
            <Settings size={16} className="text-indigo-600" /> Edit Card Details
          </div>

          <div className="flex-1 lg:overflow-y-auto p-4 space-y-4">
            <FieldBlock label="Verse" type="textarea" rows={3} value={verse} onChange={setVerse} />
            <FieldBlock label="Groom Name" value={groomName} onChange={setGroomName} />
            <FieldBlock label="Groom Title" value={groomTitle} onChange={setGroomTitle} />
            <FieldBlock label="Bride Name" value={brideName} onChange={setBrideName} />
            <FieldBlock label="Inviting Family" value={invitingFamily} onChange={setInvitingFamily} />
            <FieldBlock label="Date" type="textarea" rows={2} value={weddingDate} onChange={setWeddingDate} />
            <FieldBlock label="Time" type="textarea" rows={2} value={weddingTime} onChange={setWeddingTime} />
            <FieldBlock label="Location Name" type="textarea" rows={3} value={weddingLocation} onChange={setWeddingLocation} />
            <FieldBlock label="Google Maps Link" value={mapLink} onChange={setMapLink} extraClass="pb-8" />
          </div>
        </aside>
      </div>

      {/* ── PRINT CONTENT ── */}
      {/*
        Page order: Front(1), Back(1), Front(2), Back(2) ...
        This way when you enable "Print on both sides" (duplex) in the
        printer dialog, each physical sheet gets the correct front+back.
        10 cards = 10 sheets of 5x7 paper.
      */}
      <div className={`print-only hidden ${layoutOption === 'double' ? 'print-layout-double' : ''}`}>
        {printGroups.map((group, gIdx) => (
          <React.Fragment key={gIdx}>
            {/* Front side */}
            <div className={`print-page ${layoutOption === 'double' ? 'print-page-double' : ''}`}>
              {group.map((_, cIdx) => (
                <div key={cIdx} className={layoutOption === 'double' ? 'print-card-slot' : ''}>
                  <FrontCard isPreview={false} />
                </div>
              ))}
            </div>
            {/* Back side — immediately follows its front for duplex */}
            <div className={`print-page ${layoutOption === 'double' ? 'print-page-double' : ''}`}>
              {group.map((_, cIdx) => (
                <div key={cIdx} className={layoutOption === 'double' ? 'print-card-slot' : ''}>
                  <BackCard />
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}

// Reusable field component
function FieldBlock({ label, value, onChange, type = 'input', rows = 1, extraClass = '' }) {
  const cls = "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none";
  return (
    <div className={`space-y-1 ${extraClass}`}>
      <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  );
}

export default App;
