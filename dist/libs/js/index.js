const newMail = document.getElementById("new-mail");
const logoWrite = document.getElementById("logo-write");
const mailClose = document.getElementById("mail-close");
const textMenuOpen = document.getElementById("textMenu-open");
const textMenu = document.getElementById("text-menu");
const resizeWin = document.getElementById("resize-window");
/* 拖拽效果 */
function drag(node) {
  node.onmousedown = function (ev) {
    let e = ev || window.event;
    let offsetX = e.clientX - node.offsetLeft;
    let offsetY = e.clientY - node.offsetTop;
    //鼠标按下时记录下鼠标与物体之间的相对距离
    document.onmousemove = function (ev) {
      let e = ev || window.event;
      let l = e.clientX - offsetX;
      let t = e.clientY - offsetY;
      if (l <= 0) {
        l = 0;
      }
      if (l >= 1505 - node.offsetWidth) {
        l = windowWidth;
      }
      if (t <= 0) {
        t = 0;
      }
      if (t >= 726 - node.offsetHeight) {
        t = windowHeight;
      }
      node.style.left = l + "px";
      node.style.top = t + "px";
    };
  };
  document.onmouseup = function () {
    document.onmousemove = null;
  };
}
//封装一个获取随机颜色的函数
function randomColor() {
  let str =
    "rgba(" +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    ",1)";
  return str;
}
function openTextMenu() {
  let temp = false;
  textMenuOpen.onclick = function () {
    if (temp) {
      textMenu.style.display = "none";
      temp = false;
    } else {
      textMenu.style.display = "block";
      temp = true;
    }
  };
}
/* 侧边栏移入移出效果 */
(function () {
  const leftAside = document.getElementById("left-aside");
  const itemMeeting = document.getElementById("item-meeting");
  const itemHangout = document.getElementById("item-hangout");
  const footerList = document.getElementById("footer-list");

  leftAside.onmouseenter = function () {
    leftAside.style.width = "256px";
    logoWrite.style.height = "46px";
    logoWrite.style.width = "126px";
    logoWrite.innerHTML = "<span>写邮件</span>";
    itemMeeting.innerHTML = "<span>会议</span>";
    itemHangout.innerHTML = "<span>Hangouts</span>";
    footerList.style.display = "block";
  };
  leftAside.onmouseleave = function () {
    leftAside.style.width = "70px";
    logoWrite.style.height = "46px";
    logoWrite.style.width = "46px";
    logoWrite.innerHTML = "";
    itemMeeting.innerHTML = "";
    itemHangout.innerHTML = "";
    footerList.style.display = "none";
  };
})();
drag(newMail);
/* 写邮件功能函数 */
(function () {
  //写邮件窗口的打开关闭;
  logoWrite.onclick = function () {
    newMail.style.display = "block";
  };
  mailClose.onclick = function () {
    newMail.style.display = "none";
  };
  //文字效果菜单;
  openTextMenu();
  /* 文本框的缩放 */
  let temp = false;
  resizeWin.onclick = function () {
    const btnGroup = document.getElementById("btn-group");
    if (temp) {
      btnGroup.style.width = "468px";
      newMail.style.width = "579px";
      newMail.style.height = "371px";
      temp = false;
    } else {
      btnGroup.style.width = "1150px";
      newMail.style.width = "1222px";
      newMail.style.height = "400px";
      temp = true;
    }
  };
  /* 文字缩放 */
  const textArea = document.getElementById("textarea");
  const fontSize = document.getElementById("fontSize");
  let size = 12;
  fontSize.onclick = function () {
    textArea.style.fontSize = size + "px";
    size += 2;
    if (size > 20) {
      size = 12;
    }
  };
  /* 改变颜色 */
  const fontColor = document.getElementById("font-color");
  fontColor.onclick = function () {
    textArea.style.color = randomColor();
  };
})();
