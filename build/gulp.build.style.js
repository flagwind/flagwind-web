const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const less = require("gulp-less");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

// 编译 less
gulp.task("css", function()
{
    gulp.src("../src/styles/index.less")
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "ie > 8"]
        }))
        .pipe(cleanCSS())
        .pipe(rename("flagwind.css"))
        .pipe(gulp.dest("../dist/styles"));
});

// 拷贝字体文件
gulp.task("fonts", function ()
{
    // 拷贝 iview 使用的字体文件
    gulp.src("../src/styles/iview/common/iconfont/fonts/*.*")
        .pipe(gulp.dest("../dist/styles/fonts"));
});

gulp.task("default", ["css", "fonts"]);
