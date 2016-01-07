'use strict';

/**
 * Add the AddThis social sharing tool to your site.
 * 
 * Initialise by calling:
 * addThisProvider.setId('YOUR_ADDTHIS_ID');
 * 
 * @ngdoc directive
 * @name angularAddthisApp.directive:addThis
 * @description
 * # addThis
 */
angular.module('sko.addThis', ['sko.jquery'])
  .provider('addThis', function () {

    var loaded = false,
        id = null;

    this.setId = function(i) {
      id = i;
    };

    // Method for instantiating
    this.$get = function ($timeout, $window, $log, $) {
      if ( !id ) {
        $log.warn('please set the AddThis ID via the addThisProvider');
        return;
      }
      // Load the script
      $.getScript( '//s7.addthis.com/js/300/addthis_widget.js?pubid='+id, function(/* data, textStatus, jqxhr */) {
        loaded = true;
        refresh();
      });

      var refresh = function() {
        if ( !loaded ) { return; }
        // See: http://support.addthis.com/customer/portal/articles/1692927-using-dashboard-configuration-tools-dynamically
        $timeout($window.addthis.layers.refresh);
      };

      return {
        refresh: refresh,
      };
    };
  })
  /**
   * Insert the tool by using this element directive. The refresh attribute lets it
   * update itself in response to (asyncronous) changes.
   */
  .directive('addThis', function (addThis) {
    return {
      template: '<div class="addthis_sharing_toolbox"></div>',
      restrict: 'E',
      replace: true,
      scope: {
        refresh: '@',
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('refresh', function() {
          addThis.refresh();
        });
      }
    };
  });
