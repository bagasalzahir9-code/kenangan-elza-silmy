
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // SLIDESHOW GALERI
    // ========================================

    const sliders = document.querySelectorAll(".memory-slider");

    sliders.forEach(function (slider) {

        const track = slider.querySelector(".slides");
        const images = Array.from(
            slider.querySelectorAll(".slides img")
        );

        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");
        const dotsContainer = slider.querySelector(".slider-dots");
        const counter = slider.querySelector(".slider-counter");

        if (!track || images.length === 0) return;

        let current = 0;
        let startX = 0;

        // Membuat titik navigasi
        if (dotsContainer) {

            dotsContainer.innerHTML = "";

            images.forEach(function (image, index) {

                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "slider-dot";
                dot.setAttribute(
                    "aria-label",
                    "Lihat foto " + (index + 1)
                );

                dot.addEventListener("click", function (event) {
                    event.stopPropagation();
                    current = index;
                    updateSlider();
                });

                dotsContainer.appendChild(dot);
            });
        }

        // Memperbarui posisi foto
        function updateSlider() {

            track.style.transform =
                "translateX(-" + (current * 100) + "%)";

            images.forEach(function (image, index) {
                image.classList.toggle(
                    "active-image",
                    index === current
                );
            });

            if (dotsContainer) {

                const dots = dotsContainer.querySelectorAll(
                    ".slider-dot"
                );

                dots.forEach(function (dot, index) {
                    dot.classList.toggle(
                        "active",
                        index === current
                    );
                });
            }

            if (counter) {
                counter.textContent =
                    String(current + 1).padStart(2, "0") +
                    " / " +
                    String(images.length).padStart(2, "0");
            }
        }

        function nextSlide() {
            current = (current + 1) % images.length;
            updateSlider();
        }

        function prevSlide() {
            current = (current - 1 + images.length) % images.length;
            updateSlider();
        }

        // Tombol kanan
        if (nextBtn) {
            nextBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                nextSlide();
            });
        }

        // Tombol kiri
        if (prevBtn) {
            prevBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                prevSlide();
            });
        }

        // Swipe di HP
        slider.addEventListener("touchstart", function (event) {
            startX = event.changedTouches[0].clientX;
        }, { passive: true });

        slider.addEventListener("touchend", function (event) {

            const endX = event.changedTouches[0].clientX;
            const distance = startX - endX;

            if (Math.abs(distance) < 45) return;

            if (distance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }

        }, { passive: true });

        // Navigasi keyboard
        slider.setAttribute("tabindex", "0");

        slider.addEventListener("keydown", function (event) {

            if (event.key === "ArrowRight") {
                event.preventDefault();
                nextSlide();
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                prevSlide();
            }
        });

        updateSlider();
    });


    // ========================================
    // ANIMASI SAAT SCROLL
    // ========================================

    const sections = document.querySelectorAll(".memory-section");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            { threshold: 0.13 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    } else {

        sections.forEach(function (section) {
            section.classList.add("visible");
        });
    }


    // ========================================
    // LIGHTBOX: MEMBUKA FOTO BESAR
    // ========================================

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCounter = document.getElementById("lightboxCounter");
    const closeBtn = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    const allImages = Array.from(
        document.querySelectorAll(".memory-slider .slides img")
    );

    if (
        lightbox &&
        lightboxImage &&
        allImages.length > 0
    ) {

        let currentImage = 0;
        let previousFocus = null;

        function showImage() {

            const image = allImages[currentImage];

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            if (lightboxCounter) {
                lightboxCounter.textContent =
                    String(currentImage + 1).padStart(2, "0") +
                    " / " +
                    String(allImages.length).padStart(2, "0");
            }
        }

        function openLightbox(index) {

            previousFocus = document.activeElement;
            currentImage = index;

            showImage();

            lightbox.classList.add("show");
            lightbox.setAttribute("aria-hidden", "false");

            document.body.classList.add("lightbox-open");

            if (closeBtn) closeBtn.focus();
        }

        function closeLightbox() {

            lightbox.classList.remove("show");
            lightbox.setAttribute("aria-hidden", "true");

            document.body.classList.remove("lightbox-open");

            if (previousFocus && previousFocus.focus) {
                previousFocus.focus();
            }
        }

        function nextImage() {
            currentImage = (currentImage + 1) % allImages.length;
            showImage();
        }

        function prevImage() {
            currentImage =
                (currentImage - 1 + allImages.length) %
                allImages.length;

            showImage();
        }

        // Klik foto untuk memperbesar
        allImages.forEach(function (image, index) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function (event) {
                event.stopPropagation();
                openLightbox(index);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", closeLightbox);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", nextImage);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", prevImage);
        }

        // Klik bagian luar foto untuk menutup
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard lightbox
        document.addEventListener("keydown", function (event) {

            if (!lightbox.classList.contains("show")) return;

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                prevImage();
            }
        });
    }

});
