/**
 * 用作与task传输的dto
 *
 * */

function imdatadto() {
    // this.img_url = 'http://oyxrsomzz.bkt.clouddn.com/15.jpg';
    this.img_url=null;
    this.img_info = null;
    this.GetImgUrl = function () {
        return this.img_url;
    };
    this.SetImgUrl = function (url) {
        this.img_url = url;
    };
    this.GetImgInfo = function () {
        return this.img_info;
    };
    this.SetImgInfo = function (url) {
        this.img_info = url;
    };
}


function exdatadto() {
    this.img_url = null;
    this.img_info = null;
    this.GetImgUrl = function () {
        return this.img_url;
    };
    this.SetImgUrl = function (url) {
        this.img_url = url;
    };
    this.GetImgInfo = function () {
        return this.img_info;
    };
    this.SetImgInfo = function (url) {
        this.img_info = url;
    };
}