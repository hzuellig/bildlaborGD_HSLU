const stepEls = document.querySelectorAll(".step");

const scroller = scrollama();

function handleStepEnter(response) {
  

  response.element.classList.add("is-active");
}

function handleStepExit(response) {
  response.element.classList.remove("is-active");
}

scroller.setup({
  step: ".step",

  offset: 0.5
});

scroller.onStepEnter(handleStepEnter);
scroller.onStepExit(handleStepExit);

window.addEventListener("resize", () => {
  scroller.resize();
});
