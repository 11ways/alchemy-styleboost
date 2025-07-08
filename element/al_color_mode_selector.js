/**
 * The custom al-color-mode-selector element
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
const ColorMode = Function.inherits('Alchemy.Element', 'AlColorModeSelector');

/**
 * The template to use for the content of this element
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setTemplateFile('styleboost/color_mode_selector');

/**
 * The main CSS file from which to extract the color modes
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setAttribute('css-file');

/**
 * In which cookie this should be stored
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setAttribute('cookie');

/**
 * Prepare variables
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setMethod(function prepareRenderVariables() {

	let css_file = this.css_file;

	if (!css_file) {
		return;
	}

	return this._getCssResource(css_file);
});

/**
 * Get the preferred cookie name
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setMethod(function getCookieName() {
	let cookie = this.cookie;

	if (!cookie) {
		cookie = 'preferred_color_mode';
	}

	return cookie;
});

/**
 * Get CSS info
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setMethod(async function _getCssResource(css_file) {

	let response;
	let cookie = this.getCookieName();

	try {
		response = await this.hawkejs_helpers.Alchemy.getResource('AlchemyStyleboost#getCssInfo', {
			css_file,
			cookie,
		});
	} catch (err) {
		return {css_info: {err: err}};
	}

	if (!response) {
		return {css_info: {err: 'No response received'}};
	}

	return response;
});

/**
 * Introduced to the DOM
 *
 * @author   Jelle De Loecker <jelle@elevenways.be>
 * @since    0.5.0
 * @version  0.5.0
 */
ColorMode.setMethod(function introduced() {

	let mode_select = this.querySelector('select.color-modes');

	if (!mode_select) {
		return;
	}

	let cookie = this.getCookieName();

	mode_select.addEventListener('change', e => {
		let new_value = mode_select.value;
		hawkejs.scene.cookie(cookie, new_value);
	});
});