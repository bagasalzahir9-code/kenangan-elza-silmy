
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MENGAMBIL ELEMEN MY PRINCES
    // ==========================================

    const section = document.getElementById(
        "princesScrollSection"
    );

    const sticky = document.querySelector(
        ".princes-sticky"
    );

    const cards = Array.from(
        document.querySelectorAll(".princes-photo-card")
    );

    const dots = Array.from(
        document.querySelectorAll(".progress-dot")
    );

    const counter = document.getElementById(
        "photoCounter"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }


    // ==========================================
    // 2. ANIMASI FOTO SAAT SCROLL
    // ==========================================

    let ticking = false;

    function updatePrinces() {

        if (!section || cards.length === 0) {
            return;
        }

        const rect = section.getBoundingClientRect();

        const scrollable = Math.max(
            1,
            section.offsetHeight - window.innerHeight
        );

        const travelled = -rect.top;

        const progress = clamp(
            travelled / scrollable,
            0,
            1
        );

        const exact = progress * cards.length;

        const current = clamp(
            Math.floor(exact),
            0,
            cards.length - 1
        );

        const local = clamp(
            exact - current,
            0,
            1
        );

        const eased = 1 - Math.pow(1 - local, 3);

        cards.forEach(function (card, index) {

            const image = card.querySelector("img");

            if (reduceMotion.matches) {

                card.style.opacity =
                    index === current ? "1" : "0";

                card.style.transform = "none";
                card.style.filter = "none";
                card.style.zIndex = index === current ? 100 : 1;

                return;
            }

            // Foto yang sudah dilewati
            if (index < current) {

                const depth = current - index;

                const side = index % 2 === 0 ? -1 : 1;

                const x = side * depth * 11;
                const y = depth * -14;
                const scale = Math.max(0.7, 1 - depth * 0.04);
                const rotate = side * (2.8 + depth * 0.4);

                card.style.opacity = "1";

                card.style.transform =
                    `translate(${x}px, ${y}px)
                     scale(${scale})
                     rotate(${rotate}deg)`;

                card.style.filter =
                    `brightness(${Math.max(0.5, 1 - depth * 0.075)})`;

                card.style.zIndex = index + 1;
            }

            // Foto yang sedang aktif
            else if (index === current) {

                card.style.opacity = "1";

                card.style.transform = "none";

                card.style.filter = "none";

                card.style.zIndex = 100 + index;
            }

            // Foto selanjutnya yang mulai masuk
            else if (index === current + 1) {

                const side = index % 2 === 0 ? -1 : 1;

                const y = 170 * (1 - eased);

                const scale = 0.7 + eased * 0.3;

                const rotate = side * -8 * (1 - eased);

                card.style.opacity = String(
                    clamp(local * 1.75, 0, 1)
                );

                card.style.transform =
                    `translateY(${y}px)
                     scale(${scale})
                     rotate(${rotate}deg)`;

                card.style.filter =
                    `blur(${(1 - local) * 2}px)`;

                card.style.zIndex = 100 + index;
            }

            // Foto yang belum muncul
            else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(170px) scale(0.7)";

                card.style.filter = "none";

                card.style.zIndex = index;
            }

            // Mempertahankan orientasi foto kedua
            if (image && index !== 1) {
                image.style.transform = "scale(1.025)";
            }
        });


        // ======================================
        // 3. PENGHITUNG FOTO
        // ======================================

        if (counter) {

            counter.textContent =
                String(current + 1).padStart(2, "0") +
                " / " +
                String(cards.length).padStart(2, "0");
        }

        // Titik indikator foto
        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === current
            );
        });

    }


    // ==========================================
    // 4. DEKORASI KUPU-KUPU DAN HATI
    // ==========================================

    let romanceLayer = null;

    if (sticky) {

        romanceLayer = sticky.querySelector(
            ".romance-float-layer"
        );

        if (!romanceLayer) {

            romanceLayer = document.createElement("div");

            romanceLayer.className = "romance-float-layer";

            romanceLayer.setAttribute("aria-hidden", "true");

            sticky.appendChild(romanceLayer);
        }

        const decorations = [
            { text: "🦋", kind: "butterfly", x: 8, y: 66, size: 24 },
            { text: "🦋", kind: "butterfly", x: 16, y: 30, size: 20 },
            { text: "🦋", kind: "butterfly", x: 25, y: 75, size: 18 },
            { text: "🦋", kind: "butterfly", x: 77, y: 27, size: 20 },
            { text: "🦋", kind: "butterfly", x: 86, y: 62, size: 24 },
            { text: "🦋", kind: "butterfly", x: 90, y: 42, size: 18 },

            { text: "💗", kind: "heart", x: 12, y: 52, size: 14 },
            { text: "💕", kind: "heart", x: 20, y: 40, size: 13 },
            { text: "💖", kind: "heart", x: 30, y: 22, size: 12 },
            { text: "💗", kind: "heart", x: 34, y: 70, size: 12 },
            { text: "💕", kind: "heart", x: 67, y: 20, size: 13 },
            { text: "💖", kind: "heart", x: 72, y: 48, size: 12 },
            { text: "💗", kind: "heart", x: 80, y: 74, size: 14 },
            { text: "💕", kind: "heart", x: 89, y: 36, size: 12 },
            { text: "💖", kind: "heart", x: 44, y: 14, size: 12 },
            { text: "💗", kind: "heart", x: 56, y: 78, size: 13 }
        ];

        romanceLayer.innerHTML = "";

        decorations.forEach(function (item, index) {

            const element = document.createElement("span");

            element.className =
                "romance-item " + item.kind;

            element.textContent = item.text;

            element.style.left = item.x + "%";
            element.style.top = item.y + "%";
            element.style.fontSize = item.size + "px";

            element.style.setProperty(
                "--dur",
                (4.6 + (index % 5) * 0.35) + "s"
            );

            element.style.setProperty(
                "--delay",
                (index % 6) * 0.35 + "s"
            );

            element.style.setProperty(
                "--drift-x",
                (index % 2 === 0 ? 15 : -15) + "px"
            );

            element.style.setProperty(
                "--extra-x",
                (index % 3 - 1) * 7 + "px"
            );

            romanceLayer.appendChild(element);
        });
    }


    function updateRomance() {

        if (!section || !romanceLayer) {
            return;
        }

        const rect = section.getBoundingClientRect();

        const visible =
            rect.top < window.innerHeight * 0.9 &&
            rect.bottom > window.innerHeight * 0.1;

        romanceLayer.classList.toggle(
            "active",
            visible && !reduceMotion.matches
        );
    }


    // ==========================================
    // 5. OPTIMASI SCROLL
    // ==========================================

    function requestUpdate() {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(function () {

            updatePrinces();
            updateRomance();

            ticking = false;
        });
    }

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestUpdate
    );

    if (reduceMotion.addEventListener) {
        reduceMotion.addEventListener(
            "change",
            requestUpdate
        );
    }

    requestUpdate();


    // ==========================================
    // 6. GALERI FOTO MY PRINCES
    // ==========================================

    const galleryPhotos = Array.from(
        document.querySelectorAll(".gallery-photo img")
    );

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById(
        "lightboxImage"
    );

    const lightboxCounter = document.getElementById(
        "lightboxCounter"
    );

    const lightboxClose = document.getElementById(
        "lightboxClose"
    );

    const lightboxPrev = document.getElementById(
        "lightboxPrev"
    );

    const lightboxNext = document.getElementById(
        "lightboxNext"
    );

    let currentGalleryIndex = 0;
    let previousFocus = null;

    if (
        lightbox &&
        lightboxImage &&
        galleryPhotos.length > 0
    ) {

        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Galeri foto");

        function showGalleryPhoto(index) {

            currentGalleryIndex =
                (index + galleryPhotos.length) %
                galleryPhotos.length;

            const image = galleryPhotos[currentGalleryIndex];

            lightboxImage.src = image.currentSrc || image.src;

            lightboxImage.alt = image.alt || "Foto kenangan";

            if (lightboxCounter) {

                lightboxCounter.textContent =
                    String(currentGalleryIndex + 1).padStart(2, "0") +
                    " / " +
                    String(galleryPhotos.length).padStart(2, "0");
            }
        }

        function openLightbox(index) {

            previousFocus = document.activeElement;

            showGalleryPhoto(index);

            lightbox.classList.add("open");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "lightbox-open"
            );

            if (lightboxClose) {
                lightboxClose.focus();
            }
        }

        function closeLightbox() {

            lightbox.classList.remove("open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "lightbox-open"
            );

            if (previousFocus && previousFocus.focus) {
                previousFocus.focus();
            }
        }

        function nextPhoto() {
            showGalleryPhoto(currentGalleryIndex + 1);
        }

        function previousPhoto() {
            showGalleryPhoto(currentGalleryIndex - 1);
        }


        // Klik foto
        galleryPhotos.forEach(function (image, index) {

            const photo = image.closest(".gallery-photo");

            if (!photo) return;

            photo.setAttribute("tabindex", "0");
            photo.setAttribute("role", "button");
            photo.setAttribute(
                "aria-label",
                "Perbesar foto " + (index + 1)
            );

            photo.addEventListener("click", function () {
                openLightbox(index);
            });

            photo.addEventListener("keydown", function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();
                    openLightbox(index);
                }
            });
        });


        // Tombol tutup
        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );
        }

        // Tombol foto berikutnya
        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                nextPhoto
            );
        }

        // Tombol foto sebelumnya
        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                previousPhoto
            );
        }

        // Klik area gelap untuk menutup
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }
        });


        // Navigasi keyboard
        document.addEventListener("keydown", function (event) {

            if (!lightbox.classList.contains("open")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                nextPhoto();
            }

            if (event.key === "ArrowLeft") {
                previousPhoto();
            }

            if (event.key === "Tab") {

                const buttons = [
                    lightboxClose,
                    lightboxPrev,
                    lightboxNext
                ].filter(function (button) {
                    return button && !button.disabled;
                });

                if (buttons.length === 0) {
                    event.preventDefault();
                    return;
                }

                const first = buttons[0];
                const last = buttons[buttons.length - 1];

                if (
                    event.shiftKey &&
                    document.activeElement === first
                ) {
                    event.preventDefault();
                    last.focus();
                }

                else if (
                    !event.shiftKey &&
                    document.activeElement === last
                ) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

});
