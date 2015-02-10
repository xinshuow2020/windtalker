'use strict';

var gulp = require('gulp');
var os = require('os');

var SYSTEMS = {
    darwin: 'osx',
    win32: 'win'
};

gulp.task('less', function() {
    var less = require('gulp-less');
    var prefix = require('gulp-autoprefixer');
    var sourcemap = require('gulp-sourcemaps');
    return gulp.src('src/less/main.less')
        .pipe(sourcemap.init())
        .pipe(less({
            compress: false
        }))
        .pipe(sourcemap.write())
        .pipe(prefix({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('install', function() {
    var install = require('gulp-install');
    return gulp.src(['./bower.json', './src/package.json'])
        .pipe(install());
});

gulp.task('release', ['less', 'install'], function() {
    var NwBuilder = require('node-webkit-builder');
    var nw = new NwBuilder({
        files: ['./src/css/**/*.*', './src/fonts/**/*.*', './src/img/**/*.*', './src/js/**/*.*', './src/node_modules/**/*.*', './src/index.html', './src/package.json'],
        version: 'v0.11.6',
        macZip: true,
        platforms: [SYSTEMS[os.platform()] + os.arch().substring(1)]
            // platforms: ['osx32', 'osx64', 'win32', 'win64']
    });

    nw.build().then(function() {
        console.log('all done!');
    }).catch(function(error) {
        console.error(error);
    });
});
