// Função para selecionar um elemento do DOM com base no seletor CSS
const querySelector = el => document.querySelector(`${el}`);

// Função de evento quando o formulário é enviado
querySelector('.busca').addEventListener('submit', async (event) => {
  // Evita o comportamento padrão de recarregar a página ao enviar o formulário
  event.preventDefault();

  // Obtém o valor digitado pelo usuário no campo de pesquisa
  let input = querySelector('#searchInput').value;

  // Chave de API da OpenWeatherMap
  const apiKey = '397f0fab662dfe0b1549c41bfd15bf8a';

  // Parâmetro para unidades métricas (graus Celsius e quilômetros por hora)
  let param = 'metric';

  // Verifica se o campo de entrada não está vazio e exibe uma mensagem de carregamento
  input != '' && showWarning('Carregando...');

  // Cria a URL da API com base na cidade digitada, chave de API, unidades e idioma
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=${param}&lang=${param = 'pt_br'}`;

  // Faz uma solicitação à API da OpenWeatherMap e aguarda a resposta
  let res = await fetch(url);

  // Converte a resposta em formato JSON
  let json = await res.json();
  console.log(json);

  // Verifica se a resposta da API é bem-sucedida (código 200)
  if (json.cod === 200) {
    // Limpa informações antigas
    clearInfo();
    // Exibe as informações climáticas na página
    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      iconTemp: json.weather[0].icon,
      desc: json.weather[0].description,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg,
    });
  } else {
    // Limpa informações antigas
    clearInfo();
    // Exibe uma mensagem de aviso em caso de erro
    showWarning('Não encontramos esta localização');
  }
});

// Função para exibir informações climáticas na página
const showInfo = (json) => {
  // Limpa mensagens de aviso
  showWarning('');

  // Exibe a seção de resultados
  querySelector('.resultado').style.display = 'block';

  // Define o título com o nome da cidade e país
  querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

  // Exibe a temperatura atual em graus Celsius
  querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

  // Exibe a velocidade do vento em quilômetros por hora
  querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

  // Define a imagem do ícone do tempo
  querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.iconTemp}@2x.png`);

  // Define a descrição do tempo
  querySelector('.desc').innerHTML = json.desc;

  // Define a direção do vento no elemento de seta
  querySelector('.ventoPonto ').setAttribute('style', `transform: rotate(${json.windAngle - 90} deg)`);
};

// Função para exibir mensagens de aviso na página
const showWarning = msg => querySelector('.aviso').innerHTML = `${msg}`;

// Função para limpar informações climáticas da página
const clearInfo = () => {
  // Limpa mensagens de aviso
  showWarning('');
  // Oculta a seção de resultados
  querySelector('.resultado').style.display = 'none';
};
