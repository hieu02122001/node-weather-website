console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#mess-1')
const message2 = document.querySelector('#mess-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();//Prevent the web reload after submit
    
    const location = search.value;
    
    message1.textContent = 'Loading...';
    message2.textContent - '';
    fetch('/weather?address=' + location +'').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error;
            message2.textContent = '';
        } else {
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    })
})
})