let arraCategoria = {};
let arraTipo = {};
let arraProductos = {};

GetDataGeneral();
GetProductos();

function GetDataGeneral() {
    fetch('./data/general.json')
        .then(response => response.json())
        .then(data => {
            arraCategoria = data.categorias;
            arraTipo = data.tipos;
            CargarListadoCategoria();
            CargarListadoTipos();
        });
}

function CargarListadoCategoria() {
    let htmlCategoria = `<option value="">Categoría</option>`;
    arraCategoria.forEach(element => {
        htmlCategoria += `<option value="${element.id}">${element.name}</option>`;
    });
    document.getElementById("categoryList").innerHTML = htmlCategoria;
}

function CargarListadoTipos() {
    let htmlTipos = `<option value="">Tipos</option>`;
    arraTipo.forEach(element => {
        htmlTipos += `<option value="${element.id}">${element.name}</option>`;
    });
    document.getElementById("typeList").innerHTML = htmlTipos;
}

function GetProductos() {
    fetch('./data/products.json')
        .then(response => response.json())
        .then(data => {
            arraProductos = data.products;
            GenerateListProduct(arraProductos);
        });
}

//FUNCION QUE GENERA EL LISTADO DE PRODUCTOS
function GenerateListProduct(arraProd) {
    let htmlProducto = ``;
    arraProd.forEach(element => {
        htmlProducto += `
                        <tr>
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td>${GetCategoryName(element.cagetory_id)}</td>
                            <td>${GetTypeName(element.type_id)}</td>
                            <td>${element.price}</td>
                        </tr>`;
    });
    document.getElementById("listProducts").innerHTML = htmlProducto;
}

function GetCategoryName(id) {
    let nameCategory = "";
    arraCategoria.forEach(element => {
        if (element.id == id) {
            nameCategory = "" + element.name;
        }
    });

    return nameCategory;
}

function GetTypeName(id) {
    let nameType = "";
    arraTipo.forEach(element => {
        if (element.id == id) {
            nameType = "" + element.name;
        }
    });
    return nameType;
}

function FilterTable(){

    //CAPTURAR LA INFORMACIÓN QUE SE VA A FILTRAR
    let nameList=document.getElementById("nameList").value;
    let categoryList=document.getElementById("categoryList").value;
    let typeList=document.getElementById("typeList").value;    
    
    let arraProductsFilters=arraProductos.filter( item=>item.name==nameList || 
                                                  item.cagetory_id==categoryList || 
                                                  item.type_id==typeList);
    GenerateListProduct(arraProductsFilters);
    

}
