// function isIE10() {

//     var ua = window.navigator.userAgent;

//     var msie = ua.indexOf('MSIE ');

//     if (msie > 0) {

//         // IE 10 or older => return version number

//         return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10) === 10;

//     }

//     // other browser

//     return false;

// }

let browser: number | boolean = null;



export function detectBrowser(): number | boolean {

    if (browser == null) {

        const ua = window.navigator.userAgent;



        // Test values; Uncomment to check result …



        // IE 10

        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';



        // IE 11

        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';



        // Edge 12 (Spartan)

        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';



        // Edge 13

        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';



        const msie = ua.indexOf('MSIE ');

        if (msie > 0) {

            // IE 10 or older => return version number

            browser = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

        }



        const trident = ua.indexOf('Trident/');

        if (trident > 0) {

            // IE 11 => return version number

            var rv = ua.indexOf('rv:');

            browser = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);

        }



        const edge = ua.indexOf('Edge/');

        if (edge > 0) {

            // Edge (IE 12+) => return version number

            browser = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

        }



        // other browser

        browser = false;

    }

    return browser;



}



export type BrowserType = "edge" | "opera" | "chrome" | "ie" | "firefox"| "safari";

let browserType = null;

export function getBrowserType(): BrowserType {

    if (browserType == null) {

        browserType = (function (): BrowserType {

            const test = function (regexp) { return regexp.test(window.navigator.userAgent); }

            switch (true) {

                case test(/edge/i): return "edge";

                case test(/opr/i) && (!!window["opr"] || !!window["opera"]): return "opera";

                case test(/chrome/i) /*&& !!window["chrome"]*/: return "chrome";

                case test(/trident/i): return "ie";

                case test(/firefox/i): return "firefox";

                case test(/safari/i): 

                case test(/AppleWebKit/i) : return "safari";

                default: return null;

            }

        })();

    }

    return browserType;

}