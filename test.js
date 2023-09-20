class Expression {
  #p = 0;

  constructor(p) {
    this.#p = p;
  }

  evaluate(x) {
    return Math.pow(x, this.#p) + 1;
  }
}

function printPoli() {

  const nameLenght = document.getElementById("name");
  console.log(nameLenght);

  const n = new Expression();

  alert(n.evaluate(5));
  delete (n);
}
