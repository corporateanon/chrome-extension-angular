window.ns = (function() {
  const ns = {};
  ns.service = service;
  ns.get = get;
  ns.boot = boot;
  ns.run = run;

  const services = new Map();
  const instances = new Map();
  const onRun = [];

  return ns;

  ////////

  function boot() {
    onRun.forEach(instantiateService);
  }

  function run(cb) {
    onRun.push(cb);
  }

  function service(id, serviceConstructor) {
    id = '' + id
    services.set(id, serviceConstructor);
  }

  function get(id) {
    id = '' + id
    instantiateId(id);
    return instances.get(id);
  }

  function instantiateService(serviceConstructor) {
    const dependencies =
      (serviceConstructor.$inject || []).map(get);
    return new serviceConstructor(...dependencies);
  }

  function instantiateId(id) {
    console.info(`instantiate(${id})`);

    if (!services.has(id)) {
      throw new Error(`service not found: ${id}`);
    }
    if (instances.has(id)) {
      return;
    }

    instances.set(id, instantiateService(services.get(id)));
  }
})();
