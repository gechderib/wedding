import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronDown, CheckCircle2, Printer, Users, UserPlus, Trash2, Edit2, Settings } from 'lucide-react';
import './App.css';

const TEMPLATES = [
  { id: 'teklil', name: 'Traditional Teklil (ተክሊል)' },
  { id: 'minimal-gold', name: 'Elegant Gold (ወርቃማ)' },
  { id: 'modern-dark', name: 'Modern Dark (ዘመናዊ ጥቁር)' },
  { id: 'branna', name: 'Parchment Branna (ብራና)' },
  { id: 'orthodox-cross', name: 'Orthodox Vintage (መስቀል)' },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('teklil');
  const [guests, setGuests] = useState([
    { id: 1, name: 'ክቡር አቶ አበበ' },
    { id: 2, name: 'ወ/ሮ አልማዝ' }
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Editable Card Details
  const [groomName, setGroomName] = useState("ዲያቆን ደረጀ ደርብ");
  const [groomTitle, setGroomTitle] = useState("(እጩ ዶክተር)");
  const [brideName, setBrideName] = useState("ርብቃ ብርሃነ");
  const [invitingFamily, setInvitingFamily] = useState("መምህር ደርብ ጌቴ እና እናንየ ሞላ");
  const [verse, setVerse] = useState("እግዚአብሔር ያጣመረውን እንግዲህ ሰው አይለየው። (ማቴ ፲፱፥፮)");
  const [weddingDate, setWeddingDate] = useState("ቅዳሜ, መስከረም 23 2019\nSaturday, October 3 2026");
  const [weddingTime, setWeddingTime] = useState("ከሰዓት 6:00 ጀምሮ\n12:00 PM onwards");
  const [weddingLocation, setWeddingLocation] = useState("ቃሊቲ ቶታል (Kaliti Total)");
  const [mapLink, setMapLink] = useState("https://maps.app.goo.gl/Vk8Cgm9zjrshFpqC8");

  // For preview, we just show the first guest or a placeholder
  const previewGuest = guests.length > 0 ? guests[0].name : 'የእንግዳ ስም (Guest Name)';

  const handleTemplateChange = (id) => {
    setSelectedTemplate(id);
    setIsMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    setGuests([...guests, { id: Date.now(), name: newGuestName.trim() }]);
    setNewGuestName('');
  };

  const handleDeleteGuest = (id) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const startEditing = (guest) => {
    setEditingId(guest.id);
    setEditingName(guest.name);
  };

  const saveEditing = () => {
    if (!editingName.trim()) {
      handleDeleteGuest(editingId);
    } else {
      setGuests(guests.map(g => g.id === editingId ? { ...g, name: editingName.trim() } : g));
    }
    setEditingId(null);
    setEditingName('');
  };

  const getCardBackground = () => {
    switch (selectedTemplate) {
      case 'teklil':
        return 'bg-wedding-red-dark text-white bg-[url("/teklil_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'minimal-gold':
        return 'bg-[#fdfaf5] text-gray-800 bg-[url("/gold_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'modern-dark':
        return 'bg-gray-950 text-gray-200 bg-[url("/dark_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'branna':
        return 'bg-[#d8c3a5] text-[#3e2723] bg-[url("/branna_bg.png")] bg-cover bg-center bg-no-repeat';
      case 'orthodox-cross':
        return 'bg-blue-950 text-white bg-[url("/cross_bg.png")] bg-cover bg-center bg-no-repeat';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getContainerStyles = () => {
    switch (selectedTemplate) {
      case 'teklil':
        return 'shadow-2xl shadow-red-950/50 border-wedding-gold/40 border';
      case 'minimal-gold':
        return 'shadow-2xl shadow-yellow-900/10 border-[#D4AF37]/30 border';
      case 'modern-dark':
        return 'shadow-2xl shadow-black/80 border-gray-600/50 border';
      case 'branna':
        return 'shadow-2xl shadow-[#3e2723]/30 border-[#8d6e63]/30 border';
      case 'orthodox-cross':
        return 'shadow-2xl shadow-blue-950/80 border-yellow-500/40 border';
      default:
        return 'shadow-xl';
    }
  };

  const getAccentColor = () => {
    if (selectedTemplate === 'teklil') return 'text-wedding-gold';
    if (selectedTemplate === 'minimal-gold') return 'text-[#b38728]';
    if (selectedTemplate === 'modern-dark') return 'text-gray-300';
    if (selectedTemplate === 'branna') return 'text-[#5d4037]';
    if (selectedTemplate === 'orthodox-cross') return 'text-[#f6c342]';
    return 'text-white';
  };

  const appBackground = ['modern-dark', 'orthodox-cross', 'teklil'].includes(selectedTemplate) ? 'bg-gray-950' : 'bg-[#e9ecef]';

  const FrontCard = ({ guest, isPreview = false }) => (
    <div className={`wedding-card relative rounded-xl overflow-hidden flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 text-center font-amharic ${getCardBackground()} ${isPreview ? getContainerStyles() : ''}`}>
      <div className={`absolute inset-0 z-0 ${
        selectedTemplate === 'teklil' ? 'bg-black/50' : 
        selectedTemplate === 'minimal-gold' ? 'bg-white/40' : 
        selectedTemplate === 'orthodox-cross' ? 'bg-black/40' : 
        selectedTemplate === 'branna' ? 'bg-transparent' : 'bg-black/40'
      }`}></div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
        {/* Header Verse */}
        <div className={`text-[10px] sm:text-xs lg:text-sm font-medium leading-snug mt-2 ${getAccentColor()}`}>
          "{verse}"
        </div>

        {/* Guest Name Section */}
        <div className="min-h-[2.5rem] mt-2">
          {guest && (
            <div className={`text-xs sm:text-sm lg:text-lg font-semibold italic ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-white' : 'text-gray-900'}`}>
              ለክቡር/ርት፡ <span className={`underline underline-offset-4 ${getAccentColor()}`}>{guest}</span>
            </div>
          )}
        </div>

        {/* Names */}
        <div className="flex-1 flex flex-col justify-center items-center py-2">
          <h1 className={`text-xl sm:text-2xl lg:text-4xl font-bold leading-tight ${selectedTemplate === 'minimal-gold' ? 'text-[#b38728]' : ''}`}>
            {groomName}
            {groomTitle && <span className="block text-[10px] sm:text-xs lg:text-sm font-normal mt-1 opacity-90">{groomTitle}</span>}
          </h1>
          <div className={`text-lg sm:text-xl lg:text-2xl my-2 font-elegant ${getAccentColor()}`}>
            &
          </div>
          <h1 className={`text-xl sm:text-2xl lg:text-4xl font-bold leading-tight ${selectedTemplate === 'minimal-gold' ? 'text-[#b38728]' : ''}`}>
            {brideName}
          </h1>
        </div>

        <div className={`text-[10px] sm:text-xs lg:text-sm leading-relaxed ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-gray-200' : 'text-gray-800'}`}>
          በእግዚአብሔር ፈቃድ ጋብቻችንን ስለምንፈጽም፣ በዚህ አስደሳች ቀን ተገኝታችሁ ደስታችንን እንድትካፈሉ በታላቅ አክብሮት ጠርተንዎታል።
          <div className="font-semibold mt-2 lg:mt-3 text-[10px] sm:text-xs lg:text-base">
            ጠሪ፡ {invitingFamily}
          </div>
        </div>

        {/* Details Grid */}
        <div className={`w-full grid grid-cols-2 gap-x-2 gap-y-3 lg:gap-y-4 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t ${selectedTemplate === 'minimal-gold' || selectedTemplate === 'branna' ? 'border-gray-800/20' : 'border-white/20'} text-center font-sans`}>
          <div className="flex flex-col items-center justify-start">
            <Calendar className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <h3 className={`font-bold text-[9px] sm:text-[10px] lg:text-xs font-amharic ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-white' : 'text-gray-900'}`}>የሰርግ ቀን</h3>
            <p className={`text-[9px] sm:text-[10px] lg:text-xs whitespace-pre-line ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-gray-300' : 'text-gray-700'}`}>
              {weddingDate}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start">
            <Clock className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <h3 className={`font-bold text-[9px] sm:text-[10px] lg:text-xs font-amharic ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-white' : 'text-gray-900'}`}>ሰዓት</h3>
            <p className={`text-[9px] sm:text-[10px] lg:text-xs whitespace-pre-line ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-gray-300' : 'text-gray-700'}`}>
              {weddingTime}
            </p>
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center mt-1 pb-2 lg:pb-4">
            <MapPin className={`mb-1 w-4 h-4 lg:w-5 lg:h-5 ${getAccentColor()}`} />
            <p className={`text-[9px] sm:text-[10px] lg:text-xs font-semibold px-2 ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-gray-200' : 'text-gray-800'}`}>
              {weddingLocation}
            </p>
            {isPreview && mapLink && (
              <a 
                href={mapLink}
                target="_blank" 
                rel="noreferrer"
                className={`no-print inline-block mt-2 lg:mt-3 px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-[9px] lg:text-xs font-medium transition-transform hover:scale-105 shadow-md ${
                  ['teklil', 'orthodox-cross'].includes(selectedTemplate) 
                    ? 'bg-wedding-gold text-wedding-red-dark hover:bg-white' 
                    : selectedTemplate === 'modern-dark'
                    ? 'bg-white text-gray-900 hover:bg-gray-200'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
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
      <div className={`absolute inset-0 z-0 ${
        selectedTemplate === 'teklil' ? 'bg-black/60' : 
        selectedTemplate === 'minimal-gold' ? 'bg-white/60' : 
        selectedTemplate === 'orthodox-cross' ? 'bg-black/60' : 
        selectedTemplate === 'branna' ? 'bg-transparent' : 'bg-black/60'
      }`}></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center space-y-8">
        <h2 className={`text-2xl lg:text-3xl font-bold font-elegant ${getAccentColor()}`}>
          Thank You
        </h2>
        <p className={`text-lg lg:text-xl ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-white' : 'text-gray-900'}`}>
          በመገኘትዎ እናመሰግናለን
        </p>
        <div className={`w-16 h-px ${getAccentColor()} bg-current opacity-50`}></div>
        <p className={`text-xs lg:text-sm italic max-w-xs ${['teklil', 'modern-dark', 'orthodox-cross'].includes(selectedTemplate) ? 'text-gray-300' : 'text-gray-700'}`}>
          "ፍቅር ይታገሣል፥ ቸርነትንም ያደርጋል" (1ኛ ቆሮ 13:4)
        </p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-700 ${appBackground}`}>
      
      {/* Top Header */}
      <header className="no-print relative z-50 bg-white shadow-sm border-b border-gray-200 lg:h-16 shrink-0 flex flex-col lg:flex-row items-center py-3 lg:py-0 px-4 sm:px-6 justify-between gap-4">
        <h1 className="text-lg lg:text-xl font-bold text-gray-900 font-amharic flex items-center gap-2">
          Wedding Studio
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex justify-center items-center gap-2 px-3 lg:px-4 py-2 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-medium text-xs lg:text-sm"
            >
              <span className="truncate max-w-[120px] lg:max-w-none">Theme: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
              <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 lg:left-auto left-0 mt-2 w-full lg:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]"
                >
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0 ${selectedTemplate === template.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="truncate">{template.name}</span>
                      {selectedTemplate === template.id && (
                        <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={handlePrint}
            disabled={guests.length === 0}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 lg:px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium text-xs lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer size={16} />
            Print ({guests.length})
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="no-print flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden h-full">
        
        {/* Left Sidebar: Guest List */}
        <aside className="w-full lg:w-80 border-b lg:border-r border-gray-300/30 bg-white/50 backdrop-blur-md flex flex-col shrink-0 lg:h-full z-10 order-2 lg:order-1">
          <div className="p-4 border-b border-gray-200/50 bg-white/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Users size={16} className="text-indigo-600" /> 
                Guest List ({guests.length})
              </label>
              {guests.length > 0 && (
                <button 
                  onClick={() => setGuests([])}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            <form onSubmit={handleAddGuest} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Guest name + Enter..." 
                className="flex-1 px-3 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 text-sm shadow-sm"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!newGuestName.trim()}
                className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 disabled:opacity-50 transition-colors"
              >
                <UserPlus size={16} />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 lg:max-h-full max-h-64">
            {guests.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6 italic">No guests yet. Add them above.</p>
            ) : (
              <AnimatePresence>
                {guests.map((guest) => (
                  <motion.div 
                    key={guest.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
                  >
                    {editingId === guest.id ? (
                      <div className="flex-1 flex gap-2">
                        <input 
                          type="text" 
                          autoFocus
                          className="flex-1 px-2 py-1 text-sm border border-indigo-300 rounded outline-none"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEditing()}
                          onBlur={saveEditing}
                        />
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-800 truncate pr-2">{guest.name}</span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditing(guest)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </aside>

        {/* Center: Live Preview */}
        <main className="flex-1 w-full lg:h-full lg:overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center order-1 lg:order-2">
          <motion.div 
            key={selectedTemplate}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[500px] flex justify-center py-4 lg:py-8"
          >
            <FrontCard guest={previewGuest} isPreview={true} />
          </motion.div>
        </main>

        {/* Right Sidebar: Details Editor */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-300/30 bg-white/90 backdrop-blur-md flex flex-col shrink-0 lg:h-full z-10 order-3">
          <div className="p-4 border-b border-gray-200/50 bg-white lg:sticky top-0 z-20 hidden lg:flex">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Settings size={16} className="text-indigo-600" />
              Card Details
            </h2>
          </div>
          
          <div className="lg:hidden p-4 bg-gray-50 text-gray-700 text-sm font-medium border-b border-gray-200 flex items-center gap-2">
            <Settings size={16} className="text-indigo-600" />
            Edit Card Details
          </div>

          <div className="flex-1 lg:overflow-y-auto p-4 space-y-4">
            
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Verse</label>
              <textarea 
                value={verse} onChange={(e) => setVerse(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-16"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Groom Name</label>
              <input 
                type="text" value={groomName} onChange={(e) => setGroomName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Groom Title</label>
              <input 
                type="text" value={groomTitle} onChange={(e) => setGroomTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Bride Name</label>
              <input 
                type="text" value={brideName} onChange={(e) => setBrideName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Inviting Family</label>
              <input 
                type="text" value={invitingFamily} onChange={(e) => setInvitingFamily(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</label>
              <textarea 
                value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-14"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</label>
              <textarea 
                value={weddingTime} onChange={(e) => setWeddingTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-14"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Location Name</label>
              <textarea 
                value={weddingLocation} onChange={(e) => setWeddingLocation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-16"
              />
            </div>

            <div className="space-y-1 pb-8">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">Google Maps Link</label>
              <input 
                type="text" value={mapLink} onChange={(e) => setMapLink(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

          </div>
        </aside>

      </div>

      {/* Hidden Print Content */}
      <div className="print-only hidden">
        {guests.length > 0 ? guests.map((guest, index) => (
          <React.Fragment key={guest.id}>
            {/* Front of card */}
            <div className="print-page">
              <FrontCard guest={guest.name} isPreview={false} />
            </div>
            {/* Back of card */}
            <div className="print-page">
              <BackCard />
            </div>
          </React.Fragment>
        )) : (
          <React.Fragment>
            <div className="print-page">
              <FrontCard guest="" isPreview={false} />
            </div>
            <div className="print-page">
              <BackCard />
            </div>
          </React.Fragment>
        )}
      </div>

    </div>
  );
}

export default App;
