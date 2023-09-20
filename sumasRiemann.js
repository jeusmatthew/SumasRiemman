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
  let name = "";
  name = document.getElementById("name").value;

  let nameLength = name.length;

  return Math.pow(x, nameLength) + 1;
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

  if (!a || !b || !n) { 
    alert("Los valores de a, b y n deben ser números");
    return;
  }

  if (a > b || a == b) {
    alert("El valor de a debe ser menor que el valor de b");
    return;
  }

  let p = document.getElementById("name").value.length;

  let puntoMuestra = document.getElementsByName("sample-point");

  let resultado = 0;

  puntoMuestra.forEach((element) => {
    if (element.checked) {
      switch (element.value) {
        case "derecho":
          resultado = sumasRiemannDerecha(a, b, n);
          break;
        case "izquierdo":
          resultado = sumasRiemannIzquierda(a, b, n);
          break;
        case "medio":
          resultado = sumasRiemannMedio(a, b, n);
          break;
        case "azar":
          resultado = sumasRiemannPuntoAzar(a, b, n);
          break;
      }
    }
  });

  MathJax.typesetPromise()
    .then(() => {
      document.getElementById(
        "out"
      ).innerHTML = `$$ \\int_${a}^${b} x^{${p}}+1 = ${resultado} $$`;
      MathJax.typesetPromise();
    })
    .catch((err) => console.log(err.message));
}
