import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "launchweb.co — Digital Agency",
  description: "Next-generation digital products built for scale.",
  keywords: ["digital agency", "web design", "development", "UI/UX", "branding"],
  icons: {
    icon: "/images/icon.jpeg",
  },
  openGraph: {
    title: "launchweb.co — Digital Agency",
    description: "We design and build premium digital products.",
    type: "website",
  },
};

import Preloader from "../components/Preloader";
import DigitalGrid from "../components/DigitalGrid";
import CustomCursor from "../components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
                  originalWarn.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Custom cursor - outside zoom so position is real viewport coords */}
        <CustomCursor />
        {/* Canvas OUTSIDE zoom wrapper so it always fills full viewport */}
        <DigitalGrid />
        {/* Zoom wrapper — scales page content to 80% natively */}
        <div style={{ zoom: 0.8 }}>
          {children}
        </div>
      </body>
    </html>
  );
}

