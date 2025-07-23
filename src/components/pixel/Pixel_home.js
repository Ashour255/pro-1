"use client";
import { useEffect } from "react";

const Pixel_home = ({
  facebook_pixel_id,
  tiktok_pixel_id,
  snapchat_pixel_id,
}) => {
  useEffect(() => {
    // Facebook Pixel
    if (facebook_pixel_id && typeof window !== "undefined") {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = (f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        });
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script");
      fbq("init", facebook_pixel_id);
      fbq("track", "PageView");
    }

    // TikTok Pixel
    if (tiktok_pixel_id && typeof window !== "undefined") {
      !(function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        ttq.methods = [
          "page",
          "track",
          "identify",
          "instances",
          "debug",
          "on",
          "off",
          "once",
          "ready",
          "alias",
          "group",
          "enableCookie",
          "disableCookie",
        ];
        ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i++) {
          ttq.setAndDefer(ttq, ttq.methods[i]);
        }
        ttq.instance = function (t) {
          var e = ttq._i[t] || [];
          for (var n = 0; n < ttq.methods.length; n++) {
            ttq.setAndDefer(e, ttq.methods[n]);
          }
          return e;
        };
        ttq.load = function (e, n) {
          var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i = ttq._i || {};
          ttq._i[e] = [];
          ttq._i[e]._u = i;
          ttq._t = ttq._t || {};
          ttq._t[e] = +new Date();
          ttq._o = ttq._o || {};
          ttq._o[e] = n || {};
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.async = !0;
          a.src = i + "?sdkid=" + e + "&lib=" + t;
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(a, s);
        };
        ttq.load(tiktok_pixel_id);
        ttq.page();
      })(window, document, "ttq");
    }

    // Snapchat Pixel
    if (snapchat_pixel_id && typeof window !== "undefined") {
      (function (e, t, n) {
        if (e.snaptr) return;
        var a = (e.snaptr = function () {
          a.handleRequest
            ? a.handleRequest.apply(a, arguments)
            : a.queue.push(arguments);
        });
        a.queue = [];
        var s = "script";
        var r = t.createElement(s);
        r.async = !0;
        r.src = n;
        var u = t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r, u);
      })(window, document, "https://sc-static.net/scevent.min.js");

      snaptr("init", snapchat_pixel_id);
      snaptr("track", "PAGE_VIEW");
    }
  }, [facebook_pixel_id, tiktok_pixel_id, snapchat_pixel_id]);

  // التحقق من التحميل داخل useEffect لتجنب الأخطاء
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Facebook Pixel:", window.fbq);
      console.log("TikTok Pixel:", window.ttq);
      console.log("Snapchat Pixel:", window.snaptr);
    }
  }, [facebook_pixel_id, tiktok_pixel_id, snapchat_pixel_id]);

  return <></>;
};

export default Pixel_home; 

// "use client";
// import { useEffect } from "react";

// const Pixel_home = ({
//   facebook_pixel_id,
//   tiktok_pixel_id,
//   snapchat_pixel_id,
// }) => {
//   useEffect(() => {
//     // التحقق من أن الـ IDs موجودة وwindow متاح
//     if (typeof window === "undefined") return;

//     try {
//       // Facebook Pixel
//       if (facebook_pixel_id) {
//         !(function (f, b, e, v, n, t, s) {
//           if (f.fbq) return;
//           n = (f.fbq = function () {
//             n.callMethod
//               ? n.callMethod.apply(n, arguments)
//               : n.queue.push(arguments);
//           });
//           if (!f._fbq) f._fbq = n;
//           n.push = n;
//           n.loaded = !0;
//           n.version = "2.0";
//           n.queue = [];
//           t = b.createElement(e);
//           t.async = !0;
//           t.src = "https://connect.facebook.net/en_US/fbevents.js";
//           s = b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t, s);
//         })(window, document, "script");
//         fbq("init", facebook_pixel_id);
//         fbq("track", "PageView");
//       }

//       // TikTok Pixel
//       if (tiktok_pixel_id) {
//         !(function (w, d, t) {
//           w.TiktokAnalyticsObject = t;
//           var ttq = (w[t] = w[t] || []);
//           ttq.methods = [
//             "page",
//             "track",
//             "identify",
//             "instances",
//             "debug",
//             "on",
//             "off",
//             "once",
//             "ready",
//             "alias",
//             "group",
//             "enableCookie",
//             "disableCookie",
//           ];
//           ttq.setAndDefer = function (t, e) {
//             t[e] = function () {
//               t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
//             };
//           };
//           for (var i = 0; i < ttq.methods.length; i++) {
//             ttq.setAndDefer(ttq, ttq.methods[i]);
//           }
//           ttq.instance = function (t) {
//             var e = ttq._i[t] || [];
//             for (var n = 0; n < ttq.methods.length; n++) {
//               ttq.setAndDefer(e, ttq.methods[n]);
//             }
//             return e;
//           };
//           ttq.load = function (e, n) {
//             var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
//             ttq._i = ttq._i || {};
//             ttq._i[e] = [];
//             ttq._i[e]._u = i;
//             ttq._t = ttq._t || {};
//             ttq._t[e] = +new Date();
//             ttq._o = ttq._o || {};
//             ttq._o[e] = n || {};
//             var a = document.createElement("script");
//             a.type = "text/javascript";
//             a.async = !0;
//             a.src = i + "?sdkid=" + e + "&lib=" + t;
//             var s = document.getElementsByTagName("script")[0];
//             s.parentNode.insertBefore(a, s);
//           };
//           ttq.load(tiktok_pixel_id);
//           ttq.page();
//         })(window, document, "ttq");
//       }

//       // Snapchat Pixel
//       if (snapchat_pixel_id) {
//         (function (e, t, n) {
//           if (e.snaptr) return;
//           var a = (e.snaptr = function () {
//             a.handleRequest
//               ? a.handleRequest.apply(a, arguments)
//               : a.queue.push(arguments);
//           });
//           a.queue = [];
//           var s = "script";
//           var r = t.createElement(s);
//           r.async = !0;
//           r.src = n;
//           var u = t.getElementsByTagName(s)[0];
//           u.parentNode.insertBefore(r, u);
//         })(window, document, "https://sc-static.net/scevent.min.js");

//         snaptr("init", snapchat_pixel_id);
//         snaptr("track", "PAGE_VIEW");
//       }

//       // التحقق من التحميل
//       console.log("Pixel_home component mounted");
//       console.log("Facebook Pixel:", window.fbq);
//       console.log("TikTok Pixel:", window.ttq);
//       console.log("Snapchat Pixel:", window.snaptr);
//     } catch (error) {
//       console.error("Error loading pixels:", error);
//     }
//   }, [facebook_pixel_id, tiktok_pixel_id, snapchat_pixel_id]);

//   return <></>;
// };

// export default Pixel_home;






// "use client";
// import { useEffect } from "react";

// const Pixel_home = ({
//   facebook_pixel_id,
//   tiktok_pixel_id,
//   snapchat_pixel_id,
// }) => {
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     try {
//       // Facebook Pixel
//       if (facebook_pixel_id) {
//         !(function (f, b, e, v, n, t, s) {
//           if (f.fbq) return;
//           n = f.fbq = function () {
//             n.callMethod
//               ? n.callMethod.apply(n, arguments)
//               : n.queue.push(arguments);
//           };
//           if (!f._fbq) f._fbq = n;
//           n.push = n;
//           n.loaded = !0;
//           n.version = "2.0";
//           n.queue = [];
//           t = b.createElement(e);
//           t.async = !0;
//           t.src = "https://connect.facebook.net/en_US/fbevents.js";
//           s = b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t, s);
//         })(window, document, "script");

//         const checkFbqReady = () => {
//           if (typeof window.fbq !== "undefined") {
//             fbq("init", facebook_pixel_id);
//             fbq("track", "PageView");
//             console.log("✅ Facebook Pixel loaded.");
//           } else {
//             setTimeout(checkFbqReady, 500);
//           }
//         };
//         checkFbqReady();
//       }

//       // TikTok Pixel
//       if (tiktok_pixel_id) {
//         !(function (w, d, t) {
//           w.TiktokAnalyticsObject = t;
//           var ttq = (w[t] = w[t] || []);
//           ttq.methods = [
//             "page",
//             "track",
//             "identify",
//             "instances",
//             "debug",
//             "on",
//             "off",
//             "once",
//             "ready",
//             "alias",
//             "group",
//             "enableCookie",
//             "disableCookie",
//           ];
//           ttq.setAndDefer = function (t, e) {
//             t[e] = function () {
//               t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
//             };
//           };
//           for (var i = 0; i < ttq.methods.length; i++) {
//             ttq.setAndDefer(ttq, ttq.methods[i]);
//           }
//           ttq.instance = function (t) {
//             var e = ttq._i[t] || [];
//             for (var n = 0; n < ttq.methods.length; n++) {
//               ttq.setAndDefer(e, ttq.methods[n]);
//             }
//             return e;
//           };
//           ttq.load = function (e, n) {
//             var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
//             ttq._i = ttq._i || {};
//             ttq._i[e] = [];
//             ttq._i[e]._u = i;
//             ttq._t = ttq._t || {};
//             ttq._t[e] = +new Date();
//             ttq._o = ttq._o || {};
//             ttq._o[e] = n || {};
//             var a = document.createElement("script");
//             a.type = "text/javascript";
//             a.async = !0;
//             a.src = i + "?sdkid=" + e + "&lib=" + t;
//             var s = document.getElementsByTagName("script")[0];
//             s.parentNode.insertBefore(a, s);
//           };
//           ttq.load(tiktok_pixel_id);
//           ttq.page();
//           console.log("✅ TikTok Pixel loaded.");
//         })(window, document, "ttq");
//       }

//       // Snapchat Pixel
//       if (snapchat_pixel_id) {
//         (function (e, t, n) {
//           if (e.snaptr) return;
//           var a = (e.snaptr = function () {
//             a.handleRequest
//               ? a.handleRequest.apply(a, arguments)
//               : a.queue.push(arguments);
//           });
//           a.queue = [];
//           var s = "script";
//           var r = t.createElement(s);
//           r.async = !0;
//           r.src = n;
//           var u = t.getElementsByTagName(s)[0];
//           u.parentNode.insertBefore(r, u);
//         })(window, document, "https://sc-static.net/scevent.min.js");

//         const checkSnapReady = () => {
//           if (typeof window.snaptr !== "undefined") {
//             snaptr("init", snapchat_pixel_id);
//             snaptr("track", "PAGE_VIEW");
//             console.log("✅ Snapchat Pixel loaded.");
//           } else {
//             setTimeout(checkSnapReady, 500);
//           }
//         };
//         checkSnapReady();
//       }
//     } catch (error) {
//       console.error("❌ Error loading pixels:", error);
//     }
//   }, [facebook_pixel_id, tiktok_pixel_id, snapchat_pixel_id]);

//   return null;
// };

// export default Pixel_home;
