window.Guest = {
  initialize: function(){
  		$(".guest-button").on( "click", this.guestLogin.bind(this) );
  	},

	guestLogin: function(){
		var that = this;
		$email = $('#email');
		$password = $('#password');
		$signinButton = $('#signin-button');

    $email.val('');
    $password.val('');

		this.fillForm($email, 'curiousgeorge@monkey.com', function(){
			that.fillForm($password, 'banana', function(){
				$signinButton.click();
			});
		});
	},

	fillForm: function($el, word, callback){

		var typing = setInterval(function(){
			$el.val( $el.val() + word.slice(0, 1) );
			word = word.substr(1);

			if (!word){
				clearInterval(typing);
				callback();
			}
		}, 45);
	}
};
