


let username, password;

window.addEventListener('load', async () => {


    const userInput = document.getElementsByName('uname')[0];
    const pwdInput = document.getElementsByName('pwd')[0];
    const submitBtn = document.querySelector('.login');
    const registerLink = document.querySelector('.registerbtn');


    registerLink.addEventListener('click', () => {
        window.location.href = '/register.html'
    })




    userInput.addEventListener('input', (e) => {

        username = e.currentTarget.value;
    })

    pwdInput.addEventListener('input', (e) => {

        password = e.currentTarget.value;
    })


    const handleLogin = async () => {
        const url = 'http://localhost:3500/auth'


        try {
            const response = await axios.post(url, {
                username, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);

            const accessToken = response.data.accessToken;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                window.location.href = '/';
            }

        } catch (error) {

            const status = error?.response?.status;

            if (status === 403) {

                console.log('Unathorized');
                const message = document.querySelector('.message');
                message.textContent = 'Wrong username/password';
                message.style.color = 'red';

            }


        }
    }


    submitBtn.addEventListener('click', async (e) => {

        e.preventDefault();
        await handleLogin();

    })








})