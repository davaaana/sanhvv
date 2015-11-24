angular.module('report').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Тайлан',
            state: 'report',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Материалийн орлого',
            state: 'report.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Материалын зарлага',
            state: 'report.create'
        });

        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Бүтээгдэхүүний орлого',
            state: 'report.list'
        });

        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Бүтээгдэхүүний зарлага',
            state: 'report.create'
        });

        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Бүтээгдэхүүний нийт орлого',
            state: 'report.invTotal'
        });


        Menus.addSubMenuItem('topbar', 'report', {
            title: 'Түүхийн эдийн нийт үлдэгдэл',
            state: 'rawMaterialDebit.total'
        });
    }
]);
