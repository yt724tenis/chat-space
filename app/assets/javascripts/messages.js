$(function (){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-main__message-name">
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
    } else {
      var html =
        `<div class="chat-main__message-name">
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
    console.log(url)
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
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight });
    })
    .always(function(){
      $('.message-form__send-btn').prop('disabled', false);
    })
    .fail(function() {
        alert("メッセージが送信されませんでした");
    });
  })
});