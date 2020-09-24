//Make fresh url on page refresh
window.location.replace("#");

if (typeof window.history.replaceState == "function") {
  history.replaceState({}, "", window.location.href.slice(0, -1));
}

//UI Elements
let searchBar = document.getElementsByClassName("searchBar");
let initial = document.getElementsByClassName("initial");
let usernameInput = document.getElementById("username");
let startBtn = document.getElementById("searchBtn");
//API Elements

let topTrackData;
let topAlbumData;
let topArtistData;

let artistTags;
startBtn.addEventListener("click", getFMData);

async function getFMData() {
  let username = usernameInput.value;
  let urls = [
    "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" +
      username +
      "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json",
    "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" +
      username +
      "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json",
    "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" +
      username +
      "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json",
  ];

  const results = await Promise.all(
    urls.map((url) => fetch(url).then((r) => r.json()))
  );
  initial[1].className = initial[1].className.replace("initial", "");
  initial[0].className = initial[0].className.replace("initial", "");
  searchBar[0].className = searchBar[0].className.replace("active", "");
  formatData(results);
}

function formatData(d) {
  topTrackData = d[0].toptracks.track;
  topAlbumData = d[1].topalbums.album;
  topArtistData = d[2].topartists.artist;
  console.log(topTrackData);
  console.log(topAlbumData);
  console.log(topArtistData);
  genTabs();
}
