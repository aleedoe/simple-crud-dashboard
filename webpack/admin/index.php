<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboardd</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- /.Google Font: Source Sans Pro -->

    <!-- bootstrap framework -->
    <link rel="stylesheet" href="assets/framework/bootstrap-4.6.2-dist/css/bootstrap.min.css">
    <!-- /.bootstrap framework -->

    <!-- font awesome icon -->
    <link rel="stylesheet" href="assets/plugin/fontawesome-free/css/all.min.css">
    <!-- /.font awesome icon -->

    <!-- Select2 plugin -->
    <link rel="stylesheet" href="assets/plugin/select2/css/select2.min.css">
    <link rel="stylesheet" href="assets/plugin/select2-bootstrap4-theme/select2-bootstrap4.min.css">
    <!-- /.Select2 plugin -->

    <!-- file input plugin -->
    <link rel="stylesheet" href="assets/plugin/Customizable-File-Input-Button/fileinput.css">
    <!-- /.file input plugin -->

    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="assets/plugin/overlayScrollbars/css/OverlayScrollbars.min.css">
    <!-- /.overlayScrollbars -->

    <!-- adminLTE theme -->
    <link rel="stylesheet" href="assets/plugin/AdminLTE-3.2.0/dist/css/adminlte.min.css">
    <!-- /.adminLTE theme -->

    <!-- original css dev -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- /.original css dev -->

</head>

<body class="hold-transition sidebar-mini layout-fixed">

    <!-- Site wrapper -->
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light fixed-top">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i>
                        Menu</a>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="../../index3.html" class="brand-link">
                <span class="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user panel (optional) -->
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
                    </div>
                    <div class="info">
                        <a href="#" class="d-block">Alexander Pierce</a>
                    </div>
                </div>

                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->
                        <li class="nav-header">MENU</li>
                        <li class="nav-item">
                            <a href="#" class="nav-link nav-custom-dev nav-custom-dev active">
                                <i class="nav-icon fas fa-home"></i>
                                <p>
                                    Beranda
                                </p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link nav-custom-dev" onclick="MahasiswaModule.load()">
                                <i class="nav-icon fas fa-user-graduate"></i>
                                <p>
                                    Mahasisiwa
                                </p>
                            </a>
                        </li>
                        <li class="nav-header">MASTER</li>
                        <li class="nav-item menu-open">
                            <a href="#" class="nav-link nav-custom-dev">
                                <i class="nav-icon fas fa-database"></i>
                                <p>
                                    Alamat Master
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="#" class="nav-link nav-custom-dev" onclick="ProvinsiModule.load()">
                                        <i class="fas fa-map-marker-alt nav-icon"></i>
                                        <p>Provinsi</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link nav-custom-dev" onclick="KabupatenModule.load()">
                                        <i class="fas fa-map-marker-alt nav-icon"></i>
                                        <p>Kabupaten</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link nav-custom-dev" onclick="KecamatanModule.load()">
                                        <i class="fas fa-map-marker-alt nav-icon"></i>
                                        <p>Kecamatan</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link nav-custom-dev" onclick="DesaModule.load()">
                                        <i class="fas fa-map-marker-alt nav-icon"></i>
                                        <p>Desa</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link nav-custom-dev" onclick="MatkulModule.load()">
                                <i class="nav-icon fas fa-database"></i>
                                <p>
                                    Matkul Master
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid get-fixed-dev">
                    <div class="row mb-2">
                        <div class="col-sm-12">
                            <h1>.</h1>
                        </div>
                    </div>
                </div>
                <div class="container-fluid pt-3 d-none head-name-title-dev">
                    <div class="row mb-2">
                        <div class="col-sm-12">
                            <h1>Fixed Layout</h1>
                        </div>
                    </div>
                </div>
                <!-- /.container-fluid -->
            </section>

            <!-- Main content -->
            <div class="px-3" id="main-content-dev">
                <div class="callout callout-info">
                    <h5><i class="fas fa-bullhorn"></i> Welcome!</h5>
                    Hallo Alexander Pierce, selamat datang di portofolio Dashboard admin.
                </div>
            </div>
            <!-- /.Main content -->

            <!-- space for footer-fixed bottom -->
            <section class="content-header get-fixed-dev">
                <div class="container-fluid pb-3">
                    <div class="row mb-2">
                        <div class="col-sm-12">
                            <h1>.</h1>
                        </div>
                    </div>
                </div>
            </section>

            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <footer class="main-footer fixed-bottom">
            <div class="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Copyright &copy; 2023 <a href="https://github.com/Zaisiapa17">Mushyafa Ali</a>.</strong>
        </footer>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->

    <!-- REQUIRED SCRIPTS -->

    <!-- jQuery library -->
    <script src="libraries/jquery/jquery.min.js"></script>
    <!-- /.jQuery library -->

    <!-- bootstrap framework-->
    <script src="assets/framework/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js"></script>
    <!-- /.bootstrap framework-->

    <!-- overlayScrollbars -->
    <script src="assets/plugin/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <!-- /.overlayScrollbars -->

    <!-- adminLTE theme -->
    <script src="assets/plugin/AdminLTE-3.2.0/dist/js/adminlte.min.js"></script>
    <!-- /.adminLTE theme -->

    <!-- loading overlay -->
    <script src="assets/plugin/jquery-loading-overlay-2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- /.loading overlay -->

    <!-- select2 plugin -->
    <script src="assets/plugin/select2/js/select2.full.min.js"></script>
    <!-- /.select2 plugin -->

    <!-- file input plugin -->
    <script src="assets/plugin/Customizable-File-Input-Button/fileinput.js"></script>
    <!-- /.file input plugin -->

    <!-- ajax for master master_mahasiswa -->
    <script src="script/master_mahasiswa/js/ajax.js"></script>
    <script src="script/master_mahasiswa/js/request.js"></script>
    <!-- /.ajax for master master_mahasiswa -->

    <!-- ajax for master master_provinsi -->
    <script src="script/master_provinsi/js/ajax.js"></script>
    <script src="script/master_provinsi/js/request.js"></script>
    <!-- /.ajax for master master_provinsi -->

    <!-- ajax for master master_kabupaten -->
    <script src="script/master_kabupaten/js/ajax.js"></script>
    <script src="script/master_kabupaten/js/request.js"></script>
    <!-- /.ajax for master master_kabupaten -->

    <!-- ajax for master master_kecamatan -->
    <script src="script/master_kecamatan/js/ajax.js"></script>
    <script src="script/master_kecamatan/js/request.js"></script>
    <!-- /.ajax for master master_kecamatan -->

    <!-- ajax for master master_desa -->
    <script src="script/master_desa/js/ajax.js"></script>
    <script src="script/master_desa/js/request.js"></script>
    <!-- /.ajax for master master_desa -->

    <!-- ajax for master master_matkul -->
    <script src="script/master_matkul/js/ajax.js"></script>
    <script src="script/master_matkul/js/request.js"></script>
    <!-- /.ajax for master master_matkul -->

    <!-- original javascript dev -->
    <script src="assets/js/script.js"></script>
    <!-- original javascript dev -->

</body>

</html>