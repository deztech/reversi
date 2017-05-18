// Functions for general use...
function GetUrlParamValue(_TargetParamName) {
    var _PageUrl = window.location.search.substring(1);
    var _PageUrlVars = _PageUrl.split('&');

    for (var i = 0; i < _PageUrlVars.length; i++) {
        var _Param = _PageUrlVars[i].split('=');
        if (_Param[0] === _TargetParamName) {
            return _Param[1];
        }
    }

    return '';
}
