function tplawesome(e,t){res=e;
                        for(var n=0;n<t.length;n++){
                            res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
                                                             //  console.log(t);
                                                               //console.log(r);
                                                               //console.log(n);
                                                              return t[n][r]})
                          }
          return res}
      
 localizacion=[];   
//console.log(peticion.searchList);
  var nextPageToken="",prevPageToken=""; 

$(function() {
    $("form").on("submit", function(e) {
      // e.preventDefault();//search
           cargarvideo();
             console.log("en busqueda RRR",localizacion);
      if(document.getElementById("conDireccion").checked ){
           
           var map=document.getElementById("mapinfo");
            map.style.height="100%";
            map.style.width="100%";

             
        //  cargamapa();
           if(document.getElementById("re")!==undefined)
              {  console.log("fsdfsdfbbuuu", document.getElementById("re"));
                // document.getElementById("re").remove()
            }
      }
      else{  
           var map=document.getElementById("mapinfo");
            map.style.height=0;

           if(document.getElementById("re")!==null)
              {   console.log("borrando re",document.getElementById('re')); 
                  document.getElementById('resultado').removeChild(document.getElementById('re'));
                 // document.getElementById("re").remove()
                  console.log("accediendo re ",document.getElementById('re')); 
               }
       if(document.getElementById("re")===null)
         $('#resultado').append('<div id="re"  class="row small-up-2 medium-up-4 large-up-4"> </div>' );
           console.log("estutus ",document.readyState);
          // sinDireccion();
            
          //cargarvideoSinDireccion();    
    }
    console.log("cargado",document.readyState);
   
 localizacion=[];  

    });
    
    $(window).on("resize", resetVideoHeight);

     var map=document.getElementById("mapinfo");
            map.style.height=0;
            map.style.width=0;
    
});

 $('#next').append("<div id=\"page\"><button type=\"button\" id=\"prevPageButton\">Prev Page "+prevPageToken+"</button></div>");
 $('#next').append("<div id=\"page\"><button type=\"button\" id=\"nextPageButton\">Next Page "+nextPageToken+"</button></div>");
    var la,lon;

   function cargamapa() {

      console.log("hola mundo en mapita");
      console.log(la);
      console.log(lon);
      var uluru =  {lat: 40.689249, lng:  -74.0445};
    
       //var uluru = {lat:la, lng: lon};
       var map = new google.maps.Map(document.getElementById('mapinfo'), {
       zoom: 3, 
       center: uluru,
       streetViewControl: false,
     });
   //    console.log("map",map);
   var contentString = function(titulo,video,fecha,canal,visitas,direccion){
      var contenido='<div id="content">'+
      '<h5 id="firstHeading" class="firstHeading">'+titulo+'</h5>'+     
      '<iframe class = video w10 width=150 height=150  src=//www.youtube.com/embed/'+video+'?autoplay=1></iframe>'+
      '<pre>'+
      '<p> fecha: ' +fecha+ '</p>'+
      '<p> canal: ' +canal+'</p>'+
      '<p> numero Visitas: ' +visitas+'</p>'+
      '<p> direccion: ' + direccion+ '</p>'+
        '</pre>'+
      '<div id="bodyContent">'+
      
       '</div>'+
      '</div>';
      return contenido;
  };


    var infowindow = new google.maps.InfoWindow({
     // content: contentString
       });
       console.log("dentro de mapa ",localizacion);
      localizacion.forEach(function(cuidad) {
  //  console.log("en mapa ",   cuidad.lat);
      if(cuidad.direccion!==undefined){
                var marker = new google.maps.Marker({
                position: new google.maps.LatLng(cuidad.lat , cuidad.lng ),
                //icon: icons[feature.type].icon,
                label: "" ,
                map: map,
                });

                marker.addListener('click', function() {
                    infowindow.setContent(contentString(cuidad.titulo,cuidad.video,cuidad.fecha,cuidad.canal,cuidad.visitas,cuidad.direccion));
                infowindow.open(map, marker);
            });
     }
});
  //localizacion=[];  
    }
   var idDireccion=0;    var direccion="sin direccion";


   var videoList=function(){
       var request =peticion.searchList(["snippet","id"],"video",encodeURIComponent($("#buscar").val()).replace(/%20/g, "+"),5,nextPageToken);
        request.getPromise();
        console.log("ffee",request.getPromise());
 var results;
       request.execute(function(response) {
         results = response.result;
          console.log(results);
         
       });      return request.getPromise();    
   }

   function cargarvideo(page){
      var cargando = $("#cargando");
         cargando.show();
 
       var identificador=1;
       var request =peticion.searchList(["snippet","id"],"video",encodeURIComponent($("#buscar").val()).replace(/%20/g, "+"),$('#cantidad').val(),page);
      //  request.getPromise();
       var uluru =  {lat: 40.689249, lng:  -74.0445};
    
       //var uluru = {lat:la, lng: lon};
       var map = new google.maps.Map(document.getElementById('mapinfo'), {
       zoom: 3, 
       center: uluru,
       streetViewControl: false,
     });
      var infowindow = new google.maps.InfoWindow({
     // content: contentString
       });
       request.execute(function(response) {
              var results = response.result;
              $("#resultados").html("");
              nextPageToken=response.nextPageToken;
              // console.log(nextPageToken);
              console.log(results);
              
              $.each(results.items, function(index, item) {
              //  var videos=peticion.videosList(["snippet","statistics"],"okqhh8YbLyA");
                console.log("resultado",item.snippet.channelId);  

              var videos=peticion.videosList(["snippet","statistics","recordingDetails"],item.id.videoId);
             // $.get("temporal/tempo.html", function(data) {
              var numeroVisitas=0;    
                  // console.log(data);
                  
              var video=videos.execute( function(respuesta){
                         numeroVisitas=respuesta.items[0].statistics.viewCount;
                         var geocoder = new google.maps.Geocoder;
                         idDireccion=idDireccion+1;
                         var latlng = {};//{lat: la, lng: lon};
                            //  console.log("direcciones ",respuesta.items[0].recordingDetails);
                         latlng['titulo']=item.snippet.title;
                         latlng['video']=item.id.videoId; 
                         latlng['fecha']=item.snippet.publishedAt; 
                         latlng['canal']=item.snippet.channelTitle; 
                         latlng['visitas']=numeroVisitas; 
 
                         
                            
                  //       console.log("recordingDetails ", respuesta.items[0].recordingDetails);
                        if(respuesta.items[0].recordingDetails!==undefined)
                           {
                           if(respuesta.items[0].recordingDetails.location!==undefined)
                              { //console.log("latitudes ",respuesta.items[0].recordingDetails.location)
                            
                                la= respuesta.items[0].recordingDetails.location.latitude;
                                lon= respuesta.items[0].recordingDetails.location.longitude;
                             
                                var lalon={lat:la,lng:lon};
                                latlng['lat']=la;
                                latlng['lng']=lon;

                                 var geoCodKeys = [
                                'AIzaSyCF82XXUtT0vzMTcEPpTXvKQPr1keMNr_4',
                                   'AIzaSyAYPw6oFHktAMhQqp34PptnkDEdmXwC3s0',
                                    'AIzaSyAwd0OLvubYtKkEWwMe4Fe0DQpauX0pzlk',
                                    'AIzaSyDF3F09RkYcibDuTFaINrWFBOG7ilCsVL0',
                                    'AIzaSyC1dyD2kzPmZPmM4-oGYnIH_0x--0hVSY8',
                                    'AIzaSyDwKS_FABuUt6nQGwyg_tuZE7izmqJqnVs',
                                    'AIzaSyD0xn7i5w9_lShQq5dK9jdOEKO8No51IA8',
                                    'AIzaSyBqCNOdlFoZnlZAdkFMQigJ0CZwyv6AHJQ',                 
                            ];
                                var key = jQuery.rand(geoCodKeys);
                              var loca=ubicarDireccion(map,infowindow,latlng,key,cargando);
                              
                                {
                                    cargando.show();
                                  
                                   console.log("hola ubo error");
                                   console.log(new Date());
                                
                                  
                                   console.log("hola ubo errores");
                                   console.log(new Date().getTime());

                                 
                                }
                               cargando.hide();
                                        $(".cargado").fadeOut("slow");

                              
                } 
                             
                }else
                if(document.getElementById("sinDireccion").checked)
                {// console.log("fffee",latlng);
                               cargando.hide();
                                        $(".cargado").fadeOut("slow");

                             if(latlng.direccion===undefined) {
                               $("#re").append("<div id=id"+idDireccion+" class= 'video card grid-example col s12 '>" +
                                       "<h6 class='titulo'>"+item.snippet.title+"</h6>"+
                                        "<iframe class =card-section video w10 width=150 height=150  src=//www.youtube.com/embed/"+item.id.videoId+"></iframe>"+
                                        "<h8>fecha:"+item.snippet.publishedAt+"</h8>"+
                                        "<h8>canal: "+item.snippet.channelTitle+"</h8>"+
                                        "<h8>visitas:" +numeroVisitas+"</h8>"+
                                       "</div>");

                         }

                         }
                       
                     
                           localizacion.push(latlng);   
       
                            var boton=document.getElementById("video"+(identificador));
                                     
                                 var info=document.getElementById('mapinfo');
                       
                 });

          }); 
          resetVideoHeight();
       });

      request.then(function(res){
          if(res.status===200)
                    console.log("en then",localizacion);
             
        console.log("en then",res.status);
      }) //cargamapa();
         return 0;
   }

    function sinDireccion(){
  
       if(document.getElementById("re")!==null)
              {   console.log("borrando re",document.getElementById('re')); 
                  document.getElementById('resultado').removeChild(document.getElementById('re'));
                 // document.getElementById("re").remove()
                  console.log("accediendo re ",document.getElementById('re')); 
               }
       if(document.getElementById("re")===null)
         $('#resultado').append('<div id="re"  class="row small-up-2 medium-up-4 large-up-4"> </div>' );
      // $('#resultado').append("<div id=\"re\" ><button type=\"button\" id=\"nextPageButton\">Next Page </button></div>");
         
         localizacion.forEach(function(cuidad){

             console.log("sinDireccion ", cuidad.direccion);
             console.log("sinDireccion ", document.getElementById("resultado"));
            if(cuidad.direccion===undefined)
             {  

            $('#re').append("<div id=id"+idDireccion+" class= 'video grid-example col s12 column'>" +
                            "<h6 class='titulo'>"+cuidad.titulo+"</h6>"+
                             "<iframe class = video w10 width=350 height=350  src=//www.youtube.com/embed/"+cuidad.video+"></iframe>"+
                            "<h8>fecha:"+cuidad.fecha+"</h8>"+
                            "<h8>canal: "+cuidad.canal+"</h8>"+
                              "<h8>visitas:" +cuidad.visitas+"</h8>"+
                               "</div>");
                  }  
                          idDireccion=idDireccion+1;     
          });                   
        

 //localizacion=[]; 
    
  }
  (function($) {
        $.rand = function(arg) {
            if ($.isArray(arg)) {
                return arg[$.rand(arg.length)];
            } else if (typeof arg === "number") {
                return Math.floor(Math.random() * arg);
            } else {
                return 8;  // chosen by fair dice roll
            }
        };
    })(jQuery);
var ubicarDireccion=function(map,infowindow,datos,espera,key,cargador){

  
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+datos.lat+","+datos.lng+"&"+key+'=key';

          

        $.ajax({
            type: "GET",
            url: url,//"includes/archivo.php",
          //  data: dataString,
            success: function(data) {
                  //  var address = getParameterByName('address', this.url);
                   // var index = errorArray.indexOf(address);
                    try
                    {      console.log("con ajax ",data.results[1].formatted_address);

                         direccion=data.results[1].formatted_address;
                   
                      datos['direccion']=(utilidades.existe(localizacion,direccion))?direccion=direccion+0.01:direccion;
                  var contenido='<div id="content">'+
                   '<h5 id="firstHeading" class="firstHeading">'+datos.titulo+'</h5>'+     
                   '<iframe class = video w10 width=150 height=150  src=//www.youtube.com/embed/'+datos.video+'?autoplay=1></iframe>'+
                   '<pre>'+
                   '<p> fecha: ' +datos.fecha+ '</p>'+
                   '<p> canal: ' +datos.canal+'</p>'+
                   '<p> numero Visitas: ' +datos.visitas+'</p>'+
                   '<p> direccion: ' + datos.direccion+ '</p>'+
                            '</pre>'+
                            '<div id="bodyContent">'+
                                        
                         '</div>'+
                    '</div>';
           if(document.getElementById("conDireccion").checked) {    
              var marker = new google.maps.Marker({
              position: new google.maps.LatLng(datos.lat , datos.lng ),
                         //icon: icons[feature.type].icon,
              label: "" ,
               map: map,
             });
           marker.addListener('click', function() {
           infowindow.setContent(contenido);
           infowindow.open(map, marker);
              });
               cargador.hide();
                                        $(".cargado").fadeOut("slow");

            }
                    
                    }catch(e){
                        if(data.status = 'ZERO_RESULTS')
                            return false;

            
            
                        addMarkers( address, 'Errror' );
                        if (index == -1) {
                            errorArray.push( address );
                        }
                    }
        }


        });



}

    function cargarvideoSinDireccion(){
                        
      
       var identificador=1;
       var request =peticion.searchList(["snippet","id"],"video",encodeURIComponent($("#buscar").val()).replace(/%20/g, "+"),5,nextPageToken);
        request.getPromise();

       request.execute(function(response) {
          var results = response.result;
          $("#resultados").html("");
        //  console.log(response);  
          nextPageToken=response.nextPageToken;
         // console.log(nextPageToken);
        //  console.log(results.items);
          $.each(results.items, function(index, item) {
              //  var videos=peticion.videosList(["snippet","statistics"],"okqhh8YbLyA");
          
              var videos=peticion.videosList(["snippet","statistics","recordingDetails"],item.id.videoId);
              $.get("temporal/tempo.html", function(data) {
                  var numeroVisitas=0;    
                  // console.log(data);

                  var video=videos.execute( function(respuesta){
                        numeroVisitas=respuesta.items[0].statistics.viewCount;

                   //     console.log("yoooo  ",respuesta);
                        
                         var div=document.createElement('div');
                         
                             div.setAttribute('id','re');
                             div.setAttribute('class','row small-up-2 medium-up-4 large-up-4');
                             document.getElementById('resultado').appendChild(div);
                                
                         var geocoder = new google.maps.Geocoder;
                        
                          idDireccion=idDireccion+1;
                        if(respuesta.items[0].recordingDetails!==undefined)
                      {
                                la= respuesta.items[0].recordingDetails.location.latitude;
                             lon= respuesta.items[0].recordingDetails.location.longitude;
                         var latlng = {lat: la, lng: lon};
                           localizacion.push(latlng);
                         
                                    
                }
                       
                       else{
                              $("#re").append("<div id=id"+idDireccion+" class= 'video card-section grid-example col s12 column'>" +
                                       "<h6 class='titulo'>"+item.snippet.title+"</h6>"+
                                        "<iframe class = video w10 width=150 height=150  src=//www.youtube.com/embed/"+item.id.videoId+"></iframe>"+
                                        "<h8>fecha:"+item.snippet.publishedAt+"</h8>"+
                                        "<h8>canal: "+item.snippet.channelTitle+"</h8>"+
                                        "<h8>visitas:" +numeroVisitas+"</h8>"+
                                       "</div>");
                           
                           direccion="sin direccion";}
                              
       
                            var boton=document.getElementById("video"+(identificador));
                              
                        
                 });

                  
         });
          }); 
          resetVideoHeight();
       });
       
         
   }
   $('#nextPageButton').click(function()
    {  console.log(nextPageToken);
        cargarvideo(nextPageToken);
//    console.log("videlo lis ",videoList());
          //cargamapa();
          console.log("que es ",document.getElementById("conDireccion").checked);
          if(    document.getElementById("conDireccion").checked ){
           
            $(document).ready(function(){
               
                cargamapa();
                    console.log("ffff ",localizacion);
                for (var index = 0; index < localizacion.length; index++) {
                var element = localizacion[index];
                  console.log("ffff ",element);
           }
               });
      }
    else{  
        if(document.getElementById("mapinfo")!==undefined)
         { 
            document.getElementById("re").remove()
             var map=document.getElementById("mapinfo");
            map.style.height=0;
        }
         cargarvideoSinDireccion();
    }
});
  
   $('#sinDireccion').click(function()
    { 
        
    
        if(document.getElementById("mapinfo")!==undefined)
         { 
           // document.getElementById("re").remove()
             var map=document.getElementById("mapinfo");
            map.style.height=0;
        }
        sinDireccion()// cargarvideoSinDireccion();
    
});
   $('#conDireccion').click(function()
    { 
          console.log("que es ",document.getElementById("conDireccion").checked);
          if(    document.getElementById("conDireccion").checked ){
           
            $(document).ready(function(){
                var map=document.getElementById("mapinfo");
                map.style.height="100%";
                map.style.width="100%"
            if(document.getElementById("re")!==null)
              {   console.log("borrando re",document.getElementById('re')); 
                  document.getElementById('resultado').removeChild(document.getElementById('re'));
                 // document.getElementById("re").remove()
                  console.log("accediendo re ",document.getElementById('re')); 
               }
                cargamapa();
                  
               });
      }
    else{  
        if(document.getElementById("mapinfo")!==undefined)
         { 
           // document.getElementById("re").remove()
             var map=document.getElementById("mapinfo");
            map.style.height=0;
        }
        sinDireccion()// cargarvideoSinDireccion();
    }
});
 
function resetVideoHeight() {
//    $(".video").css("height", $("#resultados").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDidf3W8T4sLPLH1shON1Wue4_FcSXLm3Q");
    gapi.client.load("youtube", "v3", function() {
    });
}    