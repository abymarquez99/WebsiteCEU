/* document.addEventListener('DOMContentLoaded', function () {
    // Datos de la gráfica de pie
    var pieData = [10, 20, 5, 20];
    var labels = ['FMLN', 'Nuevas Ideas', 'Arena', 'PCN'];

    // Configura la gráfica de pie
    Highcharts.chart('chart-container', {
        chart: {
            type: 'pie',
            backgroundColor: '#00000000',
        },
        title: {
            text: 'Votos'
        },
        series: [{
            data: pieData.map(function(value, index) {
                return { name: labels[index], y: value };
            }),
            name: 'Votos'
        }],
        tooltip: {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        }
    });
});
 */


/*const endpoint = 'https://cloudiqinnovations.link/api/v1/sufragios';

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Llamada a la función para crear el gráfico
    createChart(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


  //VOTOS POR PARTIDO
 function createChart(data) {
  // Extraer datos relevantes para el gráfico
  const partidos = data.map(partido => partido.nombre);
  const counts = data.map(partido => partido._count);

  // Calcular el total de votos
  const totalVotos = counts.reduce((acc, count) => acc + count, 0);

  // Especificar una paleta de colores personalizada
  const coloresPersonalizados = ['#ff3333', '#339cff', '#33ff5c'];

  // Configuración del gráfico de pastel
  const chartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ``
      
    },
    series: [{
      name: 'Sufragios',
      data: partidos.map((partido, index) => ({
        name: partido,
        y: counts[index],
        color: coloresPersonalizados[index % coloresPersonalizados.length] // Ciclo de colores si hay más partidos que colores
      })),
      showInLegend: true
    }],
    colors: coloresPersonalizados // Utilizar la paleta de colores para el gráfico
  };

  // Crear el gráfico
  Highcharts.chart('myChart', chartOptions);
} */

const endpoint = 'https://cloudiqinnovations.link/api/v1/sufragios';

fetch(endpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Llamada a la función para crear el gráfico
        createChart(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function createChart(data) {
    // Extraer datos relevantes para el gráfico
    const partidos = data.map(partido => partido.nombre);
    const counts = data.map(partido => partido._count);

    // Calcular el total de votos
    const totalVotos = counts.reduce((acc, count) => acc + count, 0);

    // Filtrar datos por género (masculino)
    const dataMasculino = data.map(partido => partido.masculino);
    // Filtrar datos por género (femenino)
    const dataFemenino = data.map(partido => partido.femenino);
    const departamentosData = data.map(partido => partido.departamento || []);
    const departamentos = [...new Set(departamentosData.flatMap(dep => dep.map(d => d.nombre)))];


    // Especificar una paleta de colores personalizada
    const coloresPersonalizados = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF'];

     // Configuración del gráfico de pastel para datos masculinos
     const chartOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: ``
          
        },
        series: [{
          name: 'Sufragios',
          data: partidos.map((partido, index) => ({
            name: partido,
            y: counts[index],
            color: coloresPersonalizados[index % coloresPersonalizados.length] // Ciclo de colores si hay más partidos que colores
          })),
          showInLegend: true
        }],
        colors: coloresPersonalizados // Utilizar la paleta de colores para el gráfico
      };

    // Configuración del gráfico de pastel para datos masculinos
    const chartOptionsMasculino = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Distribución por género (Masculino)'
        },
        series: [{
            name: 'Sufragios',
            data: partidos.map((partido, index) => ({
                name: `${partido} (${dataMasculino[index]})`,
                y: dataMasculino[index],
                color: coloresPersonalizados[index % coloresPersonalizados.length]
            })),
            showInLegend: true
        }],
        colors: coloresPersonalizados
    };

    // Configuración del gráfico de pastel para datos femeninos
    const chartOptionsFemenino = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Distribución por género (Femenino)'
        },
        series: [{
            name: 'Sufragios',
            data: partidos.map((partido, index) => ({
                name: `${partido} (${dataFemenino[index]})`,
                y: dataFemenino[index],
                color: coloresPersonalizados[index % coloresPersonalizados.length]
            })),
            showInLegend: true
        }],
        colors: coloresPersonalizados
    };

    //GRAFICO POR DEPARTAMENTO
    const chartOptionsDepartamento = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Conteo de Votos por Departamento'
        },
        xAxis: {
            categories: departamentos
        },
        yAxis: {
            title: {
                text: 'Número de Votos'
            }
        },
        series: partidos.map((partido, index) => ({
            name: partido,
            data: departamentos.map(depto => {
                const departamentoPartido = departamentosData.find(dp => dp.find(d => d.nombre === depto && partido === d.nombre));
                return departamentoPartido ? departamentoPartido.find(d => d.nombre === depto)._count : 0;
            }),
            color: coloresPersonalizados[index % coloresPersonalizados.length]
        })),
        colors: coloresPersonalizados
    };

    // Crear los gráficos
    Highcharts.chart('myChart', chartOptions);
    Highcharts.chart('chartMasculino', chartOptionsMasculino);
    Highcharts.chart('chartFemenino', chartOptionsFemenino);
    Highcharts.chart('votosPorDepartamentoChart', chartOptionsDepartamento);
}

