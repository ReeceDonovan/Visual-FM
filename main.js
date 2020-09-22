let running;
let container = document.getElementById("imageContainer");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createRow() {
  for (i = 1; i < 8; i++) {
    let row = document.createElement("div");
    row.id = "row " + String(i);
    row.className = "row";
    container.appendChild(row);
  }
}

async function showData(data) {
  running++;
  if (running <= 1) {
    container.innerHTML = "";
    createRow();
    let j = 1;

    for (let i = 0; i < data.length - 1; i++) {
      let curRow = document.getElementById("row " + String(j));
      let a = "";
      let img = "";
      a = document.createElement("a");
      img = new Image();
      img.src = data[i].image[3]["#text"];
      if (data[i].image[3]["#text"] == "") {
        img.src = "";
        img.src =
          "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
      }

      a.appendChild(img);
      a.href = data[i].artist.url;
      a.className = "column";

      curRow.appendChild(a);
      if (curRow.childElementCount >= 7) {
        j++;
      }
      await sleep(50);
    }
  }
}

function getFMData() {
  running = 0;
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

    showData(albumData);
  };
}
