const botonAgregarSueldo = document.querySelector(".agregar-sueldo");
const botonQuitarSueldo = document.querySelector(".quitar-sueldo");
const inputLabelContainer = document.querySelector(".input-label-container");
const seccionCalculo = document.querySelector(".calculo");
const seccionResultados = document.querySelector(".resultados");

let numeroDeFamiliares = 1;

const crearInputYLabel = function (cantidadDeFamiliares) {
  const input = document.createElement("input");
  const label = document.createElement("label");
  const divContainer = document.createElement("div");
  label.innerText = `Sueldo familiar ${cantidadDeFamiliares}`;
  input.setAttribute("type", "number");
  input.setAttribute("value", 1000);
  input.setAttribute("min", 10);
  input.classList.add("sueldo");
  divContainer.classList.add("sueldo-container");
  divContainer.setAttribute("id", cantidadDeFamiliares);
  divContainer.appendChild(label);
  divContainer.appendChild(input);
  inputLabelContainer.appendChild(divContainer);
  numeroDeFamiliares++;
};

const crearTituloCalculo = function () {
  if (seccionCalculo.children.length > 0) {
    return;
  } else {
    const tituloCalculo = document.createElement("h2");
    tituloCalculo.innerText = "Estado salarial familiar";
    seccionCalculo.appendChild(tituloCalculo);
  }
};

const crearBotonCalculo = function () {
  const boton = document.querySelector(".boton-calculo");
  if (seccionCalculo.contains(boton)) {
    return;
  } else {
    const botonCalculo = document.createElement("button");
    botonCalculo.classList.add("boton-calculo");
    botonCalculo.innerText = "Calcular";
    seccionCalculo.appendChild(botonCalculo);
  }
};

const crearParrafoMayorSueldo = function (mayorSueldoAnual, elementoPadre) {
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.innerText = `El mayor sueldo anual es de $ ${mayorSueldoAnual}.`;
  elementoPadre.appendChild(nuevoParrafo);
};

const crearParrafoMenorSueldo = function (menorSueldoAnual, elementoPadre) {

  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.innerText = `El menor sueldo anual es de $ ${menorSueldoAnual}.`;
  elementoPadre.appendChild(nuevoParrafo);
};

const parrafoSalarioAnualMensualPromedio = function (salarioAnualMensualPromedio, elementoPadre, anualOmensual) {
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.innerText = `El salario ${anualOmensual} promedio de tu familia es de $ ${salarioAnualMensualPromedio}`;
  elementoPadre.appendChild(nuevoParrafo);
};

const crearParrafoSueldoNegativo = function(elementoPadre) {
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.innerText = "El sueldo no puede ser 0 o inferior. Ingrese un nuevo monto.";
  elementoPadre.appendChild(nuevoParrafo);
}


const eliminarSeccionResultados = function () {
  if (seccionResultados.children.length > 0) {
    seccionResultados.innerText = "";
  }
};

botonAgregarSueldo.onclick = function () {
  eliminarSeccionResultados();

  crearInputYLabel(numeroDeFamiliares);
 
  crearTituloCalculo();
  crearBotonCalculo();

  const botonCalculo = document.querySelector(".boton-calculo");

  botonCalculo.onclick = function () {
    eliminarSeccionResultados();

    const inputSueldos = document.querySelectorAll(".sueldo");

    const ANUAL = "anual";
    const MENSUAL = "mensual";
    const ANIO = 12;

    let mayorSueldo = 0
    let menorSueldo = Infinity
    let salarioMensual = 0;
    let totalFamiliares = inputSueldos.length;


    for (let i = 0; i < inputSueldos.length; i++) {
      let valorSueldosInput = Number(inputSueldos[i].value)
      
      if (valorSueldosInput > mayorSueldo) {
        mayorSueldo = inputSueldos[i].value;
      }

      if (valorSueldosInput < menorSueldo) {
        menorSueldo = inputSueldos[i].value;
      }

      salarioMensual += valorSueldosInput;
    }

    const salarioMensualPromedio = (salarioMensual / totalFamiliares).toFixed(0);
    const salarioAnualPromedio = ((salarioMensual / totalFamiliares) * ANIO).toFixed(0);
    const mayorSueldoAnual = mayorSueldo * ANIO;
    const menorSueldoAnual = menorSueldo * ANIO;

    if(mayorSueldoAnual <= 0 || menorSueldoAnual <= 0) {
      crearParrafoSueldoNegativo(seccionResultados)
    } else {
      crearParrafoMayorSueldo(mayorSueldoAnual, seccionResultados);
      crearParrafoMenorSueldo(menorSueldoAnual, seccionResultados);
      parrafoSalarioAnualMensualPromedio(salarioMensualPromedio, seccionResultados, MENSUAL);
      parrafoSalarioAnualMensualPromedio(salarioAnualPromedio, seccionResultados, ANUAL);
    }
    
  };

  return false;
};

botonQuitarSueldo.onclick = function () {
  const divContainer = document.querySelectorAll(".sueldo-container");

  for (let i = divContainer.length - 1; i >= 0; i--) {
    inputLabelContainer.removeChild(divContainer[i]);
    numeroDeFamiliares--;
    break;
  }

  if (inputLabelContainer.children.length === 0) {
    seccionCalculo.innerText = "";
  }

  eliminarSeccionResultados();
  return false;
};
