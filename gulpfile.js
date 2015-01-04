'use strict';

var gulp = require('gulp');

gulp.task('release', function () {
    var NwBuilder = require('node-webkit-builder');
    var nw = new NwBuilder({
        files: ['./css/**/*.*', './fonts/**/*.*', './img/**/*.*', './js/**/*.*', './node_modules/**/*.*', './index.html', './package.json'],
        version: 'v0.11.4',
        macZip: true,
        platforms: ['osx32', 'osx64', 'win32', 'win64']
    });

    nw.build().then(function () {
        console.log('all done!');
    }).catch(function (error) {
        console.error(error);
    });
});