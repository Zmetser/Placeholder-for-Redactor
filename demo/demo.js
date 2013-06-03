/*
    This demo is for Redactor v8.2.x
 */

$(document).ready( function () {
    var textarea = $('#redactor');
    var placeholders = [
        {
            "name": "user_name",
            "value": "User name"
        },
        {
            "name": "commit_message",
            "value": "commit message comes here"
        },
        {
            "name": "commit_summary",
            "value": "commit summary"
        },
        {
            "name": "repo_url",
            "value": "repository"
        },
        {
            "name": "repo_options",
            "value": "repository options"
        },
        {
            "name": "file_changes",
            "value": "file changes"
        },
        {
            "name": "signature",
            "value": "Signature"
        }
    ];

    // Add placeholders for the textarea
    textarea.data('placeholders', placeholders);

    // Create redactor instance
    textarea.redactor({
        plugins: ['placeholders'], // Load placeholder plugin

        // Nothing required below this line
        shortcuts: true,
        callback: function () {
            var le_button = $('.redactor_btn_placeholders');
            le_button.tooltip({
                trigger: 'manual',
                placement: 'left'
            });
            le_button.tooltip('show');
        }
    });
});