if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

/**
 * Placeholder plugin for Redactor
 *
 * Inserts a button to the toolbar with a list of the available placeholders.
 */
RedactorPlugins.placeholders = {

    /**
     * Plugin constructor
     */
    init: function () {
        // Placeholders are stored in field's data.
        this.placeholders = this.$el.data('placeholders');
        this.$el.removeData('placeholders');

        var placeholders = this.fetchPlaceholders();

        this.addBtn('placeholders', 'Insert Placeholder', false, placeholders);
        this.addBtnSeparatorBefore('placeholders');

        this.replacePlaceholdersWithHTML();
    },

    /**
     * Create redactor readable JSON structure from placeholders
     * attach the addPlaceholder handler for each placeholder
     *
     * @return {Object} placeholders
     */
    fetchPlaceholders: function () {
        var obj  = {}, i, len, placeholder, callproxy, placeholders,
            self = this;

        placeholders = this.placeholders;

        // Call addPLaceholder behind proxy and pass
        // current placeholder [this] object.
        callproxy = function ( event ) {
            self.addPlaceholder(this, event);
        };

        for ( i = 0, len = placeholders.length; i < len; i++ ) {
            placeholder = placeholders[i];

            obj[placeholder.name] = {
                title: placeholder.value,
                callback: jQuery.proxy(callproxy, placeholder)
            };
        }

        return obj;
    },

    /**
     * Create's a placeholder.
     *
     * @param  {String} name
     * @param  {String} value
     *
     * @return {String}       placeholder span as text
     */
    getPlaceholderHTML: function ( name, value ) {
        return ['<span class="placeholder" contenteditable="false" name="' + name + '">',
         value,
         '</span>'].join('');
    },

    /**
     * Add a placeholder to the current curson position
     *
     * @param {Object} placeholder {name: "", value: ""}
     * @param {Object} event       event
     *
     * @return {Object} self
     */
    addPlaceholder: function ( placeholder, event ) {
        var span = this.getPlaceholderHTML(placeholder.name, placeholder.value)

        this.setBuffer(); // Set buffer for redo
        this.insertHtml(span);

        return this;
    },

    /**
     * Replace all text placeholders, in editor, to HTML
     *
     * @return {Object} self
     */
    replacePlaceholdersWithHTML: function () {
        var text = this.getCode(),
            placeholders = text.match(/\{\{\w*\}\}/g),
            len, name, placeholder;

        if ( !placeholders )
            return false;

        len = placeholders.length;

        for ( ; len; --len) {
            name = placeholders[len-1].match(/\w+/)[0];
            if ( (placeholder = this._getPlaceholderByName(name)) ) {
                placeholder = this.getPlaceholderHTML(placeholder.name, placeholder.value);
                text = text.replace(placeholders[len-1], placeholder);
            }
        }

        this.setCode(text);

        return this;
    },

    /**
     * Returns Redactor's html as plain text.
     *
     * @return {String} Redactor's html
     */
    getTransformedHtml: function () {
        var $html = jQuery('<div>' + this.getCode() + '</div>');

        // Replace placeholder spans to placeholder text encapsulated with {{}}
        jQuery('.placeholder', $html).before(function () {
            return "{{" + jQuery(this).attr('name') + "}}";
        }).remove();

        return $html.html();
    },

    /**
     * Return placeholder object by its name, or false.
     *
     * @param {String} name
     *
     * @return {Object|false}
     */
    _getPlaceholderByName: function ( name ) {
        var len = this.placeholders.length, match;

        for ( ; len; --len ) {
            match = this.placeholders[len-1]
            if (match.name === name)
                return match;
        }

        return false;
    }

};