/* 侧边栏移入移出效果 */
(function () {
  const leftAside = document.getElementById("left-aside");
  const logoWrite = document.getElementById("logo-write");
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
