window.QueryBase = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new QueryBase.Routers.Router({
      $rootEl: $('#main')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  QueryBase.initialize();
});
