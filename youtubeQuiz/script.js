 $(document).ready(function(){

    var API_KEY="AIzaSyAEHX8Fv1RLEWVKWFzzk7QlB-2mb1RsvVo";

    var video= ''
  
    var playlistId = 'PLcHIy7MhWjmgA2YfyLc9kQpYOENBB9X_y';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var options = {
             part: 'snippet',
             key: API_KEY,
             maxResults: 20,
             playlistId: playlistId
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


   
    $('main').on('click', 'article', function (){
        var id = $(this).attr('data-key');
         

         $('#video').html(`
         <iframe width="560" height="315" 
         src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: block"></iframe>  
      `);
        
        
    
                

         //QUIZ CODE

        const quizBodyElement = document.getElementById('quiz-body')
        quizBodyElement.classList.remove('hide')
        const startButton = document.getElementById('start-btn')
        const nextButton = document.getElementById('next-btn')
        const enjoyButton = document.getElementById('enjoy-btn')
        enjoyButton.classList.add('hide')
        const questionContainerElement = document.getElementById('question-container')
        const questionElement = document.getElementById('question')
        const answerButtonsElement = document.getElementById('answer-buttons')
        let shuffledQuestions, currentQuestionIndex;

        startButton.addEventListener('click', startGame)

        nextButton.addEventListener('click', () => {
            currentQuestionIndex ++
            setNextQuestion()
        })

        
        enjoyButton.addEventListener('click', () => {
            currentQuestionIndex ++
           
            setNextQuestion()
            quizBodyElement.classList.add('hide')

        })


         function startGame(){

             console.log("Start Game")
             startButton.classList.add("hide");
             shuffledQuestions = questions.sort(() => Math.random() - .5)
             currentQuestionIndex=0
             questionContainerElement.classList.remove('hide')
            


             setNextQuestion()
         }

         function setNextQuestion(){
           
            resetState()
            showQuestion(shuffledQuestions[currentQuestionIndex])
         }

         function showQuestion(question){
             console.log(question)

            questionElement.innerText=question.question

            question.answers.forEach( answer =>{
                const button = document.createElement('button')
                button.innerText = answer.text
                button.classList.add('btn')

                if(answer.correct){
                    button.dataset.correct = answer.correct
                }

                button.addEventListener('click', selectAnswer)
                answerButtonsElement.appendChild(button)
            })
         }

         function resetState(){
            clearStatusClass(quizBodyElement)
             nextButton.classList.add('hide')
             enjoyButton.classList.add('hide')
            

             while(answerButtonsElement.firstChild){
                 answerButtonsElement.removeChild(answerButtonsElement.firstChild)

             }
         }

         function selectAnswer(e){
             const selectedButton = e.target
             const correct = selectedButton.dataset.correct
             
             if(correct){
                if(shuffledQuestions.length > currentQuestionIndex+1){
                    enjoyButton.classList.remove('hide')
                } else {

                    startButton.innerText = "Restart"
                    startButton.classList.remove('hide')
            
                }
                
              
            } else {
               
                if(shuffledQuestions.length > currentQuestionIndex+1){
                    nextButton.classList.remove('hide')
                } else {
                    startButton.innerText = "Restart"
                    startButton.classList.remove('hide')
            
                }
                
            }
                
          
            setStatusClass(quizBodyElement, correct)

             Array.from(answerButtonsElement.children).forEach(button => {
                 setStatusClass(button, button.dataset.correct)
             })
         }
        

         function setStatusClass(element, correct){
             clearStatusClass(element)

             if(correct) {
                 element.classList.add('correct')  
                
             }else {
                 element.classList.add('wrong')
             } 
         }

         function clearStatusClass(element){
             element.classList.remove('correct')
             element.classList.remove('wrong')
         }

    })

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
        question: "What is 3 + 3?",
        answers: [
            {text: '6', correct: true},
            {text: '33', correct: false}
        ]
    },
    {
        question: "What is 4 + 4?",
        answers: [
            {text: '8', correct: true},
            {text: '44', correct: false}
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
        question: "What is 4 + 4?",
        answers: [
            {text: '8', correct: true},
            {text: '44', correct: false}
        ]
    }
]

  