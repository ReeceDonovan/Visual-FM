//Debug Elements
//
//UI Elements
let usernameInput = document.getElementById("username");
let username = usernameInput.value;
let startBtn = document.getElementById("searchBtn");
//Page Elements
let cont = document.getElementById("infoContainer");
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

function genTabs() {
  cont.innerHTML = "";
  let tabTitleNames = ["Top Tracks", "Top Albums", "Top Artists"];
  let tabTitleLinks = ["#trackTab", "#albumTab", "#artistTab"];
  let ul = document.createElement("ul");
  ul.id = "nav-tab";
  ul.className = "nav";
  for (let i = 0; i < tabTitleLinks.length; i++) {
    let li = document.createElement("li");
    if (i == 0) {
      li.className = "active";
    }
    let a = document.createElement("a");
    a.href = tabTitleLinks[i];
    a.innerHTML = tabTitleNames[i];
    li.appendChild(a);
    ul.appendChild(li);
  }
  cont.appendChild(ul);
}
