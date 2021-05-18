import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import twig from 'gulp-twig';
import uglifyJs from 'gulp-uglifyjs';
import babelify from 'babelify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import source from 'vinyl-source-stream';
import plumber from 'gulp-plumber';
import cleanCss from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';

import { dict, navigation } from './src/config';


gulp.task('sass', () => gulp
  .src('src/scss/**/*.scss')
  .pipe(plumber({
    errorHandler: (err) => {
      notify.onError({
        sound: false,
        title: 'SCSS',
        message: err.toString(),
      })(err);
    },
  }))
  .pipe(sass.sync({
    includePaths: [
      'node_modules/bootstrap/scss',
      'src/img',
    ],
    outputStyle: 'compressed',
    errLogToConsole: true,
  }))
  .pipe(autoprefixer([
    'last 2 versions',
    'IE 10',
  ], {
    cascade: true,
  }))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({
    stream: true,
  })));


gulp.task('js', () => browserify({
  entries: ['src/js/index.js'],
  debug: true,
})
  .transform(babelify.configure({
    presets: ['es2015'],
    sourceMapsAbsolute: true,
  }))
  .bundle()
  .on('error', function log(err) {
    notify.onError({
      sound: false,
      title: 'JS',
      message: err.message,
    })(err);

    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('src/scripts'))
  .pipe(browserSync.reload({
    stream: true,
  })));


gulp.task('browser-sync', () => {
  browserSync({
    open: 'external',
    server: {
      baseDir: [
        'src/lang',
        'src/templates',
        'src',
      ],
    },
    browser: 'google chrome',
  });
});


gulp.task('twig', () => gulp.src('src/**/*.twig')
  .pipe(twig({
    data: {
      dict,
      navigation,
    },
    useFileContents: true,
  }))
  .pipe(gulp.dest('src')));


gulp.task('clean', () => del.sync('dist'));


gulp.task('build', ['clean'], () => {
  gulp.src('src/css/main.css')
    .pipe(cleanCss({ compatibility: 'ie11' }))
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  gulp.src('src/scripts/**/*')
    .pipe(uglifyJs())
    .pipe(gulp.dest('dist/scripts'));

  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

  gulp.src(['src/*.html', 'src/lang/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', ['twig', 'js', 'sass', 'browser-sync'], () => {
  gulp.watch('src/**/**/*.twig', ['twig']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/**/*.html', browserSync.reload);
});


gulp.task('default', ['watch']);
