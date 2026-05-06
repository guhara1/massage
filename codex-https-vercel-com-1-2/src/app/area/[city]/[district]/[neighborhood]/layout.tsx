export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .area-hero { padding-top: 70px; }
        .area-hero h1 { max-width: 920px; }
        .area-hero-actions, .nearby-links { display: flex; flex-wrap: wrap; gap: 10px; }
        .area-overview { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; padding-top: 10px; }
        .overview-card, .area-info-card { border: 1px solid var(--line); border-radius: 8px; background: var(--surface); padding: 20px; }
        .overview-card span { display: block; color: var(--accent-strong); font-size: 13px; font-weight: 800; }
        .overview-card strong { display: block; margin-top: 8px; font-size: 24px; }
        .overview-card p, .area-info-card p { margin: 10px 0 0; color: #4b5563; line-height: 1.75; }
        .area-content-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .area-info-card h2 { margin: 0; font-size: 24px; }
        .lead-card { background: #f3faf6; }
        .price-table { display: grid; overflow: hidden; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); }
        .price-row { display: grid; grid-template-columns: 180px 180px minmax(0, 1fr); gap: 16px; align-items: center; border-bottom: 1px solid var(--line); padding: 16px 18px; }
        .price-row:last-child { border-bottom: 0; }
        .price-row span { color: var(--accent-strong); font-weight: 900; }
        .price-row p { margin: 0; color: var(--muted); line-height: 1.55; }
        .caution-section h2 { margin: 0 0 16px; font-size: 30px; }
        .nearby-links a { display: inline-flex; align-items: center; min-height: 38px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); color: #344054; padding: 0 12px; font-size: 14px; font-weight: 800; }
        .nearby-links a:hover { border-color: var(--accent); color: var(--accent-strong); }
        @media (max-width: 920px) { .area-overview, .area-content-grid, .price-row { grid-template-columns: 1fr; } .price-row { gap: 7px; } }
      `}</style>
      {children}
    </>
  );
}
