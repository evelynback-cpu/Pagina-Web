/* =========================================
   OLHOS NO FUTURO
   SCRIPT.JS
========================================= */

const root = document.documentElement;

const increaseFont =
    document.getElementById("increaseFont");

const decreaseFont =
    document.getElementById("decreaseFont");

const resetFont =
    document.getElementById("resetFont");

const contrastToggle =
    document.getElementById("contrastToggle");


/*
    Configurações iniciais
*/

let fontScale =
    Number(localStorage.getItem("fontScale")) || 1;

let highContrast =
    localStorage.getItem("highContrast") === "true";


/*
    Aplica as configurações
*/

function applyAccessibility() {

    root.style.setProperty(
        "--font-scale",
        fontScale
    );


    document.body.classList.toggle(
        "high-contrast",
        highContrast
    );


    contrastToggle.setAttribute(
        "aria-pressed",
        String(highContrast)
    );


    if (highContrast) {

        contrastToggle.textContent =
            "◑ Contraste normal";

    } else {

        contrastToggle.textContent =
            "◐ Alto contraste";

    }


    /*
        Salva as configurações
        no navegador
    */

    localStorage.setItem(
        "fontScale",
        fontScale
    );


    localStorage.setItem(
        "highContrast",
        highContrast
    );
}


/*
    AUMENTAR FONTE
*/

increaseFont.addEventListener(
    "click",
    function () {

        fontScale =
            Math.min(
                1.5,
                Number(
                    (fontScale + 0.1).toFixed(1)
                )
            );

        applyAccessibility();
    }
);


/*
    DIMINUIR FONTE
*/

decreaseFont.addEventListener(
    "click",
    function () {

        fontScale =
            Math.max(
                0.8,
                Number(
                    (fontScale - 0.1).toFixed(1)
                )
            );

        applyAccessibility();
    }
);


/*
    TAMANHO PADRÃO
*/

resetFont.addEventListener(
    "click",
    function () {

        fontScale = 1;

        applyAccessibility();
    }
);


/*
    ALTO CONTRASTE
*/

contrastToggle.addEventListener(
    "click",
    function () {

        highContrast = !highContrast;

        applyAccessibility();
    }
);


/*
    Inicializa as configurações
*/

applyAccessibility();


/*
    Navegação suave

    O CSS já possui scroll-behavior,
    mas este código também garante
    um comportamento consistente.
*/

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});