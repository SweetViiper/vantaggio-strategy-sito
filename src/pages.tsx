import type { ReactElement } from "react";

import { FunnelCalculator, FunnelCta, FunnelEngines, FunnelHero, FunnelStages } from "./components/funnel";
import { Journey } from "./components/journey";
import { Contact, Method, Results, Services, SiteFooter, SiteNav, WhatsAppFloat } from "./components/site";
import { chapters } from "./scenes";

function Home() {
  return (
    <div className="vg-site">
      <SiteNav />
      <main>
        <Journey chapters={chapters} />
        <FunnelHero embedded />
        <FunnelStages />
        <FunnelEngines />
        <FunnelCalculator />
        <Results />
        <Services />
        <Method />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function FunnelPage() {
  return (
    <div className="vg-site">
      <SiteNav solid />
      <main>
        <FunnelHero />
        <FunnelStages />
        <FunnelEngines />
        <FunnelCalculator />
        <FunnelCta />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

export interface Page {
  path: string;
  title: string;
  description: string;
  element: () => ReactElement;
}

export const pages: Page[] = [
  {
    path: "/",
    title: "Vantaggio Strategy · Ti portiamo clienti, non like",
    description:
      "L'agenzia di Roma che lavora per le tue vendite: contenuti, advertising, CRM e automazioni AI pensati per acquisire clienti. Un vantaggio alla volta.",
    element: Home,
  },
  {
    path: "/funnel",
    title: "Il funnel · Vantaggio Strategy",
    description:
      "Il marketing è una scatola: metti soldi ed escono moltiplicati, se è fatto bene. Ecco il funnel che costruiamo per i nostri clienti, con video organici e advertising.",
    element: FunnelPage,
  },
];

export function pageFor(pathname: string): Page {
  const path = pathname.replace(/\/+$/, "") || "/";
  return pages.find((page) => page.path === path) ?? pages[0];
}
