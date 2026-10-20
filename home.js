
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ELEMEN UTAMA HOME
    // =====================================

    const book = document.getElementById("book");
    const openBtn = document.getElementById("openBtn");
    const ribbon = document.getElementById("ribbon");
    const coverText = document.getElementById("coverText");
    const bookLight = document.getElementById("bookLight");
    const particles = document.getElementById("openingParticles");
    const status = document.getElementById("storyStatus");
    const continueBtn = document.getElementById("continueBtn");

    let isOpening = false;


    // =====================================
    // FOTO KENANGAN HOME
    // =====================================

    const memoryImage = document.getElementById("memorySlideImage");

    const photoCandidates = [
        "foto/home1.jpg",
        "foto/home1.jpeg",
        "foto/home1.png",
        "foto/home1.webp",
        "foto/kenangan1.jpg",
        "foto/kenangan1.jpeg",
        "foto/kenangan1.png",
        "foto/kenangan1.webp",
        "foto/intro.jpg",
        "foto/mountain1.jpg",
        "foto/datehome1.jpg"
    ];

    if (memoryImage) {

        let photoIndex = 0;

        function loadPhoto() {

            if (photoIndex >= photoCandidates.length) {
                memoryImage.removeAttribute("src");
                memoryImage.alt = "Foto kenangan belum tersedia";
                memoryImage.style.display = "none";
                return;
            }

            const photo = photoCandidates[photoIndex];
            photoIndex++;

            memoryImage.src = photo;
        }

        memoryImage.addEventListener("error", loadPhoto);

        memoryImage.addEventListener("load", function () {
            memoryImage.style.display = "block";
        });

        loadPhoto();
    }


    // =====================================
    // ANIMASI MEMBUKA BUKU
    // =====================================

    if (openBtn && book) {

        openBtn.addEventListener("click", function () {

            if (isOpening) return;

            isOpening = true;

            openBtn.classList.add("hidden");

            if (status) {
                status.textContent = "Membuka cerita kita...";
                status.classList.add("visible");
            }

            // Lepaskan pita buku
            if (ribbon) {
                ribbon.classList.add("releasing");
            }

            // Tampilkan tulisan cover
            setTimeout(function () {
                if (coverText) {
                    coverText.classList.add("show");
                }
            }, 350);

            // Tampilkan cahaya buku
            setTimeout(function () {
                if (bookLight) {
                    bookLight.classList.add("show");
                }
            }, 650);

            // Mulai buka buku
            setTimeout(function () {

                if (status) {
                    status.classList.remove("visible");
                }

                book.classList.add("opening");

                if (particles) {
                    particles.classList.add("show");
                }

            }, 900);

            // Buku selesai terbuka
            setTimeout(function () {

                book.classList.remove("opening");
                book.classList.add("opened");

            }, 2650);

        });

    }


    // =====================================
    // TOMBOL EXPLORE OUR STORY
    // =====================================

    if (continueBtn) {

        continueBtn.addEventListener("click", function () {

            document.body.classList.add("page-leaving");

            setTimeout(function () {
                window.location.href = "gallery.html";
            }, 550);

        });

    }

});
