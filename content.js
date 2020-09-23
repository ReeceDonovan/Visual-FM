function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function genTracks() {
  let contentSection = document.getElementById("content");
  contentSection.innerHTML = "";

  for (let i = 0; i < topTrackData.length; i++) {
    let div = document.createElement("div");
    div.className = "trackItem";
    let trackTitle = document.createElement("h2");
    trackTitle.className = "trackTitle";
    trackTitle.innerHTML = topTrackData[i].name;
    let col1 = document.createElement("div");
    col1.className = "col1";
    col1.appendChild(trackTitle);
    div.appendChild(col1);
    let trackArtist = document.createElement("h2");
    trackArtist.className = "trackArtist";
    trackArtist.innerHTML = topTrackData[i].artist.name;
    let col2 = document.createElement("div");
    col2.className = "col2";
    col2.appendChild(trackArtist);
    div.appendChild(col2);
    let trackPlays = document.createElement("h2");
    trackPlays.className = "trackPlays";
    trackPlays.innerHTML = topTrackData[i].playcount;
    let col3 = document.createElement("div");
    col3.className = "col3";
    col3.appendChild(trackPlays);
    div.appendChild(col3);
    await sleep(100);
    contentSection.appendChild(div);
  }
}
