const http = require('http');
const url = require('url');
const sd = require('string_decoder').StringDecoder;

const config = require('./config');
// The serverr should resp

var server = http.createServer( 
    function(req , res){
        var parsedUrl = url.parse( req.url, true);
        var path = parsedUrl.pathname;
        var trimmedPath = path.replace (/^\/+|\/+$/g,'');

        // query string

        var queryStringObject = parsedUrl.query;
        
        var headers=req.headers;
        // get verb
        var method = req.method.toLocaleLowerCase();

        var decoder = new sd('utf-8');
        var buffer = '';
        req.on('data', function(data){ 
            buffer += decoder.write(data) ;
        });
        req.on('end', function() {
            buffer += decoder.end();

            // choose the handler for request - defulat to notfound

            var choosenhandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;

            // construct data object to send to the handler

            var data = {
                'trimmedPath' : trimmedPath,
                'queryStringObject' : queryStringObject,
                'method' : method,
                'headers': headers,
                'payload ' : buffer
            };

            choosenhandler(data, function(statusCode, payload ){
                // used the status code or default
                statuscode = typeof( statuscode)== 'number' ? statusCode : 200;

                // use the payload or default to empty

                payload = typeof( payload) == 'object' ? payload : {};

                // Convert the payload to a string

                var payLoadString = JSON.stringify(payload);
                res.setHeader('content-type','application/json');
                res.writeHead(statusCode);
                res.end(payLoadString);
                console.log( "request is received on " + trimmedPath + " with " + method + " with these query string Parameters " + JSON.stringify(queryStringObject )) ;
                console.log ("headers " + JSON.stringify(headers ));
                console.log('payload ' + payLoadString );  


            });
        });
    } 
);

//get the url and parse


server.listen( config.port, function() {console.log(" Server is listening on " + config.port + ' for env name ' + config.envName )} );


var unifiedServer = function( req, res ) {



};
var handlers = {};

handlers.sample = function( data, callback ){
   // callback an http status code  and a payload object
   callback(406,{'name': 'sample handler'});

};

handlers.notfound= function( data, callback ) {
    callback(404);
};
var router = {
    'sample' : handlers.sample
};