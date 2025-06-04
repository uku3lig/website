<script lang="ts">
  interface LastFmTrack {
    name: string;
    album: string;
    artist: string;
    url: string;
    imageUrl?: string;
  }

  async function getNowPlaying(): Promise<LastFmTrack | null> {
    const res = await fetch("https://api.uku3lig.net/now_playing");
    if (!res.ok) {
      console.log(`Last.fm request failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.error) {
      console.log(`Last.fm error: ${json.error}: ${json.message}`);
      return null;
    }

    const trackData = json.recenttracks?.track[0];
    if (!trackData?.["@attr"]?.nowplaying) return null;

    const image = trackData.image?.find((x: any) => x.size === "large");
    return {
      name: trackData.name || "Unknown",
      album: trackData.album["#text"],
      artist: trackData.artist["#text"] || "Unknown",
      url: trackData.url,
      imageUrl: image?.["#text"],
    };
  }
</script>

{#await getNowPlaying() then trackData}
  {#if trackData !== null}
    {#snippet albumCover()}
      <img
        src={trackData.imageUrl || "/unknown.avif"}
        alt={`${trackData.artist} - ${trackData.name}`}
        class="album-cover"
      />
    {/snippet}

    <div class="big-container">
      <h2>Now listening</h2>
      <div class="music-container">
        {#if trackData.album}
          <a
            href={`https://last.fm/music/${trackData.artist}/${trackData.album}`}
          >
            {@render albumCover()}
          </a>
        {:else}
          {@render albumCover()}
        {/if}
        <div>
          <p class="title">
            <a href={trackData.url} target="_blank">{trackData.name}</a>
          </p>
          <p>{trackData.artist}</p>
          <p class="album">{trackData.album}</p>
        </div>
      </div>
    </div>
  {/if}
{/await}

<style>
  @keyframes grow {
    from {
      max-height: 0;
    }
    to {
      max-height: 172px;
    }
  }

  .big-container {
    animation: grow 1.5s cubic-bezier(0, 0.55, 0.45, 1);
    overflow: hidden;
  }

  .music-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }

  a:has(.album-cover) {
    border: none;
    line-height: 0;
  }

  .album-cover {
    width: 96px;
    height: 96px;
  }

  .title {
    font-weight: bold;
  }

  .album {
    color: var(--text-secondary);
    font-style: italic;
  }

  p {
    margin-block: 4px;
  }
</style>
