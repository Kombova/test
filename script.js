const burger_icon_button = document.querySelectorAll('.burger_nav');
const nav = document.querySelector("nav");
const cancal_icon = document.querySelectorAll('.cancel_button');
const progressBar = document.querySelector('.progress_bar_strip');
const nextButton = document.querySelector('.next_button');

const selected = document.querySelectorAll('.selected');
const select_blocks = document.querySelectorAll('.select_block');

const loadText = document.querySelector('.load_text');
const timerElement = document.getElementById("timer");
const viewTest = document.querySelectorAll('.view_test');
const testBlock = document.querySelector('.test_block');
const homePage = document.querySelector('.home_page');
const call = document.querySelector('.call');

const navUl = document.querySelectorAll('.nav_ul');
let test_result;

let iteratorSubmitNextButton = 1;
let iProgressBar = 0;
/* Nav controle */
burger_icon_button.forEach((item)=>{
    item.addEventListener('click',(event)=>{
        item.nextElementSibling.style.display='block';
        document.body.style.overflow = "hidden";
    });
    
});

cancal_icon.forEach((item)=>{
    item.addEventListener('click',(event)=>{
        item.offsetParent.style.display='none';
        document.body.style.overflow = "";
    })
})
let i = 0;
navUl.forEach((item)=>{
    i+1;

    item.childNodes.forEach((select)=>{
        select.addEventListener('click',(event)=>{
            console.dir(event.target.outerText)
            if(event.target.outerText === 'ГЛАВНАЯ'){
                document.querySelector(`.test_${iteratorSubmitNextButton}`).style.display='none';

                homePage.style.display='block';
            }else if(event.target.outerText === 'ИНФОРМАЦИЯ О ТЕСТЕ'){
                document.querySelector(`.test_${iteratorSubmitNextButton}`).style.display='none';
                homePage.style.display='block';
            }else{
                
            }
            testBlock.style.display='none';
            item.parentElement.style.display='none';
            document.body.style.overflow = "";
            iteratorSubmitNextButton=1;
        })
    })
})

    
    selected.forEach(element => {     
        element.addEventListener('click',(event)=>{
            let target = event.target;
            test_result = target.value;
        
            selected.forEach((target)=>{
                target.labels[0].style.background='';
                target.labels[0].children[2].style.select_block='';
            })
            target.labels[0].style.background='#FFC700';
            target.labels[0].children[2].style.select_block='black';
            nextButton.disabled = false;
            nextButton.style.background='#FFC700';
        })
        
    });

select_blocks.forEach((item)=>{
    item.addEventListener('click',(event)=>{
        let target = event.target;
        test_result = target.children[0].value;
        select_blocks.forEach((target)=>{
            target.style.border='';
        })
        
        target.style.border='2px solid #FFC700';
        nextButton.disabled = false;
        nextButton.style.background='#FFC700';

    })
})


    nextButton.addEventListener('click',(event)=>{
        let target = event.target;
        localStorage.setItem(`test_${iteratorSubmitNextButton}`, `${test_result}`);
        if(iteratorSubmitNextButton === 11){
            iProgressBar=100;
            document.querySelector(`.test_${iteratorSubmitNextButton-1}`).style.display='none' 
            document.querySelector(`.results`).style.display='flex';
            progressBar.style.width = `${iProgressBar}%`;
            nextButton.style.display='none';

             
            const interval = setInterval(()=>{
                loadText.textContent += '.';
            },100)

            setTimeout(() => {
                clearInterval(interval);
                document.querySelector('.results').style.display= 'none';
                document.querySelector('.final').style.display='block';
              }, 2000);
        }
        iteratorSubmitNextButton += 1;
        document.querySelector(`.test_${iteratorSubmitNextButton - 1}`).style.display='none' ;
        document.querySelector(`.test_${iteratorSubmitNextButton}`).style.display='flex';
        target.disabled = true;
        nextButton.style.background='';

        iProgressBar += 9;
        
        progressBar.style.width = `${iProgressBar}%`;
    })
    
// timer
    
let timeLeft = 600000;

let timerInterval = setInterval(function() {

  let minutesLeft = Math.floor(timeLeft / 60000);
  let secondsLeft = Math.floor((timeLeft % 60000) / 1000);

  if (secondsLeft < 10) {
    secondsLeft = "0" + secondsLeft;
  }

  timerElement.innerHTML = minutesLeft + ":" + secondsLeft;

  timeLeft -= 1000;

  if (timeLeft < 0) {
    clearInterval(timerInterval);
    timerElement.innerHTML = "Время вышло!";
  }

}, 1000);

viewTest.forEach((item)=>{
    item.addEventListener('click',()=>{
        homePage.style.display = 'none';
        testBlock.style.display = 'block';
    })
})

call.addEventListener('click',()=>{
    const newDiv = document.createElement("div");
    newDiv.style.backgroundColor = "blue";
    newDiv.style.color = "white";
    newDiv.style.padding = "10px";
    newDiv.style.display = "block";
    newDiv.style.width = "100%";
    newDiv.style.height = "auto";
    newDiv.style.margin = "10px auto";
    newDiv.style.overflow = "hidden";
    newDiv.classList.add('viewApi')
   
   async function viewApiData() {
   let  fetchData ;
    await fetch('https://swapi.dev/api/people/1/')
        .then(response => response.json())
        .then(data => {
            fetchData = data
        })
        .catch(error => console.error(error));
        
    console.log(fetchData);
    
        let text;
        for (const key in fetchData) {
            if (fetchData.hasOwnProperty(key) && fetchData[key] !== undefined) {
                console.log(key,fetchData[key]);
                text +=`${key} : ${fetchData[key]}<br/>`;
              }
            
            
        }

        
        // const newText = document.createTextNode(`${text}`);
        
        newDiv.innerHTML=`${text}`;
        document.querySelector('.final').appendChild(newDiv);
    }
    viewApiData()
})
