var fs = require('fs'),
    Canvas = require('canvas'),
    createRenderer = require('./createRenderer'),
    Image = Canvas.Image;

module.exports = function createSyncFileRenderer(opt) {
  var canvas    = new Canvas(opt.width * opt.pixelRatio, opt.height * opt.pixelRatio),
      context   = canvas.getContext('2d'),
      buffer    = fs.readFileSync(opt.backgroundSrc),
      bgImg     = new Image,
      interval  = opt.interval || 0.0001,
      steps     = opt.steps || 50,
      output    = opt.output || "output/" + opt.seedName + ".png"

  bgImg.src = buffer
  opt.backgroundImage = bgImg
  opt.context = context

  var renderer = createRenderer(opt)

  renderer.clear()
  for (var i = 0; i < steps; i++) {
    process.stdout.write("Step " + (i + 1) + " of " + steps + "\r");
    renderer.step(interval)
  }

  fs.writeFileSync(output, canvas.toBuffer());
}
