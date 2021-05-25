// $(document).ready(()=>{
//     console.log("Hola mundo");
// });
var autocompleteStart;
var autocompleteEnd;
function searchPlaces() {
  const searchString = $("#search-text").val();
  console.log(searchString);
}

function initMap() {
  const inputStart = document.getElementById("search-text-1");
  const inputEnd = document.getElementById("search-text-2");
  const center = { lat: 19.42702565818043, lng: -99.16760739677724 };
  // Create a bounding box with sides ~10km away from the center point
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };
  const options = {
    bounds: defaultBounds,
    fields: ["address_components", "geometry", "icon", "name"],
    origin: center,
    strictBounds: false,
  };
  autocompleteStart = new google.maps.places.Autocomplete(inputStart, options);
  autocompleteEnd = new google.maps.places.Autocomplete(inputEnd, options);
}

function saveData() {
  const name = $("#name").val();
  const desc = $("#desc").val();
  const status = $("#status").val();

  var placeStart = autocompleteStart.getPlace();
  var placeEnd = autocompleteEnd.getPlace();

  if (name != "" && desc != "" && status && placeStart && placeEnd) {
    const latStart = placeStart.geometry.location.lat();
    const lonStart = placeStart.geometry.location.lng();

    const latEnd = placeEnd.geometry.location.lat();
    const lonEnd = placeEnd.geometry.location.lng();

    $.post({
      traditional: true,
      url: "/shipping",
      contentType: "application/json",
      data: JSON.stringify({
        customer: name,
        descrip: desc,
        status: status,
        origin_lat: latStart,
        origin_long: lonStart,
        current_lat: latStart,
        current_long: lonStart,
        end_lat: latEnd,
        end_long: lonEnd,
      }),
      dataType: "json"
    })
      .done(() => {
        Swal.fire({
          title: "Entrega guardada!",
          text: "La información se ha guardado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      })
      .fail((err) => {
          if(err.status===400){
            Swal.fire({
                title: "Error!",
                text: err.responseJSON.error,
                icon: "error",
                confirmButtonText: "Aceptar",
              });
          } else {
            Swal.fire({
                title: "Error!",
                text: "Hubo un problema, lo sentiemos",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
          }
      });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Todos los campos son obligatorios",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
}
