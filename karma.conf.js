module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.js',
      'app/bower_components/angular-selectize2/dist/angular-selectize.js',
      'app/main.js',
      'app/stateMock.js',
      'app/partials/*.html',
      'app/components/**/*.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // generate js files from html templates to expose them during testing.
    preprocessors: {
      'app/partials/*.html': ['ng-html2js'] 
    },

    // ngHtml2JsPreprocessor: { 
    //   moduleName: 'templates',
    //   stripPrefix: 'app/'
    // },

  });
};
