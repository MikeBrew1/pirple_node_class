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

var currentEnvironmant = typeof(process.env.NODE_ENV ) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

console.log('current ' + currentEnvironmant + ' p = ' + process.env.NODE_ENV + ' typeof ' + typeof process.env.NODE_ENV);

var envionmentToExport = typeof(environments[currentEnvironmant]) == 'object' ? environments[currentEnvironmant] : environments.staging;

module.exports = envionmentToExport;