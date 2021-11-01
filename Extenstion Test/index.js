// // **
// //   * Check if the request is a PDF file.
// //   * @param {Object} details First argument of the webRequest.onHeadersReceived
// //   *                         event. The properties "responseHeaders" and "url"
// //   *                         are read.
// //   * @return {boolean} True if the resource is a PDF file.
// //   */


// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     var url = tabs[0].url;
// });
// function download(url, filename) {
//     fetch(url).then(function(t) {
//         return t.blob().then((b)=>{
//             var a = document.createElement("a");
//             a.href = URL.createObjectURL(b);
//             a.setAttribute("download", filename);
//             a.click();
//         }
//         );
//     });
// }

// const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
    
// async function modifyPdf() {
//     // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//       var url = 'https://www.sfu.ca/~rpyke/cafe/parfit.pdf'
//       const existingPdfBytes =  fetch(url).then(res => res.arrayBuffer())
//       const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
//       const jpgImageBytes =  fetch(jpgUrl).then((res) => res.arrayBuffer())
//       const pdfDoc =  PDFDocument.load(existingPdfBytes)
//       const helveticaFont =  pdfDoc.embedFont(StandardFonts.Helvetica)
//       const pages = pdfDoc.getPages()
//       const firstPage = pages[0]
//       const { width, height } = firstPage.getSize()
//       const jpgImage =  pdfDoc.embedJpg(jpgImageBytes)
//     firstPage.drawImage(jpgImage, {
//         x:5,
//         y: 700,
//         width: 100,
//         height: 100,
//       })
//       const pdfBytes =  pdfDoc.save()
//       download(pdfBytes,"pdf-lib_modification_example.pdf", "application/pdf");  
//     // });
// }
var url;
const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

    async function modifyPdf(url) {
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
      const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
      const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "icon.png");
      xhr.responseType = "blob";
      xhr.onload = response;
      xhr.send();
      function response(e) {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        console.log(imageUrl);
      }
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { width, height } = firstPage.getSize()
      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    // firstPage.drawImage(jpgImage, {
    //     x:5,
    //     y: 700,
    //     width: 100,
    //     height: 100,
    //   })
      const pdfBytes = await pdfDoc.save()
      download(pdfBytes, "test.pdf", "application/pdf");
    }
// $(".click").click(function(){
//     modifyPdf()
// })
// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     url = tabs[0].url;
// })
// function isPdfFile(response) {
//     var header = response.getResponseHeader('content-type');
//     console.log(header);
//     if (header) {
//       var headerValue = header.toLowerCase().split(';', 1)[0].trim();
//       return (headerValue === 'application/pdf' ||
//               headerValue === 'application/octet-stream' &&
//               url.toLowerCase().indexOf('.pdf') > 0);
//     }
//   }


$(".click").click(function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        var url = tabs[0].url;
        var oReq = new XMLHttpRequest();
        // var url = window.location.toString();
        oReq.addEventListener('load', function() {
            console.log("uiouoiuiuoiuo");
        if (isPdfFile(this)) {
            modifyPdf("https://www.sfu.ca/~rpyke/cafe/parfit.pdf")
        } else {
          alert("This is not a pdf file")
        }
        });
        oReq.open('GET', url);
        oReq.send()
        'use strict';
    
        chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            chrome.browserAction.setBadgeText({text: request.type});
        });
    });
})
      
