'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      //   console.log(position);
      const { latitude } = position.coords;
      const longitude = position.coords.longitude;
      //   console.log(`https://www.google.ca/maps/@${latitude},${longitude}`);
      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13);

      L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map);

      map.on('click', function(mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        console.log(lat, lng);
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup'
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function() {
      alert('Could not get your position');
    }
  );
}
