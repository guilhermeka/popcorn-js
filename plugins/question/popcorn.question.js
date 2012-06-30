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
         questionType = options.questionType,
         question = options.question,
         alternatives = options.alternatives,
         answer = options.answer,
         jump_time = options.jump_time;

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
               checkbox.setAttribute("id","question"+i);
               checkbox.setAttribute("name","question"+i);
               checkbox.setAttribute("value", alternatives[i]);
               commonDiv.appendChild(checkbox);
               commonDiv.innerHTML += alternatives[i] + "<br />";               
               // commonDiv.innerHTML += 
               //    '<input type="checkbox" name="question" value=""/>' 
               //    + alternatives[i] + "<br />";
            }
            var btn = document.createElement("input");
            btn.setAttribute("type","button");
            btn.setAttribute("value","Answer");
            btn.addEventListener( "click", function() {
               var correct = true;
               for (var i = 0; i < answer.length; i++) {
                 var id_str = "question"+i;
                 var chckBox = document.getElementById(id_str);
                 if (chckBox.checked != answer[i]) {
                    correct = false;
                 }
               }
               if (correct) alert("Correct, congratz!");
               else alert("Sorry,its incorrect. Try again :)");
               options._container.style.display = "none";
               continue_video(10);
            }, false);
            commonDiv.appendChild(btn);            
            options._container.appendChild( commonDiv );
         }       
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