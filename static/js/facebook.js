/**
 * Created by IntelliJ IDEA.
 * User: fernando
 * Date: 07-22-2010
 * Time: 03:33:44 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    $("#facebook-status-form").submit(function(){
        $.ajax({
            type: 'POST',
            url: $('#facebook-status-form').attr('action'),
            data: {'status': $("#id_status").val()},
            success: function(data){
                if (data.status == "saved"){
                    $("#facebook-feed").prepend("<li>"+ $("#id_status").val() +"</li>");
                }

                return false;
            }
        });

        return false;

        });
    return false
});

