window.QueryBase = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new QueryBase.Routers.Router({ $rootEl: $('#main') });
    var currentUser = new QueryBase.Models.User({ id: window.CURRENT_USER_ID });
    currentUser.fetch();
    var navbarView = new QueryBase.Views.NavBar({
      router: router, model: currentUser
    });

    $('#navbar').html(navbarView.render().$el);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  QueryBase.initialize();
});
