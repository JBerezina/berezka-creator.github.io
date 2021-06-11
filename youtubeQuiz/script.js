 $(document).ready(function(){

    var API_KEY="AIzaSyAEHX8Fv1RLEWVKWFzzk7QlB-2mb1RsvVo";

    var video= ''
  
    var playlistId = 'PLcHIy7MhWjmgA2YfyLc9kQpYOENBB9X_y';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var options = {
             part: 'snippet',
             key: API_KEY,
             maxResults: 20,
             playlistId: playlistId,
             playerVars: {rel:0}
         }
         loadVids();
    
         function loadVids(){
             $.getJSON(URL, options, function(data){
                 console.log(data);
                 var id = data.items[0].snippet.resourceId.videoId; 
            
                 resultsLoop(data);

                 function resultsLoop(data) {

                             $.each(data.items, function(i, item){
                    
                                 var thumb = item.snippet.thumbnails.medium.url;
                                 var title=item.snippet.title;
                                 var desc = item.snippet.description.substring(0, 100);
                                 var vid=item.snippet.resourceId.videoId;
                                
                                 $('main').append(`
                                 <article class="item" data-key="${vid}">
                                         <img src="${thumb}"
                                         alt=""  class="thumb" />
                                         <div class="details">
                                             <h4>${title}</h4>
                                             <p>${desc}</p>
                                         </div>
                                         </article>
                                 `);
                             })
         }

        });
    }


    //SEARCH VIDEOS
    $("#form").submit(function(event){
        event.preventDefault()
        var search=$("#search").val()

        videoSearch(API_KEY, search, 10)
    })

    function videoSearch(key, search, maxResults){
        $("#video").empty()

        $("#videos").empty()

        $.get("https://www.googleapis.com/youtube/v3/search?key="+ key
        + "&type=video&part=snippet&maxResults="+ maxResults
         + "&q="+ search, function(data){
            
            console.log(data)

            data.items.forEach(item => {

                var thumb = item.snippet.thumbnails.medium.url;
                var title=item.snippet.title;
                var desc = item.snippet.description.substring(0, 100);
                var vid=item.id.videoId;
            

                video =`
                <article class="item" data-key="${vid}">
                    <img src="${thumb}"
                     alt=""  class="thumb" />
                     <div class="details">
                         <h4>${title}</h4>
                         <p>${desc}</p>
                     </div>
                     </article>
                `
                $("#videos").append(video)
                
            })
        })
   
    }
    const videoContainer = document.getElementById('video')
   
    $('main').on('click', 'article', function (){
       

        var id = $(this).attr('data-key');
         

         $('#video').html(`
         <iframe id="iframe" width="560" height="315"
         src="https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
          allowfullscreen style="display: block"></iframe>
      `);

      /* trying to  access the inside of iframe
      var iframe = document.getElementById('iframe');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      console.log(innerDoc);
      innerDoc.querySelectorAll('a').forEach( function (a){
        console.log(a);
        a.addEventListener("click", function(){ console.log("clicked on link"); });
      });
      */



    
     
         //QUIZ CODE

        const quizBodyElement = document.getElementById('quiz-body')
        //const startButton = document.getElementById('start-btn')
        const nextButton = document.getElementById('next-btn')
        const uvisibleContainer = document.getElementById('unvisible')
        uvisibleContainer.classList.add('unvisible')
        const questionContainerElement = document.getElementById('question-container')
        const questionElement = document.getElementById('question')
        const answerButtonsElement = document.getElementById('answer-buttons')
        let shuffledQuestions, currentQuestionIndex;

        nextButton.addEventListener('click', () => {
            answerButtonsElement.classList.remove('disable')
          
            clearStatusClass(quizBodyElement)
            console.log(currentQuestionIndex)
            //if it is last element of array 
            if(currentQuestionIndex == shuffledQuestions.length-1){
                currentQuestionIndex=0
            }else{
                currentQuestionIndex++
            }
            setNextQuestion()

        })

    startGame()

    function startGame(){
        answerButtonsElement.classList.remove('hide')
        resetState()
        clearStatusClass(quizBodyElement)
          console.log("Start Game")
          shuffledQuestions = questions.sort(() => Math.random() - .5)
          currentQuestionIndex = 0
          quizBodyElement.classList.remove('hide')
          questionContainerElement.classList.remove('hide')
          setNextQuestion()
        }

    function setNextQuestion(){
          showQuestion(shuffledQuestions[currentQuestionIndex])
      }

    function showQuestion(question) {

        //to reset quiz body before showing new question
        //to set it to default state before we set a new question
        resetState()
     
        questionElement.innerText = question.question


          //loop through our answers in array to show answers buttons to choose

          question.answers.forEach(answer => {
              const button = document.createElement('button')
              button.innerText = answer.text
              button.classList.add('btn')
                //if correct is true
              if (answer.correct){
                  button.dataset.correct = answer.correct

                  
              }

            //now we have some dataset on the button that set to true
            //if it was true, if it wasn't true, there is no dataset

            button.addEventListener('click', selectAnswer)

            //add this button to all our buttons
            answerButtonsElement.appendChild(button)
            //we need to clear this answer every time when we set next question
           })
      }

       //this function is going to reset
      // everything that is related to our QUIZBODY
    function resetState(){

        //wewill loop through all our children inside the answer elements
        // and if there is any button that left after previus question,
        // we need to remove it
        while(answerButtonsElement.firstChild){
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
      }
     
    function selectAnswer(e){
          //e-is selected button
          const selectedButton = e.target
          const correct =  selectedButton.dataset.correct
            //we need to set atetus class of our body
          setStatusClass(quizBodyElement, correct)
          //than loop through all our buttons and set the class for them

          Array.from(answerButtonsElement.children).forEach(button => { 
            console.log(button.dataset.correct)
            setStatusClass(button, button.dataset.correct)   
          })
            showVideo(selectedButton.dataset.correct)
      }

    function showVideo(correct){

          //than we will see if it is correct

         if(correct){
             console.log("Video is playing")
                quizBodyElement.classList.add('hide')
                // uvisbleContainer.classList.remove('hide')


            
               

         } else {
                nextButton.classList.remove('hide')
                answerButtonsElement.classList.add('disable')       
         }
       
         console.log("AFTER ELSE")
      }

      //this function will set just add CSS class
      //WRONG or CORRECT classes to selected elements
    function setStatusClass(element, correct){
          //first we need to clear any status class that we have
          clearStatusClass(element)
          //than we will see if it is correct
          if(correct){
              element.classList.add('correct')
          } else {
            element.classList.add('wrong')

          }

      }

      //this function will remove any WRONG or CORRECT CSS classes 
    function clearStatusClass(element){
        element.classList.remove('correct')
        element.classList.remove('wrong')
      }
    })

    /* WRONG: Cannot access elements inside iframe this way
    $('iframe').on('click', function (event){

        event.preventDefault();
        let redirect = $(this).attr('href');
        console.log(redirect);

        $.ajax({
            url: $(this).attr('href'),
            success : function(data){
                                $('#login-loader').hide();
                                        location.reload(true);
                            },
                            error   : function(){
                                $('#error-login').replaceWith('<div id="error-login" class="msg fail"><p>Une erreur a été rencontrée lors du deconnexion!</p></div>');
                            }
                        });



    }) */

})


const questions= [
    {
        question: "What is 2 + 2?",
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: "What is 3 + 2?",
        answers: [
            {text: '5', correct: true},
            {text: '32', correct: false}
        ]
    },
    {
        question: "What is 3 + 3?",
        answers: [
            {text: '6', correct: true},
            {text: '33', correct: false}
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    }

]

  