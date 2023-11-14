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

class WebsocketService {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.socketStatus = false;

        // Agrega código para inicializar la gráfica
        this.initChart();

        this.socket.addEventListener('open', () => {
            console.log("WebSocket Connected");
            this.socketStatus = true;
            this.updateChart();
        });

        this.socket.addEventListener('close', () => {
            console.log("WebSocket Disconnected");
            this.socketStatus = false;
            this.updateChart();
        });
    }

    initChart() {
        const ctx = document.getElementById('websocketChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'WebSocket Status',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        max: 1,
                        min: 0,
                    },
                },
            },
        });
    }

    updateChart() {
        // Actualiza la gráfica con el estado actual del socket
        this.chart.data.labels.push(new Date().toLocaleTimeString());
        this.chart.data.datasets[0].data.push(this.socketStatus ? 1 : 0);
        this.chart.update();
    }

    // Resto del código...
}
