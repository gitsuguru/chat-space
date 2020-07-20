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

  $(".main__form").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message)
      $(".main__frame").append(html)
      $(".main__frame").animate({ scrollTop: $(".main__frame")[0].scrollHeight});
      $('form')[0].reset();
      $(".main__submit").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".main__submit").prop("disabled", false);
    });
  });
});