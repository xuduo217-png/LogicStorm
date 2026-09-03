/* ===========================================================
   公共脚本：语言切换 / 移动菜单 / 案例筛选 / 联系表单(占位)
   =========================================================== */
(function () {
  "use strict";

  /* ---------- 语言切换（持久化到 localStorage） ---------- */
  var html = document.documentElement;
  var saved = localStorage.getItem("sf_lang");
  if (saved !== "zh") html.classList.add("en");

  function applyOptLang() {
    var en = html.classList.contains("en");
    document.querySelectorAll("option.i18n-opt").forEach(function (o) {
      o.textContent = en ? (o.getAttribute("data-en") || o.textContent)
                         : (o.getAttribute("data-zh") || o.textContent);
    });
  }

  function applyTitle(lang) {
    var titleEl = document.querySelector("title[data-zh][data-en]");
    if (titleEl) document.title = titleEl.getAttribute(lang === "en" ? "data-en" : "data-zh");
  }

  function applyLang(lang) {
    if (lang === "en") html.classList.add("en");
    else html.classList.remove("en");
    localStorage.setItem("sf_lang", lang);
    document.querySelectorAll("[data-lang-label]").forEach(function (el) {
      el.textContent = lang === "en" ? "中 / EN" : "EN / 中";
    });
    applyOptLang();
    applyTitle(lang);
  }
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(html.classList.contains("en") ? "zh" : "en");
    });
  });
  // 初始化按钮文字
  document.querySelectorAll("[data-lang-label]").forEach(function (el) {
    el.textContent = html.classList.contains("en") ? "中 / EN" : "EN / 中";
  });
  applyOptLang();
  applyTitle(html.classList.contains("en") ? "en" : "zh");

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- 当前页导航高亮 ---------- */
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && (href === page || (page === "" && href === "index.html"))) {
      a.classList.add("active");
    }
  });

  /* ---------- 案例筛选（categories 写在 data-cat 上，逗号分隔） ---------- */
  var filters = document.querySelectorAll(".filter");
  var cases = document.querySelectorAll(".case");
  if (filters.length && cases.length) {
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.classList.remove("active"); });
        f.classList.add("active");
        var cat = f.getAttribute("data-filter");
        cases.forEach(function (c) {
          var cats = (c.getAttribute("data-cat") || "").split(",");
          var show = cat === "all" || cats.indexOf(cat) >= 0;
          c.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- 联系表单（FormSubmit 转发到邮箱） ---------- */
  // 提交走原生 POST 到 FormSubmit，成功后跳回 contact.html?sent=1
  if (location.search.indexOf("sent=1") > -1) {
    var msg = document.getElementById("formOk");
    if (msg) {
      msg.classList.add("show");
      msg.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
})();
