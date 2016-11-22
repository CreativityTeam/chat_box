var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

var productionBuild = './client/production/';
gulp.task('connect',function(){
    connect.server({
        port : '3000',
        root : 'client',
        livereload : true
    });
});

gulp.task('html',function(){
    gulp.src('./client/build/**/*.jade')
        .pipe(jade({
            pretty : true,
            doctype: 'html'
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest(productionBuild))
});

gulp.task('css',function(){
    gulp.src('./client/build/**/*.scss')
        .pipe(sass({
            style : 'expanded'
        }))
        .pipe(connect.reload())
        .pipe(gulp.dest(productionBuild))
});

gulp.task('watch',function(){
    gulp.watch(['./client/build/**/*.jade'],['html']);
    gulp.watch(['./client/build/css/*.scss'],['css']);
});

gulp.task('default',['html','css','connect','watch']);