import https from '../api/https.js'
const queryUnread = () => {
	https.get(`inform?status=unread`).then(res=> {
		const {data} = res;
		if(data.length > 0) {
			uni.showTabBarRedDot({
				index: 3,
				
			})
		}else {
			uni.hideTabBarRedDot({
				index: 3,
				
			})
		}
	})
}

export {
queryUnread	
}