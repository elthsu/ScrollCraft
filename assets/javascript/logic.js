
var time;
var bgScroll;
var bgCloudScroll;
// var fgTreeScroll;
// var fgTreeScrollCont;
// var newTreesCreate = true;
// var newTreesTimer;
var modalOpen = false;
var blockTimer;
var blockLocation;
var runImg = 0;
var newBG = 0;
var newCloudBG = 0;
// var newFgTrees = 3000;
// var visableTree = false;
var left;
var char = ["Knight", "IceWizard", "Archer"];
var keypress = false;
var clicked = false;
var allowJump = false;
var chosenHero;
var treeArray = ["0_9", "1_8", "2_7", "3_6", "4_5", "5_4", "6_3", "7_2", "8_1"]

$(document).ready(function() {
    blockTimer = setInterval(function(){
      blockLocation = document.getElementById("block").getBoundingClientRect();

      if (parseInt(blockLocation.x) < -100){

        $("#block").attr("class", "");
        setTimeout(function(){
          $("#block").attr("class", "blockNotHit");
        }, 500)
      }
    }, 1000)

});

function run(hero) {
  if (!hero) {
    clearInterval(time);
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
    clearInterval(time);
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
  clearInterval(bgScroll)
  clearInterval(bgCloudScroll)

  bgScroll = setInterval(function(){
    newBG = parseInt(newBG) - 2;
    $(".scrollingBg").css("background-position-x", newBG +"px");
  }, 8);
  bgCloudScroll = setInterval(function(){
    newCloudBG = parseInt(newCloudBG) - 1;
    $(".bgClouds").css("background-position-x", newCloudBG +"px");
  }, 50)
  // if (newTreesCreate === true && visableTree === false) {
  //
  //     newTreesTimer = setInterval(function(){
  //     clearInterval(fgTreeScroll);
  //     let randyTree = treeArray[Math.floor(Math.random() * treeArray.length)]
  //     $("#fgTrees").attr("src",`assets/background/PNG/TreesAndClouds/Tree__000${randyTree}.png`)
  //     newFgTrees = 3000;
  //     fgTreeScroll = setInterval(function(){
  //       newFgTrees = parseInt(newFgTrees) - 3;
  //       $(".fgTrees").css("left", newFgTrees +"px");
  //     }, 1)
  //   }, 9000)
  // }
  // else if (newTreesCreate === true && visableTree === true) {
  //
  //   let tree = document.getElementById("fgTrees");
  //   let floatingTree = tree.getBoundingClientRect();
  //
  //   if (floatingTree.x > -100){
  //     console.log("hitting if")
  //     clearInterval(fgTreeScroll);
  //     $("#fgTrees").attr("style", `left:${floatingTree.x}px`);
  //     fgTreeScrollCont = setInterval(function(){
  //       floatingTree = tree.getBoundingClientRect();
  //       newFgTrees = parseInt(floatingTree.x) - 3;
  //       $(".fgTrees").css("left", newFgTrees +"px");
  //     }, 1)
  //   }
  //   else {
  //     console.log("hitting else")
  //     clearInterval(fgTreeScrollCont);
  //     visableTree = false;
  //     scrollingBackground();
  //   }
  // }
}

function endGame(){
  allowJump = false;
  $("#endText").attr("style", "display:block");
  $("#endText").attr("class", "endText");
  setTimeout(function(){
    $("#player").attr("class", "rundAway");
    setTimeout(function(){
      $("#player").attr("style", "display:none");
    }, 2800)
  },2000)
}

function resumeRun(){

  $("#block").attr("class", "boxOut");
  // newTreesCreate = true;
  allowJump = true;
  scrollingBackground();
  run();
  setTimeout(function(){
    $("#block").attr("class", "blockNotHit");
  }, 500)
}

function blockRun() {
  $("#block").attr("class", "blockNotHit");
}

function clearHud() {
  $("#charSelect").remove();
  $("#disclaimer").addClass("flyAwayText");
  $("#titleScroll").addClass("flyAwayText");
  setTimeout(function(){
    $("#disclaimer").remove();
    $("#titleScroll").remove();
  }, 18000);
  setTimeout(function(){
    blockRun();
  }, 3000);
}

function startEverything (){
  run();
  scrollingBackground();
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
  chosenHero = $(this).attr("id");
  $("#player").addClass("falling");
  setTimeout(function(){
    $("#player").removeClass("falling");
    allowJump = true;
  }, 2000);
  clearHud();
  clearInterval(time);
  startEverything();
})

$(document).on("click keydown", function(e){
  if ((allowJump === true) && ((e.type === 'click' && clicked === false && e.target.id !== "contentModal") || (e.key === " " && keypress === false))){
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

      document.getElementById("player").setAttribute("src", "assets/character/"+ chosenHero +"/Stand/0.png");

      clearInterval(time);
      clearInterval(bgScroll);
      clearInterval(bgCloudScroll);
      // clearInterval(fgTreeScroll);
      // clearInterval(newTreesTimer);
      // visableTree = true;
      // newTreesCreate = false;
      allowJump = false;

      switch($("#block").attr("data")) {

        case "block1":
        $("#modalWrapper").css("display", "block");
        $("#contentModal").html(
          `<h2>About Me</h2><span id="exitModal">X</span>
           <hr />
           <h4>I am a quick thinker, great team collaborator, and motivated problem solver. A Full Stack (MERN) Developer.</h4>
           <h4>I am a web developer passionate about problem solving. I value the listening aspect of communication as much as conversing. I am excited to use my skills to benefit your clients.</h4>
          `)
        modalOpen = true;
        $(document).on("click", function(e){
          if((modalOpen === true) && ((e.target.id === "bgClouds" || e.target.id === "exitModal"))){
            $("#modalWrapper").css("display", "none");
              resumeRun();
              setTimeout(function(){
                  $("#block").attr("style", "left:110%");
                  $("#block").attr("data", "block2");
                  modalOpen = false;
              }, 300)
          }
        })
        break;

        case "block2":
        $("#modalWrapper").css("display", "block");
        $("#contentModal").html(
          `<h2>Cover Letter</h2><span id="exitModal">X</span>
           <hr />
           <h4>Dear Hiring Manager,
            <p>I have over 8 years of international experience and would like to speak with the right person about your open position. I believe I am a good fit because I have:</p><ul><li>Worked on 3 product launches developed in ReactJS</li><li>Skilled and proficient in the modern MERN Full-Stack, Mango/Express/React/Node.</li><li>Mastery in other aspects of development, including but not limited to Handlebars (server-side templating) and JQuery.</li><li>Consistently learning new technologies introduced in the Coding Boot Camp</li></ul><p>I am currently working as a UCLA Extension Full-Stack Boot Camp TA. I would love to talk to you soon!</p>
            <p>Best,</p>
            <p>Elton</p>
            </h4>`)
        modalOpen = true;
        $(document).on("click", function(e){
          if((modalOpen === true) && ((e.target.id === "bgClouds" || e.target.id === "exitModal"))){
            $("#modalWrapper").css("display", "none");
              resumeRun();
              setTimeout(function(){
                  $("#block").attr("style", "left:110%");
                  $("#block").attr("data", "block3");
                  modalOpen = false;
              }, 300)
          }
        })
        break;

        case "block3":
        $("#modalWrapper").css("display", "block");
        $("#contentModal").html(
          `<h2>Projects</h2><span id="exitModal">X</span>
          <hr />
          <h4>#mash</h4>
          <a href="https://github.com/elthsu/hashmash" target="_blank">
            <img className="" id="" src="https://raw.githubusercontent.com/elthsu/hashmash/master/app/public/img/github.png" />
          </a>
          <h5>Streamlined project management based on your GitHub repos built with React and Socket.io for realtime updates</h5>
          See the repo:
          <a href="https://github.com/elthsu/hashmash" target="_blank">
            <img id="githubIcon" src="assets/img/github.png" />
          </a>
          <hr />
          <h4>Swapr</h4>
          <a href="https://swapr-app.herokuapp.com/" target="_blank">
            <img className="" id="" src="https://media.giphy.com/media/l1J9RmLUEsyzouIrm/giphy.gif" />
          </a>
          <h5>An app where users can connect with one another to swap items with no money involved. With a built-in real-time chat system, users can safely arrange to exchange items without sharing personal information.</h5>
          See the repo:
          <a href="https://github.com/Forcium/swapr" target="_blank">
            <img id="githubIcon" src="assets/img/github.png" />
          </a>
          <hr />
          <h4>Public Transit Mapper</h4>
          <a href="http://eltonhsu.com/LA-Metro-Stations-Helper/" target="_blank">
            <img className="" id="" src="https://media.giphy.com/media/xT9IguYybCWpDXb6BW/giphy.gif" />
          </a>
          <h5>A useful tool for any traveler or new transplant of a city. The app takes multiple APIs and provides information centered around LA's Metro Stations. Can be customized to any city.</h5>
          See the repo:
          <a href="https://github.com/elthsu/LA-Metro-Stations-Helper" target="_blank">
            <img id="githubIcon" src="assets/img/github.png" />
          </a>
          <hr />`)
        modalOpen = true;
        $(document).on("click", function(e){
          if((modalOpen === true) && ((e.target.id === "bgClouds" || e.target.id === "exitModal"))){
            $("#modalWrapper").css("display", "none");
              resumeRun();
              setTimeout(function(){
                  $("#block").attr("style", "left:110%");
                  $("#block").attr("data", "block4");
                  modalOpen = false;
              }, 300)
          }
        })
        break;

        case "block4":
        $("#modalWrapper").css("display", "block");
        $("#contentModal").html(
          `<h2>Resume<a href="assets/doc/EltonHsuResume.pdf" download><i class="fas fa-download"></i></a></h2><span id="exitModal">X</span>
          <hr />
          <h4>ELTON HSU</h4>
          <h5><a href="mailto:elthsu@gmail.com">elthsu@gmail.com</a></h5>
          <h5><a href="http://www.linkedin.com/in/elthsu/">http://www.linkedin.com/in/elthsu/</a></h5>
          <h5>eltonhsu.com</h5>
          <h5>Quick thinker, great team collaborator, and motivated problem solver</h5>
          <h5>Full Stack (MERN) Developer</h4>
          <hr />
          <h4>Professional Experience</h4>
          <hr />

          <h4>UCLA Extensions | Westwood, CA</h4>
          <h5>Coding Boot Camp Instructional Staff</h5>
          <h6>October 2017 – Present</h6>
          <hr />
          <h4>Bazic Products, | El Monte, CA</h4>
          <h5>Customer Service Manager/Project Manager</h5>
          <h6>April 2016 – May 2017</h6>
          <h6><ul>
            <li>Managed a staff of 9 Customer Service Representatives.</li>
            <liCompleted SOP/Reference Guide for entire department.</li>
            <liTrained all new Customer Service & Sales Reps. on SAP Business One.</li>
          </ul>
          </h6>
          <hr />
          <h4>Halloway Group | Shanghai, China; Sydney, Australia</h4>
          <h5>Corporate Director and Chief Executive Officer</h5>
          <h6>April 2012 – December 2014</h6>
          <h6><ul>
            <li>Managed a staff of 41 employees.</li>
            <li>Developed a client base of 800+ and $1 million+ USD within 4 months of operation.</li>
            <li>Maintained a staff of 50+ local Chinese service agents in Shanghai to assist our Chinese clients.</li>
          </ul>
          </h6>
          <hr />
          <h4>Bacera Group | Alhambra, CA</h4>
          <h5>Chief Operating Officer</h5>
          <h6>January 2008 – October 2012</h6>
          <h6>
            <ul>
              <li>Core team that lead to all-time highs in company revenue and company profits.</li>
              <li>Planned the strategic management and operational oversight of the company's Global Business Development and Operations.</li>
            </ul>
          </h6>
          <h5>Executive Vice President of Information Technology</h5>
          <h6>May 2006 – January 2008</h6>
          <h6>
            <ul>
              <li>Interim COO for approximately 12 months during a period of rapid growth.</li>
              <li>Supervised Compliance Department for proper procedures.</li>
              <li>Updated and modernized company websites and online assets.</li>
            </ul>
          </h6>
          <h5>Executive Assistant to the C.E.O.</h5>
          <h6>December 2005 – May 2006</h6>
          <h6>
            <ul>
              <li>Passed SERIES 3 Examination</li>
              <li>Responsible for the maintenance of company’s web site.</li>
            </ul>
          </h6>
          <hr />
          <h4>Education</h4>
          <hr />
          <h5>University of California Los Angeles</h5>
          <h5>Westwood, CA</h5>
          <h6>B.A. Psychology</h6>
          `)
        modalOpen = true;
        $(document).on("click", function(e){
          if((modalOpen === true) && ((e.target.id === "bgClouds" || e.target.id === "exitModal"))){
            $("#modalWrapper").css("display", "none");
              resumeRun();
              endGame();
          }
        })
        break;

        // default:
        // setTimeout(function(){
        //   resumeRun();
        //   setTimeout(function(){
        //     $("#block").attr("style", "display:none");
        //   }, 600)
        // }, 5000)
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
