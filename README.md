# Placeholder plugin for redactor

Adds a drop-down list of pre-defined placeholders that you can insert into the editor.

## Example

http://thezee.hu/redactor_placeholder/

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

Sadly redactor has no beforeSave callback, therefore you have to transform the placeholder spans back to text manually. If you do it on the client side you can use the plugins `getTransformedText` method.