const contenedor = document.getElementById("contenedor");
const busqueda = document.getElementById("button");
const clima = document.getElementById("clima");
const detalleClima = document.getElementById("detalleClima");
const error404 = document.getElementById("invalido");
const pais = document.getElementById("pais");

busqueda.addEventListener('click', () => {

    const APIKey = 'c662d9fb59d73f57a003479f5012fa79';
    const city = document.getElementById("input").value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=sp`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                Swal.fire({
                    icon: 'error',
                    title: 'Dato Inválido',
                    text: 'El país o la localidad es inválida. Por favor, vuelva a ingresarlo.',
                })
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const imagen = document.querySelector('.clima img');
            const temperatura = document.querySelector('.clima .temperatura');
            const descripcion = document.querySelector('.clima .descripcion');
            const humedad = document.querySelector('.detalleClima .humedad span');
            const viento = document.querySelector('.detalleClima .viento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    imagen.src = 'img/sol.png';
                    break;

                case 'Rain':
                    imagen.src = 'img/lluvia.png';
                    break;

                case 'Snow':
                    imagen.src = 'img/nieve.png';
                    break;

                case 'Clouds':
                    imagen.src = 'img/nubes.png';
                    break;

                case 'Haze':
                    imagen.src = 'img/neblina.png';
                    break;

                default:
                    imagen.src = '';
            }

            pais.innerHTML = `${json.name} , ${json.sys.country} `;
            temperatura.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
            descripcion.innerHTML = `${json.weather[0].description}`;
            humedad.innerHTML = `${json.main.humidity}%`;
            viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            console.log(json)

            // weatherBox.style.display = '';
            // weatherDetails.style.display = '';
            // weatherBox.classList.add('fadeIn');
            // weatherDetails.classList.add('fadeIn');
            // container.style.height = '590px';


        });


});
