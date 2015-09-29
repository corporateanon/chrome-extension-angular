var t = require('tcomb-validation');
var validate = t.validate;
var mb = t.maybe;


var TPath = t.refinement(t.String, function() {
  return true;
}, 'TPath');

var TPathList = t.list(TPath, 'TPath');

var TSpaConfig = t.struct({
  buildDev        : TPath,
  buildProd       : TPath,
  destAssets      : TPath,
  js              : TPathList,
  html            : mb(TPath),
  vendorJs        : mb(TPathList),
  angularTemplates: mb(TPathList),
}, 'TSpaConfig');

exports.TSpaConfig = TSpaConfig;
exports.validate = validate;