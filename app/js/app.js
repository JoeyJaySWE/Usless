//Defaults
const page = document.querySelector("main");
const trash = document.querySelector(".page");
const bin = document.querySelector("figure");
let startX = 0;
let startY = 0;
let posX = 0;
let posY = 0;
let drag = false;
let ball = false;

const time_array = [
  "2h Remaining...",
  "7h Remaining...",
  "25 Minutes Remaining...",
  "2 Minutes Remaining...",
  "2 Years Remaining...",
  "1 Decade Remaining...",
  "46s Remaining...",
  "3 Months Remaining...",
  "4 Generations Remaining...",
  "8 Eternities Remaining...",
  "25 Lives Remaining...",
  "92 Sips Remaining...",
  "7 Days Remaining...",
  "3 Bad Descions Remaining...",
  "1ms Remaining...",
];

//________________________________________________________

//Functions
const loading = async function (doc) {
  const load_bar = document.querySelector(".loading_bar");
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => location.reload());

  for (let tics = 0; tics < 19; tics++) {
    setTimeout(function () {
      const tic = document.createElement("div");
      tic.classList.add("loading_tic");
      load_bar.appendChild(tic);
      let eta = document.querySelector("time");
      eta.textContent =
        time_array[Math.floor(Math.random() * time_array.length)];
    }, tics * 1000);
  }
  let crash_time = Math.random() * (17000 - 3000) + 3000;
  setTimeout(() => {
    const crash = doc.querySelector("figure.bsd");
    document.body.appendChild(crash);
    setTimeout(() => window.close(), 6000);
  }, crash_time);
};

function deletePage() {
  fetch("/views/pop_up.html")
    .then((response) => response.text())
    .then(function (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const pop_up = doc.querySelector(".pop_up");
      document.body.appendChild(pop_up);
      loading(doc);
    })
    .catch((err) => console.warn("Somethingw ent wrong", err));

  // pop_up.appendChild("<a href='http://www.onlinewebfonts.com'>oNline Web Fonts</a>");

  // 18 tics to full
}

//---------------------------------------------------------------------------------------------

setTimeout(function () {
  page.style.cursor = "grab";

  page.addEventListener("click", function (e) {
    if (ball === false) {
      if(window.innerWidth > 600){
        trash.style.transform =
          "scale(0.02)"; 
      }
      else{
        trash.style.transform = "scale(0.2)";
      }
      trash.style.borderRadius = "100%";
      ball = true;
    }
  });

  page.addEventListener("mousedown", function mouseDown(e) {
    drag = true;
    e.currentTarget.style.cursor = "grabbing";
    startX = e.clientX;
    startY = e.clientY;
    page.style.top = "-200px";
    page.addEventListener("mousemove", function mouseMove(e) {
      posX = startX - e.clientX;
      posY = startY - e.clientY;
      startX = e.clientX;
      startY = e.clientY;

      if (drag === true && ball === true) {
        trash.style.left = trash.offsetLeft - posX + "px";

        trash.style.top = trash.offsetTop - posY + "px";
      }
    });
  });
  page.addEventListener("mouseup", function mouseUp(e) {
    e.currentTarget.style.cursor = "grab";
    drag = false;

    const bin_top = bin.offsetTop;
    const bin_left = bin.offsetLeft;
    const bin_height = bin.offsetHeight;
    const bin_width = bin.offsetWidth;

    if (
      trash.offsetLeft + window.innerWidth / 2 > bin_left &&
      trash.offsetLeft + window.innerWidth / 2 < bin_left + bin_width &&
      trash.offsetTop + window.innerHeight / 2 > bin_top &&
      trash.offsetTop < bin_top + bin_height
    ) {
      let descision = confirm(
        "Are you sure you want to throw away this hard working page?"
      );

      if (descision === true) {
        deletePage();
      } else {
        location.reload();
      }
    }
  });
}, 1000);
