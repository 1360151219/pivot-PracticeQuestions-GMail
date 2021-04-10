const newMail = document.getElementById("new-mail");
const logoWrite = document.getElementById("logo-write");
const mailClose = document.getElementById("mail-close");
const textMenuOpen = document.getElementById("textMenu-open");
const textMenu = document.getElementById("text-menu");
const resizeWin = document.getElementById("resize-window");
const tips = document.getElementsByClassName("tip");
const listOPen = document.getElementById("list-open");
const elseListOPen = document.getElementById("elseList-open");
const nonRead = document.getElementById("non-read");
const weidus = document.getElementsByName("weidu");
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
drag(newMail);
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
/* 编辑菜单探入弹出 */
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
/* 保存功能函数 */
var Download = function (content, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};
// 单个邮件的移入移出
function mailFunc() {
  const details = document.getElementsByClassName("detail");
  const mailBody = document.getElementsByClassName("mail-item");
  const date = document.getElementsByClassName("date");
  const handle = document.getElementsByClassName("handle");
  for (let i = 0; i < mailBody.length; i++) {
    mailBody[i].onmouseenter = function () {
      date[i].style.display = "none";
      handle[i].style.display = "block";
      details[i].style.width = "912px";
    };
    mailBody[i].onmouseleave = function () {
      date[i].style.display = "block";
      handle[i].style.display = "none";
      details[i].style.width = "1002px";
    };
  }
}
mailFunc();
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
  /* 保存至本地 */
  const textSave = document.getElementById("text-save");
  textSave.onclick = function () {
    Download(textArea.innerText, "test.txt");
  };
})();
/* tip的实现 */
(function () {
  for (let i = 0; i < tips.length; i++) {
    tips[i].parentNode.onmouseenter = function () {
      setTimeout(() => {
        tips[i].style.display = "block";
      }, 100);
    };
    tips[i].parentNode.onmouseleave = function () {
      tips[i].style.display = "none";
    };
  }
})();
/* 未读和其他邮件的展开 */
(function () {
  let temp_noneread = false;
  let temp_else = false;
  listOPen.onclick = function () {
    if (!temp_noneread) {
      listOPen.parentNode.nextElementSibling.style.display = "block";
      temp_noneread = true;
    } else {
      listOPen.parentNode.nextElementSibling.style.display = "none";
      temp_noneread = false;
    }
  };
  elseListOPen.onclick = function () {
    if (!temp_else) {
      elseListOPen.parentNode.nextElementSibling.style.display = "block";
      temp_else = true;
    } else {
      elseListOPen.parentNode.nextElementSibling.style.display = "none";
      temp_else = false;
    }
  };
})();

const checkAll = document.getElementById("check-all");
const checkmails = document.getElementsByName("checkmail");
/* 全选按钮功能实现 */
(function () {
  checkAll.onclick = function () {
    if (checkAll.checked == true) {
      checkAll.checked = false;
      checkAll.setAttribute("class", "iconfont icon-checkboxoutlineblank");
      for (let i = 0; i < checkmails.length; i++) {
        checkmails[i].checked = false;
        checkmails[i].setAttribute(
          "class",
          "iconfont icon-checkboxoutlineblank checkmail"
        );
      }
    } else {
      checkAll.checked = true;
      checkAll.setAttribute("class", "iconfont icon-check_box-px");
      for (let i = 0; i < checkmails.length; i++) {
        checkmails[i].checked = true;
        checkmails[i].setAttribute(
          "class",
          "iconfont icon-check_box-px checkmail"
        );
      }
    }
  };
})();
/* 单个check功能 */
(function () {
  let num = 0;
  for (let i = 0; i < checkmails.length; i++) {
    checkmails[i].onclick = function () {
      if (checkmails[i].checked) {
        checkmails[i].checked = false;
        num--;
        checkmails[i].setAttribute(
          "class",
          "iconfont icon-checkboxoutlineblank checkmail"
        );
        if (num != checkmails.length) {
          checkAll.checked = false;
          checkAll.setAttribute("class", "iconfont icon-checkboxoutlineblank");
        }
      } else {
        checkmails[i].checked = true;
        num++;
        checkmails[i].setAttribute(
          "class",
          "iconfont icon-check_box-px checkmail"
        );
        if (num == checkmails.length) {
          checkAll.checked = true;
          checkAll.setAttribute("class", "iconfont icon-check_box-px");
        }
      }
    };
  }
})();
/* 邮件从其他移入未读 */
(function () {
  for (let i = 0; i < weidus.length; i++) {
    weidus[i].onclick = function () {
      let oneMail = weidus[i].parentNode.parentNode.parentNode;
      nonRead.childNodes[1].appendChild(oneMail);
      this.innerHTML = `<div class="tip tip-2">已读</div>`;
      mailFunc();
    };
  }
})();
