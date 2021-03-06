/* Pile - Bulk Action Link */
$(document).on('click', '.bulk-action-tag', '.bulk-action-untag', function(e) {

	e.preventDefault();
  mailpile.render_modal_tags();
});


$(document).on('click', '.bulk-action-later, .bulk-action-archive, .bulk-action-trash', function(e) {

	e.preventDefault();
	var action = $(this).attr('class').replace('bulk-action-', '');
  var delete_tag = '';

  if ($.url(location.href).segment(1) === 'in') {
   delete_tag = $.url(location.href).segment(2);
  }

  // Add / Delete
  mailpile.tag_add_delete(action, delete_tag, mailpile.messages_cache, function() {

    // Update Pile View
    $.each(mailpile.messages_cache, function(key, mid) {
      $('#pile-message-' + mid).fadeOut('fast');
    });

    // Empty Bulk Cache
    mailpile.messages_cache = [];
  });
});

$(document).on('click', '.bulk-action-add-to-group', function(e) {

  var modal_html = $("#modal-group-editor").html();
  $('#modal-full').html(_.template(modal_html, {}));
  $('#modal-full').modal({ backdrop: true, keyboard: true, show: true, remote: false });
});

// Mark Unread
$(document).on('click', '.bulk-action-unread', function() {
    mailpile.tag_add_delete('new', mailpile.tags_cache, mailpile.messages_cache, function(result) {
      $.each(mailpile.messages_cache, function(key, mid) {
        $('#pile-message-' + mid).addClass('in_new');
      });
      // Empty Bulk Cache
      mailpile.bulk_cache = [];
    });
});

// Mark Read
$(document).on('click', '.bulk-action-read', function() {
    mailpile.tag_add_delete(mailpile.tags_cache, 'new', mailpile.messages_cache, function(result) {
      $.each(mailpile.messages_cache, function(key, mid) {
        $('#pile-message-' + mid).removeClass('in_new');
      });
      // Empty Bulk Cache
      mailpile.bulk_cache = [];
    });
});