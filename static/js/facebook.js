/**
 * Created by IntelliJ IDEA.
 * User: fernando
 * Date: 07-22-2010
 * Time: 03:33:44 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    //Status form submission
    $("#facebook-status-form").submit(function(){
        $.ajax({
            type: 'POST',
            url: $('#facebook-status-form').attr('action'),
            data: {'status': $("#id_status").val()},
            success: function(data){
                if (data.status == "saved"){
                    $("#facebook-feed").prepend("<li>"+ $("#id_status").val() +"</li>");
                    $("#id_status").val('');
                }

                return false;
            }
        });

        return false;

        });

    //event form submission
    $("#facebook-event-form").submit(function(){
        $.ajax({
            type: 'POST',
            url: $('#facebook-event-form').attr('action'),
            data: {'name': $("#id_name").val(),
                'start_time': $("#id_start_time").val(),
                'end_time':$("#id_end_time").val()},
            success: function(data){
                if (data.status == "saved"){
                    $("#facebook-events").prepend("<li>"+ $("#id_name").val() +"</li>");
                    $("#id_name").val('');
                    $("#id_start_time").val('');
                    $("#id_end_time").val('');
                }

                return false;
            }
        });

        return false;

        });


    $('#id_start_time').datepicker({
    	duration: '',
        time24h:true,
        showTime: true,
        constrainInput: true
     });

    $('#id_end_time').datepicker({
    	duration: '',
        time24h:true,
        showTime: true,
        constrainInput: true
     });

    return false
});


