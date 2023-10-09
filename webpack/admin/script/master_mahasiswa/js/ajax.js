// modul master_mahasiswa

var MahasiswaModule = (function() {

    function load() {
        buildStructure();
        MahasiswaRequest.fetchDataAndRender(1);
        console.log('mahasiswa module loaded');
    }

    function buildStructure() {
        $(".head-name-title-dev").removeClass("d-none");
        $(".head-name-title-dev h1").text("Tabel Mahasiswa");
        $(".content-wrapper").LoadingOverlay("show", {
            background  : "rgba(0, 0, 0, 0.5)",
            image       : "",
            fontawesome : "fa fa-cog fa-spin"
        });

        $("#main-content-dev").html('');
        $("#main-content-dev").append(`
        <!-- modal add mahasiswa -->
        <div class="modal fade" id="staticBackdrop-add" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Tambah Mahasiswa Test</h5>
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
                                            <label for="tambahKode">Kode</label>
                                            <input type="email" class="form-control" id="kode-add"
                                                placeholder="Kode Mahasiswa" oninput="MahasiswaModule.validatorCode('kode-add', 'button-add')">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="tambahNama">Nama</label>
                                            <input type="email" class="form-control" id="name-add"
                                                placeholder="Nama Mahasiswa" oninput="MahasiswaModule.validatorName('name-add', 'button-add')"
                                                maxlength="12">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Jenis Kelamin</label>
                                            <select class="form-control select2-default-add" id="gender-add" onchange="MahasiswaModule.validatorSelect('add', 'button-add')">
                                                <option></option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Columns are always 50% wide, on mobile and desktop -->
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <select class="form-control select2-search-box-add" id="provinsi-add" onchange="MahasiswaModule.validatorSelect('add', 'button-add')">
                                                <option></option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Kabupaten</label>
                                            <select class="form-control select2-search-box-add" id="kabupaten-add" onchange="MahasiswaModule.validatorSelect('add', 'button-add')">
                                                <option></option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Kecamatan</label>
                                            <select class="form-control select2-search-box-add" id="kecamatan-add" onchange="MahasiswaModule.validatorSelect('add', 'button-add')">
                                                <option></option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Desa</label>
                                            <select class="form-control select2-search-box-add" id="desa-add" onchange="MahasiswaModule.validatorSelect('add', 'button-add')">
                                                <option></option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group m-0">
                                            <label for="exampleFormControlInput1" class="m-0">Foto
                                                Profile</label>
                                        </div>
                                        <span class="fileinput-wrapper file-selected mt-2">
                                            <input type="file" name="file" id="image-add">
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"> <i
                            class="nav-icon fas fa-times mr-1"></i> Close</button>
                        <button type="button" class="btn btn-primary" onclick="MahasiswaRequest.dataAdd()"
                            id="button-add" disabled><i class="nav-icon fas fa-save mr-1"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal add mahasiswa -->

        <!-- modal edit mahasiswa -->
        <div class="modal fade" id="staticBackdrop-edit" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit Mahasiswa</h5>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="tambahKode">Kode</label>
                                        <input type="email" class="form-control" id="kode-edit"
                                            placeholder="Kode Mahasiswa" oninput="MahasiswaModule.validatorCode('kode-edit', 'button-edit')">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="tambahNama">Nama</label>
                                        <input type="email" class="form-control" id="name-edit"
                                            placeholder="Nama Mahasiswa" oninput="MahasiswaModule.validatorName('name-edit', 'button-edit')">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Jenis Kelamin</label>
                                        <select class="form-control select2-default-edit" id="gender-edit" onchange="MahasiswaModule.validatorSelect('edit', 'button-edit')">
                                            <option></option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Columns are always 50% wide, on mobile and desktop -->
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Provinsi</label>
                                        <select class="form-control select2-search-box-edit" id="provinsi-edit" onchange="MahasiswaModule.validatorSelect('edit', 'button-edit')">
                                            <option></option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Kabupaten</label>
                                        <select class="form-control select2-search-box-edit" id="kabupaten-edit" onchange="MahasiswaModule.validatorSelect('edit', 'button-edit')">
                                            <option></option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Kecamatan</label>
                                        <select class="form-control select2-search-box-edit" id="kecamatan-edit" onchange="MahasiswaModule.validatorSelect('edit', 'button-edit')">
                                            <option></option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Desa</label>
                                        <select class="form-control select2-search-box-edit" id="desa-edit" onchange="MahasiswaModule.validatorSelect('edit', 'button-edit')">
                                            <option></option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group m-0">
                                        <label for="exampleFormControlInput1" class="m-0">Foto Profile</label>
                                    </div>
                                    <span class="fileinput-wrapper file-selected mt-2">
                                        <input type="file" name="file" id="image-edit">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"> <i
                                class="nav-icon fas fa-times mr-1"></i> Close</button>
                        <button type="button" class="btn btn-primary" onclick=""  id="button-edit" disabled><i
                                class="nav-icon fas fa-save mr-1"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal edit mahasiswa -->

        <div class="row" id="row-1-dec">
            <div class="col-12">
                <div class="card card-primary card-outline">
                    <div class="card-header pb-sm-3">
                        <h5 class="card-title m-0">
                            <div class="d-flex flex-wrap align-items-center">
                                <button type="button" class="btn btn-primary btn-sm mr-2 mt-2"
                                    data-toggle="modal" data-target="#staticBackdrop-add" onclick="">
                                    <i class="nav-icon fas fa-plus mr-1"></i>
                                    Tambah
                                </button>
                                <button type="button" class="btn btn-primary btn-sm mr-2 mt-2"
                                    onclick="clearFilter()">
                                    <i class="nav-icon fas fa-sync-alt mr-1"></i>
                                    bersihkan filter
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
                                    <th>Foto Profile</th>
                                    <th>kode</th>
                                    <th>Nama</th>
                                    <th>Jenis kelamin</th>
                                    <th>Matkul</th>
                                    <th>Alamat</th>
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
        `);

        // definition for modal add
        $('.select2-search-box-add').select2({
            theme: 'bootstrap4',
            dropdownParent: $("#staticBackdrop-add"),
        })
        $('.select2-default-add').select2({
            theme: 'bootstrap4',
            dropdownParent: $("#staticBackdrop-add"),
            minimumResultsForSearch: -1
        })

        // definition for modal edit
        $('.select2-search-box-edit').select2({
            theme: 'bootstrap4',
            dropdownParent: $("#staticBackdrop-edit"),
        })
        $('.select2-default-edit').select2({
            theme: 'bootstrap4',
            dropdownParent: $("#staticBackdrop-edit"),
            minimumResultsForSearch: -1
        })
        $('input[type="file"]').fileinput({
            title: '<i class="fas fa-upload mr-1"></i> Upload Profile',
            buttonClass: 'btn btn-danger',
        });
    }

    function buildUrl(page, keyword, jenisKelamin, imageProfile, provinsi, kabupaten, kecamatan, desa, matkulFilter) {
        let url = `script/master_mahasiswa/php/get_data.php?page=${page}`;
        if (keyword) {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }
        if (jenisKelamin) {
            url += `&jenis_kelamin=${encodeURIComponent(jenisKelamin)}`;
        }
        if (imageProfile) {
            url += `&image_profile=${encodeURIComponent(imageProfile)}`;
        }
        if (provinsi) {
            url += `&provinsiFilter=${encodeURIComponent(provinsi)}`;
        }
        if (kabupaten) {
            url += `&kabupatenFilter=${encodeURIComponent(kabupaten)}`;
        }
        if (kecamatan) {
            url += `&kecamatanFilter=${encodeURIComponent(kecamatan)}`;
        }
        if (desa) {
            url += `&desaFilter=${encodeURIComponent(desa)}`;
        }
        if (matkulFilter) {
            url += `&matkulFilter=${encodeURIComponent(matkulFilter)}`;
        }
        return url;
    }

    function renderData(data, currentPage) {
        const table = document.getElementById("data-table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear the existing table body content

        const startNumber = (currentPage - 1) * 5;

        data.forEach(function (row, index) {
            const newRow = document.createElement("tr");
            const bacColorNumberClass = row.total_rows > 0 ? "badge badge-warning" : "badge badge-danger" ;
            
            newRow.innerHTML = `
                <td class="text-center align-middle">${startNumber + index + 1}</td>
                <td class="text-center align-middle"><img class="img-thumbnail" src="docs/img/${row.image_profile}" alt="" width="40px"></td>
                <td class="text-center align-middle">${row.kode}</td>
                <td class="text-center align-middle">${row.nama}</td>
                <td class="text-center align-middle">${row.jenis_kelamin}</td>
                <td class="text-center align-middle">
                <a href="javascript:void(0)" class="${bacColorNumberClass}" onclick="tampilModalMahasiswaSubPage(${row.id_personal_name})">${row.total_rows}</a>
                </td>
                <td class="text-center align-middle">${row.nama_desa}, ${row.nama_kecamatan}, ${row.nama_kabupaten}, ${row.nama_provinsi}</td>
                <td class="p-sm-2 text-center align-middle">
                <!-- Button with a click event to open the modal -->
                <button type="button" class="btn btn-secondary btn-sm bg-primary border-0" onclick="tampilModalMahasiswa(${row.id_personal_name})" data-placement="top" title="hapus">
                <i class="nav-icon fas fa-trash fa-sm"></i>
                </button>
        
                <button type="button" class="btn btn-secondary btn-sm ml-sm-1 bg-primary border-0" onclick="" data-toggle="modal" data-target="#staticBackdrop-edit" data-placement="top" title="edit">
                    <i class="nav-icon fas fa-pen fa-sm"></i>
                </button>
                </td>
            `;
            
            tbody.appendChild(newRow);
        });
    }

    function renderPagination(totalPages, currentPage) {
        const paginationLinks = document.getElementById("pagination-links");
        paginationLinks.innerHTML = "";

        const ul = document.createElement("ul");
        ul.classList.add("pagination", "pagination-sm", "m-0");

        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        if (currentPage === 1) {
            prevLi.classList.add("disabled");
        }
        const prevLink = document.createElement("a");
        prevLink.classList.add("page-link");
        prevLink.href = "javascript:void(0)";
        prevLink.textContent = "Sebelumnya";
        prevLi.appendChild(prevLink);
        ul.appendChild(prevLi);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) {
                li.classList.add("active");
            }
            const link = document.createElement("a");
            link.classList.add("page-link");
            link.href = "javascript:void(0)";
            link.textContent = i;
            li.appendChild(link);
            ul.appendChild(li);

            link.addEventListener("click", function () {
                // $.LoadingOverlay("show", {background  : "rgba(0, 0, 0, 0.5)"});
                // loadingBerhenti1Seccond();
                MahasiswaRequest.fetchDataAndRender(i);
            });
        }

        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        if (currentPage === totalPages) {
            nextLi.classList.add("disabled");
        }
        const nextLink = document.createElement("a");
        nextLink.classList.add("page-link");
        nextLink.href = "javascript:void(0)";
        nextLink.textContent = "Berikutnya";
        nextLi.appendChild(nextLink);
        ul.appendChild(nextLi);

        prevLink.addEventListener("click", function () {
            if (currentPage > 1) {
                // $.LoadingOverlay("show", {background  : "rgba(0, 0, 0, 0.5)"});
                // loadingBerhenti1Seccond();
                MahasiswaRequest.fetchDataAndRender(currentPage - 1);
            }
        });

        nextLink.addEventListener("click", function () {
            if (currentPage < totalPages) {
                // $.LoadingOverlay("show", {background  : "rgba(0, 0, 0, 0.5)"});
                // loadingBerhenti1Seccond();
                MahasiswaRequest.fetchDataAndRender(currentPage + 1);
            }
        });

        paginationLinks.appendChild(ul);
    }

    // validation function //

    function validatorCode(inputId, buttonId) {
        let kode;
        let name;
        let gender;
        let provinsi;
        let kabupaten;
        let kecamatan;
        let desa;
    
        if (inputId === 'kode-add' || inputId === 'name-add') {
            kode = "kode-add";
            name = "name-add";
            gender = "gender-add";
            provinsi = "provinsi-add";
            kabupaten = "kabupaten-add";
            kecamatan = "kecamatan-add";
            desa = "desa-add";
        } else if (inputId === 'kode-edit' || inputId === 'name-edit') {
            kode = "kode-edit";
            name = "name-edit";
            gender = "gender-edit";
            provinsi = "provinsi-edit";
            kabupaten = "kabupaten-edit";
            kecamatan = "kecamatan-edit";
            desa = "desa-edit";
        }
    
        const inputElement = $("#" + inputId);
    
        inputElement.on("input", function () {
            const input_value = inputElement.val();
            const regex = /[^A-Za-z0-9\s]/;
    
            if (!regex.test(input_value)) {
                const has_number = /^[0-9]+$/.test(input_value);
    
                if (has_number) {
                    if ($("#" + kode).val() !== "" && $("#" + name).val() !== "" && $("#" + gender).val() !== "" && $("#" + provinsi).val() !== "" && $("#" + kabupaten).val() !== "" && $("#" + kecamatan).val() !== "" && $("#" + desa).val() !== "") {
                        $("#" + buttonId).prop("disabled", false);
                    }
                    inputElement.removeClass("is-invalid");
                    inputElement.addClass("is-valid");
                    $("#feedback-" + inputId).remove();
                } else {
                    $("#" + buttonId).prop("disabled", true);
                    inputElement.removeClass("is-valid");
                    inputElement.addClass("is-invalid");
                    if ($("#feedback-" + inputId).length > 0) {
                        $("#feedback-" + inputId).remove();
                    }
                    inputElement.after(`
                        <div id="feedback-${inputId}" class="invalid-feedback">
                        Kode harus berupa angka.
                        </div>
                    `);
                    if (input_value == "") {
                        inputElement.removeClass("is-valid");
                        inputElement.removeClass("is-invalid");
                        $("#feedback-" + inputId).remove();
                    }
                }
            } else {
                $("#" + buttonId).prop("disabled", true);
                inputElement.removeClass("is-valid");
                inputElement.addClass("is-invalid");
                if ($("#feedback-" + inputId).length > 0) {
                    $("#feedback-" + inputId).remove();
                }
                inputElement.after(`
                    <div id="feedback-${inputId}" class="invalid-feedback">
                    Kode tidak diperbolehkan mengandung karakter unik.
                    </div>
                `);
            }
        });
    }
    
    function validatorName(inputId, buttonId) {
        let kode;
        let name;
        let gender;
        let provinsi;
        let kabupaten;
        let kecamatan;
        let desa;
    
        if (inputId === 'kode-add' || inputId === 'name-add') {
            kode = "kode-add";
            name = "name-add";
            gender = "gender-add";
            provinsi = "provinsi-add";
            kabupaten = "kabupaten-add";
            kecamatan = "kecamatan-add";
            desa = "desa-add";
        } else if (inputId === 'kode-edit' || inputId === 'name-edit') {
            kode = "kode-edit";
            name = "name-edit";
            gender = "gender-edit";
            provinsi = "provinsi-edit";
            kabupaten = "kabupaten-edit";
            kecamatan = "kecamatan-edit";
            desa = "desa-edit";
        }
    
        const inputElement = $("#" + inputId);
    
        inputElement.on("input", function () {
            const input_value = inputElement.val();
            const regex = /[^A-Za-z0-9\.\s]/;
    
            if (!regex.test(input_value)) {
                const has_number = /[0-9]/.test(input_value);
    
                if (!has_number) {
                    if ($("#" + kode).val() !== "" && $("#" + name).val() !== "" && $("#" + gender).val() !== "" && $("#" + provinsi).val() !== "" && $("#" + kabupaten).val() !== "" && $("#" + kecamatan).val() !== "" && $("#" + desa).val() !== "") {
                        $("#" + buttonId).prop("disabled", false);
                    }
                    inputElement.removeClass("is-invalid");
                    inputElement.addClass("is-valid");
                    $("#feedback-" + inputId).remove();
                    if (input_value == "") {
                        inputElement.removeClass("is-valid");
                        $("#" + buttonId).prop("disabled", true);
                    }
                } else {
                    $("#" + buttonId).prop("disabled", true);
                    inputElement.removeClass("is-valid");
                    inputElement.addClass("is-invalid");
                    if ($("#feedback-" + inputId).length > 0) {
                        $("#feedback-" + inputId).remove();
                    }
                    inputElement.after(`
                        <div id="feedback-${inputId}" class="invalid-feedback">
                        Nama tidak boleh mengandung angka.
                        </div>
                    `);
                }
            } else {
                $("#" + buttonId).prop("disabled", true);
                inputElement.removeClass("is-valid");
                inputElement.addClass("is-invalid");
                if ($("#feedback-" + inputId).length > 0) {
                    $("#feedback-" + inputId).remove();
                }
                inputElement.after(`
                    <div id="feedback-${inputId}" class="invalid-feedback">
                    Nama tidak diperbolehkan mengandung karakter unik.
                    </div>
                `);
            }
        });
    }
    

    function validatorSelect(inputId, buttonId) {

        let kode;
        let name;
        let gender;
        let provinsi;
        let kabupaten;
        let kecamatan;
        let desa;

        if (inputId === 'add') {
            kode = "kode-add";
            name = "name-add";
            gender = "gender-add";
            provinsi = "provinsi-add";
            kabupaten = "kabupaten-add";
            kecamatan = "kecamatan-add";
            desa = "desa-add";
        } else if (inputId === 'edit') {
            kode = "kode-edit";
            name = "name-edit";
            gender = "gender-edit";
            provinsi = "provinsi-edit";
            kabupaten = "kabupaten-edit";
            kecamatan = "kecamatan-edit";
            desa = "desa-edit";
        }
        
        if ($("#" + kode).val() !== "" && $("#" + name).val() !== "" && $("#" + gender).val() !== "" && $("#" + provinsi).val() !== "" && $("#" + kabupaten).val() !== "" && $("#" + kecamatan).val() !== "" && $("#" + desa).val() !== "") {
            $("#" + buttonId).prop("disabled", false);
        } else {
            $("#" + buttonId).prop("disabled", true);
        }
    }
    
    return {
        load: load,
        buildUrl: buildUrl,
        renderData: renderData,
        renderPagination: renderPagination,
        validatorCode: validatorCode,
        validatorName: validatorName,
        validatorSelect: validatorSelect
    };

})();