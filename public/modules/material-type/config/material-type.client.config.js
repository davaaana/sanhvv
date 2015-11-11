angular.module('materialType').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Материалын төрөл',
            state: 'materialType',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Материйлын жагсаалт',
            state: 'materialType.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Материал үүсгэх',
            state: 'materialType.create'
        });
    }
]);
