export function mapBox() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG15dHJveiIsImEiOiJja3VtdW1maXQxaDFwMnBvNmxrOXppazV2In0.N6oJsvCxI_914eJPYwBNUw';
  //  'pk.eyJ1IjoiZG15dHJveiIsImEiOiJja3U4M3VwM3k1cWJrMm9tcGd6NTZxNTZuIn0.TWtB-EtVE3Vd-cFl5q6oTg';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    //  style: 'mapbox://styles/mapbox/dark-v10',
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [2.3364, 48.86091], // starting position
    zoom: 15.75, // starting zoom
  });

  let container = document.querySelector('.container');
  changeCenterMap();
  window.addEventListener('resize', changeCenterMap);

  function changeCenterMap() {
    if (container.offsetWidth <= 1024 && container.offsetWidth > 420) {
      map.setCenter([2.33802, 48.86153]);
      map.setZoom(15.73);
    } else {
      map.setCenter([2.3364, 48.86091]);
    }
  }

  //   [2.3364, 48.86091]; center
  //   [2.3397, 48.8607] east
  //   [2.3365, 48.8625] north
  //   centerNew [2.33802,48.86153]

  // Create a default Marker, Louvre
  const marker1 = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([2.3364, 48.86091])
    .setPopup(
      new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(`<h1 style="  font-size: 22px;">Pyramide du Louvre</h1>`)
    )
    .addTo(map);

  // Create a default Marker and add it to the map.
  const marker2 = new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3333, 48.8602])
    .setPopup(
      new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(`<h1 style="  font-size: 22px;">Pavillon de la trémoille</h1>`)
    )
    .addTo(map);

  // Create a default Marker and add it to the map.
  const marker3 = new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3397, 48.8607])
    .setPopup(
      new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(`<h1 style="  font-size: 22px;">Cour Carree</h1>`)
    )
    .addTo(map);

  // Create a default Marker and add it to the map.
  const marker4 = new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.333, 48.8619])
    .setPopup(
      new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(`<h1 style="  font-size: 22px;">Piramide Invertida</h1>`)
    )
    .addTo(map);

  // Create a default Marker and add it to the map.
  const marker5 = new mapboxgl.Marker({ color: '#757575' })
    .setLngLat([2.3365, 48.8625])
    .setPopup(
      new mapboxgl.Popup({ offset: 30 }) // add popups
        .setHTML(
          `<h1 style="  font-size: 22px;">meto: Palais-Royal - Musée du Louvre</h1>`
        )
    )
    .addTo(map);
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  //   btn for changing style
  const changeBtn = document.querySelector('.dark-theme');

  changeBtn.addEventListener('click', () => {
    if (changeBtn.classList.contains('toggle-theme')) {
      map.setStyle('mapbox://styles/mapbox/dark-v10');
    } else {
      map.setStyle('mapbox://styles/mapbox/light-v10');
    }
  });
}
