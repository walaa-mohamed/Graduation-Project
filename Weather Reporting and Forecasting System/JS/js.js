let o = new Intl.DateTimeFormat("en" , {timeStyle: "short"});
document.getElementById("date").innerHTML = o.format(Date.now());
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";
    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
        });
    ResCarouselSize();
    $(window).resize(function () {
        ResCarouselSize();
    });
    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);
            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            } else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            } else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            } else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });
            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");
        });
    }
    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");
            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        } else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");
            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }
    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }
});
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
var date = new Date();
var lead = date.addDays(0);
var lead2 = date.addDays(1);
var lead3 = date.addDays(2);
var lead4 = date.addDays(3);
var lead5= date.addDays(4);
var lead6 = date.addDays(5);
var lead7 = date.addDays(6);
var options = { weekday: 'long',day: 'numeric'};
document.getElementById("lead").innerHTML =(Intl.DateTimeFormat('en-US', options).format(lead));
document.getElementById("lead2").innerHTML =( Intl.DateTimeFormat('en-US', options).format(lead2));
document.getElementById("lead3").innerHTML =( Intl.DateTimeFormat('en-US', options).format(lead3));
document.getElementById("lead4").innerHTML =( Intl.DateTimeFormat('en-US', options).format(lead4));
document.getElementById("lead5").innerHTML =( Intl.DateTimeFormat('en-US', options).format(lead5));
document.getElementById("lead6").innerHTML =( Intl.DateTimeFormat('en-US', options).format(lead6));
document.getElementById("lead7").innerHTML =(Intl.DateTimeFormat('en-US', options).format(lead7));
const formatDate = (date) => {
    const [dateStr] = new Date(date).toISOString().split('T')
    return dateStr
};
//************************************************************************************************************ */
// Import the functions you need from the SDKs you need
import {getDatabase, ref, get, set, child, update} from
"https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf0yrG3zP7SmOEdPhFbkA1o_IiG4gBy_4",
    authDomain: "project3-d50ab.firebaseapp.com",
    databaseURL: "https://project3-d50ab-default-rtdb.firebaseio.com",
    projectId: "project3-d50ab",
    storageBucket: "project3-d50ab.appspot.com",
    messagingSenderId: "561921967830",
    appId: "1:561921967830:web:9fe061642cbb80bb8deb77"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
var myIdElementT=document.getElementById("temperature");
var myIdElementH=document.getElementById("HUMIDTY1");
var Rain_Fal=document.getElementById("Rain_Fal");
const dbRef = ref(getDatabase());
function myFunction1() {
    //Get a database reference To read or write data from the database, you need an instance of firebase.database.Reference
    get(child(dbRef,'FirebaseIOT/')).then((snapshot) => {
        document.getElementById("CW").innerHTML ="Hardware reading";
        myIdElementH.innerHTML= snapshot.val().humidity;
        var temperature = parseFloat( snapshot.val().temperature_LM35);
        myIdElementT.innerHTML=(temperature).toFixed()+'°C';
        if (temperature > 20) {
            let Ticon=document.getElementById("Ticon");
            Ticon.src="image/sunny.png";
        } else {
            let Ticon=document.getElementById("Ticon");
            Ticon.src="image/imgbin_weather-forecasting-computer-icons-android-png.png";
        }
        console.log(myIdElementT.innerHTML);
    })
    document.getElementById("date").innerHTML = o.format(Date.now());
    return;
};
myFunction1();
document.getElementById("F").addEventListener("click",myFunction1);
get(child(dbRef,'forecasting2/'+ formatDate(lead))).then((snapshot) => {
    console.log(formatDate(lead));
    document.getElementById("th1").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl1").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead2))).then((snapshot) => {
    console.log(formatDate(lead2));
    document.getElementById("th2").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl2").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead3))).then((snapshot) => {
    console.log(formatDate(lead3));
    document.getElementById("th3").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl3").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead4))).then((snapshot) => {
    console.log(formatDate(lead4));
    document.getElementById("th4").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl4").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead5))).then((snapshot) => {
    console.log(formatDate(lead5));
    document.getElementById("th5").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl5").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead6))).then((snapshot) => {
    console.log(formatDate(lead6));
    document.getElementById("th6").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl6").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
get(child(dbRef,'forecasting2/'+ formatDate(lead7))).then((snapshot) => {

    document.getElementById("th7").innerHTML=(Number(snapshot.val().MaxTemp).toFixed());
    document.getElementById("tl7").innerHTML=(Number(snapshot.val().MinTemp).toFixed());
})
function myFunction0() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead));
    document.getElementById("CW").innerHTML = document.getElementById("lead").innerHTML;
    myIdElementT.innerHTML = th1.innerHTML+"°C";
    low_Temp.innerHTML = tl1.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction2() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead2));
    document.getElementById("CW").innerHTML = document.getElementById("lead2").innerHTML;
    myIdElementT.innerHTML = th2.innerHTML+"°C";
    low_Temp.innerHTML = tl2.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead2))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction3() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead3));
    document.getElementById("CW").innerHTML =  document.getElementById("lead3").innerHTML;
    myIdElementT.innerHTML = th3.innerHTML+"°C";
    low_Temp.innerHTML = tl3.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead3))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction4() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead4));
    document.getElementById("CW").innerHTML = document.getElementById("lead4").innerHTML;
    myIdElementT.innerHTML = th4.innerHTML+"°C";
    low_Temp.innerHTML = tl4.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead4))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction5() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead5));
    document.getElementById("CW").innerHTML = document.getElementById("lead5").innerHTML;
    myIdElementT.innerHTML = th5.innerHTML+"°C";
    low_Temp.innerHTML = tl5.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead5))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction6() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead6));
    document.getElementById("CW").innerHTML = document.getElementById("lead6").innerHTML;
    myIdElementT.innerHTML = th6.innerHTML+"°C";
    low_Temp.innerHTML = tl6.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead6))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
function myFunction7() {
    document.getElementById("date").innerHTML=(Intl.DateTimeFormat(['ban', 'id']).format(lead7));
    document.getElementById("CW").innerHTML = document.getElementById("lead7").innerHTML;
    myIdElementT.innerHTML = th7.innerHTML+"°C";
    low_Temp.innerHTML = tl7.innerHTML;
    get(child(dbRef,'forecasting2/'+ formatDate(lead7))).then((snapshot) => {
        myIdElementH.innerHTML= snapshot.val().Humidity+"%";
        Rain_Fal.innerHTML=snapshot.val().RainToday;
    })
};
document.getElementById("myFunction0").addEventListener("click",myFunction0);
document.getElementById("myFunction2").addEventListener("click",myFunction2);
document.getElementById("myFunction3").addEventListener("click",myFunction3);
document.getElementById("myFunction4").addEventListener("click",myFunction4);
document.getElementById("myFunction5").addEventListener("click",myFunction5);
document.getElementById("myFunction6").addEventListener("click",myFunction6);
document.getElementById("myFunction7").addEventListener("click",myFunction7);

function toCelsius(f) {
    return (5/9) * (f-32);
}
function toFahrenheit (c) {
    return c * 9 / 5 + 32;
}
var nav = false;
function C() {
    temperature.innerHTML = toCelsius(parseInt(myIdElementT.innerHTML)).toFixed()+"°C";
    low_Temp.innerHTML= toCelsius(low_Temp.innerHTML).toFixed();
    th1.innerHTML = toCelsius(th1.innerHTML).toFixed();
    th2.innerHTML = toCelsius(th2.innerHTML).toFixed();
    th3.innerHTML = toCelsius(th3.innerHTML).toFixed();
    th4.innerHTML = toCelsius(th4.innerHTML).toFixed();
    th5.innerHTML = toCelsius(th5.innerHTML).toFixed();
    th6.innerHTML = toCelsius(th6.innerHTML).toFixed();
    th7.innerHTML = toCelsius(th7.innerHTML).toFixed();
    tl1.innerHTML = toCelsius(tl1.innerHTML).toFixed();
    tl2.innerHTML = toCelsius(tl2.innerHTML).toFixed();
    tl3.innerHTML = toCelsius(tl3.innerHTML).toFixed();
    tl4.innerHTML = toCelsius(tl4.innerHTML).toFixed();
    tl5.innerHTML = toCelsius(tl5.innerHTML).toFixed();
    tl6.innerHTML = toCelsius(tl6.innerHTML).toFixed();
    tl7.innerHTML = toCelsius(tl7.innerHTML).toFixed();
    nav = false;
}
function F() {
    temperature.innerHTML = toFahrenheit(parseInt(myIdElementT.innerHTML)).toFixed()+"°F";
    low_Temp.innerHTML= toFahrenheit(low_Temp.innerHTML).toFixed();
    th1.innerHTML = toFahrenheit(th1.innerHTML).toFixed();
    th2.innerHTML = toFahrenheit(th2.innerHTML).toFixed();
    th3.innerHTML = toFahrenheit(th3.innerHTML).toFixed();
    th4.innerHTML = toFahrenheit(th4.innerHTML).toFixed();
    th5.innerHTML = toFahrenheit(th5.innerHTML).toFixed();
    th6.innerHTML = toFahrenheit(th6.innerHTML).toFixed();
    th7.innerHTML = toFahrenheit(th7.innerHTML).toFixed();
    tl1.innerHTML = toFahrenheit(tl1.innerHTML).toFixed();
    tl2.innerHTML = toFahrenheit(tl2.innerHTML).toFixed();
    tl3.innerHTML = toFahrenheit(tl3.innerHTML).toFixed();
    tl4.innerHTML = toFahrenheit(tl4.innerHTML).toFixed();
    tl5.innerHTML = toFahrenheit(tl5.innerHTML).toFixed();
    tl6.innerHTML = toFahrenheit(tl6.innerHTML).toFixed();
    tl7.innerHTML = toFahrenheit(tl7.innerHTML).toFixed();
    nav = true;
}
function toggleNav() {
    nav ? C() : F();
}
document.getElementById("toggleNav").addEventListener("click",toggleNav);