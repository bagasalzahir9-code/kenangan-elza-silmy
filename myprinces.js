document.addEventListener(
    "DOMContentLoaded",
    function () {

        const section =
            document.getElementById(
                "princesScrollSection"
            );

        const cards =
            Array.from(
                document.querySelectorAll(
                    ".princes-photo-card"
                )
            );

        const dots =
            Array.from(
                document.querySelectorAll(
                    ".progress-dot"
                )
            );

        const counter =
            document.getElementById(
                "photoCounter"
            );


        const galleryPhotos =
            Array.from(
                document.querySelectorAll(
                    ".gallery-photo img"
                )
            );


        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const lightboxCounter =
            document.getElementById(
                "lightboxCounter"
            );

        const lightboxClose =
            document.getElementById(
                "lightboxClose"
            );

        const lightboxPrev =
            document.getElementById(
                "lightboxPrev"
            );

        const lightboxNext =
            document.getElementById(
                "lightboxNext"
            );


        let ticking = false;

        let currentGalleryIndex = 0;


        function clamp(
            value,
            min,
            max
        ) {

            return Math.max(
                min,
                Math.min(
                    max,
                    value
                )
            );

        }


        function easeOutCubic(t) {

            return 1 -
                Math.pow(
                    1 - t,
                    3
                );

        }


        /* =========================
           STICKY PHOTOS
        ========================== */

        function updatePrinces() {

            if (
                !section ||
                cards.length === 0
            ) {
                return;
            }


            const rect =
                section.getBoundingClientRect();


            const scrollable =
                section.offsetHeight -
                window.innerHeight;


            const travelled =
                -rect.top;


            let progress =
                travelled /
                scrollable;


            progress =
                clamp(
                    progress,
                    0,
                    1
                );


            const steps =
                cards.length - .18;


            const exact =
                progress * steps;


            let current =
                Math.floor(exact);


            current =
                clamp(
                    current,
                    0,
                    cards.length - 1
                );


            const local =
                clamp(
                    exact - current,
                    0,
                    1
                );


            const eased =
                easeOutCubic(local);


            cards.forEach(
                function (
                    card,
                    index
                ) {

                    const image =
                        card.querySelector(
                            "img"
                        );


                    /* BELAKANG */

                    if (
                        index < current
                    ) {

                        const depth =
                            current - index;


                        const side =
                            index % 2 === 0
                                ? -1
                                : 1;


                        const x =
                            side *
                            depth *
                            11;


                        const y =
                            depth *
                            -14;


                        const scale =
                            1 -
                            depth *
                            .04;


                        const rotate =
                            side *
                            (
                                2.8 +
                                depth *
                                .4
                            );


                        card.style.opacity =
                            "1";


                        card.style.transform =
                            `
                            translateX(${x}px)
                            translateY(${y}px)
                            scale(${scale})
                            rotate(${rotate}deg)
                            `;


                        card.style.filter =
                            `
                            brightness(
                                ${1 - depth * .075}
                            )
                            `;


                        card.style.zIndex =
                            index + 1;


                        if (
                            image &&
                            index !== 1
                        ) {

                            image.style.transform =
                                "scale(1.025)";

                        }

                    }


                    /* AKTIF */

                    else if (
                        index === current
                    ) {

                        const side =
                            index % 2 === 0
                                ? -1
                                : 1;


                        card.style.opacity =
                            "1";


                        card.style.transform =
                            `
                            translateY(${-local * 5}px)
                            scale(${1 - local * .014})
                            rotate(${side * 1.8}deg)
                            `;


                        card.style.filter =
                            "brightness(.99)";


                        card.style.zIndex =
                            50 + index;


                        if (
                            image &&
                            index !== 1
                        ) {

                            image.style.transform =
                                "scale(1.016)";

                        }

                    }


                    /* BERIKUTNYA */

                    else if (
                        index ===
                        current + 1
                    ) {

                        const side =
                            index % 2 === 0
                                ? -1
                                : 1;


                        const y =
                            170 *
                            (1 - eased);


                        const scale =
                            .70 +
                            eased *
                            .30;


                        const rotate =
                            (
                                side * -8
                            ) +
                            (
                                (
                                    side * 1.8
                                ) -
                                (
                                    side * -8
                                )
                            ) *
                            eased;


                        card.style.opacity =
                            clamp(
                                local * 1.75,
                                0,
                                1
                            );


                        card.style.transform =
                            `
                            translateY(${y}px)
                            scale(${scale})
                            rotate(${rotate}deg)
                            `;


                        card.style.filter =
                            `
                            blur(
                                ${(1 - local) * 2}px
                            )
                            `;


                        card.style.zIndex =
                            100 + index;


                        if (
                            image &&
                            index !== 1
                        ) {

                            image.style.transform =
                                `
                                scale(
                                    ${1.07 - eased * .05}
                                )
                                `;

                        }

                    }


                    /* BELUM */

                    else {

                        card.style.opacity =
                            "0";


                        card.style.transform =
                            `
                            translateY(170px)
                            scale(.70)
                            `;


                        card.style.zIndex =
                            index;

                    }

                }
            );


            if (counter) {

                counter.textContent =
                    String(
                        current + 1
                    )
                        .padStart(
                            2,
                            "0"
                        )
                    +
                    " / "
                    +
                    String(
                        cards.length
                    )
                        .padStart(
                            2,
                            "0"
                        );

            }


            dots.forEach(
                function (
                    dot,
                    index
                ) {

                    dot.classList.toggle(
                        "active",
                        index === current
                    );

                }
            );

        }


        /* =========================
           LIGHTBOX
        ========================== */

        function showGalleryPhoto(
            index
        ) {

            if (
                galleryPhotos.length === 0
            ) {
                return;
            }


            if (
                index < 0
            ) {

                index =
                    galleryPhotos.length - 1;

            }


            if (
                index >=
                galleryPhotos.length
            ) {

                index = 0;

            }


            currentGalleryIndex =
                index;


            const selected =
                galleryPhotos[
                currentGalleryIndex
                ];


            lightboxImage.src =
                selected.src;


            lightboxImage.alt =
                selected.alt;


            lightboxCounter.textContent =
                String(
                    currentGalleryIndex + 1
                )
                    .padStart(
                        2,
                        "0"
                    )
                +
                " / "
                +
                String(
                    galleryPhotos.length
                )
                    .padStart(
                        2,
                        "0"
                    );

        }


        function openLightbox(
            index
        ) {

            showGalleryPhoto(
                index
            );


            lightbox.classList.add(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body
                .classList
                .add(
                    "lightbox-open"
                );

        }


        function closeLightbox() {

            lightbox.classList.remove(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body
                .classList
                .remove(
                    "lightbox-open"
                );

        }


        function nextPhoto() {

            showGalleryPhoto(
                currentGalleryIndex + 1
            );

        }


        function previousPhoto() {

            showGalleryPhoto(
                currentGalleryIndex - 1
            );

        }


        galleryPhotos.forEach(
            function (
                image,
                index
            ) {

                image.parentElement
                    .addEventListener(
                        "click",
                        function () {

                            openLightbox(
                                index
                            );

                        }
                    );

            }
        );


        if (lightboxClose) {

            lightboxClose
                .addEventListener(
                    "click",
                    closeLightbox
                );

        }


        if (lightboxNext) {

            lightboxNext
                .addEventListener(
                    "click",
                    nextPhoto
                );

        }


        if (lightboxPrev) {

            lightboxPrev
                .addEventListener(
                    "click",
                    previousPhoto
                );

        }


        if (lightbox) {

            lightbox
                .addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        if (
                            event.target ===
                            lightbox
                        ) {

                            closeLightbox();

                        }

                    }
                );

        }


        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    !lightbox ||
                    !lightbox.classList
                        .contains(
                            "open"
                        )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextPhoto();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousPhoto();

                }

            }
        );


        /* =========================
           SCROLL
        ========================== */

        function requestUpdate() {

            if (!ticking) {

                requestAnimationFrame(
                    function () {

                        updatePrinces();

                        ticking =
                            false;

                    }
                );


                ticking =
                    true;

            }

        }


        window.addEventListener(
            "scroll",
            requestUpdate,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            requestUpdate
        );


        updatePrinces();

    }
);
/* ==================================
   BUTTERFLY + LOVE FLOATING DECOR
================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const scrollSection =
            document.getElementById(
                "princesScrollSection"
            );

        const sticky =
            document.querySelector(
                ".princes-sticky"
            );

        if (!scrollSection || !sticky) {
            return;
        }

        let layer =
            sticky.querySelector(
                ".romance-float-layer"
            );

        if (!layer) {
            layer =
                document.createElement("div");

            layer.className =
                "romance-float-layer";

            sticky.appendChild(layer);
        }

        /* posisi dekorasi biar cantik di sekitar foto */
        const config = [
            { kind: "butterfly", text: "🦋", left: 8, top: 66, size: 24, dur: 5.5, delay: 0.0, drift: 22 },
            { kind: "butterfly", text: "🦋", left: 16, top: 30, size: 20, dur: 6.0, delay: 0.8, drift: 18 },
            { kind: "butterfly", text: "🦋", left: 25, top: 75, size: 18, dur: 5.4, delay: 1.2, drift: 20 },
            { kind: "butterfly", text: "🦋", left: 77, top: 27, size: 20, dur: 5.8, delay: 0.4, drift: -18 },
            { kind: "butterfly", text: "🦋", left: 86, top: 62, size: 24, dur: 6.2, delay: 1.0, drift: -22 },
            { kind: "butterfly", text: "🦋", left: 90, top: 42, size: 18, dur: 5.0, delay: 1.6, drift: -16 },

            { kind: "heart", text: "💗", left: 12, top: 52, size: 14, dur: 4.8, delay: 0.2, drift: 14 },
            { kind: "heart", text: "💕", left: 20, top: 40, size: 13, dur: 5.0, delay: 1.1, drift: 12 },
            { kind: "heart", text: "💖", left: 30, top: 22, size: 12, dur: 4.7, delay: 1.8, drift: 10 },
            { kind: "heart", text: "💗", left: 34, top: 70, size: 12, dur: 5.1, delay: 2.2, drift: 12 },
            { kind: "heart", text: "💕", left: 67, top: 20, size: 13, dur: 5.4, delay: 0.5, drift: -10 },
            { kind: "heart", text: "💖", left: 72, top: 48, size: 12, dur: 4.9, delay: 1.4, drift: -12 },
            { kind: "heart", text: "💗", left: 80, top: 74, size: 14, dur: 5.3, delay: 2.0, drift: -14 },
            { kind: "heart", text: "💕", left: 89, top: 36, size: 12, dur: 4.6, delay: 2.4, drift: -12 },
            { kind: "heart", text: "💖", left: 44, top: 14, size: 12, dur: 5.0, delay: 1.0, drift: 8 },
            { kind: "heart", text: "💗", left: 56, top: 78, size: 13, dur: 5.2, delay: 1.9, drift: -8 }
        ];

        layer.innerHTML = "";

        config.forEach(function (item) {
            const el =
                document.createElement("span");

            el.className =
                "romance-item " + item.kind;

            el.textContent =
                item.text;

            el.style.left =
                item.left + "%";

            el.style.top =
                item.top + "%";

            el.style.fontSize =
                item.size + "px";

            el.style.setProperty(
                "--dur",
                item.dur + "s"
            );

            el.style.setProperty(
                "--delay",
                item.delay + "s"
            );

            el.style.setProperty(
                "--drift-x",
                item.drift + "px"
            );

            layer.appendChild(el);
        });

        function updateRomanceState() {
            const rect =
                scrollSection.getBoundingClientRect();

            const sectionHeight =
                scrollSection.offsetHeight -
                window.innerHeight;

            const travelled =
                -rect.top;

            let progress =
                travelled / sectionHeight;

            if (!isFinite(progress)) {
                progress = 0;
            }

            const inActiveRange =
                progress > 0.03 &&
                progress < 0.95;

            layer.classList.toggle(
                "active",
                inActiveRange
            );
        }

        window.addEventListener(
            "scroll",
            updateRomanceState,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateRomanceState
        );

        updateRomanceState();
    }
);
/* ==================================
   RANDOM FLOAT POLISH
================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const romanceItems =
            document.querySelectorAll(
                ".romance-item"
            );

        romanceItems.forEach(
            function (
                item,
                index
            ) {

                const randomX =
                    Math.floor(
                        Math.random() * 20
                    ) - 10;

                const randomDelay =
                    (
                        Math.random() * 1.5
                    ).toFixed(2);

                item.style.setProperty(
                    "--extra-x",
                    randomX + "px"
                );

                item.style.animationDelay =
                    randomDelay + "s";
            }
        );

    }
);