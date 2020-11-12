export default class Constants {
    static portServer = 3001;
    static portClient = 3000;
    static baseUrl = "http://localhost:";
    static apiPrefix = "/api";
    static createPrefix = "/create";
    static updatePrefix = "/update";
    static getPrefix = "/get";
    static deletePrefix = "/delete";
    static rolePrefix = "/role";
    static roleCreatePrefix = Constants.rolePrefix + Constants.createPrefix;
    static roleUpdatePrefix = Constants.rolePrefix + Constants.updatePrefix;
    static roleGetPrefix = Constants.rolePrefix + Constants.getPrefix;
    static roleDeletePrefix = Constants.rolePrefix + Constants.deletePrefix;
}