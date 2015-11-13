angular.module('rawMaterialDebit').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Түүхийн эд үйлдвэрлэх',
            state: 'invMaterialCredit',
            type: 'dropdown'
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Түүхийн эдийн үйлдвэрлэлийн жагсаалт',
            state: 'invMaterialCredit.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'invMaterialCredit', {
            title: 'Түүхийн эдийн үйлдвэрлэл үүсгэх',
            state: 'invMaterialCredit.create'
        });
    }
]);
