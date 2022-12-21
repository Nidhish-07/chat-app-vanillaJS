const socket = io()


socket.on('message', (message) => {
    console.log(message);
})


const form = document.getElementById("message_form")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = event.target.elements.message.value

    socket.emit("sendMessage", message)
})


const locationButton = document.getElementById("sendLocation")

locationButton.addEventListener("click", (event) => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords

        socket.emit("sendLocation", { lat, lng })
    })
})

// socket.on('getLocation', (location) => {
//     console.log(location.lat, location.lng);
// })