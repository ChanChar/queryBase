window.QueryBase = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new QueryBase.Routers.Router({ $rootEl: $('#main') });
    var navbarView = new QueryBase.Views.NavBar({
      router: router
    });
    
    $('#navbar').html(navbarView.render().$el);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  QueryBase.initialize();
});
