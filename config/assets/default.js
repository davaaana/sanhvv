'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
        'public/lib/angular-block-ui/dist/angular-block-ui.min.css',
        'public/lib/angular-bootstrap3-datepicker/dist/ng-bs3-datepicker.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
          'public/lib/angular-bootstrap/ui-bootstrap.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',

        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-block-ui/dist/angular-block-ui.min.js',
        'public/lib/jquery/dist/jquery.min.js'

      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'public/modules/*/css/*.css'
    ],
    less: [
      'public/modules/*/less/*.less'
    ],
    sass: [
      'public/modules/*/scss/*.scss'
    ],
    js: [
      'public/modules/core/app/config.js',
      'public/modules/core/app/init.js',
      'public/modules/*/*.js',
      'public/modules/**/*.js'
    ],
    views: ['public/modules/*/views/**/*.html']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'app/**/*.js'],
    models: ['app/model/*.js'],
    routes: ['app/route/*.server.routes.js','app/route/**.js'],
    config: ['config/users.server.config.js'],
    policies: ['app/policy/*.js'],
    views: 'app/view/*.html'
  }
};
