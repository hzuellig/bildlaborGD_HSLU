gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const slides = selectAll(".post-wrapper");
const delayed = selectAll(".insta-update");
const stage = select('.stage');
let smoother;




function initDelayed(){
    delayed.forEach((card) => {
        const holdAttr = parseFloat(card.getAttribute('attr-delay-hold'));
        const holdVh = Number.isFinite(holdAttr) ? holdAttr : 0;

        gsap.set(card, { autoAlpha: 0, y: 20 });

        gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 70%",
                end: () => "+=" + holdVh + "px",
                scrub: true,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
                markers: true
            }
        })
        .to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
            ease: 'none'
        }, 0)
        .to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: 'none'
        }, 0.2)
        .to(card, {
            autoAlpha: 0,
            y: -20,
            duration: 0.25,
            ease: 'none'
        }, 0.75);
    });
}

function initParallax() {

    slides.forEach((slide) => {
        const imageWrappers = slide.querySelectorAll('.floater');

        imageWrappers.forEach((floater) => {
            const speedAttrY = parseFloat(floater.getAttribute('attr-float-speed-y'));
            const speedY = Number.isFinite(speedAttrY) ? speedAttrY : 0;
            console.log("speedY: ", speedY);

            const speedAttrX = parseFloat(floater.getAttribute('attr-float-speed-x'));
            const speedX = Number.isFinite(speedAttrX) ? speedAttrX : 0;

            const scaleAttr = parseFloat(floater.getAttribute('attr-scale'));
            const scale = Number.isFinite(scaleAttr) ? scaleAttr : 1;

            const offsetAttrX = parseFloat(floater.getAttribute('attr-offset-x'));
            const offsetX = Number.isFinite(offsetAttrX) ? offsetAttrX : 0;
            const offsetAttrY = parseFloat(floater.getAttribute('attr-offset-y'));
            const offsetY = Number.isFinite(offsetAttrY) ? offsetAttrY : 0;

            const opacityAttrFrom = parseFloat(floater.getAttribute('attr-opacity-from')) ;
            const opacityFrom = Number.isFinite(opacityAttrFrom) ? opacityAttrFrom : 1;
            
            const opacityAttrTo = parseFloat(floater.getAttribute('attr-opacity-to')) ;
            const opacityTo = Number.isFinite(opacityAttrTo) ? opacityAttrTo : 1;
           
           

            gsap.set(floater, { opacity: opacityFrom });
            gsap.set(floater, { y: offsetY+"px", x: offsetX+"px", force3D: true});

            gsap.fromTo(floater, {
                y: offsetY+"px",
                x: offsetX+"px",
                scale: 1,
                opacity: opacityFrom
            }, {
                y: () => speedY+"px",
                x: () => speedX+"px",
                scale: scale,
                opacity: opacityTo,
                scrollTrigger: {
                    trigger: slide,
                    scrub: true,
                    start: "10% 50%",
                    end: "bottom top",
                    invalidateOnRefresh: true,
                    //markers: true
                },
                immediateRender: false,
                ease: 'none'
            });
        });
    });
}


function init() {
    smoother = ScrollSmoother.create({
        smooth: 1,
        smoothTouch: 0.1,
        wrapper: '#smooth-wrapper',
        content: '#smooth-content'
    });

    gsap.set(stage, { autoAlpha: 1 });
    initParallax();
    initDelayed();
    ScrollTrigger.refresh();

}

function initOnFirstScrollIntent() {
    let hasInitialized = false;

    const teardown = () => {
        window.removeEventListener('scroll', onFirstIntent);
        window.removeEventListener('wheel', onFirstIntent);
        window.removeEventListener('touchmove', onFirstIntent);
        window.removeEventListener('keydown', onFirstKeydown);
    };

    const onFirstIntent = () => {
        if (hasInitialized) return;
        hasInitialized = true;
        teardown();
        init();
    };

    const onFirstKeydown = (event) => {
        const scrollKeys = [
            'ArrowDown',
            'ArrowUp',
            'PageDown',
            'PageUp',
            'Home',
            'End',
            ' '
        ];

        if (scrollKeys.includes(event.key)) {
            onFirstIntent();
        }
    };

    window.addEventListener('scroll', onFirstIntent, { passive: true });
    window.addEventListener('wheel', onFirstIntent, { passive: true });
    window.addEventListener('touchmove', onFirstIntent, { passive: true });
    window.addEventListener('keydown', onFirstKeydown);
}

window.addEventListener('load', () => {
    //initOnFirstScrollIntent();
    init();
});