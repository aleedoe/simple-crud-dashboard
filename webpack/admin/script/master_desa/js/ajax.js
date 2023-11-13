// test ajax master_desa

const DesaModule = (function () {

    function load() {
        buildStructure();
        DesaRequest.fetchDataAndRender(1);
        console.log('Desa module loaded');
    }

    function buildStructure() {
        $(".head-name-title-dev").removeClass("d-none");
        $(".head-name-title-dev h1").text("Tabel Desa");
        $(".content-wrapper").LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            fontawesome: "fa fa-cog fa-spin"
        });

        $("#main-content-dev").html('');
        $("#main-content-dev").append(`
        <!-- modal add Desa -->
        <div class="modal fade" id="staticBackdrop-add" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Tambah Desa</h5>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                            <form action="">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <select class="form-control select2-search-box-add"
                                                id="provinsi-add"
                                                onchange="DesaModule.validators('provinsi_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Kabupaten</label>
                                            <select class="form-control select2-search-box-add"
                                                id="kabupaten-add"
                                                onchange="DesaModule.validators('kabupaten_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Kecamatan</label>
                                            <select class="form-control select2-search-box-add"
                                                id="kecamatan-add"
                                                onchange="DesaModule.validators('kecamatan_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="tambahNama">Nama Desa</label>
                                            <input type="text" class="form-control" id="name-add"
                                                placeholder="Nama Desa"
                                                oninput="DesaModule.validators('name_add')"
                                                maxlength="12" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"> <i
                                class="nav-icon fas fa-times mr-1"></i> Close</button>
                        <button type="button" class="btn btn-primary" onclick="DesaRequest.dataAdd()"
                            id="button-add" disabled><i class="nav-icon fas fa-save mr-1"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal add Desa -->

        <!-- modal edit Desa -->
        <div class="modal fade" id="staticBackdrop-edit" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit Desa</h5>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                            <form action="">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <select class="form-control select2-search-box-edit"
                                                id="provinsi-edit" onchange="">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Kabupaten</label>
                                            <select class="form-control select2-search-box-edit"
                                                id="kabupaten-edit" onchange="">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Kecamatan</label>
                                            <select class="form-control select2-search-box-edit"
                                                id="kecamatan-edit" onchange="">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="tambahNama">Nama Desa</label>
                                            <input type="hidden" class="form-control" id="desa-id">
                                            <input type="text" class="form-control" id="name-edit"
                                                placeholder="Nama Desa"
                                                oninput="DesaModule.validators('name_edit')">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"> <i
                                class="nav-icon fas fa-times mr-1"></i> Close</button>
                        <button type="button" class="btn btn-primary" onclick="DesaRequest.dataEdit()"
                            id="button-edit" disabled><i class="nav-icon fas fa-save mr-1"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal edit Desa -->

        <!-- modal hapus Desa -->
        <div class="modal fade" id="staticBackdrop-delete" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Hapus Desa</h5>
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fas fa-times"></i></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="container">
                        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                        yakin akan dihapus?
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                            class="nav-icon fas fa-times mr-1"></i> Close</button>
                        <button type="button" class="btn btn-primary" id="button-delete"><i class="nav-icon fas fa-trash-alt mr-1"></i> Hapus</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal hapus Desa -->
        
        <!-- main content -->
        <div class="row" id="row-1-dev">
            <div class="col-12">
                <div class="card card-primary card-outline">
                    <div class="card-header pb-sm-3">
                        <h5 class="card-title m-0">
                            <div class="d-flex flex-wrap align-items-center">
                                <button type="button" class="btn btn-primary btn-sm mr-2 mt-2"
                                    data-toggle="modal" data-target="#staticBackdrop-add" onclick="DesaModule.resetModalAdd()">
                                    <i class="nav-icon fas fa-plus mr-1"></i>
                                    Tambah
                                </button>
                            </div>
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table
                                class="table table-striped table-bordered table-hover text-nowrap text-center mx-auto"
                                id="data-table">
                                <thead style="color: #3d3d3d;">
                                    <th>No</th>
                                    <th>Nama Provinsi</th>
                                    <th>Nama Kabupaten</th>
                                    <th>Nama Kecamatan</th>
                                    <th>Nama Desa</th>
                                    <th>Total Data</th>
                                    <th>Aksi</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <!-- AJAX -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="d-flex justify-content-between align-items-center">
                            <nav aria-label="..." id="pagination-links">
                                <!-- ajax -->
                            </nav>
                            <button type="button" class="btn btn-primary btn-sm"
                                onclick="fetchDataAndRenderReload()">
                                <i class="nav-icon fas fa-redo mr-1"></i>
                                Perbarui Tabel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.main content -->

        `);


        // definition for modal add
        $('.select2-search-box-add').select2({
            theme: 'bootstrap4',
            placeholder: "Pilih",
            dropdownParent: $("#staticBackdrop-add"),
        })
        $('.select2-default-add').select2({
            theme: 'bootstrap4',
            placeholder: "Pilih",
            dropdownParent: $("#staticBackdrop-add"),
            minimumResultsForSearch: -1
        })

        // definition for modal edit
        $('.select2-search-box-edit').select2({
            theme: 'bootstrap4',
            placeholder: "Pilih",
            dropdownParent: $("#staticBackdrop-edit"),
        })
        $('.select2-default-edit').select2({
            theme: 'bootstrap4',
            placeholder: "Pilih",
            dropdownParent: $("#staticBackdrop-edit"),
            minimumResultsForSearch: -1
        })
        $('input[type="file"]').fileinput({
            title: '<i class="fas fa-upload mr-1"></i> Upload Profile',
            buttonClass: 'btn btn-danger',
        });
    }

    function buildUrl(page) {
        let url = `script/master_desa/php/get_data.php?page=${page}`;
        return url;
    }

    function renderData(data, provinsi_select, current_page) {
        const table = document.getElementById("data-table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear the existing table body content

        const startNumber = (current_page - 1) * 10;

        data.forEach(function (row, index) {
            const new_row = document.createElement("tr");
            const bac_color_number_class = row.total_rows > 0 ? "badge badge-warning" : "badge badge-danger";

            new_row.innerHTML = `
                <td class="text-center align-middle">${startNumber + index + 1}</td>
                <td class="text-center align-middle">${row.nama_provinsi}</td>
                <td class="text-center align-middle">${row.nama_kabupaten}</td>
                <td class="text-center align-middle">${row.nama_kecamatan}</td>
                <td class="text-center align-middle">${row.name}</td>
                <td class="text-center align-middle">${row.total_data}</td>
                <td class="p-sm-2 text-center align-middle">
                <!-- Button with a click event to open the modal -->
                <button type="button" class="btn btn-secondary btn-sm bg-primary border-0" onclick="DesaModule.showModalDelete(${row.id})" data-placement="top" title="hapus">
                <i class="nav-icon fas fa-trash fa-sm"></i>
                </button>
        
                <button type="button" class="btn btn-secondary btn-sm ml-sm-1 bg-primary border-0" onclick="DesaRequest.loadDataEdit(${row.id})" data-toggle="modal" data-target="#staticBackdrop-edit" data-placement="top" title="edit">
                    <i class="nav-icon fas fa-pen fa-sm"></i>
                </button>
                </td>
            `;

            tbody.appendChild(new_row);
        });

        const provinsi_select_add = $("#provinsi-add");
        provinsi_select_add.html('<option value=""></option>');
        provinsi_select.forEach((row) => {
            const new_option = $("<option></option>");
            new_option.val(row.id);
            new_option.text(row.name);
            provinsi_select_add.append(new_option);
        });

        const provinsi_select_edit = $("#provinsi-edit");
        provinsi_select_edit.html('<option value=""></option>');
        provinsi_select.forEach((row) => {
            const new_option = $("<option></option>");
            new_option.val(row.id);
            new_option.text(row.name);
            provinsi_select_edit.append(new_option);
        });
    }

    function renderPagination(total_pages, current_page) {
        const paginationLinks = document.getElementById("pagination-links");
        paginationLinks.innerHTML = "";

        const ul = document.createElement("ul");
        ul.classList.add("pagination", "pagination-sm", "m-0");

        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        if (current_page === 1) {
            prevLi.classList.add("disabled");
        }
        const prevLink = document.createElement("a");
        prevLink.classList.add("page-link");
        prevLink.href = "javascript:void(0)";
        prevLink.textContent = "Sebelumnya";
        prevLi.appendChild(prevLink);
        ul.appendChild(prevLi);

        for (let i = 1; i <= total_pages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === current_page) {
                li.classList.add("active");
            }
            const link = document.createElement("a");
            link.classList.add("page-link");
            link.href = "javascript:void(0)";
            link.textContent = i;
            li.appendChild(link);
            ul.appendChild(li);

            link.addEventListener("click", function () {
                $("#main-content-dev #row-1-dev td").html('');
                $("#row-1-dev .table-responsive").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.1)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                DesaRequest.fetchDataAndRender(i);
            });
        }

        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        if (current_page === total_pages) {
            nextLi.classList.add("disabled");
        }
        const nextLink = document.createElement("a");
        nextLink.classList.add("page-link");
        nextLink.href = "javascript:void(0)";
        nextLink.textContent = "Berikutnya";
        nextLi.appendChild(nextLink);
        ul.appendChild(nextLi);

        prevLink.addEventListener("click", function () {
            if (current_page > 1) {
                $("#main-content-dev #row-1-dev td").html('');
                $("#row-1-dev .table-responsive").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.1)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                DesaRequest.fetchDataAndRender(current_page - 1);
            }
        });

        nextLink.addEventListener("click", function () {
            if (current_page < total_pages) {
                $("#main-content-dev #row-1-dev td").html('');
                $("#row-1-dev .table-responsive").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.1)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                DesaRequest.fetchDataAndRender(current_page + 1);
            }
        });

        paginationLinks.appendChild(ul);
    }

    function resetModalAdd() {
        // Select all input elements inside the modal
        $('#staticBackdrop-add input').each(function () {
            // Clear the input value
            $(this).val('');
        });
        $("#feedback-name-add").remove();
        $("#name-add").removeClass("is-valid");
        $("#name-add").removeClass("is-invalid");

        // Select all select elements inside the modal
        $('#staticBackdrop-add select').each(function () {
            // Reset the selected option
            $(this).val(0);
            $(this).trigger('change');
            $("#provinsi-add").removeClass("is-valid");
            $("#kabupaten-add").removeClass("is-valid");
            $("#kecamatan-add").removeClass("is-valid");
        });
    }

    function aplyValueModalEdit(data) {

        $("#provinsi-edit").removeAttr("onchange");
        $("#kabupaten-edit").removeAttr("onchange");
        $("#kecamatan-edit").removeAttr("onchange");

        $("#desa-id").val(data[0].id);
        $("#name-edit").val(data[0].name);

        validators('name_edit');

        $('#provinsi-edit').val(data[0].id_provinsi);
        $('#provinsi-edit').trigger('change');
        $('#provinsi-edit').attr("onchange", "DesaModule.validators('provinsi_edit')");

        var url = "script/master_desa/php/load_address.php?table=kabupaten&id=" + data[0].id_provinsi;
        var target_select = $("#kabupaten-edit");
        DesaRequest.loadSelectOptionsEdit(url, target_select, data[0].id_kabupaten, "kabupaten");

        var url = "script/master_desa/php/load_address.php?table=kecamatan&id=" + data[0].id_kabupaten;
        var target_select = $("#kecamatan-edit");
        DesaRequest.loadSelectOptionsEdit(url, target_select, data[0].id_kecamatan, "kecamatan");

        $("#button-edit").prop("disabled", false);
        $("#provinsi-edit").addClass("is-valid");
        $("#kabupaten-edit").addClass("is-valid");
        $("#kecamatan-edit").addClass("is-valid");
    }

    function showModalDelete(id) {
        $("#button-delete").attr("onclick", "DesaRequest.dataDelete(" + id + ")");
        $('#staticBackdrop-delete').modal('show');
    }

    // validation function //

    function validators(input_modal) {

        // const hasNumber = (value) => {
        //     const validator = /^[0-9]+$/.test(value);
        //     return validator;
        // }

        const hasLetter = (value) => {
            const validator = /^[A-Za-z ]+$/.test(value);
            return validator;
        }

        const hasEmpty = (value) => {
            const validator = /^\s*$/.test(value);
            return validator;
        }

        const resetSelectOptions = (target_select) => {
            target_select.html('<option value=""></option>');
            target_select.removeClass("is-valid");
        }

        if (input_modal === 'name_add') {
            const input_element_value = $("#name-add").val();
            if (hasLetter(input_element_value)) {
                $("#name-add").removeClass("is-invalid");
                $("#feedback-name-add").remove();
                $("#name-add").addClass("is-valid");
                if ($("#provinsi-add").val() !== null && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else if (hasEmpty(input_element_value)) {
                $("#name-add").removeClass("is-valid");
                $("#name-add").removeClass("is-invalid");
                $("#feedback-name-add").remove();
                $("#button-add").prop("disabled", true);
            } else {
                $("#button-add").prop("disabled", true);
                $("#name-add").removeClass("is-valid");
                $("#name-add").addClass("is-invalid");
                if ($("#feedback-name-add").length > 0) {
                    $("#feedback-name-add").remove();
                }
                $("#name-add").after(`
                            <div id="feedback-name-add" class="invalid-feedback">
                            Nama harus berupa huruf.
                            </div>
                        `);
            }

        } else if (input_modal === 'provinsi_add') {

            const url = "script/master_desa/php/load_address.php?table=kabupaten&id=" + $("#provinsi-add").val();
            const target_select = $("#kabupaten-add");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#kecamatan-add"));

            const input_element_value = $("#provinsi-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#provinsi-add").removeClass("is-invalid");
                $("#provinsi-add").addClass("is-valid");
                if (hasLetter($("#name-add").val()) && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#provinsi-add").removeClass("is-valid");
                $("#provinsi-add").addClass("is-invalid");
            }

        } else if (input_modal === 'kabupaten_add') {

            const url = "script/master_desa/php/load_address.php?table=kecamatan&id=" + $("#kabupaten-add").val();
            const target_select = $("#kecamatan-add");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);

            const input_element_value = $("#kabupaten-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kabupaten-add").removeClass("is-invalid");
                $("#kabupaten-add").addClass("is-valid");
                if (hasLetter($("#name-add").val()) && $("#kecamatan-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#kabupaten-add").removeClass("is-valid");
                $("#kabupaten-add").addClass("is-invalid");
            }

        } else if (input_modal === 'kecamatan_add') {

            const input_element_value = $("#kecamatan-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kecamatan-add").removeClass("is-invalid");
                $("#kecamatan-add").addClass("is-valid");
                if (hasLetter($("#name-add").val())) {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#kecamatan-add").removeClass("is-valid");
                $("#kecamatan-add").addClass("is-invalid");
            }

        } else if (input_modal === 'name_edit') {
            const input_element_value = $("#name-edit").val();
            if (hasLetter(input_element_value)) {
                $("#name-edit").removeClass("is-invalid");
                $("#feedback-name-edit").remove();
                $("#name-edit").addClass("is-valid");
                if ($("#provinsi-edit").val() !== null && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else if (hasEmpty(input_element_value)) {
                $("#name-edit").removeClass("is-valid");
                $("#name-edit").removeClass("is-invalid");
                $("#feedback-name-edit").remove();
                $("#button-edit").prop("disabled", true);
            } else {
                $("#button-edit").prop("disabled", true);
                $("#name-edit").removeClass("is-valid");
                $("#name-edit").addClass("is-invalid");
                if ($("#feedback-name-edit").length > 0) {
                    $("#feedback-name-edit").remove();
                }
                $("#name-edit").after(`
                            <div id="feedback-name-edit" class="invalid-feedback">
                            Nama harus berupa huruf.
                            </div>
                        `);
            }

        } else if (input_modal === 'provinsi_edit') {

            const url = "script/master_desa/php/load_address.php?table=kabupaten&id=" + $("#provinsi-edit").val();
            const target_select = $("#kabupaten-edit");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#kecamatan-edit"));

            const input_element_value = $("#provinsi-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#provinsi-edit").removeClass("is-invalid");
                $("#provinsi-edit").addClass("is-valid");
                if (hasLetter($("#name-edit").val()) && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#provinsi-edit").removeClass("is-valid");
                $("#provinsi-edit").addClass("is-invalid");
            }

        } else if (input_modal === 'kabupaten_edit') {

            const url = "script/master_desa/php/load_address.php?table=kecamatan&id=" + $("#kabupaten-edit").val();
            const target_select = $("#kecamatan-edit");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);

            const input_element_value = $("#kabupaten-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kabupaten-edit").removeClass("is-invalid");
                $("#kabupaten-edit").addClass("is-valid");
                if (hasLetter($("#name-edit").val()) && $("#kecamatan-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#kabupaten-edit").removeClass("is-valid");
                $("#kabupaten-edit").addClass("is-invalid");
            }

        } else if (input_modal === 'kecamatan_edit') {

            const input_element_value = $("#kecamatan-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kecamatan-edit").removeClass("is-invalid");
                $("#kecamatan-edit").addClass("is-valid");
                if (hasLetter($("#name-edit").val())) {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#kecamatan-edit").removeClass("is-valid");
                $("#kecamatan-edit").addClass("is-invalid");
            }
        }

    }

    return {
        load: load,
        buildUrl: buildUrl,
        renderData: renderData,
        renderPagination: renderPagination,
        resetModalAdd: resetModalAdd,
        aplyValueModalEdit: aplyValueModalEdit,
        showModalDelete: showModalDelete,
        validators
    };

})();