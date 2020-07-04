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

                    const name = document.createElement('td')
                    name.setAttribute('class', 'border-left-primary')

                    const online = document.createElement('td')

                    const timestamp = document.createElement('td')

                    const strong = document.createElement('strong')
                    const link = document.createElement('a')

                    var timestamp_new = new Date(data.last_heard)
                    var timestamp_now = new Date()
                    var timeInMS = 0
                    var timeInSec = 0
                    var timeInMinutes = 0
                    var timeInHours  = 0
                    var days = 0

                    timeInMS = timestamp_now - timestamp_new
                    timeInSec = Math.round(timeInMS / (1000))
                    timeInMinutes = Math.round(timeInSec / (60))
                    timeInHours = Math.round(timeInMinutes / (60))
                    days = Math.round(timeInHours / 24)

                    if (timeInHours > 2){
                        name.setAttribute('class', 'border-left-danger border-bottom-danger border-top-danger')
                        timestamp.setAttribute('class', 'border-bottom-danger')
                    }

                    if (data.online){
                        const span = document.createElement('span')
                        span.setAttribute('class','badge badge-pill badge-success')
                        online.appendChild(span)
                        span.innerHTML = 'Online'
                    }else {
                        const span = document.createElement('span')
                        span.setAttribute('class','badge badge-pill badge-danger')
                        online.appendChild(span)
                        span.innerHTML = 'Offline'
                    }

                    if (timeInSec <= 60){
                         console.log(timeInSec)
                         timestamp.innerHTML =  timeInSec + ' Seconds Ago'
                    }else if (timeInSec > 60 & timeInMinutes < 59){
                         timestamp.innerHTML = timeInMinutes + ' Minutes Ago'
                     }else if(timeInMinutes >= 59 & timeInHours <= 24 ){
                         timestamp.innerHTML = timeInHours + ' Hours Ago'
                     }else if(timeInHours > 24 ){
                        timestamp.innerHTML = days + ' Days ago'
                    }



                    link.innerHTML = data.name
                    link.setAttribute('href', `device/${data.id}`)
                    strong.appendChild(link)
                    name.appendChild(strong)
                    row.appendChild(name)
                    row.appendChild(online)
                    row.appendChild(timestamp)
                    table.appendChild(row)



                    console.log(data)
                })


            }

            baseRequest.send()
            });