let project_folder = 'dist',
    sourse_folder = '#src',
    fs = require('fs'),
    path = {
        build: {
            html: project_folder + '/',
            css: project_folder + '/css/',
            js: project_folder + '/js/',
            img: project_folder + '/img/',
        },
        src: {
            html: [sourse_folder + '/*.html', '!' + sourse_folder + '/_*.html'],
            css: sourse_folder + '/scss/style.scss',
            js: sourse_folder + '/js/script.js',
            img: sourse_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)'
        },
        watch: {
            html: sourse_folder + '/**/*.html',
            css: sourse_folder + '/scss/**/*.scss',
            js: sourse_folder + '/js/**/*.js',
            img: sourse_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
        },
        clean: './' + project_folder + '/'
    }

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require("gulp-file-include"),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    svgSprite = require('gulp-svg-sprite');


function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
};
function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                cascade: true,
                overrideBrowserslist: ['last 5 versions']
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
};

browserSync = () => {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: true
    })
};
function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
};
function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
};

gulp.task('svgSprite', function () {
    return gulp.src([sourse_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '..icons.icons.svg',
                }
            }
        }))
        .pipe(dest(path.build.img))
})

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function cb() { }
let build = gulp.series(gulp.parallel(css, images, html, js))
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.html = html;
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;


