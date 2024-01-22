

async function copyContent()
{

    try
    {
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText='Copied';

    }
    catch(e)
    {
      copyMsg.innerText='Failed';
    }

    copyMsg.classList.add('active');


    setTimeout((e)=>
   { 
       copyMsg.classList.remove('active');
   },2000);

}

let copyMsg=document.addEventListener('click',copyContent);
if(passwordDisplay.value)
{
    copyContent();
}

function setindicator(color)
{
    indicator.style.backgroundColor=color;
}


function calculatestrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbols=false

    if(uppercaseCheck.checked){hasUpper=true};
    if(lowercaseCheck.checked){hasLower=true};
    if(numbercaseCheck.checked){hasNumber=true};
    if(symbolsCheck.checked){hasSymbols=true};


    if((hasUpper && hasLower)||(hasSymbols||hasNumber) && passwordLength>=8)
    {
        setindicator("#f");   
    }
    else
    {
        if((hasUpper || hasLower) && (hasNumber || hasSymbols)&& passwordLength>=6)
        {
            setindicator("");
        }
        else
        {
            setindicator("");
        }
    }

}

function handleSlider()
{
    inputSlider=passwordLength;

}


inputSlider.addEventListener('input',(e)=>
{
   passwordLength=e.target.value;
   handleSlider();
});




function handlecheckboxchange()
{
    checkCount=0;

    allCheckBox.forEach(checkbox)
    {
        if(checkbox.checked)
        {
            checkCount++;
      }
    }
  

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach(checkbox)
{
    checkbox.addEventListener('change',handlecheckboxchange);
}

function shufflePassword(array)
{
    for(let i=array.length-1;i>=0;i--)
    {
        const j= Math.floor(Math.random()*(i+1));

        let temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

     let  pass="";

     array.forEach((el)=>(pass+el));
     return pass;


    
}

generateBTn.addEventListener('click',(e)=>
{
    if(checkCount<=0)
    {
        return;
    }
   

    let funcarr=[];
    password="";

    if(uppercaseCheck.checked)
    {
        funcarr.push(generateUppercase);
        
    }
    if(lowercaseCheck.checked)
    {
        funcarr.push(generateLowercase);
        
    }
    if(numbercaseCheck.checked)
    {
        funcarr.push(generateRandomNumber);
        
    }
    if(symbolsCheck.checked)
    {
        funcarr.push(generatSymbol);
        
    }


    for(let i=0;i<funcarr.length;i++)
    {
        password+=funcarr[i]();
    }


    for(let i=0;i<passwordLength-funcarr.length;i++)
    {
        let randNum=generateRandomNumber(0,funcarr.length);

        password+=funcarr[randNum]();
    }


    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;

    calculatestrength();


});


