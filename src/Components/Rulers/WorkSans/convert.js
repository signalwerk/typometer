// In Node.js:
var fs = require("fs");

const convert = filename => {
  const from = require("path").join(__dirname, `./ttf/${filename}.ttf`);
  const to = require("path").join(__dirname, `./js/${filename}.js`);

  var base64 = fs.readFileSync(from, "base64");
  fs.writeFileSync(
    to,
    'var dataString = "' + base64 + '"; export default dataString'
  );
};

convert("WorkSans-Black");
convert("WorkSans-Bold");
convert("WorkSans-ExtraBold");
convert("WorkSans-ExtraLight");
convert("WorkSans-Light");
convert("WorkSans-Medium");
convert("WorkSans-Regular");
convert("WorkSans-SemiBold");
convert("WorkSans-Thin");
