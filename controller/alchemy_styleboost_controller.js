const CACHE = alchemy.getCache('styleboot_css_info');

/**
 * The Styleboost Controller class
 *
 * @extends  Alchemy.Controller.App
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 *
 * @param    {Conduit}   conduit
 * @param    {Object}    options
 */
const Styleboost = Function.inherits('Alchemy.Controller.App', 'AlchemyStyleboost');

/**
 * Show the showcase view of the main styleboost styles
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 *
 * @param    {Conduit}      conduit
 */
Styleboost.setAction(async function showcase(conduit) {
	this.setTitle('Styleboost | Alchemy');

	let _css_info = await alchemy.extractCSSExports('styleboost/showcase.css');
	let css_info = {};

	for (let key in _css_info) {
		Object.setPath(css_info, key, _css_info[key])
	}

	this.set('css_info', css_info);

	this.render('styleboost/showcase');
});

/**
 * View the showcase in chimera
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 *
 * @param    {Conduit}      conduit
 */
Styleboost.setAction(async function chimeraShowcase(conduit) {

	this.setTitle('Styleboost | Alchemy');

	let _css_info = await alchemy.extractCSSExports('styleboost/showcase.css');
	let css_info = {};

	for (let key in _css_info) {
		Object.setPath(css_info, key, _css_info[key])
	}

	this.set('css_info', css_info);

	this.render('styleboost/chimera_showcase');
});

/**
 * Get the info of the given CSS file
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 *
 * @param    {Conduit}      conduit
 */
Styleboost.setAction(async function getCssInfo(conduit) {

	let file_path = conduit.param('css_file');

	if (!file_path || typeof file_path != 'string') {
		return conduit.error('No CSS file specified');
	}

	if (file_path.startsWith('http:') || file_path.startsWith('https:')) {
		return conduit.error('Cannot extract CSS info from remote files');
	}

	if (!file_path.endsWith('.css')) {
		file_path += '.css';
	}

	let css_info = CACHE.get(file_path);

	if (!css_info) {
		let _css_info = await alchemy.extractCSSExports(file_path);
		css_info = {};

		for (let key in _css_info) {
			Object.setPath(css_info, key, _css_info[key])
		}

		CACHE.set(file_path, css_info, 60 * 60 * 24 * 1000);
	}

	let result = {
		css_info,
		preferred_color_mode: conduit.cookie('preferred_color_mode'),
	};

	console.log(css_info);

	conduit.end(result);
});
