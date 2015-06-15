QueryBase.Models.Badge = Backbone.Model.extend({

  urlRoot: 'api/badges',

  // parse: function (response) {
  //   if (response.earned_badge) {
  //     this.earned().set(response.earned_badge);
  //     delete response.earned_badge;
  //   }
  //
  //   return response;
  // },
  //
  // earned: function () {
  //   if (!this._earned_badge) {
  //     this._earned_badge = new QueryBase.Models.Badge([], { badge: this });
  //   }
  //
  //   return this._earned_badge;
  // }

});
