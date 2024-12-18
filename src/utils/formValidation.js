export const validateForm = (e) => {
    const requiredFields = e.target.querySelectorAll('[required]');
    const emailInput = e.target.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validated = [];
    [...requiredFields].map(input => {
        if(input.value === '') {
            input.parentNode.querySelector('.error.required').style.display = 'block';
            input.classList.add('invalid');
            validated.push(false);
        } else {
            input.parentNode.querySelector('.error.required').style.display = 'none';
            input.classList.remove('invalid');
        }
        if(input.type === 'checkbox') {
            if(!input.checked) {
                input.parentNode.querySelector('.error.required').style.display = 'block';
                input.classList.add('invalid');
                validated.push(false);
            } else {
                input.parentNode.querySelector('.error.required').style.display = 'none';
                input.classList.remove('invalid');
            }
        }
    });

    if(!emailRegex.test(emailInput.value)) {
        emailInput.parentNode.querySelector('.error.invalid').style.display = 'block';
        emailInput.classList.add('invalid');
        validated.push(false);
    } else {
        emailInput.parentNode.querySelector('.error.invalid').style.display = 'none';
        emailInput.classList.remove('invalid');
    }
    return !validated.includes(false);

};
