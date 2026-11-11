import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE, asset, sendLead } from "@/lib/site";

interface BrochureDownloadProps {
  children: React.ReactNode;
}

function startDownload() {
  const link = document.createElement("a");
  link.href = asset("brochure.pdf");
  link.download = "THRIII-Events-Brochure.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function BrochureDownload({ children }: BrochureDownloadProps) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return;
    setSending(true);
    setNote(null);
    const ok = await sendLead({
      _subject: "Brochure download request - THRIII Events",
      Name: String(data.get("name") ?? ""),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      "Request type": "Brochure download",
    });
    setSending(false);
    // The brochure is never held back: the details are a courtesy, the file is the point.
    startDownload();
    if (ok) {
      setOpen(false);
    } else {
      setNote(`Your download has started. We could not send your details, so please email ${SITE.email} if you would like us to follow up.`);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setNote(null);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-background sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal">Download our brochure</DialogTitle>
          <DialogDescription>Leave your details and the PDF downloads straight away.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2 grid gap-5">
          <div className="field">
            <label htmlFor="b-name">Full name</label>
            <input id="b-name" name="name" className="control" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="b-email">Email address</label>
            <input id="b-email" name="email" className="control" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="b-phone">Phone number</label>
            <input id="b-phone" name="phone" className="control" type="tel" autoComplete="tel" />
          </div>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Preparing…" : "Download brochure"}
          </button>
          <div role="status" aria-live="polite">
            {note && (
              <p className="form-status" data-kind="ok">
                {note}
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
