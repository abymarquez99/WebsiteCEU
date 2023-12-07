// URL del endpoint
const endpointUrl = 'https://cloudiqinnovations.link/api/v1/sufragios';
let totalVotos = 0;
// Obtener datos del endpoint


function obtenerYActualizarDatos() {
fetch(endpointUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const partidos = data;
        console.log(partidos)

        // Gráfico de total de votos por partido
        const partidoLabels = [];
        const partidoData = [];

        partidos.forEach(partido => {
            partidoLabels.push(partido.siglas);
            partidoData.push(partido._count);
        });

        new Chart(document.getElementById('partidoChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: partidoLabels,
                datasets: [{
                    label: 'Total de votos por partido',
                    data: partidoData,
                    backgroundColor: ['red', 'lightblue', 'green'],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }],
                options: {
                  plugins: {
                      datalabels: {
                          color: '#fff', // color del texto
                          formatter: (value, context) => {
                              return context.chart.data.labels[context.dataIndex];
                          }
                      }
                  }
              }
            }
            
        });

        // Gráfico de total de hombres y mujeres
        const generoMasculino = partidos.reduce((total, partido) => total + partido.genero.masculino, 0);
        const generoFemenino = partidos.reduce((total, partido) => total + partido.genero.femenino, 0);

        new Chart(document.getElementById('generoChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Masculino', 'Femenino'],
                datasets: [{
                    data: [generoMasculino, generoFemenino],
                    backgroundColor: ['blue', 'pink']
                }]
            }
        });
        // Sumar los votos de todos los partidos
        const nuevoTotalVotos = data.reduce((total, partido) => total + partido._count, 0);

        // Calcular la cantidad de votos nuevos
        const votosNuevos = nuevoTotalVotos - totalVotos;

        // Actualizar el contador de votos en general
        document.getElementById('contadorVotos').textContent = `Votos en general: ${nuevoTotalVotos}`;

        // Actualizar la variable totalVotos
        totalVotos = nuevoTotalVotos;
        
    })
    .catch(error => {
        console.error('Error al obtener datos del endpoint:', error);
    }); 
  }

  // Llamar a la función inicialmente
  obtenerYActualizarDatos();
  
  // Actualizar cada minuto
  setInterval(obtenerYActualizarDatos, 60000); 