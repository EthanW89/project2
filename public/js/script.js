$(document).ready(function(){
  console.log("I really really hope this works!")

  var getBeer = function(){

  var query = $("#postText").val();
  console.log("Requesting: "+query);
  $.ajax({
    "type": "GET",
    "url": "/api/getBeer/"+query,
    "data":{query:query},
    success: function(data){
      console.log(data)
      $('#search').text(data.data[0].name)
      $('#info').text(data.data[0].description)

    },
    error: function(data){
      //debugger
    } 
  });
  };

  $('#submit').click(function(e){
    e.preventDefault();
    getBeer();
  });


  var saveBeer = function(name, description, email){
    var beerData = {name: name, description: description, email: email}
    $.ajax({
      "type": "POST",
      "url": "/api/saveBeer",
      "data": beerData,
      success: function(data){
        console.log(data)
        window.location.replace("/beers/" + data.id);
        // $('#search').text(data.data[0].name)
        // $('#info').text(data.data[0].description)
      },
      error: function(data){
      //debugger
      console.log(data)
      } 
    });
  };

  var saveComment = function(beerName, comment) {

    var commentData = {
      name: beerName,
      comment: comment
    };
    $.ajax({
      "type": "POST",
      "url": "/comments/save",
      "data": commentData,
      success: function(data) {
        console.log("success")
      }
    })
  }

$('#submitPost').click(function(e) {
  e.preventDefault();
  var beername = $('#search').text();
  var comment = $('#post').val();
  saveComment(name, comment)
})

  $('#saveBeer').click(function(e) {
    e.preventDefault();
    var name = $('#search').text();
    var description = $('#info').text();
    var email = $(".email").val();
    saveBeer(name, description, email)
  })

});
