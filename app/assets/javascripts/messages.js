$(function (){
  function buildHTML(message){
    if (message.text && message.image){
      var html =
        `<div class="chat-main__message-name" data-message-id= "${message.id}">
          ${message.user_name}
          <p class="chat-main__message-list-date">
            ${message.created_at}
          </p>
        </div>
        <p class="chat-main__message-list-message">
          ${message.text}
        </p>`
      return html;
    } else if ( message.image ) {
      var html =
        `<div class="chat-main__message-name" data-message-id= "${message.id}">
          ${message.user_name}
          <p class="chat-main__message-list-date">
            ${message.created_at}
          </p>
        </div>
        <p class="chat-main__message-list-message">
          ${message.text}
          <img src= "${message.image}" >
          </img>
        </p>`
      return html;
    } else if(message.text){
      var html =
        `<div class="chat-main__message-name" data-message-id= "${message.id}">
          ${message.user_name}
          <p class="chat-main__message-list-date">
            ${message.created_at}
          </p>
        </div>
        <p class="chat-main__message-list-message">
          ${message.text}
        </p>`
      return html;
    };
  }
 
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);  
    var url = $(this).attr('action')
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
      $('.chat-main__message').append(html);
      $('form')[0].reset();
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight });
    })
    .always(function(){
      $('.message-form__send-btn').prop('disabled', false);
    })
    .fail(function() {
        alert("メッセージが送信されませんでした");
    });
  });

    var reloadMessages = function() {
      var last_message_id = $('.chat-main__message-name:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {

        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.chat-main__message').append(insertHTML);
          $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
          $('#new_message')[0].reset();
          $("message-form__send-btn").prop("disabled", false);
        }  
      })  
      .fail(function() {
        console.log('error');
      });
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
      clearInterval()
  } 
});