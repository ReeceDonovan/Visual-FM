let container = document.getElementById("imageContainer");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showData(data) {
  container.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let a = document.createElement("a");
    a.href = data[i].artist.url;
    let img = new Image();
    img.src = data[i].image[2]["#text"];
    a.appendChild(img);
    await sleep(100);
    container.appendChild(a);
  }
}

function getFMData() {
  let usernameInput = document.getElementById("username");
  let albumData;
  let username = usernameInput.value;
  let http = new XMLHttpRequest();
  let url =
    "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" +
    username +
    "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json";
  http.open("GET", url);
  http.send();

  http.onreadystatechange = (e) => {
    let apiData = http.responseText;
    let parsedData = JSON.parse(apiData);
    albumData = parsedData.topalbums.album;
    console.log(albumData);
    showData(albumData);
  };
}
