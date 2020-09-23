function onTabClick(event) {
  let activeTabs = document.querySelectorAll(".active");
  for (let i = 0; i < activeTabs.length; i++) {
    activeTabs[i].className = activeTabs[i].className.replace("active", "");
  }
  event.target.parentElement.className += " active";
  switch (event.target.href.split("#")[1]) {
    case "trackTab":
      genTracks();
      break;
    case "albumTab":
      genAlbums();
      break;
    case "artistTab":
      genArtists();
      break;
  }
}

function handleTabs() {
  const element = document.getElementById("nav-tab");
  element.addEventListener("click", onTabClick, false);

  element.firstChild.firstChild.click();
}

function genTabs() {
  let cont = document.getElementById("infoContainer");
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
  let content = document.createElement("section");
  content.id = "content";
  cont.appendChild(content);
  handleTabs();
}
