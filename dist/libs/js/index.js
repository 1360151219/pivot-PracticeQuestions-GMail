const newMail = document.getElementById("new-mail");
const logoWrite = document.getElementById("logo-write");
const mailClose = document.getElementById("mail-close");
const textMenuOpen = document.getElementById("textMenu-open");
const textMenu = document.getElementById("text-menu");
const resizeWin = document.getElementById("resize-window");
const checkallMenu = document.getElementById("checkall-menu");
const more = document.getElementById("more");
const root = document.getElementById("root");
const inBox = document.getElementById("inbox");
const goXing = document.getElementById("go-xing");
const timeOut = document.getElementById("time-out");

let once = 1; //用于第一次加入邮件
// 移动所需的节点数组
let nodeBox = [];
let nodeXing = [];
let nodeTimeout = [];
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
let Download = function (content, filename) {
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
///////////////////
/* 全选移动到延时页 */
function _allDelay() {
  const allDelay = document.getElementById("all-delay");
  const addTimeout = document.getElementsByName("add-timeout");
  allDelay.onclick = function () {
    addTimeout.forEach((element) => {
      element.click();
    });
  };
} /* 全选移动到收件箱 */
function _allInbox() {
  const allInbox = document.getElementById("all-inbox");
  const recBox = document.getElementsByName("rec-box");
  allInbox.onclick = function () {
    recBox.forEach((element) => {
      element.click();
    });
  };
}
/* 渲染*/
/* 收件箱的页面效果 */
const renderInbox = function () {
  inBox.setAttribute("class", "item item-active");
  goXing.setAttribute("class", "item");
  timeOut.setAttribute("class", "item");
  root.innerHTML = `<div class="mail-list not-read">
  <div class="head">
    <span class="iconfont icon-xiala1" id="list-open"></span>
    <i>未读</i>
    <span class="iconfont icon-gengduo"></span>
  </div>
  <table class="mail-body">
    <tbody id="non-read">
      
    </tbody>
  </table>
</div>
<div class="mail-list else">
  <div class="head">
    <span class="iconfont icon-xiala1" id="elseList-open"></span>
    <i>其他邮件</i>
    <span class="iconfont icon-gengduo"></span>
  </div>
  <table class="mail-body" id="else-mail">
    <tbody id="receive">
      
    </tbody>
  </table>
</div>
`;
  setTimeout(async function () {
    /* 载入数据 */
    const Receive = document.getElementById("receive");
    /* 初始化 */
    if (once == 1) {
      Receive.innerHTML = `<tr class="mail-item">
    <td
      class="iconfont icon-checkboxoutlineblank checkmail"
      name="checkmail"
    ></td>
    <td class="xing" name="add-xing">
      <span class="iconfont icon-xing1"
        ><div class="tip tip-3">加星标</div></span
      >
    </td>
    <td class="username">Medium Daily Digest</td>
    <td class="detail">
      One is always on a strange road, watching strange scenery and
      listening to strange music. Then one day, you will find that the
      things you try hard to forget are already gone. 　
    </td>
    <td class="date">4月10号</td>
    <td class="handle">
      <ul>
        <li name="rec-box"><div class="tip tip-5">移到收件箱</div></li>
        <li></li>
        <li name="weidu"><div class="tip tip-2">未读</div></li>
        <li name="add-timeout"><div class="tip tip-2">延时</div></li>
      </ul>
    </td>
  </tr>
  <tr class="mail-item">
    <td
      class="iconfont icon-checkboxoutlineblank checkmail"
      name="checkmail"
    ></td>
    <td class="xing" name="add-xing">
      <span class="iconfont icon-xing1"
        ><div class="tip tip-3">加星标</div></span
      >
    </td>
    <td class="username">Medium Daily Digest</td>
    <td class="detail">
      One is always on a strange road, watching strange scenery and
      listening to strange music. Then one day, you will find that the
      things you try hard to forget are already gone. 　
    </td>
    <td class="date">4月10号</td>
    <td class="handle">
      <ul>
        <li name="rec-box"><div class="tip tip-5">移到收件箱</div></li>
        <li></li>
        <li name="weidu"><div class="tip tip-2">未读</div></li>
        <li name="add-timeout"><div class="tip tip-2">延时</div></li>
      </ul>
    </td>
  </tr>`;
      once++;
    }

    for (let i = 0; i < nodeBox.length; i++) {
      Receive.appendChild(nodeBox[i]);
    }
  }, 1000);
};

/* 星标页的效果 */
const renderXing = function () {
  root.innerHTML = `<div class="mail-list not-read">
  <table class="mail-body show">
    <tbody id="star">
      
    </tbody>
  </table>
</div>`;
  /* 载入数据 */
  const star = document.getElementById("star");
  for (let i = 0; i < nodeXing.length; i++) {
    star.appendChild(nodeXing[i]);
  }

  goXing.setAttribute("class", "item item-active");
  inBox.setAttribute("class", "item");
  timeOut.setAttribute("class", "item");
};
/* 延时页的效果 */
const rendertimeout = function () {
  root.innerHTML = `<div class="mail-list not-read">
  
  <table class="mail-body show">
    <tbody id="delay-time">
      
    </tbody>
  </table>
</div>`;
  /* 载入数据 */
  const delayTime = document.getElementById("delay-time");
  for (let i = 0; i < nodeTimeout.length; i++) {
    delayTime.appendChild(nodeTimeout[i]);
  }
  timeOut.setAttribute("class", "item item-active");
  inBox.setAttribute("class", "item");
  goXing.setAttribute("class", "item");
};
/* 加载页面 */
const Inbox = async function () {
  renderInbox();
  setTimeout(function () {
    const tips = document.getElementsByClassName("tip");
    const listOPen = document.getElementById("list-open");
    const elseListOPen = document.getElementById("elseList-open");
    const weidus = document.getElementsByName("weidu");
    // 单个邮件的移入移出
    function mailFunc() {
      const mailBody = document.getElementsByClassName("mail-item");
      for (let i = 0; i < mailBody.length; i++) {
        const details = mailBody[i].getElementsByClassName("detail");
        const date = mailBody[i].getElementsByClassName("date");
        const handle = mailBody[i].getElementsByClassName("handle");
        mailBody[i].onmouseenter = function () {
          date[0].style.display = "none";
          handle[0].style.display = "block";
          details[0].style.width = "912px";
        };
        mailBody[i].onmouseleave = function () {
          date[0].style.display = "block";
          handle[0].style.display = "none";
          details[0].style.width = "1002px";
        };
      }
    }

    mailFunc();

    /* tip的实现 */
    (function () {
      for (let i = 0; i < tips.length; i++) {
        tips[i].parentNode.onmouseover = function () {
          setTimeout(() => {
            tips[i].style.display = "block";
          }, 100);
        };
        tips[i].parentNode.onmouseout = function () {
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
    const nonRead = document.getElementById("non-read");
    const checkAll = document.getElementById("check-all");
    const checkmails = document.getElementsByName("checkmail");
    /* 全选按钮功能实现 */
    (function () {
      _allDelay();
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
          checkallMenu.style.display = "none";
          more.style.display = "block";
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
          checkallMenu.style.display = "inline-block";
          more.style.display = "none";
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
              checkAll.setAttribute(
                "class",
                "iconfont icon-checkboxoutlineblank"
              );
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
          nonRead.appendChild(oneMail);
          this.innerHTML = `<div class="tip tip-2">已读</div>`;
          mailFunc();
        };
      }
    })();

    /* 制止传入收件箱页 */
    const recBox = document.getElementsByName("rec-box");
    for (let i = 0; i < recBox.length; i++) {
      recBox[i].onclick = null;
    }
    /*邮件移动到星标页 */
    (function () {
      const addXing = document.getElementsByName("add-xing");
      for (let i = 0; i < addXing.length; i++) {
        addXing[i].onclick = function () {
          let oneMail = addXing[i].parentNode;
          nodeXing.push(oneMail);
          oneMail.parentNode.removeChild(oneMail);
        };
      }
    })();
    /*邮件移动到延时页`*/
    (function () {
      const addTimeout = document.getElementsByName("add-timeout");
      for (let i = 0; i < addTimeout.length; i++) {
        addTimeout[i].onclick = function () {
          let oneMail = addTimeout[i].parentNode.parentNode.parentNode;

          nodeTimeout.push(oneMail);
          oneMail.parentNode.removeChild(oneMail);
        };
      }
    })();
  }, 1000);
};
const Xing = function () {
  renderXing();
  const listOPen = document.getElementById("list-open");
  const weidus = document.getElementsByName("weidu");
  const checkAll = document.getElementById("check-all");
  const checkmails = document.getElementsByName("checkmail");
  // 单个邮件的移入移出
  function mailFunc() {
    const mailBody = document.getElementsByClassName("mail-item");
    for (let i = 0; i < mailBody.length; i++) {
      let details = mailBody[i].getElementsByClassName("detail");
      let date = mailBody[i].getElementsByClassName("date");
      let handle = mailBody[i].getElementsByClassName("handle");
      mailBody[i].onmouseenter = function () {
        date[0].style.display = "none";
        handle[0].style.display = "block";
        details[0].style.width = "912px";
      };
      mailBody[i].onmouseleave = function () {
        date[0].style.display = "none";
        handle[0].style.display = "block";
        details[0].style.width = "912px";
      };
    }
  }
  mailFunc();
  const tips = document.getElementsByClassName("tip");
  /* tip的实现 */
  (function () {
    for (let i = 0; i < tips.length; i++) {
      tips[i].parentNode.onmouseover = function () {
        setTimeout(() => {
          tips[i].style.display = "block";
        }, 100);
      };
      tips[i].parentNode.onmouseout = function () {
        tips[i].style.display = "none";
      };
    }
  })();
  /* 全选按钮功能实现 */
  (function () {
    _allDelay();
    _allInbox();
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
        checkallMenu.style.display = "none";
        more.style.display = "block";
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
        checkallMenu.style.display = "inline-block";
        more.style.display = "none";
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
            checkAll.setAttribute(
              "class",
              "iconfont icon-checkboxoutlineblank"
            );
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
  /* 制止传入星标页 */

  const addXing = document.getElementsByName("add-xing");
  for (let i = 0; i < addXing.length; i++) {
    addXing[i].onclick = null;
    weidus[i].onclick = null;
  }
  /* 邮件传到收件箱 */
  (function () {
    const recBox = document.getElementsByName("rec-box");
    for (let i = 0; i < recBox.length; i++) {
      recBox[i].onclick = function () {
        let oneMail = recBox[i].parentNode.parentNode.parentNode;
        nodeBox.push(oneMail);
        oneMail.parentNode.removeChild(oneMail);
      };
    }
  })();

  /*邮件移动到延时页 */
  (function () {
    const addTimeout = document.getElementsByName("add-timeout");
    for (let i = 0; i < addTimeout.length; i++) {
      addTimeout[i].onclick = function () {
        let oneMail = addTimeout[i].parentNode.parentNode.parentNode;
        nodeTimeout.push(oneMail);
        oneMail.parentNode.removeChild(oneMail);
      };
    }
  })();
};
const timeout = function () {
  rendertimeout();
  const listOPen = document.getElementById("list-open");
  const weidus = document.getElementsByName("weidu");
  const checkAll = document.getElementById("check-all");
  const checkmails = document.getElementsByName("checkmail");
  // 单个邮件的移入移出
  function mailFunc() {
    const mailBody = document.getElementsByClassName("mail-item");

    for (let i = 0; i < mailBody.length; i++) {
      const details = mailBody[i].getElementsByClassName("detail");
      const date = mailBody[i].getElementsByClassName("date");
      const handle = mailBody[i].getElementsByClassName("handle");
      mailBody[i].onmouseenter = function () {
        date[0].style.display = "none";
        handle[0].style.display = "block";
        details[0].style.width = "912px";
      };
      mailBody[i].onmouseleave = function () {
        date[0].style.display = "block";
        handle[0].style.display = "none";
        details[0].style.width = "1002px";
      };
    }
  }
  mailFunc();
  const tips = document.getElementsByClassName("tip");
  /* tip的实现 */
  (function () {
    for (let i = 0; i < tips.length; i++) {
      tips[i].parentNode.onmouseover = function () {
        setTimeout(() => {
          tips[i].style.display = "block";
        }, 100);
      };
      tips[i].parentNode.onmouseout = function () {
        tips[i].style.display = "none";
      };
    }
  })();
  /* 全选按钮功能实现 */
  (function () {
    _allInbox();
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
        checkallMenu.style.display = "none";
        more.style.display = "block";
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
        checkallMenu.style.display = "inline-block";
        more.style.display = "none";
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
            checkAll.setAttribute(
              "class",
              "iconfont icon-checkboxoutlineblank"
            );
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
  /* 制止传入延时页 */
  const addTimeout = document.getElementsByName("add-timeout");
  for (let i = 0; i < addTimeout.length; i++) {
    addTimeout[i].onclick = null;
    weidus[i].onclick = null;
  }
  /*邮件移动到星标页 */
  (function () {
    const addXing = document.getElementsByName("add-xing");
    for (let i = 0; i < addXing.length; i++) {
      addXing[i].onclick = function () {
        let oneMail = addXing[i].parentNode;
        nodeXing.push(oneMail);
        oneMail.parentNode.removeChild(oneMail);
      };
    }
  })();
  /* 邮件传到收件箱 */
  (function () {
    const recBox = document.getElementsByName("rec-box");
    for (let i = 0; i < recBox.length; i++) {
      recBox[i].onclick = function () {
        let oneMail = recBox[i].parentNode.parentNode.parentNode;
        nodeBox.push(oneMail);
        oneMail.parentNode.removeChild(oneMail);
      };
    }
  })();
};
Inbox();
goXing.onclick = function () {
  Xing();
};
inBox.onclick = function () {
  Inbox();
};
timeOut.onclick = function () {
  timeout();
};
