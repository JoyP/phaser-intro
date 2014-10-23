var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload(){
  game.load.image('thorn', '/img/thorn_lazur.png');
  game.load.image('space', '/img/nova-20years-exile.png');
  game.load.image('bear', '/img/profil-sad_plush.png');
  game.load.atlasJSONHash('bot', '/img/running_bot.png', '/img/running_bot.json')
}

var s1, s2, s3;
function create(){

  game.physics.startSystem(Phaser.Physics.ARCADE);

  s1 = game.add.sprite(350, 30, 'thorn');
  s1.scale.setTo(.7);
  s2 = game.add.sprite(20, 30, 'space');
  s3 = game.add.sprite(20, 30, 'bear');
  s3.anchor.set(0.5);
  s3.scale.setTo(0.5);


  game.physics.enable(s1, Phaser.Physics.ARCADE);
  game.physics.enable(s2, Phaser.Physics.ARCADE);
  game.physics.enable(s3, Phaser.Physics.ARCADE);

  s1.body.velocity.x = 50;
  s2.body.velocity.y = 40;
//  s3.body.velocity.x = 20;
//  s3.body.velocity.y = 20;


  // TEXT
  var text = "- phaser -\n with a sprinkle of \n pixi dust.";
  var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

  var t = game.add.text(game.world.centerX-300, 0, text, style);


  // TWEEN
  var tween = game.add.tween(s2);

  //  The object defines the properties to tween.
  //  In this case it will move to x 600
  //  The 6000 is the duration in ms - 6000ms = 6 seconds
  tween.to({ x: 1500 , y: 800}, 7000);

  //  And this starts it going
  tween.start();

  //  This sprite is using a texture atlas for all of its animation data
  var bot = game.add.sprite(1000, 500, 'bot');

  //  Here we add a new animation called 'run'
  //  We haven't specified any frames because it's using every frame in the texture atlas
  bot.animations.add('run');

  //  And this starts the animation playing by using its key ("run")
  //  15 is the frame rate (15fps)
  //  true means it will loop when it finishes
  bot.animations.play('run', 14, true);
  var tween = game.add.tween(bot);
  tween.to({ x: 0}, 5500);
  tween.start();
}

function update(){
  if (game.physics.arcade.distanceToPointer(s3, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(s3, 500);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        s3.body.velocity.set(0);
    }
}
