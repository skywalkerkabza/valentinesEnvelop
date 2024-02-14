var density = 20,
    speed = 1,
    winHeight = $(window).height(),
    start = {yMin: winHeight + 50, yMax: winHeight + 50, xMin: 100, xMax: 200, scaleMin: 0.1, scaleMax: 0.25, opacityMin: 0.2, opacityMax: 0.4},
    mid = {yMin: winHeight * 0.3, yMax: winHeight * 0.5, xMin: 75, xMax: 300, scaleMin: 0.2, scaleMax: 0.3, opacityMin: 0.5, opacityMax: 1},
    end = {yMin: -180, yMax: -180, xMin: 20, xMax: 600, scaleMin: 0.1, scaleMax: 1, opacityMin: 0.2, opacityMax: 0.7},
    colors = ["#FF0000", "#FFFF00"];

function range(map, prop) {
    var min = map[prop + "Min"],
        max = map[prop + "Max"];
    return min + (max - min) * Math.random();
}

function spawn(particle) {
    var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
        delay = wholeDuration * Math.random(),
        partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

    // Set the starting values
    TweenLite.set(particle, {y: range(start, "y"), x: range(start, "x"), scale: range(start, "scale"), opacity: range(start, "opacity"), visibility: "hidden", color: colors[Math.floor(Math.random() * colors.length)]});

    // The y tween should be continuous and smooth the whole duration
    TweenLite.to(particle, wholeDuration, {delay: delay, y: range(end, "y"), ease: Linear.easeNone});

    // Now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
    TweenLite.to(particle, partialDuration, {delay: delay, x: range(mid, "x"), ease: Power1.easeOut});
    TweenLite.to(particle, wholeDuration - partialDuration, {delay: partialDuration + delay, x: range(end, "x"), ease: Power1.easeIn});

    // Now create some random scale and opacity changes
    partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
    TweenLite.to(particle, partialDuration, {delay: delay, scale: range(mid, "scale"), autoAlpha: range(mid, "opacity"), ease: Linear.easeNone});
    TweenLite.to(particle, wholeDuration - partialDuration, {delay: partialDuration + delay, scale: range(end, "scale"), autoAlpha: range(end, "opacity"), ease: Linear.easeNone, onComplete: spawn, onCompleteParams: [particle]});
}

$(window).ready(function () {
    var body = $("#fountain-top"),
        i, particle;
    for (i = 0; i < density; i++) {
        particle = $("<div />", {id: "heart" + i}).addClass("heart").html('&#10084;').appendTo(body);
        // Add message to hearts
        if (i === 0) {
            particle.append("<p>I love you</p>");
        } else if (i === 1) {
            particle.append("<p>Happy Valentines day MakaMiMo</p>");
        }
        spawn(particle);
    }
});
