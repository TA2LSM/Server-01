const express = require("express"); //yükleme yapıldığı için npm modülünün ismi yazıldı. kendi kodum olsaydı dosya yolu yazmam lazımdı
const app = express();

const axios = require("axios");

//nameless fonksiyon her yerde kullanılmayacaksa app.get içine yazmak mantıklı yoksa bu şekilde de olur
function resp(req, res) {
  res.send("Hello World");
}

app.get("/", resp);

app.get("/se", function (req, res) {
  res.send("Hello World 2");
});

app.get("/search", function (req, res) {
  function onRecv(responselll) {
    // handle success
    resp = responselll;
    console.log("CEVAP GELDI");
  }

  function onErr(error) {
    // handle error
    console.log(error);
  }

  function onFinally() {
    console.log("CEVAP VERILDI");
    // always executed
  }

  let resp = {};
  axios
    .get("https://argatechnology.com/products/" + req.query.par)
    .then(onRecv)
    .catch(onErr)
    .finally(onFinally);

  console.log("CEVAP VERILIYOR...");
  res.send("Response: ");
});

app.get("/searchP", function (req, res) {
  let resp = {};
  axios
    .get("https://argatechnology.com/products/" + req.query.par)
    .then(function (response) {
      // handle success
      resp = response;
      console.log("CEVAP GELDI");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      console.log("CEVAP VERILDI");
      // always executed
    });

  console.log("CEVAP VERILIYOR...");
  res.send("Response: ");
});

app.get("/searchAwait", async function (req, res) {
  try {
    let millis = Date.now();

    const resp = await axios.get(
      "https://argatechnology.com/products/" + req.query.par
    );
    //while (1);     //uzun süren işlemleri yapmaktan kaçınılması gerekiyor!!!
    //resp = 1;

    // .then(function (response) {
    //   // handle success
    //   resp = response;
    //   console.log("CEVAP GELDI");
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   console.log("CEVAP VERILDI");
    //   // always executed
    // });

    console.log("CEVAP VERILIYOR...", Date.now() - millis);
    res.send("Response: ");
  } catch (err) {
    console.log("message: ", err.message, "stack: ", err.stack);
  }
});

app.listen(3000);
console.log("Server started...");
