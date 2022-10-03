let loanData = {
    monthlyIncome: null,
    proofIncome: null,
    loanRecord: null,
    startDate: null,
    propertyValue: null,
    propertyMaxValue: null,
    loanAmount: null,
    loanAmountMax: null,
    payment: null,
    downPayment: null,
    loanPeriod: null
}
let personalData = {
    name: null,
    lastName: null,
    email: null,
    phone: null
};
let address = {
    location: null,
    city: null
}
let cell = {
    Pago: [],
    PagoInteres: [],
    PagoCapital: [],
    PagoMensual: [],
    Saldo: []
}

let mortgageHtml =

    '<div class="profiler-option" id = "mortgageForm" >' +
    '    <div class="profiler-option__input-group">' +
    '        <label for="mortgageMonthlyPayment">¿Cuál es la mensualidad que estas pagando?</label>' +
    '        <input type="number" id="mortgageMonthlyPayment" min="6251" placeholder="Cantidad de tu mensualidad">' +
    '        <span class="alert">Ingresa un número</span>' +
    '    </div>' +
    '    <div class="profiler-option__input-group">' +
    '        <label for="mortgagePaymentPeriod">¿Cuánto llevas pagando tu hipoteca?</label>' +
    '        <select name="pets" id="mortgagePaymentPeriod">' +
    '            <option value="">--Seleccione--</option>' +
    '            <option value="mortgagePaymentPeriod1">Menos de 1 año</option>' +
    '            <option value="mortgagePaymentPeriod2">De 1 a 5 años</option>' +
    '            <option value="mortgagePaymentPeriod3">De 6 a 10 años</option>' +
    '            <option value="mortgagePaymentPeriod4">De 11 a 15 años</option>' +
    '        </select>' +
    '        <span class="alert">Selecciona una opción</span>' +
    '    </div>' +
    '    <div class="profiler-option__input-group">' +
    '        <label for="mortgageBank">¿Con qué banco tienes tu hipoteca?</label>' +
    '        <input type="text" id="mortgageBank" placeholder="Nombre de tu banco">' +
    '        <span class="alert">Escribe el nombre del banco</span>' +
    '    </div>' +
    '    <div class="profiler-option__input-group">' +
    '        <label for="mortgagePaymentPeriodLeft">¿Cuánto tiempo falta por pagar?</label>' +
    '        <select name="pets" id="mortgagePaymentPeriodLeft">' +
    '            <option value="">--Seleccione--</option>' +
    '            <option value="mortgagePaymentPeriodLeft1">1</option>' +
    '            <option value="mortgagePaymentPeriodLeft2">2</option>' +
    '            <option value="mortgagePaymentPeriodLeft3">3</option>' +
    '            <option value="mortgagePaymentPeriodLeft4">4</option>' +
    '            <option value="mortgagePaymentPeriodLeft5">5</option>' +
    '            <option value="mortgagePaymentPeriodLeft6">6</option>' +
    '            <option value="mortgagePaymentPeriodLeft7">7</option>' +
    '            <option value="mortgagePaymentPeriodLeft8">8</option>' +
    '            <option value="mortgagePaymentPeriodLeft9">9</option>' +
    '            <option value="mortgagePaymentPeriodLeft10">10</option>' +
    '            <option value="mortgagePaymentPeriodLeft11">11</option>' +
    '            <option value="mortgagePaymentPeriodLeft12">12</option>' +
    '            <option value="mortgagePaymentPeriodLeft13">13</option>' +
    '            <option value="mortgagePaymentPeriodLeft14">14</option>' +
    '            <option value="mortgagePaymentPeriodLeft15">15</option>' +
    '            <option value="mortgagePaymentPeriodLeft16">16</option>' +
    '            <option value="mortgagePaymentPeriodLeft17">17</option>' +
    '            <option value="mortgagePaymentPeriodLeft18">18</option>' +
    '            <option value="mortgagePaymentPeriodLeft19">19</option>' +
    '            <option value="mortgagePaymentPeriodLeft20">20</option>' +
    '        </select>' +
    '        <span class="alert">Selecciona una opción</span>' +
    '    </div>' +
    '</div > ';

const creditRate = 9.16;
const percentageMonthlyIncome = 40;

let form = document.forms['profilerForm'];

let target = document.querySelector('#profilerForm .profiler-form__right .profiler-form--inner');
let steps = document.querySelector('#profilerForm .profiler-form__steps');

let formType = 0;

const q0 = document.querySelectorAll('input[name="q0"]');
q0.forEach(item => {
    const valueOne = item.addEventListener('click', () => {
        console.log();
        if (item.value == 'q0a1') {
            formType = 0;
            nextPrev(1);
        }

        if (item.value == 'q0a2') {
            formType = 1;
            nextPrev(1);
        }
    });
});


var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("profiler-option");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Simular";
    } else {
        document.getElementById("nextBtn").innerHTML = "Continuar";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("profiler-option");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById('nameMessage').innerHTML += personalData.name + ' ' + personalData.lastName
        document.getElementById('profilerForm').style.display = 'none';
        document.getElementById('profilerMessage').style.display = 'flex';
        document.getElementById('propertyValueMessage').innerHTML += '$ ' + loanData.propertyValue;
        document.getElementById('loanAmountMessage').innerHTML += '$ ' + loanData.loanAmount;
        document.getElementById('monthlyPaymentMessage').innerHTML += '$ ' + cell.PagoMensual[0];
        if (formType == 0) {
            if (loanData.proofIncome == 'q2a4' || loanData.loanRecord == 'q3a4') {
                document.getElementById('btnData').remove();
                document.querySelector('#successMessage').innerHTML = '<p class="value-label">Un asesor se comunicará contigo a la brevedad.</p>';
                document.querySelector('.profiler-success__data').style.display = 'none';
                document.querySelector('#congratsMessage').innerHTML = 'Gracias ' + personalData.name + ' ' + personalData.lastName;
            }
            // Submit async back connection for property loans here 
        }
        if (formType == 1) {
            document.getElementById('profilerForm').style.display = 'none';
            document.getElementById('profilerContact').style.display = 'flex';
            document.getElementById('contactName').innerHTML += personalData.name + ' ' + personalData.lastName;
            // Submit async back connection for mortgage loans here
        }
    }
    if (formType == 0) {
        if (document.getElementById('mortgageForm') && document.getElementById('extraStep')) {
            document.getElementById('mortgageForm').remove();
            document.getElementById('extraStep').remove();
        }
    }
    if (formType == 1) {
        if (!document.getElementById('mortgageForm') && !document.getElementById('extraStep')) {
            target.innerHTML += mortgageHtml;
            steps.innerHTML += '<span class="step" id="extraStep"></span>';
        }
    }
    if (formType == 0 && currentTab == 3) {
        document.getElementById('creditDestiny').value = 'Comprar una casa';
    }
    if (formType == 1 && currentTab == 3) {
        document.getElementById('creditDestiny').value = 'Mejorar hipoteca';
    }
    if (currentTab == 3) {
        document.getElementById('imageContainerLeft').style.display = 'none';
        document.getElementById('dataContainerLeft').style.display = 'block';
        document.getElementById('propertyValue').value = loanData.propertyValue;
        document.getElementById('loanAmount').value = loanData.loanAmount;
        document.getElementById('loanPeriod').value = loanData.loanPeriod;
    }
    if (currentTab == 0) {
        window.location.reload();
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("profiler-option");
    w = x[currentTab].getElementsByTagName("input");
    y = x[currentTab].getElementsByTagName("input");
    z = x[currentTab].getElementsByTagName("select");

    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].parentNode.getElementsByClassName('alert')[0].style.display = 'block';
            valid = false;
        }
        if (y[i].value != '' && y[i].id == 'q1') {
            if (y[i].value <= 0 || y[i].value < 6249) {
                y[i].parentNode.getElementsByClassName('alert')[1].style.display = 'block';
                valid = false;
            }
            else {
                y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                    alert.style.display = 'none';
                });
                loanData.monthlyIncome = y[i].value;
                loanData.loanAmountMax = loanData.monthlyIncome * percentageMonthlyIncome;
            }
        }
        if (y[i].value != '' && y[i].id == 'q5') {
            if (y[i].value <= 250000) {
                y[i].parentNode.getElementsByClassName('alert')[0].style.display = 'block';
                return valid = false;
            }
            else {
                y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                    alert.style.display = 'none';
                });
                loanData.propertyValue = y[i].value;
                loanData.propertyMaxValue = loanData.propertyValue * .90;
            }
        }
        if (y[i].value != '' && y[i].id == 'q6') {
            if (y[i].value <= 250000) {
                y[i].parentNode.getElementsByClassName('alert')[0].style.display = 'block';
                valid = false;
            }
            if (y[i].value > loanData.loanAmountMax) {
                y[i].parentNode.getElementsByClassName('alert')[1].style.display = 'block';
                y[i].parentNode.getElementsByClassName('alert')[1].innerHTML = 'Tu monto de crédito máximo, basado en tus ingresos es de $' + loanData.loanAmountMax;

                if (y[i].value > loanData.propertyMaxValue) {
                    y[i].parentNode.getElementsByClassName('alert')[2].style.display = 'block';
                    y[i].parentNode.getElementsByClassName('alert')[2].innerHTML = 'Tu monto de crédito máximo, basado en el aforo de 90%, es de $' + loanData.propertyMaxValue;
                    return valid = false;
                }
                return valid = false;
            }
            if (y[i].value > loanData.propertyMaxValue) {
                y[i].parentNode.getElementsByClassName('alert')[2].style.display = 'block';
                y[i].parentNode.getElementsByClassName('alert')[2].innerHTML = 'Tu monto de crédito máximo, basado en el aforo de 90%, es de $' + loanData.propertyMaxValue;
                return valid = false;
            }
            else {
                y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                    alert.style.display = 'none';
                });
                loanData.loanAmount = y[i].value;
                loanData.downPayment = document.getElementById('q5').value - document.getElementById('q6').value;
                document.getElementById("downPayment").value = loanData.downPayment;
                valid = true;
            }
        }
        if (y[i].value != '' && y[i].id == 'name') {
            personalData.name = y[i].value;
            y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (y[i].value != '' && y[i].id == 'lastname') {
            personalData.lastName = y[i].value;
            y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (y[i].value != '' && y[i].id == 'email') {
            personalData.email = y[i].value;
            y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (y[i].value != '' && y[i].id == 'phone') {
            personalData.phone = y[i].value;
            y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (y[i].value != '' && y[i].id == 'city') {
            personalData.city = y[i].value;
            y[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (y[i].value != '' && y[i].id == 'mortgageMonthlyPayment') {
            personalData.mortgageMonthlyPayment = y[i].value;
        }
        if (y[i].value != '' && y[i].id == 'mortgageBank') {
            personalData.mortgageBank = y[i].value;
        }
    }
    for (i = 0; i < z.length; i++) {
        if (z[i].value == "") {
            z[i].parentNode.getElementsByClassName('alert')[0].style.display = 'block';
            valid = false;
        }
        if (z[i].value != '' && z[i].id == 'q2') {
            loanData.proofIncome = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (z[i].value != '' && z[i].id == 'q3') {
            loanData.loanRecord = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (z[i].value != '' && z[i].id == 'q4') {
            loanData.startDate = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (z[i].value != '' && z[i].id == 'q7') {
            cell.Pago = [];
            cell.PagoInteres = [];
            cell.PagoCapital = [];
            cell.PagoMensual = [];
            cell.Saldo = [];
            let tmp = loanData.loanAmount;
            loanData.loanPeriod = z[i].value;
            loanData.loanAmountValidation = PMT(((creditRate / 100) / 12), (loanData.loanPeriod * 12), -loanData.loanAmount, 0, 0).toFixed(2); let sum = 0
            for (let i = 1; i <= loanData.loanPeriod * 12; i++) {
                let ipmt = IPMT(((creditRate / 100) / 12), i, (loanData.loanPeriod * 12), -loanData.loanAmount, 0, 0);
                let ppmt = PPMT(((creditRate / 100) / 12), i, (loanData.loanPeriod * 12), -loanData.loanAmount, 0, 0);
                let mpmt = (ppmt + ipmt).toFixed(2);
                tmp = (tmp - ppmt).toFixed(2);
                cell.Pago.push(i.toString());
                cell.PagoInteres.push((ipmt).toFixed(2).toString());
                cell.PagoCapital.push((ppmt).toFixed(2).toString());
                cell.PagoMensual.push(mpmt.toString());
                cell.Saldo.push(tmp.toString());
            }
        }
        if (z[i].value != '' && z[i].id == 'location') {
            personalData.location = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (z[i].value != '' && z[i].id == 'mortgagePaymentPeriod') {
            personalData.mortgagePaymentPeriod = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
        if (z[i].value != '' && z[i].id == 'mortgagePaymentPeriodLeft') {
            personalData.mortgagePaymentPeriodLeft = z[i].value;
            z[i].parentNode.querySelectorAll('.alert').forEach(alert => {
                alert.style.display = 'none';
            });
        }
    }

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

function FV(rate, periods, payment, value, type) {
    var type = (typeof type === 'undefined') ? 0 : type;
    rate = eval(rate);
    var result;
    if (rate === 0) {
        result = value + payment * periods;
    } else {
        var term = Math.pow(1 + rate, periods);
        if (type === 1) {
            result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
        } else {
            result = value * term + payment * (term - 1) / rate;
        }
    }
    return -result;
}

function PMT(rate, periods, present, future, type) {
    var type = (typeof type === 'undefined') ? 0 : type;
    rate = eval(rate);
    var result;
    if (rate === 0) {
        result = (present + future) / periods;
    } else {
        var term = Math.pow(1 + rate, periods);
        if (type === 1) {
            result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
        } else {
            result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
        }
    }
    return -result;
}

function IPMT(rate, period, periods, present, future, type) {
    var type = (typeof type === 'undefined') ? 0 : type;
    rate = eval(rate);
    periods = eval(periods);
    var payment = PMT(rate, periods, present, future, type);
    var interest;
    if (period === 1) {
        if (type === 1) {
            interest = 0;
        } else {
            interest = -present;
        }
    } else {
        if (type === 1) {
            interest = FV(rate, period - 2, payment, present, 1) - payment;
        } else {
            interest = FV(rate, period - 1, payment, present, 0);
        }
    }
    return interest * rate;
}

function PPMT(rate, period, periods, present, future, type) {
    return PMT(rate, periods, present, future, type) - IPMT(rate, period, periods, present, future, type);
}


document.getElementById("q6").addEventListener("keyup", downpaymentAppend);

function downpaymentAppend() {
    loanData.downPayment = document.getElementById('q5').value - document.getElementById('q6').value;
    document.getElementById("downPayment").value = loanData.downPayment;
}

function generatePdf() {
    window.jsPDF = window.jspdf.jsPDF;
    let generateData = function (data) {
        let result = [];

        for (let i = 0; i < data.Pago.length; i++) {
            result.push(data['Pago'][i].toString());
            result[i] = {
                Pago: data['Pago'][i],
                PagoInteres: '$' + data['PagoInteres'][i],
                PagoCapital: '$' + data['PagoCapital'][i],
                PagoMensual: '$' + data['PagoMensual'][i],
                Saldo: '$' + data['Saldo'][i]
            }
        }

        result.push(data);

        return result;
    };

    function createHeaders(keys) {
        let result = [];
        for (let i = 0; i < keys.length; i++) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 65,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

    let headers = createHeaders([
        "Pago",
        "PagoInteres",
        "PagoCapital",
        "PagoMensual",
        "Saldo",
    ]);

    let doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });
    doc.table(1, 1, generateData(cell), headers, { autoSize: true });
    var pageCount = doc.internal.getNumberOfPages();
    doc.deletePage(pageCount);
    doc.save("tabla-amortizacion.pdf");
}

document.getElementById('btnData').addEventListener("click", generatePdf);