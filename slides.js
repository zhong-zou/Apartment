/**
 * This scripts implements the slide show function of the sorrento apartment website. It provides two methods for viewing the images. 
 * 1. The 'next' and 'previous' navigator.
 * 2. The thumbnails navigators.
 */


var iIndex=0;
var inFo=[{photo:"surfBeach.jpg",descr:"In this area of ocean surrounded by beautiful scenery, huge waves come and go all year round. It is the ideal place for surfing lovers. It is just 3 minutes walk from Sorrento Apartment."},
       {photo:"img01.jpg", descr: "This is the front view of the Sorrento Apartment. You walk across the street in the front, then you are at the gorgeous beach."},
       {photo:"img03.jpg", descr: "Nothing quite soothes the mind, body and soul like walking in the fresh ocean breeze. Luckily, there is a spectacular coastal walk that traverse this beautiful Sorrento coastline."}];

       /**
        *  This function shows the specified image and description on the webpage.
        * 
        * @param {n} n indicates which image is to be shown at the webpage.
        */
function currentSlide(n) {
   document.getElementById('imgFrame').src=inFo[n].photo;
   document.getElementById('imgDescr').innerText=inFo[n].descr;
}

/**
 * This function implement of "next" and "previous" navigation.
 * @param {n} n is the 'previous' and 'next' navigator number. Generally it is +1 or -1, indicating to go to the next image or to the previous image.
 */
function plusSlides(n) {
    iIndex+=n;
    if (iIndex>=inFo.length) iIndex=0;
    if (iIndex<0) iIndex=inFo.length-1;
    currentSlide(iIndex);
}