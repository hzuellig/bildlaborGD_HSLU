// initialize the scrollama
var scroller = scrollama();

// scrollama event handlers
function handleStepEnter(response) {
    response.element.classList.add("is-active");
}

function handleStepExit(response) {
    response.element.classList.remove("is-active");
}

function init() {
    scroller
        .setup({
            step: ".img-container",
            debug: false,
            offset: 0.5
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    window.addEventListener("resize", scroller.resize);
}

// kick things off
init();