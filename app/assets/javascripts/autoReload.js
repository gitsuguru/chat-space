$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main__chat">
          <div class="main__text">
            <div class="main__name">
              ${message.user_name}
            </div>
            <div class="main__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__display">
            <p class="main__word">
              ${message.content}
            </p>
            <p class="main__picture">
              <img src= ${message.image}>
            </p>
          </div>
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main__chat">
          <div class="main__text">
            <div class="main__name">
              ${message.user_name}
            </div>
            <div class="main__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__display">
            <p class="main__word">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".main__frame").append(insertHTML);
        $(".main__frame").animate({ scrollTop: $(".main__frame")[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});