import {load as load_mahasiswa, resetModalAdd as resetModalAdd_mahasiswa} from './master_mahasiswa/js/dev_module.js';

$("#load-master-mahasiswa").on("click", () => {
    load_mahasiswa();
});