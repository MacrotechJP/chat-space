$(function(){

  var search_list = $(".user-search-result");

  function appendUsers(user) {
    var html = `<div class="chat-group-user clearfix js-chat-user">
                  <p class="chat-group-user__name">
                  ${user.name}
                  </p>
                  <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                  追加
                  </a>
                </div>`

    search_list.append(html);  
  } 
  
  function appendMembers(id,name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`

    $(".chat-group-form__field--rights").append(html);  
  } 

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    if(input != ""){ 
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(users) {
        search_list.empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUsers(user);
          });
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    }else{
      search_list.empty();
    }
  });

  $(document).on("click",".user_search_add",function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    appendMembers(user_id,user_name);
  });

  $(document).on("click",".user-search-remove",function(){
    $(this).parent().remove();
  });
});