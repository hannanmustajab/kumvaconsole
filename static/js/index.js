document.addEventListener('DOMContentLoaded', () => {

    var online_devices = 0
    var total_devices = 0
    const table = document.querySelector("tbody")
    const online_count = document.querySelector('#online-count')

    async function baseFunc() {

        const baseResponse = await fetch('/api')
        const api_data = await baseResponse.json()

        api_data.forEach(data => {
            const row = document.createElement('tr')
            const name = document.createElement('td')
            const batteryPercentage = document.createElement('td')
            const signal_strength_value = document.createElement('td')
            const signal_quality_value = document.createElement('td')
            const roundTripValue = document.createElement('td')
            const operatorValue = document.createElement('td')
            name.setAttribute('class', 'border-left-primary')
            name.style.width = '50px'
            const span = document.createElement('span')
            const round_trip_span = document.createElement('span')
            const battery_span = document.createElement('span')
            const signal_strength_span = document.createElement('span')
            const signal_quality_span = document.createElement('span')
            const offline_span = document.createElement('span')


            async function vitalFunc(id) {
                const vitalResponse = await fetch(`/${id}`)
                const vital_data = await vitalResponse.json()
                try {
                    const status = vital_data.diagnostics.payload.device.power.battery.state
                    const battery = vital_data.diagnostics.payload.device.power.battery.charge
                    const signal_strength = Math.round(vital_data.diagnostics.payload.device.network.signal.strength)
                    const operator = vital_data.diagnostics.payload.device.network.cellular.operator
                    const signal_quality = Math.round(vital_data.diagnostics.payload.device.network.signal.quality)
                    const round_trip = vital_data.diagnostics.payload.service.coap.round_trip

                    // Signal Strength Logic
                    if (signal_strength > 60) {
                        signal_strength_span.setAttribute('class', 'badge badge-pill badge-success')
                        signal_strength_value.appendChild(signal_strength_span)
                        signal_strength_span.innerHTML = signal_strength + ' %'
                    } else if (signal_strength <= 60 & signal_strength > 30) {
                        signal_strength_span.setAttribute('class', 'badge badge-pill badge-warning')
                        signal_strength_value.appendChild(signal_strength_span)
                        signal_strength_span.innerHTML = signal_strength + ' %'
                    } else if (signal_strength <= 30) {
                        signal_strength_span.setAttribute('class', 'badge badge-pill badge-danger')
                        signal_strength_value.appendChild(signal_strength_span)
                        signal_strength_span.innerHTML = signal_strength + ' %'
                    } else {
                        signal_strength_span.setAttribute('class', 'badge badge-pill badge-secondary')
                        signal_strength_value.appendChild(signal_strength_span)
                        signal_strength_span.innerHTML = 'N.A'
                    }

                    // Signal Quality Logic
                    if (signal_quality > 70) {
                        signal_quality_span.setAttribute('class', 'badge badge-pill badge-success')
                        signal_quality_value.appendChild(signal_quality_span)
                        signal_quality_span.innerHTML = signal_quality + ' %'
                    } else if (signal_quality <= 70 & signal_strength > 40) {
                        signal_quality_span.setAttribute('class', 'badge badge-pill badge-warning')
                        signal_quality_value.appendChild(signal_quality_span)
                        signal_quality_span.innerHTML = signal_quality + ' %'
                    } else if (signal_quality <= 40) {
                        signal_quality_span.setAttribute('class', 'badge badge-pill badge-danger')
                        signal_quality_value.appendChild(signal_quality_span)
                        signal_quality_span.innerHTML = signal_quality + ' %'
                    } else {
                        signal_quality_span.setAttribute('class', 'badge badge-pill badge-secondary')
                        signal_quality_value.appendChild(signal_quality_span)
                        signal_quality_span.innerHTML = 'N.A'
                    }

                    // Round Trip Logic

                    if (round_trip > 2000) {
                        round_trip_span.setAttribute('class', 'badge badge-pill badge-danger')
                        roundTripValue.appendChild(round_trip_span)
                        round_trip_span.innerHTML = round_trip + ' ms'
                    } else {
                        round_trip_span.setAttribute('class', 'badge badge-pill badge-success')
                        roundTripValue.appendChild(round_trip_span)
                        round_trip_span.innerHTML = round_trip + ' ms'

                    }

                    operatorValue.innerHTML = operator


                    // signal_quality_value.innerHTML = signal_quality + ' %'
                    // signal_strength_value.innerHTML = signal_strength + '%'

                    if (battery > 70) {
                        battery_span.setAttribute('class', 'badge badge-pill badge-success')
                        batteryPercentage.appendChild(battery_span)
                        battery_span.innerHTML = battery + ' %'

                    } else if (battery <= 70 & battery > 50) {
                        battery_span.setAttribute('class', 'badge badge-pill badge-warning')
                        batteryPercentage.appendChild(battery_span)
                        battery_span.innerHTML = battery + ' %'
                    } else if (battery <= 50) {
                        battery_span.setAttribute('class', 'badge badge-pill badge-danger')
                        batteryPercentage.appendChild(battery_span)
                        battery_span.innerHTML = battery + ' %'
                    } else if (status == 'charging' || status == 'charged') {
                        pass
                    }
                    // batteryPercentage.innerHTML = `${battery}%`
                } catch (err) {
                    battery_span.setAttribute('class', 'badge badge-pill badge-secondary')
                    batteryPercentage.appendChild(battery_span)
                    battery_span.innerHTML = 'N.A'
                    signal_quality_span.setAttribute('class', 'badge badge-pill badge-secondary')
                    signal_quality_value.appendChild(signal_quality_span)
                    signal_quality_span.innerHTML = 'N.A'
                    signal_strength_span.setAttribute('class', 'badge badge-pill badge-secondary')
                    signal_strength_value.appendChild(signal_strength_span)
                    signal_strength_span.innerHTML = 'N.A'
                    round_trip_span.setAttribute('class', 'badge badge-pill badge-secondary')
                    roundTripValue.appendChild(round_trip_span)
                    round_trip_span.innerHTML = 'N.A'

                }
                if (data.online) {
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
                var timeInHours = 0
                var days = 0

                timeInMS = timestamp_now - timestamp_new
                timeInSec = Math.round(timeInMS / (1000))
                timeInMinutes = Math.round(timeInSec / (60))
                timeInHours = Math.round(timeInMinutes / (60))
                days = Math.round(timeInHours / 24)

                if (timeInHours > 2) {
                    name.setAttribute('class', 'border-left-danger')

                    // timestamp.setAttribute('class', 'border-bottom-danger')
                }

                if (data.online) {
                    span.setAttribute('class', 'badge badge-pill badge-success')
                    online.appendChild(span)
                    span.innerHTML = 'Online'
                } else {
                    span.setAttribute('class', 'badge badge-pill badge-danger')
                    online.appendChild(span)
                    span.innerHTML = 'Offline'
                }

                if (timeInSec <= 60) {
                    console.log(timeInSec)
                    timestamp.innerHTML = timeInSec + ' Seconds Ago'
                } else if (timeInSec > 60 & timeInMinutes < 59) {
                    timestamp.innerHTML = timeInMinutes + ' Minutes Ago'
                } else if (timeInMinutes >= 59 & timeInHours <= 24) {
                    if (timeInHours > 2) {
                        offline_span.setAttribute('class', 'badge badge-pill badge-danger')
                        timestamp.appendChild(offline_span)
                        offline_span.innerHTML = timeInHours + ' Hours Ago'
                    } else if (timeInHours < 2) {
                        timestamp.innerHTML = timeInHours + ' Hours Ago'
                    }

                } else if (timeInHours > 24) {
                    offline_span.setAttribute('class', 'badge badge-pill badge-danger')
                    timestamp.appendChild(offline_span)
                    offline_span.innerHTML = days + ' Days ago'
                }

                link.innerHTML = data.name
                link.setAttribute('href', `device/${data.id}`)
                strong.appendChild(link)
                name.appendChild(strong)
                row.appendChild(name)
                row.appendChild(online)
                row.appendChild(timestamp)
                row.appendChild(batteryPercentage)
                row.appendChild(signal_strength_value)
                row.appendChild(signal_quality_value)
                row.appendChild(roundTripValue)
                row.appendChild(operatorValue)
                table.appendChild(row)
                console.log(data)
            }

            vitalFunc(data.id)
        })
    }

    baseFunc();
});