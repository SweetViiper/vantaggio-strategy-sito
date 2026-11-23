import { useState } from "react";
import type { CSSProperties } from "react";

import "../styles/funnel.css";

const MARK = "/assets/brand/vantaggio-simbolo.svg";

export function FunnelHero({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? "h2" : "h1";
  return (
    <section
      className={embedded ? "vg-section vg-fhero vg-fhero--embedded" : "vg-section vg-fhero"}
      id={embedded ? "funnel" : "inizio"}
    >
      <div className="vg-wrap">
        <p className="vg-label">Il funnel</p>
        <Heading className="vg-h1">
          Il marketing è una scatola: metti soldi, escono <em>moltiplicati</em>.
        </Heading>
        <p className="vg-fhero__lead">
          Se è fatto bene. Qui ti spieghiamo esattamente cosa c'è dentro la scatola che costruiamo
          per i nostri clienti, un pezzo alla volta.
        </p>
        <div className="vg-box" role="img" aria-label="Schema: entra il budget, passa dal funnel, esce moltiplicato in vendite">
          <div className="vg-box__in">
            <span>Entra</span>
            <strong>€</strong>
            <small>Il tuo budget</small>
          </div>
          <span className="vg-box__arrow" aria-hidden="true" />
          <div className="vg-box__core">
            <img src={MARK} alt="" width={30} height={27} />
            <strong>La scatola</strong>
            <small>Video organici · Advertising · Pagina · CRM · Vendita</small>
          </div>
          <span className="vg-box__arrow" aria-hidden="true" />
          <div className="vg-box__out">
            <span>Esce</span>
            <strong>€ × n</strong>
            <small>Clienti e fatturato</small>
          </div>
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  {
    stage: "Attenzione",
    tool: "Video organici",
    text: "Video brevi pensati per il tuo cliente ideale: parlano dei suoi problemi, mostrano come lavori e costruiscono fiducia. Chi ti guarda inizia a conoscerti prima ancora di cercarti.",
    tags: ["Reel", "TikTok", "Shorts"],
  },
  {
    stage: "Spinta",
    tool: "Advertising",
    text: "I video che funzionano meglio li spingiamo con campagne a pagamento davanti alle persone giuste. E a chi ti ha già guardato rimostriamo la tua offerta.",
    tags: ["Meta Ads", "Google Ads", "Retargeting"],
  },
  {
    stage: "Contatto",
    tool: "Pagina e offerta",
    text: "Chi è interessato arriva su una pagina con una sola cosa da fare: lasciare i suoi dati o prenotare una chiamata. Niente distrazioni, niente menu infiniti.",
    tags: ["Landing page", "Modulo", "Prenotazione"],
  },
  {
    stage: "Trattativa",
    tool: "CRM e automazioni",
    text: "Ogni contatto entra nel CRM, riceve subito una risposta e viene seguito con messaggi e promemoria finché non decide. Nessuna richiesta resta senza risposta.",
    tags: ["CRM", "Risposte automatiche", "Follow-up"],
  },
  {
    stage: "Vendita",
    tool: "Clienti e numeri",
    text: "Il contatto diventa cliente. Misuriamo quanto è costato acquisirlo e quanto ha portato, e rimettiamo nella scatola solo quello che funziona.",
    tags: ["Costo per cliente", "Fatturato", "Ritorno"],
  },
];

export function FunnelStages() {
  return (
    <section className="vg-section vg-fstages" id="passaggi">
      <div className="vg-wrap">
        <p className="vg-label">Dentro la scatola</p>
        <h2 className="vg-h2">
          Cinque passaggi, da sconosciuto a <em>cliente</em>.
        </h2>
        <ol className="vg-funnel">
          {STAGES.map((item, index) => (
            <li key={item.stage} style={{ "--vg-step": index } as CSSProperties}>
              <div className="vg-funnel__bar">
                <span className="vg-funnel__n">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.stage}</strong>
                <span className="vg-funnel__tool">{item.tool}</span>
              </div>
              <div className="vg-funnel__body">
                <p>{item.text}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FunnelEngines() {
  return (
    <section className="vg-section vg-fengines" id="organico-adv">
      <div className="vg-wrap">
        <p className="vg-label">Organico e advertising</p>
        <h2 className="vg-h2">
          Due motori. Da soli spingono poco, <em>insieme</em> fanno girare tutto.
        </h2>
        <div className="vg-engines">
          <article>
            <h3>Video organici</h3>
            <p className="vg-engines__role">Costruiscono fiducia</p>
            <ul>
              <li>Fanno capire chi sei e perché scegliere te.</li>
              <li>Ci dicono quali messaggi funzionano, prima di spenderci soldi.</li>
              <li>Restano online e continuano a lavorare nel tempo.</li>
            </ul>
          </article>
          <article>
            <h3>Advertising</h3>
            <p className="vg-engines__role">Porta volume</p>
            <ul>
              <li>Mette i video migliori davanti a chi può comprare.</li>
              <li>Rende i contatti prevedibili: sai quanto entra e quanto esce.</li>
              <li>Recupera chi ha guardato ma non ha ancora chiesto.</li>
            </ul>
          </article>
          <article className="vg-engines__sum">
            <h3>Insieme</h3>
            <p className="vg-engines__role">Fanno vendere</p>
            <p>
              L'organico trova il messaggio giusto, l'advertising lo moltiplica. Chi arriva dalla
              pubblicità trova un profilo che dà fiducia, e chi ti segue da tempo riceve l'offerta
              al momento giusto.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

const LEAKS = [
  {
    name: "Persone sbagliate",
    text: "Tante visualizzazioni da chi non comprerà mai. Per questo i contenuti partono dal cliente ideale, non dai trend.",
  },
  {
    name: "Contatti dimenticati",
    text: "Richieste che restano senza risposta per giorni. Per questo ogni contatto entra nel CRM e viene seguito.",
  },
  {
    name: "Numeri che non si guardano",
    text: "Si spende senza sapere cosa torna. Per questo misuriamo clienti e fatturato, non like.",
  },
];

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const intero = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 });
const decimale = new Intl.NumberFormat("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function FunnelCalculator() {
  const [budget, setBudget] = useState(1000);
  const [costoContatto, setCostoContatto] = useState(25);
  const [chiusura, setChiusura] = useState(8);
  const [valoreCliente, setValoreCliente] = useState(1000);

  const contatti = costoContatto > 0 ? budget / costoContatto : 0;
  const clienti = (contatti * chiusura) / 100;
  const fatturato = clienti * valoreCliente;
  const moltiplicatore = budget > 0 ? fatturato / budget : 0;
  const perde = moltiplicatore < 1;

  return (
    <section className="vg-section vg-fcalc" id="calcolo">
      <div className="vg-wrap">
        <p className="vg-label">Fai il conto</p>
        <h2 className="vg-h2">
          Quanto esce dalla tua scatola? Dipende da <em>quattro numeri</em>.
        </h2>
        <p className="vg-fcalc__lead">
          I numeri qui sotto sono solo un esempio per capire il meccanismo, non una promessa.
          Cambiali con i tuoi e guarda cosa succede.
        </p>
        <div className="vg-calc">
          <div className="vg-calc__inputs">
            <label>
              <span>Budget pubblicitario al mese (€)</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={1000000}
                step={100}
                value={budget}
                onChange={(event) => setBudget(clamp(event.target.valueAsNumber, 0, 1000000))}
              />
            </label>
            <label>
              <span>Costo per ogni contatto (€)</span>
              <input
                type="number"
                inputMode="decimal"
                min={1}
                max={10000}
                step={1}
                value={costoContatto}
                onChange={(event) => setCostoContatto(clamp(event.target.valueAsNumber, 1, 10000))}
              />
            </label>
            <label>
              <span>Contatti che diventano clienti (%)</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={1}
                value={chiusura}
                onChange={(event) => setChiusura(clamp(event.target.valueAsNumber, 0, 100))}
              />
            </label>
            <label>
              <span>Quanto vale un cliente (€)</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={10000000}
                step={100}
                value={valoreCliente}
                onChange={(event) => setValoreCliente(clamp(event.target.valueAsNumber, 0, 10000000))}
              />
            </label>
          </div>
          <div className="vg-calc__out" aria-live="polite">
            <dl>
              <div>
                <dt>Contatti</dt>
                <dd>{intero.format(contatti)}</dd>
              </div>
              <div>
                <dt>Clienti</dt>
                <dd>{decimale.format(clienti)}</dd>
              </div>
              <div>
                <dt>Fatturato</dt>
                <dd>{euro.format(fatturato)}</dd>
              </div>
            </dl>
            <p className={perde ? "vg-calc__x vg-calc__x--loss" : "vg-calc__x"}>
              <span>Ogni euro che entra diventa</span>
              <strong>{decimale.format(moltiplicatore)} €</strong>
            </p>
            <p className="vg-calc__note">
              {perde
                ? "Con questi numeri la scatola perde: prima di aumentare il budget va sistemato il funnel."
                : "Il nostro lavoro è migliorare questi quattro numeri, mese dopo mese."}
            </p>
          </div>
        </div>
        <h3 className="vg-leaks__title">Se fatto bene. Ecco dove di solito la scatola perde.</h3>
        <ul className="vg-leaks">
          {LEAKS.map((leak) => (
            <li key={leak.name}>
              <strong>{leak.name}</strong>
              <span>{leak.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FunnelCta() {
  return (
    <section className="vg-section vg-fcta">
      <div className="vg-wrap vg-fcta__row">
        <div>
          <p className="vg-label">Il prossimo passo</p>
          <h2 className="vg-h2">Costruiamo la tua scatola?</h2>
          <p className="vg-lead">
            Raccontaci la tua attività: ti diciamo come imposteremmo il funnel e quali numeri
            guarderemmo insieme.
          </p>
        </div>
        <a className="vg-fcta__btn" href="/#contatti">
          Parliamone
          <img src={MARK} alt="" width={22} height={20} />
        </a>
      </div>
    </section>
  );
}
