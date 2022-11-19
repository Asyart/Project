
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 4.5

//-----------------------------------class-------------------------------------------
class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150
        this.image6 = image6
        this.frames = 0
        this.sprite = {
            stand: {
                right: image6,
                left: image5,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: image8,
                left: image7,
                cropWidth: 341,
                width:127.875
            }
        }

        this.currentSprite = this.sprite.stand.right
        this.currentSpriteCropWidth = 177
    }

    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentSpriteCropWidth * this.frames,
            0,
            this.currentSpriteCropWidth,
            400,
            this.position.x,
            this.position.y, 
            this.width, 
            this.height
            )
    }

    update() {
        this.frames++
        if(this.frames > 59 && (this.currentSprite === this.sprite.stand.right 
            || this.currentSprite === this.sprite.stand.left)
            )
        this.frames = 0
        else if(this.frames > 29 && (this.currentSprite === this.sprite.run.right 
            || this.currentSprite === this.sprite.run.left)
            )
        this.frames = 0
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}
//--------------------------------------------class----------------------------------------
class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        image.addEventListener('load', () => {
            this.width = image.width;
            this.height = image.height;
        });

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        image.addEventListener('load', () => {
            this.width = image.width;
            this.height = image.height;
        });

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

//-----------------------------------------------------------
//objects for images
let image = new Image()
image.src = 'images/platform.png';

let image2 = new Image()
image2.src = 'images/hills.png';

let image3 = new Image()
image3.src = 'images/background.png';

let image4 = new Image()
image4.src = 'images/platformSmallTall.png';

let image5 = new Image()
image5.src = 'images/spriteStandLeft.png';

let image6 = new Image()
image6.src = 'images/spriteStandRight.png';

let image7 = new Image()
image7.src = 'images/spriteRunLeft.png';

let image8 = new Image()
image8.src = 'images/spriteRunRight.png';

//------------------------------------------------------------

//objects
let player = new Player();
let platforms = []

let genericObjects = [] // عندي مشكله هنا بالضبط لان الصور الان طريقة تخزينها عندي تختلف عن طريقة التوتريال

let lastKey
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffset = 0

//---------------------method for restart the game when lose constion acheived------------------
function init() {

//objects for images
image = new Image()
image.src = 'images/platform.png';

image2 = new Image()
image2.src = 'images/hills.png';

image3 = new Image()
image3.src = 'images/background.png';

image4 = new Image()
image4.src = 'images/platformSmallTall.png';

//objects
player = new Player();
 platforms = [
    new Platform({ x: 580 *4 +300 - 2 + 580 - 291, y: 270, image: image4 })
    ,
    new Platform({x: -1, y: 470, image})
    ,
    new Platform({ x: 580 - 2.5, y: 470, image })
    ,
    new Platform({ x: 580 *2 + 200, y: 470, image })
    ,
    new Platform({ x: 580 *3 + 350, y: 470, image })
    ,
    new Platform({ x: 580 *4 +300 - 2, y: 470, image })
    ,
    new Platform({ x: 580 *5 + 600 - 2, y: 470, image })
]

 genericObjects = [
    new GenericObject({x:-1, y:-1, image: image3})
,
    new GenericObject({x:-1, y:-1, image: image2})
] // عندي مشكله هنا بالضبط لان الصور الان طريقة تخزينها عندي تختلف عن طريقة التوتريال

 scrollOffset = 0

}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset == 0
    && player.position.x > 0) ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed

            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.66
            })

        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            platforms.forEach(platform => {
                platform.position.x += player.speed
            })

            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.66
            })
        }
    }


    //platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y +
            player.height + player.velocity.y >= platform.position.y && player.position.x + player.width
            >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

// Sprite switching !!

    if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprite.run.right)
    {
        player.frames = 1
        player.currentSprite = player.sprite.run.right
            player.currentSpriteCropWidth = player.sprite.run.cropWidth
            player.width = player.sprite.run.width
    } else if(keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprite.run.left){
        player.currentSprite = player.sprite.run.left
            player.currentSpriteCropWidth = player.sprite.run.cropWidth
            player.width = player.sprite.run.width
    } else if(!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprite.stand.left){
        player.currentSprite = player.sprite.stand.left
            player.currentSpriteCropWidth = player.sprite.stand.cropWidth
            player.width = player.sprite.stand.width
    } else if(!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprite.stand.right){
        player.currentSprite = player.sprite.stand.right
            player.currentSpriteCropWidth = player.sprite.stand.cropWidth
            player.width = player.sprite.stand.width
    } 

// win condition
    if (scrollOffset > 580 * 5 + 300 - 2) {
        window.open('https://tiny-faun-4a2ea5.netlify.app','_blank');
        console.log('you win')
    }

//lose condtion 
    if(player.position.y > canvas.height){
        init()
    }

}
//------------------calling methods for starting the game---------
init()
animate()

addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            lastKey = 'left'
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = true
            lastKey = 'right'
            break

        case 87:
            console.log('top')
            player.velocity.y -= 40
            break

    }

})

addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = false
            break

        case 87:
            console.log('top')
            break

    }
})