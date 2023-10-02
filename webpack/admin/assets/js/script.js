// testing js dev


///////////////////////////// nav dev ////////////////////////////////

// Mengambil semua elemen link dengan kelas 'nav-link'
var navLinks = document.querySelectorAll(".nav-custom-dev");
var subMenuLinks = document.querySelectorAll(".nav-treeview .nav-custom-dev");

// Menambahkan event listener ke setiap link
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        // Memeriksa apakah link memiliki anak panah
        var hasArrow = link.querySelector(".right");

        // Jika link memiliki anak panah, jangan tambahkan kelas 'active' saat diklik
        if (!hasArrow) {
            // Menghapus kelas 'active' dari semua link
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });

            // Menambahkan kelas 'active' ke link yang diklik
            this.classList.add("active");
        }
    });
});

// Menambahkan event listener ke setiap submenu link
subMenuLinks.forEach(function (subMenuLink) {
    subMenuLink.addEventListener("click", function (event) {
        // Menambahkan kelas 'active' ke link "Alamat Master" saat submenu link diklik
        document.querySelector(".nav-item.menu-open .nav-custom-dev").classList.add("active");
    });
});
