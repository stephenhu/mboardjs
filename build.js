const fs    = require("fs");
const path  = require("path");
const pug   = require("pug");
const site  = require("./site.json");

const buildDir  = "build";
const htmlExt   = ".html";
const pugExt    = ".pug";


function toHtml(filename) {

  var str = filename.replace(pugExt, "");

  return `${buildDir}/${str}${htmlExt}`;

} // toHtml


function getDirs(dir) {
  return path.dirname(dir).split("/");
} // getDirs


function checkBuildDir() {

  if(!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

} // checkBuildDir


function checkDirs(dir) {

  var dirs = getDirs(dir);

  var str = "";

  for(var i = 0; i < dirs.length; i++) {

    var a = path.join(str, dirs[i]);

    if(!fs.existsSync(a)) {
      fs.mkdirSync(a);
    }

    str = path.join(str, dirs[i]);

  }

} // checkDirs


function cp(src, dest) {

  checkDirs(dest);

  fs.copyFile(src, dest, (err) => {
    if(err) {
      console.log(err);
    }
  });

} // cp


// compile templates

for(var i = 0; i < site.pages.length; i++) {

  checkBuildDir();

  const fn = pug.compileFile(path.join("src", site.pages[i]));

  console.log(toHtml(site.pages[i]));
  fs.writeFile(toHtml(site.pages[i]), fn(), (err) => {
    if(err) {
      console.log(err);
    }
  });

}

// copy assets

cp("node_modules/bootstrap/dist/css/bootstrap.min.css", "build/bootstrap/css/bootstrap.min.css");
cp("node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css", "build/fontawesome/css/fontawesome.min.css");
cp("node_modules/@fortawesome/fontawesome-free/css/all.min.css", "build/fontawesome/css/all.min.css");
cp("src/css/mboard.css", "build/css/mboard.css");
cp("src/js/mboard.js", "build/js/mboard.js");

