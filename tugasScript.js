const form = document.getElementById("formBarang");
const tbody = document.getElementById("tbody");

const idInput = document.getElementById("id");
const namaInput = document.getElementById("nama");
const jenisInput = document.getElementById("jenis");
const hargaInput = document.getElementById("harga");
const stokInput = document.getElementById("stok");

const errorNama = document.getElementById("errorNama");
const errorJenis = document.getElementById("errorJenis");
const errorHarga = document.getElementById("errorHarga");
const errorStok = document.getElementById("errorStok");

let barang = JSON.parse(localStorage.getItem("barang")) || [];

// ================= VALIDASI =================
function validasi() {
    let valid = true;

    errorNama.textContent = "";
    errorJenis.textContent = "";
    errorHarga.textContent = "";
    errorStok.textContent = "";

    if (namaInput.value.trim() === "") {
        errorNama.textContent = "Nama barang wajib diisi";
        valid = false;
    } else if (namaInput.value.length < 3) {
        errorNama.textContent = "Nama minimal 3 karakter";
        valid = false;
    }

    if (jenisInput.value === "") {
        errorJenis.textContent = "Jenis barang harus dipilih";
        valid = false;
    }

    if (hargaInput.value === "") {
        errorHarga.textContent = "Harga wajib diisi";
        valid = false;
    } else if (hargaInput.value <= 0) {
        errorHarga.textContent = "Harga harus lebih dari 0";
        valid = false;
    }

    if (stokInput.value === "") {
        errorStok.textContent = "Stok wajib diisi";
        valid = false;
    } else if (stokInput.value < 0) {
        errorStok.textContent = "Stok tidak boleh negatif";
        valid = false;
    }

    return valid;
}

// ================= TAMPIL DATA =================
function tampilBarang() {
    tbody.innerHTML = "";

    barang.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.jenis}</td>
                <td>Rp ${Number(item.harga).toLocaleString("id-ID")}</td>
                <td>${item.stok}</td>
                <td>
                    <button onclick="editBarang(${item.id})">Edit</button>
                    <button onclick="hapusBarang(${item.id})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// ================= SIMPAN =================
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validasi()) return;

    if (idInput.value === "") {
        // CREATE
        barang.push({
            id: Date.now(),
            nama: namaInput.value,
            jenis: jenisInput.value,
            harga: hargaInput.value,
            stok: stokInput.value
        });
    } else {
        // UPDATE
        barang = barang.map(item =>
            item.id == idInput.value
                ? {
                    id: item.id,
                    nama: namaInput.value,
                    jenis: jenisInput.value,
                    harga: hargaInput.value,
                    stok: stokInput.value
                }
                : item
        );
    }

    localStorage.setItem("barang", JSON.stringify(barang));
    form.reset();
    idInput.value = "";
    tampilBarang();
});

// ================= EDIT =================
function editBarang(id) {
    const item = barang.find(b => b.id === id);
    idInput.value = item.id;
    namaInput.value = item.nama;
    jenisInput.value = item.jenis;
    hargaInput.value = item.harga;
    stokInput.value = item.stok;
}

// ================= HAPUS =================
function hapusBarang(id) {
    if (confirm("Yakin ingin menghapus data barang ini?")) {
        barang = barang.filter(item => item.id !== id);
        localStorage.setItem("barang", JSON.stringify(barang));
        tampilBarang();
    }
}

tampilBarang();
