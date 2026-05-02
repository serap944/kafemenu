import { renderHeader } from "./components/header.js";


document.getElementById("header").innerHTML = renderHeader();



/*anasayfa */
const menu = document.getElementById("menu");
let kategori = [
    { id: 1, urunadi: "içecekler", resim: "resimler/icecek/Iced_Karamel_Macchiato.webp" },
    { id: 2, urunadi: "waffle çeşitleri", resim: "resimler/waffle/waffle.jpg" },
    { id: 3, urunadi: "pizzalar", resim: "resimler/pizzalar/karisikpizza.jpg" },
    { id: 4, urunadi: "hamburgerler", resim: "resimler/hamburger/hamburger.jpg" },
    { id: 5, urunadi: "pide", resim: "resimler/pide/pide.jpg" }
];

kategori.forEach(z => {
    const kutu = document.createElement("div");
    kutu.dataset.kilit = z.id;
    kutu.classList.add("kutu");
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = z.resim;
    const span = document.createElement("span");
    span.textContent = z.urunadi;
    span.classList.add("adi");
    kutu.appendChild(img);
    kutu.appendChild(span);
    menu.appendChild(kutu);

})

menu.addEventListener("click", function (e) {

    const anadiv = e.target.closest(".kutu");
    if (!anadiv) {
        return;
    }

    const id = Number(anadiv.dataset.kilit);//dataset her zaman tıklanan elementten alınnır.

    const secilenKategori = kategori.find(x => x.id === id);


    // seçilen kategoriyi kaydet
    localStorage.setItem("kategori", JSON.stringify(secilenKategori));


    // sayfaya git
    window.location.href = "urunler.html";
});

const havaDiv = document.createElement("div");
document.querySelector("header").appendChild(havaDiv);

fetch("https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.97&current_weather=true")
    .then(res => res.json())
    .then(data => {

        const derece = data.current_weather.temperature;

        havaDiv.innerHTML = `İstanbul: ${derece}°C`;

    });
