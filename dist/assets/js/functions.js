const Search = function() {
    let navbar = document.getElementById('navbar');
    let form = document.getElementById('searchForm');
    let input = form.querySelector('.form-control');

    // public
    let init = function() {
        initForm();
        initTogglers();
    };
    let flush = function() {
        input.value = '';
    };
    let toggle = function(toggler) {
        navbar.classList.toggle('search-open');
    }

    // private
    let initForm = function() {
        form.addEventListener('submit', onSearchFormSubmit);
    };
    let serialize = function(data) {
        let obj = { };
        for (let [key, value] of data) {
            if (obj[key] !== undefined) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key]];
                }
                obj[key].push(value);
            } else {
                obj[key] = value;
            }
        }
        return obj;
    }
    let onSearchFormSubmit = function(e) {
        e.preventDefault();
        let form = this;
        var data = new FormData(form);
        let formObj = serialize(data);
    }
    let initTogglers = function() {
        let togglers = document.querySelectorAll('.search-toggle');
        togglers.forEach(toggler => {
            toggler.addEventListener('click', toggle.bind(this, toggler));
        });
    }

    return {
        init: init,
        flush: flush,
    };
}();
const Catalog = function() {
    let navbar = document.getElementById('navbar');
    let catalog = document.getElementById('navbarCatalog');
    let menuItems = document.querySelectorAll('#navbarSupportedContent .nav-item[data-catalog]');

    // public
    let init = function() {
        menuItems.forEach(item => {
            item.addEventListener('mouseover', onCatalogItemMouseover);
            item.addEventListener('mouseout', onCatalogItemMouseout);
        });
        catalog.addEventListener('mouseover', onCatalogMouseover);
        catalog.addEventListener('mouseout', onCatalogMouseout);
    };

    // catalog item events
    let onCatalogItemMouseover = function() {
        showCatalog();
        showCatalogItemBlock(this.dataset.catalog);
    };
    let onCatalogItemMouseout = function() {
        hideCatalog();
        // hideCatalogItemBlock(this.dataset.catalog);
    };

    // catalog events
    let onCatalogMouseover = function() {
        showCatalog();
    };
    let onCatalogMouseout = function() {
        hideCatalog();
    };

    // catalog functions
    let showCatalog = function() {
        navbar.classList.add('catalog-open');
    };
    let hideCatalog = function() {
        navbar.classList.remove('catalog-open');
    };
    let showCatalogItemBlock = function(itemName) {
        catalog.querySelectorAll('.navbar-catalog-item').forEach(item => {
            item.classList.remove('navbar-catalog-item--active');
        });

        let itemBlock = catalog.querySelector('#navbarCatalog--'+ itemName);
        itemBlock.classList.add('navbar-catalog-item--active');
    };
    let hideCatalogItemBlock = function(itemName) {
        let itemBlock = catalog.querySelector('#navbarCatalog--'+ itemName);
        itemBlock.classList.remove('navbar-catalog-item--active');
    };

    return {
        init: init
    };
}();

document.addEventListener('DOMContentLoaded', function() {
    Search.init();
    Catalog.init();
});