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