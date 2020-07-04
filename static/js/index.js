document.addEventListener('DOMContentLoaded', () => {

            var online_devices = 0
            var total_devices = 0
            const online_count = document.querySelector('#online-count')
            const baseRequest = new XMLHttpRequest()
            const table = document.querySelector("tbody")

            baseRequest.open('GET', '/api')

            baseRequest.onload = () => {
                console.log('Hello World in onload')
                const api_data = JSON.parse(baseRequest.responseText)
                api_data.forEach(data => {
                    console.log(data.online)
                    if(data.online)
                    {
                        online_devices = online_devices + 1
                        console.log('online')
                        online_count.innerHTML = online_devices
                    }
                    const row = document.createElement('tr')
                    const data_1 = document.createElement('td')
                    data_1.setAttribute('class', 'border-left-primary')
                    const strong = document.createElement('strong')
                    const link = document.createElement('a')
                    link.innerHTML = data.name
                    link.setAttribute('href', `device/${data.id}`)
                    strong.appendChild(link)
                    data_1.appendChild(strong)
                    row.appendChild(data_1)
                        table.appendChild(row)
                    console.log(data)
                })


            }

            baseRequest.send()
            });