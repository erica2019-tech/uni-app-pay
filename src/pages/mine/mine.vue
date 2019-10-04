<template>
	<view>
		<div id="myHomePage" v-cloak>
			<div class="page-body">
				<!-- 	<div class="login-or-register" v-show="!isLoggedInFlag">
					<button type="button" class="btn btn-lg btn-danger" v-on:click="footerVM.goTo('/login')">{{loginOrRegisterTxt}}</button>
				</div> -->
				<div class="account-info" v-show="isLoggedInFlag">
					<div class="user-name">
						<div>
							<label>{{userName}}</label>
						</div>
					</div>
					<div class="cash-deposit">
						<span>保证金:</span><label>{{cashDeposit != null ? cashDeposit : 0}}元</label>
					</div>
					<div class="personal-info">
						  <span class="glyphicon glyphicon-user" aria-hidden="true" @tap="toPersonalInfo"></span>
					</div>
				</div>
				
				<ul class="list-group">
                    <li class="list-group-item myCard-group-item" @tap="myAccount"><span>我的账户</span>
                    </li>
					<li class="list-group-item myCard-group-item" @tap="myCard"><span>我的银行卡</span>
					</li>
					<li class="list-group-item myCard-group-item" @tap="contact"><span>联系方式</span>
					</li>
					<li class="list-group-item flex-between myCard-group-item" @tap="gotoMessage"><span>站内信</span>
					<span class='notice' v-if="this.unreadMessage > 0">{{this.unreadMessage}}</span>
					</li>
					<li class="list-group-item logout-group-item" @tap="logout"><span>退出登录</span>
					</li>
				</ul>
<!-- 				<view class="absoright" @click="gotoMessage">
					<span>站内信</span>
				</view> -->
					
			</div>
		</div>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import {queryUnread} from '../../config/common.js';
	import https from '../../api/https.js';
	export default {
		data() {
			return {
				isLoggedInFlag: true,
				userName: 'tt',
				cashDeposit: '3',
				unreadMessage: 0,
				// data: {
				// 	// loginOrRegisterTxt: '',
				// 	// isLoggedInFlag: true,
				// 	// userName: '',
				// 	// cashDeposit: '',
				// 	// accountType: ''
				// }
			}
		},
		//右上导航
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../components/message/message'
			});
		},
		onShow:function () {
			this.queryUnread();
		},
		mounted: function() {
			// this.loadRegisterSetting();
			// this.getUserAccountInfo();
		},
		methods: {
			// 			goTo: function(url) {
			// 				window.location.href = url;
			// 			},
			// 
			// 			loadRegisterSetting: function() {
			// 				var that = this;
			// 				that.$http.get('/masterControl/getRegisterSetting').then(function(res) {
			// 					that.loginOrRegisterTxt = res.body.data.registerEnabled ? '登录/注册' : '登录';
			// 				});
			// 			},

			/**
			 * 获取用户账号信息
			 */
			// getUserAccountInfo: function() {
			// 	var that = this;
			// 	that.$http.get('/userAccount/getUserAccountInfo').then(function(res) {
			// 		if (res.body.data != null) {
			// 			that.isLoggedInFlag = true;
			// 			that.userName = res.body.data.userName;
			// 			that.cashDeposit = res.body.data.cashDeposit;
			// 			that.accountType = res.body.data.accountType;
			// 		}
			// 	});
			// },
			queryUnread: function() {
				https.get(`inform?status=unread`).then(res=> {
					const {data} = res;
					if(data.length > 0) {
						uni.showTabBarRedDot({
							index: 3,
							
						});
						this.unreadMessage = data.length;
					}else {
						uni.hideTabBarRedDot({
							index: 3,
							
						})
						this.unreadMessage = data.length;
					}
				})
			},
			gotoMessage: function() {
				uni.navigateTo({
					url: '../components/message/message'
				});
			},
			myAccount(){
				uni.navigateTo({
					url: '../components/myAccount/myaccount'
				});
			},
			toPersonalInfo(){
				uni.navigateTo({
					url: '../components/personalInfo/personalInfo'
				});
			},
			//  进入银行卡列表
          myCard(){
				// const res = await this.$axios.get('bankcard')
				// console.log(res);
				// let token = localStorage.getItem('token')
				// uni.request({
				// 	url: this.$hostUrl + 'bankcard',
				// 	method: 'GET',
				// 	header: {Authorization:'Bearer ' + token},
				// 	success: res => {
				// 		console.log(res);
				// 	},
				// 	fail: (err) => {
				// 		console.log(err);
				// 	}
				// });
				uni.navigateTo({
					url: '../components/bankCard/bankCard'
				});
			},
			//  联系方式
			contact: function(){
				uni.navigateTo({
					url: '../components/contact/contact'
				});
			},
			getData (key) {  
			   return uni.getStorageSync('key');  
			},
			logout() {
				const self = this;
				uni.showModal({
					content: '确认退出吗?',
					success: function (res) {
						if (res.confirm) {
							let token = localStorage.getItem('token');
							https.get('logout').then(res => {
								if(res.statusCode == 200) {
									uni.navigateTo({
										url: '../login/login',
										success: res => {
											if(res.statusCode == 200){
												console.log('退出成功!');
												uni.showToast({
													title: '退出成功',
													duration: 2000
												});
											}
											
										},
										
									});	
								}
							})
						} else if (res.cancel) {
							return;
						}
					}
				});
				
			},
		}
	}
</script>

<style>
	.logout-group-item {
		color: #d81e06;
	}
	.account-info {
		display: flex;
		justify-content:space-between;
		align-items: center;
		background-color: #d81e06;
		border-top: 1px solid #e64f5d;
		}
	.user-name {
		color: #fff;
		margin-left: 0.5rem;
	}
	.user-name div {
		width: 100%;
	}
	.cash-deposit {
		color: #fff;
	}
	.personal-info {
		color: #fff;
		margin-right: 0.5rem;
	}
	.absoright {
		position: fixed;
		right: 10rpx;
		top: 50%;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		opacity: 0.5;
		background-color: #d81e06;
	}
	.flex-between {
		display: flex;
		justify-content: space-between;
	}
	.notice {
		display: flex;
		width: 20px;
		height: 20px;
		background-color: rgb(216, 30, 6);
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 50%;
		
	}
</style>
