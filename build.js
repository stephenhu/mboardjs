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


function getDirs(dir, isDir) {

  if(isDir) {

    var ret = path.dirname(dir).split("/");

    ret.push(path.basename(dir));

    return ret;

  } else {
    return path.dirname(dir).split("/");
  }

} // getDirs


function checkBuildDir() {

  if(!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

} // checkBuildDir


function checkDirs(dir, isDir) {

  var dirs = getDirs(dir, isDir);

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


function cpa(src, dest) {

  if(fs.lstatSync(src).isDirectory()) {

    checkDirs(dest, true);

    const files = fs.readdirSync(src);

    files.forEach(file => {

      fs.copyFile(path.join(src, file), path.join(dest, file), (err) => {
        if(err) {
          console.log(err);
        }
      });

    });

  } else {
    console.log("Please call cp() instead to copy files, cpa() is used to copy directory contents.");
  }

} // cpa


// compile templates

for(var i = 0; i < site.pages.length; i++) {

  checkBuildDir();
  checkDirs(path.join(buildDir, site.pages[i]), false);

  const fn = pug.compileFile(path.join("src", site.pages[i]));

  console.log(toHtml(site.pages[i]));
  fs.writeFile(toHtml(site.pages[i]), fn(), (err) => {
    if(err) {
      console.log(err);
    }
  });

}

// copy assets

cp("node_modules/bootstrap/dist/css/bootstrap.min.css",
  "build/bootstrap/css/bootstrap.min.css");

cp("node_modules/bootstrap/dist/css/bootstrap.min.css.map",
  "build/bootstrap/css/bootstrap.min.css.map");

cp("node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css",
  "build/fontawesome/css/fontawesome.min.css");

cp("node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "build/fontawesome/css/all.min.css");

cpa("node_modules/@fortawesome/fontawesome-free/webfonts",
  "build/fontawesome/webfonts");

cp("src/css/mboard.css", "build/css/mboard.css");

cp("src/js/mboard.js", "build/js/mboard.js");

