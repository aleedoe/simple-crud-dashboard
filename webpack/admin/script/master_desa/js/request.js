// test request master_ desa

const DesaRequest = (() => {

    function fetchDataAndRender(page) {
        $.ajax({
            url: MahasiswaModule.buildUrl(page),
            type: "GET",
            dataType: "json",
            success: function (response) {
                MahasiswaModule.renderData(response.data, response.dataProvinsi, page);
                MahasiswaModule.renderPagination(response.totalPages, page);
                $(".content-wrapper").LoadingOverlay("hide", true);
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    };

    function loadSelectOptions(url, target_select) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                target_select.append($("<option value=''></option>"));
                $.each(data, function (index, option) {
                    target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                });
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }
    function loadSelectOptionsEdit(url, target_select, id, describe) {
        if (describe == "kabupaten") {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function (index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#kabupaten-edit').val(id);
                    $('#kabupaten-edit').trigger('change');
                    $('#kabupaten-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit', 'kabupaten-edit')");

                },
                error: function () {
                    console.error("Failed to fetch data.");
                }
            });
        } else if (describe == "kecamatan") {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function (index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#kecamatan-edit').val(id);
                    $('#kecamatan-edit').trigger('change');
                    $('#kecamatan-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit', 'kecamatan-edit')");
                },
                error: function () {
                    console.error("Failed to fetch data.");
                }
            });
        } else if (describe == "desa") {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function (index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#desa-edit').val(id);
                    $('#desa-edit').trigger('change');
                    $('#desa-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit')");
                },
                error: function () {
                    console.error("Failed to fetch data.");
                }
            });
        }
    }

    function loadDataEdit(data_id) {
        $.ajax({
            url: `script/master_mahasiswa/php/get_data_edit.php?id=${data_id}`,
            type: "GET",
            dataType: "json",
            success: function (response) {
                MahasiswaModule.aplyValueModalEdit(response.data);
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }

    function dataAdd() {
        const kode_add = $("#kode-add").val();
        const name_add = $("#name-add").val();
        const gender_add = $("#gender-add").val();
        const provinsi_id = $("#provinsi-add").val();
        const kabupaten_id = $("#kabupaten-add").val();
        const kecamatan_id = $("#kecamatan-add").val();
        const desa_id = $("#desa-add").val();

        var formData = new FormData();
        formData.append("kode_add", kode_add);
        formData.append("name_add", name_add);
        formData.append("gender_add", gender_add);
        formData.append("provinsi_id", provinsi_id);
        formData.append("kabupaten_id", kabupaten_id);
        formData.append("kecamatan_id", kecamatan_id);
        formData.append("desa_id", desa_id);
        formData.append("image_add", $("#image-add")[0].files[0]);

        $.ajax({
            url: `script/master_mahasiswa/php/add.php`,
            type: "POST",
            data: formData,
            contentType: false, // Tambahkan ini
            processData: false, // Tambahkan ini
            success: function (responsText) {
                alert(responsText);
                $("#staticBackdrop-add").modal('hide');
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }

    function dataEdit() {
        const mahasiswa_id = $("#mahasiswa-id").val();
        const kode_edit = $("#kode-edit").val();
        const name_edit = $("#name-edit").val();
        const gender_edit = $("#gender-edit").val();
        const provinsi_id = $("#provinsi-edit").val();
        const kabupaten_id = $("#kabupaten-edit").val();
        const kecamatan_id = $("#kecamatan-edit").val();
        const desa_id = $("#desa-edit").val();
        const old_image = $("#old-image").val();

        var formData = new FormData();
        formData.append("mahasiswa_id", mahasiswa_id);
        formData.append("kode_edit", kode_edit);
        formData.append("name_edit", name_edit);
        formData.append("gender_edit", gender_edit);
        formData.append("provinsi_id", provinsi_id);
        formData.append("kabupaten_id", kabupaten_id);
        formData.append("kecamatan_id", kecamatan_id);
        formData.append("desa_id", desa_id);
        formData.append("old_image", old_image);
        if ($("#image-edit")[0].files.length > 0) {
            formData.append("image_edit", $("#image-edit")[0].files[0]);
        } else {
            formData.append("image_edit", "");
        }

        $.ajax({
            url: `script/master_mahasiswa/php/update.php`,
            type: "POST",
            data: formData,
            contentType: false, // Tambahkan ini
            processData: false, // Tambahkan ini
            success: function (responsText) {
                alert("Success");
                $("#staticBackdrop-edit").modal('hide');
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }

    function dataDelete(id) {
        $.ajax({
            url: `script/master_mahasiswa/php/delete.php?id=${id}`,
            type: "GET",
            contentType: false, // Tambahkan ini
            processData: false, // Tambahkan ini
            success: function (response) {
                alert("succes!");
                $('#staticBackdrop-delete').modal('hide');
            },
            error: function (xhr, status, error) {
                alert("Terjadi kesalahan: " + error);
            }
        });
    }

    return {
        fetchDataAndRender: fetchDataAndRender,
        loadSelectOptions: loadSelectOptions,
        loadSelectOptionsEdit: loadSelectOptionsEdit,
        loadDataEdit: loadDataEdit,
        dataAdd: dataAdd,
        dataEdit: dataEdit,
        dataDelete: dataDelete,
    };
    
})();