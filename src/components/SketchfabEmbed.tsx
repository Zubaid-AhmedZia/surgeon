"use client";

type Props = {
  uid?: string;
  url?: string;
  title?: string;
};

export default function SketchfabEmbed({ uid, url, title = "Hand anatomy (Sketchfab)" }: Props) {
  const embedUrl = url || (uid ? `https://sketchfab.com/models/${uid}/embed` : undefined);

  return (
    <div className="mt-8 w-full max-w-[340px] sm:max-w-[400px] mx-auto md:mx-0">
      <div className="text-xs text-porcelain/60 mb-1">Drag to rotate — Provided via Sketchfab</div>
      <div className="relative aspect-[4/5] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        {embedUrl ? (
          <iframe
            title={title}
            src={embedUrl}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-porcelain/70">
            Provide a Sketchfab UID/URL to render the embed.
          </div>
        )}
      </div>
    </div>
  );
}

