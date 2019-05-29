$(function(){
  $form = $($.rails.formSubmitSelector)
  function buildHTML(message){
    var img = ""
    if (message.image !== null) {
        img = `<img src="${message.image}">`
    }
    var html = `
                <div class="chat_main_center-message">
                  <div class="chat_main_center-message-top">
                    <div class="chat_main_center-message-top-user"> 
                      ${message.user_name}
                    </div>
                    <div class="chat_main_center-message-top-date"> 
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat_main_center-message-detail"> 
                    <p class="lower-message__content">
                      ${ message.content }
                      ${ img }
                    </p>
                  </div>
                </div>
                    `
    return html;
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_main_center').append(html)
      $('.form__message').val('')
      $('.chat_main_center').animate({
        scrollTop: 1000
    }, 1050);
      $.rails.enableFormElements($form)
    })
    
    .fail(function(){
      alert('error');
    })
  })
});