
        const angkaPertamaInput = document.getElementById('angka-pertama');
        const angkaKeduaInput = document.getElementById('angka-kedua');
        const hasilDisplay = document.getElementById('hasil');
        const errorPertama = document.getElementById('error-pertama');
        const errorKedua = document.getElementById('error-kedua');
        
        let operasiTerpilih = null;
        
        // Fungsi untuk memilih operasi
        function operasi(jenis) {
            if (!validateInput()) return;
            operasiTerpilih = jenis;
            hitung();
        }
        
        // Fungsi untuk menghapus semua
        function clearAll() {
            angkaPertamaInput.value = '';
            angkaKeduaInput.value = '';
            hasilDisplay.textContent = '0';
            hasilDisplay.className = 'result-display';
            operasiTerpilih = null;
            clearErrors();
        }
        
        // Fungsi untuk menghapus pesan error
        function clearErrors() {
            errorPertama.textContent = '';
            errorKedua.textContent = '';
            angkaPertamaInput.classList.remove('error');
            angkaKeduaInput.classList.remove('error');
        }
        
        // Fungsi untuk menampilkan error
        function showError(input, message) {
            if (input === 'pertama') {
                errorPertama.textContent = message;
                angkaPertamaInput.classList.add('error');
            } else {
                errorKedua.textContent = message;
                angkaKeduaInput.classList.add('error');
            }
        }
        
        // Fungsi untuk memvalidasi input
        function validateInput() {
            clearErrors();
            let valid = true;
            
            // Validasi angka pertama
            if (angkaPertamaInput.value === '') {
                showError('pertama', '⚠️ Harap isi angka pertama');
                valid = false;
            } else if (isNaN(parseFloat(angkaPertamaInput.value))) {
                showError('pertama', '⚠️ Harap masukkan angka yang valid');
                valid = false;
            }
            
            // Validasi angka kedua
            if (angkaKeduaInput.value === '') {
                showError('kedua', '⚠️ Harap isi angka kedua');
                valid = false;
            } else if (isNaN(parseFloat(angkaKeduaInput.value))) {
                showError('kedua', '⚠️ Harap masukkan angka yang valid');
                valid = false;
            }
            
            
            return valid;
        }
        
        // Fungsi untuk menghitung
        function hitung() {
            if (!validateInput()) return;
            
            const angka1 = parseFloat(angkaPertamaInput.value);
            const angka2 = parseFloat(angkaKeduaInput.value);
            let hasil;
            
            try {
                switch(operasiTerpilih) {
                    case 'tambah':
                        hasil = angka1 + angka2;
                        break;
                    case 'kurang':
                        hasil = angka1 - angka2;
                        break;
                    case 'kali':
                        hasil = angka1 * angka2;
                        break;
                    case 'bagi':
                        if (angka2 === 0) {
                            hasilDisplay.textContent = 'Error: Tidak bisa membagi dengan nol';
                            hasilDisplay.className = 'result-display result-error';
                            return;
                        }
                        hasil = angka1 / angka2;
                        break;
                    case 'modulus':
                        if (angka2 === 0) {
                            hasilDisplay.textContent = 'Error: Tidak bisa modulus dengan nol';
                            hasilDisplay.className = 'result-display result-error';
                            return;
                        }
                        hasil = angka1 % angka2;
                        break;
                    case 'pangkat':
                        hasil = Math.pow(angka1, angka2);
                        break;
                    default:
                        hasilDisplay.textContent = 'Pilih operasi terlebih dahulu';
                        hasilDisplay.className = 'result-display result-error';
                        return;
                }
                
                // Format hasil jika perlu
                if (Number.isInteger(hasil)) {
                    hasilDisplay.textContent = hasil;
                } else {
                    hasilDisplay.textContent = hasil.toFixed(4);
                }
                
                hasilDisplay.className = 'result-display result-success';
                
            } catch (error) {
                hasilDisplay.textContent = 'Error: Perhitungan gagal';
                hasilDisplay.className = 'result-display result-error';
                console.error('Calculation error:', error);
            }
        }
        
        // Event listener untuk input field
        angkaPertamaInput.addEventListener('input', function() {
            clearErrors();
            // Reset hasil jika input diubah
            if (hasilDisplay.textContent !== '0') {
                hasilDisplay.textContent = '0';
                hasilDisplay.className = 'result-display';
            }
        });
        
        angkaKeduaInput.addEventListener('input', function() {
            clearErrors();
            // Reset hasil jika input diubah
            if (hasilDisplay.textContent !== '0') {
                hasilDisplay.textContent = '0';
                hasilDisplay.className = 'result-display';
            }
        });
        
        // Event listener untuk tombol Enter
        angkaPertamaInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                angkaKeduaInput.focus();
            }
        });
        
        angkaKeduaInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                if (!operasiTerpilih) {
                    alert('Pilih operasi terlebih dahulu');
                    return;
                }
                hitung();
            }
        });
        
        // Event listener untuk mencegah input karakter non-angka
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('keypress', function(e) {
                // Mengizinkan: backspace, delete, tab, escape, enter, titik, dan angka
                if ([46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
                    // Mengizinkan: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    // Mengizinkan: home, end, kiri, kanan
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                }
                
                // Memastikan hanya angka yang diinput
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        });