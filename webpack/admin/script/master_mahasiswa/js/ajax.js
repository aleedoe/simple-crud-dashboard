// modul master_mahasiswa

const master_mahasiswa_sessions = {
    filters: {
        keyword_filter: '',
        gender_filter: '',
        profile_filter: '',
        provinsi_filter: '',
        kabupaten_filter: '',
        kecamatan_filter: '',
        desa_filter: '',
        matkul_filter: ''
    },
    current_page: 1,

};

const MahasiswaModule = (function () {

    function load() {
        buildStructure();
        MahasiswaRequest.fetchDataAndRender(master_mahasiswa_sessions.current_page, master_mahasiswa_sessions.filters.keyword_filter, master_mahasiswa_sessions.filters.gender_filter, master_mahasiswa_sessions.filters.profile_filter, master_mahasiswa_sessions.filters.provinsi_filter);
        console.log('mahasiswa module loaded');
    }

    function buildStructure() {
        $(".head-name-title-dev").removeClass("d-none");
        $(".head-name-title-dev h1").text("Tabel Mahasiswa");
        $(".content-wrapper").LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            fontawesome: "fa fa-cog fa-spin"
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
                                            <input type="text" class="form-control" id="kode-add"
                                                placeholder="Kode Mahasiswa" oninput="MahasiswaModule.validators('kode_add')" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="tambahNama">Nama</label>
                                            <input type="text" class="form-control" id="name-add"
                                                placeholder="Nama Mahasiswa" oninput="MahasiswaModule.validators('name_add')" maxlength="12" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Jenis Kelamin</label>
                                            <select class="form-control select2-default-add" id="gender-add" onchange="MahasiswaModule.validators('gender_add')">
                                                <option></option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Columns are always 50% wide, on mobile and desktop -->
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <select class="form-control select2-search-box-add" id="provinsi-add" onchange="MahasiswaModule.validators('provinsi_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Kabupaten</label>
                                            <select class="form-control select2-search-box-add" id="kabupaten-add" onchange="MahasiswaModule.validators('kabupaten_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Kecamatan</label>
                                            <select class="form-control select2-search-box-add" id="kecamatan-add" onchange="MahasiswaModule.validators('kecamatan_add')">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Desa</label>
                                            <select class="form-control select2-search-box-add" id="desa-add" onchange="MahasiswaModule.validators('desa_add')">
                                                <option></option>
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
                                        <input type="text" class="form-control" id="kode-edit"
                                            placeholder="Kode Mahasiswa" oninput="MahasiswaModule.validators('kode_edit')">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="tambahNama">Nama</label>
                                        <input type="hidden" class="form-control" id="mahasiswa-id">
                                        <input type="text" class="form-control" id="name-edit"
                                            placeholder="Nama Mahasiswa" oninput="MahasiswaModule.validators('name_edit')">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Jenis Kelamin</label>
                                        <select class="form-control select2-default-edit" id="gender-edit" onchange="MahasiswaModule.validators('gender_edit')">
                                            <option></option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Columns are always 50% wide, on mobile and desktop -->
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Provinsi</label>
                                        <select class="form-control select2-search-box-edit" id="provinsi-edit" onchange="">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Kabupaten</label>
                                        <select class="form-control select2-search-box-edit" id="kabupaten-edit" onchange="">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Kecamatan</label>
                                        <select class="form-control select2-search-box-edit" id="kecamatan-edit" onchange="">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Desa</label>
                                        <select class="form-control select2-search-box-edit" id="desa-edit" onchange="">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group m-0">
                                        <label for="exampleFormControlInput1" class="m-0">Foto Profile</label>
                                        <input type="hidden" class="form-control" id="old-image">
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
                        <button type="button" class="btn btn-primary" onclick="MahasiswaRequest.dataEdit()"  id="button-edit" disabled><i
                                class="nav-icon fas fa-save mr-1"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal edit mahasiswa -->

        <!-- modal hapus mahasiswa -->
        <div class="modal fade" id="staticBackdrop-delete" data-backdrop="static" data-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Hapus title</h5>
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
        <!-- /.modal hapus mahasiswa -->
        
        <!-- main content -->
        <div class="row" id="row-1-dev">
            <div class="col-12">
                <div class="card card-primary card-outline">
                    <div class="card-header pb-sm-3">
                    <h5 class="card-title m-0">
                        <div class="d-flex align-content-center flex-wrap">
                            <button type="button" class="btn btn-primary btn-sm m-1" data-toggle="modal"
                                data-target="#staticBackdrop-add" onclick="MahasiswaModule.resetModalAdd()">
                                <i class="nav-icon fas fa-plus mr-1"></i>
                                Tambah
                            </button>
                            <input class="form-control form-control-sm m-1" type="text"
                                placeholder="cari berdasarkan nama" id="keyword-filter" oninput="MahasiswaModule.filtering('keyword')" autocomplete="off" style="min-width: 10%; max-width: 18%;">
                            <select class="form-control" id="gender-filter"
                                onchange="">
                                <option></option>
                                <option value="Laki-laki">laki</option>
                                <option value="Perempuan">perempuan</option>
                            </select>
                            <select class="form-control" id="profile-filter"
                                onchange="">
                                <option></option>
                                <option value="YES">Ada</option>
                                <option value="NO">Tidak</option>
                            </select>
                            <select class="form-control" id="provinsi-filter"
                                onchange="">
                                <option></option>
                            </select>
                            <select class="form-control" id="kabupaten-filter"
                                onchange="">
                                <option></option>
                                <option>laki</option>
                                <option>perempuan</option>
                            </select>
                            <select class="form-control" id="kecamatan-filter"
                                onchange="">
                                <option></option>
                                <option>laki</option>
                                <option>perempuan</option>
                            </select>
                            <select class="form-control" id="desa-filter"
                                onchange="">
                                <option></option>
                                <option>laki</option>
                                <option>perempuan</option>
                            </select>
                            <select class="form-control" id="matkul-filter"
                                onchange="">
                                <option></option>
                                <option>laki</option>
                                <option>perempuan</option>
                            </select>
                            <button type="button" class="btn btn-primary btn-sm m-1"
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
        <!-- /.main content -->

        `);

        if (master_mahasiswa_sessions.filters.keyword_filter != '' || master_mahasiswa_sessions.filters.gender_filter != '' || master_mahasiswa_sessions.filters.profile_filter != '' || master_mahasiswa_sessions.filters.provinsi_filter != '' || master_mahasiswa_sessions.filters.kabupaten_filter != '' || master_mahasiswa_sessions.filters.kecamatan_filter != '' || master_mahasiswa_sessions.filters.desa_filter != '') {
            $("#keyword-filter").val(master_mahasiswa_sessions.filters.keyword_filter);
            
            $("#gender-filter").val(master_mahasiswa_sessions.filters.gender_filter);
            $('#gender-filter').trigger('change');
            $('#gender-filter').attr("onchange", "MahasiswaModule.filtering('gender')");
            
            $("#profile-filter").val(master_mahasiswa_sessions.filters.profile_filter);
            $('#profile-filter').trigger('change');
            $('#profile-filter').attr("onchange", "MahasiswaModule.filtering('profile')");
            
        }
        const url = "script/master_mahasiswa/php/load_address.php?table=provinsi";
        const target_select = $("#provinsi-filter");
        MahasiswaRequest.loadSelectOptionsFilter(url, target_select, master_mahasiswa_sessions.filters.provinsi_filter, "provinsi");

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

        // definition for filter
        $('#gender-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Jenis Kelamin",
            minimumResultsForSearch: -1,
            width: '150px',
            allowClear: true
        })

        $('#profile-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Profile",
            minimumResultsForSearch: -1,
            width: '150px',
            allowClear: true
        })

        $('#provinsi-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Provinsi",
            width: '150px',
            allowClear: true
        })

        $('#kabupaten-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Kabupaten",
            width: '150px',
            allowClear: true
        })

        $('#kecamatan-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Kecamatan",
            width: '150px',
            allowClear: true
        })

        $('#desa-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Desa",
            width: '150px',
            allowClear: true
        })

        $('#matkul-filter').select2({
            theme: 'bootstrap4',
            placeholder: "Matkul",
            width: '150px',
            allowClear: true
        })
    }

    function filtering(filter_input) {

        const resetSelectOptions = (target_select) => {
            target_select.html('<option value=""></option>');
            target_select.removeClass("is-valid");
        }

        if (filter_input === 'keyword') {
            master_mahasiswa_sessions.filters.keyword_filter = $("#keyword-filter").val();
            MahasiswaRequest.fetchDataAndRender(1, $("#keyword-filter").val(), $("#gender-filter").val(), $("#profile-filter").val(), $("#provinsi-filter").val());

        } else if (filter_input === 'gender') {
            master_mahasiswa_sessions.filters.gender_filter = $("#gender-filter").val();
            MahasiswaRequest.fetchDataAndRender(master_mahasiswa_sessions.current_page, $("#keyword-filter").val(), $("#gender-filter").val(), $("#profile-filter").val(), $("#provinsi-filter").val());

        } else if (filter_input === 'profile') {
            master_mahasiswa_sessions.filters.profile_filter = $("#profile-filter").val();
            MahasiswaRequest.fetchDataAndRender(master_mahasiswa_sessions.current_page, $("#keyword-filter").val(), $("#gender-filter").val(), $("#profile-filter").val(), $("#provinsi-filter").val());

        } else if (filter_input === 'provinsi') {
            master_mahasiswa_sessions.filters.provinsi_filter = $("#provinsi-filter").val();
            MahasiswaRequest.fetchDataAndRender(master_mahasiswa_sessions.current_page, $("#keyword-filter").val(), $("#gender-filter").val(), $("#profile-filter").val(), $("#provinsi-filter").val());
            resetSelectOptions($("#kabupaten-filter"));
            resetSelectOptions($("#kecamatan-filter"));
            resetSelectOptions($("#desa-filter"));

            const url = `script/master_mahasiswa/php/load_address.php?table=kabupaten&id=${$("#provinsi-filter").val()}`;
            const target_select = $("#kabupaten-filter");
            MahasiswaRequest.loadSelectOptions(url, target_select);
        }
    }

    function buildUrl(page, keyword_filter, gender_filter, image_filter, provinsi_filter, kabupaten_filter, kecamatan_filter, desa_filter, matkul_filter) {
        let url = `script/master_mahasiswa/php/get_data.php?page=${page}`;
        if (keyword_filter) {
            url += `&keyword_filter=${encodeURIComponent(keyword_filter)}`;
        }
        if (gender_filter) {
            url += `&gender_filter=${encodeURIComponent(gender_filter)}`;
        }
        if (image_filter) {
            url += `&image_filter=${encodeURIComponent(image_filter)}`;
        }
        if (provinsi_filter) {
            url += `&provinsi_filter=${encodeURIComponent(provinsi_filter)}`;
        }
        if (kabupaten_filter) {
            url += `&kabupaten_filter=${encodeURIComponent(kabupaten_filter)}`;
        }
        if (kecamatan_filter) {
            url += `&kecamatan_filter=${encodeURIComponent(kecamatan_filter)}`;
        }
        if (desa_filter) {
            url += `&desa_filter=${encodeURIComponent(desa_filter)}`;
        }
        if (matkul_filter) {
            url += `&matkul_filter=${encodeURIComponent(matkul_filter)}`;
        }
        return url;
    }

    function renderData(data, provinsi_select, current_page) {
        const table = document.getElementById("data-table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear the existing table body content

        const startNumber = (current_page - 1) * 5;

        data.forEach(function (row, index) {
            const new_row = document.createElement("tr");
            const bac_color_number_class = row.total_rows > 0 ? "badge badge-warning" : "badge badge-danger";

            new_row.innerHTML = `
                <td class="text-center align-middle">${startNumber + index + 1}</td>
                <td class="text-center align-middle"><img class="img-thumbnail" src="docs/img/${row.image_profile}" alt="" width="40px"></td>
                <td class="text-center align-middle">${row.kode}</td>
                <td class="text-center align-middle">${row.nama}</td>
                <td class="text-center align-middle">${row.jenis_kelamin}</td>
                <td class="text-center align-middle">
                <a href="javascript:void(0)" class="${bac_color_number_class}" onclick="tampilModalMahasiswaSubPage(${row.id_personal_name})">${row.total_rows}</a>
                </td>
                <td class="text-center align-middle">${row.nama_desa}, ${row.nama_kecamatan}, ${row.nama_kabupaten}, ${row.nama_provinsi}</td>
                <td class="p-sm-2 text-center align-middle">
                <!-- Button with a click event to open the modal -->
                <button type="button" class="btn btn-secondary btn-sm bg-primary border-0" onclick="MahasiswaModule.showModalDelete(${row.id_personal_name})" data-placement="top" title="hapus">
                <i class="nav-icon fas fa-trash fa-sm"></i>
                </button>
        
                <button type="button" class="btn btn-secondary btn-sm ml-sm-1 bg-primary border-0" onclick="MahasiswaRequest.loadDataEdit(${row.id_personal_name})" data-toggle="modal" data-target="#staticBackdrop-edit" data-placement="top" title="edit">
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

    function renderPagination(total_pages, current_page, total_data) {
        if (total_data.length === 0) {
            total_pages = 0;
            current_page = 0;
        }
        const paginationLinks = document.getElementById("pagination-links");
        paginationLinks.innerHTML = "";

        const ul = document.createElement("ul");
        ul.classList.add("pagination", "pagination-sm", "m-0");

        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        if (current_page === 1 || current_page === 0) {
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
                $(".content-wrapper").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.5)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                MahasiswaRequest.fetchDataAndRender(i, master_mahasiswa_sessions.filters.keyword_filter, master_mahasiswa_sessions.filters.gender_filter, master_mahasiswa_sessions.filters.profile_filter, master_mahasiswa_sessions.filters.provinsi_filter);
                master_mahasiswa_sessions.current_page = i;
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
                $(".content-wrapper").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.5)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                MahasiswaRequest.fetchDataAndRender(current_page - 1, master_mahasiswa_sessions.filters.keyword_filter, master_mahasiswa_sessions.filters.gender_filter, master_mahasiswa_sessions.filters.profile_filter, master_mahasiswa_sessions.filters.provinsi_filter);
                master_mahasiswa_sessions.current_page = current_page - 1;
            }
        });

        nextLink.addEventListener("click", function () {
            if (current_page < total_pages) {
                $(".content-wrapper").LoadingOverlay("show", {
                    background: "rgba(0, 0, 0, 0.5)",
                    image: "",
                    fontawesome: "fa fa-cog fa-spin"
                });
                MahasiswaRequest.fetchDataAndRender(current_page + 1, master_mahasiswa_sessions.filters.keyword_filter, master_mahasiswa_sessions.filters.gender_filter, master_mahasiswa_sessions.filters.profile_filter, master_mahasiswa_sessions.filters.provinsi_filter);
                master_mahasiswa_sessions.current_page = current_page + 1;
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
        $("#feedback-kode-add").remove();
        $("#kode-add").removeClass("is-valid");
        $("#kode-add").removeClass("is-invalid");
        $("#feedback-name-add").remove();
        $("#name-add").removeClass("is-valid");
        $("#name-add").removeClass("is-invalid");

        // Select all select elements inside the modal
        $('#staticBackdrop-add select').each(function () {
            // Reset the selected option
            $(this).val(0);
            $(this).trigger('change');
            $(this).removeClass("is-valid");
            $(this).removeClass("is-valid");
            $(this).removeClass("is-valid");
            $(this).removeClass("is-valid");
            $(this).removeClass("is-valid");
        });
        $(".fileinput-wrapper .fileinput-name").remove();
        console.log("kode : " + $("#kode-add").val());
        console.log("name : " + $("#name-add").val());
        console.log("gender : " + $("#gender-add").val());
        console.log("provinsi : " + $("#provinsi-add").val());
        console.log("kabupaten : " + $("#kabupaten-add").val());
        console.log("kecamatan : " + $("#kecamatan-add").val());
        console.log("desa : " + $("#desa-add").val());
        console.log("image : " + $("#image-add").val());
    }

    function aplyValueModalEdit(data) {

        $("#provinsi-edit").removeAttr("onchange");
        $("#kabupaten-edit").removeAttr("onchange");
        $("#kecamatan-edit").removeAttr("onchange");
        $("#desa-edit").removeAttr("onchange");

        $("#kode-edit").val(data[0].kode);
        $("#mahasiswa-id").val(data[0].id);
        $("#name-edit").val(data[0].nama);
        $("#old-image").val(data[0].image_profile);

        $('#gender-edit').val(data[0].jenis_kelamin);
        $('#gender-edit').trigger('change');

        $('#provinsi-edit').val(data[0].id_provinsi);
        $('#provinsi-edit').trigger('change');
        $('#provinsi-edit').attr("onchange", "MahasiswaModule.validators('provinsi_edit')");

        var url = "script/master_mahasiswa/php/load_address.php?table=kabupaten&id=" + data[0].id_provinsi;
        var target_select = $("#kabupaten-edit");
        MahasiswaRequest.loadSelectOptionsEdit(url, target_select, data[0].id_kabupaten, "kabupaten");

        var url = "script/master_mahasiswa/php/load_address.php?table=kecamatan&id=" + data[0].id_kabupaten;
        var target_select = $("#kecamatan-edit");
        MahasiswaRequest.loadSelectOptionsEdit(url, target_select, data[0].id_kecamatan, "kecamatan");

        var url = "script/master_mahasiswa/php/load_address.php?table=desa&id=" + data[0].id_kecamatan;
        var target_select = $("#desa-edit");
        MahasiswaRequest.loadSelectOptionsEdit(url, target_select, data[0].id_desa, "desa");

        validators('kode_edit');
        validators('name_edit');

        $("#button-edit").prop("disabled", false);
        $("#gender-edit").addClass("is-valid");
        $("#provinsi-edit").addClass("is-valid");
        $("#kabupaten-edit").addClass("is-valid");
        $("#kecamatan-edit").addClass("is-valid");
        $("#desa-edit").addClass("is-valid");
    }

    function showModalDelete(id) {
        $("#button-delete").attr("onclick", "MahasiswaRequest.dataDelete(" + id + ")");
        $('#staticBackdrop-delete').modal('show');
    }

    // validation function //

    function validators(input_modal) {

        const hasNumber = (value) => {
            const validator = /^[0-9]+$/.test(value);
            return validator;
        }

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

        if (input_modal === 'kode_add') {

            const input_element_value = $("#kode-add").val();
            if (hasNumber(input_element_value)) {
                $("#kode-add").removeClass("is-invalid");
                $("#feedback-kode-add").remove();
                $("#kode-add").addClass("is-valid");
                if (hasLetter($("#name-add").val()) && $("#gender-add").val() !== null && $("#provinsi-add").val() !== null && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "" && $("#desa-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else if (hasEmpty(input_element_value)) {
                $("#kode-add").removeClass("is-valid");
                $("#kode-add").removeClass("is-invalid");
                $("#feedback-kode-add").remove();
                $("#button-add").prop("disabled", true);
            } else {
                $("#button-add").prop("disabled", true);
                $("#kode-add").removeClass("is-valid");
                $("#kode-add").addClass("is-invalid");
                if ($("#feedback-kode-add").length > 0) {
                    $("#feedback-kode-add").remove();
                }
                $("#kode-add").after(`
                            <div id="feedback-kode-add" class="invalid-feedback">
                            Kode harus berupa angka.
                            </div>
                        `);
            }

        } else if (input_modal === 'name_add') {
            const input_element_value = $("#name-add").val();
            if (hasLetter(input_element_value)) {
                $("#name-add").removeClass("is-invalid");
                $("#feedback-name-add").remove();
                $("#name-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && $("#gender-add").val() !== null && $("#provinsi-add").val() !== null && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "" && $("#desa-add").val() !== "") {
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

        } else if (input_modal === 'gender_add') {
            const input_element_value = $("#gender-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#gender-add").removeClass("is-invalid");
                $("#feedback-gender-add").remove();
                $("#gender-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && hasLetter($("#name-add").val()) && $("#provinsi-add").val() !== null && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "" && $("#desa-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#gender-add").removeClass("is-valid");
                $("#gender-add").addClass("is-invalid");
            }

        } else if (input_modal === 'provinsi_add') {

            const url = "script/master_mahasiswa/php/load_address.php?table=kabupaten&id=" + $("#provinsi-add").val();
            const target_select = $("#kabupaten-add");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#kecamatan-add"));
            resetSelectOptions($("#desa-add"));

            const input_element_value = $("#provinsi-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#provinsi-add").removeClass("is-invalid");
                $("#provinsi-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && hasLetter($("#name-add").val()) && $("#gender-add").val() !== null && $("#kabupaten-add").val() !== "" && $("#kecamatan-add").val() !== "" && $("#desa-add").val() !== "") {
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

            const url = "script/master_mahasiswa/php/load_address.php?table=kecamatan&id=" + $("#kabupaten-add").val();
            const target_select = $("#kecamatan-add");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#desa-add"));
            // console.log($("#kecamatan-add").val() !== "");

            const input_element_value = $("#kabupaten-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kabupaten-add").removeClass("is-invalid");
                $("#kabupaten-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && hasLetter($("#name-add").val()) && $("#gender-add").val() !== null && $("#kecamatan-add").val() !== "" && $("#desa-add").val() !== "") {
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

            const url = "script/master_mahasiswa/php/load_address.php?table=desa&id=" + $("#kecamatan-add").val();
            const target_select = $("#desa-add");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);

            const input_element_value = $("#kecamatan-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kecamatan-add").removeClass("is-invalid");
                $("#kecamatan-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && hasLetter($("#name-add").val()) && $("#gender-add").val() !== null && $("#desa-add").val() !== "") {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#kecamatan-add").removeClass("is-valid");
                $("#kecamatan-add").addClass("is-invalid");
            }

        } else if (input_modal === 'desa_add') {
            const input_element_value = $("#desa-add").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#desa-add").removeClass("is-invalid");
                $("#desa-add").addClass("is-valid");
                if (hasNumber($("#kode-add").val()) && hasLetter($("#name-add").val()) && $("#gender-add").val() !== null) {
                    $("#button-add").prop("disabled", false);
                } else {
                    $("#button-add").prop("disabled", true);
                }
            } else {
                $("#button-add").prop("disabled", true);
                $("#desa-add").removeClass("is-valid");
                $("#desa-add").addClass("is-invalid");
            }

        } else if (input_modal === 'kode_edit') {
            const input_element_value = $("#kode-edit").val();
            if (hasNumber(input_element_value)) {
                $("#kode-edit").removeClass("is-invalid");
                $("#feedback-kode-edit").remove();
                $("#kode-edit").addClass("is-valid");
                if (hasLetter($("#name-edit").val()) && $("#gender-edit").val() !== null && $("#provinsi-edit").val() !== null && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "" && $("#desa-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else if (hasEmpty(input_element_value)) {
                $("#kode-edit").removeClass("is-valid");
                $("#kode-edit").removeClass("is-invalid");
                $("#feedback-kode-edit").remove();
                $("#button-edit").prop("disabled", true);
            } else {
                $("#button-edit").prop("disabled", true);
                $("#kode-edit").removeClass("is-valid");
                $("#kode-edit").addClass("is-invalid");
                if ($("#feedback-kode-edit").length > 0) {
                    $("#feedback-kode-edit").remove();
                }
                $("#kode-edit").after(`
                            <div id="feedback-kode-edit" class="invalid-feedback">
                            Kode harus berupa angka.
                            </div>
                        `);
            }

        } else if (input_modal === 'name_edit') {
            const input_element_value = $("#name-edit").val();
            if (hasLetter(input_element_value)) {
                $("#name-edit").removeClass("is-invalid");
                $("#feedback-name-edit").remove();
                $("#name-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && $("#gender-edit").val() !== null && $("#provinsi-edit").val() !== null && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "" && $("#desa-edit").val() !== "") {
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

        } else if (input_modal === 'gender_edit') {
            const input_element_value = $("#gender-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#gender-edit").removeClass("is-invalid");
                $("#feedback-gender-edit").remove();
                $("#gender-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && hasLetter($("#name-edit").val()) && $("#provinsi-edit").val() !== null && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "" && $("#desa-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#gender-edit").removeClass("is-valid");
                $("#gender-edit").addClass("is-invalid");
            }

        } else if (input_modal === 'provinsi_edit') {

            const url = "script/master_mahasiswa/php/load_address.php?table=kabupaten&id=" + $("#provinsi-edit").val();
            const target_select = $("#kabupaten-edit");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#kecamatan-edit"));
            resetSelectOptions($("#desa-edit"));

            const input_element_value = $("#provinsi-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#provinsi-edit").removeClass("is-invalid");
                $("#provinsi-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && hasLetter($("#name-edit").val()) && $("#gender-edit").val() !== null && $("#kabupaten-edit").val() !== "" && $("#kecamatan-edit").val() !== "" && $("#desa-edit").val() !== "") {
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

            const url = "script/master_mahasiswa/php/load_address.php?table=kecamatan&id=" + $("#kabupaten-edit").val();
            const target_select = $("#kecamatan-edit");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);
            resetSelectOptions($("#desa-edit"));
            // console.log($("#kecamatan-add").val() !== "");

            const input_element_value = $("#kabupaten-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kabupaten-edit").removeClass("is-invalid");
                $("#kabupaten-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && hasLetter($("#name-edit").val()) && $("#gender-edit").val() !== null && $("#kecamatan-edit").val() !== "" && $("#desa-edit").val() !== "") {
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

            const url = "script/master_mahasiswa/php/load_address.php?table=desa&id=" + $("#kecamatan-edit").val();
            const target_select = $("#desa-edit");
            target_select.removeClass("is-valid");
            MahasiswaRequest.loadSelectOptions(url, target_select);

            const input_element_value = $("#kecamatan-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#kecamatan-edit").removeClass("is-invalid");
                $("#kecamatan-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && hasLetter($("#name-edit").val()) && $("#gender-edit").val() !== null && $("#desa-edit").val() !== "") {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#kecamatan-edit").removeClass("is-valid");
                $("#kecamatan-edit").addClass("is-invalid");
            }

        } else if (input_modal === 'desa_edit') {
            const input_element_value = $("#desa-edit").val();
            if (input_element_value !== null || input_element_value !== '') {
                $("#desa-edit").removeClass("is-invalid");
                $("#desa-edit").addClass("is-valid");
                if (hasNumber($("#kode-edit").val()) && hasLetter($("#name-edit").val()) && $("#gender-edit").val() !== null) {
                    $("#button-edit").prop("disabled", false);
                } else {
                    $("#button-edit").prop("disabled", true);
                }
            } else {
                $("#button-edit").prop("disabled", true);
                $("#desa-edit").removeClass("is-valid");
                $("#desa-edit").addClass("is-invalid");
            }
        }

    }

    return {
        load: load,
        filtering,
        buildUrl: buildUrl,
        renderData: renderData,
        renderPagination: renderPagination,
        resetModalAdd: resetModalAdd,
        aplyValueModalEdit: aplyValueModalEdit,
        showModalDelete: showModalDelete,
        validators
    };

})();