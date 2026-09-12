import { assetUrl } from "../utils/asset";
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const harborLightsAudio = `${baseUrl}audio/harbor-lights.mp3`;
const starGraffitiAudio = `${baseUrl}audio/star-graffiti.mp3`;
const lighthouseAudio = `${baseUrl}audio/lighthouse.mp3`;
import harborCoverRaw from "../../docs/Interests/Music/播放器/cover-harbor-lights.jpg";
import starCoverRaw from "../../docs/Interests/Music/播放器/cover-star-graffiti.jpg";
import lighthouseCoverRaw from "../../docs/Interests/Music/播放器/cover-lighthouse.jpg";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

const tracks = [
  {
    id: "harbor-lights",
    title: "Hip-Hop Beat",
    artist: "Watermello",
    audio: harborLightsAudio,
    cover: assetUrl(harborCoverRaw),
  },
  {
    id: "star-graffiti",
    title: "Rap Beat 66Sec",
    artist: "prettyjohn1",
    audio: starGraffitiAudio,
    cover: assetUrl(starCoverRaw),
  },
  {
    id: "lighthouse",
    title: "HipHop Beat",
    artist: "SolarFLEX",
    audio: lighthouseAudio,
    cover: assetUrl(lighthouseCoverRaw),
  },
];

// 音频与封面均来自 Pixabay 曲目页，并按各页面标注的 Pixabay Content License 使用。
// 曲目页：488390 (Watermello)、495236 (prettyjohn1)、589002 (SolarFLEX)。

const frequencyBars = [0.38, 0.72, 0.52, 0.92, 0.46, 0.84, 0.62, 0.78, 0.42, 0.68, 0.56, 0.88];

export default function InterestMusicPlayer() {
  const audioRef = useRef(null);
  const resumeAfterSwitchRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMap, setDurationMap] = useState({});

  const currentTrack = tracks[trackIndex];
  const carouselTracks = useMemo(() => {
    const previous = tracks[(trackIndex - 1 + tracks.length) % tracks.length];
    const next = tracks[(trackIndex + 1) % tracks.length];
    return [
      { ...previous, position: "previous" },
      { ...currentTrack, position: "active" },
      { ...next, position: "next" },
    ];
  }, [currentTrack, trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldResume = resumeAfterSwitchRef.current;
    resumeAfterSwitchRef.current = false;
    audio.load();

    if (shouldResume) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [trackIndex]);

  useEffect(() => {
    const cleanups = tracks.map((track) => {
      const audio = new Audio(track.audio);
      const handleLoaded = () => {
        setDurationMap((current) => ({
          ...current,
          [track.id]: audio.duration || 0,
        }));
      };

      audio.preload = "metadata";
      audio.addEventListener("loadedmetadata", handleLoaded);
      return () => audio.removeEventListener("loadedmetadata", handleLoaded);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  const switchTrack = (nextIndex, shouldPlay = isPlaying) => {
    resumeAfterSwitchRef.current = shouldPlay;
    setTrackIndex((nextIndex + tracks.length) % tracks.length);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const playTrack = (index) => {
    if (index === trackIndex) {
      togglePlayback();
      return;
    }

    switchTrack(index, true);
  };

  return (
    <div className={`interest-player${isPlaying ? " is-playing" : ""}`}>
      <div className="interest-coverflow" aria-label="Music cover carousel" data-active-track={currentTrack.id}>
        {carouselTracks.map((track) => (
          <button
            className={`interest-cover-card is-${track.position}`}
            type="button"
            onClick={() => {
              if (track.position === "previous") switchTrack(trackIndex - 1);
              if (track.position === "next") switchTrack(trackIndex + 1);
              if (track.position === "active") togglePlayback();
            }}
            key={`${track.id}-${track.position}`}
          >
            <img src={track.cover} alt={`${track.title} cover`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="interest-player-now">
        <button type="button" onClick={() => switchTrack(trackIndex - 1)} aria-label="Previous track">
          <CaretLeft size={22} weight="bold" />
        </button>
        <div>
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
        <button type="button" onClick={() => switchTrack(trackIndex + 1)} aria-label="Next track">
          <CaretRight size={22} weight="bold" />
        </button>
      </div>

      <div className={`interest-frequency-bars${isPlaying ? " is-visible" : ""}`} aria-hidden="true">
        {frequencyBars.map((bar, index) => (
          <span
            key={`${currentTrack.id}-${index}`}
            style={{
              "--bar-scale": bar,
              "--bar-delay": `${index * 74}ms`,
            }}
          />
        ))}
      </div>

      <div className="interest-track-list" aria-label="Music track list">
        {tracks.map((track, index) => {
          const active = index === trackIndex;
          return (
            <button className={active ? "is-active" : ""} type="button" onClick={() => playTrack(index)} key={track.id}>
              <span className="interest-track-play" aria-hidden="true">
                {active && isPlaying ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
              </span>
              <span className="interest-track-copy">
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </span>
              <span className="interest-track-duration">{formatTime(durationMap[track.id])}</span>
            </button>
          );
        })}
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audio}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => switchTrack(trackIndex + 1, true)}
      />
    </div>
  );
}
