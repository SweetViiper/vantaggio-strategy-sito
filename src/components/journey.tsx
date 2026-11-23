// The opening journey: a film cut into chapters, played forwards and backwards
// by the page scroll. Each chapter owns a stretch of scroll; its clip is seeked
// to the matching frame while the copy stays readable on top.
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import "../styles/journey.css";

export interface JourneyChapter {
  id: string;
  label: string;
  title: string;
  body: string;
  kicker?: string;
  tags?: string[];
  align?: "left" | "right";
  /** Scroll distance of the chapter, in viewport heights. */
  length: number;
  /** Desktop clip and its first frame. */
  clip: string;
  poster: string;
  /** Portrait clip and its first frame, used on phones. */
  mobileClip: string;
  mobilePoster: string;
}

const PHONE_QUERY = "(hover: none) and (pointer: coarse), (max-width: 860px)";

interface Track {
  band: HTMLElement;
  layer: HTMLElement;
  top: number;
  bottom: number;
  goal: number;
  shown: number;
  onScreen: boolean;
  source?: string;
  video?: HTMLVideoElement;
  url?: string;
  cancel?: AbortController;
  state: "idle" | "loading" | "ready" | "failed";
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export function Journey({ chapters }: { chapters: JourneyChapter[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const jumpRef = useRef<(index: number) => void>(() => {});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const layers = [...root.querySelectorAll<HTMLElement>("[data-journey-layer]")];
    const bands = [...root.querySelectorAll<HTMLElement>("[data-journey-band]")];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 860px)");
    const onPhone = () => touch || narrow.matches;
    const pick = (index: number) => (onPhone() ? chapters[index].mobileClip : chapters[index].clip);

    const tracks: Track[] = chapters.map((_, index) => ({
      band: bands[index],
      layer: layers[index],
      top: 0,
      bottom: 0,
      goal: 0,
      shown: 0,
      onScreen: index === 0,
      state: "idle",
    }));

    let stopped = false;
    let stale = true;
    let raf = 0;
    let origin = 0;
    let span = 1;
    let viewport = window.innerHeight;
    let width = window.innerWidth;
    let touched = false;
    let active = -1;

    const drop = (track: Track) => {
      track.cancel?.abort();
      track.video?.remove();
      if (track.url) {
        URL.revokeObjectURL(track.url);
      }
      track.cancel = undefined;
      track.video = undefined;
      track.url = undefined;
      track.source = undefined;
      track.state = "idle";
      track.shown = track.goal;
      delete track.layer.dataset.playing;
    };

    const measure = () => {
      const pageY = window.scrollY;
      origin = root.getBoundingClientRect().top + pageY;
      viewport = window.innerHeight;
      width = window.innerWidth;
      tracks.forEach((track, index) => {
        if (track.source && track.source !== pick(index)) {
          drop(track);
        }
        const box = track.band.getBoundingClientRect();
        track.top = box.top + pageY - origin;
        track.bottom = track.top + box.height;
      });
      span = Math.max(tracks[tracks.length - 1]?.bottom ?? viewport, viewport);
      stale = true;
    };

    // iOS only paints seeked frames after the video has been played once.
    const wake = async (video?: HTMLVideoElement) => {
      if (!video || !onPhone()) {
        return;
      }
      try {
        await video.play();
        video.pause();
      } catch {
        // The poster stays until a later gesture lets the video start.
      }
    };

    const load = async (track: Track, index: number) => {
      const source = pick(index);
      if (still || stopped || track.state !== "idle") {
        return;
      }
      track.state = "loading";
      track.source = source;
      const cancel = new AbortController();
      track.cancel = cancel;
      try {
        // Download the whole clip first: seeking a fully buffered file is instant.
        const response = await fetch(source, { signal: cancel.signal });
        if (!response.ok) {
          throw new Error(String(response.status));
        }
        const blob = await response.blob();
        if (stopped || cancel.signal.aborted || track.source !== source) {
          return;
        }
        const url = URL.createObjectURL(blob);
        const video = document.createElement("video");
        video.className = "vj__video";
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (track.video === video) {
              track.state = "ready";
              stale = true;
            }
          },
          { once: true },
        );
        video.addEventListener(
          "loadeddata",
          () => {
            if (touched && track.video === video) {
              void wake(video);
            }
          },
          { once: true },
        );
        video.addEventListener(
          "seeked",
          () => {
            if (track.video === video) {
              track.layer.dataset.playing = "true";
            }
          },
          { once: true },
        );
        video.addEventListener(
          "error",
          () => {
            if (track.video === video) {
              drop(track);
              track.state = "failed";
            }
          },
          { once: true },
        );
        video.src = url;
        track.layer.append(video);
        track.video = video;
        track.url = url;
      } catch {
        if (!cancel.signal.aborted && track.source === source) {
          track.state = "failed";
        }
      }
    };

    const read = () => {
      const y = Math.min(span, Math.max(0, window.scrollY - origin));
      const blend = Math.max(viewport * 0.1, 1);
      let now = 0;
      tracks.forEach((track, index) => {
        if (y >= track.top) {
          now = index;
        }
        track.goal = clamp01((y - track.top) / Math.max(track.bottom - track.top, 1));
        const away = y < track.top ? track.top - y : y > track.bottom ? y - track.bottom : 0;
        const opacity = still ? (away === 0 ? 1 : 0) : ease(1 - away / blend);
        track.onScreen = opacity > 0.001;
        track.layer.style.opacity = String(opacity);
        if (y > track.top - viewport * 1.5 && y < track.bottom + viewport * 1.5) {
          void load(track, index);
        }
      });
      tracks.forEach((track, index) => {
        track.layer.style.zIndex = index === now ? "2" : "1";
      });
      if (now !== active) {
        active = now;
        setCurrent(now);
      }
      root.style.setProperty("--vj-progress", String(clamp01(y / span)));
    };

    const seek = () => {
      for (const track of tracks) {
        const video = track.video;
        if (!video || track.state !== "ready" || video.seeking) {
          continue;
        }
        if (!track.onScreen && Math.abs(track.shown - track.goal) < 0.002) {
          continue;
        }
        // Ease towards the scroll position so fast flicks stay smooth.
        track.shown += (track.goal - track.shown) * 0.2;
        const time = Math.min(track.shown, 0.999) * (video.duration || 1);
        if (Math.abs(video.currentTime - time) > (onPhone() ? 0.02 : 0.008)) {
          try {
            video.currentTime = time;
          } catch {
            // Keep the last painted frame.
          }
        }
      }
    };

    const loop = () => {
      if (stopped) {
        return;
      }
      if (stale) {
        stale = false;
        read();
      }
      seek();
      raf = window.requestAnimationFrame(loop);
    };

    const onScroll = () => {
      stale = true;
    };
    const onResize = () => {
      // Phone browsers resize on every toolbar show/hide: only width matters there.
      if (touch && window.innerWidth === width) {
        return;
      }
      measure();
    };
    const onGesture = () => {
      if (touched) {
        return;
      }
      touched = true;
      tracks.forEach((track) => void wake(track.video));
    };

    jumpRef.current = (index) => {
      const track = tracks[index];
      if (track) {
        window.scrollTo({
          top: origin + track.top + 0.15 * (track.bottom - track.top),
          behavior: still ? "auto" : "smooth",
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });
    measure();
    raf = window.requestAnimationFrame(loop);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      tracks.forEach((track) => {
        drop(track);
        track.layer.style.removeProperty("opacity");
        track.layer.style.removeProperty("z-index");
      });
    };
  }, [chapters]);

  return (
    <section className="vj" ref={rootRef}>
      <div className="vj__stage">
        <div className="vj__film" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <figure className="vj__layer" data-journey-layer="" key={chapter.id}>
              <picture>
                <source media={PHONE_QUERY} srcSet={chapter.mobilePoster} />
                <img
                  className="vj__poster"
                  src={chapter.poster}
                  alt=""
                  decoding="async"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </picture>
            </figure>
          ))}
        </div>
        <div className="vj__bar" aria-hidden="true">
          <span />
        </div>
        <nav className="vj__chapters" aria-label="Capitoli">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              aria-current={current === index ? "step" : undefined}
              onClick={() => jumpRef.current(index)}
            >
              {chapter.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="vj__story">
        {chapters.map((chapter, index) => {
          const Heading = index === 0 ? "h1" : "h2";
          const style: CSSProperties = { minHeight: `${chapter.length * 100}dvh` };
          return (
            <article
              className="vj__chapter"
              data-align={chapter.align ?? "left"}
              data-journey-band=""
              id={chapter.id}
              key={chapter.id}
              style={style}
            >
              <div className="vj__pin">
                <div className="vj__copy">
                  {chapter.kicker ? <p className="vj__kicker">{chapter.kicker}</p> : null}
                  <Heading className="vj__title">{chapter.title}</Heading>
                  <p className="vj__body">{chapter.body}</p>
                  {chapter.tags ? (
                    <ul className="vj__tags">
                      {chapter.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
