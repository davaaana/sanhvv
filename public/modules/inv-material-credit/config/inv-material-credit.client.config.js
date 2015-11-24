angular.module('rawMaterialDebit').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Бэлэн бүтээгдэхүүн',
            state: 'invMaterialCredit',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Орлогын жагсаалт',
            state: 'invMaterialCredit.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Орлогын бүртгэл',
            state: 'invMaterialCredit.create'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Зарлагын бүртгэл',
            state: 'invoiceDebit.create'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Зарлагын жагсаалт',
            state: 'invoiceDebit.list'
        });
    }
]);
