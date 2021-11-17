const {
    src, dest, watch, series, parallel,
} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

const path = {
    dest: {
        folder: './dist',
        css: './dist/css',
        js: './dist/js',
        img: './dist/img',
        html: './dist',
        font: './dist/font',
    },
    src: {
        folder: './src',
        scss: './src/scss',
        js: './src/js',
        img: './src/img',
        html: './src',
        font: './src/font',
    },
};

const buildTasks = {
    cleanTask: () => {
        return src(`${path.dest.folder}/*`)
            .pipe(clean());
    },
    scssTask: () => {
        return src(`${path.src.scss}/**/*.scss`)
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(dest(path.dest.css));
    },
    jsTask: () => {
        return src(`${path.src.js}/**/*.js`)
            .pipe(uglify())
            .pipe(dest(path.dest.js));
    },
    imgTask: () => {
        return src(`${path.src.img}/**/*`)
            .pipe(dest(path.dest.img));
    },
    htmlTask: () => {
        return src(`${path.src.html}/**/*.html`)
            .pipe(dest(path.dest.html));
    },
    fontTask: () => {
        return src(`${path.src.font}/**/*`)
            .pipe(dest(path.dest.font));
    },
};

const devTasks = {
    cleanTask: () => {
        return src(`${path.dest.folder}/*`)
            .pipe(clean());
    },
    scssTask: () => {
        return src(`${path.src.scss}/**/*.scss`)
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(dest(path.dest.css));
    },
    jsTask: () => {
        return src(`${path.src.js}/**/*.js`)
            .pipe(dest(path.dest.js));
    },
    imgTask: () => {
        return src(`${path.src.img}/**/*`)
            .pipe(dest(path.dest.img));
    },
    htmlTask: () => {
        return src(`${path.src.html}/**/*.html`)
            .pipe(dest(path.dest.html));
    },
    fontTask: () => {
        return src(`${path.src.font}/**/*`)
            .pipe(dest(path.dest.font));
    },
    browserSyncTask: (done) => {
        browserSync.reload();
        done();
    },
};

const dev = () => {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
    });
    watch(
        [
            `${path.src.scss}/**/*.scss`,
            `${path.src.js}/**/*.js`,
            `${path.src.html}/*.html`,
        ],
        { ignoreInitial: true },
        series(
            devTasks.cleanTask,
            parallel(
                devTasks.scssTask,
                devTasks.jsTask,
                devTasks.imgTask,
                devTasks.htmlTask,
                devTasks.fontTask,
            ),
            devTasks.browserSyncTask,
        ),
    );
};

exports.dev = dev;
exports.build = series(
    buildTasks.cleanTask,
    parallel(
        buildTasks.scssTask,
        buildTasks.jsTask,
        buildTasks.imgTask,
        buildTasks.htmlTask,
        buildTasks.fontTask,
    ),
);
