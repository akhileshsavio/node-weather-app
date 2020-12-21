// variables
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')
// Functions
const validateSpecialCharacters = () => {  
   const spclChars = `!@#$%\|/)(^&*_-+=-?:;}{][|,<>.` // specify special characters
   let input = search.value;
    for (let i = 0; i < input.length; i++)
    { if (spclChars.indexOf(input.charAt(i)) != -1)
        { messageOne.textContent = `Special characters are not allowed,
            use either alphabets or numbers to provide a location or pincode`
            search.value = "";
            return false;
        }
    }
}
const weatherFunction = (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading data....'
    messageTwo.textContent
    fetch(`/weather?address=${location}`).then((resp)=>{
        resp.json().then((data)=>{
            if (data.error){
            messageOne.textContent = data.error
            }else{
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
            }
        })
    })
}
// eventHandlers
search.addEventListener('input', validateSpecialCharacters);
weatherForm.addEventListener('submit', weatherFunction);    
      