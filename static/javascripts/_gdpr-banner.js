(function() {
  "use strict";

  function gdpr() {
    if (!hasCookie()) {
      setCookie();

      var banner = el("div", {class: "gdpr-banner"}, [
        on(el("i", {class: "gdpr-close"}), "click", hide),
        el("p", {}, [
          "Our site uses ", link("cookies", "https://www.thoughtworks.com/privacy-policy#cookie-section"),
          " for analytics. If you're unsure about it, take a look at our ",
          link("privacy policy", "https://www.thoughtworks.com/privacy-policy"), "."
          ])
        ]);

      function hide() {
        setCookie();
        document.body.removeChild(banner);
      }

      document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  document.addEventListener("DOMContentLoaded", gdpr);

  /* ========== DOM helpers ========== */

  function on(el, type, fn) {
    el.addEventListener(type, fn, false);
    return el;
  }

  function addContent(node, content) {
    if ("string" === typeof content) {
      content = document.createTextNode(content);
    }
    node.appendChild(content);
  }

  function el(tag, attrs, content) {
    const node = document.createElement(tag.toLowerCase());

    if (attrs) {
      for (var key in attrs) {
        node.setAttribute(key, attrs[key]);
      }
    }

    if (content) {
      if (content.forEach) {
        content.forEach(function (child) {
          addContent(node, child);
        });
      } else {
        addContent(node, content);
      }
    }

    return node;
  }

  function link(text, href) {
    return el("a", {href: href, target: "_blank", rel: "noopener noreferrer"}, text);
  }

  /* ========== Cookie Utils ========== */

  function hasCookie() {
    return /_gdpr-accept=/.test(document.cookie);
  }

  function setCookie() {
    if (!hasCookie()) {
      document.cookie = "_gdpr-accept=yes; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
  }
})();
