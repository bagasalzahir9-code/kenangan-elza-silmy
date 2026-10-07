document.addEventListener(
    "DOMContentLoaded",
    function () {


        const openButton =
            document.getElementById(
                "openBtn"
            );


        const ribbon =
            document.getElementById(
                "ribbon"
            );


        const coverText =
            document.getElementById(
                "coverText"
            );


        const book =
            document.getElementById(
                "book"
            );


        const status =
            document.getElementById(
                "storyStatus"
            );


        const continueButton =
            document.getElementById(
                "continueBtn"
            );


        const bookLight =
            document.getElementById(
                "bookLight"
            );


        const openingParticles =
            document.getElementById(
                "openingParticles"
            );


        let started = false;



        openButton.addEventListener(
            "click",
            function () {


                if (started) {
                    return;
                }


                started = true;


                openButton.classList.add(
                    "hidden"
                );


                status.textContent =
                    "Membuka cerita kita...";


                status.classList.add(
                    "visible"
                );


                ribbon.classList.add(
                    "releasing"
                );


                setTimeout(
                    function () {

                        status.classList.remove(
                            "visible"
                        );

                    },
                    850
                );


                setTimeout(
                    function () {

                        coverText.classList.add(
                            "show"
                        );

                    },
                    1000
                );


                setTimeout(
                    function () {

                        status.textContent =
                            "Elza ♥ Silmy";


                        status.classList.add(
                            "visible"
                        );

                    },
                    2200
                );


                setTimeout(
                    function () {

                        status.classList.remove(
                            "visible"
                        );


                        book.classList.add(
                            "opening"
                        );


                        bookLight.classList.add(
                            "show"
                        );


                        openingParticles
                            .classList
                            .add(
                                "show"
                            );

                    },
                    3000
                );


                setTimeout(
                    function () {

                        book.classList.add(
                            "opened"
                        );

                    },
                    4700
                );

            }
        );



        continueButton.addEventListener(
            "click",
            function () {


                document.body.classList.add(
                    "page-leaving"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "gallery.html";

                    },
                    550
                );

            }
        );

    }
);