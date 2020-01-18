$(function(){
  function addUser(user){
    console.log(user);
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-seach-add chat-group-user__btn chat-group-user__btn--add" data-userid=${user.id} data-user-name=${user.name}>追加</div>
      </div>
    `;
    console.log(html);
      $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
      $("#user-search-result").append(html);  
  }
  function addDeleteUser(name, id) {
    
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $('#user-search-field').on('keyup', function(){
    let input = $('#user-search-field').val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users){
      $("#users-search-result").empty();

      if (users.lebgth !== 0){
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;          
      }  else {
        addNoUser();
      }  
    })
      .fail(function(){
        alert("失敗しました");
      });
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name")
    const userId = $(this).attr("data-userid")
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId); 
  });

  $(document).on('click', ".chat-group-user__btn--remove", function(){
    $(this)
      .parent()
      .remove();
  });
});