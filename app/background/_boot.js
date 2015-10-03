(function() {
  'use strict';
  setTimeout(::ns.boot, 0);

  ns.run(runBlock);

  runBlock.$inject = ['main'];

  function runBlock(main) {
    main.activate();
  }
})();