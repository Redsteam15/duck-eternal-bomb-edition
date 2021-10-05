scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    tiles.setTilemap(tilemap`level1-COPY`)
    pause(50)
    tiles.setTilemap(tilemap`level1`)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, PLAYERSPRITE, 0, 0)
    statusbar.value += -10
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    PLAYERSPRITE.setImage(img`
        . . . . . . . . . b 5 b . . . . 
        . . . . . . . . . b 5 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . . . . b b 5 b c 5 5 d 4 c . . 
        . b b b b 5 5 5 b f d d 4 4 4 b 
        . b d 5 b 5 5 b c b 4 4 4 4 b . 
        . . b 5 5 b 5 5 5 4 4 4 4 b . . 
        . . b d 5 5 b 5 5 5 5 5 5 b . . 
        . b d b 5 5 5 d 5 5 5 5 5 5 b . 
        b d d c d 5 5 b 5 5 5 5 5 5 b . 
        c d d d c c b 5 5 5 5 5 5 5 b . 
        c b d d d d d 5 5 5 5 5 5 5 b . 
        . c d d d d d d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        `)
    pause(100)
    PLAYERSPRITE.setImage(assets.image`myImage`)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (true) {
        sprite.destroy(effects.coolRadial, 500)
        Enemysprite1 = sprites.create(assets.image`Ghost`, SpriteKind.Enemy)
        Enemysprite1.setPosition(randint(25, 500), randint(25, 500))
        Enemysprite1.follow(PLAYERSPRITE, 25)
        info.changeScoreBy(50)
        otherSprite.destroy(effects.warmRadial, 500)
        controller.startLightAnimation(light.rainbowAnimation, 500)
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false, effects.splatter)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Enemysprite1.startEffect(effects.spray, 250)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false, effects.dissolve)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar2.value += -10
    pause(250)
})
let projectile2: Sprite = null
let Enemysprite1: Sprite = null
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let PLAYERSPRITE: Sprite = null
game.splash("PRESS A TO BECOME THE DUCK")
game.splash("LETS GO!")
game.splash(info.highScore(), "BEAT THIS!")
PLAYERSPRITE = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(PLAYERSPRITE)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(PLAYERSPRITE, 0, 10)
statusbar.setColor(9, 8)
statusbar.setBarBorder(1, 15)
statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
statusbar2.attachToSprite(PLAYERSPRITE, 0, -10)
statusbar2.setColor(7, 6)
statusbar2.setBarBorder(1, 15)
tiles.setTilemap(tilemap`level1`)
scene.cameraFollowSprite(PLAYERSPRITE)
scene.setBackgroundColor(7)
for (let index = 0; index < 10; index++) {
    Enemysprite1 = sprites.create(assets.image`Ghost`, SpriteKind.Enemy)
    Enemysprite1.setPosition(randint(25, 500), randint(25, 500))
    Enemysprite1.follow(PLAYERSPRITE, 25)
}
forever(function () {
    info.changeScoreBy(100)
    pause(2000)
})
forever(function () {
    statusbar2.value += 5
    pause(700)
})
forever(function () {
    statusbar.value += 5
    pause(500)
})
forever(function () {
    music.playMelody("C5 G C5 A E D F B ", 120)
})
