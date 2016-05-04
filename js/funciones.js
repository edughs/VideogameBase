/* autor: edughs */

if(!historial_busquedas)
{
  var historial_busquedas = [];  
}

function recuperarDatos(option, callback){
    var urlBase = 'http://www.giantbomb.com/api/';
    var apiKey='911ccba1195c2c9fbe238a636e966bb0c9990d0a';
    var format='jsonp';
  	$.ajax({
      type: "GET",
      dataType: 'jsonp',
      async: false,
      url: urlBase + option + '/?api_key=' + apiKey + '&format=' + format + '&json_callback=?' + '&field_list=name,id,image,description' , /*+ '&limit=' + limit  + '&offset=' + offset,*/
      beforeSend: function(){
        $('.cargando').show();
      },
      success: function(data) {
        callback(data);            
      },
      error: function(jqXHR, textStatus, error) {
        alert( "se ha producido error. Estado " + textStatus + " error " + error + " jqXHR  " + jqXHR.responseText);
      },
      complete: function(){
        $('.cargando').hide();
      }
    });
}
function buscador(){

  var consulta = document.getElementById("busqueda").value; 

  if(consulta.length>0){
    busqueda(consulta, busquedaCallback);    
    historial_busquedas.push(consulta);   
    
    localStorage["historial"] = JSON.stringify(historial_busquedas);//Guardamos la busqueda en un historial en localStorage

    return true;
  }
  else{
    alert("Buscador vacío. Introduzca cadena a buscar");
    return false;
  }     
    
}

function busqueda(query, callback){
  var apiKey = "911ccba1195c2c9fbe238a636e966bb0c9990d0a";
  var urlBase = "http://www.giantbomb.com/api/";
  var format ='jsonp';
  var option ='search';

  $(document).ready(function() {

    $.ajax({
      type: "GET",
      dataType: 'jsonp',
      async: false,
      url: urlBase + option + '/?api_key=' + apiKey + '&format=' + format + '&json_callback=?' + '&query=' + encodeURI(query),
      beforeSend: function(){
        $('.cargando').show();
      },
      success: function(data){
        console.log(data);
        busquedaCallback(data);
      },
      error: function(jqXHR, textStatus, error) {
        alert( "se ha producido error. Estado " + textStatus + " error " + error + " jqXHR  " + jqXHR.responseText);
      },
      complete: function(){
        $('.cargando').hide();
      }
    });
  });
}
// callback para coger los resultados de la búsqueda
function busquedaCallback(data) {
    var resultados = data.results;
    var ultima_busqueda = [];

    $('#contenidoBusqueda').empty();

    for (var i=0; i < resultados.length; i++){
      var resultado = resultados[i];
      ultima_busqueda.push(resultado.name);
      $('#contenidoBusqueda').append('<div class="caja_resul col-xs-12 col-sm-6 col-md-4 col-lg-3"><a href="#"><h4>' 
      + resultado.name +'</h4></a><img class="img_juego col-xs-6" src="' + resultado.image.medium_url 
      + '" /><div class="caja_plat col-xs-6"><p>Plataformas: </p></div>');

      var salir=0;
      for(var j=0;j<resultado.platforms.length; j++)
      {                  
        plataforma = resultado.platforms[j].name;
        console.log(plataforma);
        $('.caja_resul:nth-child(' + (i + 1) + ') .caja_plat').append('<p>' + plataforma + '</p>');
        if(j>3){
          console.log("j > 3")
          salir=1;
        }        
      } 
      $('#contenidoBusqueda').append('</div>'); 
    }
}

  function personajes(data) {
    var personajes = data.results;
    var nombres_personajes = [];

    $('#contenidoPersonajes').empty();

    for (var i=0; i < personajes.length; i++){
      var personaje = personajes[i];
      nombres_personajes.push(personaje.name);//añadimos el personaje a la lista
      $('#contenidoPersonajes')
      .append((i+1) + '. ' + '<a href="#popupPersonajes" data-rel="popup" data-position-to="window"' + 'data-id="'+ i +'">' + personaje.name +'</a></br>');
        
    }
    $('#contenidoPersonajes' ).addClass('tres_columnas');//para que el contenido del div se muestre en 3 columnas
    localStorage["personajes"] = JSON.stringify(personajes);//creamos localstorage con la lista de objetos 
    localStorage["nombres_personajes"] = JSON.stringify(nombres_personajes);//creamos localstorage con la lista de nombres
    
  }

  function personajesOffline(){
    var personajes = JSON.parse(localStorage.getItem('nombres_personajes'));

    $('#contenidoPersonajes').empty();

    for (var i=0; i < personajes.length; i++){
      var personaje = personajes[i];
      console.log(personaje);
      $('#contenidoPersonajes')
      .append((i+1) + '. ' + '<a href="#">' + personaje +'</a></br>');        
    }
    $('#contenidoPersonajes' ).addClass('tres_columnas');
  }

  function juegos(data) {
    var juegos = data.results;
    var nombres_juegos = [];

    $('#contenidoJuegos').empty();

    for (var i=0; i < juegos.length; i++){
      var juego = juegos[i];
      nombres_juegos.push(juego.name);//añadimos el juego a la lista
      $('#contenidoJuegos')
      .append((i+1) + '. ' + '<a href="#popupJuegos" data-rel="popup" data-position-to="window"' + 'data-id="'+ i +'">' + juego.name +'</a></br>');        
    }
    $('#contenidoJuegos' ).addClass('tres_columnas');//para que el contenido del div se muestre en 3 columnas
    localStorage["juegos"] = JSON.stringify(juegos);//creamos localstorage con la lista de objetos 
    localStorage["nombres_juegos"] = JSON.stringify(nombres_juegos);//creamos localstorage con la lista de nombres 
  }

  function juegosOffline(){
    var juegos = JSON.parse(localStorage.getItem('nombres_juegos'));

    $('#contenidoJuegos').empty();

    for (var i=0; i < juegos.length; i++){
      var juego = juegos[i];
      console.log(juego);
      $('#contenidoJuegos')
      .append((i+1) + '. ' + '<a href="#">' + juego +'</a></br>');        
    }
    $('#contenidoJuegos' ).addClass('tres_columnas');
  }
  
  function franquicias(data) {
    var franquicias = data.results;
    var nombres_franquicias = [];

    $('#contenidoFranquicias').empty();

    for (var i=0; i < franquicias.length; i++){
      var franquicia = franquicias[i];
      nombres_franquicias.push(franquicia.name); //añadimos el franquicia a la lista
       $('#contenidoFranquicias')
      .append((i+1) + '. ' + '<a href="#popupFranquicias" data-rel="popup" data-position-to="window"' + 'data-id="'+ i +'">' + franquicia.name +'</a></br>');
        
    }
    $('#contenidoFranquicias' ).addClass('tres_columnas');//para que el contenido del div se muestre en 3 columnas
    localStorage["franquicias"] = JSON.stringify(franquicias);//creamos localstorage con la lista de objetos 
    localStorage["nombres_franquicias"] = JSON.stringify(nombres_franquicias);//creamos localstorage con la lista de nombres
  }

  function franquiciasOffline(){
    var franquicias = JSON.parse(localStorage.getItem('nombres_franquicias'));

    $('#contenidoFranquicias').empty();

    for (var i=0; i < franquicias.length; i++){
      var franquicia = franquicias[i];
      $('#contenidoFranquicias')
      .append((i+1) + '. ' + '<a href="">' + franquicia +'</a></br>');        
    }
    $('#contenidoFranquicias' ).addClass('tres_columnas');
  }

  function companias(data) {
    var companias = data.results;
    var nombres_companias = [];

    $('#contenidoCompanias').empty();

    for (var i=0; i < companias.length; i++){
      var compania = companias[i];
      nombres_companias.push(compania.name); //añadimos el franquicia a la lista
      $('#contenidoCompanias')
      .append((i+1) + '. ' + '<a href="#popupCompanias" data-rel="popup" data-position-to="window"' + 'data-id="'+ i +'">' + compania.name +'</a></br>');  
    }  
    $('#contenidoCompanias' ).addClass('tres_columnas');//para que el contenido del div se muestre en 3 columnas
    localStorage["companias"] = JSON.stringify(companias);//creamos localstorage con la lista de objetos 
    localStorage["nombres_companias"] = JSON.stringify(nombres_companias);//creamos localstorage con la lista de nombres
  }

  function companiasOffline(){
    var companias = JSON.parse(localStorage.getItem('nombres_companias'));

    $('#contenidoCompanias').empty();

    for (var i=0; i < companias.length; i++){
      var compania = companias[i];
      $('#contenidoCompanias')
      .append((i+1) + '. ' + '<a href="">' + compania +'</a></br>');        
    }
    $('#contenidoCompanias' ).addClass('tres_columnas');
  }
  



/*------------------------URLS de Prueba-------------------------------------------*/
//http://www.giantbomb.com/api/search/?api_key=911ccba1195c2c9fbe238a636e966bb0c9990d0a&format=jsonp&json_callback=jQuery1113030045633018016815_1446577931173&query=pokemon&_=1446577931174
//http://www.giantbomb.com/api/[RESOURCE-TYPE]/[RESOURCE-ID]/?api_key=[YOUR-KEY]&format=[RESPONSE-DATA-FORMAT]&field_list=[COMMA-SEPARATED-LIST-OF-RESOURCE-FIELDS]
//http://www.giantbomb.com/api/search/3030-4725/?api_key=911ccba1195c2c9fbe238a636e966bb0c9990d0a&format=json
//http://www.giantbomb.com/api/games/?api_key=911ccba1195c2c9fbe238a636e966bb0c9990d0a&format=json&field_list=name,id,image,description
