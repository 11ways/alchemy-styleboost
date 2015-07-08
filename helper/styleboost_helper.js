module.exports = function styleboostHelpers(hawkejs) {
	return;
	// References
	var helpers = hawkejs.helpers,
	    sb      = helpers.sb = {};

	/**
	 * Create a bootstrap menu
	 *
	 * @author   Jelle De Loecker   <jelle@codedor.be>
	 * @since    0.0.1
	 * @version  0.0.1
	 *
	 * @param    {String}    menuName    The name of the menu to get
	 * @param    {Object}    options     Extra options
	 */
	sb.menu = function menu_get(modelName, options) {

		if (typeof options !== 'object') {
			options = {};
		} else {
			// clone the options object
			options = JSON.parse(JSON.stringify(options));
		}

		// The html the root should be opened with		
		if(options.admin === true){
			options.rootOpen = '<ul class="nav navbar-nav side-nav" id="admin-sidebar">';
		} else {
			options.rootOpen = '<ul class="nav navbar-nav side-nav">';
			
		}
		
		options.rootClose = '</ul>';
		

		// The html children should be opened with
		options.childrenOpen = '<ul class="children">';
		options.childrenClose = '</ul>';

		options.sectionOpen = '<li class="section" data-toggle="open">';
		options.sectionClose = '</li>';

		options.sectionContent = {'class': 'section-toggle'};

		options.singleOpen = '<li>';
		options.singleClose = '</li>';

		this.menu.get(modelName, options);
	};
};