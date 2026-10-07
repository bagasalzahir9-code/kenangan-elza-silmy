document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       01. HOME PAGE
    ========================================================= */

    const openButton =
        document.getElementById("openBtn");

    const ribbon =
        document.getElementById("ribbon");

    const coverText =
        document.getElementById("coverText");

    const book =
        document.getElementById("book");

    const status =
        document.getElementById("storyStatus");

    const continueButton =
        document.getElementById("continueBtn");


    let homeStarted = false;



    /* =========================================================
       BUKA BUKU HOME
    ========================================================= */

    if (
        openButton &&
        ribbon &&
        coverText &&
        book &&
        status
    ) {

        openButton.addEventListener(
            "click",
            function () {

                if (homeStarted) {
                    return;
                }

                homeStarted = true;


                /* Hilangkan tombol buka */

                openButton.classList.add(
                    "hidden"
                );


                /* Tampilkan status */

                status.textContent =
                    "Membuka cerita kita...";

                status.classList.add(
                    "visible"
                );


                /* Lepaskan pita */

                ribbon.classList.add(
                    "releasing"
                );


                /* Hilangkan status */

                setTimeout(
                    function () {

                        status.classList.remove(
                            "visible"
                        );

                    },
                    750
                );


                /* Tampilkan tulisan cover */

                setTimeout(
                    function () {

                        coverText.classList.add(
                            "show"
                        );

                    },
                    1000
                );


                /* Mulai membuka buku */

                setTimeout(
                    function () {

                        book.classList.add(
                            "opening"
                        );

                    },
                    3000
                );


                /* Buku selesai terbuka */

                setTimeout(
                    function () {

                        book.classList.add(
                            "opened"
                        );

                    },
                    4550
                );

            }
        );

    }



    /* =========================================================
       02. PAGE TRANSITION
    ========================================================= */

    function goToPage(url) {

        if (!url) {
            return;
        }


        document.body.classList.add(
            "page-leaving"
        );


        setTimeout(
            function () {

                window.location.href =
                    url;

            },
            450
        );

    }



    /* =========================================================
       TOMBOL LANJUT CERITA DI HOME
    ========================================================= */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                goToPage(
                    "cerita.html"
                );

            }
        );

    }



    /* =========================================================
       TRANSISI LINK HTML
    ========================================================= */

    const internalLinks =
        document.querySelectorAll(
            'a[href$=".html"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const target =
                        link.getAttribute(
                            "href"
                        );


                    if (!target) {
                        return;
                    }


                    /*
                        Cari halaman yang sedang dibuka
                    */

                    let currentPage =
                        window.location.pathname
                            .split("/")
                            .pop();


                    if (!currentPage) {

                        currentPage =
                            "index.html";

                    }


                    /*
                        Kalau klik halaman yang sama
                    */

                    if (
                        target === currentPage
                    ) {

                        event.preventDefault();

                        return;

                    }


                    event.preventDefault();


                    goToPage(
                        target
                    );

                }
            );

        }
    );



    /* =========================================================
       03. NAVBAR ACTIVE
    ========================================================= */

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (!currentPage) {

        currentPage =
            "index.html";

    }


    navLinks.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );



    /* =========================================================
       04. GALLERY SLIDER
    ========================================================= */

    const sliders =
        document.querySelectorAll(
            ".memory-slider"
        );


    sliders.forEach(
        function (slider) {

            const slidesContainer =
                slider.querySelector(
                    ".slides"
                );


            const images =
                slider.querySelectorAll(
                    ".slides img"
                );


            const prevButton =
                slider.querySelector(
                    ".slider-button.prev"
                );


            const nextButton =
                slider.querySelector(
                    ".slider-button.next"
                );


            const dotsContainer =
                slider.querySelector(
                    ".slider-dots"
                );


            /*
                Kalau tidak ada foto,
                slider tidak dijalankan
            */

            if (
                !slidesContainer ||
                images.length === 0
            ) {

                return;

            }


            let currentSlide = 0;

            let touchStartX = 0;

            let touchEndX = 0;



            /* =================================================
               BUAT DOTS OTOMATIS
            ================================================= */

            if (dotsContainer) {

                dotsContainer.innerHTML =
                    "";


                images.forEach(
                    function (
                        image,
                        index
                    ) {

                        const dot =
                            document.createElement(
                                "button"
                            );


                        dot.type =
                            "button";


                        dot.classList.add(
                            "slider-dot"
                        );


                        dot.setAttribute(
                            "aria-label",
                            "Buka foto " +
                            (index + 1)
                        );


                        dot.addEventListener(
                            "click",
                            function (event) {

                                event.stopPropagation();


                                currentSlide =
                                    index;


                                updateSlider();

                            }
                        );


                        dotsContainer.appendChild(
                            dot
                        );

                    }
                );

            }



            /* =================================================
               UPDATE SLIDER
            ================================================= */

            function updateSlider() {

                slidesContainer.style.transform =
                    "translateX(-" +
                    currentSlide * 100 +
                    "%)";


                /*
                    Update gambar aktif
                */

                images.forEach(
                    function (
                        image,
                        index
                    ) {

                        const active =
                            index ===
                            currentSlide;


                        image.setAttribute(
                            "aria-hidden",
                            active
                                ? "false"
                                : "true"
                        );

                    }
                );


                /*
                    Update dots
                */

                if (dotsContainer) {

                    const dots =
                        dotsContainer
                            .querySelectorAll(
                                ".slider-dot"
                            );


                    dots.forEach(
                        function (
                            dot,
                            index
                        ) {

                            dot.classList.toggle(
                                "active",
                                index ===
                                currentSlide
                            );

                        }
                    );

                }

            }



            /* =================================================
               NEXT SLIDE
            ================================================= */

            function nextSlide() {

                currentSlide++;


                if (
                    currentSlide >=
                    images.length
                ) {

                    currentSlide = 0;

                }


                updateSlider();

            }



            /* =================================================
               PREVIOUS SLIDE
            ================================================= */

            function previousSlide() {

                currentSlide--;


                if (
                    currentSlide < 0
                ) {

                    currentSlide =
                        images.length - 1;

                }


                updateSlider();

            }



            /* =================================================
               TOMBOL NEXT
            ================================================= */

            if (nextButton) {

                nextButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        nextSlide();

                    }
                );

            }



            /* =================================================
               TOMBOL PREVIOUS
            ================================================= */

            if (prevButton) {

                prevButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        previousSlide();

                    }
                );

            }



            /* =================================================
               SWIPE HP
            ================================================= */

            slider.addEventListener(
                "touchstart",
                function (event) {

                    if (
                        !event.touches ||
                        event.touches.length === 0
                    ) {

                        return;

                    }


                    touchStartX =
                        event.touches[0]
                            .clientX;

                },
                {
                    passive: true
                }
            );


            slider.addEventListener(
                "touchend",
                function (event) {

                    if (
                        !event.changedTouches ||
                        event.changedTouches.length === 0
                    ) {

                        return;

                    }


                    touchEndX =
                        event.changedTouches[0]
                            .clientX;


                    handleSwipe();

                },
                {
                    passive: true
                }
            );



            function handleSwipe() {

                const distance =
                    touchStartX -
                    touchEndX;


                /*
                    Abaikan gerakan kecil
                */

                if (
                    Math.abs(distance) <
                    45
                ) {

                    return;

                }


                /*
                    Geser ke kiri
                */

                if (
                    distance > 0
                ) {

                    nextSlide();

                }


                /*
                    Geser ke kanan
                */

                else {

                    previousSlide();

                }

            }



            /* =================================================
               KEYBOARD
            ================================================= */

            slider.setAttribute(
                "tabindex",
                "0"
            );


            slider.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        event.preventDefault();

                        nextSlide();

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        event.preventDefault();

                        previousSlide();

                    }

                }
            );



            /*
                Tampilkan slide pertama
            */

            updateSlider();

        }
    );



    /* =========================================================
       05. LIGHTBOX FOTO GALERI
    ========================================================= */

    const galleryImages =
        document.querySelectorAll(
            ".memory-slider .slides img"
        );


    if (
        galleryImages.length > 0
    ) {

        /* =====================================================
           BUAT LIGHTBOX
        ===================================================== */

        const lightbox =
            document.createElement(
                "div"
            );


        lightbox.className =
            "photo-lightbox";


        const lightboxImage =
            document.createElement(
                "img"
            );


        const closeButton =
            document.createElement(
                "button"
            );


        closeButton.type =
            "button";


        closeButton.className =
            "lightbox-close";


        closeButton.innerHTML =
            "&times;";


        closeButton.setAttribute(
            "aria-label",
            "Tutup foto"
        );


        lightbox.appendChild(
            lightboxImage
        );


        lightbox.appendChild(
            closeButton
        );


        document.body.appendChild(
            lightbox
        );



        /* =====================================================
           BUKA FOTO
        ===================================================== */

        galleryImages.forEach(
            function (image) {

                image.style.cursor =
                    "zoom-in";


                image.addEventListener(
                    "click",
                    function () {

                        lightboxImage.src =
                            image.src;


                        lightboxImage.alt =
                            image.alt ||
                            "Foto kenangan";


                        lightbox.classList.add(
                            "show"
                        );


                        document.body.classList.add(
                            "lightbox-open"
                        );

                    }
                );

            }
        );



        /* =====================================================
           TUTUP LIGHTBOX
        ===================================================== */

        function closeLightbox() {

            lightbox.classList.remove(
                "show"
            );


            document.body.classList.remove(
                "lightbox-open"
            );

        }



        closeButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                closeLightbox();

            }
        );



        /*
            Klik background gelap
        */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );



        /*
            Tekan ESC
        */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =========================================================
       06. REVEAL GALERI
    ========================================================= */

    const galleryRevealElements =
        document.querySelectorAll(
            ".gallery-header, .memory-card"
        );


    if (
        galleryRevealElements.length > 0
    ) {

        if (
            "IntersectionObserver"
            in window
        ) {

            const galleryObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "reveal-visible"
                                        );


                                    galleryObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.14
                    }

                );


            galleryRevealElements.forEach(
                function (element) {

                    element.classList.add(
                        "reveal-item"
                    );


                    galleryObserver.observe(
                        element
                    );

                }
            );

        }


        else {

            galleryRevealElements.forEach(
                function (element) {

                    element.classList.add(
                        "reveal-visible"
                    );

                }
            );

        }

    }



    /* =========================================================
       07. STORY TIMELINE REVEAL
    ========================================================= */

    const storyElements =
        document.querySelectorAll(
            ".story-chapter, .story-ending"
        );


    if (
        storyElements.length > 0
    ) {

        if (
            "IntersectionObserver"
            in window
        ) {

            const storyObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "story-visible"
                                        );


                                    storyObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.15
                    }

                );


            storyElements.forEach(
                function (element) {

                    storyObserver.observe(
                        element
                    );

                }
            );

        }


        else {

            storyElements.forEach(
                function (element) {

                    element.classList.add(
                        "story-visible"
                    );

                }
            );

        }

    }



    /* =========================================================
       08. STORY IMAGE ERROR FALLBACK
    ========================================================= */

    const storyImages =
        document.querySelectorAll(
            ".chapter-photo-frame img"
        );


    storyImages.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.style.display =
                        "none";


                    const frame =
                        image.closest(
                            ".chapter-photo-frame"
                        );


                    if (!frame) {
                        return;
                    }


                    /*
                        Jangan buat placeholder
                        lebih dari satu kali
                    */

                    if (
                        frame.querySelector(
                            ".story-photo-placeholder"
                        )
                    ) {

                        return;

                    }


                    const placeholder =
                        document.createElement(
                            "div"
                        );


                    placeholder.className =
                        "story-photo-placeholder";


                    placeholder.innerHTML =
                        `
                        <span>♥</span>
                        <p>Foto Kenangan Kita</p>
                        `;


                    frame.appendChild(
                        placeholder
                    );

                }
            );

        }
    );



    /* =========================================================
       09. PREVENT DOUBLE CLICK LINK
    ========================================================= */

    let pageChanging = false;


    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    'a[href$=".html"]'
                );


            if (!link) {
                return;
            }


            if (pageChanging) {

                event.preventDefault();

                return;

            }


            pageChanging = true;


            setTimeout(
                function () {

                    pageChanging = false;

                },
                1000
            );

        }
    );
    /* =====================================================
       MY PRINCES SCROLL EFFECT
    ===================================================== */

    const princesPhotos =
        document.querySelectorAll(".princes-photo-card");

    if (princesPhotos.length > 0) {

        if ("IntersectionObserver" in window) {

            const princesObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {
                                entry.target.classList.add("is-visible");
                            } else {
                                entry.target.classList.remove("is-visible");
                            }

                        });

                    },

                    {
                        threshold: 0.22
                    }

                );

            princesPhotos.forEach(function (photo) {
                princesObserver.observe(photo);
            });

        } else {

            princesPhotos.forEach(function (photo) {
                photo.classList.add("is-visible");
            });

        }

    }
    /* =====================================================
   MY PRINCES SCROLL POST EFFECT
===================================================== */

    const princesSlides =
        document.querySelectorAll(
            ".princes-slide"
        );


    if (
        princesSlides.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const princesObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            /*
                                FOTO MASUK AREA LAYAR
                            */

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "active"
                                    );

                            }


                            /*
                                FOTO KELUAR DARI AREA LAYAR

                                Jadi kalau scroll ke atas,
                                foto berikutnya akan hilang lagi.
                            */

                            else {

                                entry.target
                                    .classList
                                    .remove(
                                        "active"
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.55
                }

            );


        princesSlides.forEach(
            function (slide) {

                /*
                    foto pertama langsung muncul
                */

                if (
                    slide.classList.contains(
                        "first-photo"
                    )
                ) {

                    slide.classList.add(
                        "active"
                    );

                }


                princesObserver.observe(
                    slide
                );

            }
        );

    }
});
/* =====================================================
   MY PRINCES SCROLL ANIMATION
===================================================== */

const princesSections =
    document.querySelectorAll(
        ".princes-section"
    );


if (
    princesSections.length > 0
) {

    if (
        "IntersectionObserver"
        in window
    ) {

        const princesObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            /*
                                KETIKA FOTO MASUK
                                AREA TENGAH LAYAR
                            */

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "is-active"
                                    );

                            }


                            /*
                                KETIKA FOTO KELUAR

                                Jadi kalau scroll balik
                                ke atas, animasinya
                                kembali ke kondisi awal.
                            */

                            else {

                                entry.target
                                    .classList
                                    .remove(
                                        "is-active"
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.48
                }

            );


        princesSections.forEach(
            function (section) {

                princesObserver.observe(
                    section
                );

            }
        );

    }


    /*
        Fallback browser lama
    */

    else {

        princesSections.forEach(
            function (section) {

                section
                    .classList
                    .add(
                        "is-active"
                    );

            }
        );

    }

}