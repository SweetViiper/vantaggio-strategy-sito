// The opening film: one continuous climb cut into five chapters. Every poster
// is the first frame of the clip beside it.
import type { JourneyChapter } from "./components/journey";

const media = (n: string) => ({
  clip: `/assets/world/scene-${n}.mp4`,
  mobileClip: `/assets/world/scene-${n}-mobile.mp4`,
  mobilePoster: `/assets/world/scene-${n}-mobile-poster.jpg`,
  poster: `/assets/world/scene-${n}-poster.jpg`,
});

export const chapters: JourneyChapter[] = [
  {
    ...media("01"),
    id: "inizio",
    label: "Inizio",
    kicker: "Agenzia di marketing · Roma",
    title: "Ti portiamo clienti, non like.",
    body: "Non siamo un'agenzia come le altre: tutto quello che facciamo ha un solo scopo, farti vendere di più. Un vantaggio alla volta.",
    length: 1.5,
  },
  {
    ...media("02"),
    id: "contenuti",
    label: "Contenuti",
    align: "right",
    title: "Contenuti fatti per vendere.",
    body: "Ogni video nasce per portare una persona un passo più vicina all'acquisto, non per fare numeri che non pagano le fatture.",
    tags: ["Instagram", "TikTok", "Facebook", "LinkedIn o YouTube"],
    length: 1.5,
  },
  {
    ...media("03"),
    id: "advertising",
    label: "Advertising",
    title: "Campagne che portano richieste.",
    body: "Meta, TikTok e Google Ads ottimizzate sui clienti che acquisisci davvero, non sui clic. Ogni euro di budget deve poter diventare un contatto.",
    tags: ["Meta Ads", "TikTok Ads", "Google Ads"],
    length: 1.5,
  },
  {
    ...media("04"),
    id: "tecnologia",
    label: "Tecnologia",
    align: "right",
    title: "Nessun contatto resta indietro.",
    body: "Landing page, CRM e automazioni AI rispondono, smistano e ricontattano ogni richiesta, finché non diventa una vendita.",
    tags: ["Landing 3D", "CRM", "Automazioni AI"],
    length: 1.5,
  },
  {
    ...media("05"),
    id: "vendite",
    label: "Vendite",
    title: "Contiamo i clienti, non i follower.",
    body: "Nei nostri report trovi contatti, trattative e vendite. È su quei numeri che ci misuri, ed è su quelli che lavoriamo ogni settimana.",
    tags: ["Contatti", "Trattative", "Vendite"],
    length: 1.7,
  },
];
