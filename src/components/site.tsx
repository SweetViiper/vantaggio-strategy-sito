import { useState } from "react";
import type { FormEvent } from "react";

import "../styles/site.css";

const LOGO = "/assets/brand/vantaggio-strategy-logo-negativo.svg";
const MARK = "/assets/brand/vantaggio-simbolo.svg";
export const WHATSAPP_URL =
  "https://wa.me/393453921128?text=" +
  encodeURIComponent("Ciao, ho visto il sito di Vantaggio Strategy e vorrei più clienti per la mia attività.");

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth="1.8" d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path strokeWidth="2.4" d="M9 8.4c-.2 3.4 3.2 6.8 6.6 6.6" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="vg-wa-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}

export function SiteNav({ solid = false }: { solid?: boolean }) {
  return (
    <header className={solid ? "vg-nav vg-nav--solid" : "vg-nav"}>
      <a className="vg-nav__logo" href="/#inizio" aria-label="Vantaggio Strategy, torna all'inizio">
        <img src={LOGO} alt="Vantaggio Strategy" width={190} height={34} />
      </a>
      <nav className="vg-nav__links" aria-label="Sezioni del sito">
        <a href="/#risultati">Risultati</a>
        <a className="vg-nav__key" href="/#funnel">
          Il funnel
        </a>
        <a href="/#servizi">Servizi</a>
        <a href="/#metodo">Metodo</a>
      </nav>
      <a className="vg-nav__cta" href="/#contatti">
        Parliamone
      </a>
    </header>
  );
}

const SERVICE_GROUPS = [
  {
    area: "Contenuti",
    intro: "Attirano le persone giuste e le preparano all'acquisto.",
    items: [
      {
        name: "Contenuti social",
        text: "Idea, script, riprese, montaggio e pubblicazione su 4 social, con piano editoriale mensile.",
      },
      {
        name: "Shooting foto e video",
        text: "Sessioni professionali per prodotti, persone e spazi della tua attività.",
      },
      {
        name: "Grafiche e video 3D",
        text: "Visual tridimensionali per far risaltare prodotti e lanci.",
      },
      {
        name: "Influencer marketing",
        text: "Selezione dei creator giusti e gestione delle collaborazioni.",
      },
    ],
  },
  {
    area: "Advertising",
    intro: "Trasformano il budget in richieste di clienti veri.",
    items: [
      {
        name: "Meta Ads",
        text: "Campagne su Facebook e Instagram con test su pubblici, offerte e creatività.",
      },
      {
        name: "TikTok e Google Ads",
        text: "La piattaforma scelta in base all'obiettivo di ogni campagna.",
      },
      {
        name: "Tracciamento e report",
        text: "Pixel, tracciamento dei contatti e report regolari con i prossimi passi.",
      },
    ],
  },
  {
    area: "Tecnologia",
    intro: "Porta ogni contatto fino alla vendita.",
    items: [
      {
        name: "Landing page classiche e 3D",
        text: "Pagine disegnate sul tuo brand, collegate alle campagne e al tracciamento.",
      },
      {
        name: "E-commerce e TikTok Shop",
        text: "Negozi online pronti a vendere, anche direttamente dai social.",
      },
      {
        name: "CRM personalizzato",
        text: "Dashboard di lead e vendite per sapere sempre a che punto è ogni contatto.",
      },
      {
        name: "Automazioni AI",
        text: "Risposte e follow-up automatici, smistamento e punteggio dei lead.",
      },
      {
        name: "Applicazioni su misura",
        text: "Strumenti digitali costruiti intorno al tuo modo di lavorare.",
      },
    ],
  },
  {
    area: "Strategia d'impresa",
    intro: "Per vendere di più e guadagnare di più su ogni vendita.",
    items: [
      {
        name: "Brand identity",
        text: "Logo, colori, caratteri e tono di voce per farti riconoscere ovunque.",
      },
      {
        name: "Ottimizzazione dei margini",
        text: "Costi, prezzi e marginalità per prodotto, per crescere guadagnando di più.",
      },
      {
        name: "Nuovi prodotti e servizi",
        text: "Dall'idea all'offerta pronta da mettere sul mercato.",
      },
    ],
  },
];

const CASES = [
  {
    client: "B&B Manager",
    channel: "Campagne Meta",
    figure: "21",
    unit: "contratti firmati",
    text: "Con €22.355 di pubblicità sono arrivati 21 contratti per un valore di €143.850.",
    stats: [
      { value: "€143.850", label: "valore dei contratti" },
      { value: "6,4x", label: "ogni euro investito" },
    ],
  },
  {
    client: "Corso Barman Roma",
    channel: "Campagne Meta",
    figure: "63",
    unit: "richieste di iscrizione",
    text: "Con €140 di pubblicità 63 persone hanno chiesto informazioni sul corso.",
    stats: [
      { value: "€2,22", label: "costo per richiesta" },
      { value: "€140", label: "investiti in tutto" },
    ],
  },
  {
    client: "Tellum Barber Shop",
    channel: "Video organici Instagram",
    figure: "17 mln",
    unit: "persone raggiunte in 30 giorni",
    text: "I video hanno portato il salone davanti a milioni di persone, e le poltrone si sono riempite.",
    stats: [
      { value: "20", label: "tagli prenotati" },
      { value: "47 mln", label: "visualizzazioni in 90 giorni" },
    ],
  },
];

export function Results() {
  return (
    <section className="vg-section vg-results" id="risultati">
      <div className="vg-wrap">
        <p className="vg-label">Risultati</p>
        <h2 className="vg-h2">
          Non ti chiediamo di fidarti. Guarda i <em>numeri</em>.
        </h2>
        <div className="vg-cases">
          {CASES.map((item) => (
            <article className="vg-case" key={item.client}>
              <header>
                <h3>{item.client}</h3>
                <p>{item.channel}</p>
              </header>
              <p className="vg-case__figure">
                <strong>{item.figure}</strong>
                <span>{item.unit}</span>
              </p>
              <p className="vg-case__text">{item.text}</p>
              <dl>
                {item.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <div className="vg-results__cta">
          <p>Vuoi numeri così per la tua attività?</p>
          <a className="vg-results__btn" href="#contatti">
            Parliamone
            <img src={MARK} alt="" width={22} height={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="vg-section vg-services" id="servizi">
      <div className="vg-wrap">
        <p className="vg-label">Servizi</p>
        <h2 className="vg-h2">
          Ogni servizio è un pezzo dello stesso sistema: quello che ti porta <em>clienti</em>.
        </h2>
        <div className="vg-groups">
          {SERVICE_GROUPS.map((group) => (
            <article className="vg-group" key={group.area}>
              <header className="vg-group__head">
                <img src={MARK} alt="" width={22} height={20} />
                <div>
                  <h3>{group.area}</h3>
                  <p>{group.intro}</p>
                </div>
              </header>
              <ul className="vg-group__list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { name: "Onboarding", text: "Ti presentiamo il team e raccogliamo gli accessi." },
  { name: "Questionario", text: "Domande su azienda, clienti, prodotti e obiettivi." },
  { name: "Strategia", text: "Ti presentiamo la strategia e la rivediamo insieme." },
  { name: "Piano mensile", text: "Piano editoriale ogni mese, con revisione condivisa." },
  { name: "Script", text: "Script dei contenuti ogni 2 settimane, prima di registrare." },
];

export function Method() {
  return (
    <section className="vg-section vg-method" id="metodo">
      <div className="vg-wrap">
        <p className="vg-label">Metodo</p>
        <h2 className="vg-h2">Cinque passi, sempre nello stesso ordine.</h2>
        <ol className="vg-steps">
          {STEPS.map((step, index) => (
            <li key={step.name} style={{ marginTop: `${(STEPS.length - 1 - index) * 1.25}rem` }}>
              <span className="vg-steps__n">{index + 1}</span>
              <strong>{step.name}</strong>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type Status = "idle" | "sending" | "done" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const text = (key: string) => String(values.get(key) ?? "");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: text("name"),
          company: text("company"),
          phone: text("phone"),
          message: text("message"),
          consent: true,
          website: text("website"),
        }),
      });
      const result = (await response.json()) as { ok?: boolean };
      if (response.ok && result.ok) {
        form.reset();
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="vg-section vg-contact" id="contatti">
      <div className="vg-wrap vg-contact__grid">
        <div className="vg-contact__intro">
          <p className="vg-label">Contatti</p>
          <h2 className="vg-h2">Quanti clienti in più vuoi?</h2>
          <p className="vg-lead">
            Lasciaci nome e telefono: ti richiamiamo noi per una consulenza gratuita e capiamo
            insieme da dove possono arrivare i tuoi prossimi clienti.
          </p>
          <a className="vg-wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Scrivici su WhatsApp
          </a>
          <p className="vg-contact__alt">Preferisci scrivere? Rispondiamo in giornata.</p>
          <img className="vg-contact__mark" src={MARK} alt="" width={160} height={146} />
        </div>

        {status === "done" ? (
          <div className="vg-form vg-form--done" role="status">
            <h3>Richiesta inviata.</h3>
            <p>Grazie, ti richiamiamo al più presto.</p>
            <button className="vg-ghost" type="button" onClick={() => setStatus("idle")}>
              Invia un'altra richiesta
            </button>
          </div>
        ) : (
          <form className="vg-form" onSubmit={onSubmit}>
            <div className="vg-field">
              <label htmlFor="vg-name">Nome</label>
              <input id="vg-name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
            </div>
            <div className="vg-field">
              <label htmlFor="vg-phone">Telefono</label>
              <input id="vg-phone" name="phone" type="tel" required minLength={6} maxLength={40} autoComplete="tel" inputMode="tel" />
            </div>
            <div className="vg-field vg-field--wide">
              <label htmlFor="vg-company">La tua attività</label>
              <input id="vg-company" name="company" required minLength={2} maxLength={160} autoComplete="organization" placeholder="Es. studio dentistico a Roma" />
            </div>
            <div className="vg-field vg-field--wide">
              <label htmlFor="vg-message">Cosa vorresti ottenere (facoltativo)</label>
              <textarea id="vg-message" name="message" maxLength={4000} rows={3} />
            </div>
            <div className="vg-hp" aria-hidden="true">
              <label htmlFor="vg-website">Sito web</label>
              <input id="vg-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="vg-consent vg-field--wide">
              <input name="consent" type="checkbox" required />
              <span>Acconsento al trattamento dei miei dati per essere ricontattato.</span>
            </label>
            {status === "error" ? (
              <p className="vg-error vg-field--wide" role="alert">
                Invio non riuscito. Controlla i campi e riprova tra poco.
              </p>
            ) : null}
            <button className="vg-send vg-field--wide" type="submit" disabled={status === "sending"}>
              <span>{status === "sending" ? "Invio in corso" : "Richiamatemi"}</span>
              <img src={MARK} alt="" width={16} height={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="vg-footer">
      <div className="vg-wrap vg-footer__row">
        <img src={LOGO} alt="Vantaggio Strategy" width={170} height={31} />
        <p>Un vantaggio alla volta.</p>
        <p>Acquisizione clienti e vendite · Roma</p>
      </div>
    </footer>
  );
}
