// test request master_mahasiswa

var MahasiswaRequest = (function() {

    function fetchDataAndRender(page, keyword_filter = "", gender_filter = "", image_filter = "", provinsi_filter = "", kabupaten_filter = "", kecamatan_filter = "", desa_filter = "", matkul_filter = "") {
        $.ajax({
            url: MahasiswaModule.buildUrl(page, keyword_filter, gender_filter, image_filter, provinsi_filter, kabupaten_filter, kecamatan_filter, desa_filter, matkul_filter),
            type: "GET",
            dataType: "json",
            success: function(response) {
                MahasiswaModule.renderData(response.data, response.dataProvinsi, page);
                MahasiswaModule.renderPagination(response.totalPages, page);
                $(".content-wrapper").LoadingOverlay("hide", true);
            },
            error: function() {
                console.error("Failed to fetch data.");
            }
        });
    };

    function loadSelectOptions(url, target_select) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function(data) {
                target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                target_select.append($("<option value=''></option>"));
                $.each(data, function(index, option) {
                    target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                });
            },
            error: function() {
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
                success: function(data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function(index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#kabupaten-edit').val(id);
                    $('#kabupaten-edit').trigger('change');
                    $('#kabupaten-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit', 'kabupaten-edit')");
                    
                },
                error: function() {
                    console.error("Failed to fetch data.");
                }
            });
        } else if (describe == "kecamatan") {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function(index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#kecamatan-edit').val(id);
                    $('#kecamatan-edit').trigger('change');
                    $('#kecamatan-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit', 'kecamatan-edit')");
                },
                error: function() {
                    console.error("Failed to fetch data.");
                }
            });
        } else if (describe == "desa") {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    target_select.empty(); // Mengosongkan elemen select sebelum menambahkan opsi baru
                    target_select.append($("<option value=''></option>"));
                    $.each(data, function(index, option) {
                        target_select.append($("<option></option>").attr("value", option.id).text(option.name));
                    });
                    $('#desa-edit').val(id);
                    $('#desa-edit').trigger('change');
                    $('#desa-edit').attr("onchange", "MahasiswaModule.validatorSelect('edit', 'button-edit')");
                },
                error: function() {
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
            success: function(response) {
                MahasiswaModule.aplyValueModalEdit(response.data);
            },
            error: function() {
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
                alert("Success");
                $("#staticBackdrop-add").modal('hide');
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }
    
    return {
        fetchDataAndRender: fetchDataAndRender,
        loadSelectOptions: loadSelectOptions,
        loadSelectOptionsEdit: loadSelectOptionsEdit,
        loadDataEdit: loadDataEdit,
        dataAdd: dataAdd
    };
})();