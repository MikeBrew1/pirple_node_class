/*
Library used for storing and editing data
*/

// Dependencies

var fs = require('fs');

var path = require('path');

// Container for the module (exports)
var lib = {};

// define the base data directory

lib.basedir = path.join(__dirname,'../.data/'); // path from lib

//write data to a file
lib.create = function( dir, file , data , callback ) {
    // open the file for writing
    fs.open(lib.basedir+dir+'/'+file+'.json','wx', function(err, fileDescriptor ) {
        if (!err && fileDescriptor ) {
            console.log('openned ' + lib.basedir+dir+'/'+file+'.json')
            //convert data to string
            var stringData = JSON.stringify(data);

            // write the file
            fs.writeFile (fileDescriptor, stringData, function(err) {
                if ( !err ) {
                    fs.close(fileDescriptor, function( err ){
                        if(!err) {
                            callback(false); // false becasue there is no error
                        }
                        else {
                            callback('error closing file');
                        }
                    });
                }
                else {
                    callback('error writing to new file')
                }
            });
        }
        else {
            callback('error opening file ' );
        };
    });

};

// Read data 

lib.read= function(dir,file, callback){
    fs.readFile(lib.basedir + dir + '/' + file +'.json', 'utf8', function( err, data ){
        callback(err, data);
    });
};

lib.update = function(dir, file, data, callback ) {
    fs.open(lib.basedir+dir+'/'+file+'.json','r+', function(err, fileDescriptor ) {
        if (!err && fileDescriptor ) {
            //convert data to string
            var stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, function (err) {
                if (!err) {
                     // write the file
                    fs.writeFile (fileDescriptor, stringData, function(err) {
                        if ( !err ) {
                            fs.close(fileDescriptor, function( err ){
                                if(!err) {
                                    callback(false);
                                }
                                else {
                                    callback('error closing existing file');
                                }
                            });
                        }
                        else {
                            callback('error writing existing file')
                        }
                    });
                }
                else{
                    callback('error truncating file');
                }
            });
           
        }
        else {
            callback('update file does not exist' );
        };
    });

};

lib.delete = function( dir, file, callback ) {
    fs.unlink(lib.basedir + dir + '/' + file +'.json', function (err) {
        if( !err ) { callback(false);}
        else {
            callback('could not unlink');
        }
    });
}

// export
module.exports = lib;

