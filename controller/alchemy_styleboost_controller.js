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

	let css_info = await alchemy.extractCSSExports('styleboost/showcase.css');

	let special_theme_names = new Set(),
	    color_names = new Set(),
	    shade_names = new Set(),
	    theme_names = new Set(),
	    color_map = {},
	    name,
	    key,
	    val;

	// Get all the available colors (with their names)
	for (key in css_info) {
		val = css_info[key];

		if (key.startsWith('_colorname_')) {
			color_names.add(val);
		}

		if (key.startsWith('_shadename_')) {
			shade_names.add(val);
		}

		if (key.startsWith('_themename_')) {
			theme_names.add(val);
		}

		if (key.startsWith('_specialthemename_')) {
			special_theme_names.add(val);
		}
	}

	// Get all the shades and their values
	for (name of shade_names) {

		let values = [];

		for (let i = 100; i <= 900; i += 100) {
			val = css_info['_shade_' + name + '-' + i];
			values.push({
				value : val,
				name  : name + '-' + i,
			});
		}

		color_map[name] = values;
	}

	// Get all the colors and their values
	for (name of color_names) {

		let values = [];

		for (let i = 100; i <= 900; i += 100) {
			val = css_info['_color_' + name + '-' + i];
			values.push({
				value : val,
				name  : name + '-' + i,
			});
		}

		color_map[name] = values;
	}

	this.set('special_theme_names', [...special_theme_names]);
	this.set('theme_names', [...theme_names]);
	this.set('color_names', [...color_names]);
	this.set('color_map', color_map);

	this.render('styleboost/showcase');
});