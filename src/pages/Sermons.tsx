import { ExternalLink, Play, Search, VideoOff } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import {
  churchYoutubeChannelUrl,
  sermonPlaylists,
  sermonVideos,
  type SermonVideo
} from "../data/sermonVideos";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import "./Sermons.css";

function VideoCard({ video, playlistName }: { video: SermonVideo; playlistName?: string }) {
  return (
    <a
      className="sermons-video-card"
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${video.title} on YouTube`}
      data-reveal-child
    >
      <span className="sermons-thumbnail">
        <img
          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
          loading="lazy"
          width="480"
          height="360"
          alt=""
        />
        <span className="sermons-play-icon" aria-hidden="true"><Play size={24} fill="currentColor" /></span>
      </span>
      <span className="sermons-card-copy">
        {playlistName ? <small className="sermons-playlist-badge">{playlistName}</small> : null}
        <span className="sermons-video-title">{video.title}</span>
      </span>
    </a>
  );
}

function VideoGrid({ videos, showPlaylist = false }: { videos: SermonVideo[]; showPlaylist?: boolean }) {
  const gridRef = useRevealOnScroll<HTMLDivElement>({ staggerChildren: true, staggerStepMs: 65 });

  return (
    <div className="card-grid sermons-video-grid" ref={gridRef}>
      {videos.map((video) => (
        <VideoCard
          key={`${video.playlistId}-${video.youtubeId}`}
          video={video}
          playlistName={showPlaylist
            ? sermonPlaylists.find((playlist) => playlist.id === video.playlistId)?.title
            : undefined}
        />
      ))}
    </div>
  );
}

export default function Sermons() {
  const [query, setQuery] = useState("");
  const [expandedPlaylists, setExpandedPlaylists] = useState<Record<string, boolean>>({});
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = useMemo(
    () => normalizedQuery
      ? sermonVideos.filter((video) => video.title.toLocaleLowerCase().includes(normalizedQuery))
      : sermonVideos,
    [normalizedQuery]
  );

  return (
    <>
      <section className="sermons-hero" aria-labelledby="messages-moments-title">
        <div className="sermons-hero-copy">
          <span className="sermons-hero-kicker">
            <span lang="ta">செய்திகளும் தருணங்களும்</span>
            <small>Messages &amp; Moments</small>
          </span>
          <h1 id="messages-moments-title">Faith shared. <em>Moments remembered.</em></h1>
          <p>Watch worship, teaching, celebrations, and stories from our Tamil church family in Chicago.</p>
          <a className="sermons-channel-link" href={churchYoutubeChannelUrl} target="_blank" rel="noreferrer">
            Browse our YouTube channel <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="section sermons-library" aria-labelledby="sermons-library-title">
        <div className="sermons-library-heading">
          <div id="sermons-library-title">
            <SectionHeader eyebrow="Video library" title="Explore by collection" />
          </div>
          <div className="sermons-search-wrap">
            <label htmlFor="sermon-search">Search videos</label>
            <Search size={19} aria-hidden="true" />
            <input
              id="sermon-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by video title"
            />
          </div>
        </div>

        {normalizedQuery ? (
          <div className="sermons-results">
            <div aria-live="polite" className="sermons-result-count">
              Search results ({matches.length})
            </div>
            {matches.length ? (
              <VideoGrid videos={matches} showPlaylist />
            ) : (
              <div className="ctc-sermons-empty" role="status">
                <VideoOff size={30} aria-hidden="true" />
                <h3>No videos match your search.</h3>
                <p>Try another title, or browse every playlist on our YouTube channel.</p>
                <a href={churchYoutubeChannelUrl} target="_blank" rel="noreferrer">
                  Browse YouTube <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="sermons-playlists">
            {sermonPlaylists.map((playlist) => {
              const videos = sermonVideos.filter((video) => video.playlistId === playlist.id);
              const isCappedPlaylist = playlist.id === "vbs" || playlist.id === "morning-devotionals";
              const isExpanded = expandedPlaylists[playlist.id] ?? false;
              const visibleVideos = isCappedPlaylist && !isExpanded ? videos.slice(0, 8) : videos;
              const hasRealPlaylist = ["praise-worship", "vbs", "kids-at-ctc", "women-of-ctc"].includes(playlist.id);
              return videos.length ? (
                <section className="sermons-playlist" key={playlist.id} aria-labelledby={`playlist-${playlist.id}`}>
                  <div className="sermons-playlist-heading" id={`playlist-${playlist.id}`}>
                    <SectionHeader title={playlist.title} />
                    <a href={playlist.youtubeUrl} target="_blank" rel="noreferrer">
                      {hasRealPlaylist ? "View full playlist on YouTube" : "Browse more on YouTube"}
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                  <VideoGrid key={`${playlist.id}-${isExpanded}`} videos={visibleVideos} />
                  {isCappedPlaylist && !isExpanded ? (
                    <button
                      className="sermons-show-all"
                      type="button"
                      onClick={() => setExpandedPlaylists((current) => ({ ...current, [playlist.id]: true }))}
                    >
                      Show all {videos.length}
                    </button>
                  ) : null}
                </section>
              ) : null;
            })}
          </div>
        )}
      </section>
    </>
  );
}
