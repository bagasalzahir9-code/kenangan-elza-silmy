document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================
           SLIDERS
        ====================================== */

        const sliders =
            Array.from(
                document.querySelectorAll(
                    ".memory-slider"
                )
            );


        sliders.forEach(
            function (slider) {

                const track =
                    slider.querySelector(
                        ".slides"
                    );


                const images =
                    Array.from(
                        slider.querySelectorAll(
                            ".slides img"
                        )
                    );


                const prev =
                    slider.querySelector(
                        ".prev"
                    );


                const next =
                    slider.querySelector(
                        ".next"
                    );


                const dots =
                    slider.querySelector(
                        ".slider-dots"
                    );


                const counter =
                    slider.querySelector(
                        ".slider-counter"
                    );


                if (
                    !track ||
                    images.length === 0
                ) {
                    return;
                }


                let current = 0;

                let touchStart = 0;

                let touchEnd = 0;



                /* DOTS */

                dots.innerHTML = "";


                images.forEach(
                    function (
                        image,
                        index
                    ) {

                        const dot =
                            document.createElement(
                                "button"
                            );


                        dot.type = "button";

                        dot.className =
                            "slider-dot";


                        dot.setAttribute(
                            "aria-label",
                            "Foto " +
                            (index + 1)
                        );


                        dot.addEventListener(
                            "click",
                            function (
                                event
                            ) {

                                event.stopPropagation();

                                current =
                                    index;

                                update();

                            }
                        );


                        dots.appendChild(
                            dot
                        );

                    }
                );



                function update() {

                    track.style.transform =
                        `translateX(-${current * 100}%)`;


                    images.forEach(
                        function (
                            image,
                            index
                        ) {

                            image.classList.toggle(
                                "active-image",
                                index === current
                            );

                        }
                    );


                    const dotList =
                        dots.querySelectorAll(
                            ".slider-dot"
                        );


                    dotList.forEach(
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


                    counter.textContent =
                        String(
                            current + 1
                        ).padStart(
                            2,
                            "0"
                        )
                        +
                        " / "
                        +
                        String(
                            images.length
                        ).padStart(
                            2,
                            "0"
                        );

                }



                function nextSlide() {

                    current =
                        (
                            current + 1
                        )
                        %
                        images.length;

                    update();

                }



                function prevSlide() {

                    current =
                        (
                            current - 1
                            +
                            images.length
                        )
                        %
                        images.length;

                    update();

                }



                next.addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        event.stopPropagation();

                        nextSlide();

                    }
                );


                prev.addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        event.stopPropagation();

                        prevSlide();

                    }
                );



                /* SWIPE */

                slider.addEventListener(
                    "touchstart",
                    function (
                        event
                    ) {

                        touchStart =
                            event
                                .touches[0]
                                .clientX;

                    },
                    {
                        passive: true
                    }
                );


                slider.addEventListener(
                    "touchend",
                    function (
                        event
                    ) {

                        touchEnd =
                            event
                                .changedTouches[0]
                                .clientX;


                        const distance =
                            touchStart -
                            touchEnd;


                        if (
                            Math.abs(distance)
                            <
                            45
                        ) {
                            return;
                        }


                        if (
                            distance > 0
                        ) {

                            nextSlide();

                        }

                        else {

                            prevSlide();

                        }

                    },
                    {
                        passive: true
                    }
                );



                /* KEYBOARD */

                slider.setAttribute(
                    "tabindex",
                    "0"
                );


                slider.addEventListener(
                    "keydown",
                    function (
                        event
                    ) {

                        if (
                            event.key ===
                            "ArrowRight"
                        ) {

                            nextSlide();

                        }


                        if (
                            event.key ===
                            "ArrowLeft"
                        ) {

                            prevSlide();

                        }

                    }
                );


                update();

            }
        );



        /* =====================================
           REVEAL ON SCROLL
        ====================================== */

        const sections =
            document.querySelectorAll(
                ".memory-section"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    function (
                        entries
                    ) {

                        entries.forEach(
                            function (
                                entry
                            ) {

                                if (
                                    entry
                                        .isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "visible"
                                        );


                                    observer
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },
                    {
                        threshold: .13
                    }
                );


            sections.forEach(
                function (
                    section
                ) {

                    observer.observe(
                        section
                    );

                }
            );

        }

        else {

            sections.forEach(
                function (
                    section
                ) {

                    section
                        .classList
                        .add(
                            "visible"
                        );

                }
            );

        }



        /* =====================================
           LIGHTBOX
        ====================================== */

        const allImages =
            Array.from(
                document.querySelectorAll(
                    ".memory-slider .slides img"
                )
            );


        const lightbox =
            document.getElementById(
                "galleryLightbox"
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


        let lightboxIndex = 0;



        function showLightboxImage() {

            const image =
                allImages[
                lightboxIndex
                ];


            lightboxImage.src =
                image.src;


            lightboxImage.alt =
                image.alt;


            lightboxCounter
                .textContent =
                String(
                    lightboxIndex + 1
                ).padStart(
                    2,
                    "0"
                )
                +
                " / "
                +
                String(
                    allImages.length
                ).padStart(
                    2,
                    "0"
                );

        }



        function openLightbox(
            index
        ) {

            lightboxIndex =
                index;


            showLightboxImage();


            lightbox.classList.add(
                "show"
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
                "show"
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



        function nextLightbox() {

            lightboxIndex =
                (
                    lightboxIndex + 1
                )
                %
                allImages.length;


            showLightboxImage();

        }



        function prevLightbox() {

            lightboxIndex =
                (
                    lightboxIndex - 1
                    +
                    allImages.length
                )
                %
                allImages.length;


            showLightboxImage();

        }



        allImages.forEach(
            function (
                image,
                index
            ) {

                image.addEventListener(
                    "click",
                    function () {

                        openLightbox(
                            index
                        );

                    }
                );

            }
        );


        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        lightboxNext.addEventListener(
            "click",
            function (
                event
            ) {

                event.stopPropagation();

                nextLightbox();

            }
        );


        lightboxPrev.addEventListener(
            "click",
            function (
                event
            ) {

                event.stopPropagation();

                prevLightbox();

            }
        );


        lightbox.addEventListener(
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


        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    !lightbox.classList
                        .contains(
                            "show"
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

                    nextLightbox();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    prevLightbox();

                }

            }
        );

    }
);