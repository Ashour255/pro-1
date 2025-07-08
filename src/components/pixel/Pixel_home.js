"use client";
import { useEffect } from "react";

const Pixel_home = ({
  facebook_pixel_id,
  tiktok_pixel_id,
  snapchat_pixel_id,
}) => {
  useEffect(() => {
    // Facebook Pixel
    if (facebook_pixel_id) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
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
    if (tiktok_pixel_id) {
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
    if (snapchat_pixel_id) {
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


 console.log(window.fbq); // Facebook Pixel
console.log(window.ttq); // TikTok Pixel
console.log(window.snaptr); // Snapchat Pixel
  return (
    <></>
  );
};

export default Pixel_home;
