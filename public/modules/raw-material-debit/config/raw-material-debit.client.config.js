angular.module('rawMaterialDebit').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Түүхийн эдийн орлого',
            state: 'rawMaterialDebit',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'rawMaterialDebit', {
            title: 'Түүхийн эдийн орлогын жагсаалт',
            state: 'rawMaterialDebit.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'rawMaterialDebit', {
            title: 'Түүхийн эдийн орлого үүсгэх',
            state: 'rawMaterialDebit.create'
        });

        Menus.addSubMenuItem('topbar', 'rawMaterialDebit', {
            title: 'Түүхийн эдийн нийт үлдэгдэл',
            state: 'rawMaterialDebit.total'
        });
    }
]);
