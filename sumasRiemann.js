const LONGITUD_NOMBRE = 22;

function sumasRiemannDerecha(a = 0, b = 0, n = 0) {
  let deltaX = (b - a) / n;
  let c_i = 0;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    c_i = a + i * deltaX;
    sum += f(c_i) * deltaX;
  }

  return sum;
}

function sumasRiemannIzquierda(a = 0, b = 0, n = 0) {
  let deltaX = (b - a) / n;
  let c_i = 0;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    c_i = a + (i - 1) * deltaX;
    sum += f(c_i) * deltaX;
  }

  return sum;
}

function sumasRiemannMedio(a = 0, b = 0, n = 0) {
  let deltaX = (b - a) / n;
  let c_i = 0;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    c_i = a + ((i + (i - 1)) / 2) * deltaX;
    sum += f(c_i) * deltaX;
  }

  return sum;
}

function sumasRiemannPuntoAzar(a = 0, b = 0, n = 0) {
  let deltaX = (b - a) / n;
  let c_i = 0;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    c_i = a + (i - Math.random()) * deltaX;
    sum += f(c_i) * deltaX;
  }

  return sum;
}

function f(x = 0) {
  return Math.pow(x, LONGITUD_NOMBRE) + 1;
}

function resolver() {
  let tipoParticion = getPartitionType();

  switch (tipoParticion) {
    case "regular":
      resolverParticionRegular();
      break;
    case "irregular":
      resolverParticionIrregular();
      break;
  }
}

function getPartitionType() {
  let listaRadBox = document.getElementsByName("partition-type");
  let tipoParticion = "";

  listaRadBox.forEach((element) => {
    if (element.checked) {
      tipoParticion = element.value;
    }
  });

  return tipoParticion;
}

function resolverParticionRegular() {
  let a = parseFloat(document.getElementById("a").value);
  let b = parseFloat(document.getElementById("b").value);
  let n = parseInt(document.getElementById("n").value);

  if (isNaN(a) || isNaN(b) || isNaN(n)) {
    alert("Los valores de a, b y n deben ser números");
    return;
  }

  if (a > b || a == b) {
    alert("El valor de a debe ser menor que el valor de b");
    return;
  }

  let tipoMuestras = document.getElementsByName("sample-point");

  let resultado = 0;
  let format = `$$ \\int_{${a}}^{${b}} x^{${LONGITUD_NOMBRE}}+1 = `;

  let idElemento = "";
  tipoMuestras.forEach((element) => {
    if (element.checked) {
      switch (element.value) {
        case "derecho":
          resultado = sumasRiemannDerecha(a, b, n);
          idElemento = "outDerecha";
          break;
        case "izquierdo":
          resultado = sumasRiemannIzquierda(a, b, n);
          idElemento = "outIzquierda";
          break;
        case "medio":
          resultado = sumasRiemannMedio(a, b, n);
          idElemento = "outMedio";
          break;
        case "azar":
          resultado = sumasRiemannPuntoAzar(a, b, n);
          idElemento = "outAzar";
          break;
      }
      imprimirTeX(
        document.getElementById(idElemento),
        format.concat(`${resultado} $$`)
      );
    } else {
      const output = document.getElementById("output").children;
      switch (element.value) {
        case "derecho":
          output[0].innerHTML = "";
        case "izquierdo":
          output[1].innerHTML = "";
        case "medio":
          output[2].innerHTML = "";
        case "azar":
          output[3].innerHTML = "";
      }
    }
  });
}

function resolverParticionIrregular() {
  let a = parseFloat(document.getElementById("a").value);
  let b = parseFloat(document.getElementById("b").value);
  let n = parseInt(document.getElementById("n").value);

  let particiones = [];

  // Generando particiones
  for (let i = 0; i <= n; i++) {
    particiones.push(randomIntFromInterval(a, b));
  }

  particiones.sort();

  let tipoMuestras = document.getElementsByName("sample-point");

  let resultado = 0;
  let format = `$$ \\int_{${a}}^{${b}} x^{${LONGITUD_NOMBRE}}+1 = `;

  let idElemento = "";
  tipoMuestras.forEach((element) => {
    if (element.checked) {
      switch (element.value) {
        case "derecho":
          resultado = sumasRiemannDerecha(a, b, n);
          idElemento = "outDerecha";
          break;
        case "izquierdo":
          resultado = sumasRiemannIzquierda(a, b, n);
          idElemento = "outIzquierda";
          break;
        case "medio":
          resultado = sumasRiemannMedio(a, b, n);
          idElemento = "outMedio";
          break;
        case "azar":
          resultado = sumasRiemannPuntoAzar(a, b, n);
          idElemento = "outAzar";
          break;
      }
      imprimirTeX(
        document.getElementById(idElemento),
        format.concat(`${resultado} $$`)
      );
    } else {
      const output = document.getElementById("output").children;
      switch (element.value) {
        case "derecho":
          output[0].innerHTML = "";
        case "izquierdo":
          output[1].innerHTML = "";
        case "medio":
          output[2].innerHTML = "";
        case "azar":
          output[3].innerHTML = "";
      }
    }
  });

}

function imprimirTeX(element = HTMLElement, str = "") {
  MathJax.typesetPromise()
    .then(() => {
      element.innerHTML = str;
      MathJax.typesetPromise();
    })
    .catch((err) => console.log(err.message));
}

function randomIntFromInterval(min, max) {
  // min and max included
  return (Math.random() * (max - min) + min).toFixed(4);
}

function sumaRiemannIrregular(){
  
}