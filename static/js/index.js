document.addEventListener('DOMContentLoaded', () => {

            var online_devices = 0
            var total_devices = 0
            const table = document.querySelector("tbody")
            const online_count = document.querySelector('#online-count')
            console.log('HI')
            async function baseFunc(){
                const baseResponse = await fetch('/api')
                const api_data = await baseResponse.json()
                api_data.forEach(data => {
                    const row = document.createElement('tr')
                    const name = document.createElement('td')
                    const batteryPercentage = document.createElement('td')
                    name.setAttribute('class', 'border-left-primary')
                    async function vitalFunc(id){
                        const vitalResponse = await fetch(`/${id}`)
                        const vital_data = await vitalResponse.json()
                        try
                        {
                            const status = vital_data.diagnostics.payload.device.power.battery.state
                            const battery = vital_data.diagnostics.payload.device.power.battery.charge
                            if(status == 'discharging')
                            {
                                name.setAttribute('class', 'border-left-danger border-bottom-danger')
                            }
                            else if(status == 'charging' ||status == 'charged')
                            {
                                name.setAttribute('class', 'border-left-success border-bottom-success')
                            }
                            batteryPercentage.innerHTML = `${battery}%`
                        }
                        catch(err)
                        {
                            console.log('Exception')
                            batteryPercentage.innerHTML = 'Not Available'
                        }
                        if(data.online)
                    {
                        online_devices = online_devices + 1
                        console.log('online')
                        online_count.innerHTML = online_devices
                    }

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
                    row.appendChild(batteryPercentage)
                    table.appendChild(row)


                    console.log(data)
                    }
                    vitalFunc(data.id)
                })
            }
            baseFunc();
            });