
var time;
var bgScroll;
var runImg = 0;
var newBG = 0;
var left;
var char = ["Knight", "IceWizard", "Archer"];
var keypress = false;
var clicked = false;
var allowJump = true;
var chosenHero;


function run(hero) {
  if (!hero) {
    time = setInterval(function(){
      if (runImg < 9) {
            runImg++;
            document.getElementById("player").setAttribute("src", "assets/character/"+ chosenHero +"/Run/" + runImg +".png");
      }
      else  {
        clearInterval(time);
        runImg = 0;
        run();
      }
    }, 20);
  }
  else {
    time = setInterval(function(){
      if (runImg < 9) {
            runImg++;
            $(`#${hero}`).attr("src", "assets/character/"+ hero +"/Run/" + runImg +".png");
      }
      else  {
        clearInterval(time);
        runImg = 0;
        run(hero);
      }
    }, 20);
  }
}

function scrollingBackground(){
  bgScroll = setInterval(function(){
    newBG = parseInt(newBG) - 2;
    $(".scrollingBg").css("background-position-x", newBG +"px");
  }, 5)
}

function resumeRun(){
  $("#block").attr("class", "boxOut");
  allowJump = true;
  scrollingBackground();
  run();
  setTimeout(function(){
    $("#block").attr("class", "blockNotHit");
  }, 200)
}

function blockRun() {
  $("#block").attr("class", "blockNotHit");
}

function clearHud() {
  $("#charSelect").remove();
}

function startEverything (){
  run();
  scrollingBackground();
  blockRun();
}


$("#heroSelection img").mouseenter(function(){
  let character = ($(this).attr("src").split("/")[2]);
  run(character);
  if (character === "IceWizard"){
    character = "Ice Mage";
  }
  $("#selected").text(character);
  $("#selected").attr("style", "visibility:visible");
});

$("#heroSelection img").mouseleave(function(){
  $("#selected").attr("style", "visibility:hidden");
  $("#selected").text("");
  clearInterval(time);
});

$(document).on("click", ".heroes", function(e){
  console.log("you've selected " + $(this).attr("alt"))
  chosenHero = $(this).attr("id");
  clearHud();
  clearInterval(time)
  startEverything();
})

$(document).on("click keydown", function(e){
  if ((allowJump === true) && ((e.type === 'click' && clicked === false) || (e.key === " " && keypress === false))){
    $("#player").addClass("jumpz");
    keypress = true;
    clicked = true;
    var block = document.getElementById("block");
    var char = block.getBoundingClientRect();
    var collision = parseInt((parseInt(char.x) / parseInt(window.innerWidth)) * 100);

    if(collision > 23 && collision < 38){
      setTimeout(function(){
      let newChar = block.getBoundingClientRect();
      $("#block").attr("class", "boxHit");
      $("#block").attr("style", `left:${newChar.x}px`);
      clearInterval(time);
      document.getElementById("player").setAttribute("src", "assets/character/"+ chosenHero +"/Stand/0.png");
      clearInterval(bgScroll);
      allowJump = false;
      console.log($("#block").attr("data"))
      switch($("#block").attr("data")) {
        case "block1":
        console.log("see resume")
        setTimeout(function(){
          resumeRun();
          $("#block").attr("style", "");
          $("#block").attr("data", "block2");
        }, 10000)
        break;

        case "block2":
        console.log("see projects")
        setTimeout(function(){
          resumeRun();
          $("#block").attr("style", "");
          $("#block").attr("data", "block3");
        }, 10000)
        break;

        case "block3":
        console.log("see contacts")
        setTimeout(function(){
          resumeRun();
          setTimeout(function(){
            $("#block").attr("style", "display:none");
          }, 500)
        }, 10000)
        break;
      }
    }, 170)
    }
    setTimeout(function(){
      $("#player").removeClass("jumpz");
      keypress = false;
      clicked = false;
    }, 650)
  }
})
