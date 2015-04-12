'use strict';

angular.module('friendlyView')
  .controller('MainCtrl', function ($scope, Restangular) {
    // First way of creating a Restangular object by saying the base URL
    var baseEntries = Restangular.all('history');

    // This will query all entries and return a promise.
    baseEntries.getList().then(function(entries) {
      var aggregates = _.reduce(entries, function (agg, value) {
        var hourMoment = moment(new Date(value.stamp)).startOf('hour');
        var hourDate = hourMoment.toDate();
        if (!!agg[hourDate]) {
          agg[hourDate].y++;
        } else {
          agg[hourDate] = {x: hourDate, y: 1};
        }

        return agg;
      }, {});

      $scope.data = [{
        key: 'Visits/hour',
        values: _.sortBy(_.toArray(aggregates), function (kv) { return kv.x })
      }];
    });

    $scope.options = {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 45
        },
        clipEdge: false,
        staggerLabels: true,
        transitionDuration: 500,
        stacked: true,
        xAxis: {
          axisLabel: 'Time (hour)',
          showMaxMin: false,
          tickFormat: function (d) {
            return d3.time.format('%I%p %Y-%m-%d')(d);
          }
        },
        yAxis: {
          axisLabel: 'Visits',
          axisLabelDistance: 100,
          tickFormat: function (d) {
            return d3.format(',.0f')(d);
          }
        }
      }
    };

    $scope.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Sass (Ruby)',
        'url': 'http://sass-lang.com/',
        'description': 'Original Syntactically Awesome StyleSheets implemented in Ruby',
        'logo': 'ruby-sass.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function (awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
