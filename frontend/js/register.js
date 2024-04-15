


let username, password;

window.addEventListener('load', async () => {


    const userInput = document.getElementsByName('uname')[0];
    const pwdInput = document.getElementsByName('pwd')[0];
    const submitBtn = document.querySelector('.register');

    const registerLink = document.querySelector('.loginbtn');


    registerLink.addEventListener('click', () => {
        window.location.href = '/login.html'
    })



    userInput.addEventListener('input', (e) => {

        username = e.currentTarget.value;
    })

    pwdInput.addEventListener('input', (e) => {

        password = e.currentTarget.value;
    })


    const handleLogin = async () => {
        const url = 'http://localhost:3500/register'


        try {
            const response = await axios.post(url, { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const message = document.querySelector('.message');

            message.textContent = 'Registration successful';
            message.style.color = 'green';
            console.log(response.data);

        } catch (error) {

            const status = error?.response?.status;

            if (status === 409) {
                const message = document.querySelector('.message');

                message.textContent = 'User with this username already exists';
                message.style.color = 'red';

            }


        }
    }


    submitBtn.addEventListener('click', async (e) => {

        e.preventDefault();
        await handleLogin();

    })








})