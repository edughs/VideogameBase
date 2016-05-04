/* autor: edughs */

// Eventos para el cambio de página

      $(document).on('swipeleft', '.ui-page', function(event){    
          if(event.handled !== true) // para evitar que se haga más de una vez
          {    
              var nextpage = $.mobile.activePage.next('[data-role="page"]');
              // si existe página siguiente se hace usa el id para cambiar
              if (nextpage.length > 0) {
                  $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
              }
              event.handled = true;
          }
          return false;         
      });

      $(document).on('swiperight', '.ui-page', function(event){     
          if(event.handled !== true) // para evitar que se haga más de una vez
          {      
              var prevpage = $(this).prev('[data-role="page"]');
              // si existe página previa se hace usa el id para cambiar
              if (prevpage.length > 0) {
                  $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
              }
              event.handled = true;
          }
          return false;            
      });
      
      $(document).on( "pageshow", '#main, #divPersonajes, #divJuegos, #divFranquicias, #divCompanias, #divBusqueda',  function(){
          ScaleContentToDevice() ;      
      });

      //CARGA DE PÁGINAS
      
      $('#main').on('pageinit', function() {
        $('#divPersonajes').on({
          pageshow: function() {
            if(navigator.onLine)
            {                
              recuperarDatos('characters', personajes);                
            }
            else
            {                
              personajesOffline();                
            }
          }
        });

        $('#divJuegos').on({
            pageshow: function() {
              if(navigator.onLine)
              {                
                recuperarDatos('games', juegos);               
              }
              else
              {                
                juegosOffline();                
              }
            }
        });

        $('#divFranquicias').on({
            pageshow: function() {
              if(navigator.onLine)
              {                
                recuperarDatos('franchises', franquicias);              
              }
              else
              {                
                franquiciasOffline();                
              }
            }
        });

        $('#divCompanias').on({
            pageshow: function() {
              if(navigator.onLine)
              {                
                recuperarDatos('companies', companias);              
              }
              else
              {                
                companiasOffline();                
              }
            }
        });
      }); 

      $(window).on("resize orientationchange", function(){
          ScaleContentToDevice();
      });
      
      function ScaleContentToDevice(){
          scroll(0, 0);
          var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
          $(".ui-content").height(content);
      }
      
      //BUSCADOR

      $('#buscar').on('click', function(){ buscador();});

      //Para activar la búsqueda al dar a la tecla enter
      
      $(document).on('keyup', '#busqueda', function(e) {
        if(e.keyCode == 13)
        {          
          buscador();
          $( ":mobile-pagecontainer" ).pagecontainer( "change", "#divBusqueda"); //para cambiar a la página de resultados        
        }
      });      

      //Asociamos el evento a los enlaces para mostrar los popups con la info

      $('#contenidoPersonajes').on('click', 'a', function(e){
        var id = parseInt(e.target.getAttribute('data-id'));
        var personajes = JSON.parse(localStorage.getItem('personajes'));
        var personaje= personajes[id];   
        $('#popupPersonajes').empty();
        $('#popupPersonajes').append('<h2>'+ personaje.name + '</h2>');
        $('#popupPersonajes').append('<img src="'+ personaje.image.medium_url + '" alt="">');
        $('#popupPersonajes').append(personaje.description);
      });

      $('#contenidoJuegos').on('click', 'a', function(e){
        var id = parseInt(e.target.getAttribute('data-id'));
        var juegos = JSON.parse(localStorage.getItem('juegos'));
        var juego= juegos[id];          
        $('#popupJuegos').empty();
        $('#popupJuegos').append('<h2>'+ juego.name + '</h2>');
        $('#popupJuegos').append('<img src="'+ juego.image.medium_url + '" alt="">');
        $('#popupJuegos').append(juego.description);
      });

      $('#contenidoFranquicias').on('click', 'a', function(e){
        var id = parseInt(e.target.getAttribute('data-id'));
        var franquicias = JSON.parse(localStorage.getItem('franquicias'));
        var franquicia= franquicias[id];
        $('#popupFranquicias').empty();
        $('#popupFranquicias').append('<h2>'+ franquicia.name + '</h2>');
        $('#popupFranquicias').append('<img src="'+ franquicia.image.medium_url + '" alt="">');
        $('#popupFranquicias').append(franquicia.description);
      });

      $('#contenidoCompanias').on('click', 'a', function(e){
        var id = parseInt(e.target.getAttribute('data-id'));
        var companias = JSON.parse(localStorage.getItem('companias'));
        var compania= companias[id];          
        $('#popupCompanias').empty();
        $('#popupCompanias').append('<h2>'+ compania.name + '</h2>');
        $('#popupCompanias').append('<img src="'+ compania.image.medium_url + '" alt="">');
        $('#popupCompanias').append(compania.description);
      });
        
      //     
      
      //ALERTAR DE LA DESCONEXIÓN
      window.addEventListener("online", function(){
        alert("CON CONEXION");
      });
      window.addEventListener("offline", function(){
        alert("SIN CONEXION");
      });