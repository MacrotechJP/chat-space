$(function(){
  var chat_main = $('.chat_main_center');

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
      chat_main.append(html)
      $('.form__message').val('')
      chat_main.animate({
        scrollTop: 10000
    }, 1050);
      $.rails.enableFormElements($form)
    })
    
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.chat_main_center-message:last').data('id');
    last_group_id = $('.chat_main_center-message:last').data('class');
    $.ajax({
      url: "/groups/last_group_id/api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id,class: last_group_id}
    })
    .done(function(data) {
      $.each(data, function(i, message) {
        var html = buildHTML(message);
        chat_main.append(html);
        chat_main.animate({
          scrollTop: 10000
        }, 1050);
      });
      
    })
    .fail(function() {
      alert('自動更新が失敗しました！');
    });
  };

  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }
});