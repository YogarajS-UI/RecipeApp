export class UserModel{
    constructor(public email:string, public id:string, private _token, private _expiryData){}

    get token(){
    if(!this._expiryData || new Date() > this._expiryData){
        return null;
    }
        return this._token;
    }
}