angular.module('rawMaterialDebit').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Түүхийн эд',
            state: 'rawMaterialDebit',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'rawMaterialDebit', {
            title: 'Жагсаалт',
            state: 'rawMaterialDebit.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'rawMaterialDebit', {
            title: 'Орлого үүсгэх',
            state: 'rawMaterialDebit.create'
        });

    }
]);
