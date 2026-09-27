/* =========================================================
   CORILZON STATE
   Stato persistente della simulazione
========================================================= */

const CORILZON_STATE_KEY = "corilzon_state";

const DEFAULT_CORILZON_STATE = {
    installerCompleted: false,
    bootPending: false,
    jailbreakActive: false,
    developerMode: false,
    devicePoweredOff: false,
    lastBootReason: "",
    corilzonVersion: "1.0.0"
};


/* =========================================================
   LOAD
========================================================= */

function loadCorilzonState() {

    try {

        const raw = localStorage.getItem(CORILZON_STATE_KEY);

        if (!raw) {
            return { ...DEFAULT_CORILZON_STATE };
        }

        const parsed = JSON.parse(raw);

        return {
            ...DEFAULT_CORILZON_STATE,
            ...parsed
        };

    } catch (error) {

        console.warn(
            "Corilzon: impossibile leggere lo stato.",
            error
        );

        return { ...DEFAULT_CORILZON_STATE };
    }
}


/* =========================================================
   SAVE
========================================================= */

function saveCorilzonState(state) {

    try {

        localStorage.setItem(
            CORILZON_STATE_KEY,
            JSON.stringify(state)
        );

        return true;

    } catch (error) {

        console.warn(
            "Corilzon: impossibile salvare lo stato.",
            error
        );

        return false;
    }
}


/* =========================================================
   SET STATE
========================================================= */

function setCorilzonState(changes) {

    const current = loadCorilzonState();

    const updated = {
        ...current,
        ...changes
    };

    saveCorilzonState(updated);

    return updated;
}


/* =========================================================
   JAILBREAK
========================================================= */

function setJailbreakActive(active = true) {

    return setCorilzonState({
        jailbreakActive: Boolean(active)
    });
}


/* =========================================================
   DEVELOPER MODE
========================================================= */

function enableDeveloperMode(active = true) {

    return setCorilzonState({
        developerMode: Boolean(active)
    });
}


/* =========================================================
   INSTALLER COMPLETATO
========================================================= */

function completeCorilzonInstaller() {

    const state = setCorilzonState({

        installerCompleted: true,

        /*
           Il boot viene richiesto solamente dopo
           che l'installer ha raggiunto il 100%.
        */
        bootPending: true,

        /*
           Il dispositivo viene spento prima
           dell'avvio simulato.
        */
        devicePoweredOff: true,

        lastBootReason: "Corilzon Installer completed"

    });


    /*
       Evento utilizzato da boot.js.

       Questo evita di modificare settings.html.
    */

    try {

        window.dispatchEvent(
            new CustomEvent(
                "corilzon-installer-complete"
            )
        );

    } catch (error) {

        console.warn(
            "Corilzon: evento installer non disponibile.",
            error
        );
    }


    return state;
}


/* =========================================================
   RICHIESTA BOOT
========================================================= */

function requestCorilzonBoot(reason = "Manual boot") {

    return setCorilzonState({

        bootPending: true,

        devicePoweredOff: true,

        lastBootReason: reason

    });
}


/* =========================================================
   CONSUMA RICHIESTA BOOT
========================================================= */

function consumeCorilzonBoot() {

    const state = loadCorilzonState();

    if (!state.bootPending) {
        return false;
    }

    setCorilzonState({
        bootPending: false,
        devicePoweredOff: false
    });

    return true;
}


/* =========================================================
   CANCELLA RICHIESTA BOOT
========================================================= */

function clearCorilzonBootRequest() {

    return setCorilzonState({
        bootPending: false
    });
}


/* =========================================================
   POWER OFF
========================================================= */

function simulatePowerOff(reason = "Power off") {

    return setCorilzonState({

        devicePoweredOff: true,

        bootPending: false,

        lastBootReason: reason

    });
}


/* =========================================================
   POWER ON
========================================================= */

function simulatePowerOn(reason = "Power on") {

    return setCorilzonState({

        devicePoweredOff: false,

        lastBootReason: reason

    });
}


/* =========================================================
   IOS UPDATE SIMULATO
========================================================= */

function simulateIOSUpdate(version = "27.0") {

    return setCorilzonState({

        lastIOSVersion: version,

        lastBootReason: "iOS update"

    });
}


/* =========================================================
   CORILZON UPDATE SIMULATO
========================================================= */

function simulateCorilzonUpdate(version = "1.0.0") {

    return setCorilzonState({

        corilzonVersion: version,

        lastBootReason: "Corilzon update"

    });
}