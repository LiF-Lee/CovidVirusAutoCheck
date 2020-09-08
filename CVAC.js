const CovidVirusCheck = {
    setting: {
        "schoolCode": "", //학교 코드
        "myName": "", //내 이름 (*암호화된 값)
        "myBirth": "" //내 생년월일 (*암호화된 값)
    },
    baseURL: "https://senhcs.eduro.go.kr/",
    subURL: [
        "loginwithschool",
        "checkpw",
        "secondlogin",
        "selectGroupList",
        "userrefresh",
        "registerServey"
    ],
    login: function() {
        return doLogin(CovidVirusCheck.subURL[0]);
    },
    submit: function(token) {
        return doSubmit(CovidVirusCheck.subURL[5], token);
    }
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (msg == "/자가진단") {  //Made By EliF
        var result = CovidVirusCheck.submit(CovidVirusCheck.login());
        replier.reply(result);
    }
}

importClass(org.jsoup.Jsoup);

function doLogin(url) {
    var result = Jsoup.connect(CovidVirusCheck.baseURL + url).header(
        "Content-Type", "application/json"
    ).requestBody(JSON.stringify({
        "orgcode": CovidVirusCheck.setting.schoolCode,
        "name": CovidVirusCheck.setting.myName,
        "birthday": CovidVirusCheck.setting.myBirth
    })).ignoreContentType(true).ignoreHttpErrors(true).post().text();
    return JSON.parse(result).token;
}

function doSubmit(url, token) {
    return Jsoup.connect(CovidVirusCheck.baseURL + url).header(
        "Content-Type", "application/json"
    ).header(
        "Authorization", token
    ).requestBody(JSON.stringify({
        "rspns01": "1",
        "rspns02": "1",
        "rspns07": "0",
        "rspns08": "0",
        "rspns09": "0",
        "rspns00": "Y",
        "deviceuuid": ""
    })).ignoreContentType(true).ignoreHttpErrors(true).post().text();
} 
