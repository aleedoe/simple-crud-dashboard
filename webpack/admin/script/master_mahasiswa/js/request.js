// test request master_mahasiswa

var MahasiswaRequest = (function() {

    function fetchDataAndRender(page, keyword = "", jenisKelamin = "", imageProfile = "", provinsi = "", kabupaten = "", kecamatan = "", desa = "", matkulFilter = "") {
        $.ajax({
            url: MahasiswaModule.buildUrl(page, keyword, jenisKelamin, imageProfile, provinsi, kabupaten, kecamatan, desa, matkulFilter),
            type: "GET",
            dataType: "json",
            success: function(response) {
                MahasiswaModule.renderData(response.data, page);
                MahasiswaModule.renderPagination(response.totalPages, page);
                $(".content-wrapper").LoadingOverlay("hide", true);
            },
            error: function() {
                console.error("Failed to fetch data.");
            }
        });
    };
    
    function dataAdd() {
        var formData = new FormData();
        formData.append("kode_add", $("#kode-add").val());
        formData.append("name_add", $("#name-add").val());
        formData.append("gender_add", $("#gender-add").val());
        formData.append("provinsi_add", $("#provinsi-add").val());
        formData.append("kabupaten_add", $("#kabupaten-add").val());
        formData.append("kecamatan_add", $("#kecamatan-add").val());
        formData.append("desa_add", $("#desa-add").val());
        formData.append("image_add", $("#image-add")[0].files[0]);

        $.ajax({
            url: `script/master_mahasiswa/php/add.php`,
            type: "POST",
            data: formData,
            success: function(responsText) {
                alert("Success");
            },
            error: function() {
                console.error("Failed to fetch data.");
            }
        });
        
    };

    return {
        fetchDataAndRender: fetchDataAndRender,
        dataAdd: dataAdd
    };
})(); 
