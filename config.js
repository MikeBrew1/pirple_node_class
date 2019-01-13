// config object

environments = {} ;

// staging
environments.staging = {
    'httpPort' : 4444,
    'httpsPort' : 4445,
    'envName' : ' staging'
};

//produciton

environments.production = {
'httpPort': 5555,
'httpsPort' : 5556,
'envName' : 'production'
}

// set the environement

var currentEnvironment = typeof(process.env.NODE_ENV ) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

console.log('current ' + currentEnvironment + ' p = ' + process.env.NODE_ENV + ' typeof ' + typeof process.env.NODE_ENV);

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;