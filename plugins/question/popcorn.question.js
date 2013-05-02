(function (Popcorn, global ) {

   function continue_video(time) {
      Popcorn.instances.forEach( function( video ) {
         video.currentTime(time).play();
      });
   }

   Popcorn.plugin( "question" , {
      _setup : function( options ) {
         // setup code, fire on initialization
         // options refers to the options passed into the plugin on init
         // this refers to the popcorn object

         var target = document.getElementById( options.target ),
         qid = options.qid,
         questionType = options.questionType,
         question = options.question,
         alternatives = options.alternatives,
         answer = options.answer,
         jump_time = options.jump_time,
         start = options.start;         
         //TODO: validate all params

         // Create seperate container for plugin
         options._container = document.createElement( "div" );
         options._container.id = "questiondiv-" + Popcorn.guid();
         options._container.style.display = "none";

         var commonDiv = document.createElement("div");
         
         if (questionType === "multiple_choice") {

            commonDiv.innerHTML = question + "<br />";
            for (var i = 0, len = alternatives.length; i < len; i++) {
               var checkbox = document.createElement("input");               
               checkbox.setAttribute("type","checkbox");
               checkbox.setAttribute("id","question"+i+"-"+qid);
               checkbox.setAttribute("name","question");
               checkbox.setAttribute("value", alternatives[i]);
               commonDiv.appendChild(checkbox);
               commonDiv.innerHTML += alternatives[i] + "<br />";
            }
            var btn = document.createElement("input");
            btn.setAttribute("type","button");
            btn.setAttribute("value","Answer");
            btn.addEventListener( "click", function() {
               var correct = true;
               for (var i = 0; i < answer.length; i++) {
                 var id_str = "question"+i+"-"+qid;
                 var chckBox = document.getElementById(id_str);
                 if (chckBox.checked != answer[i]) {
                    correct = false;
                 }
               }
               if (correct) {
                  alert("Congratz! You got it!!! :)");
                  if (options.jump_time) {                                       
                     btnJump = document.createElement("input");
                     btnJump.setAttribute("type","button");
                     btnJump.setAttribute("id","buttonJump");
                     btnJump.setAttribute("value","Jump Solution");
                     btnJump.addEventListener( "click", function() {
                        continue_video(jump_time);
                        options._container.style.display = "none";
                     }, false);
                     commonDiv.appendChild(btnJump);
                  }
               }
               else {
                  alert("Sorry, it's incorrect. Try again :)");
               }                              
            }, false);
            commonDiv.appendChild(btn);            
         }
         if (questionType === "single_choice") {

            var commonDiv = document.createElement("div"); 

            commonDiv.innerHTML = question + "<br />";
            for (var i = 0, len = alternatives.length; i < len; i++) {
               var radio = document.createElement("input");               
               radio.setAttribute("type","radio");
               radio.setAttribute("id","question"+i+"-"+qid);               
               radio.setAttribute("name","question");
               radio.setAttribute("value", i);
               commonDiv.appendChild(radio);
               commonDiv.innerHTML += alternatives[i] + "<br />";
            }
            var btn = document.createElement("input");
            btn.setAttribute("type","button");
            btn.setAttribute("id","btnAnswer");
            btn.setAttribute("value","Answer");
            btn.addEventListener( "click", function() {
               var correct = false;
               var id_str = "question"+answer+"-"+qid;
               var radio = document.getElementById(id_str);
               if (radio.checked) {
                    correct = true;
               }               
               if (correct) {
                  alert("Congratz! You got it!!! :)");                  
                  if (options.jump_time) {
                     btnJump = document.createElement("input");
                     btnJump.setAttribute("type","button");
                     btnJump.setAttribute("id","buttonJump");
                     btnJump.setAttribute("value","Jump Solution");
                     btnJump.addEventListener( "click", function() {
                        continue_video(jump_time);
                        options._container.style.display = "none";
                     }, false);
                     commonDiv.appendChild(btnJump);
                  }
               }
               else {
                  alert("Sorry, it's incorrect. Try again :)");
               }                              
            }, false);
            commonDiv.appendChild(btn);
         }
         if (questionType === "numerical_answer") {
            var commonDiv = document.createElement("div"); 

            commonDiv.innerHTML = question + "<br />";

            var input = document.createElement("input");
            input.setAttribute("type","number");
            input.setAttribute("id","question-"+qid);               
            input.setAttribute("name","numanswer");
            commonDiv.appendChild(input);

            var btn = document.createElement("input");

            btn.setAttribute("type","button");
            btn.setAttribute("id","btnAnswer");
            btn.setAttribute("value","Answer");
            btn.addEventListener( "click", function() {
               var id_str = "question-"+qid;
               var input = document.getElementById(id_str);       
               if (input.value == answer) {
                  alert("Congratz!!! You got it!!! :)");                  
                  if (options.jump_time) {
                     btnJump = document.createElement("input");
                     btnJump.setAttribute("type","button");
                     btnJump.setAttribute("id","buttonJump");
                     btnJump.setAttribute("value","Jump Solution");
                     btnJump.addEventListener( "click", function() {
                        continue_video(jump_time);
                        options._container.style.display = "none";
                     }, false);
                     commonDiv.appendChild(btnJump);
                  }
               }
               else {
                  alert("Sorry, it's incorrect. Try again :)");
               }                              
            }, false);
            commonDiv.appendChild(btn);
         }
         btnContinue = document.createElement("input");
         btnContinue.setAttribute("type","button");
         btnContinue.setAttribute("value","Continue");
         btnContinue.addEventListener( "click", function() {
            continue_video(start);
            options._container.style.display = "none";
         }, false);
         commonDiv.appendChild(btnContinue);           
         options._container.appendChild( commonDiv );

         target && target.appendChild( options._container );
      },
      start: function( event, options ){
         // fire on options.start
         // event refers to the event object
         // options refers to the options passed into the plugin on init
         // this refers to the popcorn object
         if ( options._container ) {
            Popcorn.instances.forEach( function( video ) {
               video.pause();
            });         
            options._container.style.display = "";
         }
      },
      end: function( event, options ){
         // fire on options.end
         // event refers to the event object
         // options refers to the options passed into the plugin on init
         // this refers to the popcorn object
         if( options._container ) {
            options._container.style.display = "none";            
         }
      }    
   });
})(Popcorn, this );
