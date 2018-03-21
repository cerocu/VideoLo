var peticion=(function(){
            var searchList=function(p,tipo,busqueda,max,PageToken){
                console.log(PageToken);
              var parts=utilidades.agregarElemento(p);
                        var r= gapi.client.youtube.search.list({
                    //    part: p,
                        part:parts,//'snippet,id',//"snippet",//p.forEach(function(element) {element }, this),
                        type: tipo,
                        q: busqueda,
                        maxResults: max,// 10,
                       // order: "viewCount",
                       // videoSyndicated:"any",
                     //   regionCode:"MX",
                        //pageToken:PageToken
                });
               
                return r;
             }

             var videosList=function(p,ids){
              var parts=utilidades.agregarElemento(p);
                        var r= gapi.client.youtube.videos.list({
                
                        part:parts,
                    id:ids
                  
                });
             
                return r;
             }
             

             var canalList=function(){
                 return gapi.client.youtube.channels.list({
                            part: "snippet",
                            id: "UCgEl8CQ1RZ3F9tgSMSH-40w" 
                          
                    }); 

             }

       return {
               "searchList":searchList,
               "videosList":videosList 
       };
           

})();
