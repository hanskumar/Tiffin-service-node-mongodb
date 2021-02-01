//======== fancybox popup ===========
$(document).on('click', '.fancybox',function(event) {
    var link = $(this).attr('href');
    var options = {
        href: link,
        padding: 0,
        autoHeight: true,
        autoCenter: true,
        openEffect : 'elastic',
        closeEffect : 'fadeout',
        closeClick  : false,
        helpers : { 
            overlay : { closeClick: false },
            overlay: { locked: false }
        },
    };

    if( $(this).hasClass('ajax') ) {
        options.type = "ajax";
    }

    if (typeof $(this).data('download') !== 'undefined') {
        var url = $(this).data('download');
        options.afterLoad = function() {
            this.title = '<a href="'+url+'"><i class="fa fa-download"></i> Download</a> ';
        };
    }
    $.fancybox.open(options);
    return false;
});