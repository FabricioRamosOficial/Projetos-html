function calcularBhaskara() {
  const a = Number(document.getElementById("coeficiente-a").value);
  const b = Number(document.getElementById("coeficiente-b").value);
  const c = Number(document.getElementById("coeficiente-c").value);

  const raizes = calcularBhaskaraInternamente(a, b, c);

  if (typeof raizes === "string") {
    document.getElementById("resultado").innerHTML = raizes;
  } else {
    document.getElementById("resultado").innerHTML = `As raízes são x1 = ${raizes.x1.toFixed(2)} e x2 = ${raizes.x2.toFixed(2)}`;
  }
}

function calcularBhaskaraInternamente(a, b, c) {
  const delta = b ** 2 - 4 * a * c;

  if (delta < 0) {
    return "A equação não possui raízes reais";
  }

  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);

  return {
    x1: x1,
    x2: x2
  };
}
