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
  minDownPayment: null,
  loanPeriod: null,
};
let personalData = {
  name: null,
  lastName: null,
  email: null,
  phone: null,
};
let address = {
  location: null,
  city: null,
};
let cell = {
  Pago: [],
  PagoInteres: [],
  PagoCapital: [],
  PagoMensual: [],
  Saldo: [],
};

let mortgageHtml =
  '    <div class="profiler-option__input-group">' +
  '        <label for="mortgageMonthlyPayment">¿Cuál es la mensualidad que estas pagando?</label>' +
  '        <input type="number" id="mortgageMonthlyPayment" min="6251" placeholder="Cantidad de tu mensualidad">' +
  '        <span class="alert">Ingresa un número</span>' +
  "    </div>" +
  '    <div class="profiler-option__input-group">' +
  '        <label for="mortgagePaymentPeriod">¿Cuánto llevas pagando tu hipoteca?</label>' +
  '        <select name="pets" id="mortgagePaymentPeriod">' +
  '            <option value="">--Seleccione--</option>' +
  '            <option value="mortgagePaymentPeriod1">Menos de 1 año</option>' +
  '            <option value="mortgagePaymentPeriod2">De 1 a 5 años</option>' +
  '            <option value="mortgagePaymentPeriod3">De 6 a 10 años</option>' +
  '            <option value="mortgagePaymentPeriod4">De 11 a 15 años</option>' +
  "        </select>" +
  '        <span class="alert">Selecciona una opción</span>' +
  "    </div>" +
  '    <div class="profiler-option__input-group">' +
  '        <label for="mortgageBank">¿Con qué banco tienes tu hipoteca?</label>' +
  '        <input type="text" id="mortgageBank" placeholder="Nombre de tu banco">' +
  '        <span class="alert">Escribe el nombre del banco</span>' +
  "    </div>" +
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
  "        </select>" +
  '        <span class="alert">Selecciona una opción</span>' +
  "    </div>";

const creditRate = 9.16;
const percentageMonthlyIncome = 40 + 3.989;

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let form = document.forms["profilerForm"];

let target = document.querySelector(
  "#profilerForm .profiler-form__right .profiler-form--inner"
);
let steps = document.querySelector("#profilerForm .profiler-form__steps");

let formType = 0;

const q0 = document.querySelectorAll('input[name="q0"]');
q0.forEach((item) => {
  const valueOne = item.addEventListener("click", () => {
    if (item.value == "q0a1") {
      formType = 0;
      document.getElementById("imageIndex").style.display = "none";
      document.getElementById("imageLoan").style.display = "block";
      document.getElementById("imageMortgage").style.display = "none";
    }

    if (item.value == "q0a2") {
      formType = 1;
      document.getElementById("imageIndex").style.display = "none";
      document.getElementById("imageLoan").style.display = "none";
      document.getElementById("imageMortgage").style.display = "block";
    }
  });
});

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("profiler-option");
  if (x[n]) {
    x[n].style.display = "block";
  }
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Simular";
    document.getElementById("nextBtn").setAttribute("type", "submit");
    document.getElementById("valorInmueble").value = loanData.propertyValue;
    document.getElementById("creditoMaximo").value = loanData.loanAmountMax;
    document.getElementById("mensualidad").value = cell.PagoMensual[0];
    document.getElementById("esProspecto").value = "Si";
    if (loanData.proofIncome == "q2a4" || loanData.loanRecord == "q3a4" || loanData.loanRecord == "q3a3" || loanData.loanRecord == "q3a5") {
      document.getElementById("esProspecto").value = "No";

    }
  } else {
    document.getElementById("nextBtn").setAttribute("type", "");
    document.getElementById("nextBtn").innerHTML = "Continuar";
  }
  fixStepIndicator(n);
}

let stepCount = 0;
let mortgageFormCount = 0;
function nextPrev(n) {
  var x = document.getElementsByClassName("profiler-option");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("nameMessage").innerHTML +=
      personalData.name + " " + personalData.lastName;
    document.getElementById("profilerForm").style.display = "none";
    document.getElementById("propertyValueMessage").innerHTML +=
      formatter.format(loanData.propertyValue);
    document.getElementById("loanAmountMessage").innerHTML += formatter.format(
      loanData.loanAmount
    );
    document.getElementById("monthlyPaymentMessage").innerHTML +=
      cell.PagoMensual[0];
    if (formType == 0) {
      document.getElementById("profilerMessage").style.display = "flex";
      if (loanData.proofIncome == "q2a4") {
        document.getElementById("btnData").remove();
        document.querySelector(".profiler-success__data").style.display =
          "none";
        document.querySelector("#congratsMessage").innerHTML =
          "Has concluido tu precalificación <br>";
        document.querySelector("#successMessage").innerHTML =
          '<p class="value-label">Para acceder a un crédito hipotecario es requisito poder comprobar ingresos</p>' +
          '<p class="value-label">Acércate a un Asesor y conoce las alternativas para nuestros clientes sin comprobaciones</p>';
      }
      if (loanData.loanRecord == "q3a4" || loanData.loanRecord == "q3a3") {
        document.getElementById("btnData").remove();
        document.querySelector(".profiler-success__data").style.display =
          "none";
        document.querySelector("#congratsMessage").innerHTML =
          "Has concluido tu precalificación <br>";
        document.querySelector("#successMessage").innerHTML =
          '<p class="value-label">Para acceder a un crédito hipotecario es requisito tener buen historial de crédito</p>' +
          '<p class="value-label">Acércate a un Asesor y conoce las alternativas para nuestros clientes con mal historial</p>';
      }
      if (loanData.loanRecord == "q3a5") {
        document.getElementById("btnData").remove();
        document.querySelector(".profiler-success__data").style.display =
          "none";
        document.querySelector("#congratsMessage").innerHTML =
          "Has concluido tu precalificación <br>";
        document.querySelector("#successMessage").innerHTML =
          '<p class="value-label">Tener historial de crédito es un requisito para la mayoría de las instituciones con las que trabajamos</p>' +
          '<p class="value-label">Acércate a un Asesor y conoce las alternativas para nuestros clientes sin historial crediticio</p>';
      }
      // Submit async back connection for property loans here
      document.getElementById("profilerForm").submit();
    }
    if (formType == 1) {
      document.getElementById("profilerForm").style.display = "none";
      document.getElementById("profilerContact").style.display = "flex";
      document.getElementById("contactName").innerHTML +=
        personalData.name + " " + personalData.lastName;
      if (loanData.proofIncome == "q2a4") {
        document.getElementById("esProspecto").value = "No";
        document.querySelector("#mortgageCongratsMessage").style.display =
          "none";
        document.querySelector("#mortgageNoProofMessage").style.display =
          "block";
        document.querySelector("#mortgageBadRecordMessage").style.display =
          "none";
        document.querySelector("#mortgageNoRecordMessage").style.display =
          "none";
      }
      if (loanData.loanRecord == "q3a4" || loanData.loanRecord == "q3a3") {
        document.getElementById("esProspecto").value = "No";
        document.querySelector("#mortgageCongratsMessage").style.display =
          "none";
        document.querySelector("#mortgageNoProofMessage").style.display =
          "none";
        document.querySelector("#mortgageBadRecordMessage").style.display =
          "block";
        document.querySelector("#mortgageNoRecordMessage").style.display =
          "none";
      }
      if (loanData.loanRecord == "q3a5") {
        document.getElementById("esProspecto").value = "No";
        document.querySelector("#mortgageCongratsMessage").style.display =
          "none";
        document.querySelector("#mortgageNoProofMessage").style.display =
          "none";
        document.querySelector("#mortgageBadRecordMessage").style.display =
          "none";
        document.querySelector("#mortgageNoRecordMessage").style.display =
          "block";
      }
      // Submit async back connection for mortgage loans here
      document.getElementById("profilerForm").submit();
    }
  }
  if (currentTab == 0) {
    window.location.reload();
  }
  if (currentTab == 1) {
    if (formType == 0) {
      document.getElementById("imageIndex").style.display = "none";
      document.getElementById("imageLoan").style.display = "block";
      document.getElementById("imageMortgage").style.display = "none";
      if (document.getElementById("mortgageForm")) {
        document.getElementById("mortgageForm").remove();
      }
    }

    if (formType == 1) {
      document.getElementById("imageIndex").style.display = "none";
      document.getElementById("imageLoan").style.display = "none";
      document.getElementById("imageMortgage").style.display = "block";
      document.getElementById("propertyMortgageChange").innerHTML =
        "El valor del inmueble que estas pagando es:";
      if (document.getElementById("q4NoMortgage")) {
        document.getElementById("q4NoMortgage").remove();
      }
      if (document.getElementById("downPaymentNoMortgage")) {
        document.getElementById("downPaymentNoMortgage").remove();
      }
      if (document.getElementById("q7NoMortgage")) {
        document.getElementById("q7NoMortgage").remove();
      }
      if (document.getElementById("loanPeriodNoMortgage")) {
        document.getElementById("loanPeriodNoMortgage").remove();
      }
      if (stepCount == 0) {
        steps.innerHTML += '<span class="step" id="extraStep"></span>';
        stepCount++;
      }
      if (mortgageFormCount == 0) {
        document.getElementById("mortgageForm").innerHTML += mortgageHtml;
        mortgageFormCount++;
      }
    }
  }
  if (currentTab == 3) {
    document.getElementById("imageContainerLeft").style.display = "none";
    document.getElementById("dataContainerLeft").style.display = "block";
    document.getElementById("propertyValue").value = formatter.format(
      loanData.propertyValue
    );
    document.getElementById("loanAmount").value = formatter.format(
      loanData.loanAmount
    );
    if (document.getElementById("loanPeriod")) {
      document.getElementById("loanPeriod").value =
        loanData.loanPeriod + " Años";
    }
  }
  if (formType == 0 && currentTab == 3) {
    document.getElementById("creditDestiny").value = "Comprar una casa";
  }
  if (formType == 1 && currentTab == 3) {
    document.getElementById("creditDestiny").value = "Mejorar hipoteca";
  }
  showTab(currentTab);
}

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("profiler-option");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select");

  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].parentNode.getElementsByClassName("alert")[0].style.display =
        "block";
      valid = false;
    }
    if (y[i].value != "" && y[i].id == "q1") {
      if (y[i].value <= 0 || y[i].value < 6249) {
        y[i].parentNode.getElementsByClassName("alert")[1].style.display =
          "block";
        valid = false;
      } else {
        y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
          alert.style.display = "none";
        });
        loanData.monthlyIncome = y[i].value;
        loanData.loanAmountMax =
          loanData.monthlyIncome * percentageMonthlyIncome;
      }
    }
    if (y[i].value != "" && y[i].id == "q5") {
      if (y[i].value <= 250000) {
        y[i].parentNode.getElementsByClassName("alert")[0].style.display =
          "block";
        return (valid = false);
      } else {
        y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
          alert.style.display = "none";
        });
        loanData.propertyValue = y[i].value;
        loanData.propertyMaxValue = loanData.propertyValue * 0.9;
        loanData.minDownPayment = loanData.propertyValue * 0.1;
      }
    }
    if (y[i].value != "" && y[i].id == "q6") {
      loanData.downPayment =
        document.getElementById("q5").value -
        document.getElementById("q6").value;
      if (document.getElementById("downPayment")) {
        document.getElementById("downPayment").value = loanData.downPayment;
      }
      if (y[i].value <= 250000) {
        y[i].parentNode.getElementsByClassName("alert")[0].style.display =
          "block";
        return (valid = false);
      }
      if (y[i].value > loanData.loanAmountMax) {
        y[i].parentNode.getElementsByClassName("alert")[1].style.display =
          "block";
        y[i].parentNode.getElementsByClassName("alert")[1].innerHTML =
          "Tu monto de crédito máximo, basado en tus ingresos es de " +
          formatter.format(loanData.loanAmountMax);
        if (loanData.downPayment < loanData.minDownPayment) {
          y[i].parentNode.getElementsByClassName("alert")[2].style.display =
            "block";
          y[i].parentNode.getElementsByClassName("alert")[2].innerHTML =
            "Tu monto de crédito máximo, basado en el aforo de 90%, es de " +
            formatter.format(loanData.minDownPayment);
          return (valid = false);
        }
        return (valid = false);
      }
      if (y[i].value > loanData.propertyValue * 0.9) {
        y[i].parentNode.getElementsByClassName("alert")[2].style.display =
          "block";
        y[i].parentNode.getElementsByClassName("alert")[2].innerHTML =
          "Tu monto de crédito máximo, basado en el aforo de 90%, es de " +
          formatter.format(loanData.propertyValue * 0.9);
        return (valid = false);
      }
      // if (loanData.downPayment < loanData.minDownPayment) {
      //   y[i].parentNode.getElementsByClassName("alert")[2].style.display =
      //     "block";
      //   y[i].parentNode.getElementsByClassName("alert")[2].innerHTML =
      //     "El enganche debe ser mínimo un 10% del valor de la propiedad equivalente a " +
      //     formatter.format(loanData.propertyMaxValue);
      //   return (valid = false);
      // }
      else {
        y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
          alert.style.display = "none";
        });
        loanData.loanAmount = y[i].value;
        valid = true;
      }
    }
    if (y[i].value != "" && y[i].id == "name") {
      personalData.name = y[i].value;
      y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (y[i].value != "" && y[i].id == "lastname") {
      personalData.lastName = y[i].value;
      y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (y[i].value != "" && y[i].id == "email") {
      if (!validateEmail(y[i].value)) {
        y[i].parentNode.getElementsByClassName("alert")[0].style.display =
          "block";
        y[i].parentNode.getElementsByClassName("alert")[0].innerHTML =
        "Ingresa un correo electrónico válido";
      }else{
        personalData.email = y[i].value;
        y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
          alert.style.display = "none";
        });
      }
    }
    if (y[i].value != "" && y[i].id == "phone") {
      personalData.phone = y[i].value;
      y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (y[i].value != "" && y[i].id == "city") {
      personalData.city = y[i].value;
      y[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (y[i].value != "" && y[i].id == "mortgageMonthlyPayment") {
      personalData.mortgageMonthlyPayment = y[i].value;
    }
    if (y[i].value != "" && y[i].id == "mortgageBank") {
      personalData.mortgageBank = y[i].value;
    }
  }
  for (i = 0; i < z.length; i++) {
    if (z[i].value == "") {
      z[i].parentNode.getElementsByClassName("alert")[0].style.display =
        "block";
      valid = false;
    }
    if (z[i].value != "" && z[i].id == "q2") {
      loanData.proofIncome = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (z[i].value != "" && z[i].id == "q3") {
      loanData.loanRecord = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (z[i].value != "" && z[i].id == "q4") {
      loanData.startDate = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (z[i].value != "" && z[i].id == "q7") {
      cell.Pago = [];
      cell.PagoInteres = [];
      cell.PagoCapital = [];
      cell.PagoMensual = [];
      cell.Saldo = [];
      let tmp = loanData.loanAmount;
      loanData.loanPeriod = z[i].value;
      loanData.loanAmountValidation = PMT(
        creditRate / 100 / 12,
        loanData.loanPeriod * 12,
        -loanData.loanAmount,
        0,
        0
      ).toFixed(2);
      let sum = 0;
      for (let i = 1; i <= loanData.loanPeriod * 12; i++) {
        let ipmt = IPMT(
          creditRate / 100 / 12,
          i,
          loanData.loanPeriod * 12,
          -loanData.loanAmount,
          0,
          0
        );
        let ppmt = PPMT(
          creditRate / 100 / 12,
          i,
          loanData.loanPeriod * 12,
          -loanData.loanAmount,
          0,
          0
        );
        let mpmt = (ppmt + ipmt).toFixed(2);
        tmp = (tmp - ppmt).toFixed(2);
        cell.Pago.push(i.toString());
        cell.PagoInteres.push(formatter.format(ipmt.toFixed(2).toString()));
        cell.PagoCapital.push(formatter.format(ppmt.toFixed(2).toString()));
        cell.PagoMensual.push(formatter.format(mpmt.toString()));
        cell.Saldo.push(formatter.format(tmp.toString()));
      }
    }
    if (z[i].value != "" && z[i].id == "location") {
      personalData.location = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (z[i].value != "" && z[i].id == "mortgagePaymentPeriod") {
      personalData.mortgagePaymentPeriod = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
    if (z[i].value != "" && z[i].id == "mortgagePaymentPeriodLeft") {
      personalData.mortgagePaymentPeriodLeft = z[i].value;
      z[i].parentNode.querySelectorAll(".alert").forEach((alert) => {
        alert.style.display = "none";
      });
    }
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  if (x[n]) {
    x[n].className += " active";
  }
}

function FV(rate, periods, payment, value, type) {
  var type = typeof type === "undefined" ? 0 : type;
  rate = eval(rate);
  var result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = value * term + (payment * (1 + rate) * (term - 1.0)) / rate;
    } else {
      result = value * term + (payment * (term - 1)) / rate;
    }
  }
  return -result;
}

function PMT(rate, periods, present, future, type) {
  var type = typeof type === "undefined" ? 0 : type;
  rate = eval(rate);
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result =
        ((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)) /
        (1 + rate);
    } else {
      result = (future * rate) / (term - 1) + (present * rate) / (1 - 1 / term);
    }
  }
  return -result;
}

function IPMT(rate, period, periods, present, future, type) {
  var type = typeof type === "undefined" ? 0 : type;
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
  return (
    PMT(rate, periods, present, future, type) -
    IPMT(rate, period, periods, present, future, type)
  );
}

document.getElementById("q6").addEventListener("keyup", downpaymentAppend);
document.getElementById("q5").addEventListener("keyup", downpaymentAppend);

function downpaymentAppend() {
  loanData.downPayment =
    document.getElementById("q5").value - document.getElementById("q6").value;
  document.getElementById("downPayment").value = loanData.downPayment;
}

function generatePdf() {
  window.jsPDF = window.jspdf.jsPDF;

  function generateData(data) {
    let result = [];
    for (let i = 0; i < data.Pago.length; i++) {
      result[i] = [
        data["Pago"][i],
        data["PagoInteres"][i],
        data["PagoCapital"][i],
        data["PagoMensual"][i],
        data["Saldo"][i],
      ];
    }
    return result;
  }

  function imgToBase64(url, callback) {
    if (!window.FileReader) {
      callback(null);
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result.replace("text/xml", "image/jpeg"));
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.send();
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date().toLocaleDateString("es-MX", options);
  var newdat = "Reporte generado el " + today;

  var img = document.getElementById("pdfHeaderImage");

  imgToBase64(img, function (base64) {
    base64Img = base64;
  });

  let doc = new jsPDF();

  doc.autoTable({ html: ".table" });

  let finalY = doc.previousAutoTable.finalY;
  doc.setFontSize(9);
  doc.setTextColor(21, 94, 117);
  doc.setFontSize(12);
  doc.addImage(img, "png", 0, 10, 210, 22);
  doc.text(newdat, 14, 32);
  doc.setTextColor(208, 139, 45);
  doc.text(
    "Valor del inmueble que deseas comprar: " +
      formatter.format(loanData.propertyValue),
    196,
    55,
    "right"
  );
  doc.text(
    "Puedes obtener un crédito de hasta: " +
      formatter.format(loanData.loanAmountMax),
    196,
    65,
    "right"
  );
  doc.text("Tu mensualidad promedio: " + cell.PagoMensual[0], 196, 75, "right");
  doc.autoTable({
    startY: finalY + 75,
    head: [["Pago", "Pago Interes", "Pago Capital", "Pago Mensual", "Saldo"]],
    body: generateData(cell),
    headStyles: { fillColor: [80, 99, 110] },
    tableLineColor: [80, 99, 110],
  });

  doc.save("tabla-amortizacion.pdf");
}

document.getElementById("btnData").addEventListener("click", generatePdf);

function formSubmit(event) {
  event.preventDefault();
};

document.getElementById("profilerForm").addEventListener("submit", formSubmit, true);