function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function insertData(imageLink) {}

async function showData(data) {
  for (let i = 0; i < data.length; i++) {
    let mbid = data[i].mbid;

    if (mbid) {
      url =
        "https://musicbrainz.org/ws/2/artist/" +
        mbid +
        "?inc=url-rels&fmt=json";
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((out) => {
          const relations = out.relations;
          // console.table(relations);
          // Find image relation
          for (let j = 0; j < relations.length; j++) {
            if (relations[j].type === "image") {
              let image_url = relations[j].url.resource;
              if (
                image_url.startsWith("https://commons.wikimedia.org/wiki/File:")
              ) {
                const filename = image_url.substring(
                  image_url.lastIndexOf("/") + 1
                );
                image_url =
                  "https://commons.wikimedia.org/wiki/Special:Redirect/file/" +
                  filename;
              }
              insertData(image_url);
              // success(image_url);
            }
          }
        });
    }
    await sleep(100);
  }
}

function getFMData() {
  let usernameInput = document.getElementById("username");

  let username = usernameInput.value;
  let http = new XMLHttpRequest();
  let url =
    "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" +
    username +
    "&api_key=690f24077f81c36f5c08ad294a858822&period=overall&format=json";
  http.open("GET", url);
  http.send();

  http.onreadystatechange = (e) => {
    let apiData = http.responseText;
    let parsedData = JSON.parse(apiData);
    let artistData = parsedData.topartists.artist;
    showData(artistData);
  };
}
