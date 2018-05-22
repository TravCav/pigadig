(function () {
    console.log('begin');

    function Item(data) {
        this.name = data.name;
        this.time = data.time;
        this.dependencies = data.dependencies;
    }

    function Storage(initSize) {
        this.size = initSize;
        this.items = [];
    }

    function Factory() {
        this.size = 0;
        this.itemsMade = [];
        this.makeableItems = [];
    }

    function Users() {
        this.requiredItems = [];
    }

    function Req(item, amount) {
        this.item = item;
        this.amount = amount;
    }


    console.log('init');

    var mtl = new Item({ name: 'mtl', time: 1, dependencies: [] });
    var wd = new Item({ name: 'wd', time: 3, dependencies: [] });
    var plstc = new Item({ name: 'plstc', time: 9, dependencies: [] });
    var sd = new Item({ name: 'sd', time: 20, dependencies: [] });
    var mnrls = new Item({ name: 'mnrls', time: 30, dependencies: [] });
    var chmcl = new Item({ name: 'chmcl', time: 120, dependencies: [] });
    var txtls = new Item({ name: 'txtls', time: 180, dependencies: [] });
    var sgrndspcs = new Item({ name: 'sgrndspcs', time: 240, dependencies: [] });
    var glss = new Item({ name: 'glss', time: 300, dependencies: [] });

    var nls = new Item({ name: 'nls', time: 5, dependencies: [new Req(mtl, 2)] });
    var plnks = new Item({ name: 'plnks', time: 30, dependencies: [new Req(wd, 2)] });
    var brks = new Item({ name: 'brks', time: 20, dependencies: [new Req(mnrls, 2)] });
    var cmnt = new Item({ name: 'cmnt', time: 50, dependencies: [] });
    var gl = new Item({ name: 'gl', time: 60, dependencies: [] });


    var storage = new Storage(100);

    console.log(nls.dependencies[0].item.name);
})();
