/**
 * Created by PhpStorm.
 * User: PAPE SAMBA NDOUR : 777293282; papesambandour@hotmail.com
 * Date: 05/04/2018
 * Time: 13:09
 */

function buy(btn) {
    var selector = $(btn);

    (new PayExpresse({
        token : $("#inff").attr("token")

    })).withOption({
        requestTokenUrl           :   $("#inff").attr("urlP"),
        method              :   'POST',
        headers             :   {
            "Accept"          :    "text/html",
        },
        prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
        didPopupClosed: function (is_completed, success_url, cancel_url) {
            window.location.href = is_completed === true ? success_url  : cancel_url;
        },
        willGetToken        :   function () {
            console.log("Je me prepare a obtenir un token");
            selector.prop('disabled', true);
        },
        didGetToken         : function (token, redirectUrl) {
            console.log("Mon token est : " +  token  + ' et url est ' + redirectUrl );
            selector.prop('disabled', false);
        },
        didReceiveError: function (error) {
            alert('erreur inconnu', error.toString());
            selector.prop('disabled', false);
        },
        didReceiveNonSuccessResponse: function (jsonResponse) {
            console.log('non success response ',jsonResponse);
            alert(jsonResponse.errors);
            selector.prop('disabled', false);
        }
    }).send();

    //.send params are optional
}
