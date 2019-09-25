const app = {
    apiUrl: 'http://10.18.88.73:8080/scalper/v1/', //请求的地址
    baseRequest(obj) {
        try {
            const userToken = uni.getStorageSync('userToken');
            if (userToken) {
                if (obj.header) {
                    obj.header["token"] = userToken;
                } else {
                    obj.header = { "token": userToken };
                }
                obj.url = this.apiUrl + obj.url;
                uni.request(obj)
            }
            else{
                console.log("获取不到userToken")
                
            }
        } catch (e) {
            console.log(e)
            console.log("获取不到userToken")
        } 
    },
}

export default app;