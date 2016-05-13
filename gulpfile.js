var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js/app.min.js'));
});

gulp.task('styles', function(){
	gulp.src('css/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('minCSS'));
});

gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('css/**/*.css', ['styles']);
});
