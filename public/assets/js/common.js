$(document).on('change', '#image_upload_file', function () {
    var progressBar = $('.progressBar'), bar = $('.progressBar .bar'), percent = $('.progressBar .percent');
    
    $('#image_upload_form').ajaxForm({
        beforeSend: function() {
            progressBar.fadeIn();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function(res, statusText, xhr, $form) {
            console.log(res);  
            if(res.success == true){

                var image_url = '/uploads/'+res.image;
                $("#imgArea>img").prop('src',image_url);
                $(".dropdown-toggle>img").prop('src',image_url);
                toastr.success(res.messege, "Success", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
            } else {
                toastr.error(res.messege, "Error", {timeOut: 5e3,showMethod:"slideDown",hideMethod:"slideUp"});
            }
        },
        complete: function(xhr) {
            progressBar.fadeOut();
        }
    }).submit(); 
  }); 