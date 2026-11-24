export class CookieManager {

    static getCookie(name: string) {
        var cookieValue = null;
        try {
            document.cookie;
        }
        catch{
            return '';
        }
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    static setCookie(name :string ,value: string,days: number) {
        try {
            document.cookie;
        }
        catch{
            return '';
        }
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
}

export const toggleTema = (setChecked: any) => {
    console.log("CHANGE");
    let tema = 'light';
    if (CookieManager.getCookie('theme') == "dark") {
        tema = 'light'
        setChecked(false);
    } else {
        tema = 'dark'
        setChecked(true);
    }
    CookieManager.setCookie('theme', tema, 7);

    let html_div = document.getElementById("main_html");
    let old_class = html_div?.getAttribute("class");
    html_div?.classList.replace((old_class ? old_class : ''), tema);
};
