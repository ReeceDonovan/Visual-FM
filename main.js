//Debug Elements
//
//UI Elements
let searchBar = document.getElementsByClassName("searchBar");
let initialBody = document.getElementsByClassName("initial");
let usernameInput = document.getElementById("username");
let username = usernameInput.value;
let startBtn = document.getElementById("searchBtn");
//API Elements
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

startBtn.addEventListener("click", getFMData);

async function getFMData() {
  const results = await Promise.all(
    urls.map((url) => fetch(url).then((r) => r.json()))
  );
  initialBody[0].className = initialBody[0].className.replace("initial", "");
  searchBar[0].className = searchBar[0].className.replace("active", "");
  formatData(results);
}

function formatData(d) {
  const topTrackData = d[0].toptracks.track;
  const topAlbumData = d[1].topalbums.album;
  const topArtistData = d[2].topartists.artist;

  console.log(topTrackData);
  console.log(topAlbumData);
  console.log(topArtistData);
  genTabs();
}
