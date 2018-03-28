const displacementIntensity = 30;

// Init Pixi
var app = new PIXI.Application(960, 540,  {
    antialias: false,
    transparent: true,
    resolution: 1
});

// Pixi takes care of creating canvas, we're adding to DOM
document.body.appendChild(app.view);

PIXI.loader
    .add('background', 'img/bg-novius.jpg')
    .add('dispacementMap', 'img/displacement_07.png')
    .add('mask', 'img/bg-novius-mask.png')
    .load(function(loader, resources) {
        var bgSprite = PIXI.Sprite.from(resources.background.texture);
        var foregroundSprite = PIXI.Sprite.from(resources.background.texture);
        var maskSprite = PIXI.Sprite.from(resources.mask.texture);
        var displacementSprite = PIXI.Sprite.from(resources.dispacementMap.texture);

        // Setting it's size to be the same at the canvas
        bgSprite.width = app.screen.width;
        bgSprite.height = app.screen.height;
        maskSprite.width = app.screen.width;
        maskSprite.height = app.screen.height;
        foregroundSprite.width = app.screen.width;
        foregroundSprite.height = app.screen.height;

        foregroundSprite.mask = maskSprite;



        // Enable wrapping
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
        // Here we introduce our newly created filter to the scene. "Hey filter you'll be affecting the elements contained within this!"
        // app.stage.filters = [displacementFilter];
        bgSprite.filters = [displacementFilter];

        // Move the displacementSprite position to give the illusion of movement
        TweenMax.to(displacementSprite.anchor, 60, {
            x: 1,
            y: 1,
            ease: Power0.easeNone,
            repeat: -1
        });

        // "Intensity" of the filter
        displacementFilter.scale.set(displacementIntensity);

        // Adding it to our stage
        app.stage.addChild(bgSprite);
        app.stage.addChild(maskSprite);
        app.stage.addChild(foregroundSprite);
    });