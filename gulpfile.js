var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn = require('opn');
var responsive = require('gulp-responsive');

gulp.task('images', function() {
    return gulp.src('src/img/**/*.{png,jpg}')
        .pipe(responsive({
            '*.{jpg,png}': [{
                width: 250,
                quality: 40,
                rename: {
                    suffix: '-small'
                }
            }, {
                width: 250 * 2,
                quality: 40,
                rename: {
                    suffix: '-small@2x'
                }
            },{
                width: 600,
                quality: 50,
                rename: {
                    suffix: '-medium'
                }
            }, {
                width: 600 * 2,
                quality: 50,
                rename: {
                    suffix: '-medium@2x'
                }
            },{
                width: 825,
                quality: 90,
                rename: {
                    suffix: '-large'
                }
            }, {
                width: 825 * 2,
                quality: 90,
                rename: {
                    suffix: '-large@2x'
                }
            }],
			'smalls/*.{png,jpg}': [{
                width: 250,
                quality: 50,
                rename: {
                    suffix: '-small'
                }
            }, {
                width: 250 * 2,
                quality: 50,
                rename: {
                    suffix: '-small@2x'
                }
            }]
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
			compressionLevel: 9,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        })).pipe(gulp.dest('img'));
});

var sourcePaths = {
    styles: ['scss/**/*.scss'],
	js: ['js/**/*.js'],
    views: ['**/*.html']
};

var distPaths = {
    styles: 'css'
};

var server = {
    host: 'localhost',
    port: '3333'
};

gulp.task('sass', function() {
    gulp.src(sourcePaths.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(distPaths.styles));
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true,
            directoryListing: false
        }));
});

gulp.task('openbrowser', function() {
    opn('http://' + server.host + ':' + server.port);
});

gulp.task('watch', function() {
    gulp.watch(sourcePaths.styles, ['sass']);
	gulp.watch(sourcePaths.js);
    gulp.watch(sourcePaths.views);
});

gulp.task('build', ['sass', 'images']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
