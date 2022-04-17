let urlLocSearch = window.location.search
let userId = urlLocSearch.split("=")[1]

let data = {userId:userId}
console.log(data)
fetch('/other-user.json',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data),
})
.then(response => response.json())
.then(data => {

    let otherUserDataObj = data.userData
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${otherUserDataObj.user_id}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${otherUserDataObj.first_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${otherUserDataObj.last_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${otherUserDataObj.email}</td>`)

    let otherUserRideObj = data.userLatestRide

    if(otherUserRideObj !== null){
        let latitude = otherUserRideObj.latitude
        let longitude = otherUserRideObj.longitude
        let coordinates  = otherUserRideObj.coordinates
        
        var mapDisplayConfig = L.map(
        "mapDisplay",
        {
            center: [latitude, longitude],
            crs: L.CRS.EPSG3857,
            zoom: 10,
            zoomControl: true,
            preferCanvas: false,
        }
    );
        var tile_layer = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
        ).addTo(mapDisplayConfig);
        
        L.polyline(coordinates,
                {"bubblingMouseEvents": true, "color": "#3388ff", "dashArray": null, "dashOffset": null, "fill": false, "fillColor": "#3388ff", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "noClip": false, "opacity": 1.0, "smoothFactor": 1.0, "stroke": true, "weight": 6}
            ).addTo(mapDisplayConfig);

    }
    else{

        var mapDisplayConfig = L.map(
            "mapDisplay",
            {
                center: [37.773972, -122.431297],
                crs: L.CRS.EPSG3857,
                zoom: 10,
                zoomControl: true,
                preferCanvas: false,
            }
        );
            var tile_layer = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(mapDisplayConfig);

    }

})
