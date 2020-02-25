$(document).ready(function(){
  var fox = {
    body: $('.fox'),
    // body: document.getElementById('fox')
    side: 'left',
    inBoat: false,
  }
  var sheep = {
    body: $('.sheep'),
    side: 'left',
    inBoat: false,
  }
  var cabbage = {
    body: $('.cabbage'),
    side: 'left',
    inBoat: false,
  }

  var farmer = {
    body: $('.farmer'),
    side: 'left'
  }

  var characters = {
    fox: fox,
    sheep: sheep,
    cabbage: cabbage,
    farmer: farmer,
  }

  var boat = {
    occupied: false,
    onBoard: null,
    side: 'left'
  }

  $('.boatable').on('click',function(){
    var type = this.classList[0]
    var obj = characters[type]
    if (obj.onBoat){
      getOutTheBoat(obj, boat)
      setTimeout(function(){victoryCondition(characters)}, 100)
    } else {
      getInTheBoat(obj, boat)
    }
  })

  $('.farmer').on('click',function(){
    var farmer = characters.farmer
    crossRiver(farmer, boat)
    setTimeout(function(){checkGame(characters)}, 100)
  })
})

function getInTheBoat(element, boat) {
  if (!boat.occupied && boat.side == element.side ) {
    element.body.css('marginLeft', '300px');
    element.body.css('marginRight', '300px');
    element.onBoat = true;
    boat.occupied = true
    boat.onBoard = element
  }
}

function getOutTheBoat(element, boat) {
  element.body.css('marginRight', '0px');
  element.body.css('marginLeft', '0px');
  element.onBoat = false;
  boat.occupied = false
  boat.onBoard = null
}

function crossRiver(farmer, boat) {
  farmer.body.toggleClass('cross-river');
  farmer.side === 'left' ? farmer.side = 'right' : farmer.side = 'left'
  boat.side === 'left' ? boat.side = 'right' : boat.side = 'left'
  if (boat.occupied) {
    boat.onBoard.body.toggleClass('cross-river');
    boat.onBoard.side === 'left' ? boat.onBoard.side = 'right' : boat.onBoard.side = 'left'
  }
}

function checkGame(characters) {
  if (characters.fox.side === characters.sheep.side && characters.sheep.side !== characters.farmer.side ) {
    alert('YOU LOSE!')
    location.reload()
  }
  if (characters.cabbage.side === characters.sheep.side  && characters.cabbage.side !== characters.farmer.side) {
    alert('YOU LOSE!')
    location.reload()
  }
}

function victoryCondition(characters){
  if (characters.fox.side === 'right' && characters.sheep.side === 'right' && characters.cabbage.side === 'right' && characters.farmer.side === 'right') {
    alert('YOU WIN!')
  }
}
