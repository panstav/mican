const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const _ = require('lodash');
const guid = require('random-guid');

const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';
const randomHash = guid.randomString().substr(0, 10);

gulp.task('clean', () => {

	const publicFiles = [
		'!public/.gitignore', 'public/*'
	];

	return gulp.src(publicFiles, { read: false })
		.pipe(plugins.clean({ force: true }));

});

gulp.task('svg', () => {

	// copy pastes
	return gulp.src('client/static/svg/*')
		.pipe(gulp.dest('public/svg'));

});

gulp.task('static', ['svg'], () => {

	const sourcePaths = [
		'client/static/zepto.min.js',
		'node_modules/tachyons/css/tachyons.min.css'
	];

	// copy pastes
	return gulp.src(sourcePaths)
		.pipe(gulp.dest('public'));

});

gulp.task('css', () => {

	const sassOptions = isProduction
		? { outputStyle: 'compressed' }
		: { outputStyle: 'nested', errLogToConsole: true, sourceComments : 'normal' };

	return gulp.src('client/index.sass')
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.autoprefixer({ browsers: ['> 1%', 'ie > 8'] }))
		.pipe(plugins.rename({ basename: isProduction ? `${randomHash}.min` : 'styles' }))
		.pipe(gulp.dest('public'));

});

gulp.task('javascript', () => {

	return gulp.src('client/index.js')
		.pipe(plugins.browserify())
		.pipe(plugins.babel({ presets: ['es2015'] }))
		.pipe(plugins.if(isProduction, plugins.uglify()))
		.pipe(plugins.rename({ basename: isProduction ? `${randomHash}.min` : 'scripts' }))
		.pipe(gulp.dest('public'));

});

gulp.task('html', () => {

	return gulp.src('client/pages/homepage/homepage.pug')
		.pipe(plugins.pug({ locals: _.extend({randomHash, production:isProduction}, config), pretty: !isProduction }))
		.pipe(plugins.rename({ dirname: 'pages' }))
		.pipe(plugins.if(isProduction, plugins.htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest('public'));

});

gulp.task('build', plugins.sequence('clean', 'static', 'css', 'javascript', 'html'));

gulp.task('watch', () => {
	gulp.watch('client/**/*.*', ['css', 'javascript', 'html']);
});