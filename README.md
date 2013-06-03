# Placeholder plugin for redactor

Adds a drop-down list of pre-defined placeholders that you can insert into the editor.

Works with 8.2.x

## Example

* Stable version: http://thezee.hu/redactor_placeholder/
* Beta version for Redactor v9.0: http://thezee.hu/redactor_placeholder/index_9.html

## Usage

You should define the placeholders before plugin init by adding them to the textarea as a data attribute.

```
var placeholders = [
    {
        name: "placeholder_name"
        value: "Placeholder display value"
    }
];

$('#redactor').data('placeholders', placeholders);
```

Add placeholder plugin to redactor.

```
$('#redactor').redactor({
    plugins: ['placeholders']
});
```

## Drawbacks

Sadly redactor has no beforeSave callback, therefore you have to transform the placeholder spans back to text manually. If you do it on the client side you can use the plugin's `getTransformedHtml` method.


## Placeholder plugin

Copyright (c) 2013, Oliver Kovacs (Zmetser)
Licensed under the MIT License

## Redactor

Copyright (c) 2009-2013, Imperavi Inc.
License: http://imperavi.com/redactor/license/