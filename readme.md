## Table of Content
1. [Interlude - SoC](#interlude---soc)
1. [Intro - Components](#intro---componentes)
1. [EJS - Partials](#ejs---partials)
1. [References](#references)

## Interlude - SoC
Menjadi seorang developer adalah menjadi seseorang yang memiliki mindset
"kemalasan" yang hakiki, dalam artian adalah kita harus memiliki pemikiran
untuk melakukan sesuatu dengan "malas" dan efisien.

Contohnya dalam kode yang kita tuliskan, misalnya, apabila ada kode yang kita
panggil berulang kali, sama terus-terusan, maka akan kita buatkan dalam 
sebuah fungsi (atau bahkan sebuah class, jika sudah paham OOP), kemudian
akan kita panggil berkali kali bukan?

Secara tidak langsung kita sudah menggunakan konsep yang dinamakan dengan
DRY (Don't Repeat Yourself).

Begitu pula ketika kita sudah mempelajari tentang MVC, dimana kita mengkotak-
kotakkan domain berdasarkan kebutuhan atau kepentingan yang adanya, Controller
hanyalah untuk processing, Model untuk representasi data, dan View untuk 
representasi *User Interface*, maka secara tidak langsung, kita juga sudah
menerapkan prinsip yang dinamakan dengan *Separation of Concern* atau disingkat
dengan `SoC`.

Namun kalau kita lihat kembali, pada View yang kita buat, umumnya masih ada
banyak sekali kesamaan yang kita bentuk (not DRY) dan masih tidak ada pemisahan
SoC-nya bukan?

Bagaimana cara kita menerapkan DRY dan SOC ini di dalam *User Interface* yang 
sudah kita buat?

Untuk itu kita harus mempelajari terlebih dahulu apa yang disebut dengan
*Components*

## Intro - Components
Maaf yah, ini kata kata teori yang harus kalian dengar :) 
*Component* adalalah serangkaian fungsi yang modular, portabel, bisa diganti-
ganti, dan digunakan kembali, dimana pada saat diimplementasikan akan memiliki
enkapsulasi dan bisa diekspor sebagai antarmuka yang lebih tinggi.

Bosan bukan dengar kata kata seperti itu?

Intinya adalah, pengemasan sesuatu yang berulang-ulang yang memiliki fungsi yang
sama, dalam bentuk suatu barang / bentuk yang lebih tinggi lagi.

Misalnya dalam konsep *User Interface* (HTML) nih,
Kita mengkelompokkan 2 label, 2 input text, dan sebuah button, menjadi sesuatu
yang dinamakan dengan `SimpleForm` atau, kita mengkelompokkan sebuah tulisan
besar dan beberapa navigasinya menjadi sebuah `Header` dalam aplikasi kita.

Sudah *nangkep* maksudnya?

Nah sekarang kita akan mencoba untuk implementasikan itu di dalam aplikasi kita
dengan menggunakan `Partials` pada ejs.

## EJS - Partials
`Partials` pada EJS merupakan "pemanggilan kembali" kumpulan *User Interface* 
yang sudah pernah kita definisikan kembali ke dalam aplikasi kita.

Contoh, ini saya memiliki sebuah aplikasi sederhana untuk membaca data dalam
bentuk tabel yah, kira kira seperti ini.

Misalnya kita akan membuat aplikasi yang memiliki endpoint sebagai berikut:

| Endpoint                  | Description                                   |
| ------------------------- | --------------------------------------------- |
| GET /                     | Menampilkan halaman home                      |
| GET /accounts             | Menampilkan list semua                        |
| GET /accounts?q=<id>      | Menampilkan list detail sebuah account        |
| GET /accounts/add         | Menampilkan form penambahan account           |
| POST /accounts/add        | Menghandle form penambahan account            |
| GET /accounts/del/:id     | Menghapus sebuah account                      |

Jadi dari sini apakah yang harus kita lakukan terlebih dahulu?

### Langkah 1 - Inisialisasi npm dan .gitignore
Pertama tama kita akan melakukan:
1. Inisialisasi npm dengan `npm init -y`
1. Pasang module yang dibutuhkan terlebih dahulu dengan mengetik
   `npm install express ejs pg`
1. Pasang module development yang dibutuhkan terlebih dahulu dengan mengetik
   `npm install -D nodemon`
1. Jangan lupa exclude folder `node_modules` dengan membuat file `.gitignore`

### Langkah 2 - Buat struktur folder terlebih dahulu
Struktur akhir folder yang akan dibentuk adalah sebagai berikut:
```
│   .gitignore
│   app.js
│   package-lock.json
│   package.json
│
├───config
│       config.js
│
├───controllers
│       controller.js
│
├───data
│       dummy.json
│       dummy2.json
│
├───migrations
│       createdb.js
│
├───models
│       account.js
│
├───routes
│       accounts.js
│       index.js
│
├───seeders
│       seed.js
│
└───views
        account-add.ejs
        account-list.ejs
        home.ejs
```

## References
[Components - TutorialPoints](https://www.tutorialspoint.com/software_architecture_design/component_based_architecture.htm)