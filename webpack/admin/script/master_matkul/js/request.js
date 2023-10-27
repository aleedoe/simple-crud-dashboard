// test requst master_ matkul

var MatkulRequest = (function () {

    function fetchDataAndRender(page) {
        $.ajax({
            url: MatkulModule.buildUrl(page),
            type: "GET",
            dataType: "json",
            success: function (response) {
                MatkulModule.renderData(response.data, page);
                MatkulModule.renderPagination(response.total_pages, page);
                $(".content-wrapper").LoadingOverlay("hide", true);
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    };

    function loadDataEdit(data_id) {
        $.ajax({
            url: `script/master_mahasiswa/php/get_data_edit.php?id=${data_id}`,
            type: "GET",
            dataType: "json",
            success: function (response) {
                MatkulModule.aplyValueModalEdit(response.data);
            },
            error: function () {
                console.error("Failed to fetch data.");
            }
        });
    }

    function dataAdd() {
        const name_add = $("#name-add").val();

        var formData = new FormData();
        formData.append("name_add", name_add);

        $.ajax({
            url: `script/master_matkul/php/add.php`,
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
        loadDataEdit: loadDataEdit,
        dataAdd: dataAdd,
        dataEdit: dataEdit,
        dataDelete: dataDelete,
    };
})();