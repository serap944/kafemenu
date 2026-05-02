import { renderHeader } from "./components/header.js";


document.getElementById("header").innerHTML = renderHeader();



// 📌 DOM elemanlarını alıyoruz (sayfada kullanacağımız alanlar)
const baslik1 = document.getElementById("baslik1");
const menu2 = document.getElementById("menu2");

// 📌 localStorage'dan seçilen kategoriyi alıyoruz
let referans = JSON.parse(localStorage.getItem("kategori"));

// 📌 Başlığı ayarla
baslik1.textContent = referans ? referans.urunadi : "Kategori seçilmedi";


// 📌 TÜM ÜRÜNLER (senin orijinal veri)
const urunlerim = [{ id: 1, urunadi: "kola", fiyat: 250, resim: "resimler/icecek/kola.jpg", no: 1 },
{ id: 2, urunadi: "İced Karemel Macchiato", fiyat: 300, resim: "resimler/icecek/Iced_Karamel_Macchiato.webp", no: 1 },
{ id: 3, urunadi: "iced Latte", fiyat: 450, resim: "resimler/icecek/icedLatte.webp", no: 1 },
{ id: 4, urunadi: "iced Caramel Latte", fiyat: 450, resim: "resimler/icecek/Sparkling Mini_espresso.webp", no: 1 },
{ id: 5, urunadi: "Moca", fiyat: 450, resim: "resimler/icecek/moca2.png", no: 1 },
{ id: 6, urunadi: "Türk kahvesi", fiyat: 450, resim: "resimler/icecekler/turkkahve.jpg", no: 1 },

// WAFFLE (no:2)
{ id: 7, urunadi: "amour waffle", fiyat: 300, resim: "resimler/waffle/amour-waffle.png", no: 2, icerigi: "Sütlü Çikolata, Beyaz Çikolata, Frambuaz Sos, Muz, Çilek, Fındık, Fıstık " },
{ id: 8, urunadi: "aura waffle", fiyat: 220, resim: "resimler/waffle/aura-waffle.png", no: 2, icerigi: "Sütlü Çikolata, Beyaz Çikolata, Muz, Çilek, Fındık, Fıstık " },
{ id: 9, urunadi: "glow waffle", fiyat: 220, resim: "resimler/waffle/glow-waffle.png", no: 2, icerigi: "Sütlü Çikolata, Beyaz Çikolata, Antep Fıstıklı Sos, Karamel Sos, Frambuaz Sos, Bitter Sos, Muz, Çilek, Fındık, Fıstık" },
{ id: 10, urunadi: "jolie waffle", fiyat: 220, resim: "resimler/waffle/jolie-waffle.png", no: 2, icerigi: "Beyaz Çikolata, Muz, Çilek, Fındık, Fıstık" },
{ id: 11, urunadi: "luna waffle", fiyat: 220, resim: "resimler/waffle/luna-waffle.png", no: 2, icerigi: "Sütlü Çikolata, Muz, Çilek, Fındık, Fıstık" },
{ id: 12, urunadi: "peanut waffle", fiyat: 220, resim: "resimler/waffle/peanut-waffle.png", no: 2, icerigi: "Sütlü Çikolata, Beyaz Çikolata, Antep Fıstıklı Sos, Muz, Çilek, Fındık, Fıstık" },

// PİZZA (no:3) 
{ id: 13, urunadi: "john fliipo", fiyat: 250, resim: "resimler/pizzalar/john_flippo.jpg", no: 3 },
{ id: 14, urunadi: "karışık pizza", fiyat: 300, resim: "resimler/pizzalar/karisikpizza.jpg", no: 3 },
{ id: 15, urunadi: "panino pizza", fiyat: 450, resim: "resimler/pizzalar/panino.jpg", no: 3 },
{ id: 16, urunadi: "pepperoni", fiyat: 300, resim: "resimler/pizzalar/pepperoni.jpg", no: 3 },
{ id: 17, urunadi: "taze fesleğenli", fiyat: 220, resim: "resimler/pizzalar/taze_feslegenli.jpg", no: 3 },

{ id: 18, urunadi: "çıtır tavuk", fiyat: 220, resim: "resimler/hamburger/citir.jpg", no: 4 },
{ id: 19, urunadi: "et burger", fiyat: 220, resim: "resimler/hamburger/etburger.png", no: 4 },
{ id: 20, urunadi: "hamburger", fiyat: 220, resim: "resimler/hamburger/hamburger.jpg", no: 4 },
{ id: 21, urunadi: "menu", fiyat: 220, resim: "resimler/hamburger/menu.jpg", no: 4 },
{ id: 22, urunadi: "menu2", fiyat: 220, resim: "resimler/hamburger/menu2.jpg", no: 4 },

// PİDE (no:5) 
{ id: 23, urunadi: "karışık pide", fiyat: 250, resim: "resimler/pide/karisikpide.jpg", no: 5 },
{ id: 24, urunadi: "kıymalı pide", fiyat: 300, resim: "resimler/pide/kiymali.jpg", no: 5 },
{ id: 25, urunadi: "pide", fiyat: 450, resim: "resimler/pide/pide.jpg", no: 5 }];

// =======================================================
// 📌 RENDER NEDİR?
// =======================================================
// render() = EKRANI SIFIRDAN ÇİZME FONKSİYONU
//
// Mantık:
// 1. mevcut HTML temizlenir
// 2. veriye bakılır (sepet vs)
// 3. yeniden DOM oluşturulur
//
// 🔥 React gibi frameworklerin kalbi budur
// =======================================================


// ===============================
// 🧠 SEPETE EKLE (ADET SİSTEMİ)
// ===============================
function sepeteEkle(urun) {

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    let bulunan = sepet.find(u => u.id == urun.id);

    if (bulunan) {
        bulunan.adet += 1;
    } else {
        sepet.push({
            ...urun,
            adet: 1
        });
    }

    localStorage.setItem("sepet", JSON.stringify(sepet));
}


// ===============================
// 🧾 RENDER (EKRANI ÇİZ)
// ===============================
function render() {

    menu2.innerHTML = "";

    if (!referans) {
        menu2.innerHTML = "<h3>Kategori seçilmedi</h3>";
        return;
    }

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    let secilmis = urunlerim.filter(z => z.no === referans.id);

    secilmis.forEach(z => {

        const kutu2 = document.createElement("div");
        kutu2.classList.add("kutu2");

        const img = document.createElement("img");
        img.src = z.resim;

        const satir2 = document.createElement("div");
        satir2.classList.add("satir2");

        const ad = document.createElement("h3");
        ad.textContent = z.urunadi;

        const icerik = document.createElement("p");
        icerik.textContent = z.icerigi;

        const fiyat = document.createElement("h3");
        fiyat.textContent = z.fiyat + " TL";
        fiyat.style.color = "red";
        const button = document.createElement("button");
        button.classList.add("card-link2");
        button.dataset.no = z.id;
        button.innerHTML = '<i class="fa-solid fa-plus"></i>';

        // 📌 ADET HESABI
        let bulunan = sepet.find(u => u.id == z.id);
        let adet = bulunan ? bulunan.adet : 0;

        if (adet > 0) {
            const adetSpan = document.createElement("span");
            adetSpan.classList.add("adet");
            adetSpan.textContent = adet;
            button.appendChild(adetSpan);
        }

        satir2.appendChild(ad);
        satir2.appendChild(icerik);
        satir2.appendChild(fiyat);

        kutu2.appendChild(img);
        kutu2.appendChild(satir2);
        kutu2.appendChild(button);

        menu2.appendChild(kutu2);
    });
}


// ===============================
// 💰 TOPLAM HESAP
// ===============================
function sepetGuncelle() {

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    let toplam = sepet.reduce((t, u) => t + (u.fiyat * u.adet), 0);

    let cartInfo = document.getElementById("cartInfo");

    if (!cartInfo) return;

    cartInfo.textContent = toplam > 0 ? toplam + " TL" : "";
}


// ===============================
// 🖱 CLICK EVENT
// ===============================
menu2.addEventListener("click", function (e) {

    const btn = e.target.closest("button");
    if (!btn) return;

    let id = btn.dataset.no;

    let bulunan = urunlerim.find(u => u.id == id);
    if (!bulunan) return;

    // ✔ doğru kullanım
    sepeteEkle(bulunan);

    // UI güncelle
    render();
    sepetGuncelle();
});


// ===============================
// 🚀 BAŞLAT
// ===============================
render();
sepetGuncelle();

const havaDiv = document.createElement("div");
havaDiv.classList.add("havaDiv");
havaDiv.innerHTML = '<i class="fa-solid fa-cloud"></i>';
document.querySelector("header").appendChild(havaDiv);

fetch("https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.97&current_weather=true")
    .then(res => res.json())
    .then(data => {

        const derece = data.current_weather.temperature;
        havaDiv.innerHTML = `<i class="fa-solid fa-cloud"></i> <br>
            İstanbul: ${derece}°C
            `;


    });
