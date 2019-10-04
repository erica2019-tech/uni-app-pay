const BASEURL = 'http://10.18.88.73:8081/scalper/v1/'

const get = url => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${BASEURL}${url}`,
			header: {Authorization:'Bearer ' + localStorage.getItem('token')},
			dataType: 'json',
			success: res => {
				console.log(res);
				const {data} = res;
				if((data || {}).title == 'invalid token'){
					console.log("地方的放松放松");
					uni.navigateTo({
						url: '../login/login',
						success: res => {
							console.log(res);
							uni.showToast({
									title: '请重新登录',
									duration: 2000
							});
							
						},
					})
				}
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

const post = (url,data) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${BASEURL}${url}`,
			method: 'POST',
			data,
			header: {Authorization:'Bearer ' + localStorage.getItem('token')},
			dataType: 'json',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

const put = (url,data) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${BASEURL}${url}`,
			method: 'PUT',
			data,
			header: {Authorization:'Bearer ' + localStorage.getItem('token')},
			dataType: 'json',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

const deletes = url => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${BASEURL}${url}`,
			method: 'DELETE',
			header: {Authorization:'Bearer ' + localStorage.getItem('token')},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default {
	get,
	post,
	put,
	deletes
}