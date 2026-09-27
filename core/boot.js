/* =========================================================
   CORILZON BOOT SYSTEM
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURAZIONE
    ===================================================== */

    const CONFIG = {

        blackBeforeApple: 1000,

        firstApple: 2000,

        kernelLineDelay: 55,

        kernelEndPause: 500,

        blackBetweenBoots: 1000,

        finalAppleProgress: 12000,

        finalPause: 1000

    };


    let bootRunning = false;
    let bootOverlay = null;


    /* =====================================================
       WAIT
    ===================================================== */

    function wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });
    }


    /* =====================================================
       PWA META
    ===================================================== */

    function configurePWA() {

        /*
           viewport-fit=cover permette alla pagina
           di utilizzare anche le aree vicino alla
           Dynamic Island.

           Non modifica la Dynamic Island reale:
           quella rimane gestita da iOS.
        */

        let viewport =
            document.querySelector(
                'meta[name="viewport"]'
            );

        if (!viewport) {

            viewport =
                document.createElement("meta");

            viewport.name = "viewport";

            document.head.appendChild(viewport);
        }

        viewport.content =
            "width=device-width," +
            "initial-scale=1," +
            "maximum-scale=1," +
            "viewport-fit=cover";


        let theme =
            document.querySelector(
                'meta[name="theme-color"]'
            );

        if (!theme) {

            theme =
                document.createElement("meta");

            theme.name = "theme-color";

            document.head.appendChild(theme);
        }

        theme.content = "#000000";


        let status =
            document.querySelector(
                'meta[name="apple-mobile-web-app-status-bar-style"]'
            );

        if (!status) {

            status =
                document.createElement("meta");

            status.name =
                "apple-mobile-web-app-status-bar-style";

            document.head.appendChild(status);
        }

        status.content = "black-translucent";


        /*
           Anche il body viene preparato nero
           prima di creare il boot.
        */

        document.documentElement.style.background =
            "#000000";

        document.body.style.background =
            "#000000";

        document.body.style.margin =
            "0";
    }


    /* =====================================================
       CREA BOOT SCREEN
    ===================================================== */

    function createCorilzonBootScreen() {

        if (bootOverlay) {

            bootOverlay.remove();

            bootOverlay = null;
        }


        const overlay =
            document.createElement("div");

        overlay.id =
            "corilzon-boot-overlay";


        /*
           Questo overlay è intenzionalmente
           estremamente alto nello stacking order.
        */

        Object.assign(
            overlay.style,
            {

                position: "fixed",

                top: "0",

                left: "0",

                right: "0",

                bottom: "0",

                width: "100vw",

                height: "100vh",

                minWidth: "100vw",

                minHeight: "100vh",

                background: "#000000",

                margin: "0",

                border: "0",

                paddingTop:
                    "env(safe-area-inset-top, 0px)",

                paddingRight:
                    "env(safe-area-inset-right, 0px)",

                paddingBottom:
                    "env(safe-area-inset-bottom, 0px)",

                paddingLeft:
                    "env(safe-area-inset-left, 0px)",

                boxSizing: "border-box",

                zIndex: "2147483647",

                overflow: "hidden",

                display: "block",

                opacity: "1",

                visibility: "visible",

                pointerEvents: "all",

                color: "#ffffff",

                fontFamily:
                    "-apple-system, BlinkMacSystemFont, " +
                    "\"SF Pro Display\", \"Helvetica Neue\", Arial, sans-serif"

            }
        );


        /*
           Regole CSS aggiuntive.

           Vengono inserite direttamente nella pagina
           per evitare che qualche stile precedente
           faccia comparire una fascia bianca.
        */

        const style =
            document.createElement("style");

        style.id =
            "corilzon-boot-style";

        style.textContent = `

            html,
            body {

                margin: 0 !important;

                background: #000 !important;

            }


            #corilzon-boot-overlay {

                position: fixed !important;

                inset: 0 !important;

                width: 100vw !important;

                height: 100vh !important;

                height: 100dvh !important;

                min-width: 100vw !important;

                min-height: 100vh !important;

                min-height: 100dvh !important;

                margin: 0 !important;

                border: 0 !important;

                background: #000 !important;

                overflow: hidden !important;

                z-index: 2147483647 !important;

                transform: translateZ(0);

                isolation: isolate;

            }


            #corilzon-boot-overlay * {

                box-sizing: border-box;

            }


            #corilzon-boot-content {

                position: absolute;

                inset: 0;

                width: 100%;

                height: 100%;

                background: #000;

                overflow: hidden;

            }

        `;

        document.head.appendChild(style);


        const content =
            document.createElement("div");

        content.id =
            "corilzon-boot-content";


        overlay.appendChild(content);

        document.body.appendChild(overlay);

        bootOverlay = overlay;

        return overlay;
    }


    /* =====================================================
       SET SCREEN
    ===================================================== */

    function setBootScreen(type, data = {}) {

        if (!bootOverlay) {
            return;
        }


        const content =
            bootOverlay.querySelector(
                "#corilzon-boot-content"
            );

        if (!content) {
            return;
        }


        content.innerHTML = "";


        /* ================================================
           BLACK
        ================================================ */

        if (type === "black") {

            content.style.background =
                "#000000";

            return;
        }


        /* ================================================
           FIRST APPLE
        ================================================ */

        if (type === "apple") {

            content.style.background =
                "#000000";


            const apple =
                document.createElement("div");

            apple.textContent = "";

            Object.assign(
                apple.style,
                {

                    position: "absolute",

                    left: "50%",

                    top: "50%",

                    transform:
                        "translate(-50%, -50%)",

                    color: "#ffffff",

                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, " +
                        "\"Helvetica Neue\", Arial, sans-serif",

                    fontSize: "82px",

                    lineHeight: "1",

                    fontWeight: "400",

                    textAlign: "center"

                }
            );


            content.appendChild(apple);

            return;
        }


        /* ================================================
           KERNEL
        ================================================ */

        if (type === "kernel") {

            content.style.background =
                "#000000";


            const terminal =
                document.createElement("div");

            terminal.id =
                "corilzon-kernel";


            Object.assign(
                terminal.style,
                {

                    position: "absolute",

                    left: "12px",

                    right: "12px",

                    top: "12px",

                    bottom: "12px",

                    overflow: "hidden",

                    color: "#ffffff",

                    fontFamily:
                        "ui-monospace, SFMono-Regular, " +
                        "Menlo, Monaco, Consolas, monospace",

                    fontSize: "10px",

                    lineHeight: "13px",

                    whiteSpace: "pre-wrap",

                    wordBreak: "break-word"

                }
            );


            content.appendChild(terminal);

            return;
        }


        /* ================================================
           FINAL APPLE + PROGRESS BAR
        ================================================ */

        if (type === "final") {

            content.style.background =
                "#000000";


            const apple =
                document.createElement("div");

            apple.textContent = "";


            Object.assign(
                apple.style,
                {

                    position: "absolute",

                    left: "50%",

                    top: "42%",

                    transform:
                        "translate(-50%, -50%)",

                    color: "#ffffff",

                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, " +
                        "\"Helvetica Neue\", Arial, sans-serif",

                    fontSize: "82px",

                    lineHeight: "1"

                }
            );


            const track =
                document.createElement("div");


            Object.assign(
                track.style,
                {

                    position: "absolute",

                    left: "18%",

                    right: "18%",

                    top: "54%",

                    height: "5px",

                    borderRadius: "10px",

                    background: "#333333",

                    overflow: "hidden"

                }
            );


            const bar =
                document.createElement("div");

            bar.id =
                "corilzon-final-progress";


            Object.assign(
                bar.style,
                {

                    width: "0%",

                    height: "100%",

                    background: "#ffffff",

                    borderRadius: "10px"

                }
            );


            track.appendChild(bar);

            content.appendChild(apple);

            content.appendChild(track);

            return;
        }
    }


    /* =====================================================
       BLACK PHASE
    ===================================================== */

    async function blackPhase() {

        setBootScreen("black");

        await wait(
            CONFIG.blackBeforeApple
        );
    }


    /* =====================================================
       FIRST APPLE
    ===================================================== */

    async function firstApplePhase() {

        setBootScreen("apple");

        await wait(
            CONFIG.firstApple
        );
    }


    /* =====================================================
       KERNEL
    ===================================================== */

    async function kernelPhase() {

        setBootScreen("kernel");


        const terminal =
            document.getElementById(
                "corilzon-kernel"
            );


        if (!terminal) {
            return;
        }


        const lines = [

            "[Corilzon] Booting Corilzon Environment...",

            "[OK] Initializing boot services",

            "[OK] Loading kernel",

            "[OK] Initializing memory manager",

            "[OK] Initializing process manager",

            "[OK] Initializing filesystem",

            "[OK] Mounting Corilzon FS",

            "[OK] Checking system integrity",

            "[OK] Loading device drivers",

            "[OK] Initializing display",

            "[OK] Initializing input services",

            "[OK] Loading security subsystem",

            "[OK] Starting system services",

            "[OK] Starting user environment",

            "[OK] Loading iOS simulation layer",

            "[OK] Loading Corilzon modules",

            "[OK] Developer environment active",

            "[OK] Environment status: ACTIVE",

            "[OK] System initialization complete",

            "Corilzon kernel ready."

        ];


        for (const line of lines) {

            terminal.textContent +=
                line + "\n";

            await wait(
                CONFIG.kernelLineDelay
            );
        }


        await wait(
            CONFIG.kernelEndPause
        );
    }


    /* =====================================================
       SECOND BLACK
    ===================================================== */

    async function secondBlackPhase() {

        setBootScreen("black");

        await wait(
            CONFIG.blackBetweenBoots
        );
    }


    /* =====================================================
       FINAL APPLE
    ===================================================== */

    async function finalApplePhase() {

        setBootScreen("final");


        const bar =
            document.getElementById(
                "corilzon-final-progress"
            );


        if (!bar) {
            return;
        }


        const start =
            performance.now();


        const duration =
            CONFIG.finalAppleProgress;


        await new Promise(resolve => {

            function animate(now) {

                const elapsed =
                    now - start;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                bar.style.width =
                    (progress * 100) + "%";


                if (progress < 1) {

                    requestAnimationFrame(
                        animate
                    );

                } else {

                    resolve();
                }
            }


            requestAnimationFrame(
                animate
            );
        });


        await wait(
            CONFIG.finalPause
        );
    }


    /* =====================================================
       FINE BOOT
    ===================================================== */

    function finishCorilzonBoot() {

        if (!bootOverlay) {
            return;
        }


        /*
           Il boot è terminato.

           Salviamo lo stato se state.js
           è disponibile.
        */

        if (
            typeof simulatePowerOn ===
            "function"
        ) {

            try {

                simulatePowerOn(
                    "Corilzon boot completed"
                );

            } catch (error) {

                console.warn(error);

            }
        }


        if (
            typeof setCorilzonState ===
            "function"
        ) {

            try {

                setCorilzonState({

                    bootPending: false,

                    devicePoweredOff: false,

                    installerCompleted: true,

                    jailbreakActive: true

                });

            } catch (error) {

                console.warn(error);

            }
        }


        /*
           Lasciamo lo schermo nero per un
           breve momento prima di rimuovere
           l'overlay.
        */

        setBootScreen("black");


        setTimeout(() => {

            if (bootOverlay) {

                bootOverlay.remove();

                bootOverlay = null;
            }


            const style =
                document.getElementById(
                    "corilzon-boot-style"
                );

            if (style) {
                style.remove();
            }


            document.documentElement.style
                .background = "";

            document.body.style
                .background = "";

            bootRunning = false;

        }, 250);
    }


    /* =====================================================
       RUN BOOT
    ===================================================== */

    async function runCorilzonBoot() {

        if (bootRunning) {
            return;
        }


        bootRunning = true;


        configurePWA();


        createCorilzonBootScreen();


        /*
           1. Nero
        */

        await blackPhase();


        /*
           2. Apple
        */

        await firstApplePhase();


        /*
           3. Kernel
        */

        await kernelPhase();


        /*
           4. Nero
        */

        await secondBlackPhase();


        /*
           5. Apple + barra
        */

        await finalApplePhase();


        /*
           6. Fine
        */

        finishCorilzonBoot();
    }


    /* =====================================================
       INSTALLER → BOOT
    ===================================================== */

    window.addEventListener(
        "corilzon-installer-complete",
        function () {

            /*
               Il boot parte SOLO quando
               l'installer comunica di aver
               raggiunto il completamento.
            */

            runCorilzonBoot();

        }
    );


    /* =====================================================
       API PUBBLICA
    ===================================================== */

    window.CorilzonBoot = {

        start: runCorilzonBoot,

        isRunning: function () {

            return bootRunning;

        }

    };


    /* =====================================================
       PREPARAZIONE INIZIALE
    ===================================================== */

    configurePWA();


})();