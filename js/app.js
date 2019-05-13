//autofocus on first text input when page loads
$('#name').focus();

//create additional text input field when "other" is selected from drop-down list
const $otherTitle = $('#other-title');
$otherTitle.hide();

$('#title').after($otherTitle);

$('#title').on('click', () => {if($('#title option:selected').val() === "other") {
    $otherTitle.show();
} else {
    $otherTitle.hide();
}
})

//show only the t-shirt color options that match the design selected in the "Design" menu
$('#design > option').first().attr('disabled', true);

//store designs in separate arrays for later access
const jsPuns = [$('#color option[value="cornflowerblue"]'), $('#color option[value="darkslategrey"]'), $('#color option[value="gold"]')];
const jsHeart = [$('#color option[value="tomato"]'), $('#color option[value="steelblue"]'), $('#color option[value="dimgrey"]')];
$('#color').hide();
$('#color').prev().hide();

//add event listener to design field to show the colors corresponding to the design selected on click
//if JS Puns is selected

$('#design').on('click', () => {if($('#design option:selected').val() === "js puns") {
        for(let i = 0; i < jsPuns.length; i++){
            jsPuns[i].show();
            jsHeart[i].hide();
            $('#color').show();
            $('#color').prev().show();
        }
        $('#color:selected').attr("selected", false);
        jsPuns[0].attr("selected", true);

//if I <3 JS is selected

    } else if($('#design option:selected').val() === "heart js") {
        for(let i = 0; i < jsHeart.length; i++){
            jsPuns[i].hide();
            jsHeart[i].show();
            $('#color').show();
            $('#color').prev().show();
        }
        $('#color option:selected').attr("selected", false);
        jsHeart[0].attr("selected", true);

//if neither design is selected

    } else {
        $('#color option:selected').attr("selected", false);
        jsPuns[0].attr("selected", true);
        $('#color option').show();
        $('#color').hide();
        $('#color').prev().hide();
    }
}
)

//prevent clashes in activities and workshops, and display total price
const morningActivities = [$('[name="js-frameworks"]'), $('[name="express"]'), $('[name="build-tools"]')];
const afternoonActivities = [$('[name="js-libs"]'), $('[name="node"]'), $('[name="npm"]')];
const conference = [$('[name="all"]')];
let workshopsSelected = [];
let conferenceSelected = [];
let priceP = $('<p id="price"></p>');
$('.activities').append(priceP);

//prevent selection of multiple morning sessions and multiple afternoon sessions

function activityArrays(array) {
    switch(true) {
        case array[0].prop('checked'):
            array[1].attr('disabled', true);
            array[2].attr('disabled', true);
            workshopsSelected.push(array[0]);
            break;
    
        case array[1].prop('checked'):
            array[0].attr('disabled', true);
            array[2].attr('disabled', true);
            workshopsSelected.push(array[1]);
            break;
    
        case array[2].prop('checked'):
            array[0].attr('disabled', true);
            array[1].attr('disabled', true);
            workshopsSelected.push(array[2]);
            break;
        
        default: for(let i = 0; i < array.length; i++) {
            array[i].removeAttr('disabled');
            array[i].removeAttr('disabled');
        }
    }
}

$('.activities').on('click', () => {
    workshopsSelected = [];
    activityArrays(morningActivities);
    activityArrays(afternoonActivities);

//handle conference being selected for the purpose of updating total price

    conferenceSelected = [];
    if(conference[0].prop('checked') == true){
        conferenceSelected.push(conference);
    }

//calculate total price and append to DOM

    let totalPrice = workshopsSelected.length * 100 + conferenceSelected.length * 200;
    document.querySelector('#price').innerHTML = 'Total Price: $' + totalPrice;
})

//payment method

//select 'credit card' by default and hide PayPal and Bitcoin information
$('[value="select_method"]').attr('disabled', true);

$('[value="credit card"]').attr('selected', true);

const paypal = $('#credit-card').next().hide();

const bitcoin = $('#credit-card').next().next().hide();

//show fields based on chosen payment method

$('#payment').on('click', () => {
    if($('[value="paypal"]').prop('selected') == true) {
        $('#credit-card').hide();
        bitcoin.hide();
        paypal.show();
    } else if($('[value="bitcoin"]').prop('selected') == true) {
        $('#credit-card').hide();
        paypal.hide();
        bitcoin.show();
    } else {
        paypal.hide();
        bitcoin.hide();
        $('#credit-card').show();
    }
})

//form field validation
function missingFieldMessage (field, element) {
    const fieldMissing = ($('<p style="color: red; position: absolute">Please enter ' + field + '</p>'));
    fieldMissing.attr('id', field.length);
    fieldMissing.css('visibility', 'hidden');
    let id = '#' + element.prop('id');
    $(id).after(fieldMissing);
}

//messages to prompt user to complete missing fields

missingFieldMessage('your name', $('#name'));
missingFieldMessage('a valid email address', $('#mail'));
missingFieldMessage('your credit card number', $('#cc-num'));
missingFieldMessage('a credit card number with 13-16 digits', $('#cc-num'));
missingFieldMessage('a valid 5-digit zip code', $('#zip'));
missingFieldMessage('your CVV number', $('#cvv'));

//display error message dynamically depending on which field is missing

function errorMessage(field) {
    $('#submit').attr('type', 'button');
    let id = '#' + field.prop('id');
    $('input').css("border", "0px");
    $(id).css('border', '2px solid red');
    $('p:visible').css('visibility', 'hidden');
}

function validateFormFields() {
switch(true) {

//no name entered

    case $('#name').val() == '':
    errorMessage($('#name'));
    $('#9').css('visibility', 'visible');
    break;

//validate email field using a regular expression

    case !(/[^@]+@[^\.]+\..+/.test($('#mail').val())):
    errorMessage($('#mail'));
    $('#21').css('visibility', 'visible');
    break;

//no credit card number entered

    case $('#cc-num').val() === '':
    errorMessage($('#cc-num'));
    $('#23').css('visibility', 'visible');
    break;

//validate credit card number using a regular expression

    case !(/^(\d{13}|\d{14}|\d{15}|\d{16})$/.test($('#cc-num').val())) && $('#cc-num').val() !== '':
    errorMessage($('#cc-num'));
    $('#38').css('visibility', 'visible');
    break;

//validate zipcode using a regular expression

    case !(/^\d{5}$/).test($('#zip').val()):
    errorMessage($('#zip'));
    $('#24').css('visibility', 'visible');
    break;

//validate credit card security code using a regular expression

    case !(/^\d{3}$/).test($('#cvv').val()):
    errorMessage($('#cvv'));
    $('#15').css('visibility', 'visible');
    break;

//remove red border in default case

    default: 
    $('#submit').attr('type', 'submit');
    $('p:visible').css('visibility', 'hidden');
    $('input').css("border", "0px");
}
}

$('#submit').on('click', () => {
    validateFormFields();
})

//real time error messages on key press

document.addEventListener('keyup', (e) => {
    validateFormFields();
});