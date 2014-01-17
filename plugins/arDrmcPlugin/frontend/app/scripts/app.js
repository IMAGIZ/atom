'use strict';

/*
 * Module definition
 */

angular.module('momaApp.services', []);
angular.module('momaApp.directives', []);
angular.module('momaApp.controllers', []);
angular.module('momaApp', [

  // Dependencies
  'momaApp.services',
  'momaApp.directives',
  'momaApp.controllers',
  'ui.router',
  '$strap.directives'

]);


/*
 * Configuration constants
 */

angular.module('momaApp')
  .constant('ATOM_CONFIG', {

    // Base path, e.g. "/~user/atom"
    basePath: Qubit.relativeUrlRoot,

    // Frontend path, e.g. "/~user/atom/index.php"
    frontendPath: Qubit.frontend,

    // DRMC path, e.g. "/~user/atom/index.php/drmc"
    DRMCPath: Qubit.frontend + 'drmc/',

    // Views, assets, etc...
    viewsPath: Qubit.relativeUrlRoot + '/plugins/arDrmcPlugin/frontend/app/views',
    assetsPath: Qubit.relativeUrlRoot + '/plugins/arDrmcPlugin/frontend/assets'

  });


/*
 * Kickstart the application
 *
 * This is executed after all the services have been configured and the injector
 * has been created.
 */
angular.module('momaApp')
  .run(function($rootScope, $state, $stateParams, ATOM_CONFIG) {

    // Add references to $state and $stateParams to the $rootScope so we can
    // access from them from our entire application
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // Same here
    $rootScope.viewsPath = ATOM_CONFIG.viewsPath;
    $rootScope.assetsPath = ATOM_CONFIG.assetsPath;

  });


/*
 * Routing
 */

angular.module('momaApp')
  .config(function($locationProvider, $stateProvider, $urlRouterProvider, ATOM_CONFIG) {

    // Use HTML5 mode
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Default route
    $urlRouterProvider.otherwise(ATOM_CONFIG.DRMCPath + 'dashboard');

    // Define ui-router states
    $stateProvider

      // Dashboard
      .state('dashboard', {
        url: ATOM_CONFIG.DRMCPath + 'dashboard',
        controller: 'DashboardCtrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/dashboard.html'
      })

      // AIPs
      .state('aips', {
        abstract: true,
        url: ATOM_CONFIG.DRMCPath + 'aips',
        template: '<ui-view/>'
      })
      .state('aips.browser', {
        url: '',
        controller: 'AIPsBrowserCtrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/aips.browser.html'
      })
      .state('aips.view', {
        url: '/{aipId}',
        controller: 'AIPsViewCtrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/aips.view.html'
      })

      // Prototypes and tests
      .state('artwork-record', {
        url: ATOM_CONFIG.DRMCPath + 'artwork-record',
        controller: 'ArtworkRecordCtrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/artwork-record.html'
      })
      .state('artwork-record-2', {
        url: ATOM_CONFIG.DRMCPath + 'artwork-record-2',
        controller: 'ArtworkRecord2Ctrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/artwork-record-2.html'
      })
      .state('technology-record', {
        url: ATOM_CONFIG.DRMCPath + 'technology-record',
        controller: 'TechnologyRecordCtrl',
        templateUrl: ATOM_CONFIG.viewsPath + '/technology-record.html'
      });

  });
