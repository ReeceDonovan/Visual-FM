let canvas;
let dpi;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function fix_dpi() {
  //create a style object that returns width and height
  let style = {
    height() {
      return +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    },
    width() {
      return +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    },
  };
  //set the correct attributes for a crystal clear image!
  canvas.setAttribute("width", style.width() * dpi);
  canvas.setAttribute("height", style.height() * dpi);
}

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

async function genTracks() {
  let contentSection = document.getElementById("content");
  let cont = document.getElementById("infoContainer");
  let nonConstricted = document.querySelectorAll(".activeCanvas");
  if (nonConstricted.length > 0) {
    let len = nonConstricted.length;
    for (let i = 0; i < len; i++) {
      nonConstricted[i].className = nonConstricted[i].className.replace(
        "activeCanvas",
        "constricted"
      );
    }
  } else {
    contentSection.className += " constricted";
    cont.className += " constricted";
  }
  contentSection.innerHTML = "";

  for (let i = 0; i < topTrackData.length; i++) {
    let div = document.createElement("div");
    div.className = "trackItem";
    let trackTitle = document.createElement("h2");
    trackTitle.className = "trackTitle";
    trackTitle.innerHTML =
      "<a href='" + topTrackData[i].url + "'>" + topTrackData[i].name + "</a>";
    let col1 = document.createElement("div");
    col1.className = "col1";
    col1.appendChild(trackTitle);
    div.appendChild(col1);
    let trackArtist = document.createElement("h2");
    trackArtist.className = "trackArtist";
    trackArtist.innerHTML =
      "<a href='" +
      topTrackData[i].artist.url +
      "'>" +
      topTrackData[i].artist.name +
      "</a>";
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
    await sleep(10);
    contentSection.appendChild(div);
  }
}

async function genAlbums() {
  let contentSection = document.getElementById("content");
  let cont = document.getElementById("infoContainer");

  let nonConstricted = document.querySelectorAll(".activeCanvas");
  if (nonConstricted.length > 0) {
    let len = nonConstricted.length;
    for (let i = 0; i < len; i++) {
      nonConstricted[i].className = nonConstricted[i].className.replace(
        "activeCanvas",
        "constricted"
      );
    }
  } else {
    contentSection.className += " constricted";
    cont.className += " constricted";
  }

  contentSection.innerHTML = "";

  for (i = 1; i < 11; i++) {
    let row = document.createElement("div");
    row.id = "albumRow " + String(i);
    row.className = "albumRow";
    contentSection.appendChild(row);
  }
  let j = 1;

  for (let i = 0; i < topAlbumData.length; i++) {
    let curRow = document.getElementById("albumRow " + String(j));
    let a = "";
    let img = "";
    a = document.createElement("a");
    img = new Image();
    img.src = topAlbumData[i].image[3]["#text"];
    if (topAlbumData[i].image[3]["#text"] == "") {
      img.src = "";
      img.src =
        "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
    }

    a.appendChild(img);
    a.href = topAlbumData[i].url;
    a.className = "albumColumn";

    curRow.appendChild(a);
    if (curRow.childElementCount >= 5) {
      j++;
    }
    await sleep(50);
  }
}

async function genGenres() {
  let contentSection = document.getElementById("content");
  let cont = document.getElementById("infoContainer");

  let constricted = document.querySelectorAll(".constricted");
  if (constricted.length > 0) {
    let len = constricted.length;
    for (let i = 0; i < len; i++) {
      constricted[i].className = constricted[i].className.replace(
        "constricted",
        "activeCanvas"
      );
    }
  } else {
    contentSection.className += " activeCanvas";
    cont.className += " activeCanvas";
  }

  let genreCount = {};
  contentSection.innerHTML = "";
  let wordCanvas = document.createElement("canvas");
  wordCanvas.className = "wordCanvas";
  wordCanvas.id = "canvas";
  contentSection.appendChild(wordCanvas);

  dpi = window.devicePixelRatio;
  canvas = document.getElementById("canvas");
  let ctx = wordCanvas.getContext("2d");
  canvas.setAttribute("width", "auto");
  canvas.setAttribute("height", "auto");

  let tagUrls = [];
  for (let i = 0; i < topArtistData.length; i++) {
    if (topArtistData[i].name == "6ix9ine") {
      removeElement(topArtistData, i);
      continue;
    }
    let nameLink = topArtistData[i].url.split("music/")[1];
    let u =
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=" +
      nameLink +
      "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json";
    tagUrls.push(u);
  }
  const tagData = await Promise.all(
    tagUrls.map((url) => fetch(url).then((r) => r.json()))
  );
  console.log(tagData);

  for (let i = 0; i < topArtistData.length - 1; i++) {
    let k = 20;
    if (tagData[i].toptags.tag.length < k) {
      k = tagData[i].toptags.tag.length;
    }
    for (let j = 0; j < k; j++) {
      let curTag = tagData[i].toptags.tag[j].name;
      if (curTag.includes("-")) {
        curTag = curTag.replace("-", " ");
      }
      curTag = curTag.toUpperCase();
      if (!genreCount[curTag]) {
        genreCount[curTag] = 1;
      } else {
        genreCount[curTag] += 1;
      }
    }
  }
  console.log(genreCount);
  fix_dpi();
  var transX = canvas.width * 0.5,
    transY = canvas.height * 0.5;

  ctx.translate(transX, transY);

  for (let key in genreCount) {
    ctx.globalAlpha = genreCount[key] / 3.2;
    let size = (genreCount[key] / 50) * 100;
    if (size > 70) {
      size = 90;
    } else if (size < 20) {
      size = 20;
    }
    ctx.font =
      size +
      'px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    let numW = Math.floor(Math.random() * 99) + 1;
    numW *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    numW = numW / 100;
    let numH = Math.floor(Math.random() * 99) + 1;
    numH *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    numH = numH / 100;
    await sleep(50);
    ctx.fillText(
      key,
      numW * (canvas.width / 2.5),
      numH * (canvas.height / 2.5)
    );
  }
}
