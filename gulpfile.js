const gulpConst = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulpConst.src('./source/images/*') 
        .pipe(imagemin())
        .pipe(gulpConst.dest('./build/images')); 
}

function comprimeJS() {
    return gulpConst.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulpConst.dest('./build/scripts'))
}

function compilaSass() {
    return gulpConst.src('./source/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulpConst.dest('./build/style'));
}

function funcaoPadrao(callback) {
    parabens();
    callback();
}

function parabens(callback) {
    console.log('Parabens, funcionando');
}

function grato(callback) {
    console.log('Obrigado por utilizar');
    callback();
}

exports.default = gulpConst.series(compilaSass, funcaoPadrao, grato);
exports.grato = grato;
exports.sass = compilaSass;
exports.watch = function () {
    gulpConst.watch('./source/*.scss', { ignoreInitial: false }, gulpConst.series(compilaSass));
}
exports.javascript = comprimeJS;
exports.images = comprimeImagens;