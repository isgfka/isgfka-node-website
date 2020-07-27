'use strict';
const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
// const { isType } = require('./app/util/type');

function log (message) {
  console.log('[' + new Date().toString().split(' ')[4].gray + '] ' + message);
}

const PATH_VARS = {
  src: {
    baseDir: 'src',
    style: 'src/**/*.scss',
    javascript: 'src/**/*.js',
    static: 'src/**/img/**/*.*'
  },
  dist: {
    baseDir: 'public',
    style: 'public/**/*.css'
  }
};

const clean = () => del(PATH_VARS.dist.baseDir);

const sassCompile = () => {
  log('[sassCompile] compiling sass...');
  return gulp
    .src(PATH_VARS.src.style)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(file => {
      file.dirname = file.dirname.replace('/scss', '/css');
    }))
    .pipe(gulp.dest(PATH_VARS.dist.baseDir))
    .on('end', () => {
      log('[sassCompile] sass compiled successfully.');
    });
};

const jsCompile = () => {
  log('[jsCompile] compiling javascript...');
  return gulp
    .src(PATH_VARS.src.javascript)
    .pipe(debug({ title: 'info' }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(PATH_VARS.dist.baseDir))
    .on('end', () => {
      log('[jsCompile] javascript compiled successfully.');
    });
};

const compileSingleSass = file => {
  log('[buildSingleSass] compiling sass...');
  return gulp
    .src(file, { base: 'src' })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(file => {
      file.dirname = file.dirname.replace('/scss', '/css');
    }))
    .pipe(gulp.dest(PATH_VARS.dist.baseDir))
    .on('end', () => {
      log('[compileSingleSass] sass compiled successfully.');
    });
};

const compileSingleJs = file => {
  log('[compileSingleJs] compiling javascript...');
  return gulp
    .src(file, { base: 'src' })
    .pipe(debug({ title: 'info' }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(PATH_VARS.dist.baseDir))
    .on('end', () => {
      log('[compileSingleJs] javascript compiled successfully.');
    });
};

const copyFile = () => {
  return gulp
    .src(PATH_VARS.src.static)
    .pipe(gulp.dest(PATH_VARS.dist.baseDir));
};

const browsersync = (cb) => {
  browserSync.init({
    proxy: 'http://localhost:5000',
    files: [
      'public/**/*.*',
      'views/**/*.*'
    ],
    browser: 'google chrome',
    port: 7000,
    open: false
  });
  cb();
};

const watchHandler = (type, file) => {
  const extname = path.extname(file);
  if (extname === '.js') {
    if (type === 'add' || type === 'changed') {
      compileSingleJs(file);
    }
  }
  if (extname === '.scss') {
    if (type === 'add' || type === 'changed') {
      compileSingleSass(file);
    }
    if (type === 'removed') {
      // todo remove
    } else {
    }
  }
};

const watch = () => {
  const watcher = gulp.watch([PATH_VARS.src.baseDir], { ignored: /[/\\]\./ });
  watcher
    .on('change', file => {
      log('[file changed] ' + gutil.colors.cyan(file));
      watchHandler('changed', file);
    })
    .on('add', function (file) {
      log('[file added] ' + gutil.colors.yellow(file));
      watchHandler('add', file);
    })
    .on('unlink', function (file) {
      log('[file deleted] ' + gutil.colors.red(file));
      watchHandler('removed', file);
    });
};

const nodeMonitor = (cb) => {
  var started = false;
  return nodemon({
    script: 'app.js',
    args: ['prod']
  }).on('start', function () {
  // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      started = true;
      setTimeout(() => {
        cb();
      }, 2000);
    } else {
      setTimeout(() => {
        browserSync.reload();
      }, 1000);
    }
  });
};

gulp.task('dev', gulp.series(clean, sassCompile, jsCompile, copyFile, nodeMonitor, browsersync, watch));

gulp.task('build', gulp.series(clean, sassCompile, jsCompile, copyFile));
