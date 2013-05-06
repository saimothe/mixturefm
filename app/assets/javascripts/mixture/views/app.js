Mixture.Views.App = Mixture.View.extend({
	template: JST['mixture/templates/app'](),

	initialize: function(options) {
		_.bindAll(this, 'render', 'onAuthenticated','onDeuthenticated', 'toTop', 'showToTop');
		this.headerView = new Mixture.Views.Header();

		this.playerView = new Mixture.Views.Player({
			model: Mixture.player
		});

		this.primaryNavView = new Mixture.Views.PrimaryNav({
			navCollection: options.navCollection
		});

		Mixture.user.on('authenticated', this.onAuthenticated);
		Mixture.user.on('deauthenticated', this.onAuthenticated);
	},

	render: function() {
		var html = Mustache.render(this.template, {});
		this.$el.html(html);

		// have to set el right here. Because the above call puts it in the DOM
		this.playerView.setElement( this.$('.player-wrapper') );
		this.renderChild(this.playerView);

		this.headerView.setElement( this.$('#header') );
		this.renderChild(this.headerView);

		this.primaryNavView.setElement( this.$('aside.left-c') );
		this.renderChild(this.primaryNavView);

		this.$('#toTop').click(this.toTop);
		$(window).scroll(_.throttle(this.showToTop, 100));

		return this;
	},

	onAuthenticated: function(user) {
		$('#mixture').addClass('authenticated');
	},

	onDeuthenticated: function(user) {
		$('#mixture').removeClass('authenticated');
	},

	toTop: function(evt) {
		evt.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 1200);

		return false;
	},

	showToTop: function() {
		if ( $(window).scrollTop() >= 700 ) {
			this.$('#toTop').fadeIn();
		} else if (this.$('#toTop').is(':visible')) {
			this.$('#toTop').fadeOut('fast');
		}
	}
});