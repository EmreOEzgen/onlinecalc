const txtfield = document.getElementById('NumField');
const buttons = document.getElementsByTagName('button');

let input = '';
let Rinput = '';
let output;
let toBeAdded = '';

const numbers = '1234567890';
const operators = '+-*/'

const calculate = () => {
    input = txtfield.value;
    let isSimple = true;
    let parCounter = 0;
    let index = 0;


    for (let idx = input.length - 1; idx >= 0; idx--) {
        if (input[idx] === ')') {
            parCounter++;
        }
        if (input[idx] === '(') {
            parCounter--;
        }
        if (parCounter === 0 && operators.includes(input[idx]) && input[idx - 1] !== '(') {
            index = idx;
            isSimple = false;
            toBeAdded = '';
        }
        if (isSimple === false) {
            break;
        }
    }
    
    if (operators.includes(input[index])) {
        for (let idx = index; idx < input.length; idx++) {
        toBeAdded += input[idx];
        }
    }

    if (isSimple === true) {
        input += toBeAdded;
    }

    try {
        Rinput = input;
        output = eval(input);
        txtfield.value = output;
    } catch {
        txtfield.value = 'ERROR';
    }
    
}




txtfield.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
})

txtfield.focus();


for (let i=0; i<buttons.length; i++) {
    
    buttons[i].addEventListener('click', () => {
        
        let dot = false;
        
        for (let e=0; e<txtfield.value.length; e++) {
            if (txtfield.value[e] === '.') {
                dot = true;
            }
            if (operators.includes(txtfield.value[e])) {
                dot = false;
            }
        }
        
        let parenthCounter = 0;

        for (let e=0; e<txtfield.value.length; e++) {
            if (txtfield.value[e] === '(') {
                parenthCounter++;
            }
            if (txtfield.value[e] === ')') {
                parenthCounter--;
            }
        }

        if (buttons[i].innerHTML === '=') {
            calculate();
        } 
        
        if (buttons[i].innerHTML === 'X') {
            if (numbers.includes(txtfield.value[txtfield.value.length - 1]) || txtfield.value[txtfield.value.length - 1] === ')') {
                txtfield.value += '*';
            }
        } 

        if (buttons[i].innerHTML === '/') {
            if (numbers.includes(txtfield.value[txtfield.value.length - 1]) || txtfield.value[txtfield.value.length - 1] === ')') {
                txtfield.value += '/';
            }
        } 

        if (numbers.includes(buttons[i].innerHTML)) {
            txtfield.value += buttons[i].innerHTML;
        }

        if (buttons[i].innerHTML === 'C') {
            txtfield.value = '';
            input = '';
            toBeAdded = '';
            Rinput = '';
        }

        if (buttons[i].innerHTML === 'DEL') {
            txtfield.value = txtfield.value.substring(0, txtfield.value.length - 1);
        }

        if (buttons[i].innerHTML === '+') {
            if (numbers.includes(txtfield.value[txtfield.value.length - 1]) || txtfield.value[txtfield.value.length - 1] === ')' 
                || txtfield.value[txtfield.value.length - 1] === '(' || txtfield.value === '') {
                txtfield.value += '+';
            }
        }

        if (buttons[i].innerHTML === '-') {
            if (numbers.includes(txtfield.value[txtfield.value.length - 1]) || txtfield.value[txtfield.value.length - 1] === ')' 
                || txtfield.value[txtfield.value.length - 1] === '(' || txtfield.value === '') {
                txtfield.value += '-';
            }
        }

        if (buttons[i].innerHTML === '.') {
            if (numbers.includes(txtfield.value[txtfield.value.length - 1]) && dot === false) {
                txtfield.value += '.';
            }
            if ((txtfield.value === '' || operators.includes(txtfield.value[txtfield.value.length - 1]) 
                || txtfield.value[txtfield.value.length - 1] === '(') && dot === false) {
                txtfield.value += '0.';
            }
        }

        if (buttons[i].innerHTML === '( )') {
            if (txtfield.value === '' || operators.includes(txtfield.value[txtfield.value.length - 1]) 
            || txtfield.value[txtfield.value.length - 1] === '(') {
                txtfield.value += '(';
            }
            if (parenthCounter === 0 && numbers.includes(txtfield.value[txtfield.value.length - 1]) || 
            parenthCounter === 0 && txtfield.value[txtfield.value.length - 1] === ')') {
                txtfield.value += '*(';
            }
            if (parenthCounter > 0 && !operators.includes(txtfield.value[txtfield.value.length - 1]) && txtfield.value[txtfield.value.length - 1] !== '(') {
                txtfield.value += ')';
            }

        }

        if (buttons[i].innerHTML === 'R') {
            txtfield.value = Rinput;
        }

        txtfield.scrollLeft = txtfield.scrollWidth
        txtfield.focus();

    })
}



