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

        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Хэмжих нэгжийн жагсаалт',
            state: 'unit.list'
        });

        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Хэмжих нэгжийн үүсгэх',
            state: 'unit.create'
        });

        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Бэлэн бүтээгдэхүүний жагсаалт',
            state: 'product.list'
        });

        Menus.addSubMenuItem('topbar', 'materialType', {
            title: 'Бэлэн бүтээгдэхүүн нэмэх',
            state: 'product.create'
        });
    }
]);
