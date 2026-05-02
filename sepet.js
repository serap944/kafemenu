import { renderHeader } from "./components/header.js";

document.getElementById("header").innerHTML = renderHeader();


const sepetListe = document.getElementById("sepetListe");
const toplamdiv = document.getElementById("toplam");

let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

/*
====================================================
📌 RENDER = ekranı tamamen yeniden çizer
====================================================
*/
function render() {

    sepetListe.innerHTML = "";

    if (sepet.length === 0) {
        sepetListe.innerHTML = "<div>Sepet boş</div>";
        toplamdiv.textContent = "";
        return;
    }

    let toplam = 0;

    sepet.forEach(urun => {

        toplam += urun.fiyat * urun.adet;

        const satir3 = document.createElement("div");
        satir3.classList.add("satir3");

        const img = document.createElement("img");
        img.src = urun.resim;


        const infose = document.createElement("div");
        infose.classList.add("infose");

        const ad = document.createElement("h3");
        ad.textContent = urun.urunadi;

        const fiyat = document.createElement("span");
        fiyat.textContent = urun.fiyat + "₺";

        /*
        ====================================================
        📌 ADET KONTROL (SADE İKONLAR)
        ====================================================
        */
        const kontrol = document.createElement("div");
        kontrol.classList.add("kontrol");

        // ➖ icon
        const minus = document.createElement("i");
        minus.className = "fa-solid fa-minus";
        minus.dataset.id = urun.id;


        // adet
        const adet = document.createElement("span");
        adet.textContent = urun.adet;


        // ➕ icon
        const plus = document.createElement("i");
        plus.className = "fa-solid fa-plus";
        plus.dataset.id = urun.id;

        // ❌ silme icon
        const sil = document.createElement("i");
        sil.className = "fa-solid fa-trash sil";
        sil.dataset.id = urun.id;




        // disable minus if 1
        if (urun.adet <= 1) {
            minus.style.opacity = "0.3";
            minus.style.pointerEvents = "none";
        }

        kontrol.appendChild(minus);
        kontrol.appendChild(adet);
        kontrol.appendChild(plus);


        infose.appendChild(ad);
        infose.appendChild(fiyat);
        infose.appendChild(kontrol);
        infose.appendChild(sil);

        satir3.appendChild(img);
        satir3.appendChild(infose);


        sepetListe.appendChild(satir3);
    });

    toplamdiv.textContent = "Toplam: " + toplam + " TL";
}



/*
====================================================
📌 EVENT (ARTIR / AZALT / SİL)
====================================================
*/
sepetListe.addEventListener("click", function (e) {

    let id = Number(e.target.dataset.id);
    if (!id) return;

    let urun = sepet.find(u => u.id === id);
    if (!urun) return;

    // ➖ azalt
    if (e.target.classList.contains("fa-minus")) {

        if (urun.adet > 1) {
            urun.adet--;
        }
    }

    // ➕ artır
    if (e.target.classList.contains("fa-plus")) {
        urun.adet++;
    }

    // ❌ sil
    if (e.target.classList.contains("fa-trash")) {
        sepet = sepet.filter(u => u.id !== id);
    }

    localStorage.setItem("sepet", JSON.stringify(sepet));
    render();
});

/*
====================================================
📌 İLK YÜKLEME
====================================================
*/
render();


const havaDiv = document.createElement("div");
document.querySelector("header").appendChild(havaDiv);

fetch("https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.97&current_weather=true")
    .then(res => res.json())
    .then(data => {

        const derece = data.current_weather.temperature;

        havaDiv.innerHTML = `İstanbul: ${derece}°C`;

    });
