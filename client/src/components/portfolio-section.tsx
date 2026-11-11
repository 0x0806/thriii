import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { photos, type Photo } from "@/lib/photos";

type Category = "corporate" | "wedding" | "concert";

const ITEMS: { id: string; category: Category; photo: Photo }[] = [
  { id: "1", category: "corporate", photo: photos.hall },
  { id: "2", category: "wedding", photo: photos.bouquet },
  { id: "3", category: "concert", photo: photos.crowd },
  { id: "4", category: "corporate", photo: photos.audience },
  { id: "5", category: "wedding", photo: photos.banquet },
  { id: "6", category: "concert", photo: photos.stage },
];

const FILTERS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "corporate", label: "Corporate" },
  { key: "wedding", label: "Weddings" },
  { key: "concert", label: "Concerts" },
];

export function PortfolioSection() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [active, setActive] = useState<Photo | null>(null);
  const items = filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <section id="portfolio" className="section" data-testid="portfolio-section" aria-labelledby="portfolio-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="portfolio-title" className="h-section" data-testid="portfolio-title">
              Event portfolio
            </h2>
            <p className="lede mt-5" data-testid="portfolio-description">
              Weddings, corporate evenings and concerts we have planned and lit.
            </p>
          </div>
          <div className="filters" role="group" aria-label="Filter by event type" data-testid="portfolio-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="chip"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                data-testid={`filter-${f.key}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery mt-12" data-testid="portfolio-grid">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.photo)}
              aria-label={`Enlarge photo: ${item.photo.alt}`}
              data-testid={`portfolio-item-${item.id}`}
            >
              <span className="frame block">
                <img
                  src={item.photo.small}
                  srcSet={`${item.photo.small} 640w, ${item.photo.large} 1280w`}
                  sizes={index % 6 === 0 || index % 6 === 5 ? "(min-width: 1024px) 620px, (min-width: 640px) 45vw, 100vw" : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"}
                  width={640}
                  height={427}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:rounded-none" data-testid="portfolio-lightbox">
          <DialogTitle className="sr-only">Enlarged event photo</DialogTitle>
          <DialogDescription className="sr-only">{active?.alt}</DialogDescription>
          {active && <img className="lightbox-img" src={active.large} alt={active.alt} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
