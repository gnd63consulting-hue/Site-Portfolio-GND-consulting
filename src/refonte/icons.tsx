/* Lucide-style icons, single stroke. Ported to ES modules (was window-global in prototype). */
import * as React from 'react';

const Icon = ({ children, size = 20, className = "", stroke = 1.5 }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    className={className}>{children}</svg>
);

const Icons: any = {
  ArrowRight: (p: any) => <Icon {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>,
  ArrowUpRight: (p: any) => <Icon {...p}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></Icon>,
  ArrowDown: (p: any) => <Icon {...p}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></Icon>,
  Play: (p: any) => <Icon {...p}><polygon points="6 3 20 12 6 21 6 3"/></Icon>,
  Plus: (p: any) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>,
  Check: (p: any) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>,
  X: (p: any) => <Icon {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>,
  Menu: (p: any) => <Icon {...p}><path d="M4 7h16"/><path d="M4 17h16"/></Icon>,
  Mail: (p: any) => <Icon {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></Icon>,
  Phone: (p: any) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>,
  MapPin: (p: any) => <Icon {...p}><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></Icon>,
  Calendar: (p: any) => <Icon {...p}><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></Icon>,
  Clock: (p: any) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Icon>,
  Sparkles: (p: any) => <Icon {...p}><path d="M12 3v4M5 8l3 3M3 14h4M16 5l3-3M19 14h2M14 19l3 3M8 19l-3 3M12 17v4"/><path d="M12 11l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5L12 11z"/></Icon>,
  Cpu: (p: any) => <Icon {...p}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></Icon>,
  Camera: (p: any) => <Icon {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></Icon>,
  Film: (p: any) => <Icon {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 8h4"/><path d="M3 16h4"/><path d="M17 8h4"/><path d="M17 16h4"/><path d="M3 12h18"/></Icon>,
  Palette: (p: any) => <Icon {...p}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.5 0 1-.5 1-1v-1c0-1 .8-1.7 1.7-1.7H17a5 5 0 0 0 5-5C22 6.5 17.5 2 12 2z"/></Icon>,
  Globe: (p: any) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></Icon>,
  Zap: (p: any) => <Icon {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></Icon>,
  Layers: (p: any) => <Icon {...p}><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></Icon>,
  Shield: (p: any) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>,
  Users: (p: any) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  Quote: (p: any) => <Icon {...p}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2v2z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2h-4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2v2z"/></Icon>,
  Instagram: (p: any) => <Icon {...p}><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></Icon>,
  Linkedin: (p: any) => <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></Icon>,
  Behance: (p: any) => <Icon {...p}><path d="M3 5h6a3 3 0 0 1 0 6H3z"/><path d="M3 11h7a3 3 0 0 1 0 6H3z"/><path d="M15 7h6"/><path d="M14 14a4 4 0 1 0 8 0v-1h-7"/></Icon>,
  Utensils: (p: any) => <Icon {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/><path d="M21 15v7"/></Icon>,
  Scissors: (p: any) => <Icon {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></Icon>,
  Car: (p: any) => <Icon {...p}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></Icon>,
  Hammer: (p: any) => <Icon {...p}><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0s-.83-2.17 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></Icon>,
  Store: (p: any) => <Icon {...p}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></Icon>,
};

export { Icon, Icons };
