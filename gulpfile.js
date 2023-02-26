/** @format */

const gulp = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const bsServer = require("browser-sync").create();
const { series, src, watch, dest, parallel } = gulp;
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const csso = require("gulp-csso");
const shorthand = require("gulp-shorthand");
const gcmq = require("gulp-group-css-media-queries");

const path = {
  dist: {
    js: "./dist/scripts/",
    css: "./dist/styles/",
    img: "./dist/images/",
  },

  src: {
    js: "./src/js/**/*.js",
    css: "./src/scss/styles.scss",
    img: "./src/img/**/*.{jpg,jpeg,png,svg,webp}",
  },

  watch: {
    js: "./src/js/**/*.js",
    css: "./src/scss/**/*.scss",
    img: "./src/img/**/*.{jpg,jpeg,png,svg,webp}",
    html: "./index.html",
  },
  clean: {
    dist: "./dist/**/*",
  },
};

const serve = () => {
  bsServer.init({
    server: {
      baseDir: "./",
      browser: "google chrome",
    },
  });
};

const clean = (cb) => {
  del(path.clean.dist);
  cb();
};

const styleCss = (cb) => {
  src(path.src.css)
    .pipe(gulpSass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
      })
    )
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(csso())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path.dist.css))
    .pipe(bsServer.reload({ stream: true }));
  cb();
};

const styleJs = (cb) => {
  src(path.src.js)
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path.dist.js))
    .pipe(bsServer.reload({ stream: true }));
  cb();
};

const images = (cb) => {
  src(path.src.img)
    .pipe(imagemin())
    .pipe(dest(path.dist.img))
    .pipe(bsServer.reload({ stream: true }));
  cb();
};

const watcher = () => {
  watch(path.watch.css, styleCss);
  watch(path.watch.js, styleJs);
  watch(path.watch.img, images);
  watch(path.watch.html).on("change", bsServer.reload);
};

exports.style = styleCss;
exports.clean = clean;
exports.serve = serve;
exports.watcher = watcher;
exports.styleJs = styleJs;
exports.images = images;

exports.build = series(clean, images, styleCss, styleJs);

exports.dev = series(
  (clean, images),
  series(styleCss, styleJs),
  parallel(serve, watcher)
);
exports.default = series(
  (clean, images),
  series(styleCss, styleJs),
  parallel(serve, watcher)
);
