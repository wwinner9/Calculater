/* Dev- Fernando Wanda 
|_________________________________________
| My social Midea
|   GitHub : Wwinner9 
|   FaceBook : fernando Wwinner
|   Gmail : fernandowwinner.97@gmail.com 
|   Linkedin : Fernando Wanda
|_________________________________________
*/


// Some SetUps 

    //assign the variable $ with the document.querySelector
    const $= document.querySelector.bind(document)
    const c = console.log

// Variables
    const screen = $('#screen')
    const result = $('#result')
    const numberArray= [0,1,2,3,4,5,6,7,8,9,',']
    const opArray =['+','%','/','*','-']   
    const aMode= $('.mode a')
    const alertRing=$('.alert')
     
// Listen

    function Listener(){
        $('.mainControl').addEventListener('click', validateInput)
        $('#calculate').addEventListener('click', calculate)
        $('#btnBack').addEventListener('click', backSpace)
        $('#cleaAll').addEventListener('click', CleanUp)
        $('.mode').addEventListener('click', changeMode)
        aMode.addEventListener('click', startUpa)

    }
    
    Listener()

// Functions

    //Function to validate the first input in the screen
    function validateInput(e){

        let digit= e.target;
        let screenValue= screen.textContent; 

        //verify if the function is empty
        if(digit.classList.contains('digits')){
            addToScreen(digit.textContent)            

            alertRing.style.backgroundColor='#28e26f'

        }else if (digit.classList.contains('op')){

            let op =digit.getAttribute('data-op')

            //In case of the Screen isn't empty the op will be added
            if(screenValue.length>0){

                //Invoke the add Function
                addToScreen(op)

            }else{
                //if the screen is empty it will verify is the digit is menus(-) calling the bellow func
                exceptionMenos(op)

            }
        }

    }

    //Function to add digits on the Screen
    function addToScreen(digit){

        let lastValue= getLastdigit()
        
        //Verify if it's a Number or op (-)
        if(!isNaN(digit) || digit=='.'){
            //if the digit is a number (!isNaN) or op(-) it will be added 
            screen.textContent += digit

        }else if(opArray.includes(digit)){

            //verify if the code is included in opArray[+,-,*,/]
            if(opArray.includes(lastValue)){
                
                //Invoke the function to replace the op to new op
                replaceOp(digit)
                //c(lastValue)
                
            }else if(lastValue==''){
                //in case of being empty it will add the op (-)
                screen.textContent += digit
                alertRing.style.backgroundColor='#28e26f'
            }else{
                //in others case  if the last digit is a number it will add the op
                screen.textContent+=digit
            }

            
        }
        
    }

    //Funtion to verify if the input digit is menos
    function exceptionMenos(digit){

        let op = digit
        op=='-'? addToScreen(op) : error()
    }

    //Function to get the last added digit
    function getLastdigit(){
        let screenValue=screen.textContent
        

        let last = screenValue.slice(-1)

        return last

    }
    
    //Function to Remove the last element
    function remLast(){

        let screenValue= screen.textContent

        return screenValue.slice(0, -1)

    }

    //Function to replace the last added op to a new
    function replaceOp(op){

        const theScreenWithoutLast=remLast()

        //Change The Screen Value replaced the op 
        screen.textContent=theScreenWithoutLast .concat(op)

    }

    //Function to backSpace 
    function backSpace(){
        screen.textContent=remLast()

    }

    //Function to CleanUP
    function CleanUp(){
        screen.textContent=''
        result.textContent=''
    }

    //Function to Calculate With Eval
    function calculate(){

        //Eval is a JS function that permit to Evaluate the js code 
        result.textContent= eval(screen.textContent)
    }

    //Function to change the Mode
    function changeMode(e){
        target= e.target
        const changeFontColor= document.querySelectorAll('.mode-f'),
            changeBackground= document.querySelectorAll('.mode-b')

        if(target.getAttribute('id')=='dark'){

            target.parentElement.parentElement.querySelectorAll('a i').forEach(element => {
                element.style.color='gray'
            });

            target.style.color='white'
            changeBackground.forEach(el =>{
                el.classList.replace('light-mode-b', 'slowMotion')
            })   
            changeFontColor.forEach(el =>{
                el.classList.remove('light-mode-f')
            }) 

        }else if(target.getAttribute('id')=='light'){

            let itenss=target.parentElement.parentElement.querySelectorAll('a i').forEach(element => {
                element.style.color='gray'
            });

            target.style.color='white'
            changeBackground.forEach(iten =>{
                iten.classList.add('light-mode-b')
            })
            changeFontColor.forEach(iten =>{
                iten.classList.add('light-mode-f')
            })
        }
    }

    //Function Bad Injection 
    function error(){
        
        let alertRing=$('.alert')
        alertRing.style.background='none'
        setTimeout(() => {
            alertRing.style.backgroundColor='red'
            setTimeout(() => {
                alertRing.style.background='none'
                setTimeout(() => {
                    alertRing.style.background='red'
                }, 100);
            }, 100);
        }, 250);
    }

    //Function to Start the a of the darkMode Clicked
    function startUpa(){
        aMode.style.color='white'
    }
 

    // Onload Click in that Element
    (function(){
        aMode.click()
    })()




    