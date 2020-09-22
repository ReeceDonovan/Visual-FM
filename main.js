let container = document.getElementById("imageContainer");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createRow() {
  for (i = 1; i < 6; i++) {
    let row = document.createElement("div");
    row.id = "row " + String(i);
    row.className = "row";
    container.appendChild(row);
  }
}

async function showData(data) {
  container.innerHTML = "";
  createRow();
  let j = 1;

  for (let i = 0; i < data.length; i++) {
    let curRow = document.getElementById("row " + String(j));
    let a;
    a = document.createElement("a");
    let img = new Image();
    if (data[i].image[3]["#text"] == "") {
      img.src =
        "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
    } else {
      img.src = data[i].image[2]["#text"];
    }

    a.appendChild(img);
    a.href = data[i].artist.url;
    a.className = "column";

    curRow.appendChild(a);
    if (curRow.childElementCount >= 10) {
      j++;
    }
    await sleep(100);
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
