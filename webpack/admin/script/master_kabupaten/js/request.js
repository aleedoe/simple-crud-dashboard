// test request master_ kabupaten

const KabupatenRequest = (() => {

    function fetchDataAndRender(page) {
        $.ajax({
            url: KabupatenModule.buildUrl(page),
            type: "GET",
            dataType: "json",
            success: function (response) {
                KabupatenModule.renderData(response.data, response.dataProvinsi, page);
                KabupatenModule.renderPagination(response.total_pages, page);
                $(".content-wrapper").LoadingOverlay("hide", true);
                $("#row-1-dev .table-responsive").LoadingOverlay("hide", true);
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
                    $('#kabupaten-edit').attr("onchange", "KabupatenModule.validatorSelect('edit', 'button-edit', 'kabupaten-edit')");

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
                    $('#kecamatan-edit').attr("onchange", "KabupatenModule.validatorSelect('edit', 'button-edit', 'kecamatan-edit')");
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
                    $('#desa-edit').attr("onchange", "KabupatenModule.validatorSelect('edit', 'button-edit')");
                },
                error: function () {
                    console.error("Failed to fetch data.");
                }
            });
        }
    }

    function loadDataEdit(data_id) {
        $.ajax({
            url: `script/master_kabupaten/php/get_data_edit.php?id=${data_id}`,
            type: "GET",
            dataType: "json",
            success: function (response) {
                KabupatenModule.aplyValueModalEdit(response.data);
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }

    function dataAdd() {
        const name_add = $("#name-add").val();
        const provinsi_id = $("#provinsi-add").val();

        var formData = new FormData();
        formData.append("name_add", name_add);
        formData.append("provinsi_id", provinsi_id);

        $.ajax({
            url: `script/master_kabupaten/php/add.php`,
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
        const kecamatan_id = $("#kecamatan-id").val();
        const name_edit = $("#name-edit").val();
        const provinsi_id = $("#provinsi-edit").val();
        const kabupaten_id = $("#kabupaten-edit").val();

        var formData = new FormData();
        formData.append("kecamatan_id", kecamatan_id);
        formData.append("name_edit", name_edit);
        formData.append("provinsi_id", provinsi_id);
        formData.append("kabupaten_id", kabupaten_id);

        $.ajax({
            url: `script/master_kabupaten/php/update.php`,
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
            url: `script/master_kabupaten/php/delete.php?id=${id}`,
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
        fetchDataAndRender,
        loadSelectOptions,
        loadSelectOptionsEdit,
        loadDataEdit,
        dataAdd,
        dataEdit,
        dataDelete,
    };
    
})();