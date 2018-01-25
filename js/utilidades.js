var utilidades=(function(){
            var agregarElemento=function(objeto){
              var parts="";
                    for (var key in objeto) {
                        if (objeto.hasOwnProperty(key)) {
                            var element = objeto[key];
                                  parts=parts+ element+((key<objeto.length-1)?",":"");
                                
                        }
                    }
                   return parts;
             }
             var existe=function(objeto,valor){
                       var respuesta=false;
                        objeto.forEach(function(element) {
                           //   console.log(element);
                               if ((Object.values(element)).includes(valor)) {
                                     respuesta=  true;
                              }        
                        });
                       return respuesta;
             }
       var wait=  function(ms){
            var start = new Date().getTime();
            var end = start;
            while(end < start + ms) {
            end = new Date().getTime();
            }
      }
       return {
               "agregarElemento":agregarElemento,
               "existe":existe,
               "wait":wait
       };     

})();