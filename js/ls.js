function MathRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bro = "汖秋";
EGG = false;
bgm = { start: true };
var PreloadAudio = ["We Wish You a Merry Christmas", "シーズ - Fashionable"];
var PreloadImg = ["egg_1", "egg_2"];
function FontSize() {
  var Ele = document.querySelectorAll("#info *");
  var main = document.getElementById("main");
  for (let a = 0; a < Ele.length; a++) {
    var fs = 1;
    if (Ele[a].getAttribute("fontSize")) {
      fs = Number(Ele[a].getAttribute("fontSize"));
    }
    Ele[a].style.fontSize = (main.offsetHeight / 30) * fs + "px";
  }
}
window.onload = function () {
  var ua = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  ) {
    var User = { width: 200, height: 125 };
  } else {
    var User = { width: 90, height: 90 };
  }

  function Preload() {
    //预加载
    function Loading(src, object, format) {
      if (object == "audio") {
        //音频
        let audioEle = new Audio();
        audioEle.src = "audio/" + src + ".mp3";
        audioEle.onloadstart = function () {
          console.log("Loading complete > " + audioEle.src);
        };
        audioEle.onerror = function () {
          console.error("Loading [audio] error > " + src);
        };
      } else if (object == "img") {
        //图片
        var imgObject = ["png", "jpg", "gif"];
        if (!format) {
          format = 0;
        }
        let imgEle = new Image();
        imgEle.src = "img/" + src + "." + imgObject[format];
        imgEle.onload = function () {
          console.log("Loading complete > " + imgEle.src);
        };
        imgEle.onerror = function () {
          if (format < imgObject.length - 1) {
            console.error(
              "Loading [img] try > " + src + " > " + imgObject[format + 1]
            );
            Loading(src, object, format + 1);
          } else {
            console.error("Loading [img] error > " + src);
          }
        };
      }
    }
    for (let a = 0; a < PreloadAudio.length; a++) {
      Loading(PreloadAudio[a], "audio");
    }
    for (let a = 0; a < PreloadImg.length; a++) {
      Loading(PreloadImg[a], "img");
    }
  }
  Preload();
  function resize() {
    //圣诞树宽度
    var user = { width: window.innerWidth, heigth: window.innerHeight };
    var main = document.getElementById("main").style;
    if (user["width"] > user["heigth"]) {
      main.width = "";
      main.height = User["height"] + "%";
    } else {
      main.width = User["width"] + "%";
      main.height = "";
    }
  }
  resize();
  window.onresize = function () {
    resize();
    FontSize();
  };

  function Star() {
    //星星生成
    function StarAnimation(ele) {
      if (EGG == true) {
        ele.classList.add("EGG");
        ele.classList.add("e" + MathRandom(2, 1));
      }
      var style = ele.style;
      setTimeout(function () {
        style.transition = "0.5s";
        style.opacity = 0.2;
        style.boxShadow = " 0 0 5px 0px aliceblue";
        setTimeout(function () {
          style.opacity = MathRandom(0.8, 0.5);
          style.top = style.top.split("px")[0] + "px";
          style.boxShadow = " 0 0 5px 2px aliceblue";
          setTimeout(function () {
            style.transition = "2s";
            style.opacity = 0;
            let top = window.innerHeight * 0.005;
            let left = window.innerWidth * 0.005;
            style.top = ele.offsetTop + MathRandom(top, -top) + "px";
            style.left = ele.offsetLeft + MathRandom(left, -left) + "px";
            setTimeout(function () {
              ele.remove();
            }, 3000);
          }, MathRandom(10000, 1000));
        }, MathRandom(500, 200));
      }, MathRandom(500, 200));
    }
    var starElement = document.createElement("main");
    let size =
      window.innerWidth * 0.0025 +
      MathRandom(0, -window.innerWidth * 0.005) +
      "px";
    var star = document.getElementById("star");
    var starMax = 100;
    if (star.children.length < starMax) {
      starElement.style.width = starElement.style.height = size;
      var random = {
        top: MathRandom(window.innerHeight, 0) + "px",
        left: MathRandom(window.innerWidth, 0) + "px",
      };
      starElement.style.top = random["top"];
      starElement.style.left = random["left"];
      var Class = Math.random();
      starElement.classList.add(Class);
      star.appendChild(starElement);
      var ele = document.getElementsByClassName(Class);
      StarAnimation(ele[0]);
    }
    var time = MathRandom(200, 0);
    setTimeout(function () {
      Star();
    }, time);
  }
  Star();

  var treeEle = document.getElementById("tree");
  var trunkMax = 7;
  var leafMax = 200;
  var easterEggMax = 10;
  var trunkName = "trunk trunk_";
  var leafName = "leaf leaf_";
  var branchName = "branch branch_";
  var easterEggName = "easterEgg easterEgg_";

  function NewTree() {
    //新建圣诞树
    for (let a = 1; a <= trunkMax; a++) {
      let trunkEle = document.createElement("main");
      trunkEle.classList.add(trunkName.split(" ")[0]);
      trunkEle.classList.add(trunkName.split(" ")[1] + a);
      if (a == 1) {
        treeEle.appendChild(trunkEle);
      } else {
        document
          .getElementsByClassName(trunkName + String(a - 1))[0]
          .appendChild(trunkEle);
      }
      let branchEle = document.createElement("main");
      branchEle.classList.add(branchName.split(" ")[0]);
      branchEle.classList.add(branchName.split(" ")[1] + Number(a - 1));
      let style = branchEle.style;
      style.width = Number((a - 1) ^ trunkMax) * 80 + "%";
      style.height = Number(a ^ trunkMax) + 100 + "%";
      for (let b = 1; b <= leafMax - a * trunkMax * 2.25; b++) {
        var leafEle = document.createElement("main");
        leafEle.classList.add(leafName.split(" ")[0]);
        leafEle.classList.add(leafName.split(" ")[1] + b);
        let style = leafEle.style;
        let color = [
          MathRandom(25, 15),
          MathRandom(80, 50),
          MathRandom(35, 20),
        ];
        style.width =
          Number(a * 2) +
          Number(a ^ trunkMax) +
          MathRandom(a * 0.5, a / 0.5) +
          "%";
        style.backgroundColor = "rgba(" + color + ")";
        let left = MathRandom(100, 0);
        style.top = MathRandom(100, 0) + "%";
        style.left = left + "%";
        if (left < 50) {
          var rotate = MathRandom(35, 0);
        } else {
          var rotate = MathRandom(0, -35);
        }
        style.transform =
          "rotate(" + Number(45 + rotate) + "deg) translate(-50%,0%)";
        branchEle.appendChild(leafEle);
      }
      document
        .getElementsByClassName(trunkName + String(a))[0]
        .appendChild(branchEle);
    }
  }
  NewTree();

  let branch = document.getElementsByClassName(branchName.split(" ")[0]);
  for (let a = 0; a < branch.length; a++) {
    for (let b = 1; b <= easterEggMax; b++) {
      var easterEggEle = document.createElement("main");
      let easterEgg = document.getElementsByClassName(
        easterEggName.split(" ")[0]
      );
      easterEggEle.onclick = function (Ele) {
        var target = Ele.target;
        var egg = Number(target.getAttribute("egg"));
        if (!egg) {
          egg = 0;
        }
        egg++;
        if (egg > 20) {
          EGG = true;
          document.getElementById("name").innerText = "圣 !Damn! 树";
          return;
        }
        target.setAttribute("egg", egg);
      };
      easterEggEle.classList.add(easterEggName.split(" ")[0]);
      easterEggEle.classList.add(
        easterEggName.split(" ")[1] + Number(easterEgg.length + 1)
      );
      var style = easterEggEle.style;
      var color = [
        "brown",
        "darkgreen",
        "goldenrod",
        "blueviolet",
        "coral",
        "cornsilk",
        "orange",
      ];
      style.backgroundColor = color[MathRandom(color.length, 0)];
      style.height = 25 + (a ^ b) + "%";
      style.top = MathRandom(95, 5) + "%";
      style.left = MathRandom(95, 5) + "%";
      if (easterEgg.length < easterEggMax) {
        var easterEggLength = branch[a].querySelectorAll(
          "." + easterEggName.split(" ")[0]
        ).length;
        if (easterEggLength >= 3 + (a ^ trunkMax)) {
          break;
        }
        if (MathRandom(100, 0) > 80 || easterEggLength < 1) {
          branch[a].appendChild(easterEggEle);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  function NewGift() {
    //礼物盒
    let giftBoxEle = document.createElement("main");
    giftBoxEle.classList.add("gift");
    giftBoxEle.classList.add("name");
    giftBoxEle.onclick = function (Ele) {
      var target = Ele.target;
      if (!target.classList.contains("gift")) {
        if (target.parentNode.classList.contains("gift")) {
          target = target.parentNode;
        } else {
          if (target.parentNode.parentNode.classList.contains("gift")) {
            target = target.parentNode.parentNode;
          }
        }
      }
      target.onclick = "";
      if (!document.getElementById("bro")) {
        var broEle = document.createElement("b");
        broEle.id = "bro";
        broEle.innerHTML = bro;
        let style = broEle.style;
        let main = document.getElementById("main");
        style.top = target.offsetTop + main.offsetTop + "px";
        style.left = target.offsetLeft + main.offsetLeft + "px";
        document.getElementById("info").appendChild(broEle);
        FontSize();
      }
      var broEle = document.getElementById("bro");
      var style = broEle.style;
      target.classList.add("afoot");
      setTimeout(function () {
        target.classList.add("open");
        setTimeout(function () {
          target.classList.add("a1");
          broEle.classList.add("a1");
          setTimeout(function () {
            target.classList.add("a2");
            broEle.classList.add("a2");
            setTimeout(function () {
              target.classList.add("a3");
              broEle.classList.add("a3");
              setTimeout(function () {
                target.classList.add("a4");
                broEle.classList.add("a4");
                style.left = "15%";
                setTimeout(function () {
                  target.classList.add("a5");
                  broEle.classList.add("a5");
                  style.top = "90%";
                  setTimeout(function () {
                    var text = "Merry Christmas  ";
                    var bf = "";
                    var a = 0;
                    function Merry() {
                      if (text.length > a) {
                        bf += text[a];
                        broEle.innerText = bf + bro;
                        let left = broEle.style.left.split("%")[0];
                        broEle.style.left = left - left * 0.05 + "%";
                        a++;
                        setTimeout(function () {
                          Merry();
                        }, 100);
                      }
                    }
                    Merry();
                  }, 3000);
                }, 800);
              }, 800);
            }, 490);
          }, 1500);
        }, 950);
      }, 1000);
    };
    giftBoxEle.style.top = MathRandom(82.5, 80) + "%";
    giftBoxEle.style.left = MathRandom(27.5, 26.5) + "%";
    let giftBoxLidEle = document.createElement("main");
    giftBoxLidEle.classList.add("giftboxlid");
    giftBoxEle.appendChild(giftBoxLidEle);
    let giftStickersEle = document.createElement("main");
    giftStickersEle.classList.add("stickers");
    for (let a = 1; a <= 3; a++) {
      let giftStarEle = document.createElement("main");
      giftStarEle.classList.add("star");
      giftStarEle.classList.add("star_" + a);
      giftStarEle.style.top = MathRandom(100, 0) + "%";
      giftStarEle.style.left = MathRandom(100, 0) + "%";
      giftStickersEle.appendChild(giftStarEle);
    }
    giftBoxEle.appendChild(giftStickersEle);
    document.getElementById("main").appendChild(giftBoxEle);
  }
  NewGift();
};

function NewBGM(n) {
  let BGM = document.createElement("audio");
  BGM.controls = true;
  BGM.volume = 0.25;
  BGM.addEventListener("ended", function () {
    BGMNext();
  });
  let source = document.createElement("source");
  if (!n) {
    n = 0;
  }
  source.src = "audio/" + PreloadAudio[n] + ".mp3";
  source.setAttribute("tag", n);
  if (bgm["start"] == true) {
    BGM.autoplay = true;
  }
  BGM.appendChild(source);
  document.getElementById("bgm").appendChild(BGM);
}

function BGMbutton(n) {
  var name = "b-switch";
  var ele = document.getElementsByClassName(name)[n];
  if (ele) {
    if (ele.classList.contains("on")) {
      ele.classList.remove("on");
    } else {
      ele.classList.add("on");
    }
  }
}
function BGMNext() {
  var bgm = document.getElementById("bgm");
  var BGMEle = bgm.getElementsByTagName("audio")[0];
  if (BGMEle) {
    var source = BGMEle.getElementsByTagName("source")[0];
    if (source) {
      var number = 0;
      if (Number(source.getAttribute("tag")) < PreloadAudio.length - 1) {
        number = Number(source.getAttribute("tag")) + 1;
      }
      BGMEle.remove();
      NewBGM(number);
    }
  }
}
setTimeout(function () {
  NewBGM();
}, 50);
