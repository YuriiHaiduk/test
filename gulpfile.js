var gulp         = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	del = require('del'), // удаление build
	imagemin = require("gulp-imagemin"), // Сжатие фото
	imageminJpegRecompress = require('imagemin-jpeg-recompress'), // Сжатие фото
	pngquant = require('imagemin-pngquant'), // Сжатие фото
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

//-------------------------------------------SCSS----------------------------------------------

gulp.task('scss', function() { // Создаем таск scss
	return gulp.src('www/scss/style.scss') // Берем источник
		.pipe(scss()) // Преобразуем scss в CSS посредством gulp-scss
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('www/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

//-------------------------------------------JS----------------------------------------------

gulp.task('scriptrel', function() {
	return gulp.src('www/js/**/*.js')
		.pipe(browserSync.reload({ stream: true }))
});

//-------------------------------------------BROWSER----------------------------------------------

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'www' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('code', function() {
	return gulp.src('www/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('watch', function() {
	gulp.watch('www/scss/**/*.scss', gulp.parallel('scss')); // Наблюдение за scss файлами
	gulp.watch('www/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('www/js/**/*.js', gulp.parallel('scriptrel')); // Наблюдение за главным JS файлом и за библиотеками
});

//-------------------------------------------all command----------------------------------------------

gulp.task('default', gulp.parallel('scss', 'scriptrel', 'browser-sync', 'watch'));






gulp.task('html', function () {
  return gulp.src('www/*.html')
      .pipe(gulp.dest('build'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src('www/js/**/*.js')
      .pipe(gulp.dest('build/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src('css/**/*.css')
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('allimg', function () {
  return gulp.src('www/img/**/*.{png,jpg}')
      .pipe(gulp.dest('build/img'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('copy', function () {
  return gulp.src([
      'www/img/**',
      'www/js/**',
      'www/css/**',
      'www/*.html'
  ], {
    base: '.'
  })
      .pipe(gulp.dest('build'));

});

gulp.task('clean', function () {
  return del('build');
});


gulp.task('images', function () {
  return gulp.src('www/img/**/*.{png,jpg}')
      .pipe(imagemin([
          imagemin.jpegtran({progressive: true}),
          imageminJpegRecompress({
            loops: 5,
            min: 65,
            max: 70,
            quality: [0.7, 0.8]
          }),
          // imagemin.optipng({optimizationLevel: 3}),
          pngquant({quality: [0.7, 0.8], speed: 5})
      ]))
      .pipe(gulp.dest('build/www/img'));
});

gulp.task('build', gulp.parallel('scss', 'clean', 'copy','images'));
