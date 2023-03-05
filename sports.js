const searchAllData = (id) => {
  document.getElementById('spinner').classList.remove('d-none');
  const input = document.getElementById("search-value");
  document.getElementById("single-player-details").innerHTML = "";
  document.getElementById("player-info").innerHTML = "";
  document.getElementById("male").classList.add("d-none");
  document.getElementById("female").classList.add("d-none");
  const inputValue = input.value;
  const searchID = id || inputValue;
  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchID}`;
  // console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('spinner').classList.add('d-none');
      showPlayerData(data.player)
    });
};

const showPlayerData = (players) => {
  document.getElementById("search-value").value = "";
  const container = document.getElementById("player-info");
  players.forEach((player) => {
    const { strPlayer, strThumb, strNationality, idPlayer } = player;
    // console.log(player);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
    <img src="${
      strThumb ? strThumb : "https://picsum.photos/500/300?random=1"
    }" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${strPlayer}</h5>
    <p class="card-text">Nationality: ${strNationality}</p>
    </div>
    <div class="my-3 mx-auto">
    <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-danger">Details</button>
    <button type="button" class="btn btn-warning">Delete</button>
    </div>
    </div>
    `;
    container.appendChild(div);
  });
};

const singlePlayer = (id) => {
  // console.log(id)
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showSinglePlayer(data.players[0]));
  // showSinglePlayer(data)
};

const showSinglePlayer = (data) => {
  console.log(data);
  const { strThumb, strPlayer, strDescriptionEN, strGender } = data;
  const container = document.getElementById("single-player-details");
  const div = document.createElement("div");
  if (strGender == "Male") {
    document.getElementById("male").classList.remove("d-none");
  }
  else{
    document.getElementById("female").classList.remove("d-none");
  }
  div.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <p class="card-text">${strDescriptionEN.slice(0, 100) + "..."}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
  `;
  container.appendChild(div);
};


searchAllData('ozil');